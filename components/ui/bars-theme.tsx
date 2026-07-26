'use client'

import { useEffect, useRef } from 'react'
import type { AriaAttributes, CSSProperties } from 'react'
import { useReducedMotion } from 'motion/react'
import { useCssColorRgb } from '@/lib/hooks/use-css-color-rgb'

export type OrbState = 'idle' | 'connecting' | 'listening' | 'thinking' | 'speaking' | 'error'

type DataAttributeValue = string | number | boolean | null | undefined

export interface OrbHtmlAttributes extends AriaAttributes {
  id?: string
  title?: string
  role?: string
  tabIndex?: number
  [dataAttribute: `data-${string}`]: DataAttributeValue
}

export interface BarsThemeProps extends OrbHtmlAttributes {
  state: OrbState
  volume: number
  size: number
  className?: string
  style?: CSSProperties
  disabled?: boolean
  interactive?: boolean
  onClick?: () => void
}

const BAR_COUNT = 5
const WAVE_FREQ = 1.4
const WAVE_PHASE_STEP = (Math.PI * 2) / BAR_COUNT

const STATE_COLOR_TOKEN: Record<OrbState, 'accent' | 'destructive'> = {
  idle: 'accent',
  connecting: 'accent',
  listening: 'accent',
  thinking: 'accent',
  speaking: 'accent',
  error: 'destructive',
}

const FALLBACK_ACCENT: [number, number, number] = [26, 115, 242]
const FALLBACK_DESTRUCTIVE: [number, number, number] = [232, 80, 80]

const BLEND_MS = 280

export function BarsTheme({
  state,
  volume,
  size,
  className,
  style,
  disabled = false,
  interactive = false,
  onClick,
  ...controlProps
}: BarsThemeProps) {
  const barRefs = useRef<(HTMLSpanElement | null)[]>([])
  const containerRef = useRef<HTMLSpanElement>(null)
  const rafRef = useRef<number>(0)
  const smoothed = useRef<number[]>(new Array(BAR_COUNT).fill(0))
  const volumeRef = useRef(volume)
  const hoveredRef = useRef(false)
  const hoverBoostRef = useRef(0)
  const blendStartRef = useRef<number | null>(null)
  const frozenHeightsRef = useRef<number[]>(new Array(BAR_COUNT).fill(0))
  const prevStateRef = useRef(state)
  const touchEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const reduceMotion = useReducedMotion()

  const accentRgb = useCssColorRgb('--color-accent', FALLBACK_ACCENT)
  const destructiveRgb = useCssColorRgb('--color-destructive', FALLBACK_DESTRUCTIVE)
  const accentRgbRef = useRef(accentRgb)
  const destructiveRgbRef = useRef(destructiveRgb)
  const currentColorRef = useRef<[number, number, number]>(accentRgb)
  useEffect(() => {
    accentRgbRef.current = accentRgb
  }, [accentRgb])
  useEffect(() => {
    destructiveRgbRef.current = destructiveRgb
  }, [destructiveRgb])

  useEffect(
    () => () => {
      if (touchEndTimerRef.current) clearTimeout(touchEndTimerRef.current)
    },
    [],
  )

  useEffect(() => {
    if (state !== prevStateRef.current) {
      frozenHeightsRef.current = [...smoothed.current]
      blendStartRef.current = Date.now()
      prevStateRef.current = state
    }
  }, [state])

  useEffect(() => {
    volumeRef.current = volume
  }, [volume])

  useEffect(() => {
    const maxH = size * 0.55
    const minH = size * 0.06
    const hoverBoostMax = size * 0.08

    const diamondWeights = Array.from({ length: BAR_COUNT }, (_, i) => {
      const center = (BAR_COUNT - 1) / 2
      return 1 - 0.7 * (Math.abs(i - center) / center)
    })

    const updateHoverBoost = () => {
      const target = hoveredRef.current ? hoverBoostMax : 0
      hoverBoostRef.current += (target - hoverBoostRef.current) * 0.14
    }

    const applyBars = (heights: number[]) => {
      updateHoverBoost()
      const targetRgb =
        STATE_COLOR_TOKEN[state] === 'destructive'
          ? destructiveRgbRef.current
          : accentRgbRef.current
      const [cr, cg, cb] = currentColorRef.current
      currentColorRef.current = reduceMotion
        ? targetRgb
        : [
            cr + (targetRgb[0] - cr) * 0.07,
            cg + (targetRgb[1] - cg) * 0.07,
            cb + (targetRgb[2] - cb) * 0.07,
          ]
      const [r, g, b] = currentColorRef.current.map(Math.round)

      for (let i = 0; i < BAR_COUNT; i++) {
        const el = barRefs.current[i]
        if (!el) continue
        const weight = state === 'idle' ? diamondWeights[i] : 1
        const boost = hoverBoostRef.current * weight
        el.style.height = `${Math.min(heights[i] + boost, maxH)}px`
        el.style.background = `rgb(${r},${g},${b})`
        el.style.boxShadow = `0 ${Math.round(heights[i] * 0.08)}px ${Math.round(heights[i] * 0.12)}px rgba(0,0,0,0.15)`
      }
    }

    if (state === 'speaking') {
      const animate = () => {
        const vol = volumeRef.current
        const t = Date.now() / 1000

        for (let i = 0; i < BAR_COUNT; i++) {
          const osc = reduceMotion
            ? 0.5
            : 0.5 + 0.15 * Math.sin(t * WAVE_FREQ * Math.PI * 2 + i * WAVE_PHASE_STEP)
          let targetH = minH + (maxH - minH) * vol * osc

          if (!reduceMotion && blendStartRef.current !== null) {
            const elapsed = Date.now() - blendStartRef.current
            const progress = Math.min(elapsed / BLEND_MS, 1)
            const ease = 1 - (1 - progress) * (1 - progress)
            targetH = frozenHeightsRef.current[i] + (targetH - frozenHeightsRef.current[i]) * ease
            if (progress >= 1) blendStartRef.current = null
          }

          smoothed.current[i] = reduceMotion
            ? targetH
            : smoothed.current[i] + (targetH - smoothed.current[i]) * 0.95
        }

        applyBars(smoothed.current)
        rafRef.current = requestAnimationFrame(animate)
      }
      rafRef.current = requestAnimationFrame(animate)
      return () => cancelAnimationFrame(rafRef.current)
    }

    if (state === 'listening') {
      const animate = () => {
        const vol = volumeRef.current
        const t = Date.now() / 1000

        for (let i = 0; i < BAR_COUNT; i++) {
          const osc = reduceMotion
            ? 0.5
            : 0.5 + 0.1 * Math.sin(t * WAVE_FREQ * 0.35 * Math.PI * 2 + i * WAVE_PHASE_STEP)
          let targetH = minH + (maxH * 0.5 - minH) * vol * osc

          if (!reduceMotion && blendStartRef.current !== null) {
            const elapsed = Date.now() - blendStartRef.current
            const progress = Math.min(elapsed / BLEND_MS, 1)
            const ease = 1 - (1 - progress) * (1 - progress)
            targetH = frozenHeightsRef.current[i] + (targetH - frozenHeightsRef.current[i]) * ease
            if (progress >= 1) blendStartRef.current = null
          }

          smoothed.current[i] = reduceMotion
            ? targetH
            : smoothed.current[i] + (targetH - smoothed.current[i]) * 0.35
        }

        applyBars(smoothed.current)
        rafRef.current = requestAnimationFrame(animate)
      }
      rafRef.current = requestAnimationFrame(animate)
      return () => cancelAnimationFrame(rafRef.current)
    }

    if (state === 'thinking') {
      if (reduceMotion) {
        const animateStatic = () => {
          updateHoverBoost()
          const targetH = minH + (maxH * 0.45 - minH) * 0.5
          for (let i = 0; i < BAR_COUNT; i++) {
            smoothed.current[i] = targetH
          }
          applyBars(smoothed.current)
          rafRef.current = requestAnimationFrame(animateStatic)
        }
        rafRef.current = requestAnimationFrame(animateStatic)
        return () => cancelAnimationFrame(rafRef.current)
      }

      const startTime = Date.now()
      const animate = () => {
        const t = (Date.now() - startTime) / 1000
        updateHoverBoost()
        for (let i = 0; i < BAR_COUNT; i++) {
          const cycle = (t * 0.55 + (i / BAR_COUNT) * 0.5) % 1.0
          const wave = cycle < 0.5 ? Math.sin((cycle / 0.5) * Math.PI) : 0
          const targetH = minH + (maxH * 0.45 - minH) * wave
          smoothed.current[i] += (targetH - smoothed.current[i]) * 0.12
        }
        applyBars(smoothed.current)
        rafRef.current = requestAnimationFrame(animate)
      }
      rafRef.current = requestAnimationFrame(animate)
      return () => cancelAnimationFrame(rafRef.current)
    }

    cancelAnimationFrame(rafRef.current)
    const animateStatic = () => {
      updateHoverBoost()
      for (let i = 0; i < BAR_COUNT; i++) {
        smoothed.current[i] = reduceMotion
          ? minH
          : smoothed.current[i] + (minH - smoothed.current[i]) * 0.14
      }
      applyBars(smoothed.current)
      rafRef.current = requestAnimationFrame(animateStatic)
    }
    rafRef.current = requestAnimationFrame(animateStatic)
    return () => cancelAnimationFrame(rafRef.current)
  }, [state, size, reduceMotion])

  const barW = size * 0.055
  const gap = size * 0.035
  const radius = size * 0.03
  const maxH = size * 0.55
  const minH = size * 0.06

  const rootStyle: CSSProperties = {
    width: size,
    height: size,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    ...style,
  }

  const initialBg = state === 'error' ? 'var(--color-destructive)' : 'var(--color-accent)'

  const content = (
    <span
      ref={containerRef}
      onMouseEnter={() => {
        if (disabled) return
        hoveredRef.current = true
      }}
      onMouseLeave={() => {
        hoveredRef.current = false
      }}
      onTouchEnd={() => {
        touchEndTimerRef.current = setTimeout(() => {
          hoveredRef.current = false
        }, 180)
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap,
        cursor: interactive ? (disabled ? 'not-allowed' : 'pointer') : 'default',
        transition: reduceMotion ? 'none' : 'transform 180ms cubic-bezier(0.23, 1, 0.32, 1)',
      }}
    >
      {Array.from({ length: BAR_COUNT }, (_, i) => (
        <span
          key={i}
          ref={(el) => {
            barRefs.current[i] = el
          }}
          style={{
            width: barW,
            minHeight: minH,
            maxHeight: maxH,
            height: minH,
            borderRadius: radius,
            background: initialBg,
            transition: reduceMotion ? 'none' : 'opacity 200ms ease-out',
          }}
        />
      ))}
    </span>
  )

  if (interactive) {
    return (
      <button
        {...controlProps}
        type="button"
        className={className}
        disabled={disabled}
        onClick={disabled ? undefined : onClick}
        style={{
          appearance: 'none',
          WebkitAppearance: 'none',
          border: 0,
          padding: 0,
          margin: 0,
          background: 'transparent',
          color: 'inherit',
          font: 'inherit',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: reduceMotion ? 'none' : 'transform 160ms cubic-bezier(0.23, 1, 0.32, 1)',
          ...rootStyle,
        }}
        onMouseDown={(e) => {
          if (disabled) return
          ;(e.currentTarget as HTMLElement).style.transform = 'scale(0.96)'
        }}
        onMouseUp={(e) => {
          ;(e.currentTarget as HTMLElement).style.transform = 'scale(1)'
        }}
        onMouseLeave={(e) => {
          ;(e.currentTarget as HTMLElement).style.transform = 'scale(1)'
        }}
      >
        {content}
      </button>
    )
  }

  return (
    <div {...controlProps} className={className} style={rootStyle}>
      {content}
    </div>
  )
}

export function BarsThemePreview() {
  return <BarsTheme state="listening" volume={0.5} size={180} />
}

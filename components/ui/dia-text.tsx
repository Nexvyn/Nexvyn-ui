'use client'

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type AnimationPlaybackControls,
} from 'motion/react'
import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
} from 'react'
import { cn } from '@/lib/utils'
import { springs } from '@/lib/motion-tokens'

export interface DiaTextProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children: string | string[]
  variant?: 'clip' | 'sweep'
  direction?: 'left' | 'right'
  angle?: number
  colors?: string[]
  textColor?: string
  duration?: number
  delay?: number
  repeat?: boolean
  repeatDelay?: number
  triggerOnView?: boolean
  once?: boolean
  fixedWidth?: boolean
  className?: string
}

function buildClipPath(progress: number, direction: 'left' | 'right', angle: number): string {
  const offset = Math.tan((angle * Math.PI) / 180) * 100

  if (direction === 'left') {
    const right = progress * (100 + offset)
    const topRight = Math.max(0, right - offset)
    return `polygon(0% 0%, ${topRight}% 0%, ${right}% 100%, 0% 100%)`
  }

  const left = 100 - progress * (100 + offset)
  const topLeft = Math.min(100, left + offset)
  return `polygon(${topLeft}% 0%, 100% 0%, 100% 100%, ${left}% 100%)`
}

const SWEEP_BAND_HALF = 17
const SWEEP_START = -SWEEP_BAND_HALF
const SWEEP_END = 100 + SWEEP_BAND_HALF
const SWEEP_SWAP_EASE = [0.22, 1, 0.36, 1] as const

const sweepEase = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2)

/** Deliberate exception to the neutral+accent palette rule in AGENTS.md. */
const DEFAULT_SWEEP_COLORS = ['#c679c4', '#fa3d1d', '#ffb005', '#e1e1fe', '#0358f7']

function buildSweepGradient(pos: number, colors: string[], textColor: string): string {
  const bandStart = pos - SWEEP_BAND_HALF
  const bandEnd = pos + SWEEP_BAND_HALF

  if (bandStart >= 100) {
    return `linear-gradient(90deg, ${textColor}, ${textColor})`
  }

  const parts: string[] = []

  if (bandStart > 0) {
    parts.push(`${textColor} 0%`, `${textColor} ${bandStart.toFixed(2)}%`)
  }

  const lastStop = colors.length - 1
  colors.forEach((color, index) => {
    const pct = lastStop === 0 ? pos : bandStart + (index / lastStop) * SWEEP_BAND_HALF * 2
    parts.push(`${color} ${pct.toFixed(2)}%`)
  })

  // Text ahead of the band stays transparent so it paints in as the band passes.
  if (bandEnd < 100) {
    parts.push(`transparent ${bandEnd.toFixed(2)}%`, 'transparent 100%')
  }

  return `linear-gradient(90deg, ${parts.join(', ')})`
}

function measureWidths(element: HTMLElement, texts: string[]): number[] {
  const ghost = element.cloneNode() as HTMLElement

  Object.assign(ghost.style, {
    position: 'absolute',
    visibility: 'hidden',
    pointerEvents: 'none',
    width: 'auto',
    whiteSpace: 'nowrap',
  })

  element.parentElement?.appendChild(ghost)

  const widths = texts.map((entry) => {
    ghost.textContent = entry
    return ghost.getBoundingClientRect().width
  })

  ghost.remove()
  return widths
}

function useSweepReveal({
  texts,
  colors,
  textColor,
  duration,
  delay,
  repeat,
  repeatDelay,
  isVisible,
  once,
}: {
  texts: string[]
  colors: string[]
  textColor: string
  duration: number
  delay: number
  repeat: boolean
  repeatDelay: number
  isVisible: boolean
  once: boolean
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const indexRef = useRef(0)
  const hasPlayedRef = useRef(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const controlsRef = useRef<AnimationPlaybackControls | undefined>(undefined)
  const previousTextKeyRef = useRef('')

  const sweepPos = useMotionValue(SWEEP_START)
  const textOpacity = useMotionValue(1)
  const textBlur = useMotionValue(0)
  const textShift = useMotionValue(0)
  const previousActiveIndexRef = useRef(0)

  const textKey = texts.join('\0')
  const isMulti = texts.length > 1

  const backgroundImage = useTransform(sweepPos, (pos) =>
    buildSweepGradient(pos, colors, textColor),
  )
  const contentFilter = useTransform(textBlur, (blur) => `blur(${blur.toFixed(2)}px)`)
  const contentTransform = useTransform(
    textShift,
    (shift) => `translateY(${(-2 + shift).toFixed(2)}px)`,
  )

  const clearCycle = useCallback(() => {
    controlsRef.current?.stop()
    controlsRef.current = undefined
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = undefined
  }, [])

  const playRef = useRef<() => void>(() => undefined)

  const play = useCallback(() => {
    clearCycle()
    sweepPos.set(SWEEP_START)

    controlsRef.current = animate(sweepPos, SWEEP_END, {
      duration,
      delay,
      ease: sweepEase,
      onComplete() {
        if (!repeat || texts.length === 0) return

        timerRef.current = setTimeout(() => {
          const next = (indexRef.current + 1) % texts.length
          indexRef.current = next
          setActiveIndex(next)
          playRef.current()
        }, repeatDelay * 1000)
      },
    })
  }, [clearCycle, delay, duration, repeat, repeatDelay, sweepPos, texts])

  useEffect(() => {
    playRef.current = play
  }, [play])

  useEffect(() => {
    if (textKey === previousTextKeyRef.current) return

    previousTextKeyRef.current = textKey
    indexRef.current = 0
    setActiveIndex(0)
    hasPlayedRef.current = false
    clearCycle()
    sweepPos.set(SWEEP_START)

    if (isVisible) {
      hasPlayedRef.current = true
      playRef.current()
    }
  }, [clearCycle, isVisible, sweepPos, textKey])

  useEffect(() => {
    if (!isVisible) {
      if (!once) hasPlayedRef.current = false
      return
    }

    if (once && hasPlayedRef.current) return

    hasPlayedRef.current = true
    playRef.current()

    return clearCycle
  }, [clearCycle, isVisible, once])

  useEffect(() => {
    if (!isMulti) {
      textOpacity.set(1)
      textBlur.set(0)
      textShift.set(0)
      previousActiveIndexRef.current = activeIndex
      return
    }

    if (previousActiveIndexRef.current === activeIndex) return

    previousActiveIndexRef.current = activeIndex
    textOpacity.set(0.58)
    textBlur.set(8)
    textShift.set(5.5)

    const opacityControls = animate(textOpacity, 1, { duration: 0.26, ease: SWEEP_SWAP_EASE })
    const blurControls = animate(textBlur, 0, { duration: 0.34, ease: SWEEP_SWAP_EASE })
    const shiftControls = animate(textShift, 0, { duration: 0.34, ease: SWEEP_SWAP_EASE })

    return () => {
      opacityControls.stop()
      blurControls.stop()
      shiftControls.stop()
    }
  }, [activeIndex, isMulti, textBlur, textOpacity, textShift])

  useEffect(() => clearCycle, [clearCycle])

  return { activeIndex, backgroundImage, contentFilter, contentTransform, textOpacity, isMulti }
}

export const DiaText = forwardRef<HTMLDivElement, DiaTextProps>(
  (
    {
      children,
      variant = 'clip',
      direction = 'left',
      angle = 12,
      colors = DEFAULT_SWEEP_COLORS,
      textColor = 'var(--color-fg)',
      duration = 1.5,
      delay = 0,
      repeat = false,
      repeatDelay = 0.5,
      triggerOnView = true,
      once = true,
      fixedWidth = false,
      className,
      ...props
    },
    ref,
  ) => {
    const reduceMotion = useReducedMotion()
    const containerRef = useRef<HTMLDivElement | null>(null)
    const contentRef = useRef<HTMLSpanElement | null>(null)
    const [isInView, setIsInView] = useState(false)
    const [hasAnimated, setHasAnimated] = useState(false)
    const [measuredWidths, setMeasuredWidths] = useState<number[]>([])

    const texts = useMemo(() => (Array.isArray(children) ? children : [children]), [children])

    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        containerRef.current = node
        if (typeof ref === 'function') {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
      },
      [ref],
    )

    useEffect(() => {
      const node = containerRef.current
      if (!node) return

      if (reduceMotion) return

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setIsInView(true)
              setHasAnimated(true)
              if (once) observer.disconnect()
            } else if (!once) {
              setIsInView(false)
            }
          }
        },
        { threshold: 0.1 },
      )

      observer.observe(node)

      return () => {
        observer.disconnect()
      }
    }, [once, reduceMotion])

    const sweepVisible = variant === 'sweep' && !reduceMotion && (triggerOnView ? isInView : true)
    const sweep = useSweepReveal({
      texts,
      colors,
      textColor,
      duration,
      delay,
      repeat,
      repeatDelay,
      isVisible: sweepVisible,
      once,
    })

    useEffect(() => {
      const element = contentRef.current
      if (variant !== 'sweep' || !element || texts.length <= 1) {
        setMeasuredWidths([])
        return
      }
      setMeasuredWidths(measureWidths(element, texts))
    }, [variant, texts])

    const fixedW =
      texts.length > 1 && fixedWidth && measuredWidths.length > 0
        ? Math.max(...measuredWidths)
        : undefined
    const animatedW =
      texts.length > 1 && !fixedWidth && measuredWidths[sweep.activeIndex] != null
        ? measuredWidths[sweep.activeIndex]
        : undefined

    const hiddenClip = buildClipPath(0, direction, angle)
    const revealedClip = buildClipPath(1, direction, angle)
    const showStatic = reduceMotion || (once && hasAnimated && !isInView)
    const label = texts[variant === 'sweep' ? sweep.activeIndex : 0]

    if (variant === 'sweep') {
      const wrapperStyle: CSSProperties = {
        ...(texts.length > 1 && {
          display: 'inline-block',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          verticalAlign: 'bottom',
          ...(fixedW != null && { width: fixedW }),
        }),
      }

      return (
        <div ref={setRefs} className={cn('relative', className)} aria-label={label} {...props}>
          <span className="sr-only">{label}</span>
          <motion.span
            aria-hidden="true"
            animate={animatedW != null ? { width: animatedW } : undefined}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="align-bottom text-inherit leading-none"
            style={wrapperStyle}
          >
            {reduceMotion ? (
              <span
                ref={contentRef}
                className="inline-block text-inherit leading-none"
                style={{ color: textColor }}
              >
                {label}
              </span>
            ) : (
              <motion.span
                ref={contentRef}
                className="inline-block text-inherit leading-none"
                style={{
                  display: 'inline-block',
                  color: 'transparent',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  backgroundSize: '100% 100%',
                  backgroundImage: sweep.backgroundImage,
                  opacity: sweep.textOpacity,
                  filter: sweep.contentFilter,
                  transform: sweep.contentTransform,
                  willChange: 'filter, opacity, transform',
                }}
              >
                {label}
              </motion.span>
            )}
          </motion.span>
        </div>
      )
    }

    return (
      <div ref={setRefs} className={cn('relative', className)} aria-label={label} {...props}>
        <span className="sr-only">{label}</span>

        {showStatic ? (
          <span aria-hidden="true" className="block text-(--color-fg)">
            {label}
          </span>
        ) : (
          <motion.span
            aria-hidden="true"
            className="block text-(--color-fg)"
            initial={{ clipPath: hiddenClip }}
            animate={isInView ? { clipPath: revealedClip } : { clipPath: hiddenClip }}
            transition={springs.settle}
          >
            {label}
          </motion.span>
        )}
      </div>
    )
  },
)

DiaText.displayName = 'DiaText'

export function DiaTextPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <DiaText
        variant="sweep"
        repeat
        repeatDelay={0.6}
        once={false}
        className="text-2xl font-semibold tracking-tight"
      >
        {['Fluid Precision', 'Editorial Restraint', 'Signature Motion']}
      </DiaText>
    </div>
  )
}

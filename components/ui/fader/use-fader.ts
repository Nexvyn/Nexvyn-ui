'use client'

import type { Slider as BaseSlider } from '@base-ui/react/slider'
import {
  animate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from 'motion/react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useElasticOverdrag } from '@/hooks/use-elastic-overdrag'
import { springs } from '@/lib/motion-tokens'
import { barCenterFor, fillEdgePx } from './geometry'

const DISCRETE_LIMIT = 12
const DODGE_ZONE = 6
const LARGE_STEP_FRACTION = 4

function decimalsFor(step: number): number {
  const fraction = step.toString().split('.')[1]
  return Math.min(3, fraction?.length ?? 0)
}

function nearestIndex(points: number[], value: number): number {
  let best = 0
  for (let i = 1; i < points.length; i++) {
    if (Math.abs(points[i] - value) < Math.abs(points[best] - value)) best = i
  }
  return best
}

export interface UseFaderOptions {
  label: string
  value: number
  onValueChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  unit?: string
  points?: number[]
  disabled?: boolean
  remeasureKey?: unknown
}

const formatterCache = new Map<number, Intl.NumberFormat>()
function formatterFor(decimals: number): Intl.NumberFormat {
  let formatter = formatterCache.get(decimals)
  if (!formatter) {
    formatter = new Intl.NumberFormat(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
    formatterCache.set(decimals, formatter)
  }
  return formatter
}

export function useFader(options: UseFaderOptions) {
  const {
    label,
    value,
    onValueChange,
    min = 0,
    max = 100,
    step = 1,
    unit,
    points,
    disabled = false,
    remeasureKey,
  } = options

  const controlRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const valueRef = useRef<HTMLOutputElement>(null)
  const settleRef = useRef<ReturnType<typeof animate> | null>(null)
  const settleTargetRef = useRef<number | null>(null)
  const percentRef = useRef(toPercent(value))
  const reconcileTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const zonesRef = useRef({
    labelStart: 0,
    labelEnd: 0,
    valueStart: Number.POSITIVE_INFINITY,
  })

  const [focusVisible, setFocusVisible] = useState(false)
  const [dodge, setDodge] = useState(false)
  const reducedMotion = useReducedMotion()

  const overdrag = useElasticOverdrag({
    disabled,
    reduceMotion: reducedMotion ?? false,
  })

  const sortedPoints = points ? [...points].sort((a, b) => a - b) : null
  const decimals = decimalsFor(step)
  const formatted = formatterFor(decimals).format(value)

  function toPercent(v: number): number {
    if (max <= min) return 0
    return ((v - min) / (max - min)) * 100
  }
  const percent = toPercent(value)
  percentRef.current = percent

  const stepRatio = (max - min) / step
  const fullSteps = Math.floor(stepRatio + 1e-9)
  const stops = fullSteps + (stepRatio - fullSteps > 1e-9 ? 2 : 1)
  const isSnappy = sortedPoints !== null || stops <= DISCRETE_LIMIT

  let markCandidates: number[] = []
  if (sortedPoints) {
    markCandidates = sortedPoints.map(toPercent)
  } else if (isSnappy) {
    markCandidates = Array.from({ length: fullSteps }, (_, i) => toPercent(min + (i + 1) * step))
  }
  const markPercents = markCandidates.filter((pct) => pct > 0.5 && pct < 99.5)

  const fillPercent = useMotionValue(percent)
  const trackWidth = useMotionValue(0)
  const fillWidth = useTransform(() => {
    const tw = trackWidth.get()
    if (!tw) return `${Math.min(Math.max(fillPercent.get(), 0), 100)}%`
    return fillEdgePx(fillPercent.get(), tw)
  })

  function updateDodge() {
    const tw = trackWidth.get()
    if (!tw) return
    const zones = zonesRef.current
    const barCenter = barCenterFor(fillEdgePx(fillPercent.get(), tw))
    setDodge(
      (barCenter > zones.labelStart - DODGE_ZONE && barCenter < zones.labelEnd + DODGE_ZONE) ||
        barCenter > zones.valueStart - DODGE_ZONE,
    )
  }
  useMotionValueEvent(fillPercent, 'change', updateDodge)

  useEffect(() => {
    if (settleRef.current && settleTargetRef.current === percent) return
    settleRef.current?.stop()
    settleRef.current = null
    settleTargetRef.current = null
    fillPercent.set(percent)
  }, [percent, fillPercent])

  useEffect(
    () => () => {
      settleRef.current?.stop()
      if (reconcileTimeoutRef.current !== null) {
        clearTimeout(reconcileTimeoutRef.current)
      }
    },
    [],
  )

  useEffect(() => {
    if (overdrag.dragging) return
    reconcileTimeoutRef.current = setTimeout(() => {
      reconcileTimeoutRef.current = null
      if (settleRef.current) return
      if (fillPercent.get() !== percentRef.current) {
        fillPercent.set(percentRef.current)
      }
    }, 300)
    return () => {
      if (reconcileTimeoutRef.current !== null) {
        clearTimeout(reconcileTimeoutRef.current)
        reconcileTimeoutRef.current = null
      }
    }
  }, [overdrag.dragging, fillPercent])

  // biome-ignore lint/correctness/useExhaustiveDependencies: keyed on points content via join(",") — literal arrays get a new identity every render
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return
    if (min >= max) {
      console.warn(
        `Fader "${label}": min (${min}) must be less than max (${max}) — percent math degenerates to NaN.`,
      )
    }
    if (!points) return
    if (points.length < 2) {
      console.warn(
        `Fader "${label}": \`points\` needs at least 2 entries to be a grammar; got ${points.length}.`,
      )
    }
    const outside = points.filter((p) => p < min || p > max)
    if (outside.length > 0) {
      console.warn(`Fader "${label}": points outside [${min}, ${max}]: ${outside.join(', ')}.`)
    }
  }, [points?.join(','), min, max, label])

  function measureZones() {
    const control = controlRef.current
    if (!control) return
    const controlRect = control.getBoundingClientRect()
    if (controlRect.width === 0) return
    const labelRect = labelRef.current?.getBoundingClientRect()
    const valueRect = valueRef.current?.getBoundingClientRect()
    zonesRef.current = {
      labelStart: labelRect ? labelRect.left - controlRect.left : 0,
      labelEnd: labelRect ? labelRect.right - controlRect.left : 0,
      valueStart: valueRect ? valueRect.left - controlRect.left : controlRect.width,
    }
    trackWidth.set(controlRect.width)
    updateDodge()
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: keyed on the inputs that change rendered text geometry; measureZones reads refs and motion values only
  useLayoutEffect(() => {
    measureZones()
  }, [formatted.length, label, unit, remeasureKey])

  // biome-ignore lint/correctness/useExhaustiveDependencies: mount-only; the observer callback reads refs and motion values, never render values
  useEffect(() => {
    const control = controlRef.current
    if (!control) return
    const observer = new ResizeObserver(() => measureZones())
    observer.observe(control)
    return () => observer.disconnect()
  }, [])

  function stopSettle() {
    if (settleRef.current) {
      settleRef.current.stop()
      settleRef.current = null
    }
    settleTargetRef.current = null
  }

  function settleTo(pct: number) {
    stopSettle()
    if (reducedMotion) {
      fillPercent.jump(pct)
      return
    }
    settleTargetRef.current = pct
    settleRef.current = animate(fillPercent, pct, {
      ...springs.settle,
      velocity: fillPercent.getVelocity(),
      onComplete: () => {
        settleRef.current = null
        settleTargetRef.current = null
        if (fillPercent.get() !== percentRef.current) {
          fillPercent.set(percentRef.current)
        }
      },
    })
  }

  function handleValueChange(next: number | number[], details: BaseSlider.Root.ChangeEventDetails) {
    const raw = Array.isArray(next) ? next[0] : next
    if (details.reason === 'keyboard') {
      stopSettle()
      if (sortedPoints) {
        const current = nearestIndex(sortedPoints, value)
        const key = details.event.key
        let idx: number
        if (key === 'Home') idx = 0
        else if (key === 'End') idx = sortedPoints.length - 1
        else if (key === 'PageUp' || key === 'PageDown') {
          const jump = Math.max(1, Math.round(sortedPoints.length / LARGE_STEP_FRACTION))
          idx = Math.min(
            sortedPoints.length - 1,
            Math.max(0, current + (key === 'PageUp' ? jump : -jump)),
          )
        } else {
          idx = Math.min(sortedPoints.length - 1, Math.max(0, current + (raw > value ? 1 : -1)))
        }
        onValueChange(sortedPoints[idx])
        return
      }
      onValueChange(raw)
      return
    }
    if (details.reason === 'track-press' || details.reason === 'drag') {
      if (sortedPoints) {
        const snapped = sortedPoints[nearestIndex(sortedPoints, raw)]
        if (snapped !== value) {
          settleTo(toPercent(snapped))
          onValueChange(snapped)
        }
        return
      }
      if (isSnappy) {
        if (raw !== value) {
          settleTo(toPercent(raw))
          onValueChange(raw)
        }
        return
      }
      if (details.reason === 'track-press') {
        settleTo(toPercent(raw))
        onValueChange(raw)
      } else {
        stopSettle()
        fillPercent.set(toPercent(raw))
        onValueChange(raw)
      }
      return
    }
    stopSettle()
    onValueChange(raw)
  }

  return {
    labelRef,
    valueRef,
    rootProps: {
      value,
      min,
      max,
      step,
      disabled,
      format: {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      },
      onValueChange: handleValueChange,
    },
    controlProps: {
      ref: controlRef,
      onPointerDown: overdrag.onPointerDown,
    },
    thumbProps: {
      getAriaValueText: (formattedValue: string) =>
        unit ? `${formattedValue}${unit}` : formattedValue,
      onFocus: (event: React.FocusEvent<HTMLInputElement>) =>
        setFocusVisible(event.target.matches(':focus-visible')),
      onBlur: () => setFocusVisible(false),
    },
    grabbed: overdrag.dragging,
    focusVisible,
    dodge,
    reducedMotion,
    markPercents,
    fillPercent,
    trackWidth,
    fillWidth,
    trackScaleX: overdrag.scaleX,
    trackOrigin: overdrag.transformOrigin,
  }
}

'use client'

import { forwardRef, useState, useRef, useCallback, useEffect, type HTMLAttributes } from 'react'
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from 'motion/react'
import { cn } from '@/lib/utils'
import { springs } from '@/lib/motion-tokens'

export interface RatioSliderProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange' | 'defaultValue'
> {
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  leftLabel?: string
  rightLabel?: string
  leftColor?: string
  rightColor?: string
  leftLabelColor?: string
  rightLabelColor?: string
  disabled?: boolean
}

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n))
}

export const RatioSlider = forwardRef<HTMLDivElement, RatioSliderProps>(
  (
    {
      value,
      defaultValue = 60,
      onChange,
      min = 0,
      max = 100,
      step = 1,
      leftLabel = 'RICH',
      rightLabel = 'LIGHT',
      leftColor = 'var(--color-fg)',
      rightColor = 'var(--color-muted)',
      leftLabelColor = 'var(--color-bg)',
      rightLabelColor = 'var(--color-fg)',
      disabled = false,
      className,
      ...rest
    },
    ref,
  ) => {
    const isControlled = value !== undefined
    const [internal, setInternal] = useState(defaultValue)
    const leftRatio = isControlled ? value : internal

    const reduceMotion = useReducedMotion()
    const [isCompact, setIsCompact] = useState(false)
    const sliderRef = useRef<HTMLDivElement>(null)
    const leftBarRef = useRef<HTMLDivElement>(null)
    const rightBarRef = useRef<HTMLDivElement>(null)
    const leftLabelRef = useRef<HTMLDivElement>(null)
    const rightLabelRef = useRef<HTMLDivElement>(null)
    const isDragging = useRef(false)
    const [draggingState, setDraggingState] = useState(false)

    const ratio = 100 - leftRatio
    const barHeight = isCompact ? 32 : 60
    const labelsRowHeight = 32
    const gap = 16
    const edgePadding = 16

    const leftPercent = useMotionValue(leftRatio)
    const settleRef = useRef<ReturnType<typeof animate> | null>(null)
    const settleTargetRef = useRef<number | null>(null)

    const stopSettle = useCallback(() => {
      settleRef.current?.stop()
      settleRef.current = null
      settleTargetRef.current = null
    }, [])

    const settleTo = useCallback(
      (target: number) => {
        stopSettle()
        if (reduceMotion) {
          leftPercent.jump(target)
          return
        }
        settleTargetRef.current = target
        settleRef.current = animate(leftPercent, target, {
          ...springs.settle,
          velocity: leftPercent.getVelocity(),
          onComplete: () => {
            settleRef.current = null
            settleTargetRef.current = null
          },
        })
      },
      [leftPercent, reduceMotion, stopSettle],
    )

    useEffect(() => {
      if (settleRef.current && settleTargetRef.current === leftRatio) return
      stopSettle()
      leftPercent.set(leftRatio)
    }, [leftRatio, leftPercent, stopSettle])

    useEffect(() => () => settleRef.current?.stop(), [])

    const leftWidth = useTransform(leftPercent, (p) => `calc(${p}% - 9px)`)
    const rightWidth = useTransform(leftPercent, (p) => `calc(${100 - p}% - 9px)`)

    const commit = useCallback(
      (next: number) => {
        const clamped = clamp(Math.round(next / step) * step, min, max)
        if (!isControlled) setInternal(clamped)
        onChange?.(clamped)
      },
      [isControlled, onChange, min, max, step],
    )

    const checkLabelFit = useCallback(() => {
      const leftBar = leftBarRef.current
      const rightBar = rightBarRef.current
      const leftLabel = leftLabelRef.current
      const rightLabel = rightLabelRef.current
      if (!leftBar || !rightBar || !leftLabel || !rightLabel) return
      const leftBarWidth = leftBar.getBoundingClientRect().width
      const rightBarWidth = rightBar.getBoundingClientRect().width
      const leftLabelWidth = leftLabel.getBoundingClientRect().width
      const rightLabelWidth = rightLabel.getBoundingClientRect().width
      setIsCompact(
        leftBarWidth < leftLabelWidth + edgePadding ||
          rightBarWidth < rightLabelWidth + edgePadding,
      )
    }, [edgePadding])

    useEffect(() => {
      if (typeof window === 'undefined') return
      checkLabelFit()
      const rafId = requestAnimationFrame(checkLabelFit)
      window.addEventListener('resize', checkLabelFit)
      return () => {
        window.removeEventListener('resize', checkLabelFit)
        cancelAnimationFrame(rafId)
      }
    }, [leftRatio, checkLabelFit])

    useMotionValueEvent(leftPercent, 'change', checkLabelFit)

    const percentFromPosition = useCallback((clientX: number) => {
      if (!sliderRef.current) return null
      const rect = sliderRef.current.getBoundingClientRect()
      const x = clientX - rect.left
      return clamp((x / rect.width) * 100, 0, 100)
    }, [])

    const onPointerDown = useCallback(
      (e: React.PointerEvent) => {
        if (disabled) return
        e.preventDefault()
        isDragging.current = true
        setDraggingState(true)
        const percent = percentFromPosition(e.clientX)
        if (percent !== null) {
          commit(percent)
          settleTo(percent)
        }
        ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
      },
      [percentFromPosition, commit, settleTo, disabled],
    )

    const onPointerMove = useCallback(
      (e: React.PointerEvent) => {
        if (!isDragging.current || disabled) return
        const percent = percentFromPosition(e.clientX)
        if (percent !== null) {
          stopSettle()
          leftPercent.set(percent)
          commit(percent)
        }
      },
      [percentFromPosition, stopSettle, leftPercent, commit, disabled],
    )

    const onPointerUp = useCallback(() => {
      isDragging.current = false
      setDraggingState(false)
    }, [])

    const onKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return
        let next = leftRatio
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') next = leftRatio + step
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') next = leftRatio - step
        else if (e.key === 'Home') next = min
        else if (e.key === 'End') next = max
        else return
        e.preventDefault()
        commit(next)
      },
      [leftRatio, step, min, max, commit, disabled],
    )

    return (
      <div
        ref={ref}
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-valuenow={leftRatio}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={`${leftLabel} / ${rightLabel} ratio`}
        aria-disabled={disabled || undefined}
        data-state={draggingState ? 'dragging' : 'idle'}
        data-disabled={disabled || undefined}
        className={cn(
          'w-full flex flex-col select-none',
          disabled ? 'cursor-not-allowed opacity-60' : 'cursor-ew-resize',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg) rounded-lg',
          className,
        )}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
        {...rest}
      >
        <div className="relative h-8 mb-4">
          <div
            ref={leftLabelRef}
            className={cn(
              'absolute inset-s-3 top-0 flex items-center gap-2 font-medium text-xs tracking-wide whitespace-nowrap z-1',
              reduceMotion
                ? ''
                : 'transition-[color,transform] duration-200 ease-(--motion-ease-in-out)',
            )}
            style={{
              color: isCompact ? leftColor : leftLabelColor,
              transform: `translateY(calc(${isCompact ? labelsRowHeight / 2 : labelsRowHeight + gap + barHeight / 2}px - 50%))`,
            }}
          >
            <span className="opacity-80">{leftLabel}</span>
            <span className="font-bold tabular-nums">{leftRatio}%</span>
          </div>
          <div
            ref={rightLabelRef}
            className={cn(
              'absolute inset-e-3 top-0 flex items-center gap-2 font-medium text-xs tracking-wide whitespace-nowrap z-1',
              reduceMotion
                ? ''
                : 'transition-[color,transform] duration-200 ease-(--motion-ease-in-out)',
            )}
            style={{
              color: isCompact ? rightColor : rightLabelColor,
              transform: `translateY(calc(${isCompact ? labelsRowHeight / 2 : labelsRowHeight + gap + barHeight / 2}px - 50%))`,
            }}
          >
            <span className="font-bold tabular-nums">{ratio}%</span>
            <span className="opacity-80">{rightLabel}</span>
          </div>
        </div>

        <div
          ref={sliderRef}
          className={cn(
            'relative w-full flex items-center gap-2 touch-none',
            reduceMotion ? '' : 'transition-[height] duration-200 ease-out',
          )}
          style={{ height: barHeight }}
        >
          <motion.div
            ref={leftBarRef}
            className={cn(
              'h-full rounded-lg flex items-center justify-start overflow-hidden',
              reduceMotion ? '' : 'transition-[filter] duration-100',
            )}
            style={{ backgroundColor: leftColor, width: leftWidth }}
          />
          <div
            className={cn(
              'w-1.5 h-[80%] rounded-full z-10 shrink-0',
              reduceMotion ? '' : 'transition-transform duration-150',
            )}
            style={{
              backgroundColor: 'var(--color-accent)',
              border: '1.5px solid var(--color-fg)',
              transform: draggingState ? 'scaleY(1.15)' : 'scaleY(1)',
            }}
          />
          <motion.div
            ref={rightBarRef}
            className={cn(
              'h-full rounded-lg flex items-center justify-end overflow-hidden',
              reduceMotion ? '' : 'transition-[filter] duration-100',
            )}
            style={{ backgroundColor: rightColor, width: rightWidth }}
          />
        </div>
      </div>
    )
  },
)

RatioSlider.displayName = 'RatioSlider'

export function RatioSliderPreview() {
  return (
    <div
      className="w-full h-full min-h-50 rounded-lg overflow-hidden flex items-center justify-center p-4"
      style={{ backgroundColor: 'var(--color-surface)' }}
    >
      <div className="w-full max-w-md">
        <RatioSlider />
      </div>
    </div>
  )
}

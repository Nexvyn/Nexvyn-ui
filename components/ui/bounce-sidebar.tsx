'use client'

import { useEffect, useRef, useState } from 'react'
import {
  motion,
  stagger,
  useAnimate,
  useMotionValue,
  useReducedMotion,
  type Transition,
  type Variants,
} from 'motion/react'
import { cn } from '@/lib/utils'

const EASE_OUT = [0.23, 1, 0.32, 1] as const

export type BounceSidebarProps = {
  items: string[]
  value?: number
  defaultValue?: number
  onChange?: (index: number) => void
  dotColor?: string
  className?: string
}

const itemClass = (active: boolean) =>
  cn(
    'flex w-full cursor-pointer items-center rounded-lg p-1 text-left text-sm transition-colors duration-200',
    active ? 'text-foreground' : 'text-foreground/55',
  )

export function BounceSidebar({
  items,
  value,
  defaultValue = 0,
  onChange,
  dotColor = 'var(--color-accent)',
  className,
}: BounceSidebarProps) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const activeIndex = value ?? internalValue

  const [scope, animate] = useAnimate()
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])
  const prevY = useRef<number | null>(null)

  const reduceMotion = useReducedMotion()

  const dotX = useMotionValue(0)
  const dotY = useMotionValue(0)

  const [dotSize, setDotSize] = useState(6)

  const getTargetY = (index: number, size: number): number | null => {
    const el = itemRefs.current[index]
    if (!el) return null
    const dpr = window.devicePixelRatio || 1
    return Math.round((el.offsetTop + el.offsetHeight / 2 - size / 2) * dpr) / dpr
  }

  useEffect(() => {
    let cancelled = false
    const dpr = window.devicePixelRatio || 1
    const computedSize = Math.round(6 * dpr) / dpr
    setDotSize(computedSize)

    const initialIndex = activeIndex
    const snap = () => {
      if (cancelled) return
      const toY = getTargetY(initialIndex, computedSize)
      if (toY === null) return
      dotX.set(0)
      dotY.set(toY)
      prevY.current = toY
    }
    const raf = requestAnimationFrame(snap)
    document.fonts?.ready.then(snap)
    const ro = new ResizeObserver(snap)
    itemRefs.current.forEach((el) => el && ro.observe(el))
    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  useEffect(() => {
    const toY = getTargetY(activeIndex, dotSize)
    if (toY === null) return

    if (prevY.current === null) {
      dotX.set(0)
      dotY.set(toY)
      prevY.current = toY
      return
    }

    const fromY = prevY.current
    const delta = toY - fromY
    prevY.current = toY
    if (delta === 0) return

    if (reduceMotion) {
      dotX.set(0)
      dotY.set(toY)
      return
    }

    const distance = Math.abs(delta)

    const yDuration = 0.5
    const yTransition: Transition = { duration: yDuration, ease: EASE_OUT }

    const strength = Math.min(0.6, 20 / distance)
    const peakX = -strength * distance

    animate(dotY, toY, yTransition)
    animate(dotX, [0, peakX, 0], {
      duration: yDuration,
      ease: EASE_OUT,
      times: [0, 0.4, 1],
    })
  }, [activeIndex, animate, dotX, dotY, dotSize, reduceMotion])

  const select = (index: number) => {
    if (value === undefined) setInternalValue(index)
    onChange?.(index)
  }

  return (
    <ul className={cn('relative flex flex-col gap-1 pl-6', className)}>
      <motion.span
        ref={scope}
        aria-hidden
        className="absolute left-2 top-0 rounded-full"
        style={{
          x: dotX,
          y: dotY,
          width: dotSize,
          height: dotSize,
          backgroundColor: dotColor,
        }}
      />

      {items.map((item, index) => {
        const isActive = index === activeIndex
        return (
          <li
            key={item}
            ref={(el) => {
              itemRefs.current[index] = el
            }}
          >
            <motion.button
              type="button"
              onClick={() => select(index)}
              aria-current={isActive ? 'true' : undefined}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              className={itemClass(isActive)}
            >
              {item}
            </motion.button>
          </li>
        )
      })}
    </ul>
  )
}

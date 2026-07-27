'use client'

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
} from 'react'
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
import { playHoverSound, playClickSound, playBounceSound } from '@/lib/sound'

const EASE_OUT = [0.22, 1, 0.36, 1] as const

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
    'flex w-full cursor-pointer items-center rounded-lg p-1 text-left text-base',
    'transition-colors duration-150',
    'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-(--color-accent) focus-visible:ring-offset-1 focus-visible:ring-offset-(--color-bg)',
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

  const dotSize = useSyncExternalStore(
    () => () => {},
    () => Math.round(6 * (window.devicePixelRatio || 1)) / (window.devicePixelRatio || 1),
    () => 6,
  )

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

    const initialIndex = activeIndex
    const snap = () => {
      if (cancelled) return
      const toY = getTargetY(initialIndex, computedSize)
      if (toY === null) return
      dotX.set(0)
      dotY.set(toY)
      prevY.current = toY
    }

    const ro = new ResizeObserver(snap)
    itemRefs.current.forEach((el) => el && ro.observe(el))

    const raf = requestAnimationFrame(snap)
    document.fonts?.ready.then(snap)
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
    const distance = Math.abs(delta)
    playBounceSound()

    const yDuration = 0.45
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

  const select = useCallback(
    (index: number) => {
      playBounceSound()
      if (value === undefined) setInternalValue(index)
      onChange?.(index)
    },
    [value, onChange],
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLUListElement>) => {
      const count = items.length
      if (count === 0) return

      let next = activeIndex

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        next = (activeIndex + 1) % count
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        next = (activeIndex - 1 + count) % count
      } else if (e.key === 'Home') {
        e.preventDefault()
        next = 0
      } else if (e.key === 'End') {
        e.preventDefault()
        next = count - 1
      }

      if (next !== activeIndex) {
        select(next)
        const buttons = itemRefs.current.map((el) => el?.querySelector('button'))
        buttons[next]?.focus()
      }
    },
    [activeIndex, items.length, select],
  )

  return (
    <ul
      role="listbox"
      aria-label="Navigation"
      onKeyDown={handleKeyDown}
      className={cn('relative flex flex-col gap-1 ps-6', className)}
    >
      <motion.span
        ref={scope}
        aria-hidden
        className="absolute inset-s-2 top-0 rounded-full"
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
            role="option"
            aria-selected={isActive}
          >
            <motion.button
              type="button"
              tabIndex={isActive ? 0 : -1}
              onMouseEnter={() => playHoverSound()}
              onPointerDown={() => select(index)}
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

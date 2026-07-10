'use client'

import { useRef, useState, useCallback, useEffect, type RefObject } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type MotionValue,
  type MotionStyle,
} from 'motion/react'
import { springs } from '@/lib/motion-tokens'

export interface ItemRect {
  top: number
  height: number
  left: number
  width: number
}

interface UseProximityHighlightOptions {
  axis?: 'x' | 'y'
  spring?: { stiffness: number; damping: number; mass: number }
}

interface UseProximityHighlightReturn {
  activeIndex: number | null
  setActiveIndex: (index: number | null) => void
  itemRects: ItemRect[]
  sessionRef: RefObject<number>
  handlers: {
    onMouseMove: (e: React.MouseEvent) => void
    onMouseEnter: () => void
    onMouseLeave: () => void
  }
  registerItem: (index: number, element: HTMLElement | null) => void
  measureItems: () => void
  highlightX: ReturnType<typeof useSpring>
  highlightSize: MotionValue<number>
  highlightOpacity: ReturnType<typeof useSpring>
  axis: 'x' | 'y'
}

export function useProximityHighlight<T extends HTMLElement>(
  containerRef: RefObject<T | null>,
  options: UseProximityHighlightOptions = {},
): UseProximityHighlightReturn {
  const { axis = 'y', spring: springConfig } = options
  const reduceMotion = useReducedMotion()

  const itemsRef = useRef(new Map<number, HTMLElement>())
  const [activeIndex, setActiveIndexRaw] = useState<number | null>(null)
  const activeIndexRef = useRef<number | null>(null)
  const [itemRects, setItemRects] = useState<ItemRect[]>([])
  const itemRectsRef = useRef<ItemRect[]>([])
  const sessionRef = useRef(0)
  const rafIdRef = useRef<number | null>(null)
  const remeasureRafIdRef = useRef<number | null>(null)
  const updateHighlightRef = useRef<(index: number | null) => void>(() => {})

  const rawX = useMotionValue(0)
  const highlightSize = useMotionValue(0)
  const rawOpacity = useMotionValue(0)

  const springOpts = reduceMotion ? { duration: 0 } : (springConfig ?? springs.settle)

  const highlightX = useSpring(rawX, springOpts)
  const highlightOpacity = useSpring(rawOpacity, springOpts)

  const measureItems = useCallback(() => {
    const container = containerRef.current
    if (!container) return
    const rects: ItemRect[] = []
    itemsRef.current.forEach((element, index) => {
      rects[index] = {
        top: element.offsetTop,
        height: element.offsetHeight,
        left: element.offsetLeft,
        width: element.offsetWidth,
      }
    })
    itemRectsRef.current = rects
    setItemRects(rects)
  }, [containerRef])

  const registerItem = useCallback(
    (index: number, element: HTMLElement | null) => {
      if (element) {
        itemsRef.current.set(index, element)
      } else {
        itemsRef.current.delete(index)
      }
      if (remeasureRafIdRef.current !== null) {
        cancelAnimationFrame(remeasureRafIdRef.current)
      }
      remeasureRafIdRef.current = requestAnimationFrame(() => {
        remeasureRafIdRef.current = null
        measureItems()
      })
    },
    [measureItems],
  )

  const updateHighlight = useCallback(
    (index: number | null) => {
      if (index === null || !itemRectsRef.current[index]) {
        if (reduceMotion) {
          rawOpacity.jump(0)
        } else {
          rawOpacity.set(0)
        }
        return
      }
      const r = itemRectsRef.current[index]
      if (axis === 'y') {
        if (reduceMotion) {
          rawX.jump(r.top)
          highlightSize.jump(r.height)
          rawOpacity.jump(1)
        } else {
          rawX.set(r.top)
          highlightSize.jump(r.height)
          rawOpacity.set(1)
        }
      } else {
        if (reduceMotion) {
          rawX.jump(r.left)
          highlightSize.jump(r.width)
          rawOpacity.jump(1)
        } else {
          rawX.set(r.left)
          highlightSize.jump(r.width)
          rawOpacity.set(1)
        }
      }
    },
    [axis, reduceMotion, rawX, highlightSize, rawOpacity],
  )

  useEffect(() => {
    updateHighlightRef.current = updateHighlight
  })

  const setActiveIndex = useCallback((index: number | null) => {
    setActiveIndexRaw(index)
    updateHighlightRef.current(index)
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const mouseX = e.clientX
      const mouseY = e.clientY

      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }

      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null
        const container = containerRef.current
        if (!container) return

        const containerRect = container.getBoundingClientRect()
        const mousePos = axis === 'x' ? mouseX : mouseY

        let closestIndex: number | null = null
        let closestDistance = Infinity
        let containingIndex: number | null = null

        const rects = itemRectsRef.current
        const scrollOffset = axis === 'x' ? container.scrollLeft : container.scrollTop
        const borderOffset = axis === 'x' ? container.clientLeft : container.clientTop
        const containerEdge = axis === 'x' ? containerRect.left : containerRect.top

        const layoutSize = axis === 'x' ? container.offsetWidth : container.offsetHeight
        const visualSize = axis === 'x' ? containerRect.width : containerRect.height
        const scale = layoutSize > 0 ? visualSize / layoutSize : 1

        for (let index = 0; index < rects.length; index++) {
          const r = rects[index]
          if (!r) continue

          const contentPos = axis === 'x' ? r.left : r.top
          const itemStart = containerEdge + (borderOffset + contentPos - scrollOffset) * scale
          const itemSize = (axis === 'x' ? r.width : r.height) * scale
          const itemEnd = itemStart + itemSize

          if (mousePos >= itemStart && mousePos <= itemEnd) {
            containingIndex = index
          }

          const itemCenter = itemStart + itemSize / 2
          const distance = Math.abs(mousePos - itemCenter)

          if (distance < closestDistance) {
            closestDistance = distance
            closestIndex = index
          }
        }

        const next = containingIndex ?? closestIndex
        if (next !== activeIndexRef.current) {
          activeIndexRef.current = next
          setActiveIndex(next)
        }
      })
    },
    [axis, containerRef, setActiveIndex],
  )

  const handleMouseEnter = useCallback(() => {
    sessionRef.current += 1
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = null
    }
    activeIndexRef.current = null
    setActiveIndex(null)
  }, [setActiveIndex])

  useEffect(() => {
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }
      if (remeasureRafIdRef.current !== null) {
        cancelAnimationFrame(remeasureRafIdRef.current)
      }
    }
  }, [])

  return {
    activeIndex,
    setActiveIndex,
    itemRects,
    sessionRef,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
    registerItem,
    measureItems,
    highlightX,
    highlightSize,
    highlightOpacity,
    axis,
  }
}

export interface ProximityHighlightProps {
  highlightX: ReturnType<typeof useSpring>
  highlightSize: MotionValue<number>
  highlightOpacity: ReturnType<typeof useSpring>
  axis: 'x' | 'y'
  className?: string
  style?: MotionStyle
}

export function ProximityHighlight({
  highlightX,
  highlightSize,
  highlightOpacity,
  axis,
  className,
  style,
}: ProximityHighlightProps) {
  return (
    <motion.div
      aria-hidden="true"
      className={className}
      style={{
        ...style,
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        ...(axis === 'y'
          ? { y: highlightX, height: highlightSize }
          : { x: highlightX, width: highlightSize }),
        opacity: highlightOpacity,
      }}
    />
  )
}

export function useRegisterProximityItem(
  registerItem: (index: number, element: HTMLElement | null) => void,
  index: number,
  ref: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    registerItem(index, ref.current)
    return () => registerItem(index, null)
  }, [index, registerItem, ref])
}

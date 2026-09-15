'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

export interface HorizontalScrollerProps {
  label: string
  className?: string
  children: React.ReactNode
}

export function HorizontalScroller({ label, className, children }: HorizontalScrollerProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onWheel = (event: WheelEvent) => {
      if (el.scrollWidth <= el.clientWidth + 1) return
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return
      const canScrollDown = el.scrollTop + el.clientHeight < el.scrollHeight - 1
      const canScrollUp = el.scrollTop > 0
      if ((event.deltaY > 0 && canScrollDown) || (event.deltaY < 0 && canScrollUp)) return
      const direction = getComputedStyle(el).direction === 'rtl' ? -1 : 1
      const atStart = direction * el.scrollLeft <= 0
      const atEnd = Math.abs(el.scrollLeft) + el.clientWidth >= el.scrollWidth - 1
      if ((event.deltaY < 0 && atStart) || (event.deltaY > 0 && atEnd)) return
      event.preventDefault()
      el.scrollLeft += event.deltaY * direction
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  return (
    <div
      ref={ref}
      role="region"
      aria-label={label}
      tabIndex={0}
      className={cn(
        'no-scrollbar overscroll-x-contain outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--color-accent)',
        className,
      )}
    >
      {children}
    </div>
  )
}

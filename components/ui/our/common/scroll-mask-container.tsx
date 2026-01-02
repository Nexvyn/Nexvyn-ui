"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { cn } from "@/lib/utils"

interface ScrollMaskContainerProps {
  children: React.ReactNode
  className?: string
  maskHeight?: number
}

/**
 * A container with independent scrolling and conditional gradient masks
 * that show/hide based on scroll position to indicate more content.
 */
export function ScrollMaskContainer({
  children,
  className,
  maskHeight = 32,
}: ScrollMaskContainerProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollState, setScrollState] = useState({
    atTop: true,
    atBottom: false,
  })

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return

    const { scrollTop, scrollHeight, clientHeight } = el
    setScrollState({
      atTop: scrollTop <= 1,
      atBottom: scrollTop + clientHeight >= scrollHeight - 1,
    })
  }, [])

  // Check initial scroll state
  useEffect(() => {
    handleScroll()
  }, [handleScroll])

  return (
    <div className="relative h-full">
      {/* Top gradient mask - visible when scrolled down */}
      <div
        className={cn(
          "pointer-events-none absolute top-0 right-0 left-0 z-10",
          "from-background bg-gradient-to-b to-transparent",
          "transition-opacity duration-200",
          scrollState.atTop ? "opacity-0" : "opacity-100"
        )}
        style={{ height: `${maskHeight}px` }}
      />

      {/* Scrollable content */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className={cn("scrollbar-thin h-full overflow-y-auto", className)}
      >
        {children}
      </div>

      {/* Bottom gradient mask - visible when not at bottom */}
      <div
        className={cn(
          "pointer-events-none absolute right-0 bottom-0 left-0 z-10",
          "from-background bg-gradient-to-t to-transparent",
          "transition-opacity duration-200",
          scrollState.atBottom ? "opacity-0" : "opacity-100"
        )}
        style={{ height: `${maskHeight}px` }}
      />
    </div>
  )
}

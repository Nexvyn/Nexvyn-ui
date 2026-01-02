"use client"

import { useEffect, useState, useRef, ReactNode } from "react"
import Link from "next/link"

interface Section {
  id: string
  title: ReactNode
  level: number
}

interface ScrollIndicatorProps {
  sections: Section[]
}

export function ScrollIndicator({ sections }: ScrollIndicatorProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [containerHeight, setContainerHeight] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        const height = containerRef.current.clientHeight
        setContainerHeight(height)
      }
    }

    updateHeight()
    window.addEventListener("resize", updateHeight)

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollTop / docHeight : 0
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", updateHeight)
    }
  }, [])

  // Calculate tick spacing dynamically based on container height
  const totalTicks = 96
  const tickSpacing = containerHeight > 0 ? containerHeight / totalTicks : 10

  // Filter to only show h2 and h3 sections
  const filteredSections = sections.filter((s) => s.level === 2 || s.level === 3)

  return (
    <div className="h-full w-full pl-4">
      <div
        ref={containerRef}
        className="h-full"
        style={{ opacity: 1 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="group relative z-50 h-full">
          <div className="absolute inset-0">
            {/* Tick marks - scale pattern: 4 small dashes, 1 large dash */}
            {Array.from({ length: totalTicks }).map((_, i) => {
              const position = i * tickSpacing
              // Every 5th tick is a major tick (larger)
              const isMajorTick = i % 5 === 0
              const tickWidth = isMajorTick ? "w-4" : "w-1.5"

              return (
                <div
                  key={i}
                  className="group/tick absolute right-4 grid w-24 items-center justify-end"
                  style={{
                    top: `${position}px`,
                  }}
                >
                  <div
                    className={`h-px ${tickWidth} group-hover/tick:bg-foreground transition-all duration-100 group-hover/tick:w-4 ${
                      position <= scrollProgress * containerHeight
                        ? "bg-foreground"
                        : isMajorTick
                          ? "bg-foreground/40"
                          : "bg-foreground/20"
                    }`}
                  />
                  <div className="absolute inset-x-0 h-2 cursor-pointer" />
                </div>
              )
            })}

            {/* Section labels */}
            {filteredSections.map((section, i) => {
              // Calculate position as percentage of container height
              const basePosition = containerHeight * 0.06 // Start at 6% of height
              const sectionSpacing = containerHeight * 0.12 // 12% spacing between sections
              const subsectionOffset = section.level === 3 ? containerHeight * 0.06 : 0
              const yPosition = basePosition + i * sectionSpacing + subsectionOffset
              const indent = section.level === 2 ? 36 : 32

              return (
                <div
                  key={section.id}
                  className="transition-transform duration-150 hover:-translate-x-0.5"
                >
                  <div
                    className={`text-foreground absolute flex h-[12px] items-center font-mono text-xs uppercase transition-opacity duration-300 ${
                      isHovered ? "opacity-100" : "opacity-0 max-sm:opacity-100"
                    }`}
                    style={{
                      top: `${yPosition}px`,
                      right: `${indent}px`,
                      zIndex: 10,
                      transitionDelay: `${i * 50}ms`,
                    }}
                  >
                    <Link
                      href={`#${section.id}`}
                      className="cursor-pointer text-right hover:text-blue-500 dark:hover:text-blue-400"
                    >
                      {section.title}
                    </Link>
                  </div>
                </div>
              )
            })}

            {/* Section markers (longer ticks) */}
            {filteredSections.map((section, i) => {
              const basePosition = containerHeight * 0.06
              const sectionSpacing = containerHeight * 0.12
              const subsectionOffset = section.level === 3 ? containerHeight * 0.06 : 0
              const yPosition = basePosition + i * sectionSpacing + subsectionOffset + 6
              const width = section.level === 2 ? 16 : 12

              return (
                <div
                  key={`marker-${section.id}`}
                  className="bg-foreground absolute right-4 h-px"
                  style={{
                    top: `${yPosition}px`,
                    width: `${width}px`,
                  }}
                />
              )
            })}

            {/* Current position indicator */}
            <div
              className="absolute right-4 z-20 opacity-100 transition-opacity duration-300"
              style={{ top: `${scrollProgress * containerHeight}px` }}
            >
              <div className="h-px w-4 bg-blue-500 dark:bg-blue-400" />
              <span
                className={`absolute top-0 -left-10 -translate-y-1/2 font-mono text-xs text-blue-500 transition-opacity duration-300 dark:text-blue-400 ${
                  isHovered ? "opacity-0" : "opacity-100 max-sm:opacity-0"
                }`}
              >
                {scrollProgress.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

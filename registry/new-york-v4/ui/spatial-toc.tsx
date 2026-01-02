"use client"

import { useRef, useState, useEffect, RefObject } from "react"
import { useSectionMetrics } from "@/hooks/use-section-metrics"
import { useScrollProgress } from "@/hooks/use-scroll-progress"
import { cn } from "@/lib/utils"

interface TOCItem {
  title: React.ReactNode
  url: string
  depth: number
}

interface SpatialTOCProps {
  toc: TOCItem[]
  contentRef: RefObject<HTMLElement | null>
}

export function SpatialTOC({ toc, contentRef }: SpatialTOCProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [tocHeight, setTocHeight] = useState(0)
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)

  // Support nested hierarchy (h2 and h3)
  const filteredTOC = toc.filter((item) => item.depth === 2 || item.depth === 3)

  // Get section metrics and scroll progress
  const metrics = useSectionMetrics(filteredTOC, contentRef)
  const { percentage, activeSection } = useScrollProgress(metrics, tocHeight)

  // Calculate total TOC height from metrics with extra spacing for nested items
  useEffect(() => {
    if (metrics.length > 0) {
      // Add extra spacing for nested items
      let total = 0
      metrics.forEach((metric, index) => {
        total += metric.proportionalHeight
        // Add extra spacing after parent items (h2) that have children
        const currentItem = filteredTOC[index]
        const nextItem = filteredTOC[index + 1]
        if (currentItem?.depth === 2 && nextItem?.depth === 3) {
          total += 12 // Extra spacing between parent and first child (increased from 8px)
        }
      })
      setTocHeight(total)
    }
  }, [metrics, filteredTOC])

  if (filteredTOC.length === 0 || metrics.length === 0) return null

  const handleClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  // Calculate cumulative positions for each item with spacing
  const getCumulativePosition = (index: number) => {
    let pos = 0
    for (let i = 0; i < index; i++) {
      pos += metrics[i].proportionalHeight
      // Add extra spacing after parent items (h2) that have children
      const currentItem = filteredTOC[i]
      const nextItem = filteredTOC[i + 1]
      if (currentItem?.depth === 2 && nextItem?.depth === 3) {
        pos += 12 // Extra spacing between parent and first child (increased from 8px)
      }
    }
    return pos
  }

  return (
    <div className="fixed top-1/2 right-0 z-50 hidden -translate-y-1/2 items-start xl:flex">
      {/* Numeric Progress Indicator - top right */}
      <div className="absolute -top-8 right-0 text-right">
        <span className="text-foreground/30 font-mono text-[9px] font-medium tabular-nums">
          {percentage.toFixed(2)}
        </span>
      </div>

      {/* Main Container: TOC items + connector lines + ruler */}
      <div className="flex items-start">
        {/* TOC Items - Right aligned text */}
        <div
          ref={containerRef}
          className="relative flex flex-col"
          style={{ height: `${tocHeight}px` }}
        >
          {metrics.map((metric, index) => {
            const isActive = activeSection === metric.id
            const isHovered = hoveredSection === metric.id
            const yPos = getCumulativePosition(index)
            const currentItem = filteredTOC[index]
            const isNested = currentItem?.depth === 3

            return (
              <button
                key={metric.id}
                onClick={() => handleClick(metric.id)}
                onMouseEnter={() => setHoveredSection(metric.id)}
                onMouseLeave={() => setHoveredSection(null)}
                className={cn(
                  "absolute right-0",
                  "font-mono font-medium tracking-wide",
                  "text-right whitespace-nowrap",
                  "cursor-pointer border-none bg-transparent p-0",
                  "leading-none",
                  // Indentation for nested items - more indent for stronger hierarchy
                  isNested ? "pr-8" : "pr-3",
                  // Font size: smaller for more subtle appearance
                  isNested ? "text-[9px]" : "text-[10px]",
                  // Typography: uppercase for h2, capitalize for h3
                  isNested ? "capitalize" : "uppercase",
                  // Binary color states - more subtle
                  isActive
                    ? "text-blue-500/80 dark:text-blue-400/80"
                    : isHovered
                      ? "text-foreground/60"
                      : isNested
                        ? "text-foreground/15" // Very light for nested items
                        : "text-foreground/25" // More subtle for main items
                )}
                style={{
                  top: `${yPos}px`,
                  transform: "translateY(-50%)",
                }}
              >
                {metric.title}
              </button>
            )
          })}
        </div>

        {/* Connector Lines + Vertical Ruler */}
        <div className="relative ml-0" style={{ height: `${tocHeight}px`, width: "20px" }}>
          {/* Vertical Ruler Line */}
          <div className="bg-foreground/20 absolute top-0 right-0 bottom-0 w-px" />

          {/* Top Triangle Marker */}
          <div
            className="absolute -top-1 right-0 h-0 w-0"
            style={{
              borderLeft: "3px solid transparent",
              borderRight: "3px solid transparent",
              borderBottom: "5px solid currentColor",
              transform: "translateX(50%)",
              opacity: 0.3,
            }}
          />

          {/* Bottom Triangle Marker */}
          <div
            className="absolute right-0 -bottom-1 h-0 w-0"
            style={{
              borderLeft: "3px solid transparent",
              borderRight: "3px solid transparent",
              borderTop: "5px solid currentColor",
              transform: "translateX(50%)",
              opacity: 0.3,
            }}
          />

          {/* Horizontal Connector Lines (Tick Marks) - one for each TOC item */}
          {metrics.map((metric, index) => {
            const isActive = activeSection === metric.id
            const isHovered = hoveredSection === metric.id
            const yPos = getCumulativePosition(index)
            const currentItem = filteredTOC[index]
            const isNested = currentItem?.depth === 3

            // Ruler-style tick marks: Major ticks (h2) vs Minor ticks (h3)
            const tickStyles = isNested
              ? {
                  // Minor ticks (h3) - shorter, thinner, lighter
                  activeWidth: "w-[10px]",
                  hoverWidth: "w-2",
                  inactiveWidth: "w-[6px]",
                  borderWidth: "border-t",
                  inactiveOpacity: "bg-foreground/30",
                }
              : {
                  // Major ticks (h2) - longer, bolder, more prominent
                  activeWidth: "w-4",
                  hoverWidth: "w-[14px]",
                  inactiveWidth: "w-3",
                  borderWidth: "border-t-[1.5px]",
                  inactiveOpacity: "bg-foreground/60",
                }

            return (
              <div
                key={`connector-${metric.id}`}
                className={cn(
                  "absolute right-0",
                  tickStyles.borderWidth,
                  isActive
                    ? `${tickStyles.activeWidth} bg-blue-500 dark:bg-blue-400`
                    : isHovered
                      ? `${tickStyles.hoverWidth} bg-foreground`
                      : `${tickStyles.inactiveWidth} ${tickStyles.inactiveOpacity}`
                )}
                style={{
                  top: `${yPos}px`,
                }}
                onMouseEnter={() => setHoveredSection(metric.id)}
                onMouseLeave={() => setHoveredSection(null)}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Wrapper component
interface SpatialTOCWrapperProps {
  toc: TOCItem[]
  children: React.ReactNode
}

export function SpatialTOCWrapper({ toc, children }: SpatialTOCWrapperProps) {
  const contentRef = useRef<HTMLElement | null>(null)

  return (
    <>
      <div
        ref={contentRef as any}
        className="text-foreground mx-auto flex w-full max-w-2xl min-w-0 flex-1 flex-col gap-8 px-4 py-6 md:px-0 lg:py-8"
      >
        {children}
      </div>
      <SpatialTOC toc={toc} contentRef={contentRef} />
    </>
  )
}

// Vertical Scale component
export function VerticalScale() {
  // Generate tick marks - small ticks every unit, larger ticks every 5 units
  const totalTicks = 50
  const ticks = Array.from({ length: totalTicks }, (_, i) => ({
    index: i,
    isLarge: i % 5 === 0,
  }))

  return (
    <div className="fixed top-0 right-0 h-full w-12 border-l border-gray-200 bg-white">
      {/* Tick marks container */}
      <div className="relative h-full w-full">
        {ticks.map((tick) => (
          <div
            key={tick.index}
            className="absolute right-0 border-t border-gray-400"
            style={{
              top: `${(tick.index / totalTicks) * 100}%`,
              width: tick.isLarge ? "16px" : "8px",
              borderWidth: tick.isLarge ? "1.5px" : "1px",
            }}
          />
        ))}

        {/* Yellow marker - positioned roughly in the middle */}
        <div
          className="absolute right-0 bg-yellow-400"
          style={{
            top: "48%",
            width: "20px",
            height: "8px",
          }}
        />
      </div>
    </div>
  )
}

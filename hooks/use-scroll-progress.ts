"use client"

import { useEffect, useState, useCallback } from "react"
import type { SectionMetric } from "./use-section-metrics"

export interface ScrollProgress {
  percentage: number // 0.0 to 1.0
  activeSection: string // Current section ID
  indicatorPosition: number // Y position in pixels for indicator (0 to total TOC height)
}

export function useScrollProgress(metrics: SectionMetric[], tocHeight: number): ScrollProgress {
  const [progress, setProgress] = useState<ScrollProgress>({
    percentage: 0,
    activeSection: "",
    indicatorPosition: 0,
  })

  const calculateProgress = useCallback(() => {
    if (metrics.length === 0) return

    const scrollTop = window.scrollY
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercentage = documentHeight > 0 ? scrollTop / documentHeight : 0

    // Find active section based on scroll position
    // Section is active when its indicator threshold is crossed
    let activeSection = metrics[0]?.id || ""
    let indicatorPosition = 0

    // Calculate cumulative positions for each section
    let cumulativeHeight = 0
    for (let i = 0; i < metrics.length; i++) {
      const metric = metrics[i]
      const nextCumulativeHeight = cumulativeHeight + metric.proportionalHeight

      // Check if scroll position is within this section's range
      if (scrollTop >= metric.startOffset) {
        activeSection = metric.id

        // Calculate indicator position within TOC
        // If we're past this section, add its full height
        if (i < metrics.length - 1 && scrollTop >= metrics[i + 1].startOffset) {
          cumulativeHeight = nextCumulativeHeight
        } else {
          // We're in this section, calculate precise position
          const sectionProgress = (scrollTop - metric.startOffset) / metric.height
          indicatorPosition = cumulativeHeight + sectionProgress * metric.proportionalHeight
          break
        }
      } else {
        break
      }
    }

    // Clamp indicator position to TOC bounds
    indicatorPosition = Math.max(0, Math.min(tocHeight, indicatorPosition))

    setProgress({
      percentage: Math.min(1, Math.max(0, scrollPercentage)),
      activeSection,
      indicatorPosition,
    })
  }, [metrics, tocHeight])

  useEffect(() => {
    let rafId: number

    const handleScroll = () => {
      // Use requestAnimationFrame for smooth 60fps updates
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
      rafId = requestAnimationFrame(calculateProgress)
    }

    // Initial calculation
    calculateProgress()

    // Listen to scroll events
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [calculateProgress])

  return progress
}

"use client"

import { useEffect, useState, RefObject } from "react"

export interface SectionMetric {
  id: string
  title: React.ReactNode
  url: string
  depth: number
  height: number // Actual pixel height in document
  proportionalHeight: number // Normalized for TOC display (4-48px)
  startOffset: number // Distance from document top
  endOffset: number // Distance to section end
}

interface TableOfContentsItem {
  title: React.ReactNode // Can be ReactNode from Fumadocs
  url: string
  depth: number
}

const MIN_SPACING = 4 // Minimum px between items
const MAX_SPACING = 48 // Maximum px between items
const AVAILABLE_HEIGHT_RATIO = 0.6 // Use 60% of viewport for spacing

export function useSectionMetrics(
  toc: TableOfContentsItem[],
  contentRef: RefObject<HTMLElement | null>
): SectionMetric[] {
  const [metrics, setMetrics] = useState<SectionMetric[]>([])

  useEffect(() => {
    if (!contentRef.current || toc.length === 0) return

    const calculateMetrics = () => {
      const newMetrics: SectionMetric[] = []
      const availableHeight = window.innerHeight * AVAILABLE_HEIGHT_RATIO

      // Extract section IDs from URLs
      const sectionIds = toc.map((item) => item.url.replace("#", ""))

      // Measure actual section heights
      let totalContentHeight = 0
      const sectionHeights: number[] = []

      sectionIds.forEach((id, index) => {
        const element = document.getElementById(id)
        const nextElement =
          index < sectionIds.length - 1 ? document.getElementById(sectionIds[index + 1]) : null

        if (element) {
          const elementRect = element.getBoundingClientRect()
          const nextRect = nextElement?.getBoundingClientRect()

          // Calculate height from this heading to next heading (or end of document)
          const height = nextRect
            ? nextRect.top - elementRect.top
            : contentRef.current!.getBoundingClientRect().bottom - elementRect.top

          sectionHeights.push(Math.max(height, 0))
          totalContentHeight += height
        } else {
          sectionHeights.push(0)
        }
      })

      // Calculate proportional spacing and offsets
      let cumulativeOffset = 0

      sectionIds.forEach((id, index) => {
        const element = document.getElementById(id)
        const height = sectionHeights[index]
        const proportion = totalContentHeight > 0 ? height / totalContentHeight : 0

        // Calculate proportional height for TOC display
        const proportionalHeight = Math.max(
          MIN_SPACING,
          Math.min(MAX_SPACING, proportion * availableHeight)
        )

        const startOffset = element
          ? element.getBoundingClientRect().top +
            window.scrollY -
            contentRef.current!.getBoundingClientRect().top
          : 0

        newMetrics.push({
          id,
          title: toc[index].title,
          url: toc[index].url,
          depth: toc[index].depth,
          height,
          proportionalHeight,
          startOffset,
          endOffset: startOffset + height,
        })

        cumulativeOffset += proportionalHeight
      })

      setMetrics(newMetrics)
    }

    // Initial calculation
    calculateMetrics()

    // Recalculate on window resize
    const handleResize = () => {
      calculateMetrics()
    }

    window.addEventListener("resize", handleResize)

    // Use ResizeObserver to track content changes
    const resizeObserver = new ResizeObserver(() => {
      calculateMetrics()
    })

    if (contentRef.current) {
      resizeObserver.observe(contentRef.current)
    }

    return () => {
      window.removeEventListener("resize", handleResize)
      resizeObserver.disconnect()
    }
  }, [toc, contentRef])

  return metrics
}

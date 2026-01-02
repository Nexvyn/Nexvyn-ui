"use client"

import { useEffect, useState } from "react"

interface UseActiveSection {
  activeId: string
}

export function useActiveSection(headingIds: string[]): UseActiveSection {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    if (headingIds.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-80px 0px -80% 0px", // Account for sticky header
        threshold: 0,
      }
    )

    // Observe all headings
    headingIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [headingIds])

  return { activeId }
}

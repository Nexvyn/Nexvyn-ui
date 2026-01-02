"use client"

import { ReactNode } from "react"
import { ScrollIndicator } from "@/components/ui/our/common/scroll-indicator"

interface TOCItem {
  title: ReactNode
  url: string
  depth: number
}

interface ClientTOCProps {
  toc: TOCItem[]
}

export function ClientTOC({ toc }: ClientTOCProps) {
  // Transform TOC items to sections format for ScrollIndicator
  const sections = toc.map((item) => ({
    id: item.url.replace("#", ""),
    title: item.title,
    level: item.depth,
  }))

  return <ScrollIndicator sections={sections} />
}

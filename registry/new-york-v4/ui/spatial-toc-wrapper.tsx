"use client"

import { useRef, ReactNode } from "react"
import { SpatialTOC } from "./spatial-toc"

interface TOCItem {
  title: ReactNode
  url: string
  depth: number
}

interface SpatialTOCWrapperProps {
  toc: TOCItem[]
  children: ReactNode
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

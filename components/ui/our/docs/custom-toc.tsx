"use client"

import { useRef } from "react"
import { cn } from "@/lib/utils"
import { AnchorProvider, ScrollProvider, TOCItem, type TableOfContents } from "@/components/toc"

/**
 * CustomTOC - The canonical Table of Contents implementation for docs
 * Uses components/toc.tsx for core TOC functionality with IntersectionObserver
 * This is the ONLY TOC implementation that should be used in documentation pages
 */
interface CustomTOCProps {
  toc: TableOfContents
}

export function CustomTOC({ toc }: CustomTOCProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  if (toc.length === 0) return null

  return (
    <div className="sticky top-20 hidden xl:block">
      <div className="relative">
        <div className="p-4">
          <AnchorProvider toc={toc} single>
            <ScrollProvider containerRef={containerRef}>
              <nav
                ref={containerRef}
                className="flex max-h-[calc(100vh-12rem)] flex-col gap-1 overflow-y-auto text-sm"
              >
                {toc.map((item) => (
                  <TOCItem
                    key={item.url}
                    href={item.url}
                    className={cn(
                      "text-muted-foreground hover:text-foreground py-1 transition-colors",
                      "data-[active=true]:text-primary data-[active=true]:font-medium",
                      item.depth === 2 && "pl-0",
                      item.depth === 3 && "pl-4",
                      item.depth === 4 && "pl-8"
                    )}
                  >
                    {item.title}
                  </TOCItem>
                ))}
              </nav>
            </ScrollProvider>
          </AnchorProvider>
        </div>
      </div>
    </div>
  )
}

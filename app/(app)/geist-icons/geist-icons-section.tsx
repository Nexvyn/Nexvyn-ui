"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/core/input"
import { Button } from "@/components/ui/core/button"
import * as GeistIcons from "@geist-ui/icons"
import { Search } from "lucide-react"
import { motion } from "motion/react"

export function GeistIconsSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null)

  // Get all icon names from @geist-ui/icons - filter out non-component exports
  const allIconNames = useMemo(() => {
    const names = Object.keys(GeistIcons).filter((name) => {
      const exp = (GeistIcons as any)[name]
      // Filter to only include actual React components (functions)
      // Exclude things like __esModule, default, etc.
      return typeof exp === "function" && name !== "default" && !name.startsWith("_")
    })
    return names.sort() // Sort alphabetically
  }, [])

  // Filter icons based on search
  const filteredIcons = useMemo(() => {
    if (!searchQuery) return allIconNames
    const query = searchQuery.toLowerCase()
    return allIconNames.filter((name) => name.toLowerCase().includes(query))
  }, [searchQuery, allIconNames])

  return (
    <section className="bg-background relative min-h-[calc(100vh-80px)] w-full rounded-3xl border border-dashed p-6 md:p-8 lg:p-12">
      {/* Corner decorations */}
      <span className="border-primary absolute -top-px -left-px block size-2 rounded-tl-full border-t-2 border-l-2" />
      <span className="border-primary absolute -top-px -right-px block size-2 rounded-tr-full border-t-2 border-r-2" />
      <span className="border-primary absolute -bottom-px -left-px block size-2 rounded-bl-full border-b-2 border-l-2" />
      <span className="border-primary absolute -right-px -bottom-px block size-2 rounded-br-full border-r-2 border-b-2" />

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Animated Geist Icons</h1>
          <p className="text-muted-foreground mb-2 text-lg">
            {allIconNames.length} icons from Vercel's Geist design system
          </p>
          <p className="text-muted-foreground">
            Hover to animate • Copy-paste ready • Fully accessible
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-3 gap-4">
          <div className="bg-card rounded-lg border p-4 text-center">
            <div className="text-primary text-3xl font-bold">{allIconNames.length}</div>
            <div className="text-muted-foreground text-sm">Total Icons</div>
          </div>
          <div className="bg-card rounded-lg border p-4 text-center">
            <div className="text-primary text-3xl font-bold">{filteredIcons.length}</div>
            <div className="text-muted-foreground text-sm">Showing</div>
          </div>
          <div className="bg-card rounded-lg border p-4 text-center">
            <div className="text-primary text-3xl font-bold">✨</div>
            <div className="text-muted-foreground text-sm">Animated</div>
          </div>
        </div>

        {/* Controls */}
        <div className="mb-8">
          {/* Search */}
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input
              type="text"
              placeholder="Search icons... (e.g., download, github, heart)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Icons Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
          {filteredIcons.map((iconName) => {
            const IconComponent = (GeistIcons as any)[iconName]
            const isHovered = hoveredIcon === iconName

            return (
              <div
                key={iconName}
                className="group border-border/50 bg-card hover:border-border relative flex aspect-square cursor-pointer flex-col items-center rounded-xl border transition-all duration-200 hover:shadow-sm"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `import { ${iconName} } from '@geist-ui/icons'\n\n<${iconName} size={24} />`
                  )
                }}
                onMouseEnter={() => setHoveredIcon(iconName)}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                {/* Icon preview */}
                <div className="flex flex-1 flex-col items-center justify-center px-4 pt-6 pb-2">
                  <div className="text-foreground mb-3">
                    <IconComponent size={36} />
                  </div>
                  <span className="text-muted-foreground max-w-full truncate text-center font-mono text-xs">
                    {iconName}
                  </span>
                </div>

                {/* Copy indicator - appears on hover at bottom */}
                <div
                  className={`flex w-full items-center justify-center gap-1 pt-1 pb-3 transition-all duration-200 ${
                    isHovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                  }`}
                >
                  <span className="bg-primary text-primary-foreground rounded px-1.5 py-0.5 text-[10px]">
                    Click to copy
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* No results */}
        {filteredIcons.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground text-lg">No icons found matching "{searchQuery}"</p>
            <Button onClick={() => setSearchQuery("")} variant="outline" className="mt-4">
              Clear search
            </Button>
          </div>
        )}

        {/* Usage Guide */}
        <div className="bg-muted/50 mt-16 rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-semibold">How to Use</h2>
          <div className="space-y-4 text-sm">
            <div>
              <strong>1. Hover</strong> over any icon to see it animate
            </div>
            <div>
              <strong>2. Click</strong> to copy the code snippet
            </div>
            <div>
              <strong>3. Paste</strong> into your component - it's that simple!
            </div>
          </div>

          <div className="bg-background mt-6 rounded border p-4">
            <code className="text-xs">
              <div className="text-muted-foreground mb-2">// Example:</div>
              <div>
                import {`{`} Download {`}`} from '@geist-ui/icons'
              </div>
              <div className="mt-2">
                &lt;Download size={`{`}24{`}`} /&gt;
              </div>
            </code>
          </div>
        </div>
      </div>
    </section>
  )
}

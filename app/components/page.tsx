'use client'

import { useState, useMemo } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ComponentCard } from '@/components/showcase/component-card'
import { AnimatedTitle } from '@/components/showcase/animated-title'
import { COMPONENTS, COLLECTIONS } from '@/lib/components-registry'
import { cn } from '@/lib/utils'

function SortIcon({ className, animate }: { className?: string; animate?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path d="M2 4h12" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path
        d="M4 8h8"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        style={{
          transform: animate ? 'translateX(4px)' : 'translateX(0)',
          transition: 'transform 0.2s cubic-bezier(.25,.46,.45,.94)',
        }}
      />
      <path
        d="M6 12h4"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        style={{
          transform: animate ? 'translateX(6px)' : 'translateX(0)',
          transition: 'transform 0.2s cubic-bezier(.25,.46,.45,.94) 0.08s',
        }}
      />
    </svg>
  )
}

export default function ComponentsPage() {
  const [sortByCategory, setSortByCategory] = useState(false)
  const [sortAnimating, setSortAnimating] = useState(false)

  const sorted = useMemo(() => {
    if (!sortByCategory) return COMPONENTS
    return [...COMPONENTS].sort((a, b) => a.collection.localeCompare(b.collection))
  }, [sortByCategory])

  const grouped = useMemo(() => {
    if (!sortByCategory) return null
    const map = new Map<string, typeof COMPONENTS>()
    for (const item of sorted) {
      const list = map.get(item.collection) ?? []
      list.push(item)
      map.set(item.collection, list)
    }
    return map
  }, [sorted, sortByCategory])

  return (
    <div
      className="min-h-screen w-full font-sans flex flex-col"
      style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-fg)' }}
    >
      <Header />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-12 pt-4 pb-2 md:pt-12 md:pb-4">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-2">
          <AnimatedTitle
            title="Components"
            className="text-2xl sm:text-3xl font-normal tracking-tight"
          />
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSortAnimating(true)
                setSortByCategory((v) => !v)
                setTimeout(() => setSortAnimating(false), 300)
              }}
              className={cn(
                'inline-flex items-center justify-center h-9 px-3 rounded-2xl squircle-corners text-sm font-medium transition-colors hover:bg-(--color-surface) text-(--color-fg) hover:text-(--color-fg) outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) gap-2',
                sortByCategory ? 'opacity-100' : 'opacity-40 hover:opacity-75',
              )}
              title="Sort by category"
            >
              <SortIcon className="size-4.5" animate={sortAnimating} />
              <span className="hidden sm:inline">Sort</span>
            </button>
            <span
              className="text-xl sm:text-2xl font-normal tracking-tight tabular-nums ml-2 opacity-60"
              style={{ color: 'var(--color-muted)' }}
            >
              {COMPONENTS.length}
            </span>
          </div>
        </div>

        {sortByCategory && grouped ? (
          <div className="space-y-10">
            {Array.from(grouped.entries()).map(([collection, items]) => (
              <div key={collection}>
                <div className="mb-4">
                  <AnimatedTitle
                    title={collection.charAt(0).toUpperCase() + collection.slice(1)}
                    right={`${items.length}`}
                    className="text-lg font-normal tracking-tight"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((item) => (
                    <ComponentCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sorted.map((item) => (
              <ComponentCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

'use client'

import { useState, useMemo, useEffect } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ComponentCard } from '@/components/showcase/component-card'
import { AnimatedTitle } from '@/components/showcase/animated-title'
import { AnatomyLicenseNotice } from '@/components/detail/anatomy-license-notice'
import {
  ComponentSearchProvider,
  useComponentSearch,
  useShortcutLabel,
} from '@/components/detail/component-search'
import {
  BASIC_COMPONENTS,
  COMPONENTS,
  NORMAL_COMPONENTS,
  compareComponentsByCollection,
  compareComponentsById,
  type ComponentItem,
} from '@/lib/components-registry'
import { cn } from '@/lib/utils'

function shuffleIllustrationsIn(
  items: ComponentItem[],
  slots: Record<string, number>,
): ComponentItem[] {
  const base = items.filter((c) => c.collection !== 'illustration')
  const illustrations = items.filter((c) => c.collection === 'illustration')
  const result = [...base]
  for (const item of illustrations) {
    const fraction = slots[item.id] ?? 0
    const index = Math.min(result.length, Math.round(fraction * result.length))
    result.splice(index, 0, item)
  }
  return result
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="7" cy="7" r="4.5" />
      <path d="M13.5 13.5 10.5 10.5" />
    </svg>
  )
}

function SearchButton() {
  const search = useComponentSearch()
  const shortcut = useShortcutLabel()

  if (!search) return null

  return (
    <button
      onClick={() => search.setOpen(true)}
      className="inline-flex h-9 items-center justify-center gap-2 rounded-2xl squircle-corners px-3 text-sm font-medium text-(--color-fg) opacity-40 outline-none transition-colors hover:bg-(--color-surface) hover:opacity-100 focus-visible:ring-2 focus-visible:ring-(--color-accent)"
      title="Search components"
    >
      <SearchIcon className="size-4.5" />
      <span className="hidden sm:inline">Search</span>
      <kbd className="border-(--color-border) text-(--color-muted) hidden rounded-md squircle-corners border px-1.5 py-0.5 font-sans text-[10px] md:inline-block">
        {shortcut}
      </kbd>
    </button>
  )
}

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

function ComponentsPageContent() {
  const [sortByCategory, setSortByCategory] = useState(false)
  const [sortAnimating, setSortAnimating] = useState(false)

  const [illustrationSlots, setIllustrationSlots] = useState<Record<string, number>>(() => {
    const slots: Record<string, number> = {}
    for (const item of NORMAL_COMPONENTS) {
      if (item.collection === 'illustration') slots[item.id] = 0.5
    }
    return slots
  })

  useEffect(() => {
    setIllustrationSlots(() => {
      const slots: Record<string, number> = {}
      for (const item of NORMAL_COMPONENTS) {
        if (item.collection === 'illustration') slots[item.id] = Math.random()
      }
      return slots
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const normalSorted = useMemo(
    () =>
      shuffleIllustrationsIn(
        [...NORMAL_COMPONENTS].sort(
          sortByCategory ? compareComponentsByCollection : compareComponentsById,
        ),
        illustrationSlots,
      ),
    [sortByCategory, illustrationSlots],
  )

  const basicSorted = useMemo(
    () => [...BASIC_COMPONENTS].sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0)),
    [],
  )

  const grouped = useMemo(() => {
    if (!sortByCategory) return null
    const map = new Map<string, typeof normalSorted>()
    for (const item of normalSorted) {
      const list = map.get(item.collection) ?? []
      list.push(item)
      map.set(item.collection, list)
    }
    return map
  }, [normalSorted, sortByCategory])

  return (
    <div
      className="flex min-h-screen w-full flex-col font-sans"
      style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-fg)' }}
    >
      <Header />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-2 pt-4 sm:px-6 md:px-12 md:pb-4 md:pt-12">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-2">
          <AnimatedTitle
            title="Components"
            className="text-2xl font-normal tracking-tight sm:text-3xl"
          />
          <div className="flex items-center gap-2">
            <SearchButton />
            <button
              onClick={() => {
                setSortAnimating(true)
                setSortByCategory((v) => !v)
                setTimeout(() => setSortAnimating(false), 300)
              }}
              className={cn(
                'inline-flex h-9 items-center justify-center gap-2 rounded-2xl squircle-corners px-3 text-sm font-medium text-(--color-fg) outline-none transition-colors hover:bg-(--color-surface) hover:text-(--color-fg) focus-visible:ring-2 focus-visible:ring-(--color-accent)',
                sortByCategory ? 'opacity-100' : 'opacity-40 hover:opacity-75',
              )}
              title={sortByCategory ? 'Sort by id' : 'Sort by category'}
            >
              <SortIcon className="size-4.5" animate={sortAnimating} />
              <span className="hidden sm:inline">{sortByCategory ? 'By category' : 'By id'}</span>
            </button>
            <span
              className="ml-2 text-xl font-normal tracking-tight tabular-nums opacity-60 sm:text-2xl"
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
                <div className="grid grid-flow-dense grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((item) => (
                    <ComponentCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ))}
            {basicSorted.length > 0 && (
              <div>
                <div className="mb-4">
                  <AnimatedTitle
                    title="Basic"
                    right={`${basicSorted.length}`}
                    className="text-lg font-normal tracking-tight"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {basicSorted.map((item) => (
                    <ComponentCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-10">
            <div className="grid grid-flow-dense grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {normalSorted.map((item) => (
                <ComponentCard key={item.id} item={item} />
              ))}
            </div>
            {basicSorted.length > 0 && (
              <div>
                <div className="mb-4">
                  <AnimatedTitle
                    title="Basic"
                    right={`${basicSorted.length}`}
                    className="text-lg font-normal tracking-tight"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {basicSorted.map((item) => (
                    <ComponentCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="fixed bottom-6 right-6 z-50">
          <AnatomyLicenseNotice className="h-10 w-10 rounded-xl squircle-corners border border-(--color-border) bg-(--color-surface-2)" />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function ComponentsPage() {
  return (
    <ComponentSearchProvider>
      <ComponentsPageContent />
    </ComponentSearchProvider>
  )
}

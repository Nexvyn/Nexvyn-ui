'use client'

import Link from 'next/link'
import { Fragment, useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import type { ComponentItem } from '@/lib/components-registry'
import { getComponentHref } from '@/lib/components-registry'
import { ComponentPreview } from './component-preview'
import { BlueprintSheet } from './blueprint-sheet'
import { NewStarIcon } from '@/components/layout/new-star'
import { cn } from '@/lib/utils'

const CARD_CLASS =
  'group relative flex min-w-0 flex-col rounded-2xl bg-(--color-surface-2) p-5 outline-none transition-all duration-(--motion-dur-fast) ease-(--motion-ease-out) hover:bg-(--color-surface) active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100 focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-background'
function useSheetReplay() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [generation, setGeneration] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let leftAt = 0
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        leftAt = Date.now()
      } else if (leftAt && Date.now() - leftAt >= 2000) {
        leftAt = 0
        setGeneration((g) => g + 1)
      } else {
        leftAt = 0
      }
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return { ref, generation }
}

function wave(index: number): CSSProperties {
  return { '--enter-delay': `${Math.min(index * 90, 450)}ms` } as CSSProperties
}

export function ComponentCard({ item, index = 0 }: { item: ComponentItem; index?: number }) {
  const { ref, generation } = useSheetReplay()
  const isTall = item.size === 'lg'
  const isFeature = item.size === 'xl'
  const isDefault = !isTall && !isFeature

  return (
    <div ref={ref} className={cn(isTall && 'card-tall', isFeature && 'card-feature')}>
      <Link
        href={getComponentHref(item.id)}
        className={cn(CARD_CLASS, 'h-full')}
        style={wave(index)}
        prefetch={false}
      >
        <div className="flex items-center justify-between gap-2">
          <span className="min-w-0 truncate font-mono text-xs text-foreground/80">{item.name}</span>
          {item.isNew && (
            <span className="flex shrink-0 items-center gap-1">
              <NewStarIcon />
              <span className="font-mono text-[10px] font-medium text-(--color-new)">New</span>
            </span>
          )}
        </div>
        <BlueprintSheet
          className="pointer-events-none mt-3 flex min-h-48 items-center justify-center"
          scale={isDefault ? 'md' : 'sm'}
        >
          <Fragment key={generation}>
            <ComponentPreview item={item} />
          </Fragment>
        </BlueprintSheet>
      </Link>
    </div>
  )
}

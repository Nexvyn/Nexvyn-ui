'use client'

import Link from 'next/link'
import type { ComponentItem } from '@/lib/components-registry'
import { getComponentHref } from '@/lib/components-registry'
import { ComponentPreview } from './component-preview'
import { NewStarIcon } from '@/components/layout/new-star'
import { cn } from '@/lib/utils'

const CARD_CLASS =
  'group relative block rounded-2xl bg-(--color-surface) p-4 outline-none transition-colors duration-(--motion-dur-fast) ease-(--motion-ease-out) hover:bg-(--color-surface-2) active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100 focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-5'

export function ComponentCard({ item }: { item: ComponentItem }) {
  const isTall = item.size === 'lg'
  const isFeature = item.size === 'xl'
  const isDefault = !isTall && !isFeature

  return (
    <Link
      href={getComponentHref(item.id)}
      className={cn(
        CARD_CLASS,
        isTall && 'row-span-2 flex min-w-0 flex-col',
        isFeature && 'flex min-w-0 flex-col sm:row-span-2 sm:col-span-2',
      )}
      prefetch={false}
    >
      <div
        className={cn(
          'pointer-events-none flex min-w-0 items-center justify-center',
          isTall && 'min-h-40 flex-1',
          isFeature && 'min-h-56 flex-1 sm:min-h-72',
          isDefault && 'min-h-40 sm:min-h-48',
        )}
      >
        <div className={cn(isDefault && 'max-w-full scale-100 sm:scale-110 md:scale-125')}>
          <ComponentPreview item={item} />
        </div>
      </div>
      <div className="mt-3 flex min-w-0 items-center gap-1.5">
        {item.isNew && <NewStarIcon />}
        <span className="block min-w-0 truncate font-mono text-xs text-foreground/80">
          {item.name}
        </span>
        {item.isNew && (
          <span className="shrink-0 font-mono text-[10px] font-medium text-(--color-new)">New</span>
        )}
      </div>
    </Link>
  )
}

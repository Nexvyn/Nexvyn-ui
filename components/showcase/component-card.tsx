'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { ComponentItem } from '@/lib/components-registry'
import { getComponentHref } from '@/lib/components-registry'

import { ComponentPreview } from './component-preview'

export function ComponentCard({ item }: { item: ComponentItem }) {
  return (
    <Link href={getComponentHref(item.id)} className="block w-full">
      <div
        className="relative w-full rounded-2xl p-1 border border-(--color-border) hover:border-(--color-accent) transition-colors duration-200"
        style={{ backgroundColor: 'var(--color-bg)' }}
      >
        <div
          className="relative h-48 sm:h-70 w-full overflow-hidden rounded-xl"
          style={{ backgroundColor: 'var(--color-surface)' }}
        >
          <ComponentPreview item={item} />
        </div>

        <div
          className="absolute left-0 top-0 z-10 px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-[15px] font-medium leading-none rounded-br-2xl rounded-tl-2xl"
          style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-fg)' }}
        >
          {item.collection}
        </div>

        <div
          className="absolute bottom-0 right-0 z-10 px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-[15px] font-medium leading-none rounded-br-2xl rounded-tl-2xl"
          style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-fg)' }}
        >
          {item.name}
        </div>
      </div>
    </Link>
  )
}

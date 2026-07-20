'use client'

import Link from 'next/link'
import type { ComponentItem } from '@/lib/components-registry'
import { getComponentHref } from '@/lib/components-registry'
import { ComponentPreview } from './component-preview'

const CARD_CLASS =
  'group relative block rounded-2xl bg-[#F7F7F7] dark:bg-card p-5 outline-none transition-colors duration-(--motion-dur-fast) ease-(--motion-ease-out) hover:bg-muted/60 dark:hover:bg-muted/40 active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'

export function ComponentCard({ item }: { item: ComponentItem }) {
  return (
    <Link href={getComponentHref(item.id)} className={CARD_CLASS}>
      <div className="flex min-h-48 items-center justify-center pointer-events-none">
        <div className="scale-125">
          <ComponentPreview item={item} />
        </div>
      </div>
      <div className="mt-3">
        <span className="block min-w-0 truncate font-mono text-xs text-foreground/80">
          {item.name}
        </span>
      </div>
    </Link>
  )
}

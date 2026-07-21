'use client'

import Link from 'next/link'
import type { ComponentItem } from '@/lib/components-registry'
import { getComponentHref } from '@/lib/components-registry'

import { ComponentPreview } from './component-preview'

const CARD_CLASS =
  'rounded-2xl bg-[#F7F7F7] dark:bg-card p-5 outline-none transition-colors duration-(--motion-dur-fast) ease-(--motion-ease-out) hover:bg-foreground/2 focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none'

export function ComponentCard({ item }: { item: ComponentItem }) {
  const body = (
    <>
      <div className="flex min-h-48 items-center justify-center">
        <div className="scale-125 backface-hidden transform-[translateZ(0)]">
          <ComponentPreview item={item} />
        </div>
      </div>
      <div className="mt-3">
        <span className="block min-w-0 truncate font-mono text-xs text-foreground/80">
          {item.name}
        </span>
      </div>
    </>
  )

  return (
    <Link href={getComponentHref(item.id)} className={`group block ${CARD_CLASS}`}>
      {body}
    </Link>
  )
}

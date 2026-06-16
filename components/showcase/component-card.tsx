'use client'

import Link from 'next/link'
import type { ComponentItem } from '@/lib/components-registry'
import { getComponentNumber, getComponentHref } from '@/lib/components-registry'

const COLLECTION_COLORS: Record<string, string> = {
  effects: 'var(--color-accent)',
  inputs: 'var(--color-border-strong)',
}

export function ComponentCard({ item }: { item: ComponentItem }) {
  const num = getComponentNumber(item.id)
  const prefix = num < 10 ? `0${num}` : `${num}`
  const accent = COLLECTION_COLORS[item.collection] ?? 'var(--color-border)'

  return (
    <Link
      href={getComponentHref(item.id)}
      className="group block rounded-xl border overflow-hidden transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
      style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
    >
      <div
        className="relative h-44 w-full flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${accent}11, ${accent}22)` }}
      >
        <span
          className="text-5xl font-mono font-medium opacity-10 select-none"
          style={{ color: 'var(--color-fg)' }}
        >
          {prefix}
        </span>
      </div>

      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span
            className="font-mono text-xs font-medium"
            style={{ color: 'var(--color-muted)' }}
          >
            {prefix}
          </span>
          <span className="text-sm font-medium" style={{ color: 'var(--color-fg)' }}>
            {item.name}
          </span>
        </div>

        <span
          className="text-[10px] font-mono uppercase tracking-wider rounded px-1.5 py-0.5"
          style={{
            color: 'var(--color-muted)',
            backgroundColor: 'var(--color-surface-2)',
          }}
        >
          {item.collection}
        </span>
      </div>
    </Link>
  )
}

'use client'

import { useState } from 'react'
import { MobileDrawer, MobileDrawerTitle } from '@/components/ui/mobile-drawer'

export function MobileDrawerPreview() {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg squircle-corners border border-(--color-border) bg-(--color-surface) px-4 py-2.5 text-sm text-(--color-fg)"
      >
        Open Drawer
      </button>
      <MobileDrawer open={open} onClose={() => setOpen(false)} aria-label="Filters">
        <MobileDrawerTitle>Filters</MobileDrawerTitle>
        <div className="px-6 pb-6 space-y-3">
          {['Category', 'Price', 'Rating'].map((label) => (
            <div
              key={label}
              className="flex items-center justify-between rounded-md squircle-corners border border-(--color-border) bg-(--color-surface) px-4 py-3 text-sm"
            >
              <span className="text-(--color-fg)">{label}</span>
              <span className="text-(--color-muted)">Any</span>
            </div>
          ))}
        </div>
      </MobileDrawer>
    </div>
  )
}

'use client'

import { useState, type ReactNode } from 'react'
import { PagePrototype } from '@/components/blocks/shared/page-prototype'

export type DemoControl = { open: boolean; onOpenChange: (open: boolean) => void }

export function ResetButton({
  show,
  label,
  onReset,
}: {
  show: boolean
  label: string
  onReset: () => void
}) {
  if (!show) return null

  return (
    <button
      type="button"
      onClick={onReset}
      className="absolute end-3 top-3 z-10 cursor-pointer rounded-md border border-(--color-border) bg-(--color-bg) px-3 py-2 text-xs text-(--color-fg) transition-colors duration-(--motion-dur-fast) hover:bg-(--color-surface-2) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) motion-reduce:transition-none"
    >
      {label}
    </button>
  )
}

export function TopBannerDemo({ render }: { render: (control: DemoControl) => ReactNode }) {
  const [open, setOpen] = useState(true)

  return (
    <div className="relative h-full w-full">
      <PagePrototype top={render({ open, onOpenChange: setOpen })} />
      <ResetButton show={!open} label="Show banner again" onReset={() => setOpen(true)} />
    </div>
  )
}

'use client'

import { cn } from '@/lib/utils'
import { Tooltip } from './tooltip'

const ICON_CLASS =
  'inline-flex items-center justify-center text-(--color-muted) transition-colors duration-(--motion-dur-fast) motion-reduce:transition-none hover:text-(--color-fg)'

function InfoIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="11" x2="12" y2="16" />
      <circle cx="12" cy="8" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function AnatomyLicenseNotice({
  className,
  as = 'button',
}: {
  className?: string
  as?: 'button' | 'span'
}) {
  return (
    <Tooltip content="Anatomy diagrams are CC BY-NC 4.0 — not for commercial use" side="top">
      {as === 'span' ? (
        <span
          tabIndex={0}
          role="img"
          aria-label="Anatomy diagram license notice"
          className={cn(ICON_CLASS, className)}
        >
          <InfoIcon />
        </span>
      ) : (
        <button
          type="button"
          aria-label="Anatomy diagram license notice"
          className={cn(ICON_CLASS, className)}
        >
          <InfoIcon />
        </button>
      )}
    </Tooltip>
  )
}

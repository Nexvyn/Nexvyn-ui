'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

const sentenceClassName =
  'flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-balance font-medium text-lg leading-snug tracking-tight text-foreground sm:text-xl'

const inlineBadgeClassName = 'inline-flex translate-y-px align-middle'

function DismissibleBadge() {
  const [visible, setVisible] = useState(true)

  if (!visible) {
    return (
      <button
        type="button"
        className="font-medium text-sm text-(--color-muted) underline-offset-4 hover:underline"
        onClick={() => setVisible(true)}
      >
        Show badge again
      </button>
    )
  }

  return (
    <Badge variant="muted" dismissLabel="Remove Design" onDismiss={() => setVisible(false)}>
      Design
    </Badge>
  )
}

export function BadgePreview() {
  return (
    <div className="flex w-full flex-col items-center gap-10 p-8">
      <p className={sentenceClassName}>
        <span>This update is</span>
        <span className={inlineBadgeClassName}>
          <Badge>Early Access</Badge>
        </span>
        <span>and ready to ship.</span>
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Badge size="sm">Small</Badge>
        <Badge size="md">Medium</Badge>
        <Badge size="lg">Large</Badge>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Badge>Solid</Badge>
        <Badge variant="muted">Muted</Badge>
        <Badge variant="dot" pulse>
          Live
        </Badge>
      </div>

      <DismissibleBadge />
    </div>
  )
}

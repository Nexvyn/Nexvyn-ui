'use client'

import { useState } from 'react'
import IdReel, { type PrStatus } from '@/components/ui/id-reel'

const STATUSES: PrStatus[] = ['open', 'draft', 'merged', 'closed']

export function IdReelPreview() {
  const [runKey, setRunKey] = useState(1)
  const [statusIndex, setStatusIndex] = useState(0)

  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <div className="flex flex-col items-center gap-4">
        <IdReel
          value="#1042"
          runKey={runKey}
          status={STATUSES[statusIndex]}
          onStatusClick={() => setStatusIndex((i) => (i + 1) % STATUSES.length)}
        />
        <IdReel value="billing-webhook-retry-2026" width="fixed" maxWidth="12rem" />
        <button
          type="button"
          onClick={() => setRunKey((k) => k + 1)}
          className="text-xs text-(--color-muted) hover:text-(--color-fg) transition-colors"
        >
          Replay odometer
        </button>
      </div>
    </div>
  )
}

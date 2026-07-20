'use client'

import { Badge } from '@/components/ui/badge'

const sentenceClassName =
  'flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2 text-balance font-medium text-xl leading-snug tracking-tight text-foreground sm:text-2xl'

const inlineBadgeClassName = 'inline-flex align-baseline'

export function BadgePreview() {
  return (
    <div className="flex w-full flex-col items-center gap-10 p-8">
      <p className={sentenceClassName}>
        <span>This update is</span>
        <span className={inlineBadgeClassName}>
          <Badge size="lg">Early Access</Badge>
        </span>
        <span>and ready to ship.</span>
      </p>
    </div>
  )
}

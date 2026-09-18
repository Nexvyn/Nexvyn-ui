'use client'

import { CtaCentered } from '@/components/blocks/cta/cta-centered'
import { PagePrototype } from '@/components/blocks/shared/page-prototype'

export function CtaCenteredDemo() {
  return (
    <div className="relative h-full w-full">
      <PagePrototype bottom={<CtaCentered />} />
    </div>
  )
}

'use client'

import { LaptopMockupCard } from '@/components/illustration/laptop-mockup'

const screenClassName =
  'flex h-full items-center justify-center bg-linear-145 from-(--color-surface) to-(--color-surface-2) text-sm font-normal text-(--color-muted)'

export function LaptopMockupPreview() {
  return (
    <div className="flex items-center justify-center p-6">
      <LaptopMockupCard variant="titanium">
        <div className={screenClassName}>Screen</div>
      </LaptopMockupCard>
    </div>
  )
}

'use client'

import { LaptopMockupCard } from '@/components/illustration/laptop-mockup'

const screenClassName =
  'flex h-full items-center justify-center bg-(--color-accent)/10 text-sm font-medium text-(--color-accent)'

export function LaptopMockupPreview() {
  return (
    <div className="flex items-center justify-center p-6">
      <LaptopMockupCard variant="titanium">
        <div className={screenClassName}>Screen</div>
      </LaptopMockupCard>
    </div>
  )
}

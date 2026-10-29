'use client'

import { PhoneMockupCard } from '@/components/illustration/phone-mockup'

const screenClassName =
  'flex h-full items-center justify-center bg-linear-145 from-(--color-surface) to-(--color-surface-2) text-sm font-normal text-(--color-muted)'

export function PhoneMockupPreview() {
  return (
    <div className="flex items-center justify-center gap-4 p-6">
      <PhoneMockupCard variant="titanium" className="hidden -rotate-6 scale-90 opacity-70 sm:block">
        <div className={screenClassName}>Screen</div>
      </PhoneMockupCard>

      <PhoneMockupCard variant="titanium" className="z-10">
        <div className={screenClassName}>Screen</div>
      </PhoneMockupCard>

      <PhoneMockupCard variant="titanium" className="hidden rotate-6 scale-90 opacity-70 sm:block">
        <div className={screenClassName}>Screen</div>
      </PhoneMockupCard>
    </div>
  )
}

/** Single-phone thumbnail used by the grid card, no wireframe; always the live illustration. */
export function PhoneMockupThumbnail() {
  return (
    <PhoneMockupCard variant="titanium">
      <div className={screenClassName}>Screen</div>
    </PhoneMockupCard>
  )
}

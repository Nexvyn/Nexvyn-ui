'use client'

import { PhoneMockupCard } from '@/components/illustration/phone-mockup'

const screenClassName =
  'flex h-full items-center justify-center bg-(--color-accent)/10 text-sm font-medium text-(--color-accent)'

export function PhoneMockupPreview() {
  return (
    <div className="flex items-center justify-center gap-4 p-6">
      <PhoneMockupCard
        variant="accent"
        className="hidden -rotate-6 scale-90 opacity-70 sm:block"
      >
        <div className={screenClassName}>Screen</div>
      </PhoneMockupCard>

      <PhoneMockupCard variant="accent" className="z-10">
        <div className={screenClassName}>Screen</div>
      </PhoneMockupCard>

      <PhoneMockupCard variant="accent" className="hidden rotate-6 scale-90 opacity-70 sm:block">
        <div className={screenClassName}>Screen</div>
      </PhoneMockupCard>
    </div>
  )
}

/** Single-phone thumbnail used by the grid card — no wireframe, always the live illustration. */
export function PhoneMockupThumbnail() {
  return (
    <PhoneMockupCard variant="accent">
      <div className={screenClassName}>Screen</div>
    </PhoneMockupCard>
  )
}

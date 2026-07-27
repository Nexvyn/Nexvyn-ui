'use client'

import { PhoneMockupCard } from '@/components/illustration/phone-mockup'

const screenClassName =
  'flex h-full items-center justify-center bg-[linear-gradient(145deg,#EBDFD1_28%,#E4DACB_38%,#D6D4BE_47%,#B7C0A2_57%,#9EAF8D_68%,#8DA37F_82%)] text-sm font-medium text-black/70'

export function PhoneMockupPreview() {
  return (
    <div className="flex items-center justify-center gap-4 p-6">
      <PhoneMockupCard variant="accent" className="hidden -rotate-6 scale-90 opacity-70 sm:block">
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

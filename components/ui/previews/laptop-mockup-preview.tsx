'use client'

import { LaptopMockupCard } from '@/components/illustration/laptop-mockup'

const screenClassName =
  'flex h-full items-center justify-center bg-[linear-gradient(145deg,#EBDFD1_28%,#E4DACB_38%,#D6D4BE_47%,#B7C0A2_57%,#9EAF8D_68%,#8DA37F_82%)] text-sm font-medium text-black/70'

export function LaptopMockupPreview() {
  return (
    <div className="flex items-center justify-center p-6">
      <LaptopMockupCard variant="titanium">
        <div className={screenClassName}>Screen</div>
      </LaptopMockupCard>
    </div>
  )
}

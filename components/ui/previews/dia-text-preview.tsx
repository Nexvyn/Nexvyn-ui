'use client'

import { DiaText } from '@/components/ui/dia-text'

export function DiaTextPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <DiaText
        variant="sweep"
        repeat
        repeatDelay={0.6}
        once={false}
        className="text-2xl font-semibold tracking-tight"
      >
        {['Fluid Precision', 'Editorial Restraint', 'Signature Motion']}
      </DiaText>
    </div>
  )
}

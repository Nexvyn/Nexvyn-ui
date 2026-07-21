'use client'

import { useState } from 'react'
import { Fader } from '@/components/ui/fader'

export function FaderPreview() {
  const [volume, setVolume] = useState(65)

  return (
    <div className="flex flex-col gap-6 w-full max-w-sm p-4">
      <Fader
        label="Volume"
        value={volume}
        onValueChange={setVolume}
        min={0}
        max={100}
        unit="%"
        size="md"
        tone="accent"
      />
    </div>
  )
}

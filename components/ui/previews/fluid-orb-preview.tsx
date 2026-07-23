'use client'

import { useState } from 'react'
import { FluidOrb } from '@/components/ui/fluid-orb'

const COLORS = [
  { label: 'ChatGPT', value: '#E8EDF3' },
  { label: 'Emerald', value: '#38ef7d' },
  { label: 'Sapphire', value: '#00c6ff' },
  { label: 'Amethyst', value: '#8E2DE2' },
  { label: 'Coral', value: '#ff0099' },
]

export function FluidOrbPreview() {
  const [activeColor, setActiveColor] = useState(COLORS[0].value)

  return (
    <div className="flex flex-col items-center gap-5">
      <FluidOrb size={220} color={activeColor} />
      <div className="flex gap-2">
        {COLORS.map((c) => (
          <button
            key={c.value}
            onClick={() => setActiveColor(c.value)}
            className="group relative size-7 rounded-full border-2 transition-[border-color,transform] duration-150"
            style={{
              backgroundColor: c.value,
              borderColor: activeColor === c.value ? 'var(--color-fg)' : 'transparent',
            }}
            aria-label={c.label}
          >
            <span className="sr-only">{c.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

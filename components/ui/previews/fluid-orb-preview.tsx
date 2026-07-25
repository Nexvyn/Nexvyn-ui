'use client'

import { useState } from 'react'
import { FluidOrb } from '@/components/ui/fluid-orb'
import { useCssColorRgb } from '@/lib/hooks/use-css-color-rgb'

type NeutralTone = 'fg' | 'muted' | 'subtle'

const TONES: { id: NeutralTone; label: string }[] = [
  { id: 'fg', label: 'Foreground' },
  { id: 'muted', label: 'Muted' },
  { id: 'subtle', label: 'Subtle' },
]

function rgbToHex([r, g, b]: [number, number, number]): string {
  const h = (n: number) => Math.round(n).toString(16).padStart(2, '0')
  return `#${h(r)}${h(g)}${h(b)}`
}

export function FluidOrbPreview() {
  const [tone, setTone] = useState<NeutralTone>('muted')
  const fg = useCssColorRgb('--color-fg', [10, 10, 10])
  const muted = useCssColorRgb('--color-muted', [115, 115, 115])
  const subtle = useCssColorRgb('--color-subtle', [163, 163, 163])

  const byTone: Record<NeutralTone, [number, number, number]> = {
    fg,
    muted,
    subtle,
  }
  const activeHex = rgbToHex(byTone[tone])

  return (
    <div className="flex flex-col items-center gap-5">
      <FluidOrb size={220} color={activeHex} />
      <div className="flex gap-2">
        {TONES.map((t) => {
          const rgb = byTone[t.id]
          const selected = tone === t.id
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTone(t.id)}
              className="relative size-7 rounded-full border-2 transition-[border-color,transform] duration-(--motion-dur-fast) ease-(--motion-ease-out) motion-reduce:transition-none"
              style={{
                backgroundColor: `rgb(${rgb[0]} ${rgb[1]} ${rgb[2]})`,
                borderColor: selected ? 'var(--color-fg)' : 'var(--color-border)',
              }}
              aria-label={t.label}
              aria-pressed={selected}
              title={t.label}
            >
              <span className="sr-only">{t.label}</span>
            </button>
          )
        })}
      </div>
      <p className="text-xs text-(--color-muted)">{TONES.find((t) => t.id === tone)?.label}</p>
    </div>
  )
}

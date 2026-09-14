'use client'

import { useState } from 'react'
import { FluidOrb } from '@/components/ui/fluid-orb'
import { cn } from '@/lib/utils'

type NeutralTone = 'fg' | 'muted' | 'subtle'

const TONES: { id: NeutralTone; label: string; token: string }[] = [
  { id: 'fg', label: 'Foreground', token: 'var(--color-fg)' },
  { id: 'muted', label: 'Muted', token: 'var(--color-muted)' },
  { id: 'subtle', label: 'Subtle', token: 'var(--color-subtle)' },
]

export function FluidOrbPreview() {
  const [tone, setTone] = useState<NeutralTone>('muted')
  const active = TONES.find((t) => t.id === tone) ?? TONES[1]

  return (
    <div className="flex flex-col items-center gap-5">
      <FluidOrb size={220} color={active.token} />
      <div className="flex gap-2">
        {TONES.map((t) => {
          const selected = tone === t.id
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTone(t.id)}
              className={cn(
                'relative size-7 rounded-full border-2 transition-[border-color] duration-(--motion-dur-fast) ease-(--motion-ease-out) motion-reduce:transition-none',
                selected ? 'border-(--color-accent)' : 'border-(--color-border)',
              )}
              style={{ backgroundColor: t.token }}
              aria-label={t.label}
              aria-pressed={selected}
              title={t.label}
            />
          )
        })}
      </div>
      <p className="text-xs text-(--color-muted)">{active.label}</p>
    </div>
  )
}

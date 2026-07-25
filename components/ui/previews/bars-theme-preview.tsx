'use client'

import { useState, useEffect } from 'react'
import { BarsTheme, type OrbState } from '@/components/ui/bars-theme'
import { useSimulatedVoice } from './use-simulated-voice'

const STATES: OrbState[] = ['idle', 'connecting', 'listening', 'thinking', 'speaking']

export function BarsThemePreview() {
  const [state, setState] = useState<OrbState>('idle')
  const volume = useSimulatedVoice(state === 'listening' || state === 'speaking')

  useEffect(() => {
    const interval = setInterval(() => {
      setState((prev) => {
        const idx = STATES.indexOf(prev)
        return STATES[(idx + 1) % STATES.length]
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center gap-4">
      <BarsTheme state={state} volume={volume} size={180} />
      <div
        className="text-xs font-medium tracking-wide uppercase"
        style={{ color: 'var(--color-muted)' }}
      >
        {state}
      </div>
    </div>
  )
}

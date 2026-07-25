'use client'

import { useEffect, useRef, useState } from 'react'

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

/**
 * Simulates real speech amplitude instead of random jitter: phrase
 * bursts separated by natural pauses, syllable-rate modulation with a
 * drifting tempo, and a fast-attack / slow-release envelope like an
 * actual level meter. Returns a smooth 0-1 volume updated every frame.
 */
export function useSimulatedVoice(active: boolean): number {
  const [volume, setVolume] = useState(0)
  const envRef = useRef(0)

  useEffect(() => {
    if (!active) {
      envRef.current = 0
      // Part of the same effect that drives the rAF loop below — resetting
      // to silence when deactivated isn't derivable from render.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVolume(0)
      return
    }

    let raf = 0
    let last = performance.now()
    // random phase so multiple previews on one page don't sync up
    const t0 = last - Math.random() * 40

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      const t = (now - t0) / 1000

      // phrases: stretches of speech with brief silences between them
      const phrase = 0.5 + 0.5 * Math.sin(t * 0.8 + 1.6 * Math.sin(t * 0.33))
      const gate = smoothstep(0.3, 0.5, phrase)

      // syllables: ~4-6 Hz with a drifting, never-repeating rhythm
      const syllable =
        0.5 +
        0.28 * Math.sin(t * 8.1 + 1.4 * Math.sin(t * 2.7)) +
        0.22 * Math.sin(t * 12.7 + 0.9 * Math.sin(t * 1.9))

      // slow word-level emphasis so loudness wanders naturally
      const emphasis = 0.7 + 0.3 * Math.sin(t * 0.61 + 2.0)

      const target = gate * Math.max(0, Math.min(1, 0.18 + 0.82 * syllable * emphasis))

      // fast attack, slower release
      const rate = target > envRef.current ? 14 : 5
      envRef.current += (target - envRef.current) * Math.min(1, rate * dt)

      setVolume(envRef.current)
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active])

  return volume
}

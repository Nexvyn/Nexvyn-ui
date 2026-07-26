'use client'

import { useSyncExternalStore, useCallback, useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { springs } from '@/lib/motion-tokens'
import { isSoundMuted, subscribeSoundMuted, toggleSoundMuted } from '@/lib/sound'
import { Button } from './button'

function getServerSnapshot() {
  return false
}

export function SoundToggle({
  className,
  variant = 'ghost',
}: {
  className?: string
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
}) {
  const muted = useSyncExternalStore(subscribeSoundMuted, isSoundMuted, getServerSnapshot)

  const toggle = useCallback(() => {
    toggleSoundMuted()
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'm' || e.key === 'M') {
        const tag = (e.target as HTMLElement).tagName
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
        toggle()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [toggle])

  return (
    <Button
      onClick={toggle}
      className={cn(
        'h-9 w-9 p-0 rounded-2xl squircle-corners hit-area-44 hover:bg-(--color-surface-2) hover:text-(--color-fg)',
        className,
      )}
      style={{ color: 'var(--color-fg)' }}
      variant={variant}
      size="sm"
      aria-label={muted ? 'Unmute sound (M)' : 'Mute sound (M)'}
      aria-pressed={muted}
      suppressHydrationWarning
    >
      <SoundIcon muted={muted} />
    </Button>
  )
}

// Phosphor Icons — "speaker-high" / "speaker-slash" (regular), https://phosphoricons.com/
const SPEAKER_HIGH_PATH =
  'M155.51,24.81a8,8,0,0,0-8.42.88L77.25,80H32A16,16,0,0,0,16,96v64a16,16,0,0,0,16,16H77.25l69.84,54.31A8,8,0,0,0,160,224V32A8,8,0,0,0,155.51,24.81ZM32,96H72v64H32ZM144,207.64,88,164.09V91.91l56-43.55Zm54-106.08a40,40,0,0,1,0,52.88,8,8,0,0,1-12-10.58,24,24,0,0,0,0-31.72,8,8,0,0,1,12-10.58ZM248,128a79.9,79.9,0,0,1-20.37,53.34,8,8,0,0,1-11.92-10.67,64,64,0,0,0,0-85.33,8,8,0,1,1,11.92-10.67A79.83,79.83,0,0,1,248,128Z'

const SPEAKER_SLASH_PATH =
  'M53.92,34.62A8,8,0,1,0,42.08,45.38L73.55,80H32A16,16,0,0,0,16,96v64a16,16,0,0,0,16,16H77.25l69.84,54.31A8,8,0,0,0,160,224V175.09l42.08,46.29a8,8,0,1,0,11.84-10.76ZM32,96H72v64H32ZM144,207.64,88,164.09V95.89l56,61.6Zm42-63.77a24,24,0,0,0,0-31.72,8,8,0,1,1,12-10.57,40,40,0,0,1,0,52.88,8,8,0,0,1-12-10.59Zm-80.16-76a8,8,0,0,1,1.4-11.23l39.85-31A8,8,0,0,1,160,32v74.83a8,8,0,0,1-16,0V48.36l-26.94,21A8,8,0,0,1,105.84,67.91ZM248,128a79.9,79.9,0,0,1-20.37,53.34,8,8,0,0,1-11.92-10.67,64,64,0,0,0,0-85.33,8,8,0,1,1,11.92-10.67A79.83,79.83,0,0,1,248,128Z'

function SoundIcon({ muted }: { muted: boolean }) {
  const reduceMotion = useReducedMotion()

  return (
    <span className="relative flex size-4.5 items-center justify-center">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.svg
          key={muted ? 'muted' : 'unmuted'}
          width="18"
          height="18"
          viewBox="0 0 256 256"
          fill="currentColor"
          aria-hidden="true"
          className="absolute inset-0 motion-reduce:transition-none"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.6, rotate: muted ? -25 : 25 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={
            reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6, rotate: muted ? 25 : -25 }
          }
          transition={reduceMotion ? { duration: 0 } : springs.press}
        >
          <path d={muted ? SPEAKER_SLASH_PATH : SPEAKER_HIGH_PATH} />
        </motion.svg>
      </AnimatePresence>
    </span>
  )
}

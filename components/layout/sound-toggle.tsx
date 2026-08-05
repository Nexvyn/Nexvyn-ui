'use client'

import { useSyncExternalStore, useCallback, useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Volume2, VolumeX } from 'lucide-react'
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

const MotionVolume2 = motion.create(Volume2)
const MotionVolumeX = motion.create(VolumeX)

function SoundIcon({ muted }: { muted: boolean }) {
  const reduceMotion = useReducedMotion()
  const Icon = muted ? MotionVolumeX : MotionVolume2

  return (
    <span className="relative flex size-4.5 items-center justify-center">
      <AnimatePresence mode="popLayout" initial={false}>
        <Icon
          key={muted ? 'muted' : 'unmuted'}
          width={18}
          height={18}
          strokeWidth={2}
          aria-hidden="true"
          className="absolute inset-0 motion-reduce:transition-none"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.6, rotate: muted ? -25 : 25 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={
            reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6, rotate: muted ? 25 : -25 }
          }
          transition={reduceMotion ? { duration: 0 } : springs.press}
        />
      </AnimatePresence>
    </span>
  )
}

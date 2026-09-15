'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { Play, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'

const EASINGS = [
  {
    id: 'out',
    label: 'Ease out',
    token: '--motion-ease-out',
    points: [0.22, 1, 0.36, 1] as const,
    use: 'Entering or leaving the screen',
    className: 'ease-(--motion-ease-out)',
  },
  {
    id: 'in-out',
    label: 'Ease in out',
    token: '--motion-ease-in-out',
    points: [0.65, 0, 0.35, 1] as const,
    use: 'Moving or morphing on screen',
    className: 'ease-(--motion-ease-in-out)',
  },
]

const DURATIONS = [
  { name: 'instant', ms: 50, use: 'State flips', className: 'duration-(--motion-dur-instant)' },
  { name: 'fast', ms: 120, use: 'Hovers, presses', className: 'duration-(--motion-dur-fast)' },
  { name: 'base', ms: 200, use: 'Most UI motion', className: 'duration-(--motion-dur-base)' },
  { name: 'slow', ms: 320, use: 'Panels, overlays', className: 'duration-(--motion-dur-slow)' },
  {
    name: 'showcase',
    ms: 700,
    use: 'Signature moments',
    className: 'duration-(--motion-dur-showcase)',
  },
  { name: 'ambient', ms: 1000, use: 'Ambient loops', className: 'duration-(--motion-dur-ambient)' },
]

const MAX_MS = Math.max(...DURATIONS.map((item) => item.ms))
const PROPERTIES = ['transform', 'opacity', 'clip-path', 'filter']
const GRID_LINES = [25, 50, 75]
const AUTOPLAY_DELAY = 600

type Phase = 'rest' | 'reset' | 'play'

function curvePath([x1, y1, x2, y2]: readonly [number, number, number, number]) {
  return `M0 100 C${x1 * 100} ${100 - y1 * 100} ${x2 * 100} ${100 - y2 * 100} 100 0`
}

export interface MotionTokensProps {
  playLabel?: string
  replayLabel?: string
}

export function MotionTokens({ playLabel = 'Play', replayLabel = 'Replay' }: MotionTokensProps) {
  const reduceMotion = useReducedMotion()
  const [easingId, setEasingId] = useState(EASINGS[0].id)
  const [phase, setPhase] = useState<Phase>('rest')
  const frames = useRef(new Set<number>())
  const easing = EASINGS.find((item) => item.id === easingId) ?? EASINGS[0]

  const play = useCallback(() => {
    const pending = frames.current
    pending.forEach(cancelAnimationFrame)
    pending.clear()
    setPhase('reset')
    const outer = requestAnimationFrame(() => {
      pending.delete(outer)
      const inner = requestAnimationFrame(() => {
        pending.delete(inner)
        setPhase('play')
      })
      pending.add(inner)
    })
    pending.add(outer)
  }, [])

  useEffect(() => {
    const pending = frames.current
    const timer = setTimeout(play, AUTOPLAY_DELAY)
    return () => {
      clearTimeout(timer)
      pending.forEach(cancelAnimationFrame)
      pending.clear()
    }
  }, [play])

  const done = reduceMotion || phase === 'play'
  const moving = cn(
    'transition-[translate] motion-reduce:transition-none',
    phase === 'reset' && 'transition-none',
  )
  const selectEasing = (id: string) => {
    setEasingId(id)
    play()
  }

  return (
    <div className="flex flex-1 flex-col gap-6 short:gap-4">
      <button
        type="button"
        onClick={play}
        className="squircle-corners hit-area-44 absolute inset-e-4 top-4 inline-flex h-7 items-center gap-1.5 rounded-md border border-(--color-border) bg-(--color-bg) px-2.5 text-xs font-normal text-(--color-fg) outline-none transition-[background-color,scale] duration-(--motion-dur-fast) ease-(--motion-ease-out) hover:bg-(--color-surface) focus-visible:ring-2 focus-visible:ring-(--color-accent) active:scale-97 motion-reduce:transition-none motion-reduce:active:scale-100 sm:inset-e-5 sm:top-5"
      >
        {phase === 'rest' ? (
          <Play aria-hidden="true" className="size-3" strokeWidth={1.5} />
        ) : (
          <RotateCcw aria-hidden="true" className="size-3" strokeWidth={1.5} />
        )}
        {phase === 'rest' ? playLabel : replayLabel}
      </button>

      <div
        role="group"
        aria-label="Easing curve"
        className="squircle-corners flex w-fit gap-1 rounded-md bg-(--color-surface-2) p-1"
      >
        {EASINGS.map((item) => {
          const selected = item.id === easingId
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={selected}
              onClick={() => selectEasing(item.id)}
              className={cn(
                'squircle-corners h-7 rounded-md px-2.5 text-xs font-normal outline-none transition-colors duration-(--motion-dur-fast) focus-visible:ring-2 focus-visible:ring-(--color-accent) motion-reduce:transition-none',
                selected
                  ? 'bg-(--color-bg) text-(--color-fg) shadow-xs'
                  : 'text-(--color-muted) hover:text-(--color-fg)',
              )}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      <div className="flex items-end gap-6 ps-5 pb-6">
        <div dir="ltr" className="relative aspect-square w-40 shrink-0 sm:w-52 short:w-36">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 size-full overflow-visible"
            aria-hidden="true"
          >
            <rect
              width="100"
              height="100"
              fill="none"
              className="stroke-(--color-border)"
              vectorEffect="non-scaling-stroke"
            />
            {GRID_LINES.map((line) => (
              <g key={line} className="stroke-(--color-border)" strokeDasharray="2 3">
                <line x1={line} y1="0" x2={line} y2="100" vectorEffect="non-scaling-stroke" />
                <line x1="0" y1={line} x2="100" y2={line} vectorEffect="non-scaling-stroke" />
              </g>
            ))}
            <path
              d={curvePath(easing.points)}
              fill="none"
              className="stroke-(--color-fg)"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <div
            aria-hidden="true"
            className={cn(
              'absolute inset-0 ease-linear duration-(--motion-dur-showcase)',
              moving,
              done ? 'translate-x-full' : 'translate-x-0',
            )}
          >
            <div
              className={cn(
                'absolute inset-0 duration-(--motion-dur-showcase)',
                easing.className,
                moving,
                done ? '-translate-y-full' : 'translate-y-0',
              )}
            >
              <span className="squircle absolute bottom-0 left-0 size-3 -translate-x-1/2 translate-y-1/2 bg-(--color-accent) ring-4 ring-(--color-bg)" />
            </div>
            <span className="absolute -bottom-3 left-0 h-2 w-px -translate-x-1/2 bg-(--color-fg)" />
          </div>
          <div
            aria-hidden="true"
            className={cn(
              'absolute inset-0 duration-(--motion-dur-showcase)',
              easing.className,
              moving,
              done ? '-translate-y-full' : 'translate-y-0',
            )}
          >
            <span className="absolute bottom-0 -left-3 h-px w-2 translate-y-1/2 bg-(--color-fg)" />
          </div>
          <span className="absolute -bottom-6 left-0 text-xs text-(--color-subtle)">time</span>
          <span className="absolute -left-5 top-0 rotate-180 text-xs text-(--color-subtle) [writing-mode:vertical-rl]">
            value
          </span>
        </div>

        <div className="flex min-w-0 flex-col gap-1">
          <p className="text-sm text-(--color-fg)">{easing.label}</p>
          <p className="text-xs leading-relaxed text-(--color-muted)">{easing.use}</p>
          <p className="mt-2 font-mono text-xs text-(--color-subtle)">{easing.token}</p>
          <p className="font-mono text-xs text-(--color-subtle)">{`(${easing.points.join(', ')})`}</p>
        </div>
      </div>

      <ul className="flex flex-1 flex-col justify-center gap-4 short:gap-2">
        {DURATIONS.map((item) => (
          <li key={item.name} className="flex flex-col gap-1.5">
            <div className="flex items-baseline justify-between gap-3 text-xs">
              <span className="flex min-w-0 items-baseline gap-2">
                <span className="text-(--color-fg)">{item.name}</span>
                <span className="truncate text-(--color-subtle)">{item.use}</span>
              </span>
              <span className="font-mono tabular-nums text-(--color-muted)">{item.ms}ms</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-xs bg-(--color-surface-2)">
              <div
                className={cn(
                  'h-full rounded-xs ltr:origin-left rtl:origin-right',
                  'transition-[scale] motion-reduce:transition-none',
                  item.name === 'showcase' ? 'bg-(--color-accent)' : 'bg-(--color-fg)',
                  phase === 'reset' && 'transition-none',
                  item.className,
                  easing.className,
                )}
                style={{ scale: `${done ? Math.max(item.ms / MAX_MS, 0.04) : 0} 1` }}
              />
            </div>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap items-center gap-2 border-t border-(--color-border) pt-4 text-xs text-(--color-muted)">
        <span className="me-1 text-(--color-subtle)">Animates only</span>
        {PROPERTIES.map((property) => (
          <span
            key={property}
            className="squircle-corners rounded-md border border-(--color-border) px-2 py-0.5 font-mono"
          >
            {property}
          </span>
        ))}
      </div>
    </div>
  )
}

'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Shared drawing primitives for components/diagrams/* — licensed separately
// from the rest of this repository under CC BY-NC 4.0.
// See components/diagrams/LICENSE. NOT covered by the root MIT LICENSE.

import { createContext, useContext, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type HoverState = string | null

interface AnatomyContextType {
  hovered: HoverState
  setHovered: (id: HoverState) => void
}

const AnatomyContext = createContext<AnatomyContextType | null>(null)

const SPOTLIGHT_TRANSITION =
  'transition-[opacity,filter] duration-(--motion-dur-base) ease-(--motion-ease-in-out) motion-reduce:transition-none motion-reduce:filter-none'

function staticOpacityClass(value: number, fallback: string): string {
  switch (value) {
    case 0:
      return 'opacity-0'
    case 10:
      return 'opacity-10'
    case 20:
      return 'opacity-20'
    case 30:
      return 'opacity-30'
    case 40:
      return 'opacity-40'
    case 50:
      return 'opacity-50'
    case 60:
      return 'opacity-60'
    case 70:
      return 'opacity-70'
    case 80:
      return 'opacity-80'
    case 90:
      return 'opacity-90'
    case 100:
      return 'opacity-100'
    default:
      return fallback
  }
}

export function useAnatomy() {
  const context = useContext(AnatomyContext)
  if (!context) throw new Error('useAnatomy must be used within AnatomyFrame')
  return context
}

export function useSpotlight(
  partIds: string | string[],
  options?: { isInteraction?: boolean; defaultOpacity?: number },
) {
  const { hovered } = useAnatomy()
  const ids = Array.isArray(partIds) ? partIds : [partIds]

  const isHovered = hovered !== null && ids.includes(hovered)
  const isOthersHovered = hovered !== null && !isHovered
  const idleOpacity = options?.defaultOpacity ?? (options?.isInteraction ? 40 : 70)

  const opacityClass = isHovered
    ? 'opacity-100'
    : isOthersHovered
      ? options?.isInteraction
        ? 'opacity-20'
        : 'opacity-30'
      : staticOpacityClass(idleOpacity, options?.isInteraction ? 'opacity-40' : 'opacity-70')

  return {
    className: `${SPOTLIGHT_TRANSITION} ${opacityClass}`,
    style: {
      filter: isOthersHovered ? 'url(#spotlight-blur)' : 'none',
    },
  }
}

export function useSpotlightBadge(partId: string) {
  const { hovered } = useAnatomy()
  const isHovered = hovered === partId
  const isOthersHovered = hovered !== null && !isHovered

  return {
    isHovered,
    wrapperClassName: `${SPOTLIGHT_TRANSITION} ${isOthersHovered ? 'opacity-60' : 'opacity-100'}`,
    wrapperStyle: { filter: 'none' },
  }
}

export function AnatomyTag({
  part,
  label,
  isAccent = false,
  className,
}: {
  part: string
  label: string
  isAccent?: boolean
  className?: string
}) {
  const { setHovered } = useAnatomy()
  const { isHovered, wrapperClassName, wrapperStyle } = useSpotlightBadge(part)

  return (
    <div
      className={cn('pointer-events-none flex h-full w-full', wrapperClassName, className)}
      style={wrapperStyle}
    >
      <button
        type="button"
        onMouseEnter={() => setHovered(part)}
        onMouseLeave={() => setHovered(null)}
        onFocus={() => setHovered(part)}
        onBlur={() => setHovered(null)}
        style={{ pointerEvents: 'all' }}
        className={cn(
          'cursor-pointer squircle-corners rounded-md border bg-(--color-bg) px-2 py-1 text-[10px] font-medium leading-tight whitespace-nowrap shadow-sm outline-none',
          'transition-colors duration-(--motion-dur-fast) ease focus-visible:ring-2 focus-visible:ring-(--color-accent) motion-reduce:transition-none',
          isHovered
            ? 'border-(--color-fg) bg-(--color-fg) text-(--color-bg)'
            : isAccent
              ? 'border-(--color-fg)/40 text-(--color-fg)'
              : 'border-(--color-border) text-(--color-fg)/80',
        )}
      >
        {label}
      </button>
    </div>
  )
}

export function OverlayLine({
  id,
  x1,
  y1,
  x2,
  y2,
}: {
  id: string
  x1: number
  y1: number
  x2: number
  y2: number
}) {
  const { hovered } = useAnatomy()
  const spotlight = useSpotlight(id, { defaultOpacity: 80 })
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      className={`${hovered === id ? 'stroke-(--color-fg)' : 'stroke-(--color-border)'} ${spotlight.className}`}
      style={spotlight.style}
    />
  )
}

export { squirclePillPath } from '@/components/diagrams/lib/parts'

export function AnatomyDefs() {
  return (
    <defs>
      <pattern
        id="bp-anatomy-hatch"
        patternUnits="userSpaceOnUse"
        width="4"
        height="4"
        patternTransform="rotate(45)"
      >
        <rect width="4" height="4" className="fill-(--color-bg)" />
        <line
          x1="0"
          y1="0"
          x2="0"
          y2="4"
          stroke="currentColor"
          strokeWidth="0.75"
          className="opacity-40"
        />
      </pattern>
      <filter id="spotlight-blur">
        <feGaussianBlur stdDeviation="1" />
      </filter>
    </defs>
  )
}

export function AnatomyFrame({
  viewBox,
  maxWidthClassName = 'max-w-xl',
  children,
}: {
  viewBox: string
  maxWidthClassName?: string
  children: ReactNode
}) {
  const [hovered, setHovered] = useState<HoverState>(null)

  return (
    <AnatomyContext.Provider value={{ hovered, setHovered }}>
      <div className="flex w-full items-center justify-center overflow-visible px-2 py-8">
        <svg
          aria-hidden="true"
          viewBox={viewBox}
          fill="none"
          overflow="visible"
          className={cn(
            'mx-auto block h-auto w-full max-w-full overflow-visible font-mono text-xs text-(--color-fg)/80',
            maxWidthClassName,
          )}
        >
          <AnatomyDefs />
          {children}
        </svg>
      </div>
    </AnatomyContext.Provider>
  )
}

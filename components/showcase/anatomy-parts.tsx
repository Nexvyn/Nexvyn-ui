'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type HoverState = string | null

interface AnatomyContextType {
  hovered: HoverState
  setHovered: (id: HoverState) => void
}

const AnatomyContext = createContext<AnatomyContextType | null>(null)

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

  const defaultOp = options?.defaultOpacity ?? 60
  const opacityClass = options?.isInteraction
    ? isHovered
      ? 'opacity-100'
      : isOthersHovered
        ? 'opacity-20'
        : 'opacity-40'
    : isHovered
      ? 'opacity-100'
      : isOthersHovered
        ? 'opacity-30'
        : `opacity-${defaultOp}`

  return {
    className: `transition-all duration-200 ease-out ${opacityClass}`,
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
    wrapperClassName: `transition-all duration-200 ease-out ${isOthersHovered ? 'opacity-30' : 'opacity-100'}`,
    wrapperStyle: { filter: isOthersHovered ? 'blur(1px)' : 'none' },
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
      className={`pointer-events-none flex h-full w-full ${wrapperClassName} ${className}`}
      style={wrapperStyle}
    >
      <button
        type="button"
        onMouseEnter={() => setHovered(part)}
        onMouseLeave={() => setHovered(null)}
        onFocus={() => setHovered(part)}
        onBlur={() => setHovered(null)}
        style={{ pointerEvents: 'all' }}
        className={`cursor-pointer rounded px-1.5 py-0.5 text-[10px] whitespace-nowrap outline-none transition-all duration-200 ease-out focus-visible:ring-2 focus-visible:ring-ring ${
          isHovered
            ? 'border-foreground bg-foreground text-background shadow-sm'
            : isAccent
              ? 'border-foreground/30 bg-foreground/20 text-foreground'
              : 'border-border bg-muted text-muted-foreground'
        }`}
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
      className={`${hovered === id ? 'stroke-foreground' : 'stroke-border'} ${spotlight.className}`}
      style={spotlight.style}
    />
  )
}

export { squirclePillPath } from '@/components/showcase/parts'

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
        <rect width="4" height="4" className="fill-background" />
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
      <div className="flex w-full items-center justify-center overflow-visible py-10">
        <svg
          aria-hidden="true"
          viewBox={viewBox}
          fill="none"
          className={cn(
            'w-full overflow-visible font-mono text-xs text-foreground/80',
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

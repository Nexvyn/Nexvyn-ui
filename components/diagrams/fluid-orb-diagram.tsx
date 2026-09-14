'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset, licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root LICENSE.

import { useId } from 'react'
import {
  AnatomyCallout,
  AnatomyFrame,
  useAnatomy,
  useSpotlight,
} from '@/components/diagrams/lib/anatomy-parts'
import {
  DraftSurface,
  DRAFT_SCAFFOLD_FADE,
  DRAFT_INK_MORPH,
  draftTheme,
  MeasureH,
  MeasureV,
  GripFrame,
  beat,
  DRAFT_BEAT,
  stampBeat,
} from '@/components/diagrams/lib/diagram-parts'

const BP_FILL_ACCENT = `${DRAFT_INK_MORPH} fill-transparent stroke-current group-hover:fill-(--color-accent) group-focus-visible:fill-(--color-accent) group-hover:stroke-transparent group-focus-visible:stroke-transparent`

const BP_CX = 110
const BP_CY = 70
const BP_R = 42
const BP_SIZE_REAL = 220
const BP_HIGHLIGHT = { x: BP_CX - BP_R * 0.3, y: BP_CY - BP_R * 0.4 } as const

export function FluidOrbBlueprint() {
  const theme = draftTheme
  const blurId = useId()
  const wrapX = BP_CX - BP_R
  const wrapY = BP_CY - BP_R
  const wrapSide = BP_R * 2

  return (
    <DraftSurface>
      <defs>
        <filter id={blurId}>
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>
      <circle
        cx={BP_CX}
        cy={BP_CY}
        r={BP_R}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        filter={`url(#${blurId})`}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity * 0.6}
        style={beat(DRAFT_BEAT.outline)}
        className={`ink-draw ${DRAFT_INK_MORPH} fill-transparent stroke-current group-hover:fill-(--color-surface-2) group-hover:stroke-transparent group-focus-visible:fill-(--color-surface-2) group-focus-visible:stroke-transparent`}
      />
      <circle
        cx={BP_CX}
        cy={BP_CY}
        r={BP_R}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        style={beat(DRAFT_BEAT.outline)}
        className={`ink-draw ${BP_FILL_ACCENT}`}
      />
      <circle
        cx={BP_HIGHLIGHT.x}
        cy={BP_HIGHLIGHT.y}
        r={5}
        className="fill-(--color-accent) opacity-70 group-hover:opacity-100 group-hover:delay-(--motion-dur-base) group-focus-visible:delay-(--motion-dur-base) transition-[opacity,transform] duration-(--motion-dur-fast) ease-(--motion-ease-out) motion-reduce:transition-none fade-note"
        style={{
          transformOrigin: `${BP_HIGHLIGHT.x}px ${BP_HIGHLIGHT.y}px`,
          ...beat(DRAFT_BEAT.hatch),
        }}
      />
      <g
        className={`${DRAFT_SCAFFOLD_FADE.replace('transition-opacity', 'transition-[opacity,transform]')} motion-reduce:transform-none`}
        style={{ transformOrigin: `${BP_CX}px ${BP_CY}px` }}
      >
        <GripFrame x={wrapX} y={wrapY} w={wrapSide} h={wrapSide} style={beat(DRAFT_BEAT.handle)} />
        <MeasureH
          x1={wrapX}
          x2={wrapX + wrapSide}
          y={wrapY - 12}
          label={`${BP_SIZE_REAL}`}
          className="note-stamp"
          style={beat(stampBeat(0))}
        />
        <MeasureV
          x={wrapX - 14}
          y1={wrapY}
          y2={wrapY + wrapSide}
          label={`${BP_SIZE_REAL}`}
          className="note-stamp"
          style={beat(stampBeat(1))}
        />
      </g>
    </DraftSurface>
  )
}

const AN_SIZE = 220
const AN_R = AN_SIZE / 2
const AN_PULSE_R = AN_R * 1.15
const AN_LANE_X = AN_R + 24
const AN_GLOW_ANCHOR = AN_PULSE_R * Math.SQRT1_2

function useEngaged(id: string) {
  const { hovered, pinned } = useAnatomy()
  return (hovered ?? pinned) === id
}

function GlowShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('glow')
  const active = useEngaged('glow')
  const blurId = useId()
  return (
    <g
      onMouseEnter={() => setHovered('glow')}
      onMouseLeave={() => setHovered(null)}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <defs>
        <filter id={blurId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
      </defs>
      <circle
        r={AN_R}
        fill="currentColor"
        fillOpacity={active ? 0.3 : 0.16}
        filter={`url(#${blurId})`}
      />
      <circle
        r={AN_PULSE_R}
        stroke="currentColor"
        strokeWidth={active ? 1.25 : 0.75}
        strokeDasharray="3 3"
        strokeOpacity={0.6}
      />
    </g>
  )
}

function OrbShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('orb')
  const active = useEngaged('orb')
  return (
    <g
      onMouseEnter={() => setHovered('orb')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <circle
        r={AN_R}
        fill="currentColor"
        fillOpacity={active ? 0.7 : 0.45}
        stroke="currentColor"
        strokeWidth={active ? 1.5 : 1}
        className={spotlight.className}
        style={spotlight.style}
      />
    </g>
  )
}

function WrapperAnnotation() {
  const { hovered, pinned } = useAnatomy()
  const engaged = hovered ?? pinned
  const dimmed = engaged !== null && engaged !== 'wrapper'
  return (
    <g
      style={{ pointerEvents: 'none', filter: dimmed ? 'url(#spotlight-blur)' : 'none' }}
      className={`transition-[opacity,filter] duration-(--motion-dur-base) ease-(--motion-ease-in-out) motion-reduce:transition-none motion-reduce:filter-none ${dimmed ? 'opacity-30' : 'opacity-100'}`}
    >
      <GripFrame x={-AN_R} y={-AN_R} w={AN_SIZE} h={AN_SIZE} />
      <MeasureH x1={-AN_R} x2={AN_R} y={-AN_R - 14} label={`${AN_SIZE}`} />
      <MeasureV x={-AN_R - 12} y1={-AN_R} y2={AN_R} label={`${AN_SIZE}`} labelXOffset={-6} />
    </g>
  )
}

export function FluidOrbAnatomy() {
  return (
    <AnatomyFrame viewBox="-150 -148 382 290" ariaLabel="Fluid orb anatomy">
      <GlowShape />
      <OrbShape />
      <WrapperAnnotation />
      <AnatomyCallout
        part="wrapper"
        label="Wrapper"
        anchor={[AN_R, -AN_R * 0.72]}
        side="end"
        distance={24}
        isAccent
        measure={`${AN_SIZE} × ${AN_SIZE} · size prop`}
        caption="Sized div that sets --orb-base and --orb-tint from the color props."
      />
      <AnatomyCallout
        part="orb"
        label="Orb surface"
        anchor={[AN_R, 0]}
        side="end"
        distance={24}
        measure={`${AN_SIZE} · rounded-full · WebGL`}
        caption="Canvas fluid drawn from neutral tokens, accent in highlights."
      />
      <AnatomyCallout
        part="glow"
        label="Glow halo"
        anchor={[AN_GLOW_ANCHOR, AN_GLOW_ANCHOR]}
        side="end"
        distance={AN_LANE_X - AN_GLOW_ANCHOR}
        measure={`${AN_SIZE} · blur-xl · pulses to 1.15×`}
        caption="Radial tint halo that scales with the cadence or audioLevel."
      />
    </AnatomyFrame>
  )
}

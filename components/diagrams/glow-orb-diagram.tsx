'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset, licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root LICENSE.

import type { CSSProperties } from 'react'
import {
  AnatomyCallout,
  AnatomyFrame,
  useAnatomy,
  useSpotlight,
} from '@/components/diagrams/lib/anatomy-parts'
import {
  DraftSurface,
  DRAFT_FILL_SOLID,
  DRAFT_INK_MORPH,
  DRAFT_SCAFFOLD_FADE,
  draftTheme,
  MeasureH,
  MeasureNote,
  GripFrame,
  beat,
  DRAFT_BEAT,
  DRAFT_LABEL_BEAT,
  stampBeat,
} from '@/components/diagrams/lib/diagram-parts'

const RATIO = 0.55

const BP_SCALE = 0.45
const BP_SIZE_REAL = 200
const BP_D_REAL = BP_SIZE_REAL * RATIO
const BP_HOVER_SCALE = 1.04
const BP_HALO_SCALE = 1.15
const BP_CAPTION_GAP = 16 * BP_SCALE
const BP_CAPTION_FONT = 7
const BP_REF_SIZE = BP_SIZE_REAL * BP_SCALE
const BP_D = BP_D_REAL * BP_SCALE
const BP_GLOW_R = (BP_D / 2) * BP_HALO_SCALE
const BP_CX = 110
const BP_HIT = {
  x: BP_CX - BP_REF_SIZE / 2,
  y: 24,
  w: BP_REF_SIZE,
  h: BP_REF_SIZE,
}
const BP_CY = BP_HIT.y + BP_REF_SIZE / 2
const BP_CAPTION_Y = BP_HIT.y + BP_HIT.h + BP_CAPTION_GAP + BP_CAPTION_FONT * 0.75

export function GlowOrbBlueprint() {
  const theme = draftTheme
  return (
    <DraftSurface>
      <circle
        cx={BP_CX}
        cy={BP_CY}
        r={BP_GLOW_R}
        fill="none"
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={1.5}
        className="opacity-0 transition-opacity duration-(--motion-dur-showcase) ease-(--motion-ease-in-out) group-hover:opacity-70 group-hover:delay-(--motion-dur-base) group-focus-visible:opacity-70 group-focus-visible:delay-(--motion-dur-base) motion-reduce:transition-none"
      />
      <g
        style={
          {
            transformOrigin: `${BP_CX}px ${BP_CY}px`,
            '--glow-bp-scale': BP_HOVER_SCALE,
          } as CSSProperties
        }
        className="transition-transform duration-(--motion-dur-base) ease-(--motion-ease-out) group-hover:scale-(--glow-bp-scale) group-hover:delay-(--motion-dur-base) group-focus-visible:scale-(--glow-bp-scale) group-focus-visible:delay-(--motion-dur-base) motion-reduce:transition-none motion-reduce:transform-none"
      >
        <circle
          cx={BP_CX}
          cy={BP_CY}
          r={BP_D / 2}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1}
          strokeWidth={theme.wireframe.strokeWidth}
          strokeOpacity={theme.wireframe.strokeOpacity}
          style={beat(DRAFT_BEAT.outline)}
          className={`ink-draw ${DRAFT_FILL_SOLID}`}
        />
      </g>
      <text
        x={BP_CX}
        y={BP_CAPTION_Y}
        textAnchor="middle"
        fontSize={BP_CAPTION_FONT}
        letterSpacing="0.025em"
        fontFamily="var(--font-sans)"
        style={beat(DRAFT_LABEL_BEAT)}
        className={`fade-note ${DRAFT_INK_MORPH} fill-(--color-muted) opacity-35 group-hover:opacity-100 group-focus-visible:opacity-100`}
      >
        LISTENING
      </text>
      <g className={DRAFT_SCAFFOLD_FADE}>
        <rect
          x={BP_HIT.x}
          y={BP_HIT.y}
          width={BP_HIT.w}
          height={BP_HIT.h}
          fill="none"
          stroke="currentColor"
          strokeDasharray="2 2"
          strokeOpacity={theme.guide.structOpacity}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <GripFrame
          x={BP_CX - BP_D / 2}
          y={BP_CY - BP_D / 2}
          w={BP_D}
          h={BP_D}
          style={beat(DRAFT_BEAT.handle)}
        />
        <MeasureH
          x1={BP_CX - BP_D / 2}
          x2={BP_CX + BP_D / 2}
          y={BP_CY - BP_D / 2 - 7}
          label={`d${Math.round(BP_D_REAL)}`}
          className="note-stamp"
          style={beat(stampBeat(0))}
        />
        <MeasureNote
          x={BP_HIT.x}
          y={BP_HIT.y - 6}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(1))}
        >
          {`${BP_SIZE_REAL} × ${BP_SIZE_REAL} hit area`}
        </MeasureNote>
      </g>
    </DraftSurface>
  )
}

const AN_REF_SIZE = 200
const AN_D = AN_REF_SIZE * RATIO
const AN_ORB_R = AN_D / 2
const AN_GLOW_R = AN_ORB_R * 1.15
const AN_HIT = {
  x: -AN_REF_SIZE / 2,
  y: -AN_REF_SIZE / 2,
  w: AN_REF_SIZE,
  h: AN_REF_SIZE,
}
const AN_TAG_ROW_Y = AN_HIT.y + AN_HIT.h + 8
const AN_ORB_ANCHOR_X = -20
const AN_ORB_ANCHOR_Y = Math.sqrt(AN_ORB_R ** 2 - AN_ORB_ANCHOR_X ** 2)
const AN_GLOW_ANCHOR: [number, number] = [AN_GLOW_R * 0.5, AN_GLOW_R * Math.sin(Math.PI / 3)]

function useEngaged(id: string) {
  const { hovered, pinned } = useAnatomy()
  return (hovered ?? pinned) === id
}

function InteractionZoneShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('zone', { isInteraction: true })
  const active = useEngaged('zone')
  return (
    <g
      onMouseEnter={() => setHovered('zone')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={AN_HIT.x}
        y={AN_HIT.y}
        width={AN_HIT.w}
        height={AN_HIT.h}
        fill="currentColor"
        fillOpacity={active ? 0.06 : 0}
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={active ? 1.5 : 1}
        strokeDasharray="3 3"
        className={spotlight.className}
        style={spotlight.style}
      />
    </g>
  )
}

function GlowShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('glow')
  const active = useEngaged('glow')
  return (
    <g
      onMouseEnter={() => setHovered('glow')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <circle
        r={AN_GLOW_R}
        fill="currentColor"
        fillOpacity={active ? 0.12 : 0.04}
        stroke="currentColor"
        strokeWidth={active ? 1.5 : 1}
        strokeDasharray="2 2"
        className={spotlight.className}
        style={spotlight.style}
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
        r={AN_ORB_R}
        fill="currentColor"
        fillOpacity={active ? 0.9 : 0.7}
        className={spotlight.className}
        style={spotlight.style}
      />
    </g>
  )
}

function AnnotationsLayer() {
  const { hovered, pinned } = useAnatomy()
  const dimmed = (hovered ?? pinned) !== null
  return (
    <g
      style={{ pointerEvents: 'none', filter: dimmed ? 'url(#spotlight-blur)' : 'none' }}
      className={`transition-[opacity,filter] duration-(--motion-dur-base) ease-(--motion-ease-in-out) motion-reduce:transition-none motion-reduce:filter-none ${dimmed ? 'opacity-30' : 'opacity-100'}`}
    >
      <GripFrame x={-AN_ORB_R} y={-AN_ORB_R} w={AN_D} h={AN_D} />
      <MeasureH x1={-AN_ORB_R} x2={AN_ORB_R} y={-AN_GLOW_R - 8} label={`${Math.round(AN_D)}`} />
      <MeasureNote x={AN_HIT.x} y={AN_HIT.y - 8} anchor="start">
        {`${AN_REF_SIZE} × ${AN_REF_SIZE} hit area`}
      </MeasureNote>
    </g>
  )
}

export function GlowOrbAnatomy() {
  return (
    <AnatomyFrame viewBox="-114 -160 228 304" ariaLabel="Glow orb anatomy">
      <InteractionZoneShape />
      <GlowShape />
      <OrbShape />
      <AnnotationsLayer />
      <AnatomyCallout
        part="zone"
        label="Interaction zone"
        anchor={[0, AN_HIT.y]}
        side="top"
        distance={24}
        isAccent
        measure={`${AN_REF_SIZE} × ${AN_REF_SIZE} · size prop`}
        caption="Root div, or a button when onClick is set. Presses to 0.96."
      />
      <AnatomyCallout
        part="orb"
        label="Orb"
        anchor={[AN_ORB_ANCHOR_X, AN_ORB_ANCHOR_Y]}
        side="bottom"
        distance={AN_TAG_ROW_Y - AN_ORB_ANCHOR_Y}
        measure={`${Math.round(AN_D)} · 0.55 × size · WebGL`}
        caption="fbm-noise shader tinted per state, scaling with volume."
      />
      <AnatomyCallout
        part="glow"
        label="Glow"
        anchor={AN_GLOW_ANCHOR}
        side="bottom"
        distance={AN_TAG_ROW_Y - AN_GLOW_ANCHOR[1]}
        measure={`${Math.round(AN_D)} · blur 8 · scale 1.15`}
        caption="Soft surface-2 halo behind the orb that tracks the volume glow."
      />
    </AnatomyFrame>
  )
}

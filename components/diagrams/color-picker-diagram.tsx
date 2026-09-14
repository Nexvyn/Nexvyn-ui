'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset, licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root LICENSE.

import type { ReactNode } from 'react'
import {
  DraftSurface,
  DRAFT_FILL_SOLID,
  DRAFT_INK_MORPH,
  DRAFT_SCAFFOLD_FADE,
  draftTheme,
  MeasureH,
  MeasureV,
  MeasureNote,
  GripFrame,
  beat,
  DRAFT_BEAT,
  stampBeat,
} from '@/components/diagrams/lib/diagram-parts'
import {
  AnatomyCallout,
  AnatomyFrame,
  useAnatomy,
  useSpotlight,
} from '@/components/diagrams/lib/anatomy-parts'

const BP_SCALE = 0.6
const BP_CORE = 32
const BP_PETAL = 32
const BP_BAR_W = 12
const BP_BAR_GAP = 20
const BP_SLIDER_OFFSET = 30
const BP_ARC_HALF_SWEEP = 30
const BP_RING_REAL = [
  { count: 6, radius: 24, startDeg: -90 },
  { count: 12, radius: 38.4, startDeg: -60 },
] as const
const BP_BAR_R_REAL = BP_RING_REAL[1].radius + BP_PETAL / 2 + BP_BAR_GAP
const BP_ARC_R_REAL = BP_BAR_R_REAL + BP_SLIDER_OFFSET

const BP_CORE_R = (BP_CORE / 2) * BP_SCALE
const BP_PETAL_R = (BP_PETAL / 2) * BP_SCALE
const BP_BAR_R = BP_BAR_R_REAL * BP_SCALE
const BP_BAR_SW = BP_BAR_W * BP_SCALE
const BP_ARC_R = BP_ARC_R_REAL * BP_SCALE
const BP_BAR_OUTER = BP_BAR_R + BP_BAR_SW / 2
const BP_ARC_OUTER = BP_ARC_R + BP_BAR_SW / 2

const BP_LEGEND_W = 42
const BP_LEGEND_GAP = 8
const BP_TOTAL_W = BP_LEGEND_W + BP_LEGEND_GAP + BP_BAR_OUTER + BP_ARC_OUTER
const BP_CX = (220 - BP_TOTAL_W) / 2 + BP_LEGEND_W + BP_LEGEND_GAP + BP_BAR_OUTER
const BP_CY = 66
const BP_LEGEND_X = BP_CX - BP_BAR_OUTER - BP_LEGEND_GAP
const BP_LEGEND_STEP = 11

const BP_RING = BP_RING_REAL.map((ring) => ({ ...ring, radius: ring.radius * BP_SCALE }))

const BP_LEGEND = [
  `petal ${BP_PETAL}`,
  `rings ${BP_RING_REAL[0].count}/${BP_RING_REAL[1].count}`,
  `bar ${BP_BAR_W}`,
] as const

const round = (n: number) => Math.round(n * 1000) / 1000

function petalPos(ring: (typeof BP_RING)[number], i: number) {
  const a = ((ring.startDeg + (i * 360) / ring.count) * Math.PI) / 180
  return {
    cx: round(BP_CX + Math.cos(a) * ring.radius),
    cy: round(BP_CY + Math.sin(a) * ring.radius),
  }
}

function arcPoint(r: number, deg: number) {
  const a = (deg * Math.PI) / 180
  return { x: round(BP_CX + Math.cos(a) * r), y: round(BP_CY + Math.sin(a) * r) }
}

const ARC_START = arcPoint(BP_ARC_R, -BP_ARC_HALF_SWEEP)
const ARC_END = arcPoint(BP_ARC_R, BP_ARC_HALF_SWEEP)
const ARC_D = `M ${ARC_START.x} ${ARC_START.y} A ${BP_ARC_R} ${BP_ARC_R} 0 0 1 ${ARC_END.x} ${ARC_END.y}`
const ARC_HANDLE = arcPoint(BP_ARC_R, 0)
const ARC_GUIDE_HALF_SWEEP = BP_ARC_HALF_SWEEP * 2
const ARC_GUIDE_START = arcPoint(BP_ARC_R, -ARC_GUIDE_HALF_SWEEP)
const ARC_GUIDE_END = arcPoint(BP_ARC_R, ARC_GUIDE_HALF_SWEEP)
const ARC_GUIDE_D = `M ${ARC_GUIDE_START.x} ${ARC_GUIDE_START.y} A ${BP_ARC_R} ${BP_ARC_R} 0 0 1 ${ARC_GUIDE_END.x} ${ARC_GUIDE_END.y}`

const BLOOM_BASE =
  'transition-transform duration-(--motion-dur-slow) ease-(--motion-ease-out) scale-[0.35] group-hover:scale-100 group-focus-visible:scale-100 motion-reduce:transition-none motion-reduce:transform-none'

const BLOOM_RING = [
  `${BLOOM_BASE} group-hover:delay-(--motion-dur-fast) group-focus-visible:delay-(--motion-dur-fast)`,
  `${BLOOM_BASE} group-hover:delay-(--motion-dur-base) group-focus-visible:delay-(--motion-dur-base)`,
] as const

const PETAL_CLASS =
  'transition-opacity duration-(--motion-dur-slow) ease-(--motion-ease-out) opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none'

const BAR_REVEAL =
  'transition-[opacity,transform] duration-(--motion-dur-slow) ease-(--motion-ease-out) opacity-0 scale-[0.8] group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100 group-hover:delay-(--motion-dur-base) group-focus-visible:delay-(--motion-dur-base) motion-reduce:transition-none motion-reduce:transform-none'

const RING_ORDER = [1, 0] as const

export function ColorPickerWireframe() {
  const theme = draftTheme
  return (
    <DraftSurface>
      <defs>
        <linearGradient
          id="bp-color-picker-arc"
          gradientUnits="userSpaceOnUse"
          x1={ARC_START.x}
          y1={ARC_START.y}
          x2={ARC_END.x}
          y2={ARC_END.y}
        >
          <stop offset="0%" style={{ stopColor: 'var(--color-surface-2)' }} />
          <stop offset="100%" style={{ stopColor: 'var(--color-fg)' }} />
        </linearGradient>
      </defs>
      <circle
        cx={BP_CX}
        cy={BP_CY}
        r={BP_BAR_R}
        fill="none"
        stroke="currentColor"
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        style={beat(DRAFT_BEAT.outline)}
        className={`ink-draw ${DRAFT_INK_MORPH} opacity-60 group-hover:opacity-0 group-focus-visible:opacity-0`}
      />
      <path
        d={ARC_D}
        fill="none"
        stroke="currentColor"
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        style={beat(DRAFT_BEAT.anatomy)}
        className={`ink-draw ${DRAFT_INK_MORPH} opacity-60 group-hover:opacity-0 group-focus-visible:opacity-0`}
      />
      <g style={{ transformOrigin: `${BP_CX}px ${BP_CY}px` }} className={BAR_REVEAL}>
        <circle
          cx={BP_CX}
          cy={BP_CY}
          r={BP_BAR_R}
          fill="none"
          stroke="var(--bp-accent, var(--color-accent))"
          strokeWidth={BP_BAR_SW}
        />
        <path
          d={ARC_D}
          fill="none"
          stroke="url(#bp-color-picker-arc)"
          strokeWidth={BP_BAR_SW}
          strokeLinecap="round"
        />
        <circle
          cx={ARC_HANDLE.x}
          cy={ARC_HANDLE.y}
          r={BP_BAR_SW / 2}
          fill="currentColor"
          stroke="var(--color-bg)"
          strokeWidth={2 * BP_SCALE}
        />
      </g>
      {RING_ORDER.map((ri) => {
        const ring = BP_RING[ri]
        return (
          <g
            key={ri}
            style={{ transformOrigin: `${BP_CX}px ${BP_CY}px` }}
            className={BLOOM_RING[ri]}
          >
            {Array.from({ length: ring.count }).map((_, i) => {
              const p = petalPos(ring, i)
              const isSelected = ri === 0 && i === 0
              return (
                <circle
                  key={i}
                  cx={p.cx}
                  cy={p.cy}
                  r={BP_PETAL_R}
                  strokeWidth={1}
                  fill={
                    isSelected ? 'var(--bp-accent, var(--color-accent))' : 'var(--color-surface-2)'
                  }
                  stroke={isSelected ? 'var(--color-bg)' : 'var(--color-border)'}
                  style={{ transitionDelay: `${200 + ri * 80 + i * 20}ms` }}
                  className={PETAL_CLASS}
                />
              )
            })}
          </g>
        )
      })}
      <circle
        cx={BP_CX}
        cy={BP_CY}
        r={BP_CORE_R}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        style={beat(DRAFT_BEAT.outline)}
        className={`ink-draw ${DRAFT_FILL_SOLID}`}
      />
      <g className={DRAFT_SCAFFOLD_FADE}>
        {RING_ORDER.map((ri) =>
          Array.from({ length: BP_RING[ri].count }).map((_, i) => {
            const p = petalPos(BP_RING[ri], i)
            return (
              <circle
                key={`${ri}-${i}`}
                cx={p.cx}
                cy={p.cy}
                r={BP_PETAL_R}
                fill="none"
                stroke="currentColor"
                strokeWidth={theme.guide.strokeWidth}
                strokeDasharray="2 2"
                opacity={ri === 0 ? 0.45 : 0.25}
                style={beat(`${200 + ri * 100 + i * 25}ms`)}
                className="fade-note"
              />
            )
          }),
        )}
        <path
          d={ARC_GUIDE_D}
          fill="none"
          stroke="var(--bp-accent, var(--color-accent))"
          strokeWidth={theme.guide.strokeWidth}
          strokeDasharray="2 2"
          opacity={theme.guide.dimOpacity}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <g
          stroke="var(--bp-accent, var(--color-accent))"
          strokeWidth={theme.guide.strokeWidth}
          strokeDasharray="2 2"
          opacity={theme.guide.dimOpacity}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        >
          {Array.from({ length: BP_RING[0].count }).map((_, i) => {
            const p = petalPos(BP_RING[0], i)
            return <line key={i} x1={BP_CX} y1={BP_CY} x2={p.cx} y2={p.cy} />
          })}
        </g>
        <GripFrame
          x={BP_CX - BP_CORE_R}
          y={BP_CY - BP_CORE_R}
          w={BP_CORE_R * 2}
          h={BP_CORE_R * 2}
          style={beat(DRAFT_BEAT.handle)}
        />
        <MeasureH
          x1={BP_CX - BP_CORE_R}
          x2={BP_CX + BP_CORE_R}
          y={BP_CY + BP_BAR_OUTER + 13}
          label={`core ${BP_CORE}`}
          className="note-stamp"
          style={beat(stampBeat(0))}
        />
        {BP_LEGEND.map((label, i) => (
          <MeasureNote
            key={label}
            x={BP_LEGEND_X}
            y={BP_CY + (i - (BP_LEGEND.length - 1) / 2) * BP_LEGEND_STEP + 2.5}
            anchor="end"
            className="note-stamp"
            style={beat(stampBeat(i + 1))}
          >
            {label}
          </MeasureNote>
        ))}
      </g>
    </DraftSurface>
  )
}

const AN_CORE = 48
const AN_PETAL = 48
const AN_INNER = { count: 6, radius: 36, startDeg: -90 } as const
const AN_OUTER = { count: 12, radius: 57.6, startDeg: -60 } as const
const AN_BAR_R = AN_OUTER.radius + AN_PETAL / 2 + 20
const AN_BAR_W = 14
const AN_ARC_R = AN_BAR_R + 38
const AN_ARC_W = 14
const AN_ARC_HALF_SWEEP = 30
const AN_CONTAINER = (AN_ARC_R + AN_ARC_W / 2) * 2 + 4
const AN_BAR_OUTER = AN_BAR_R + AN_BAR_W / 2
const AN_TAG_LANE_X = -AN_BAR_OUTER - 24

function ringPoint(ring: { count: number; radius: number; startDeg: number }, i: number) {
  const a = ((ring.startDeg + (i * 360) / ring.count) * Math.PI) / 180
  return { cx: round(Math.cos(a) * ring.radius), cy: round(Math.sin(a) * ring.radius) }
}

function arcPath(r: number, halfSweep: number) {
  const a = (halfSweep * Math.PI) / 180
  const x = round(Math.cos(a) * r)
  const y = round(Math.sin(a) * r)
  return `M ${x} ${-y} A ${r} ${r} 0 0 1 ${x} ${y}`
}

const AN_INNER_LEFT = ringPoint(AN_INNER, 5)
const AN_BAR_ANCHOR_Y = 22
const AN_BAR_ANCHOR_X = round(-Math.sqrt(AN_BAR_OUTER ** 2 - AN_BAR_ANCHOR_Y ** 2))
const AN_OUTER_EDGE = AN_OUTER.radius + AN_PETAL / 2
const AN_BAR_INNER = AN_BAR_R - AN_BAR_W / 2

function PartGroup({ id, children }: { id: string; children: ReactNode }) {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight(id)
  return (
    <g
      onMouseEnter={() => setHovered(id)}
      onMouseLeave={() => setHovered(null)}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      {children}
    </g>
  )
}

function useEngaged(id: string) {
  const { hovered, pinned } = useAnatomy()
  return (hovered ?? pinned) === id
}

function CoreButtonShape() {
  const active = useEngaged('core')
  return (
    <PartGroup id="core">
      <circle
        r={AN_CORE / 2}
        stroke="currentColor"
        strokeWidth={active ? 2 : 1}
        className="fill-(--color-bg)"
      />
      <circle r={AN_CORE / 2} fill="currentColor" fillOpacity={active ? 0.3 : 0.15} stroke="none" />
    </PartGroup>
  )
}

function PetalRing({
  id,
  ring,
}: {
  id: string
  ring: { count: number; radius: number; startDeg: number }
}) {
  const active = useEngaged(id)
  return (
    <PartGroup id={id}>
      {Array.from({ length: ring.count }).map((_, i) => {
        const p = ringPoint(ring, i)
        return (
          <circle
            key={i}
            cx={p.cx}
            cy={p.cy}
            r={AN_PETAL / 2}
            stroke="currentColor"
            strokeWidth={active ? 1.5 : 0.75}
            fill="currentColor"
            fillOpacity={active ? 0.2 : 0.06}
          />
        )
      })}
    </PartGroup>
  )
}

function ColorBarShape() {
  const active = useEngaged('color-bar')
  return (
    <PartGroup id="color-bar">
      <circle
        r={AN_BAR_R}
        stroke="currentColor"
        strokeWidth={AN_BAR_W}
        strokeOpacity={active ? 0.3 : 0.12}
      />
    </PartGroup>
  )
}

function ArcSliderShape() {
  const active = useEngaged('arc-slider')
  return (
    <PartGroup id="arc-slider">
      <path
        d={arcPath(AN_ARC_R, AN_ARC_HALF_SWEEP)}
        stroke="currentColor"
        strokeWidth={AN_ARC_W}
        strokeLinecap="round"
        strokeOpacity={active ? 0.35 : 0.15}
      />
      <circle
        cx={AN_ARC_R}
        cy={0}
        r={AN_ARC_W / 2}
        fill="currentColor"
        fillOpacity={active ? 0.9 : 0.6}
      />
    </PartGroup>
  )
}

function AnnotationsLayer() {
  const { hovered, pinned } = useAnatomy()
  const isEngaged = (hovered ?? pinned) !== null
  const half = AN_CONTAINER / 2

  return (
    <g
      style={{
        pointerEvents: 'none',
        filter: isEngaged ? 'url(#spotlight-blur)' : 'none',
      }}
      className={`transition-[opacity,filter] duration-(--motion-dur-base) ease-(--motion-ease-in-out) motion-reduce:transition-none motion-reduce:filter-none ${isEngaged ? 'opacity-30' : 'opacity-100'}`}
    >
      <g
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={draftTheme.guide.strokeWidth}
        strokeDasharray="2 2"
        opacity={draftTheme.guide.structOpacity}
      >
        <line x1={AN_OUTER_EDGE} y1={0} x2={AN_BAR_INNER} y2={0} />
      </g>
      <MeasureNote x={(AN_OUTER_EDGE + AN_BAR_INNER) / 2} y={-6} anchor="middle">
        {`${Math.round(AN_BAR_INNER - AN_OUTER_EDGE)}`}
      </MeasureNote>
      <GripFrame x={-half} y={-half} w={AN_CONTAINER} h={AN_CONTAINER} />
      <MeasureH
        x1={-half}
        x2={half}
        y={158}
        label={`${Math.round(AN_CONTAINER)}`}
        labelYOffset={10}
      />
      <MeasureV x={half + 10} y1={-half} y2={half} label="" />
      <MeasureNote x={half + 15} y={-half / 2} anchor="start">
        {`${Math.round(AN_CONTAINER)}`}
      </MeasureNote>
    </g>
  )
}

function CalloutsLayer() {
  return (
    <>
      <AnatomyCallout
        part="outer-petals"
        label="Outer petals"
        anchor={[0, -AN_OUTER.radius - AN_PETAL / 2]}
        side="top"
        distance={40}
        measure="12 × 48 · r58"
        caption="Saturated hues, rotated 30° to nestle between inner petals."
      />
      <AnatomyCallout
        part="inner-petals"
        label="Inner petals"
        anchor={[AN_INNER_LEFT.cx - AN_PETAL / 2, AN_INNER_LEFT.cy]}
        side="start"
        distance={AN_INNER_LEFT.cx - AN_PETAL / 2 - AN_TAG_LANE_X}
        measure="6 × 48 · r36"
        caption="Light tints ring. Click a petal to select its color."
      />
      <AnatomyCallout
        part="color-bar"
        label="Color bar"
        anchor={[AN_BAR_ANCHOR_X, AN_BAR_ANCHOR_Y]}
        side="start"
        distance={round(AN_BAR_OUTER + 24 + AN_BAR_ANCHOR_X)}
        measure="r102 · 14 stroke"
        caption="Ring tinted with the selected color, sized by circularBarWidth."
      />
      <AnatomyCallout
        part="arc-slider"
        label="Arc slider"
        anchor={[AN_ARC_R + AN_ARC_W / 2, 0]}
        side="end"
        distance={20}
        measure="r140 · 60° sweep · 14"
        caption="Lightness slider. Drag the handle or use the arrow keys."
      />
      <AnatomyCallout
        part="core"
        label="Core button"
        anchor={[0, AN_CORE / 2]}
        side="bottom"
        distance={96}
        isAccent
        measure="48 × 48 · rounded-full"
        caption="Toggles the bloom open or closed and shows the current color."
      />
    </>
  )
}

export function ColorPickerBreakdown() {
  return (
    <AnatomyFrame viewBox="-237 -158 496 332" ariaLabel="Blossom color picker anatomy">
      <ColorBarShape />
      <ArcSliderShape />
      <PetalRing id="outer-petals" ring={AN_OUTER} />
      <PetalRing id="inner-petals" ring={AN_INNER} />
      <CoreButtonShape />
      <AnnotationsLayer />
      <CalloutsLayer />
    </AnatomyFrame>
  )
}

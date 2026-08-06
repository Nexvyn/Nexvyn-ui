'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset — licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root MIT LICENSE.

import {
  DraftSurface,
  DRAFT_FILL_SOLID,
  DRAFT_INK_MORPH,
  DRAFT_SCAFFOLD_FADE,
  draftTheme,
  MeasureH,
  MeasureNote,
  MeasureV,
  GripFrame,
  beat,
  DRAFT_BEAT,
  DRAFT_DETAIL_BEAT,
  DRAFT_LABEL_BEAT,
  DRAFT_LABEL_ALT_BEAT,
  stampBeat,
} from '@/components/diagrams/lib/parts'
import {
  AnatomyFrame,
  AnatomyTag,
  OverlayLine,
  useAnatomy,
  useSpotlight,
} from '@/components/diagrams/lib/anatomy-parts'

const BP_CX = 110
const BP_CY = 70
const BP_CORE_R = 14
const BP_RING = [
  { count: 6, radius: 22, petalR: 8, startDeg: -90 },
  { count: 12, radius: 38, petalR: 7, startDeg: -60 },
] as const
const BP_ARC_R = 52

function petalPos(ring: (typeof BP_RING)[number], i: number) {
  const a = ((ring.startDeg + (i * 360) / ring.count) * Math.PI) / 180
  return { cx: BP_CX + Math.cos(a) * ring.radius, cy: BP_CY + Math.sin(a) * ring.radius }
}

const BLOOM_BASE =
  'transition-transform duration-(--motion-dur-slow) ease-(--motion-ease-out) scale-[0.35] group-hover:scale-100 group-focus-visible:scale-100 motion-reduce:transition-none motion-reduce:scale-100'

const BLOOM_RING = [
  `${BLOOM_BASE} group-hover:delay-[200ms] group-focus-visible:delay-[200ms]`,
  `${BLOOM_BASE} group-hover:delay-[280ms] group-focus-visible:delay-[280ms]`,
] as const

const PETAL_CLASS =
  'transition-opacity duration-(--motion-dur-slow) ease-(--motion-ease-out) opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none'

export function ColorPickerWireframe() {
  const theme = draftTheme
  return (
    <DraftSurface>
      {BP_RING.map((ring, ri) => (
        <g key={ri} style={{ transformOrigin: `${BP_CX}px ${BP_CY}px` }} className={BLOOM_RING[ri]}>
          {Array.from({ length: ring.count }).map((_, i) => {
            const p = petalPos(ring, i)
            const isSelected = ri === 0 && i === 0
            return (
              <circle
                key={i}
                cx={p.cx}
                cy={p.cy}
                r={ring.petalR}
                strokeWidth={1}
                fill={
                  isSelected ? 'var(--bp-accent, var(--color-accent))' : 'var(--color-surface-2)'
                }
                stroke={isSelected ? 'transparent' : 'var(--color-border)'}
                style={{ transitionDelay: `${200 + ri * 80 + i * 20}ms` }}
                className={PETAL_CLASS}
              />
            )
          })}
        </g>
      ))}
      <g
        className={`${DRAFT_INK_MORPH} opacity-0 group-hover:opacity-80 group-focus-visible:opacity-80`}
      >
        <circle
          cx={BP_CX}
          cy={BP_CY}
          r={BP_ARC_R}
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeDasharray={`${BP_ARC_R * 2 * Math.PI * 0.6} ${BP_ARC_R * 2 * Math.PI}`}
          transform={`rotate(126 ${BP_CX} ${BP_CY})`}
          opacity={0.35}
        />
        <circle cx={BP_CX} cy={BP_CY - BP_ARC_R} r={3.5} fill="currentColor" />
      </g>
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
        {BP_RING.map((ring, ri) =>
          Array.from({ length: ring.count }).map((_, i) => {
            const p = petalPos(ring, i)
            return (
              <circle
                key={`${ri}-${i}`}
                cx={p.cx}
                cy={p.cy}
                r={ring.petalR}
                fill="none"
                stroke="currentColor"
                strokeWidth={theme.guide.strokeWidth}
                strokeDasharray="2 2"
                opacity={ri === 0 ? 0.45 : 0.3}
                style={beat(`${200 + ri * 100 + i * 25}ms`)}
                className="fade-note"
              />
            )
          }),
        )}
        <circle
          cx={BP_CX}
          cy={BP_CY}
          r={BP_ARC_R}
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
          y={BP_CY + BP_ARC_R + 12}
          label="core 40"
          className="note-stamp"
          style={beat(stampBeat(0))}
        />
        <MeasureNote
          x={BP_CX + BP_ARC_R + 8}
          y={BP_CY + 3}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(1))}
        >
          petal 28
        </MeasureNote>
      </g>
    </DraftSurface>
  )
}

function CoreButtonShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('core')

  return (
    <g
      onMouseEnter={() => setHovered('core')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <circle
        cx={120}
        cy={120}
        r={24}
        stroke="currentColor"
        strokeWidth={hovered === 'core' ? 2 : 1}
        fill="currentColor"
        fillOpacity={hovered === 'core' ? 0.3 : 0.15}
        className={spotlight.className}
      />
      <circle
        cx={120}
        cy={120}
        r={8}
        fill="currentColor"
        fillOpacity={hovered === 'core' ? 0.8 : 0.5}
        className={spotlight.className}
      />
    </g>
  )
}

function OuterPetalsShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('outer-petals')

  const petalCount = 8
  const radius = 65

  return (
    <g
      onMouseEnter={() => setHovered('outer-petals')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      {Array.from({ length: petalCount }).map((_, i) => {
        const angle = (i * 360) / petalCount
        const rad = (angle * Math.PI) / 180
        const x = 120 + Math.cos(rad) * radius
        const y = 120 + Math.sin(rad) * radius
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={12}
            stroke="currentColor"
            strokeWidth={hovered === 'outer-petals' ? 1.5 : 0.75}
            fill="currentColor"
            fillOpacity={hovered === 'outer-petals' ? 0.25 : 0.12}
            className={spotlight.className}
          />
        )
      })}
    </g>
  )
}

function InnerPetalsShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('inner-petals')

  const petalCount = 8
  const radius = 42

  return (
    <g
      onMouseEnter={() => setHovered('inner-petals')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      {Array.from({ length: petalCount }).map((_, i) => {
        const angle = (i * 360) / petalCount + 22.5
        const rad = (angle * Math.PI) / 180
        const x = 120 + Math.cos(rad) * radius
        const y = 120 + Math.sin(rad) * radius
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={8}
            stroke="currentColor"
            strokeWidth={hovered === 'inner-petals' ? 1.5 : 0.75}
            fill="currentColor"
            fillOpacity={hovered === 'inner-petals' ? 0.2 : 0.08}
            className={spotlight.className}
          />
        )
      })}
    </g>
  )
}

function ArcSliderShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('arc-slider')

  return (
    <g
      onMouseEnter={() => setHovered('arc-slider')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <circle
        cx={120}
        cy={120}
        r={90}
        stroke="currentColor"
        strokeWidth={hovered === 'arc-slider' ? 3 : 2}
        strokeDasharray={hovered === 'arc-slider' ? 'none' : '4 2'}
        fill="transparent"
        className={spotlight.className}
      />
      <circle
        cx={120}
        cy={30}
        r={6}
        fill="currentColor"
        fillOpacity={hovered === 'arc-slider' ? 0.8 : 0.5}
        className={spotlight.className}
      />
    </g>
  )
}

function AnnotationsLayer() {
  const { hovered } = useAnatomy()
  const isOthersHovered = hovered !== null

  return (
    <g
      style={{
        pointerEvents: 'none',
        filter: isOthersHovered ? 'url(#spotlight-blur)' : 'none',
      }}
      className={`transition-[opacity,filter] duration-(--motion-dur-base) ease-(--motion-ease-in-out) motion-reduce:transition-none motion-reduce:filter-none ${isOthersHovered ? 'opacity-30' : 'opacity-100'}`}
    >
      <g
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={draftTheme.guide.strokeWidth}
        strokeDasharray="2 2"
        opacity={draftTheme.guide.structOpacity}
      >
        <line x1={197} y1={120} x2={210} y2={120} />
      </g>
      <MeasureNote x={203} y={112} anchor="middle">
        13
      </MeasureNote>
      <GripFrame x={30} y={30} w={180} h={180} />
      <MeasureH x1={30} x2={210} y={20} label="180" />
      <MeasureV x={225} y1={30} y2={210} label="180" labelXOffset={5} labelAnchor="start" />
    </g>
  )
}

function LinesLayer() {
  return (
    <g strokeWidth="1" className="pointer-events-none">
      <OverlayLine id="core" x1={180} y1={184} x2={180} y2={263} />
      <OverlayLine id="outer-petals" x1={180} y1={95} x2={180} y2={55} />
      <OverlayLine id="inner-petals" x1={141} y1={144} x2={80} y2={144} />
      <OverlayLine id="arc-slider" x1={180} y1={70} x2={300} y2={70} />
    </g>
  )
}

function TagsLayer() {
  return (
    <>
      <foreignObject
        x={125}
        y={268}
        width={120}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part="core"
          label="Core Button"
          className="items-start justify-center"
          isAccent
        />
      </foreignObject>
      <foreignObject
        x={125}
        y={28}
        width={120}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="outer-petals" label="Outer Petals" className="items-end justify-center" />
      </foreignObject>
      <foreignObject
        x={-10}
        y={132}
        width={110}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="inner-petals" label="Inner Petals" className="items-center justify-end" />
      </foreignObject>
      <foreignObject
        x={300}
        y={56}
        width={110}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="arc-slider" label="Arc Slider" className="items-center justify-start" />
      </foreignObject>
    </>
  )
}

export function ColorPickerBreakdown() {
  return (
    <AnatomyFrame viewBox="-66 12 492 296" maxWidthClassName="max-w-[590px]">
      <g transform="translate(60, 40)">
        <OuterPetalsShape />
        <InnerPetalsShape />
        <ArcSliderShape />
        <CoreButtonShape />
        <AnnotationsLayer />
      </g>

      <LinesLayer />
      <TagsLayer />
    </AnatomyFrame>
  )
}

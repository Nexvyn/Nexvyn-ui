'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset, licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root LICENSE.

import type { CSSProperties } from 'react'
import {
  AnatomyFrame,
  AnatomyCallout,
  useAnatomy,
  useSpotlight,
} from '@/components/diagrams/lib/anatomy-parts'
import {
  DraftSurface,
  DRAFT_FILL_SOLID,
  DRAFT_SCAFFOLD_FADE,
  draftTheme,
  MeasureH,
  MeasureNote,
  MeasureV,
  GripFrame,
  beat,
  DRAFT_BEAT,
  stampBeat,
} from '@/components/diagrams/lib/diagram-parts'

const REF_SIZE = 100
const BAR = {
  count: 5,
  w: REF_SIZE * 0.055,
  gap: REF_SIZE * 0.035,
  r: REF_SIZE * 0.03,
  maxH: REF_SIZE * 0.55,
  minH: REF_SIZE * 0.06,
} as const

const HEIGHT_FACTORS = [0.3, 0.55, 1, 0.55, 0.3] as const

function barHeights() {
  const range = BAR.maxH - BAR.minH
  return HEIGHT_FACTORS.map((f) => BAR.minH + range * f)
}

const BLOCK_W = BAR.count * BAR.w + (BAR.count - 1) * BAR.gap

function barXs(leftEdge: number) {
  return Array.from({ length: BAR.count }, (_, i) => leftEdge + i * (BAR.w + BAR.gap))
}

const BP_SIZE = 160
const BP_BAR = {
  w: BP_SIZE * 0.055,
  gap: BP_SIZE * 0.035,
  r: BP_SIZE * 0.03,
  maxH: BP_SIZE * 0.55,
  minH: BP_SIZE * 0.06,
  hoverBoost: BP_SIZE * 0.08,
} as const

const BP_BLOCK_W = BAR.count * BP_BAR.w + (BAR.count - 1) * BP_BAR.gap
const BP_CENTER_X = 110
const BP_CENTER_Y = 72
const BP_LEFT = BP_CENTER_X - BP_BLOCK_W / 2
const BP_RIGHT = BP_LEFT + BP_BLOCK_W
const BP_TOP = BP_CENTER_Y - BP_BAR.maxH / 2
const BP_BOTTOM = BP_CENTER_Y + BP_BAR.maxH / 2
const BP_XS = Array.from({ length: BAR.count }, (_, i) => BP_LEFT + i * (BP_BAR.w + BP_BAR.gap))
const BP_HEIGHTS = HEIGHT_FACTORS.map((f) => BP_BAR.minH + (BP_BAR.maxH - BP_BAR.minH) * f)
const BP_BOOST = BP_HEIGHTS.map((h) => Math.min(h + BP_BAR.hoverBoost, BP_BAR.maxH) / h)
const BP_GAP_X1 = BP_XS[1] + BP_BAR.w
const BP_GAP_X2 = BP_XS[2]
const fmt = (n: number) => `${Number(n.toFixed(1))}`

const BP_BAR_GROW =
  'scale-y-100 transition-transform duration-(--motion-dur-slow) ease-(--motion-ease-in-out) group-hover:scale-y-(--bp-boost) group-hover:delay-(--motion-dur-base) group-focus-visible:scale-y-(--bp-boost) group-focus-visible:delay-(--motion-dur-base) motion-reduce:transition-none motion-reduce:transform-none'

export function BarsThemeBlueprint() {
  const theme = draftTheme
  return (
    <DraftSurface>
      {BP_XS.map((x, i) => {
        const h = BP_HEIGHTS[i]
        return (
          <g
            key={i}
            style={
              {
                transformOrigin: `${x + BP_BAR.w / 2}px ${BP_CENTER_Y}px`,
                '--bp-boost': BP_BOOST[i],
              } as CSSProperties
            }
            className={BP_BAR_GROW}
          >
            <rect
              x={x}
              y={BP_CENTER_Y - h / 2}
              width={BP_BAR.w}
              height={h}
              rx={Math.min(BP_BAR.r, BP_BAR.w / 2)}
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1}
              strokeWidth={theme.wireframe.strokeWidth}
              strokeOpacity={theme.wireframe.strokeOpacity}
              style={beat(`${200 + i * 60}ms`)}
              className={`ink-draw ${DRAFT_FILL_SOLID}`}
            />
          </g>
        )
      })}
      <g className={DRAFT_SCAFFOLD_FADE}>
        <GripFrame
          x={BP_LEFT}
          y={BP_TOP}
          w={BP_BLOCK_W}
          h={BP_BAR.maxH}
          style={beat(DRAFT_BEAT.handle)}
        />
        <MeasureH
          x1={BP_XS[2]}
          x2={BP_XS[2] + BP_BAR.w}
          y={BP_TOP - 10}
          label={fmt(BP_BAR.w)}
          className="note-stamp"
          style={beat(stampBeat(0))}
        />
        <MeasureV
          x={BP_LEFT - 12}
          y1={BP_TOP}
          y2={BP_BOTTOM}
          label={fmt(BP_BAR.maxH)}
          className="note-stamp"
          style={beat(stampBeat(1))}
        />
        <MeasureNote
          x={BP_RIGHT + 8}
          y={BP_TOP + 4}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(2))}
        >
          {`r${fmt(BP_BAR.r)}`}
        </MeasureNote>
        <g
          stroke="var(--bp-accent, var(--color-accent))"
          strokeWidth={theme.guide.strokeWidth}
          strokeDasharray="2 2"
          opacity={theme.guide.structOpacity}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        >
          <line x1={BP_GAP_X1} y1={BP_BOTTOM + 5} x2={BP_GAP_X1} y2={BP_BOTTOM + 11} />
          <line x1={BP_GAP_X2} y1={BP_BOTTOM + 5} x2={BP_GAP_X2} y2={BP_BOTTOM + 11} />
          <line x1={BP_GAP_X1} y1={BP_BOTTOM + 8} x2={BP_GAP_X2} y2={BP_BOTTOM + 8} />
        </g>
        <MeasureNote
          x={(BP_GAP_X1 + BP_GAP_X2) / 2}
          y={BP_BOTTOM + 18}
          className="note-stamp"
          style={beat(stampBeat(3))}
        >
          {fmt(BP_BAR.gap)}
        </MeasureNote>
        <MeasureNote
          x={BP_RIGHT + 8}
          y={BP_BOTTOM + 18}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(4))}
        >
          {`size ${BP_SIZE}`}
        </MeasureNote>
      </g>
    </DraftSurface>
  )
}

const AN_CENTER_X = 130
const AN_CENTER_Y = 90
const AN_LEFT = AN_CENTER_X - BLOCK_W / 2
const AN_XS = barXs(AN_LEFT)
const AN_HEIGHTS = barHeights()

const HIT = {
  x: AN_CENTER_X - REF_SIZE / 2,
  y: AN_CENTER_Y - REF_SIZE / 2,
  w: REF_SIZE,
  h: REF_SIZE,
}

const TALLEST_I = 2
const TALLEST_TOP = AN_CENTER_Y - AN_HEIGHTS[TALLEST_I] / 2
const TALLEST_BOTTOM = AN_CENTER_Y + AN_HEIGHTS[TALLEST_I] / 2
const TALLEST_MID_X = AN_XS[TALLEST_I] + BAR.w / 2

function ContainerShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('container', { isInteraction: true })
  return (
    <g
      onMouseEnter={() => setHovered('container')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={HIT.x}
        y={HIT.y}
        width={HIT.w}
        height={HIT.h}
        fill="none"
        stroke="currentColor"
        strokeDasharray="3 3"
        className={spotlight.className}
        style={spotlight.style}
      />
    </g>
  )
}

function BarsShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('bar')
  return (
    <g
      onMouseEnter={() => setHovered('bar')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      {AN_XS.map((x, i) => {
        const h = AN_HEIGHTS[i]
        const y = AN_CENTER_Y - h / 2
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={BAR.w}
            height={h}
            rx={BAR.r}
            fill="currentColor"
            fillOpacity={0.9}
            className={spotlight.className}
            style={spotlight.style}
          />
        )
      })}
    </g>
  )
}

function AnnotationsLayer() {
  const { hovered } = useAnatomy()
  const dimmed = hovered !== null
  return (
    <g
      style={{ pointerEvents: 'none', filter: dimmed ? 'url(#spotlight-blur)' : 'none' }}
      className={`transition-[opacity,filter] duration-(--motion-dur-base) ease-(--motion-ease-in-out) motion-reduce:transition-none motion-reduce:filter-none ${dimmed ? 'opacity-30' : 'opacity-100'}`}
    >
      <GripFrame
        x={AN_XS[0]}
        y={TALLEST_TOP}
        w={AN_XS[AN_XS.length - 1] + BAR.w - AN_XS[0]}
        h={AN_HEIGHTS[TALLEST_I]}
      />
      <MeasureH
        x1={AN_XS[TALLEST_I]}
        x2={AN_XS[TALLEST_I] + BAR.w}
        y={TALLEST_TOP - 14}
        label={`${BAR.w.toFixed(1)}`}
      />
      <MeasureV
        x={AN_XS[0] - 12}
        y1={TALLEST_TOP}
        y2={TALLEST_BOTTOM}
        label={`${BAR.maxH.toFixed(0)}`}
      />
      <MeasureNote x={AN_XS[0]} y={TALLEST_BOTTOM + 14} anchor="start">
        {`r${BAR.r.toFixed(1)} · min ${BAR.minH.toFixed(1)} · size=100 ref`}
      </MeasureNote>
      <g
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={draftTheme.guide.strokeWidth}
        strokeDasharray="2 2"
        opacity={draftTheme.guide.structOpacity}
      >
        <line
          x1={AN_XS[1] + BAR.w}
          y1={AN_CENTER_Y - 4}
          x2={AN_XS[1] + BAR.w}
          y2={AN_CENTER_Y + 4}
        />
        <line x1={AN_XS[2]} y1={AN_CENTER_Y - 4} x2={AN_XS[2]} y2={AN_CENTER_Y + 4} />
        <line x1={AN_XS[1] + BAR.w} y1={AN_CENTER_Y} x2={AN_XS[2]} y2={AN_CENTER_Y} />
      </g>
      <MeasureNote x={(AN_XS[1] + BAR.w + AN_XS[2]) / 2} y={AN_CENTER_Y - 8} anchor="middle">
        {`${BAR.gap.toFixed(1)}`}
      </MeasureNote>
    </g>
  )
}

export function BarsThemeAnatomy() {
  return (
    <AnatomyFrame viewBox="55 -32 150 244" ariaLabel="Bars Theme anatomy: container, bars">
      <ContainerShape />
      <BarsShape />
      <AnnotationsLayer />
      <AnatomyCallout
        part="container"
        label="Interaction zone"
        anchor={[AN_CENTER_X, HIT.y]}
        side="top"
        distance={34}
        isAccent
        measure={`${REF_SIZE} ref, 5 bars`}
        caption="Interactive area, responds to hover with diamond boost"
      />
      <AnatomyCallout
        part="bar"
        label="Bar"
        anchor={[TALLEST_MID_X, TALLEST_BOTTOM]}
        side="bottom"
        distance={56}
        measure={`${BAR.w.toFixed(1)} w, ${BAR.minH.toFixed(1)}–${BAR.maxH.toFixed(1)} h`}
        caption="Traveling-wave bar with phase-shifted animation"
      />
    </AnatomyFrame>
  )
}

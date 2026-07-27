'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset — licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root MIT LICENSE.

import {
  AnatomyFrame,
  AnatomyTag,
  OverlayLine,
  useAnatomy,
  useSpotlight,
} from '@/components/diagrams/lib/anatomy-parts'
import {
  Blueprint,
  BP_FILL_SOLID,
  BP_HIDE_ON_MORPH,
  BP_TEXT_SOFT,
  blueprintTheme,
  DimH,
  DimLabel,
  DimV,
  Selection,
} from '@/components/diagrams/lib/parts'

const REF_SIZE = 100
const BAR = {
  count: 5,
  w: REF_SIZE * 0.055,
  gap: REF_SIZE * 0.035,
  r: REF_SIZE * 0.03,
  maxH: REF_SIZE * 0.55,
  minH: REF_SIZE * 0.06,
} as const

const HEIGHT_FACTORS = [0.3, 0.55, 0.85, 0.55, 0.3] as const

function barHeights() {
  const range = BAR.maxH - BAR.minH
  return HEIGHT_FACTORS.map((f) => BAR.minH + range * f)
}

const BLOCK_W = BAR.count * BAR.w + (BAR.count - 1) * BAR.gap

function barXs(leftEdge: number) {
  return Array.from({ length: BAR.count }, (_, i) => leftEdge + i * (BAR.w + BAR.gap))
}

const BP_CENTER_X = 110
const BP_CENTER_Y = 70
const BP_LEFT = BP_CENTER_X - BLOCK_W / 2
const BP_XS = barXs(BP_LEFT)
const BP_HEIGHTS = barHeights()

export function BarsThemeBlueprint() {
  const theme = blueprintTheme
  return (
    <Blueprint>
      <g>
        {BP_XS.map((x, i) => {
          const h = BP_HEIGHTS[i]
          const y = BP_CENTER_Y - h / 2
          return (
            <g
              key={i}
              style={{ transformOrigin: `${x + BAR.w / 2}px ${BP_CENTER_Y}px` }}
              className="transition-transform duration-(--motion-dur-fast) ease-(--motion-ease-out) group-hover:scale-y-[1.15] group-focus-visible:scale-y-[1.15] motion-reduce:transition-none motion-reduce:transform-none"
            >
              <rect
                x={x}
                y={y}
                width={BAR.w}
                height={h}
                rx={BAR.r}
                strokeWidth={theme.wireframe.strokeWidth}
                strokeOpacity={theme.wireframe.strokeOpacity}
                className={BP_FILL_SOLID}
              />
            </g>
          )
        })}
      </g>
      <text
        x={BP_CENTER_X}
        y={BP_CENTER_Y + BAR.maxH / 2 + 36}
        textAnchor="middle"
        fontSize={11}
        fontWeight={500}
        fontFamily="var(--font-sans)"
        className={BP_TEXT_SOFT}
      >
        listening
      </text>
      <g className={BP_HIDE_ON_MORPH}>
        <Selection x={BP_LEFT} y={BP_CENTER_Y - BAR.maxH / 2} w={BLOCK_W} h={BAR.maxH} />
        <DimH
          x1={BP_XS[2]}
          x2={BP_XS[2] + BAR.w}
          y={BP_CENTER_Y - BAR.maxH / 2 - 14}
          label={`${BAR.w.toFixed(1)}`}
        />
        <DimV
          x={BP_LEFT - 12}
          y1={BP_CENTER_Y - BAR.maxH / 2}
          y2={BP_CENTER_Y + BAR.maxH / 2}
          label={`${BAR.maxH.toFixed(0)}`}
        />
        <DimLabel x={BP_LEFT} y={BP_CENTER_Y - BAR.maxH / 2 - 4} anchor="start">
          {`r${BAR.r.toFixed(1)}`}
        </DimLabel>
        <g
          stroke="var(--bp-accent, var(--color-accent))"
          strokeWidth={theme.guide.strokeWidth}
          strokeDasharray="2 2"
          opacity={theme.guide.structOpacity}
        >
          <line
            x1={BP_XS[1] + BAR.w}
            y1={BP_CENTER_Y + BAR.maxH / 2 + 6}
            x2={BP_XS[1] + BAR.w}
            y2={BP_CENTER_Y + BAR.maxH / 2 + 11}
          />
          <line
            x1={BP_XS[2]}
            y1={BP_CENTER_Y + BAR.maxH / 2 + 6}
            x2={BP_XS[2]}
            y2={BP_CENTER_Y + BAR.maxH / 2 + 11}
          />
          <line
            x1={BP_XS[1] + BAR.w}
            y1={BP_CENTER_Y + BAR.maxH / 2 + 8.5}
            x2={BP_XS[2]}
            y2={BP_CENTER_Y + BAR.maxH / 2 + 8.5}
          />
        </g>
        <DimLabel
          x={(BP_XS[1] + BAR.w + BP_XS[2]) / 2}
          y={BP_CENTER_Y + BAR.maxH / 2 + 20}
          anchor="middle"
        >
          {`${BAR.gap.toFixed(1)}`}
        </DimLabel>
      </g>
    </Blueprint>
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
      <Selection
        x={AN_XS[0]}
        y={TALLEST_TOP}
        w={AN_XS[AN_XS.length - 1] + BAR.w - AN_XS[0]}
        h={AN_HEIGHTS[TALLEST_I]}
      />
      <DimH
        x1={AN_XS[TALLEST_I]}
        x2={AN_XS[TALLEST_I] + BAR.w}
        y={TALLEST_TOP - 14}
        label={`${BAR.w.toFixed(1)}`}
      />
      <DimV
        x={AN_XS[0] - 12}
        y1={TALLEST_TOP}
        y2={TALLEST_BOTTOM}
        label={`${BAR.maxH.toFixed(0)}`}
      />
      <DimLabel x={AN_XS[0]} y={TALLEST_BOTTOM + 14} anchor="start">
        {`r${BAR.r.toFixed(1)} · min ${BAR.minH.toFixed(1)}`}
      </DimLabel>
      <g
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={blueprintTheme.guide.strokeWidth}
        strokeDasharray="2 2"
        opacity={blueprintTheme.guide.structOpacity}
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
      <DimLabel x={(AN_XS[1] + BAR.w + AN_XS[2]) / 2} y={AN_CENTER_Y - 8} anchor="middle">
        {`${BAR.gap.toFixed(1)}`}
      </DimLabel>
    </g>
  )
}

function OverlayLines() {
  return (
    <g strokeWidth="1" className="pointer-events-none">
      <OverlayLine id="container" x1={AN_CENTER_X} y1={HIT.y} x2={AN_CENTER_X} y2={HIT.y - 34} />
      <OverlayLine
        id="bar"
        x1={TALLEST_MID_X}
        y1={TALLEST_BOTTOM}
        x2={TALLEST_MID_X}
        y2={HIT.y + HIT.h + 34}
      />
    </g>
  )
}

function Tags() {
  return (
    <>
      <foreignObject
        x={AN_CENTER_X - 55}
        y={HIT.y - 34 - 24}
        width={110}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part="container"
          label="Interaction zone"
          className="items-end justify-center"
          isAccent
        />
      </foreignObject>
      <foreignObject
        x={TALLEST_MID_X - 35}
        y={HIT.y + HIT.h + 34}
        width={70}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="bar" label="Bar" className="items-start justify-center" />
      </foreignObject>
    </>
  )
}

export function BarsThemeAnatomy() {
  return (
    <AnatomyFrame viewBox="55 -32 150 244" maxWidthClassName="max-w-[200px]">
      <ContainerShape />
      <BarsShape />
      <AnnotationsLayer />
      <OverlayLines />
      <Tags />
    </AnatomyFrame>
  )
}

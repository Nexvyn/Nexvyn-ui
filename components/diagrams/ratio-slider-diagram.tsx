'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset — licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root MIT LICENSE.

import {
  Blueprint,
  BP_FILL_MUTED,
  BP_FILL_SOLID,
  BP_HIDE_ON_MORPH,
  BP_MORPH,
  blueprintTheme,
  DimH,
  DimLabel,
  DimV,
  Selection,
} from '@/components/diagrams/lib/parts'
import {
  AnatomyFrame,
  AnatomyTag,
  OverlayLine,
  useAnatomy,
  useSpotlight,
} from '@/components/diagrams/lib/anatomy-parts'

const BP = {
  x: 24,
  y: 58,
  w: 172,
  h: 36,
  rx: 6,
  gap: 8,
  divW: 6,
  divH: 28,
  leftPct: 0.6,
} as const

const BP_LEFT_W = Math.round((BP.w - BP.gap - BP.divW) * BP.leftPct)
const BP_RIGHT_W = BP.w - BP.gap - BP.divW - BP_LEFT_W
const BP_DIV_X = BP.x + BP_LEFT_W + BP.gap / 2
const BP_RIGHT_X = BP.x + BP_LEFT_W + BP.gap + BP.divW

export function RatioSliderWireframe() {
  const theme = blueprintTheme
  const midY = BP.y + BP.h / 2

  return (
    <Blueprint>
      <rect
        x={BP.x}
        y={BP.y}
        width={BP_LEFT_W}
        height={BP.h}
        rx={BP.rx}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        className={BP_FILL_SOLID}
      />
      
      <text
        x={BP.x + 12}
        y={midY + 4}
        fontSize={9}
        fontWeight={500}
        fontFamily="var(--font-sans)"
        className={`${BP_MORPH} fill-current opacity-35 group-hover:fill-background group-hover:opacity-100 group-focus-visible:fill-background group-focus-visible:opacity-100`}
      >
        RICH <tspan fontWeight={700}>60%</tspan>
      </text>
      <g
        style={{ transformOrigin: `${BP_DIV_X + BP.divW / 2}px ${midY}px` }}
        className="transition-transform duration-(--motion-dur-fast) ease-(--motion-ease-out) group-hover:scale-y-[1.15] group-focus-visible:scale-y-[1.15] motion-reduce:transition-none motion-reduce:transform-none"
      >
        <rect
          x={BP_DIV_X}
          y={midY - BP.divH / 2}
          width={BP.divW}
          height={BP.divH}
          rx={3}
          stroke="var(--color-fg)"
          strokeWidth={1.5}
          className={`${BP_MORPH} fill-transparent group-hover:fill-(--color-accent) group-focus-visible:fill-(--color-accent)`}
        />
      </g>
      <rect
        x={BP_RIGHT_X}
        y={BP.y}
        width={BP_RIGHT_W}
        height={BP.h}
        rx={BP.rx}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        className={`${BP_FILL_MUTED} stroke-current`}
      />
      <text
        x={BP_RIGHT_X + BP_RIGHT_W - 12}
        y={midY + 4}
        textAnchor="end"
        fontSize={9}
        fontWeight={500}
        fontFamily="var(--font-sans)"
        className={`${BP_MORPH} fill-current opacity-35 group-hover:opacity-100 group-focus-visible:opacity-100`}
      >
        <tspan fontWeight={700}>40%</tspan> LIGHT
      </text>

      <g className={BP_HIDE_ON_MORPH}>
        <Selection x={BP.x} y={BP.y} w={BP.w} h={BP.h} />
        <DimH x1={BP.x} x2={BP.x + BP.w} y={BP.y + BP.h + 14} label={`${BP.w}`} />
        <DimV x={BP.x - 12} y1={BP.y} y2={BP.y + BP.h} label={`${BP.h}`} labelXOffset={-6} />
        <DimLabel x={BP_DIV_X + BP.divW / 2} y={BP.y - 6}>
          {`${BP.divW}`}
        </DimLabel>
        <DimLabel x={BP.x} y={BP.y - 6} anchor="start">
          {`r${BP.rx}`}
        </DimLabel>
        <g
          stroke="var(--bp-accent, var(--color-accent))"
          strokeWidth={theme.guide.strokeWidth}
          strokeDasharray="2 2"
          opacity={theme.guide.structOpacity}
        >
          <line
            x1={BP.x + BP_LEFT_W}
            y1={BP.y + BP.h + 16}
            x2={BP.x + BP_LEFT_W}
            y2={BP.y + BP.h + 21}
          />
          <line x1={BP_RIGHT_X} y1={BP.y + BP.h + 16} x2={BP_RIGHT_X} y2={BP.y + BP.h + 21} />
          <line
            x1={BP.x + BP_LEFT_W}
            y1={BP.y + BP.h + 18.5}
            x2={BP_RIGHT_X}
            y2={BP.y + BP.h + 18.5}
          />
        </g>
        <DimLabel x={BP.x + BP_LEFT_W + BP.gap / 2} y={BP.y + BP.h + 30} anchor="middle">
          gap 8
        </DimLabel>
        
        <g
          stroke="var(--bp-accent, var(--color-accent))"
          strokeWidth={theme.guide.strokeWidth}
          strokeDasharray="2 2"
          opacity={theme.guide.structOpacity}
        >
          <line x1={BP.x} y1={BP.y + 8} x2={BP.x + 12} y2={BP.y + 8} />
          <line x1={BP_RIGHT_X + BP_RIGHT_W - 12} y1={BP.y + 8} x2={BP_RIGHT_X + BP_RIGHT_W} y2={BP.y + 8} />
        </g>
        <DimLabel x={BP.x + 6} y={BP.y + 8 - 3} anchor="middle">
          12
        </DimLabel>
        <DimLabel x={BP_RIGHT_X + BP_RIGHT_W - 6} y={BP.y + 8 - 3} anchor="middle">
          12
        </DimLabel>
      </g>
    </Blueprint>
  )
}

const AN = {
  x: 80,
  y: 70,
  w: 280,
  h: 48,
  rx: 6,
  gap: 8,
  divW: 6,
  divH: 38,
  leftPct: 0.6,
} as const

const AN_LEFT_W = Math.round((AN.w - AN.gap - AN.divW) * AN.leftPct)
const AN_RIGHT_W = AN.w - AN.gap - AN.divW - AN_LEFT_W
const AN_DIV_X = AN.x + AN_LEFT_W + AN.gap / 2
const AN_RIGHT_X = AN.x + AN_LEFT_W + AN.gap + AN.divW
const AN_MID_Y = AN.y + AN.h / 2

function LeftBarShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight(['left-bar', 'left-label'])
  const active = hovered === 'left-bar' || hovered === 'left-label'

  return (
    <g
      onMouseEnter={() => setHovered('left-bar')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect
        x={AN.x}
        y={AN.y}
        width={AN_LEFT_W}
        height={AN.h}
        rx={AN.rx}
        fill="currentColor"
        fillOpacity={active ? 0.95 : 0.88}
        className={spotlight.className}
      />
      <text
        x={AN.x + 12}
        y={AN_MID_Y + 4}
        fontSize={12}
        fontWeight={500}
        fontFamily="var(--font-sans)"
        className={`fill-background pointer-events-none ${spotlight.className}`}
      >
        RICH <tspan fontWeight={700}>60%</tspan>
      </text>
    </g>
  )
}

function RightBarShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight(['right-bar', 'right-label'])
  const active = hovered === 'right-bar' || hovered === 'right-label'

  return (
    <g
      onMouseEnter={() => setHovered('right-bar')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect
        x={AN_RIGHT_X}
        y={AN.y}
        width={AN_RIGHT_W}
        height={AN.h}
        rx={AN.rx}
        fill="currentColor"
        fillOpacity={active ? 0.35 : 0.22}
        className={spotlight.className}
      />
      <text
        x={AN_RIGHT_X + AN_RIGHT_W - 12}
        y={AN_MID_Y + 4}
        textAnchor="end"
        fontSize={12}
        fontWeight={500}
        fontFamily="var(--font-sans)"
        className={`fill-current pointer-events-none ${spotlight.className}`}
      >
        <tspan fontWeight={700}>40%</tspan> LIGHT
      </text>
    </g>
  )
}

function DividerShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('divider')
  const scale = hovered === 'divider' ? 1.15 : 1

  return (
    <g
      onMouseEnter={() => setHovered('divider')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{
        pointerEvents: 'all',
        filter: spotlight.style.filter,
        transformOrigin: `${AN_DIV_X + AN.divW / 2}px ${AN_MID_Y}px`,
        transform: `scaleY(${scale})`,
        transition: 'transform 150ms ease-out',
      }}
    >
      <rect
        x={AN_DIV_X - 10}
        y={AN.y - 4}
        width={AN.divW + 20}
        height={AN.h + 8}
        fill="transparent"
      />
      <rect
        x={AN_DIV_X}
        y={AN_MID_Y - AN.divH / 2}
        width={AN.divW}
        height={AN.divH}
        rx={3}
        fill="var(--color-accent)"
        stroke="var(--color-fg)"
        strokeWidth={1.5}
        className={spotlight.className}
      />
    </g>
  )
}

function GapShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('gap')
  const fillOpacity = hovered === 'gap' ? 0.22 : 0.12

  return (
    <g
      onMouseEnter={() => setHovered('gap')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect
        x={AN.x + AN_LEFT_W}
        y={AN.y}
        width={AN.gap / 2 + 1}
        height={AN.h}
        fill="currentColor"
        fillOpacity={fillOpacity}
        className={spotlight.className}
      />
      <rect
        x={AN_DIV_X + AN.divW}
        y={AN.y}
        width={AN.gap / 2 + 1}
        height={AN.h}
        fill="currentColor"
        fillOpacity={fillOpacity}
        className={spotlight.className}
      />
    </g>
  )
}

function AnnotationsLayer() {
  const { hovered } = useAnatomy()
  const dimmed = hovered !== null

  return (
    <g
      style={{
        pointerEvents: 'none',
        filter: dimmed ? 'url(#spotlight-blur)' : 'none',
      }}
      className={`transition-all duration-200 ease-out ${dimmed ? 'opacity-30' : 'opacity-100'}`}
    >
      <Selection x={AN.x} y={AN.y} w={AN.w} h={AN.h} />
      <DimH x1={AN.x} x2={AN.x + AN.w} y={AN.y - 14} label={`${AN.w}`} />
      <DimV
        x={AN.x + AN.w + 14}
        y1={AN.y}
        y2={AN.y + AN.h}
        label={`${AN.h}`}
        labelXOffset={5}
        labelAnchor="start"
      />
      <DimLabel x={AN.x} y={AN.y - 4} anchor="start">
        {`r${AN.rx}`}
      </DimLabel>
      
      <g
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={blueprintTheme.guide.strokeWidth}
        strokeDasharray="2 2"
        opacity={blueprintTheme.guide.structOpacity}
      >
        <line
          x1={AN.x + AN_LEFT_W}
          y1={AN.y + AN.h + 4}
          x2={AN.x + AN_LEFT_W}
          y2={AN.y + AN.h + 10}
        />
        <line x1={AN_RIGHT_X} y1={AN.y + AN.h + 4} x2={AN_RIGHT_X} y2={AN.y + AN.h + 10} />
        <line x1={AN.x + AN_LEFT_W} y1={AN.y + AN.h + 7} x2={AN_RIGHT_X} y2={AN.y + AN.h + 7} />
      </g>
      <DimLabel x={AN.x + AN_LEFT_W + AN.gap / 2} y={AN.y + AN.h + 20} anchor="middle">
        gap 8
      </DimLabel>
      <DimLabel x={AN_DIV_X + AN.divW / 2} y={AN.y - 12} anchor="middle">
        handle 6
      </DimLabel>
      
      <g
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={blueprintTheme.guide.strokeWidth}
        strokeDasharray="2 2"
        opacity={blueprintTheme.guide.structOpacity}
      >
        <line x1={AN.x} y1={AN.y + 12} x2={AN.x + 12} y2={AN.y + 12} />
        <line
          x1={AN_RIGHT_X + AN_RIGHT_W - 12}
          y1={AN.y + 12}
          x2={AN_RIGHT_X + AN_RIGHT_W}
          y2={AN.y + 12}
        />
      </g>
      <DimLabel x={AN.x + 6} y={AN.y + 12 - 4} anchor="middle">
        12
      </DimLabel>
      <DimLabel x={AN_RIGHT_X + AN_RIGHT_W - 6} y={AN.y + 12 - 4} anchor="middle">
        12
      </DimLabel>
    </g>
  )
}

function LinesLayer() {
  return (
    <g strokeWidth="1" className="pointer-events-none">
      <OverlayLine id="left-bar" x1={40} y1={AN_MID_Y} x2={AN.x} y2={AN_MID_Y} />
      <OverlayLine
        id="divider"
        x1={AN_DIV_X + AN.divW / 2}
        y1={AN.y + AN.h + 36}
        x2={AN_DIV_X + AN.divW / 2}
        y2={AN_MID_Y + AN.divH / 2}
      />
      <OverlayLine
        id="right-bar"
        x1={AN.x + AN.w + 50}
        y1={AN_MID_Y}
        x2={AN.x + AN.w}
        y2={AN_MID_Y}
      />
      <OverlayLine id="left-label" x1={AN.x + 50} y1={AN.y - 28} x2={AN.x + 50} y2={AN.y + 8} />
      <OverlayLine
        id="right-label"
        x1={AN_RIGHT_X + AN_RIGHT_W - 40}
        y1={AN.y - 28}
        x2={AN_RIGHT_X + AN_RIGHT_W - 40}
        y2={AN.y + 8}
      />
    </g>
  )
}

function TagsLayer() {
  return (
    <>
      <foreignObject
        x={AN.x}
        y={AN.y - 50}
        width={110}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="left-label" label="In-bar label" className="items-end justify-center" />
      </foreignObject>
      <foreignObject
        x={AN_RIGHT_X + AN_RIGHT_W - 110}
        y={AN.y - 50}
        width={110}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="right-label" label="In-bar label" className="items-end justify-center" />
      </foreignObject>
      <foreignObject
        x={4}
        y={AN_MID_Y - 12}
        width={70}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part="left-bar"
          label="Left bar"
          isAccent
          className="items-center justify-end"
        />
      </foreignObject>
      <foreignObject
        x={AN.x + AN.w + 48}
        y={AN_MID_Y - 12}
        width={80}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="right-bar" label="Right bar" className="items-center justify-start" />
      </foreignObject>
      <foreignObject
        x={AN_DIV_X + AN.divW / 2 - 44}
        y={AN.y + AN.h + 36}
        width={100}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part="divider"
          label="Divider"
          isAccent
          className="items-start justify-center"
        />
      </foreignObject>
    </>
  )
}

export function RatioSliderBreakdown() {
  return (
    <AnatomyFrame viewBox="-64 -6 568 200" maxWidthClassName="max-w-[682px]">
      <LeftBarShape />
      <RightBarShape />
      <GapShape />
      <DividerShape />
      <AnnotationsLayer />
      <LinesLayer />
      <TagsLayer />
    </AnatomyFrame>
  )
}

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
const SWITCH = {
  trackW: 44,
  trackH: 24,
  rx: 12,
  thumb: 20,
  travel: 20,
  gap: 12,
  font: 12,
  labelW: 60,
} as const

const TOTAL_W = SWITCH.trackW + SWITCH.gap + SWITCH.labelW
const BP_X = (220 - TOTAL_W) / 2
const BP_Y = (140 - SWITCH.trackH) / 2

const THUMB_MORPH_CLASS =
  'origin-center transition-transform duration-(--motion-dur-showcase) ease-(--motion-ease-in-out) group-hover:scale-x-[1.15] motion-reduce:transition-none motion-reduce:transform-none'

export function SwitchBlueprint() {
  const theme = blueprintTheme
  const thumbCx = BP_X + SWITCH.travel + SWITCH.thumb / 2
  const thumbCy = BP_Y + SWITCH.trackH / 2
  return (
    <Blueprint>
      <rect
        x={BP_X}
        y={BP_Y}
        width={SWITCH.trackW}
        height={SWITCH.trackH}
        rx={SWITCH.rx}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        className={BP_FILL_SOLID}
      />
      <circle
        cx={thumbCx}
        cy={thumbCy}
        r={SWITCH.thumb / 2}
        fill="var(--color-bg)"
        style={{ transformBox: 'fill-box' }}
        className={THUMB_MORPH_CLASS}
      />
      <text
        x={BP_X + SWITCH.trackW + SWITCH.gap}
        y={thumbCy + 4}
        fontSize={SWITCH.font}
        fontWeight={500}
        fontFamily="var(--font-sans)"
        className={BP_TEXT_SOFT}
      >
        Enabled
      </text>
      <g className={BP_HIDE_ON_MORPH}>
        <Selection x={BP_X} y={BP_Y} w={SWITCH.trackW} h={SWITCH.trackH} />
        <DimH x1={BP_X} x2={BP_X + SWITCH.trackW} y={BP_Y - 14} label={`${SWITCH.trackW}`} />
        <DimV x={BP_X - 12} y1={BP_Y} y2={BP_Y + SWITCH.trackH} label={`${SWITCH.trackH}`} />

        <g
          stroke="var(--bp-accent, var(--color-accent))"
          strokeWidth={theme.guide.strokeWidth}
          strokeDasharray="2 2"
          opacity={theme.guide.structOpacity}
        >
          <line
            x1={BP_X + SWITCH.thumb / 2}
            y1={BP_Y + SWITCH.trackH + 4}
            x2={BP_X + SWITCH.thumb / 2}
            y2={BP_Y + SWITCH.trackH + 9}
          />
          <line
            x1={thumbCx}
            y1={BP_Y + SWITCH.trackH + 4}
            x2={thumbCx}
            y2={BP_Y + SWITCH.trackH + 9}
          />
          <line
            x1={BP_X + SWITCH.thumb / 2}
            y1={BP_Y + SWITCH.trackH + 6.5}
            x2={thumbCx}
            y2={BP_Y + SWITCH.trackH + 6.5}
          />
        </g>
        <DimLabel
          x={(BP_X + SWITCH.thumb / 2 + thumbCx) / 2}
          y={BP_Y + SWITCH.trackH + 22}
          anchor="middle"
        >
          {`${SWITCH.travel}`}
        </DimLabel>
        <DimLabel
          x={BP_X + SWITCH.trackW + SWITCH.gap}
          y={BP_Y + SWITCH.trackH + 22}
          anchor="start"
        >
          {`r${SWITCH.rx}`}
        </DimLabel>

        <g
          stroke="var(--bp-accent, var(--color-accent))"
          strokeWidth={theme.guide.strokeWidth}
          strokeDasharray="2 2"
          opacity={theme.guide.structOpacity}
        >
          <line x1={BP_X + SWITCH.trackW} y1={BP_Y - 4} x2={BP_X + SWITCH.trackW} y2={BP_Y - 9} />
          <line
            x1={BP_X + SWITCH.trackW + SWITCH.gap}
            y1={BP_Y - 4}
            x2={BP_X + SWITCH.trackW + SWITCH.gap}
            y2={BP_Y - 9}
          />
          <line
            x1={BP_X + SWITCH.trackW}
            y1={BP_Y - 6.5}
            x2={BP_X + SWITCH.trackW + SWITCH.gap}
            y2={BP_Y - 6.5}
          />
        </g>
        <DimLabel x={BP_X + SWITCH.trackW + SWITCH.gap / 2} y={BP_Y - 12} anchor="middle">
          {`${SWITCH.gap}`}
        </DimLabel>
      </g>
    </Blueprint>
  )
}
const TX = 66
const TY = 70

function TrackShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('track')
  return (
    <g
      onMouseEnter={() => setHovered('track')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={0}
        y={0}
        width={SWITCH.trackW}
        height={SWITCH.trackH}
        rx={SWITCH.rx}
        fill="currentColor"
        fillOpacity={0.9}
        className={spotlight.className}
        style={spotlight.style}
      />
    </g>
  )
}

function ThumbShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('thumb')
  const cx = SWITCH.travel + SWITCH.thumb / 2
  const cy = SWITCH.trackH / 2
  return (
    <g
      onMouseEnter={() => setHovered('thumb')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect x={0} y={0} width={SWITCH.trackW} height={SWITCH.trackH} fill="transparent" />
      <circle
        cx={cx}
        cy={cy}
        r={SWITCH.thumb / 2}
        fill="var(--color-bg)"
        className={spotlight.className}
        style={spotlight.style}
      />
    </g>
  )
}

function LabelShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('label')
  const x = SWITCH.trackW + SWITCH.gap
  const cy = SWITCH.trackH / 2
  return (
    <g
      onMouseEnter={() => setHovered('label')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect x={x - 4} y={cy - 10} width={SWITCH.labelW + 8} height={20} fill="transparent" />
      <text
        x={x}
        y={cy + 4}
        fontSize={13}
        fontFamily="var(--font-sans)"
        className={`fill-current ${spotlight.className}`}
      >
        Enabled
      </text>
    </g>
  )
}

function AnnotationsLayer() {
  const { hovered } = useAnatomy()
  const dimmed = hovered !== null
  const cx = SWITCH.travel + SWITCH.thumb / 2
  const cy = SWITCH.trackH / 2
  return (
    <g
      style={{ pointerEvents: 'none', filter: dimmed ? 'url(#spotlight-blur)' : 'none' }}
      className={`transition-all duration-200 ease-out ${dimmed ? 'opacity-30' : 'opacity-100'}`}
    >
      <Selection x={0} y={0} w={SWITCH.trackW} h={SWITCH.trackH} />
      <DimH x1={0} x2={SWITCH.trackW} y={-14} label={`${SWITCH.trackW}`} />
      <DimV x={-12} y1={0} y2={SWITCH.trackH} label={`${SWITCH.trackH}`} labelXOffset={-6} />
      <DimLabel x={0} y={SWITCH.trackH + 14} anchor="start">
        {`r${SWITCH.rx}`}
      </DimLabel>

      <g
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={blueprintTheme.guide.strokeWidth}
        strokeDasharray="2 2"
        opacity={blueprintTheme.guide.structOpacity}
      >
        <line x1={SWITCH.thumb / 2} y1={cy} x2={cx} y2={cy} />
      </g>
      <DimLabel x={(SWITCH.thumb / 2 + cx) / 2} y={cy - 6} anchor="middle">
        {`${SWITCH.travel}`}
      </DimLabel>

      <g
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={blueprintTheme.guide.strokeWidth}
        strokeDasharray="2 2"
        opacity={blueprintTheme.guide.structOpacity}
      >
        <line x1={SWITCH.trackW} y1={cy} x2={SWITCH.trackW + SWITCH.gap} y2={cy} />
      </g>
      <DimLabel x={SWITCH.trackW + SWITCH.gap / 2} y={cy - 6} anchor="middle">
        {`${SWITCH.gap}`}
      </DimLabel>
    </g>
  )
}

function OverlayLines() {
  const trackMidX = TX + SWITCH.trackW / 2
  const trackTop = TY
  const thumbCx = TX + SWITCH.travel + SWITCH.thumb / 2
  const thumbBottom = TY + SWITCH.trackH / 2 + SWITCH.thumb / 2
  const labelMidX = TX + SWITCH.trackW + SWITCH.gap + SWITCH.labelW / 2
  return (
    <g strokeWidth="1" className="pointer-events-none">
      <OverlayLine id="track" x1={trackMidX} y1={trackTop} x2={trackMidX} y2={trackTop - 40} />
      <OverlayLine id="thumb" x1={thumbCx} y1={thumbBottom} x2={thumbCx} y2={thumbBottom + 36} />
      <OverlayLine id="label" x1={labelMidX} y1={trackTop} x2={labelMidX} y2={trackTop - 40} />
    </g>
  )
}

function Tags() {
  const trackMidX = TX + SWITCH.trackW / 2
  const trackTop = TY
  const thumbCx = TX + SWITCH.travel + SWITCH.thumb / 2
  const thumbBottom = TY + SWITCH.trackH / 2 + SWITCH.thumb / 2
  const labelMidX = TX + SWITCH.trackW + SWITCH.gap + SWITCH.labelW / 2
  return (
    <>
      <foreignObject
        x={trackMidX - 45}
        y={trackTop - 40 - 24}
        width={90}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="track" label="Track" className="items-end justify-center" isAccent />
      </foreignObject>
      <foreignObject
        x={thumbCx - 65}
        y={thumbBottom + 36}
        width={130}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="thumb" label="Thumb (squash)" className="items-start justify-center" />
      </foreignObject>
      <foreignObject
        x={labelMidX - 45}
        y={trackTop - 40 - 24}
        width={90}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="label" label="Label" className="items-end justify-center" />
      </foreignObject>
    </>
  )
}

export function SwitchAnatomy() {
  return (
    <AnatomyFrame viewBox="-20 -20 300 200" maxWidthClassName="max-w-[360px]">
      <g transform={`translate(${TX}, ${TY})`}>
        <TrackShape />
        <ThumbShape />
        <LabelShape />
        <AnnotationsLayer />
      </g>
      <OverlayLines />
      <Tags />
    </AnatomyFrame>
  )
}

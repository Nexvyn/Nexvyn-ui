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
  PadGuide,
  Selection,
} from '@/components/diagrams/lib/parts'

const SWITCH = {
  trackW: 44,
  trackH: 24,
  trackRx: 12,
  inset: 2,
  thumb: 20,
  travel: 20,
  labelGap: 12,
  labelW: 72,
  labelFont: 12,
} as const

const ROW_W = SWITCH.trackW + SWITCH.labelGap + SWITCH.labelW
const BP_X = (220 - ROW_W) / 2
const BP_Y = (140 - SWITCH.trackH) / 2
const BP_THUMB_CX = BP_X + SWITCH.inset + SWITCH.thumb / 2
const BP_THUMB_CY = BP_Y + SWITCH.trackH / 2

export function SwitchBlueprint() {
  const theme = blueprintTheme

  return (
    <Blueprint>
      <defs>
        <pattern
          id="bp-hatch-switch-travel"
          width="4"
          height="4"
          patternTransform="rotate(45)"
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="4"
            stroke="currentColor"
            strokeWidth="0.75"
            opacity="0.35"
          />
        </pattern>
      </defs>

      <rect
        x={BP_X}
        y={BP_Y}
        width={SWITCH.trackW}
        height={SWITCH.trackH}
        rx={SWITCH.trackRx}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        className={BP_FILL_SOLID}
      />

      <g
        style={{ transformOrigin: `${BP_THUMB_CX}px ${BP_THUMB_CY}px` }}
        className="transition-transform duration-(--motion-dur-slow) ease-(--motion-ease-in-out) group-hover:translate-x-5 group-focus-visible:translate-x-5 motion-reduce:transition-none motion-reduce:transform-none"
      >
        <circle cx={BP_THUMB_CX} cy={BP_THUMB_CY} r={SWITCH.thumb / 2} fill="var(--color-bg)" />
        <circle
          cx={BP_THUMB_CX}
          cy={BP_THUMB_CY}
          r={SWITCH.thumb / 2}
          fill="url(#bp-hatch-switch-travel)"
          className={BP_HIDE_ON_MORPH}
        />
        <circle
          cx={BP_THUMB_CX}
          cy={BP_THUMB_CY}
          r={SWITCH.thumb / 2}
          fill="none"
          stroke="currentColor"
          strokeWidth={theme.wireframe.strokeWidth}
          strokeOpacity={theme.wireframe.strokeOpacity}
        />
      </g>

      <text
        x={BP_X + SWITCH.trackW + SWITCH.labelGap}
        y={BP_THUMB_CY + 4}
        fontSize={SWITCH.labelFont}
        fontWeight="500"
        fontFamily="var(--font-sans)"
        className={BP_TEXT_SOFT}
      >
        Notifications
      </text>

      <g className={BP_HIDE_ON_MORPH}>
        <Selection x={BP_X} y={BP_Y} w={SWITCH.trackW} h={SWITCH.trackH} />
        <PadGuide
          x={BP_X + SWITCH.inset}
          y={BP_Y + SWITCH.inset}
          w={SWITCH.trackW - SWITCH.inset * 2}
          h={SWITCH.trackH - SWITCH.inset * 2}
          offset={0.8}
          boxX={BP_X}
          boxY={BP_Y}
          boxW={SWITCH.trackW}
          boxH={SWITCH.trackH}
          boxRx={SWITCH.trackRx}
          clipOffset={0.8}
        />
        <DimH x1={BP_X} x2={BP_X + SWITCH.trackW} y={BP_Y - 14} label={`${SWITCH.trackW}`} />
        <DimV
          x={BP_X - 12}
          y1={BP_Y}
          y2={BP_Y + SWITCH.trackH}
          label={`${SWITCH.trackH}`}
          labelXOffset={-6}
        />
        <g
          stroke="var(--bp-accent, var(--color-accent))"
          strokeWidth={theme.guide.strokeWidth}
          strokeDasharray="2 2"
          opacity={theme.guide.structOpacity}
        >
          <line
            x1={BP_THUMB_CX}
            y1={BP_Y + SWITCH.trackH + 4}
            x2={BP_THUMB_CX}
            y2={BP_Y + SWITCH.trackH + 9}
          />
          <line
            x1={BP_THUMB_CX + SWITCH.travel}
            y1={BP_Y + SWITCH.trackH + 4}
            x2={BP_THUMB_CX + SWITCH.travel}
            y2={BP_Y + SWITCH.trackH + 9}
          />
          <line
            x1={BP_THUMB_CX}
            y1={BP_Y + SWITCH.trackH + 6.5}
            x2={BP_THUMB_CX + SWITCH.travel}
            y2={BP_Y + SWITCH.trackH + 6.5}
          />
        </g>
        <DimLabel x={BP_THUMB_CX + SWITCH.travel / 2} y={BP_Y + SWITCH.trackH + 20}>
          travel 20
        </DimLabel>
        <DimLabel x={BP_X + SWITCH.trackW + 7} y={BP_Y + SWITCH.trackH + 20} anchor="start">
          r12, pad 2
        </DimLabel>
      </g>
    </Blueprint>
  )
}

const AN = {
  tx: 118,
  ty: 68,
} as const

function ControlShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('control')
  const active = hovered === 'control'

  return (
    <rect
      x="0"
      y="0"
      width={SWITCH.trackW}
      height={SWITCH.trackH}
      rx={SWITCH.trackRx}
      fill="currentColor"
      fillOpacity={active ? 0.14 : 0.04}
      stroke="currentColor"
      strokeWidth={active ? 2 : blueprintTheme.wireframe.strokeWidth}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ ...spotlight.style, pointerEvents: 'all' }}
      onMouseEnter={() => setHovered('control')}
      onMouseLeave={() => setHovered(null)}
    />
  )
}

function ThumbShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('thumb')
  const active = hovered === 'thumb'
  const cx = SWITCH.inset + SWITCH.thumb / 2 + SWITCH.travel
  const cy = SWITCH.trackH / 2

  return (
    <circle
      cx={cx}
      cy={cy}
      r={SWITCH.thumb / 2}
      fill={active ? 'currentColor' : 'url(#bp-anatomy-hatch)'}
      stroke="currentColor"
      strokeWidth={active ? 1.75 : blueprintTheme.wireframe.strokeWidth}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ ...spotlight.style, pointerEvents: 'all' }}
      onMouseEnter={() => setHovered('thumb')}
      onMouseLeave={() => setHovered(null)}
    />
  )
}

function LabelShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('label')
  const active = hovered === 'label'
  const x = SWITCH.trackW + SWITCH.labelGap

  return (
    <g
      onMouseEnter={() => setHovered('label')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect x={x - 4} y="2" width={SWITCH.labelW + 8} height="20" fill="transparent" />
      <text
        x={x}
        y={SWITCH.trackH / 2 + 4}
        fontSize={SWITCH.labelFont}
        fontWeight={active ? 650 : 500}
        fontFamily="var(--font-sans)"
        className={`fill-current ${spotlight.className}`}
      >
        Notifications
      </text>
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
      <Selection x={0} y={0} w={SWITCH.trackW} h={SWITCH.trackH} />
      <PadGuide
        x={SWITCH.inset}
        y={SWITCH.inset}
        w={SWITCH.trackW - SWITCH.inset * 2}
        h={SWITCH.trackH - SWITCH.inset * 2}
        offset={0.8}
        boxX={0}
        boxY={0}
        boxW={SWITCH.trackW}
        boxH={SWITCH.trackH}
        boxRx={SWITCH.trackRx}
        clipOffset={0.8}
      />
      <DimH x1={0} x2={SWITCH.trackW} y={-14} label="44" />
      <DimV x={-12} y1={0} y2={SWITCH.trackH} label="24" labelXOffset={-6} />
      <DimLabel x={0} y={SWITCH.trackH + 18} anchor="start">
        r12, pad 2
      </DimLabel>
    </g>
  )
}

function LinesLayer() {
  const controlMidX = AN.tx + SWITCH.trackW / 2
  const thumbCx = AN.tx + SWITCH.inset + SWITCH.thumb / 2 + SWITCH.travel
  const thumbBottom = AN.ty + SWITCH.trackH / 2 + SWITCH.thumb / 2
  const labelRight = AN.tx + SWITCH.trackW + SWITCH.labelGap + SWITCH.labelW
  const labelMidY = AN.ty + SWITCH.trackH / 2

  return (
    <g strokeWidth="1" className="pointer-events-none">
      <OverlayLine id="control" x1={controlMidX} y1={AN.ty} x2={controlMidX} y2={36} />
      <OverlayLine id="thumb" x1={thumbCx} y1={thumbBottom} x2={thumbCx} y2={122} />
      <OverlayLine id="label" x1={labelRight} y1={labelMidY} x2={278} y2={labelMidY} />
    </g>
  )
}

function TagsLayer() {
  const controlMidX = AN.tx + SWITCH.trackW / 2
  const thumbCx = AN.tx + SWITCH.inset + SWITCH.thumb / 2 + SWITCH.travel
  const labelMidY = AN.ty + SWITCH.trackH / 2

  return (
    <>
      <foreignObject
        x={controlMidX - 40}
        y="12"
        width="80"
        height="24"
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part="control"
          label="Switch.Control"
          className="items-end justify-center"
          isAccent
        />
      </foreignObject>
      <foreignObject
        x={thumbCx - 45}
        y="122"
        width="90"
        height="24"
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="thumb" label="Switch.Thumb" className="items-start justify-center" />
      </foreignObject>
      <foreignObject
        x="278"
        y={labelMidY - 12}
        width="90"
        height="24"
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="label" label="Switch.Label" className="items-center justify-start" />
      </foreignObject>
    </>
  )
}

export function SwitchAnatomy() {
  return (
    <AnatomyFrame viewBox="60 0 330 160" maxWidthClassName="max-w-[440px]">
      <g transform={`translate(${AN.tx}, ${AN.ty})`}>
        <ControlShape />
        <ThumbShape />
        <LabelShape />
        <AnnotationsLayer />
      </g>
      <LinesLayer />
      <TagsLayer />
    </AnatomyFrame>
  )
}

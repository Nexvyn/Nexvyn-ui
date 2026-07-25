'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset — licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root MIT LICENSE.

import {
  Blueprint,
  BP_FILL_PANEL,
  BP_HIDE_ON_MORPH,
  BP_MORPH,
  BP_TEXT_SOFT,
  blueprintTheme,
  DimH,
  DimLabel,
  DimV,
  PadGuide,
  Selection,
} from '@/components/diagrams/lib/parts'
import {
  AnatomyFrame,
  AnatomyTag,
  OverlayLine,
  useAnatomy,
  useSpotlight,
} from '@/components/diagrams/lib/anatomy-parts'

const BP_FIELD = { x: 30, y: 52, w: 160, h: 44, rx: 6 } as const
const BP_DOT_XS = [46, 58, 70, 82, 94, 106] as const
const BP_EYE = { cx: 168, cy: 74 } as const

export function PasswordInputWireframe() {
  const theme = blueprintTheme
  return (
    <Blueprint>
      <text
        x={BP_FIELD.x}
        y={BP_FIELD.y - 12}
        fontSize={14}
        fontWeight={500}
        fontFamily="var(--font-sans)"
        className={BP_TEXT_SOFT}
      >
        Password
      </text>

      <rect
        x={BP_FIELD.x}
        y={BP_FIELD.y}
        width={BP_FIELD.w}
        height={BP_FIELD.h}
        rx={BP_FIELD.rx}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        className={BP_FILL_PANEL}
      />
      {BP_DOT_XS.map((x) => (
        <circle
          key={x}
          cx={x}
          cy={BP_FIELD.y + BP_FIELD.h / 2}
          r={2.5}
          className={`${BP_MORPH} fill-transparent stroke-current group-hover:fill-(--color-fg) group-focus-visible:fill-(--color-fg) group-hover:stroke-transparent group-focus-visible:stroke-transparent`}
          strokeWidth={1}
          opacity={theme.wireframe.strokeOpacity}
        />
      ))}
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${BP_MORPH} opacity-55 group-hover:opacity-100 group-focus-visible:opacity-100`}
      >
        <path d={`M${BP_EYE.cx - 9} ${BP_EYE.cy} q9 -8 18 0 q-9 8 -18 0`} />
        <circle cx={BP_EYE.cx} cy={BP_EYE.cy} r={2.5} className="fill-current stroke-none" />
      </g>

      <g className={BP_HIDE_ON_MORPH}>
        <Selection x={BP_FIELD.x} y={BP_FIELD.y} w={BP_FIELD.w} h={BP_FIELD.h} />
        <PadGuide
          x={BP_FIELD.x + 14}
          y={BP_FIELD.y + 10}
          w={BP_FIELD.w - 14 - 48}
          h={BP_FIELD.h - 20}
          offset={0.8}
          boxX={BP_FIELD.x}
          boxY={BP_FIELD.y}
          boxW={BP_FIELD.w}
          boxH={BP_FIELD.h}
          boxRx={BP_FIELD.rx}
          clipOffset={0.8}
        />
        <circle
          cx={BP_EYE.cx}
          cy={BP_EYE.cy}
          r={11}
          fill="none"
          stroke="var(--bp-accent, var(--color-accent))"
          strokeWidth={theme.guide.strokeWidth}
          strokeDasharray="2 2"
          opacity={theme.guide.structOpacity}
        />
        <DimH
          x1={BP_FIELD.x}
          x2={BP_FIELD.x + BP_FIELD.w}
          y={BP_FIELD.y + BP_FIELD.h + 14}
          label="160"
        />
        <DimV
          x={BP_FIELD.x - 12}
          y1={BP_FIELD.y}
          y2={BP_FIELD.y + BP_FIELD.h}
          label="44"
          labelXOffset={-6}
        />
        <DimLabel x={BP_FIELD.x} y={BP_FIELD.y - 4} anchor="start">
          r6
        </DimLabel>
      </g>
    </Blueprint>
  )
}

const AN_FIELD = { x: 40, y: 70, w: 240, h: 44, rx: 6 } as const

function FieldShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('field')
  return (
    <rect
      x={AN_FIELD.x}
      y={AN_FIELD.y}
      width={AN_FIELD.w}
      height={AN_FIELD.h}
      rx={AN_FIELD.rx}
      stroke="currentColor"
      strokeWidth={hovered === 'field' ? 2 : 1.25}
      fill={hovered === 'field' ? 'currentColor' : 'transparent'}
      fillOpacity={hovered === 'field' ? 0.04 : 0}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ ...spotlight.style, pointerEvents: 'all' }}
      onMouseEnter={() => setHovered('field')}
      onMouseLeave={() => setHovered(null)}
    />
  )
}

function MaskShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('mask')
  const cy = AN_FIELD.y + AN_FIELD.h / 2
  return (
    <g
      onMouseEnter={() => setHovered('mask')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <circle
          key={i}
          cx={AN_FIELD.x + 20 + i * 14}
          cy={cy}
          r={3}
          className={`fill-current ${spotlight.className}`}
        />
      ))}
    </g>
  )
}

function EyeShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('eye')
  const cx = AN_FIELD.x + AN_FIELD.w - 24
  const cy = AN_FIELD.y + AN_FIELD.h / 2
  return (
    <g
      onMouseEnter={() => setHovered('eye')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <rect x={cx - 14} y={cy - 14} width={28} height={28} fill="transparent" />
      <path d={`M${cx - 10} ${cy} q10 -9 20 0 q-10 9 -20 0`} className={spotlight.className} />
      <circle cx={cx} cy={cy} r={3} className={`fill-current stroke-none ${spotlight.className}`} />
    </g>
  )
}

export function PasswordInputBreakdown() {
  return (
    <AnatomyFrame viewBox="-54 2 428 180" maxWidthClassName="max-w-[514px]">
      <FieldShape />
      <MaskShape />
      <EyeShape />
      <OverlayLine id="field" x1={160} y1={70} x2={160} y2={40} />
      <OverlayLine id="mask" x1={100} y1={92} x2={50} y2={140} />
      <OverlayLine id="eye" x1={256} y1={92} x2={300} y2={140} />
      <foreignObject
        x={110}
        y={16}
        width={100}
        height={24}
        className="overflow-visible pointer-events-none"
      >
        <AnatomyTag part="field" label="Input" className="items-end justify-center" />
      </foreignObject>
      <foreignObject
        x={8}
        y={136}
        width={100}
        height={24}
        className="overflow-visible pointer-events-none"
      >
        <AnatomyTag part="mask" label="Mask dots" className="items-start justify-center" />
      </foreignObject>
      <foreignObject
        x={260}
        y={136}
        width={100}
        height={24}
        className="overflow-visible pointer-events-none"
      >
        <AnatomyTag part="eye" label="Eye toggle" isAccent className="items-start justify-center" />
      </foreignObject>
    </AnatomyFrame>
  )
}

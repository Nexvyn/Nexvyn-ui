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
  useSpotlight,
} from '@/components/diagrams/lib/anatomy-parts'

const BP_FIELD = { x: 30, y: 44, w: 160, h: 44, rx: 6 } as const
const BP_PAD_X = 14
const BP_ICON = 14

const RING_CLASS =
  'transition-opacity duration-(--motion-dur-fast) ease-(--motion-ease-out) opacity-0 group-hover:opacity-70 group-focus-visible:opacity-70 motion-reduce:transition-none'

export function InputWireframe() {
  const theme = blueprintTheme
  const midY = BP_FIELD.y + BP_FIELD.h / 2
  const iconCx = BP_FIELD.x + BP_PAD_X + BP_ICON / 2
  const textX = BP_FIELD.x + BP_PAD_X + BP_ICON + 6

  return (
    <Blueprint>
      <text
        x={BP_FIELD.x}
        y={BP_FIELD.y - 12}
        fontSize={11}
        fontWeight={500}
        fontFamily="var(--font-sans)"
        className={BP_TEXT_SOFT}
      >
        Email
      </text>

      <rect
        x={BP_FIELD.x - 3}
        y={BP_FIELD.y - 3}
        width={BP_FIELD.w + 6}
        height={BP_FIELD.h + 6}
        rx={9}
        fill="none"
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={1.5}
        className={RING_CLASS}
      />

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

      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        className={`${BP_MORPH} opacity-55 group-hover:opacity-100 group-focus-visible:opacity-100`}
      >
        <circle cx={iconCx - 1.5} cy={midY - 1.5} r={3.5} />
        <line x1={iconCx + 1.2} y1={midY + 1.2} x2={iconCx + 4} y2={midY + 4} />
      </g>

      <text
        x={textX}
        y={midY + 3}
        fontSize={9}
        fontFamily="var(--font-sans)"
        className={BP_TEXT_SOFT}
      >
        you@example.com
      </text>

      <text
        x={BP_FIELD.x}
        y={102}
        fontSize={8}
        fontFamily="var(--font-sans)"
        className={`${BP_MORPH} fill-(--color-error) opacity-45 group-hover:opacity-100 group-focus-visible:opacity-100`}
      >
        Password is required
      </text>

      <g className={BP_HIDE_ON_MORPH}>
        <Selection x={BP_FIELD.x} y={BP_FIELD.y} w={BP_FIELD.w} h={BP_FIELD.h} />
        <PadGuide
          x={BP_FIELD.x + BP_PAD_X}
          y={midY - BP_ICON / 2}
          w={BP_FIELD.w - BP_PAD_X * 2}
          h={BP_ICON}
          offset={0.8}
          boxX={BP_FIELD.x}
          boxY={BP_FIELD.y}
          boxW={BP_FIELD.w}
          boxH={BP_FIELD.h}
          boxRx={BP_FIELD.rx}
          clipOffset={0.8}
        />
        <DimLabel x={BP_FIELD.x + BP_PAD_X / 2} y={midY + 2} anchor="middle">
          14
        </DimLabel>
        <DimLabel x={BP_FIELD.x + BP_FIELD.w - BP_PAD_X / 2} y={midY + 2} anchor="middle">
          14
        </DimLabel>
        <DimH x1={BP_FIELD.x} x2={BP_FIELD.x + BP_FIELD.w} y={114} label="160" />
        <DimV
          x={BP_FIELD.x - 12}
          y1={BP_FIELD.y}
          y2={BP_FIELD.y + BP_FIELD.h}
          label="44"
          labelXOffset={-6}
        />
        <DimLabel x={BP_FIELD.x + BP_FIELD.w} y={BP_FIELD.y - 4} anchor="end">
          r6
        </DimLabel>
      </g>
    </Blueprint>
  )
}

const AN_FIELD = { x: 90, y: 96, w: 260, h: 44, rx: 6 } as const
const AN_PAD_X = 14
const AN_ICON = 16

function LabelShape() {
  const spotlight = useSpotlight('label')
  return (
    <text
      x={AN_FIELD.x}
      y={80}
      fontSize={13}
      fontWeight={500}
      fontFamily="var(--font-sans)"
      className={`fill-current ${spotlight.className}`}
      style={spotlight.style}
    >
      Email
    </text>
  )
}

function FieldShape() {
  const spotlight = useSpotlight('field')
  return (
    <rect
      x={AN_FIELD.x}
      y={AN_FIELD.y}
      width={AN_FIELD.w}
      height={AN_FIELD.h}
      rx={AN_FIELD.rx}
      stroke="currentColor"
      strokeWidth={1.25}
      fill="transparent"
      className={spotlight.className}
      style={spotlight.style}
    />
  )
}

function IconShape() {
  const spotlight = useSpotlight('icon')
  const cx = AN_FIELD.x + AN_PAD_X + AN_ICON / 2
  const cy = AN_FIELD.y + AN_FIELD.h / 2
  return (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      className={spotlight.className}
      style={spotlight.style}
    >
      <circle cx={cx - 2} cy={cy - 2} r={4.5} />
      <line x1={cx + 1.2} y1={cy + 1.2} x2={cx + 5} y2={cy + 5} />
    </g>
  )
}

function ValueText() {
  const cy = AN_FIELD.y + AN_FIELD.h / 2
  const x = AN_FIELD.x + AN_PAD_X + AN_ICON + 8
  return (
    <text
      x={x}
      y={cy + 4}
      fontSize={13}
      fontFamily="var(--font-sans)"
      className="fill-(--color-muted) opacity-70"
    >
      you@example.com
    </text>
  )
}

function ErrorShape() {
  const spotlight = useSpotlight('error')
  return (
    <text
      x={AN_FIELD.x}
      y={168}
      fontSize={12}
      fontFamily="var(--font-sans)"
      className={`fill-(--color-error) ${spotlight.className}`}
      style={spotlight.style}
    >
      Password is required
    </text>
  )
}

function LinesLayer() {
  const midY = AN_FIELD.y + AN_FIELD.h / 2
  const iconCx = AN_FIELD.x + AN_PAD_X + AN_ICON / 2
  const iconBottom = midY + AN_ICON / 2
  const labelX = AN_FIELD.x + 30
  const labelTop = 80 - 13 * 0.72
  const errorX = AN_FIELD.x + 70
  const errorBottom = 168 + 2

  return (
    <>
      <OverlayLine id="label" x1={labelX} y1={labelTop} x2={labelX} y2={labelTop - 30} />
      <OverlayLine id="icon" x1={iconCx} y1={iconBottom} x2={iconCx} y2={iconBottom + 30} />
      <OverlayLine
        id="field"
        x1={AN_FIELD.x + AN_FIELD.w}
        y1={midY}
        x2={AN_FIELD.x + AN_FIELD.w + 34}
        y2={midY}
      />
      <OverlayLine id="error" x1={errorX} y1={errorBottom} x2={errorX} y2={errorBottom + 30} />
    </>
  )
}

function TagsLayer() {
  const midY = AN_FIELD.y + AN_FIELD.h / 2
  const iconCx = AN_FIELD.x + AN_PAD_X + AN_ICON / 2
  const iconBottom = midY + AN_ICON / 2
  const labelX = AN_FIELD.x + 30
  const labelTop = 80 - 13 * 0.72
  const errorX = AN_FIELD.x + 70
  const errorBottom = 168 + 2

  return (
    <>
      <foreignObject
        x={labelX - 50}
        y={labelTop - 30 - 24}
        width={100}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="label" label="Label" className="items-end justify-center" />
      </foreignObject>
      <foreignObject
        x={iconCx - 45}
        y={iconBottom + 30}
        width={90}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="icon" label="Icon" className="items-start justify-center" />
      </foreignObject>
      <foreignObject
        x={AN_FIELD.x + AN_FIELD.w + 40}
        y={midY - 12}
        width={90}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="field" label="Field" className="items-center justify-start" isAccent />
      </foreignObject>
      <foreignObject
        x={errorX - 55}
        y={errorBottom + 30}
        width={110}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="error" label="Error" className="items-start justify-center" />
      </foreignObject>
    </>
  )
}

export function InputAnatomy() {
  return (
    <AnatomyFrame viewBox="40 -10 460 260" maxWidthClassName="max-w-xl">
      <LabelShape />
      <FieldShape />
      <IconShape />
      <ValueText />
      <ErrorShape />
      <LinesLayer />
      <TagsLayer />
    </AnatomyFrame>
  )
}

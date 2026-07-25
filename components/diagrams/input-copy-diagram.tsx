'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset — licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root MIT LICENSE.

import {
  Blueprint,
  BP_FILL_PANEL,
  BP_HIDE_ON_MORPH,
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

const COPY_PATH = 'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'
const CHECK_PATH = 'M6 12L10 16L18 8'
const ICON_SCALE = 14 / 24

const BP_FIELD = { x: 15, y: 53, w: 190, h: 34, rx: 6 } as const
const BP_PAD_X = 8

function BpCopyGlyph({ x, y }: { x: number; y: number }) {
  return (
    <g
      transform={`translate(${x}, ${y}) scale(${ICON_SCALE})`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-opacity duration-(--motion-dur-fast) ease-(--motion-ease-out) opacity-70 group-hover:opacity-0 group-focus-visible:opacity-0 motion-reduce:transition-none"
    >
      <rect x={9} y={9} width={12} height={12} rx={2} />
      <path d={COPY_PATH} />
    </g>
  )
}

function BpCheckGlyph({ x, y }: { x: number; y: number }) {
  return (
    <g
      transform={`translate(${x}, ${y}) scale(${ICON_SCALE})`}
      fill="none"
      stroke="var(--bp-accent, var(--color-accent))"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-opacity duration-(--motion-dur-fast) ease-(--motion-ease-out) opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
    >
      <path d={CHECK_PATH} />
    </g>
  )
}

export function InputCopyWireframe() {
  const theme = blueprintTheme
  const midY = BP_FIELD.y + BP_FIELD.h / 2
  const actionRight = BP_FIELD.x + BP_FIELD.w - BP_PAD_X
  const labelX = actionRight - 26
  const iconX = labelX - 6 - 14
  const iconY = midY - 7

  return (
    <Blueprint>
      <text
        x={BP_FIELD.x}
        y={BP_FIELD.y - 8}
        fontSize={9}
        fontWeight={500}
        fontFamily="var(--font-sans)"
        className={BP_TEXT_SOFT}
      >
        API Key
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

      <text
        x={BP_FIELD.x + BP_PAD_X}
        y={midY + 3}
        fontSize={8}
        fontFamily="var(--font-mono)"
        className={BP_TEXT_SOFT}
      >
        sk-proj-a1b2c3d4
      </text>

      <BpCopyGlyph x={iconX} y={iconY} />
      <BpCheckGlyph x={iconX} y={iconY} />

      <text
        x={labelX}
        y={midY + 3}
        fontSize={8}
        fontFamily="var(--font-sans)"
        className={BP_TEXT_SOFT}
      >
        Copy
      </text>

      <g className={BP_HIDE_ON_MORPH}>
        <Selection x={BP_FIELD.x} y={BP_FIELD.y} w={BP_FIELD.w} h={BP_FIELD.h} />
        <PadGuide
          x={BP_FIELD.x + BP_PAD_X}
          y={midY - 9}
          w={BP_FIELD.w - BP_PAD_X * 2}
          h={18}
          offset={0.8}
          boxX={BP_FIELD.x}
          boxY={BP_FIELD.y}
          boxW={BP_FIELD.w}
          boxH={BP_FIELD.h}
          boxRx={BP_FIELD.rx}
          clipOffset={0.8}
        />
        <DimLabel x={BP_FIELD.x + BP_PAD_X / 2} y={midY + 2} anchor="middle">
          8
        </DimLabel>
        <DimLabel x={BP_FIELD.x + BP_FIELD.w - BP_PAD_X / 2} y={midY + 2} anchor="middle">
          8
        </DimLabel>
        <DimH x1={BP_FIELD.x} x2={BP_FIELD.x + BP_FIELD.w} y={BP_FIELD.y + BP_FIELD.h + 16} label="190" />
        <DimV
          x={BP_FIELD.x - 12}
          y1={BP_FIELD.y}
          y2={BP_FIELD.y + BP_FIELD.h}
          label="34"
          labelXOffset={-6}
        />
        <DimLabel x={BP_FIELD.x + BP_FIELD.w} y={BP_FIELD.y - 4} anchor="end">
          r6
        </DimLabel>
      </g>
    </Blueprint>
  )
}

const AN_FIELD = { x: 110, y: 90, w: 190, h: 34, rx: 6 } as const
const AN_PAD_X = 8

function LabelShape() {
  const spotlight = useSpotlight('label')
  return (
    <text
      x={AN_FIELD.x}
      y={80}
      fontSize={12}
      fontWeight={500}
      fontFamily="var(--font-sans)"
      className={`fill-current ${spotlight.className}`}
      style={spotlight.style}
    >
      API Key
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

function ValueShape() {
  const spotlight = useSpotlight('value')
  const midY = AN_FIELD.y + AN_FIELD.h / 2
  return (
    <text
      x={AN_FIELD.x + AN_PAD_X}
      y={midY + 4}
      fontSize={12}
      fontFamily="var(--font-mono)"
      className={`fill-current ${spotlight.className}`}
      style={spotlight.style}
    >
      sk-proj-a1b2c3d4
    </text>
  )
}

function IconShape() {
  const spotlight = useSpotlight('icon')
  const midY = AN_FIELD.y + AN_FIELD.h / 2
  const actionRight = AN_FIELD.x + AN_FIELD.w - AN_PAD_X
  const iconX = actionRight - 26 - 6 - 14
  const iconY = midY - 7
  return (
    <g
      transform={`translate(${iconX}, ${iconY}) scale(${ICON_SCALE})`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={spotlight.className}
      style={spotlight.style}
    >
      <rect x={9} y={9} width={12} height={12} rx={2} />
      <path d={COPY_PATH} />
    </g>
  )
}

function LinesLayer() {
  const midY = AN_FIELD.y + AN_FIELD.h / 2
  const labelTop = 80 - 12 * 0.72
  const labelX = AN_FIELD.x + 30
  const valueBottom = midY + 4 + 3
  const valueX = AN_FIELD.x + AN_PAD_X + 30
  const actionRight = AN_FIELD.x + AN_FIELD.w - AN_PAD_X
  const iconCx = actionRight - 26 - 6 - 7
  const iconBottom = midY - 7 + 14

  return (
    <>
      <OverlayLine id="label" x1={labelX} y1={labelTop} x2={labelX} y2={labelTop - 30} />
      <OverlayLine id="value" x1={valueX} y1={valueBottom} x2={valueX} y2={valueBottom + 30} />
      <OverlayLine id="icon" x1={iconCx} y1={iconBottom} x2={iconCx} y2={iconBottom + 30} />
      <OverlayLine
        id="field"
        x1={AN_FIELD.x + AN_FIELD.w}
        y1={midY}
        x2={AN_FIELD.x + AN_FIELD.w + 34}
        y2={midY}
      />
    </>
  )
}

function TagsLayer() {
  const midY = AN_FIELD.y + AN_FIELD.h / 2
  const labelTop = 80 - 12 * 0.72
  const labelX = AN_FIELD.x + 30
  const valueBottom = midY + 4 + 3
  const valueX = AN_FIELD.x + AN_PAD_X + 30
  const actionRight = AN_FIELD.x + AN_FIELD.w - AN_PAD_X
  const iconCx = actionRight - 26 - 6 - 7
  const iconBottom = midY - 7 + 14

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
        x={valueX - 45}
        y={valueBottom + 30}
        width={90}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="value" label="Value" className="items-start justify-center" />
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
    </>
  )
}

export function InputCopyAnatomy() {
  return (
    <AnatomyFrame viewBox="70 -10 380 210" maxWidthClassName="max-w-md">
      <LabelShape />
      <FieldShape />
      <ValueShape />
      <IconShape />
      <LinesLayer />
      <TagsLayer />
    </AnatomyFrame>
  )
}

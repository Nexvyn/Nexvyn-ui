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

const PILL = { w: 156, h: 36, r: 12, padX: 14 } as const
const ACTION = 24

const BP_X = (220 - PILL.w) / 2
const BP_Y = (140 - PILL.h) / 2

export function IdReelBlueprint() {
  const theme = blueprintTheme
  const midY = BP_Y + PILL.h / 2
  const statusX = BP_X + PILL.w - PILL.padX - ACTION * 2 - 6
  const copyX = BP_X + PILL.w - PILL.padX - ACTION

  return (
    <Blueprint>
      <rect
        x={BP_X}
        y={BP_Y}
        width={PILL.w}
        height={PILL.h}
        rx={PILL.r}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        className={BP_FILL_PANEL}
      />

      <text
        x={BP_X + PILL.padX}
        y={midY + 4}
        fontSize={13}
        fontWeight={600}
        fontFamily="var(--font-sans)"
        className={BP_TEXT_SOFT}
      >
        #1042
      </text>

      <rect
        x={statusX}
        y={midY - ACTION / 2}
        width={ACTION}
        height={ACTION}
        rx={6}
        fill="var(--pr-open-bg)"
        className={`${BP_MORPH} opacity-70 group-hover:opacity-100 group-focus-visible:opacity-100`}
      />
      <g
        stroke="var(--pr-open)"
        strokeWidth={1.4}
        strokeLinecap="round"
        fill="none"
        className={`${BP_MORPH} opacity-70 group-hover:opacity-100 group-focus-visible:opacity-100`}
      >
        <circle cx={statusX + ACTION / 2 - 3} cy={midY + 3} r={2.6} />
        <circle cx={statusX + ACTION / 2 + 3} cy={midY - 3} r={2.6} />
        <path d={`M${statusX + ACTION / 2} ${midY - 0.5}v-1.5`} />
      </g>

      <rect
        x={copyX}
        y={midY - ACTION / 2}
        width={ACTION}
        height={ACTION}
        rx={6}
        fill="none"
        stroke="currentColor"
        strokeOpacity={0.3}
        strokeWidth={1}
        className={BP_HIDE_ON_MORPH}
      />
      <rect
        x={copyX + 7}
        y={midY - 4}
        width={9}
        height={9}
        rx={2}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.3}
        className={`${BP_MORPH} opacity-55 group-hover:opacity-100 group-focus-visible:opacity-100`}
      />

      <g className={BP_HIDE_ON_MORPH}>
        <Selection x={BP_X} y={BP_Y} w={PILL.w} h={PILL.h} />
        <PadGuide
          x={BP_X + PILL.padX}
          y={BP_Y + 4}
          w={PILL.w - PILL.padX * 2}
          h={PILL.h - 8}
          offset={0.8}
          boxX={BP_X}
          boxY={BP_Y}
          boxW={PILL.w}
          boxH={PILL.h}
          boxRx={PILL.r}
          clipOffset={0.8}
        />
        <DimLabel x={BP_X + PILL.padX / 2} y={midY + 2} anchor="middle">
          14
        </DimLabel>
        <DimH x1={BP_X} x2={BP_X + PILL.w} y={BP_Y - 14} label={`${PILL.w}`} />
        <DimV x={BP_X - 12} y1={BP_Y} y2={BP_Y + PILL.h} label={`${PILL.h}`} />
        <DimLabel x={BP_X + PILL.w} y={BP_Y - 4} anchor="end">
          {`r${PILL.r}`}
        </DimLabel>
      </g>
    </Blueprint>
  )
}

const AN_PILL = { w: 320, h: 64, r: 20, padX: 26 } as const
const AN_ACTION = 44
const TX = 40
const TY = 60

function PillShape() {
  const spotlight = useSpotlight('pill')
  return (
    <rect
      x={0}
      y={0}
      width={AN_PILL.w}
      height={AN_PILL.h}
      rx={AN_PILL.r}
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
  const midY = AN_PILL.h / 2
  return (
    <text
      x={AN_PILL.padX}
      y={midY + 6}
      fontSize={22}
      fontWeight={600}
      fontFamily="var(--font-sans)"
      className={`fill-current tabular-nums ${spotlight.className}`}
      style={spotlight.style}
    >
      #1042
    </text>
  )
}

function StatusShape() {
  const spotlight = useSpotlight('status')
  const midY = AN_PILL.h / 2
  const x = AN_PILL.w - AN_PILL.padX - AN_ACTION * 2 - 8
  return (
    <g className={spotlight.className} style={spotlight.style}>
      <rect x={x} y={midY - AN_ACTION / 2} width={AN_ACTION} height={AN_ACTION} rx={10} fill="var(--pr-open-bg)" />
      <g stroke="var(--pr-open)" strokeWidth={2} strokeLinecap="round" fill="none">
        <circle cx={x + AN_ACTION / 2 - 5} cy={midY + 5} r={4} />
        <circle cx={x + AN_ACTION / 2 + 5} cy={midY - 5} r={4} />
        <path d={`M${x + AN_ACTION / 2} ${midY - 1}v-2`} />
      </g>
    </g>
  )
}

function CopyShape() {
  const spotlight = useSpotlight('copy')
  const midY = AN_PILL.h / 2
  const x = AN_PILL.w - AN_PILL.padX - AN_ACTION
  return (
    <g className={spotlight.className} style={spotlight.style}>
      <rect
        x={x}
        y={midY - AN_ACTION / 2}
        width={AN_ACTION}
        height={AN_ACTION}
        rx={10}
        fill="currentColor"
        fillOpacity={0.06}
      />
      <rect
        x={x + AN_ACTION / 2 - 7}
        y={midY - 6}
        width={14}
        height={14}
        rx={3}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
      />
    </g>
  )
}

function AnnotationsLayer() {
  const { hovered } = useAnatomy()
  const dimmed = hovered !== null
  return (
    <g
      style={{ pointerEvents: 'none', filter: dimmed ? 'url(#spotlight-blur)' : 'none' }}
      className={`transition-all duration-200 ease-out ${dimmed ? 'opacity-30' : 'opacity-100'}`}
    >
      <Selection x={0} y={0} w={AN_PILL.w} h={AN_PILL.h} />
      <DimH x1={0} x2={AN_PILL.w} y={-16} label={`${AN_PILL.w}`} />
      <DimV x={-14} y1={0} y2={AN_PILL.h} label={`${AN_PILL.h}`} labelXOffset={-6} />
      <DimLabel x={0} y={AN_PILL.h + 16} anchor="start">
        {`r${AN_PILL.r}`}
      </DimLabel>
    </g>
  )
}

function HoverTarget({
  part,
  x,
  y,
  w,
  h,
}: {
  part: string
  x: number
  y: number
  w: number
  h: number
}) {
  const { setHovered } = useAnatomy()
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      fill="transparent"
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
      onMouseEnter={() => setHovered(part)}
      onMouseLeave={() => setHovered(null)}
    />
  )
}

function OverlayLines() {
  const valueMidX = TX + AN_PILL.padX + 40
  const statusMidX = TX + AN_PILL.w - AN_PILL.padX - AN_ACTION * 1.5 - 8
  const copyMidX = TX + AN_PILL.w - AN_PILL.padX - AN_ACTION / 2
  return (
    <g strokeWidth="1" className="pointer-events-none">
      <OverlayLine id="pill" x1={TX + AN_PILL.w / 2} y1={TY} x2={TX + AN_PILL.w / 2} y2={TY - 40} />
      <OverlayLine id="value" x1={valueMidX} y1={TY + AN_PILL.h} x2={valueMidX} y2={TY + AN_PILL.h + 36} />
      <OverlayLine id="status" x1={statusMidX} y1={TY} x2={statusMidX} y2={TY - 40} />
      <OverlayLine id="copy" x1={copyMidX} y1={TY + AN_PILL.h} x2={copyMidX} y2={TY + AN_PILL.h + 36} />
    </g>
  )
}

function Tags() {
  const valueMidX = TX + AN_PILL.padX + 40
  const statusMidX = TX + AN_PILL.w - AN_PILL.padX - AN_ACTION * 1.5 - 8
  const copyMidX = TX + AN_PILL.w - AN_PILL.padX - AN_ACTION / 2
  return (
    <>
      <foreignObject
        x={TX + AN_PILL.w / 2 - 45}
        y={TY - 40 - 24}
        width={90}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="pill" label="Pill" className="items-end justify-center" isAccent />
      </foreignObject>
      <foreignObject
        x={valueMidX - 55}
        y={TY + AN_PILL.h + 36}
        width={110}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="value" label="Value (reel)" className="items-start justify-center" />
      </foreignObject>
      <foreignObject
        x={statusMidX - 55}
        y={TY - 40 - 24}
        width={110}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="status" label="Status badge" className="items-end justify-center" />
      </foreignObject>
      <foreignObject
        x={copyMidX - 45}
        y={TY + AN_PILL.h + 36}
        width={90}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="copy" label="Copy" className="items-start justify-center" />
      </foreignObject>
    </>
  )
}

export function IdReelAnatomy() {
  const midY = AN_PILL.h / 2
  const statusX = AN_PILL.w - AN_PILL.padX - AN_ACTION * 2 - 8
  const copyX = AN_PILL.w - AN_PILL.padX - AN_ACTION
  return (
    <AnatomyFrame viewBox="-20 -60 440 260" maxWidthClassName="max-w-xl">
      <g transform={`translate(${TX}, ${TY})`}>
        <PillShape />
        <ValueShape />
        <StatusShape />
        <CopyShape />
        <HoverTarget part="pill" x={0} y={0} w={AN_PILL.padX} h={AN_PILL.h} />
        <HoverTarget part="value" x={AN_PILL.padX} y={midY - 14} w={70} h={28} />
        <HoverTarget part="status" x={statusX} y={0} w={AN_ACTION} h={AN_PILL.h} />
        <HoverTarget part="copy" x={copyX} y={0} w={AN_ACTION} h={AN_PILL.h} />
        <AnnotationsLayer />
      </g>
      <OverlayLines />
      <Tags />
    </AnatomyFrame>
  )
}

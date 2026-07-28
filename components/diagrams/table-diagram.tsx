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

const TABLE = {
  colW: [62, 54, 58] as const,
  rowH: 24,
  pad: { x: 12, y: 8 },
  headerFont: 9,
  font: 8,
} as const

const TABLE_W = TABLE.colW.reduce((a, b) => a + b, 0)
const TABLE_H = TABLE.rowH * 3

const COL_X = TABLE.colW.reduce<number[]>((acc, w, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + TABLE.colW[i - 1])
  return acc
}, [])

const HEADERS = ['Name', 'Role', 'Status']
const ROW_1 = ['Ada', 'Eng', 'Active']
const ROW_2 = ['Alan', 'Res', 'Active']

const BODY_FILL = `${BP_MORPH} fill-transparent group-hover:fill-(--color-surface-2) group-focus-visible:fill-(--color-surface-2)`

const BP_X = (220 - TABLE_W) / 2
const BP_Y = (140 - TABLE_H) / 2

export function TableBlueprint() {
  const theme = blueprintTheme
  const row1Y = BP_Y + TABLE.rowH
  const row2Y = BP_Y + TABLE.rowH * 2
  const padCellX = BP_X + COL_X[0]
  const padCellY = row2Y

  return (
    <Blueprint>
      <g transform={`translate(${BP_X}, ${BP_Y})`}>
        {[row1Y, row2Y].map((y) => (
          <rect
            key={y}
            x={0}
            y={y - BP_Y}
            width={TABLE_W}
            height={TABLE.rowH}
            className={BODY_FILL}
          />
        ))}
        {HEADERS.map((label, i) => (
          <text
            key={label}
            x={COL_X[i] + TABLE.pad.x}
            y={TABLE.rowH / 2 + 3}
            fontSize={TABLE.headerFont}
            fontWeight={600}
            fontFamily="var(--font-sans)"
            className="fill-current"
          >
            {label}
          </text>
        ))}
        {ROW_1.map((label, i) => (
          <text
            key={label}
            x={COL_X[i] + TABLE.pad.x}
            y={TABLE.rowH + TABLE.rowH / 2 + 3}
            fontSize={TABLE.font}
            fontFamily="var(--font-sans)"
            className={BP_TEXT_SOFT}
          >
            {label}
          </text>
        ))}
        {ROW_2.map((label, i) => (
          <text
            key={label}
            x={COL_X[i] + TABLE.pad.x}
            y={TABLE.rowH * 2 + TABLE.rowH / 2 + 3}
            fontSize={TABLE.font}
            fontFamily="var(--font-sans)"
            className={BP_TEXT_SOFT}
          >
            {label}
          </text>
        ))}
        <g stroke="currentColor" strokeWidth={theme.wireframe.strokeWidth} strokeOpacity={0.4}>
          <line x1={0} y1={TABLE.rowH} x2={TABLE_W} y2={TABLE.rowH} />
          <line x1={0} y1={TABLE.rowH * 2} x2={TABLE_W} y2={TABLE.rowH * 2} />
          <line x1={0} y1={TABLE.rowH * 3} x2={TABLE_W} y2={TABLE.rowH * 3} />
        </g>
      </g>
      <g className={BP_HIDE_ON_MORPH}>
        <Selection x={BP_X} y={BP_Y} w={TABLE_W} h={TABLE_H} />
        <DimH x1={BP_X} x2={BP_X + TABLE_W} y={BP_Y - 14} label={`${TABLE_W}`} />
        <DimV x={BP_X - 12} y1={BP_Y} y2={BP_Y + TABLE_H} label={`${TABLE_H}`} />
        <PadGuide
          x={padCellX + TABLE.pad.x}
          y={padCellY + TABLE.pad.y}
          w={TABLE.colW[0] - TABLE.pad.x * 2}
          h={TABLE.rowH - TABLE.pad.y * 2}
          offset={0.8}
          boxX={padCellX}
          boxY={padCellY}
          boxW={TABLE.colW[0]}
          boxH={TABLE.rowH}
          clipOffset={0.8}
        />
        <DimLabel x={padCellX + TABLE.pad.x} y={padCellY + TABLE.rowH + 12} anchor="start">
          {`${TABLE.pad.x}`}
        </DimLabel>
        <DimLabel x={padCellX - 4} y={padCellY + TABLE.rowH / 2 + 2} anchor="end">
          {`${TABLE.pad.y}`}
        </DimLabel>
        <PadGuide
          x={padCellX + TABLE.pad.x}
          y={BP_Y + TABLE.pad.y}
          w={TABLE.colW[0] - TABLE.pad.x * 2}
          h={TABLE.rowH - TABLE.pad.y * 2}
          offset={0.8}
          boxX={padCellX}
          boxY={BP_Y}
          boxW={TABLE.colW[0]}
          boxH={TABLE.rowH}
          clipOffset={0.8}
        />
        <DimLabel x={padCellX - 4} y={BP_Y + TABLE.rowH / 2 + 2} anchor="end">
          {`${TABLE.pad.y}`}
        </DimLabel>
      </g>
    </Blueprint>
  )
}

const TX = 70
const TY = 56

function HeaderShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('header')
  return (
    <g
      onMouseEnter={() => setHovered('header')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={0}
        y={0}
        width={TABLE_W}
        height={TABLE.rowH}
        fill="currentColor"
        fillOpacity={0.08}
        className={spotlight.className}
        style={spotlight.style}
      />
      {HEADERS.map((label, i) => (
        <text
          key={label}
          x={COL_X[i] + TABLE.pad.x}
          y={TABLE.rowH / 2 + 3}
          fontSize={10}
          fontWeight={600}
          fontFamily="var(--font-sans)"
          className="fill-current"
        >
          {label}
        </text>
      ))}
    </g>
  )
}

function RowShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('row')
  const y = TABLE.rowH
  return (
    <g
      onMouseEnter={() => setHovered('row')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={0}
        y={y}
        width={TABLE_W}
        height={TABLE.rowH}
        fill="currentColor"
        fillOpacity={0.14}
        className={spotlight.className}
        style={spotlight.style}
      />
      {ROW_1.map((label, i) => (
        <text
          key={label}
          x={COL_X[i] + TABLE.pad.x}
          y={y + TABLE.rowH / 2 + 3}
          fontSize={9}
          fontFamily="var(--font-sans)"
          className="fill-current opacity-80"
        >
          {label}
        </text>
      ))}
    </g>
  )
}

function DividerShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('divider')
  return (
    <g
      onMouseEnter={() => setHovered('divider')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect x={0} y={TABLE.rowH - 6} width={TABLE_W} height={12} fill="transparent" />
      <line
        x1={0}
        y1={TABLE.rowH}
        x2={TABLE_W}
        y2={TABLE.rowH}
        stroke="currentColor"
        strokeWidth={1.5}
        className={spotlight.className}
        style={spotlight.style}
      />
      {ROW_2.map((label, i) => (
        <text
          key={label}
          x={COL_X[i] + TABLE.pad.x}
          y={TABLE.rowH * 2 + TABLE.rowH / 2 + 3}
          fontSize={9}
          fontFamily="var(--font-sans)"
          className="fill-current opacity-60"
        >
          {label}
        </text>
      ))}
    </g>
  )
}

function CellShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('cell')
  const x = 0
  const y = TABLE.rowH * 2
  return (
    <g
      onMouseEnter={() => setHovered('cell')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={x}
        y={y}
        width={TABLE.colW[0]}
        height={TABLE.rowH}
        fill="currentColor"
        fillOpacity={0.05}
        className={spotlight.className}
        style={spotlight.style}
      />
    </g>
  )
}

function AnnotationsLayer() {
  const { hovered } = useAnatomy()
  const dimmed = hovered !== null
  const cellY = TABLE.rowH * 2
  return (
    <g
      style={{ pointerEvents: 'none', filter: dimmed ? 'url(#spotlight-blur)' : 'none' }}
      className={`transition-[opacity,filter] duration-(--motion-dur-base) ease-(--motion-ease-in-out) motion-reduce:transition-none motion-reduce:filter-none ${dimmed ? 'opacity-30' : 'opacity-100'}`}
    >
      <Selection x={0} y={0} w={TABLE_W} h={TABLE_H} />
      <DimH x1={0} x2={TABLE_W} y={-14} label={`${TABLE_W}`} />
      <DimV x={-12} y1={0} y2={TABLE_H} label={`${TABLE_H}`} labelXOffset={-6} />
      <PadGuide
        x={TABLE.pad.x}
        y={cellY + TABLE.pad.y}
        w={TABLE.colW[0] - TABLE.pad.x * 2}
        h={TABLE.rowH - TABLE.pad.y * 2}
        offset={0.8}
        boxX={0}
        boxY={cellY}
        boxW={TABLE.colW[0]}
        boxH={TABLE.rowH}
        clipOffset={0.8}
      />
      <DimLabel x={TABLE.pad.x} y={cellY + TABLE.rowH + 12} anchor="start">
        {`${TABLE.pad.x}`}
      </DimLabel>
      <DimLabel x={-4} y={cellY + TABLE.rowH / 2 + 2} anchor="end">
        {`${TABLE.pad.y}`}
      </DimLabel>
    </g>
  )
}

function OverlayLines() {
  const headerMidX = TX + TABLE_W / 2
  const rowRightX = TX + TABLE_W
  const rowMidY = TY + TABLE.rowH + TABLE.pad.y
  const dividerLeftX = TX
  const dividerY = TY + TABLE.rowH
  const cellMidX = TX + TABLE.colW[0] / 2
  const cellBottomY = TY + TABLE.rowH * 3
  return (
    <g strokeWidth="1" className="pointer-events-none">
      <OverlayLine id="header" x1={headerMidX} y1={TY} x2={headerMidX} y2={TY - 40} />
      <OverlayLine id="row" x1={rowRightX} y1={rowMidY} x2={rowRightX + 36} y2={rowMidY} />
      <OverlayLine
        id="divider"
        x1={dividerLeftX}
        y1={dividerY}
        x2={dividerLeftX - 36}
        y2={dividerY}
      />
      <OverlayLine id="cell" x1={cellMidX} y1={cellBottomY} x2={cellMidX} y2={cellBottomY + 36} />
    </g>
  )
}

function Tags() {
  const headerMidX = TX + TABLE_W / 2
  const rowRightX = TX + TABLE_W
  const rowMidY = TY + TABLE.rowH + TABLE.pad.y
  const dividerLeftX = TX
  const dividerY = TY + TABLE.rowH
  const cellMidX = TX + TABLE.colW[0] / 2
  const cellBottomY = TY + TABLE.rowH * 3
  return (
    <>
      <foreignObject
        x={headerMidX - 45}
        y={TY - 40 - 24}
        width={90}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="header" label="Header" className="items-end justify-center" isAccent />
      </foreignObject>
      <foreignObject
        x={rowRightX + 36}
        y={rowMidY - 12}
        width={110}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="row" label="Row (hover)" className="items-center justify-start" />
      </foreignObject>
      <foreignObject
        x={dividerLeftX - 36 - 90}
        y={dividerY - 12}
        width={90}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="divider" label="Divider" className="items-center justify-end" />
      </foreignObject>
      <foreignObject
        x={cellMidX - 55}
        y={cellBottomY + 36}
        width={110}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="cell" label="Cell padding" className="items-start justify-center" />
      </foreignObject>
    </>
  )
}

export function TableAnatomy() {
  return (
    <AnatomyFrame viewBox="-72 -24 478 228" maxWidthClassName="max-w-[574px]">
      <g transform={`translate(${TX}, ${TY})`}>
        <HeaderShape />
        <RowShape />
        <DividerShape />
        <CellShape />
        <AnnotationsLayer />
      </g>
      <OverlayLines />
      <Tags />
    </AnatomyFrame>
  )
}

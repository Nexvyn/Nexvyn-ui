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
  BP_TEXT_SOFT,
  blueprintTheme,
  DimH,
  DimLabel,
  DimV,
  PadGuide,
  Selection,
} from '@/components/diagrams/lib/parts'

const BP_MORPH_OPACITY =
  'transition-opacity duration-(--motion-dur-showcase) ease-(--motion-ease-in-out) motion-reduce:transition-none'

const CM = {
  panelW: 150,
  panelRx: 6,
  panelPad: 5,
  itemH: 18,
  itemRx: 4,
  itemPadX: 10,
  sepMarginY: 3,
} as const

const CM_ITEM_LABELS = ['Copy', 'Rename', 'Delete'] as const
const CM_ITEM_Y = [CM.panelPad, CM.panelPad + CM.itemH] as const
const CM_SEP_Y = CM_ITEM_Y[1] + CM.itemH + CM.sepMarginY
const CM_ITEM2_Y = CM_SEP_Y + CM.sepMarginY + 1
const CM_PANEL_H = CM_ITEM2_Y + CM.itemH + CM.panelPad

const BP_PANEL = { x: 56, y: 30, w: CM.panelW, h: CM_PANEL_H, rx: CM.panelRx } as const
const BP_ITEM_Y = [
  BP_PANEL.y + CM_ITEM_Y[0],
  BP_PANEL.y + CM_ITEM_Y[1],
  BP_PANEL.y + CM_ITEM2_Y,
] as const
const BP_SEP_Y = BP_PANEL.y + CM_SEP_Y
const BP_ORIGIN = { x: BP_PANEL.x - 22, y: BP_PANEL.y + BP_PANEL.h - 12 } as const

export function ContextMenuBlueprint() {
  const theme = blueprintTheme
  return (
    <Blueprint>
      <rect
        x={12}
        y={BP_PANEL.y + 10}
        width={40}
        height={BP_PANEL.h - 20}
        rx={4}
        strokeWidth={theme.wireframe.strokeWidth * 0.6}
        strokeOpacity={theme.wireframe.strokeOpacity * 0.25}
        strokeDasharray="2 2"
        className={BP_HIDE_ON_MORPH}
      />
      <circle
        cx={BP_ORIGIN.x}
        cy={BP_ORIGIN.y}
        r={2.5}
        fill="var(--bp-accent, var(--color-accent))"
        className={BP_MORPH_OPACITY}
      />
      <line
        x1={BP_ORIGIN.x}
        y1={BP_ORIGIN.y}
        x2={BP_PANEL.x}
        y2={BP_PANEL.y + BP_PANEL.h}
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={0.75}
        strokeDasharray="2 2"
        className={`${BP_HIDE_ON_MORPH} opacity-60`}
      />
      <g
        style={{ transformOrigin: `${BP_PANEL.x}px ${BP_PANEL.y + BP_PANEL.h}px` }}
        className="scale-95 opacity-85 transition-[transform,opacity] duration-(--motion-dur-showcase) ease-(--motion-ease-in-out) group-hover:scale-100 group-hover:-translate-y-[6px] group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:-translate-y-[6px] group-focus-visible:opacity-100 motion-reduce:transition-none motion-reduce:transform-none"
      >
        <rect
          x={BP_PANEL.x}
          y={BP_PANEL.y}
          width={BP_PANEL.w}
          height={BP_PANEL.h}
          rx={BP_PANEL.rx}
          strokeWidth={theme.wireframe.strokeWidth}
          strokeOpacity={theme.wireframe.strokeOpacity}
          className={BP_FILL_PANEL}
        />
        {CM_ITEM_LABELS.map((label, i) => (
          <g key={label}>
            <rect
              x={BP_PANEL.x + 4}
              y={BP_ITEM_Y[i]}
              width={BP_PANEL.w - 8}
              height={CM.itemH}
              rx={CM.itemRx}
              strokeWidth={theme.wireframe.strokeWidth * 0.5}
              strokeOpacity={theme.wireframe.strokeOpacity * 0.3}
              className={BP_HIDE_ON_MORPH}
            />
            <text
              x={BP_PANEL.x + CM.itemPadX}
              y={BP_ITEM_Y[i] + CM.itemH / 2 + 3.5}
              fontSize={9}
              fontFamily="var(--font-sans)"
              className={BP_TEXT_SOFT}
            >
              {label}
            </text>
          </g>
        ))}
        <text
          x={BP_PANEL.x + BP_PANEL.w - 8}
          y={BP_ITEM_Y[0] + CM.itemH / 2 + 3.5}
          textAnchor="end"
          fontSize={8}
          fontFamily="var(--font-mono)"
          className={`${BP_TEXT_SOFT} opacity-60`}
        >
          ⌘C
        </text>
        <line
          x1={BP_PANEL.x + CM.itemPadX}
          y1={BP_SEP_Y}
          x2={BP_PANEL.x + BP_PANEL.w - CM.itemPadX}
          y2={BP_SEP_Y}
          stroke="currentColor"
          strokeWidth={0.5}
          opacity={theme.wireframe.strokeOpacity * 0.4}
          className={BP_HIDE_ON_MORPH}
        />
      </g>
      <g className={BP_HIDE_ON_MORPH}>
        <Selection x={BP_PANEL.x} y={BP_PANEL.y} w={BP_PANEL.w} h={BP_PANEL.h} />
        <DimH
          x1={BP_PANEL.x}
          x2={BP_PANEL.x + BP_PANEL.w}
          y={BP_PANEL.y - 12}
          label={`${BP_PANEL.w}`}
        />
        <DimV
          x={BP_PANEL.x - 12}
          y1={BP_PANEL.y}
          y2={BP_PANEL.y + BP_PANEL.h}
          label={`${BP_PANEL.h}`}
        />
        <PadGuide
          x={BP_PANEL.x + CM.panelPad}
          y={BP_PANEL.y + CM.panelPad}
          w={BP_PANEL.w - CM.panelPad * 2}
          h={BP_PANEL.h - CM.panelPad * 2}
          offset={0.8}
          boxX={BP_PANEL.x}
          boxY={BP_PANEL.y}
          boxW={BP_PANEL.w}
          boxH={BP_PANEL.h}
          boxRx={BP_PANEL.rx}
          clipOffset={0.8}
        />
        <DimLabel
          x={BP_PANEL.x + CM.panelPad - 2}
          y={BP_PANEL.y + BP_PANEL.h / 2 + 2.5}
          anchor="end"
        >
          {`${CM.panelPad}`}
        </DimLabel>
      </g>
    </Blueprint>
  )
}

const AN = {
  panelW: 200,
  panelRx: 6,
  panelPad: 6,
  itemH: 44,
  itemRx: 4,
  itemPadX: 12,
  sepMarginY: 4,
} as const

const AN_ITEM0_Y = AN.panelPad
const AN_ITEM1_Y = AN_ITEM0_Y + AN.itemH
const AN_SEP_LINE_Y = AN_ITEM1_Y + AN.itemH + AN.sepMarginY
const AN_ITEM2_Y = AN_SEP_LINE_Y + 1 + AN.sepMarginY
const AN_PANEL_H = AN_ITEM2_Y + AN.itemH + AN.panelPad

const TX = 60
const TY = 20

function PanelShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('panel')
  return (
    <g
      onMouseEnter={() => setHovered('panel')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={0}
        y={0}
        width={AN.panelW}
        height={AN_PANEL_H}
        rx={AN.panelRx}
        stroke="currentColor"
        strokeWidth={blueprintTheme.wireframe.strokeWidth}
        fill="currentColor"
        fillOpacity={0.03}
        className={spotlight.className}
        style={spotlight.style}
      />
      <g className="pointer-events-none">
        <PadGuide
          x={AN.panelPad}
          y={AN.panelPad}
          w={AN.panelW - AN.panelPad * 2}
          h={AN_PANEL_H - AN.panelPad * 2}
          offset={0.8}
          boxX={0}
          boxY={0}
          boxW={AN.panelW}
          boxH={AN_PANEL_H}
          boxRx={AN.panelRx}
          clipOffset={0.8}
        />
        <DimLabel x={AN.panelPad - 2} y={AN_PANEL_H / 2 + 2.5} anchor="end">
          {`${AN.panelPad}`}
        </DimLabel>
        <DimLabel x={AN.panelW - AN.panelPad + 2} y={AN_PANEL_H / 2 + 2.5} anchor="start">
          {`${AN.panelPad}`}
        </DimLabel>
        <DimLabel x={AN.panelW / 2} y={AN.panelPad - 3} anchor="middle">
          {`${AN.panelPad}`}
        </DimLabel>
        <DimLabel x={AN.panelW / 2} y={AN_PANEL_H - AN.panelPad + 9} anchor="middle">
          {`${AN.panelPad}`}
        </DimLabel>
      </g>
    </g>
  )
}

function ItemShape({
  y,
  label,
  id,
  destructive,
}: {
  y: number
  label: string
  id: string
  destructive?: boolean
}) {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight(id)
  return (
    <g
      onMouseEnter={() => setHovered(id)}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={AN.panelPad}
        y={y}
        width={AN.panelW - AN.panelPad * 2}
        height={AN.itemH}
        rx={AN.itemRx}
        fill="currentColor"
        fillOpacity={0.06}
        className={spotlight.className}
        style={spotlight.style}
      />
      <text
        x={AN.panelPad + AN.itemPadX}
        y={y + AN.itemH / 2 + 4}
        fontSize={13}
        fontFamily="var(--font-sans)"
        className={`fill-current ${spotlight.className} ${destructive ? 'opacity-80' : ''}`}
      >
        {label}
      </text>
    </g>
  )
}

function ShortcutShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('shortcut')
  const y = AN_ITEM0_Y
  const kbdW = 30
  const kbdH = 16
  const kbdX = AN.panelW - AN.panelPad - AN.itemPadX - kbdW
  const kbdY = y + AN.itemH / 2 - kbdH / 2
  return (
    <g
      onMouseEnter={() => setHovered('shortcut')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={kbdX}
        y={kbdY}
        width={kbdW}
        height={kbdH}
        rx={3}
        stroke="currentColor"
        strokeWidth={1}
        fill="currentColor"
        fillOpacity={0.04}
        className={spotlight.className}
        style={spotlight.style}
      />
      <text
        x={kbdX + kbdW / 2}
        y={kbdY + kbdH / 2 + 3.5}
        textAnchor="middle"
        fontSize={9}
        fontFamily="var(--font-mono)"
        className={`fill-current ${spotlight.className}`}
      >
        ⌘C
      </text>
    </g>
  )
}

function SeparatorShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('separator')
  return (
    <g
      onMouseEnter={() => setHovered('separator')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <line
        x1={AN.panelPad}
        y1={AN_SEP_LINE_Y}
        x2={AN.panelW - AN.panelPad}
        y2={AN_SEP_LINE_Y}
        stroke="currentColor"
        strokeWidth={1.5}
        className={`opacity-40 ${spotlight.className}`}
        style={spotlight.style}
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
      className={`transition-[opacity,filter] duration-(--motion-dur-base) ease-(--motion-ease-in-out) motion-reduce:transition-none motion-reduce:filter-none ${dimmed ? 'opacity-30' : 'opacity-100'}`}
    >
      <Selection x={0} y={0} w={AN.panelW} h={AN_PANEL_H} />
      <DimH x1={0} x2={AN.panelW} y={-14} label={`${AN.panelW}`} />
      <DimV x={-12} y1={0} y2={AN_PANEL_H} label={`${AN_PANEL_H}`} labelXOffset={-6} />
    </g>
  )
}

function OverlayLines() {
  const panelMidX = TX + AN.panelW / 2
  const panelTop = TY
  const rightEdge = TX + (AN.panelW - AN.panelPad)
  const item0MidY = TY + AN_ITEM0_Y + AN.itemH / 2
  const item1MidY = TY + AN_ITEM1_Y + AN.itemH / 2
  const sepMidY = TY + AN_SEP_LINE_Y
  const item2MidY = TY + AN_ITEM2_Y + AN.itemH / 2
  return (
    <g strokeWidth="1" className="pointer-events-none">
      <OverlayLine id="panel" x1={panelMidX} y1={panelTop} x2={panelMidX} y2={panelTop - 12} />
      <OverlayLine id="shortcut" x1={rightEdge} y1={item0MidY} x2={rightEdge + 26} y2={item0MidY} />
      <OverlayLine id="item" x1={rightEdge} y1={item1MidY} x2={rightEdge + 26} y2={item1MidY} />
      <OverlayLine id="separator" x1={rightEdge} y1={sepMidY} x2={rightEdge + 26} y2={sepMidY} />
      <OverlayLine
        id="destructive"
        x1={rightEdge}
        y1={item2MidY}
        x2={rightEdge + 26}
        y2={item2MidY}
      />
    </g>
  )
}

function Tags() {
  const panelMidX = TX + AN.panelW / 2
  const panelTop = TY
  const rightEdge = TX + (AN.panelW - AN.panelPad)
  const item0MidY = TY + AN_ITEM0_Y + AN.itemH / 2
  const item1MidY = TY + AN_ITEM1_Y + AN.itemH / 2
  const sepMidY = TY + AN_SEP_LINE_Y
  const item2MidY = TY + AN_ITEM2_Y + AN.itemH / 2
  const tagX = rightEdge + 26
  return (
    <>
      <foreignObject
        x={panelMidX - 60}
        y={panelTop - 12 - 24}
        width={120}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="panel" label="Panel" className="items-end justify-center" isAccent />
      </foreignObject>
      <foreignObject
        x={tagX}
        y={item0MidY - 12}
        width={100}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="shortcut" label="Shortcut" className="items-center justify-start" />
      </foreignObject>
      <foreignObject
        x={tagX}
        y={item1MidY - 12}
        width={80}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="item" label="Item" className="items-center justify-start" />
      </foreignObject>
      <foreignObject
        x={tagX}
        y={sepMidY - 12}
        width={100}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="separator" label="Separator" className="items-center justify-start" />
      </foreignObject>
      <foreignObject
        x={tagX}
        y={item2MidY - 12}
        width={110}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part="destructive"
          label="Destructive item"
          className="items-center justify-start"
        />
      </foreignObject>
    </>
  )
}

export function ContextMenuAnatomy() {
  return (
    <AnatomyFrame viewBox="-30 -50 460 260" maxWidthClassName="max-w-xl">
      <g transform={`translate(${TX}, ${TY})`}>
        <PanelShape />
        <ItemShape y={AN_ITEM0_Y} label="Copy" id="item" />
        <ShortcutShape />
        <ItemShape y={AN_ITEM1_Y} label="Rename" id="item" />
        <SeparatorShape />
        <ItemShape y={AN_ITEM2_Y} label="Delete" id="destructive" destructive />
        <AnnotationsLayer />
      </g>
      <OverlayLines />
      <Tags />
    </AnatomyFrame>
  )
}

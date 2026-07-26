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

const BP = {
  triggerR: 15,
  triggerCx: 22,
  panelX: 54,
  panelY: 14,
  panelW: 150,
  panelPad: 5,
  itemH: 22,
  itemGap: 0,
  itemRx: 3,
} as const

const BP_PANEL_H = BP.panelPad * 2 + BP.itemH * 3
const BP_TRIGGER_CY = BP.panelY + BP_PANEL_H / 2

const BP_ITEM_LABELS = ['Dashboard', 'Automations', 'Settings'] as const

export function MorphNavBlueprint() {
  const theme = blueprintTheme
  const itemsX = BP.panelX + BP.panelPad
  const itemsW = BP.panelW - BP.panelPad * 2
  const item0Y = BP.panelY + BP.panelPad
  const item1Y = item0Y + BP.itemH
  const item2Y = item1Y + BP.itemH

  return (
    <Blueprint>
      <circle
        cx={BP.triggerCx}
        cy={BP_TRIGGER_CY}
        r={BP.triggerR}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        className={BP_FILL_SOLID}
      />
      <g
        stroke="var(--color-bg)"
        strokeWidth={1.4}
        strokeLinecap="round"
        className="opacity-0 transition-opacity duration-(--motion-dur-showcase) ease-(--motion-ease-in-out) group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
      >
        <line
          x1={BP.triggerCx - 6}
          y1={BP_TRIGGER_CY - 4}
          x2={BP.triggerCx + 6}
          y2={BP_TRIGGER_CY - 4}
        />
        <line x1={BP.triggerCx - 6} y1={BP_TRIGGER_CY} x2={BP.triggerCx + 6} y2={BP_TRIGGER_CY} />
        <line
          x1={BP.triggerCx - 6}
          y1={BP_TRIGGER_CY + 4}
          x2={BP.triggerCx + 6}
          y2={BP_TRIGGER_CY + 4}
        />
      </g>
      <g
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        className="opacity-70 transition-opacity duration-(--motion-dur-showcase) ease-(--motion-ease-in-out) group-hover:opacity-0 group-focus-visible:opacity-0 motion-reduce:transition-none"
      >
        <line
          x1={BP.triggerCx - 6}
          y1={BP_TRIGGER_CY - 4}
          x2={BP.triggerCx + 6}
          y2={BP_TRIGGER_CY - 4}
        />
        <line x1={BP.triggerCx - 6} y1={BP_TRIGGER_CY} x2={BP.triggerCx + 6} y2={BP_TRIGGER_CY} />
        <line
          x1={BP.triggerCx - 6}
          y1={BP_TRIGGER_CY + 4}
          x2={BP.triggerCx + 6}
          y2={BP_TRIGGER_CY + 4}
        />
      </g>

      <rect
        x={BP.panelX}
        y={BP.panelY}
        width={BP.panelW}
        height={BP_PANEL_H}
        rx={5}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        className={BP_FILL_PANEL}
      />

      {BP_ITEM_LABELS.map((label, i) => {
        const y = [item0Y, item1Y, item2Y][i]
        return (
          <g key={label}>
            <rect
              x={itemsX}
              y={y}
              width={itemsW}
              height={BP.itemH}
              rx={BP.itemRx}
              fill="currentColor"
              fillOpacity={0.08}
              className={BP_HIDE_ON_MORPH}
            />
            <text
              x={itemsX + 8}
              y={y + BP.itemH / 2 + 3.5}
              fontSize={9}
              fontFamily="var(--font-sans)"
              className={BP_TEXT_SOFT}
            >
              {label}
            </text>
            {i === 1 && (
              <path
                d={`M ${itemsX + itemsW - 12} ${y + BP.itemH / 2 - 3} l 4 3 l -4 3`}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={BP_TEXT_SOFT}
              />
            )}
          </g>
        )
      })}

      <g className={BP_HIDE_ON_MORPH}>
        <Selection x={BP.panelX} y={BP.panelY} w={BP.panelW} h={BP_PANEL_H} />
        <DimH x1={BP.panelX} x2={BP.panelX + BP.panelW} y={BP.panelY - 10} label={`${BP.panelW}`} />
        <DimV
          x={BP.panelX - 10}
          y1={BP.panelY}
          y2={BP.panelY + BP_PANEL_H}
          label={`${BP_PANEL_H}`}
        />
        <PadGuide
          x={itemsX}
          y={item0Y}
          w={itemsW}
          h={item2Y + BP.itemH - item0Y}
          offset={0.8}
          boxX={BP.panelX}
          boxY={BP.panelY}
          boxW={BP.panelW}
          boxH={BP_PANEL_H}
          boxRx={5}
          clipOffset={0.8}
        />
        <DimLabel x={BP.panelX + BP.panelPad / 2} y={BP.panelY + BP.panelPad + 8} anchor="middle">
          {`${BP.panelPad}`}
        </DimLabel>
        <DimLabel x={BP.triggerCx} y={BP_TRIGGER_CY + BP.triggerR + 12} anchor="middle">
          {`r${BP.triggerR}`}
        </DimLabel>
      </g>
    </Blueprint>
  )
}

const MN = {
  triggerSize: 44,
  panelW: 192,
  panelPad: 6,
  panelRadius: 6,
  itemH: 44,
  itemPadX: 12,
  itemGap: 12,
  chevronSize: 14,
} as const

const PANEL_H = MN.panelPad * 2 + MN.itemH * 3
const TRIGGER_CX = MN.triggerSize / 2
const TRIGGER_CY = PANEL_H / 2
const PANEL_X = MN.triggerSize + MN.itemGap * 2
const PANEL_Y = 0
const ITEM_Y = [0, 1, 2].map((i) => PANEL_Y + MN.panelPad + i * MN.itemH)

function TriggerShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('trigger')
  return (
    <g
      onMouseEnter={() => setHovered('trigger')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <circle
        cx={TRIGGER_CX}
        cy={TRIGGER_CY}
        r={MN.triggerSize / 2}
        fill="currentColor"
        fillOpacity={0.9}
        className={spotlight.className}
        style={spotlight.style}
      />
      <g stroke="var(--color-bg)" strokeWidth={1.6} strokeLinecap="round" className="opacity-90">
        <line x1={TRIGGER_CX - 6} y1={TRIGGER_CY - 5} x2={TRIGGER_CX + 6} y2={TRIGGER_CY - 5} />
        <line x1={TRIGGER_CX - 6} y1={TRIGGER_CY} x2={TRIGGER_CX + 6} y2={TRIGGER_CY} />
        <line x1={TRIGGER_CX - 6} y1={TRIGGER_CY + 5} x2={TRIGGER_CX + 6} y2={TRIGGER_CY + 5} />
      </g>
    </g>
  )
}

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
        x={PANEL_X}
        y={PANEL_Y}
        width={MN.panelW}
        height={PANEL_H}
        rx={MN.panelRadius}
        stroke="currentColor"
        strokeWidth={1}
        fill="transparent"
        className={spotlight.className}
        style={spotlight.style}
      />
    </g>
  )
}

function ItemShape({
  y,
  label,
  id,
  hasChildren,
}: {
  y: number
  label: string
  id: string
  hasChildren?: boolean
}) {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight(id)
  const x = PANEL_X + MN.itemPadX
  const midY = y + MN.itemH / 2
  return (
    <g
      onMouseEnter={() => setHovered(id)}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={PANEL_X + MN.panelPad}
        y={y}
        width={MN.panelW - MN.panelPad * 2}
        height={MN.itemH}
        fill="transparent"
      />
      <text
        x={x}
        y={midY + 4}
        fontSize={13}
        fontFamily="var(--font-sans)"
        className={`fill-current ${spotlight.className}`}
      >
        {label}
      </text>
      {hasChildren && <ChevronGlyph midY={midY} />}
    </g>
  )
}

function ChevronGlyph({ midY }: { midY: number }) {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('chevron')
  const cx = PANEL_X + MN.panelW - MN.panelPad - MN.chevronSize
  return (
    <g
      onMouseEnter={() => setHovered('chevron')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <path
        d={`M ${cx} ${midY - 4} l 4 4 l -4 4`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={spotlight.className}
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
      className={`transition-all duration-200 ease-out ${dimmed ? 'opacity-30' : 'opacity-100'}`}
    >
      <Selection x={PANEL_X} y={PANEL_Y} w={MN.panelW} h={PANEL_H} />
      <DimH x1={PANEL_X} x2={PANEL_X + MN.panelW} y={PANEL_Y - 14} label={`${MN.panelW}`} />
      <DimV x={PANEL_X - 12} y1={PANEL_Y} y2={PANEL_Y + PANEL_H} label={`${PANEL_H}`} />
      <PadGuide
        x={PANEL_X + MN.panelPad}
        y={PANEL_Y + MN.panelPad}
        w={MN.panelW - MN.panelPad * 2}
        h={PANEL_H - MN.panelPad * 2}
        offset={0.8}
        boxX={PANEL_X}
        boxY={PANEL_Y}
        boxW={MN.panelW}
        boxH={PANEL_H}
        boxRx={MN.panelRadius}
        clipOffset={0.8}
      />
      <DimLabel x={PANEL_X + MN.panelPad / 2} y={PANEL_Y + MN.panelPad + 10} anchor="middle">
        {`${MN.panelPad}`}
      </DimLabel>
      <Selection
        x={TRIGGER_CX - MN.triggerSize / 2}
        y={TRIGGER_CY - MN.triggerSize / 2}
        w={MN.triggerSize}
        h={MN.triggerSize}
      />
    </g>
  )
}

function OverlayLines() {
  const triggerTop = TRIGGER_CY - MN.triggerSize / 2
  const panelTop = PANEL_Y
  const item0MidY = ITEM_Y[0] + MN.itemH / 2
  const item1MidY = ITEM_Y[1] + MN.itemH / 2
  const item2MidY = ITEM_Y[2] + MN.itemH / 2
  const chevronCx = PANEL_X + MN.panelW - MN.panelPad - MN.chevronSize + 2
  return (
    <g strokeWidth="1" className="pointer-events-none">
      <OverlayLine
        id="trigger"
        x1={TRIGGER_CX}
        y1={triggerTop}
        x2={TRIGGER_CX}
        y2={triggerTop - 26}
      />
      <OverlayLine
        id="panel"
        x1={PANEL_X + MN.panelW}
        y1={panelTop}
        x2={PANEL_X + MN.panelW}
        y2={panelTop - 26}
      />
      <OverlayLine
        id="item-1"
        x1={PANEL_X + MN.panelW}
        y1={item0MidY}
        x2={PANEL_X + MN.panelW + 30}
        y2={item0MidY}
      />
      <OverlayLine
        id="item-2"
        x1={PANEL_X + MN.panelW}
        y1={item1MidY}
        x2={PANEL_X + MN.panelW + 30}
        y2={item1MidY}
      />
      <OverlayLine
        id="item-3"
        x1={PANEL_X + MN.panelW}
        y1={item2MidY}
        x2={PANEL_X + MN.panelW + 30}
        y2={item2MidY}
      />
      <OverlayLine id="chevron" x1={chevronCx} y1={item1MidY} x2={chevronCx} y2={item1MidY - 30} />
    </g>
  )
}

function Tags() {
  const triggerTop = TRIGGER_CY - MN.triggerSize / 2
  const panelTop = PANEL_Y
  const item0MidY = ITEM_Y[0] + MN.itemH / 2
  const item1MidY = ITEM_Y[1] + MN.itemH / 2
  const item2MidY = ITEM_Y[2] + MN.itemH / 2
  const chevronCx = PANEL_X + MN.panelW - MN.panelPad - MN.chevronSize + 2
  const tagX = PANEL_X + MN.panelW + 30
  return (
    <>
      <foreignObject
        x={TRIGGER_CX - 55}
        y={triggerTop - 26 - 24}
        width={110}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="trigger" label="Trigger" className="items-end justify-center" isAccent />
      </foreignObject>
      <foreignObject
        x={PANEL_X + MN.panelW - 45}
        y={panelTop - 26 - 24}
        width={90}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="panel" label="Panel" className="items-end justify-center" />
      </foreignObject>
      <foreignObject
        x={tagX}
        y={item0MidY - 12}
        width={110}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="item-1" label="MorphNavItem" className="items-center justify-start" />
      </foreignObject>
      <foreignObject
        x={tagX}
        y={item1MidY - 12}
        width={140}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part="item-2"
          label="Item (has children)"
          className="items-center justify-start"
        />
      </foreignObject>
      <foreignObject
        x={tagX}
        y={item2MidY - 12}
        width={110}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="item-3" label="MorphNavItem" className="items-center justify-start" />
      </foreignObject>
      <foreignObject
        x={chevronCx - 55}
        y={item1MidY - 30 - 24}
        width={110}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="chevron" label="Submenu chevron" className="items-end justify-center" />
      </foreignObject>
    </>
  )
}

export function MorphNavAnatomy() {
  return (
    <AnatomyFrame viewBox="-70 -70 520 280" maxWidthClassName="max-w-xl">
      <TriggerShape />
      <PanelShape />
      <ItemShape y={ITEM_Y[0]} label="Dashboard" id="item-1" />
      <ItemShape y={ITEM_Y[1]} label="Automations" id="item-2" hasChildren />
      <ItemShape y={ITEM_Y[2]} label="Settings" id="item-3" />
      <AnnotationsLayer />
      <OverlayLines />
      <Tags />
    </AnatomyFrame>
  )
}

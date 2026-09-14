'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset, licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root LICENSE.

import {
  AnatomyCallout,
  AnatomyFrame,
  useAnatomy,
  useSpotlight,
} from '@/components/diagrams/lib/anatomy-parts'
import {
  DraftSurface,
  DRAFT_FILL_PANEL,
  DRAFT_SCAFFOLD_FADE,
  DRAFT_INK_MORPH,
  DRAFT_TEXT_SOFT,
  draftTheme,
  MeasureH,
  MeasureNote,
  MeasureV,
  InsetGuide,
  GripFrame,
  beat,
  DRAFT_BEAT,
  DRAFT_DETAIL_BEAT,
  DRAFT_LABEL_BEAT,
  stampBeat,
} from '@/components/diagrams/lib/diagram-parts'

const DM = {
  scale: 0.55,
  width: 224,
  triggerH: 44,
  triggerRx: 4,
  triggerPadX: 16,
  triggerPadY: 12,
  chevron: 16,
  sideOffset: 8,
  panelRx: 4,
  border: 1,
  panelPad: 6,
  itemH: 44,
  itemRx: 4,
  itemPadX: 12,
  sepMarginY: 4,
  font: 14,
} as const

const ITEM_LABELS = ['Edit', 'Duplicate', 'Delete'] as const
const DM_INSET = DM.border + DM.panelPad
const DM_ITEM_Y = [
  DM_INSET,
  DM_INSET + DM.itemH,
  DM_INSET + DM.itemH * 2 + DM.sepMarginY * 2 + 1,
] as const
const DM_SEP_Y = DM_INSET + DM.itemH * 2 + DM.sepMarginY
const DM_PANEL_H = DM_ITEM_Y[2] + DM.itemH + DM_INSET

const S = DM.scale
const BP_DIM_LANE = 36
const BP_NOTE_LANE = 27
const BP_X = (220 - DM.width * S - BP_DIM_LANE - BP_NOTE_LANE) / 2 + BP_DIM_LANE
const BP_TRIGGER = {
  x: BP_X,
  y: 24,
  w: DM.width * S,
  h: DM.triggerH * S,
  rx: DM.triggerRx * S,
} as const
const BP_PANEL = {
  x: BP_X,
  y: BP_TRIGGER.y + BP_TRIGGER.h + DM.sideOffset * S,
  w: DM.width * S,
  h: DM_PANEL_H * S,
  rx: DM.panelRx * S,
} as const
const BP_INSET = DM_INSET * S
const BP_ITEM = {
  x: BP_PANEL.x + BP_INSET,
  w: BP_PANEL.w - BP_INSET * 2,
  h: DM.itemH * S,
  rx: DM.itemRx * S,
} as const
const BP_FONT = DM.font * S
const BP_ITEM_Y = DM_ITEM_Y.map((y) => BP_PANEL.y + y * S)
const BP_SEP_Y = BP_PANEL.y + DM_SEP_Y * S
const BP_CHEVRON = {
  size: DM.chevron * S,
  x: BP_TRIGGER.x + BP_TRIGGER.w - (DM.triggerPadX + DM.chevron) * S,
  y: BP_TRIGGER.y + (BP_TRIGGER.h - DM.chevron * S) / 2,
} as const
const BP_NOTE_X = BP_X - 15

function rowBaseline(rowY: number, rowH: number, font: number) {
  return rowY + rowH / 2 + font * 0.35
}

const BP_HIGHLIGHT =
  'transition-opacity duration-(--motion-dur-showcase) ease-(--motion-ease-in-out) motion-reduce:transition-none opacity-0 group-hover:opacity-10 group-hover:delay-(--motion-dur-slow) group-focus-visible:opacity-10 group-focus-visible:delay-(--motion-dur-slow)'

export function DropdownMenuBlueprint() {
  const theme = draftTheme
  return (
    <DraftSurface>
      <rect
        x={BP_PANEL.x}
        y={BP_PANEL.y}
        width={BP_PANEL.w}
        height={BP_PANEL.h}
        rx={BP_PANEL.rx}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        style={beat(DRAFT_DETAIL_BEAT.a)}
        className={`ink-draw ${DRAFT_FILL_PANEL}`}
      />
      <rect
        x={BP_ITEM.x}
        y={BP_ITEM_Y[0]}
        width={BP_ITEM.w}
        height={BP_ITEM.h}
        rx={BP_ITEM.rx}
        fill="currentColor"
        className={BP_HIGHLIGHT}
      />
      {ITEM_LABELS.map((label, i) => (
        <g key={label}>
          <rect
            x={BP_ITEM.x}
            y={BP_ITEM_Y[i]}
            width={BP_ITEM.w}
            height={BP_ITEM.h}
            rx={BP_ITEM.rx}
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1}
            stroke="currentColor"
            strokeWidth={theme.guide.strokeWidth}
            strokeOpacity={theme.wireframe.strokeOpacity * 0.3}
            style={beat(DRAFT_DETAIL_BEAT.c)}
            className={`ink-draw ${DRAFT_SCAFFOLD_FADE}`}
          />
          <text
            x={BP_ITEM.x + DM.itemPadX * S}
            y={rowBaseline(BP_ITEM_Y[i], BP_ITEM.h, BP_FONT)}
            fontSize={BP_FONT}
            fontFamily="var(--font-sans)"
            style={beat(`${400 + i * 70}ms`)}
            className={`fade-note ${DRAFT_TEXT_SOFT} ${
              label === 'Delete'
                ? 'group-hover:fill-(--color-error) group-focus-visible:fill-(--color-error)'
                : ''
            }`}
          >
            {label}
          </text>
        </g>
      ))}
      <line
        x1={BP_ITEM.x}
        y1={BP_SEP_Y}
        x2={BP_ITEM.x + BP_ITEM.w}
        y2={BP_SEP_Y}
        stroke="currentColor"
        strokeWidth={0.75}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        style={beat(DRAFT_DETAIL_BEAT.c)}
        className={`ink-draw ${DRAFT_INK_MORPH} opacity-40 group-hover:stroke-(--color-border) group-hover:opacity-100 group-focus-visible:stroke-(--color-border) group-focus-visible:opacity-100`}
      />
      <rect
        x={BP_TRIGGER.x}
        y={BP_TRIGGER.y}
        width={BP_TRIGGER.w}
        height={BP_TRIGGER.h}
        rx={BP_TRIGGER.rx}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        style={beat(DRAFT_BEAT.outline)}
        className={`ink-draw ${DRAFT_FILL_PANEL}`}
      />
      <text
        x={BP_TRIGGER.x + DM.triggerPadX * S}
        y={rowBaseline(BP_TRIGGER.y, BP_TRIGGER.h, BP_FONT)}
        fontSize={BP_FONT}
        fontFamily="var(--font-sans)"
        style={beat(DRAFT_LABEL_BEAT)}
        className={`fade-note ${DRAFT_TEXT_SOFT}`}
      >
        Actions
      </text>
      <g
        style={{
          transformOrigin: `${BP_CHEVRON.x + BP_CHEVRON.size / 2}px ${BP_CHEVRON.y + BP_CHEVRON.size / 2}px`,
        }}
        className="transition-transform duration-(--motion-dur-base) ease-(--motion-ease-out) group-hover:rotate-180 group-hover:delay-(--motion-dur-base) group-focus-visible:rotate-180 group-focus-visible:delay-(--motion-dur-base) motion-reduce:transition-none motion-reduce:transform-none"
      >
        <path
          d="m6 9 6 6 6-6"
          transform={`translate(${BP_CHEVRON.x} ${BP_CHEVRON.y}) scale(${BP_CHEVRON.size / 24})`}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="currentColor"
          fill="none"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1}
          style={beat(DRAFT_DETAIL_BEAT.a)}
          className={`ink-draw ${DRAFT_INK_MORPH} opacity-60 group-hover:stroke-(--color-muted) group-hover:opacity-100 group-focus-visible:stroke-(--color-muted) group-focus-visible:opacity-100`}
        />
      </g>
      <g className={DRAFT_SCAFFOLD_FADE}>
        <GripFrame
          x={BP_PANEL.x}
          y={BP_PANEL.y}
          w={BP_PANEL.w}
          h={BP_PANEL.h}
          style={beat(DRAFT_BEAT.handle)}
        />
        <InsetGuide
          x={BP_TRIGGER.x + DM.triggerPadX * S}
          y={BP_TRIGGER.y + DM.triggerPadY * S}
          w={BP_TRIGGER.w - DM.triggerPadX * 2 * S}
          h={BP_TRIGGER.h - DM.triggerPadY * 2 * S}
          offset={0.8}
          boxX={BP_TRIGGER.x}
          boxY={BP_TRIGGER.y}
          boxW={BP_TRIGGER.w}
          boxH={BP_TRIGGER.h}
          boxRx={BP_TRIGGER.rx}
          clipOffset={0.8}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <InsetGuide
          x={BP_PANEL.x + BP_INSET}
          y={BP_PANEL.y + BP_INSET}
          w={BP_PANEL.w - BP_INSET * 2}
          h={BP_PANEL.h - BP_INSET * 2}
          offset={0.8}
          boxX={BP_PANEL.x}
          boxY={BP_PANEL.y}
          boxW={BP_PANEL.w}
          boxH={BP_PANEL.h}
          boxRx={BP_PANEL.rx}
          clipOffset={0.8}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <MeasureV
          x={BP_X - 10}
          y1={BP_TRIGGER.y}
          y2={BP_TRIGGER.y + BP_TRIGGER.h}
          label={`${DM.triggerH}`}
          className="note-stamp"
          style={beat(stampBeat(0))}
        />
        <MeasureV
          x={BP_X - 10}
          y1={BP_TRIGGER.y + BP_TRIGGER.h}
          y2={BP_PANEL.y}
          label={`${DM.sideOffset}`}
          className="note-stamp"
          style={beat(stampBeat(1))}
        />
        <MeasureV
          x={BP_X - 10}
          y1={BP_ITEM_Y[0]}
          y2={BP_ITEM_Y[0] + BP_ITEM.h}
          label={`${DM.itemH}`}
          className="note-stamp"
          style={beat(stampBeat(2))}
        />
        <MeasureNote
          x={BP_NOTE_X}
          y={rowBaseline(BP_ITEM_Y[1], BP_ITEM.h, 7)}
          anchor="end"
          className="note-stamp"
          style={beat(stampBeat(3))}
        >
          {`p ${DM.panelPad}`}
        </MeasureNote>
        <MeasureNote
          x={BP_NOTE_X}
          y={rowBaseline(BP_ITEM_Y[2], BP_ITEM.h, 7)}
          anchor="end"
          className="note-stamp"
          style={beat(stampBeat(4))}
        >
          {`r${DM.panelRx}`}
        </MeasureNote>
        <MeasureH
          x1={BP_TRIGGER.x}
          x2={BP_TRIGGER.x + BP_TRIGGER.w}
          y={BP_TRIGGER.y - 8}
          label={`${DM.width}`}
          className="note-stamp"
          style={beat(stampBeat(5))}
        />
        <MeasureNote
          x={BP_TRIGGER.x + BP_TRIGGER.w + 6}
          y={BP_TRIGGER.y + BP_TRIGGER.h / 2 - 2}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(6))}
        >
          {`px ${DM.triggerPadX}`}
        </MeasureNote>
        <MeasureNote
          x={BP_TRIGGER.x + BP_TRIGGER.w + 6}
          y={BP_TRIGGER.y + BP_TRIGGER.h / 2 + 9}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(7))}
        >
          {`py ${DM.triggerPadY}`}
        </MeasureNote>
        <MeasureV
          x={BP_PANEL.x + BP_PANEL.w + 8}
          y1={BP_PANEL.y}
          y2={BP_PANEL.y + BP_PANEL.h}
          label={`${DM_PANEL_H}`}
          labelXOffset={5}
          labelAnchor="start"
          className="note-stamp"
          style={beat(stampBeat(8))}
        />
      </g>
    </DraftSurface>
  )
}

const AN = {
  width: 224,
  triggerH: 44,
  triggerRx: 4,
  triggerPadX: 16,
  triggerPadY: 12,
  chevron: 16,
  sideOffset: 8,
  panelRx: 4,
  border: 1,
  panelPad: 6,
  itemH: 44,
  itemRx: 4,
  itemPadX: 12,
  sepMarginY: 4,
  font: 14,
} as const

const AN_INSET = AN.border + AN.panelPad
const AN_ITEM_W = AN.width - AN_INSET * 2
const AN_PANEL_Y = AN.triggerH + AN.sideOffset
const AN_ITEM_Y = [AN_INSET, AN_INSET + AN.itemH] as const
const AN_SEP_LINE_Y = AN_ITEM_Y[1] + AN.itemH + AN.sepMarginY
const AN_ITEM2_Y = AN_SEP_LINE_Y + 1 + AN.sepMarginY
const AN_PANEL_H = AN_ITEM2_Y + AN.itemH + AN_INSET

const TX = 60
const TY = 20

function useEngaged(id: string) {
  const { hovered, pinned } = useAnatomy()
  return (hovered ?? pinned) === id
}

function TriggerShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('trigger')
  const active = useEngaged('trigger')
  const midY = AN.triggerH / 2
  const chevronX = AN.width - AN.triggerPadX - AN.chevron
  return (
    <g
      onMouseEnter={() => setHovered('trigger')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={0}
        y={0}
        width={AN.width}
        height={AN.triggerH}
        rx={AN.triggerRx}
        stroke="currentColor"
        strokeWidth={active ? 1.5 : draftTheme.wireframe.strokeWidth}
        fill="currentColor"
        fillOpacity={active ? 0.1 : 0.05}
        className={spotlight.className}
        style={spotlight.style}
      />
      <text
        x={AN.triggerPadX}
        y={midY + AN.font * 0.35}
        fontSize={AN.font}
        fontFamily="var(--font-sans)"
        className={`fill-current ${spotlight.className}`}
      >
        Actions
      </text>
      <path
        d={`M${chevronX + 4} ${midY - 2} l4 4 l4 -4`}
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className={`opacity-60 ${spotlight.className}`}
      />

      <g className="pointer-events-none">
        <InsetGuide
          x={AN.triggerPadX}
          y={AN.triggerPadY}
          w={AN.width - AN.triggerPadX * 2}
          h={AN.triggerH - AN.triggerPadY * 2}
          offset={0.8}
          boxX={0}
          boxY={0}
          boxW={AN.width}
          boxH={AN.triggerH}
          boxRx={AN.triggerRx}
          clipOffset={0.8}
        />
        <MeasureNote x={AN.triggerPadX / 2} y={midY + 2.5} anchor="middle">
          {`${AN.triggerPadX}`}
        </MeasureNote>
        <MeasureNote x={AN.width - AN.triggerPadX / 2} y={midY + 2.5} anchor="middle">
          {`${AN.triggerPadX}`}
        </MeasureNote>
        <MeasureNote x={AN.width / 2} y={AN.triggerPadY - 3} anchor="middle">
          {`${AN.triggerPadY}`}
        </MeasureNote>
        <MeasureNote x={AN.width / 2} y={AN.triggerH - 3} anchor="middle">
          {`${AN.triggerPadY}`}
        </MeasureNote>
      </g>
    </g>
  )
}

function PanelShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('panel')
  const active = useEngaged('panel')
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
        width={AN.width}
        height={AN_PANEL_H}
        rx={AN.panelRx}
        stroke="currentColor"
        strokeWidth={active ? 1.5 : draftTheme.wireframe.strokeWidth}
        fill="currentColor"
        fillOpacity={active ? 0.06 : 0.03}
        className={spotlight.className}
        style={spotlight.style}
      />

      <g className="pointer-events-none">
        <InsetGuide
          x={AN_INSET}
          y={AN_INSET}
          w={AN.width - AN_INSET * 2}
          h={AN_PANEL_H - AN_INSET * 2}
          offset={0.8}
          boxX={0}
          boxY={0}
          boxW={AN.width}
          boxH={AN_PANEL_H}
          boxRx={AN.panelRx}
          clipOffset={0.8}
        />
        <MeasureNote x={AN_INSET - 2} y={AN_PANEL_H / 2 + 2.5} anchor="end">
          {`${AN.panelPad}`}
        </MeasureNote>
        <MeasureNote x={AN.width - AN_INSET + 2} y={AN_PANEL_H / 2 + 2.5} anchor="start">
          {`${AN.panelPad}`}
        </MeasureNote>
        <MeasureNote x={AN.width / 2} y={AN_INSET - 1.5} anchor="middle">
          {`${AN.panelPad}`}
        </MeasureNote>
        <MeasureNote x={AN.width / 2} y={AN_PANEL_H - 1.5} anchor="middle">
          {`${AN.panelPad}`}
        </MeasureNote>
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
  const active = useEngaged(id)
  return (
    <g
      onMouseEnter={() => setHovered(id)}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={AN_INSET}
        y={y}
        width={AN_ITEM_W}
        height={AN.itemH}
        rx={AN.itemRx}
        fill="currentColor"
        fillOpacity={active ? 0.08 : 0}
        className={spotlight.className}
        style={spotlight.style}
      />
      <text
        x={AN_INSET + AN.itemPadX}
        y={y + AN.itemH / 2 + AN.font * 0.35}
        fontSize={AN.font}
        fontFamily="var(--font-sans)"
        className={`fill-current ${spotlight.className} ${destructive ? 'opacity-80' : ''}`}
      >
        {label}
      </text>
    </g>
  )
}

function HighlightShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('highlight')
  const active = useEngaged('highlight')
  return (
    <g
      onMouseEnter={() => setHovered('highlight')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={AN_INSET}
        y={AN_ITEM_Y[1]}
        width={AN_ITEM_W}
        height={AN.itemH}
        rx={AN.itemRx}
        fill="currentColor"
        fillOpacity={active ? 0.2 : 0.12}
        className={spotlight.className}
        style={spotlight.style}
      />
    </g>
  )
}

function SeparatorShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('separator')
  const active = useEngaged('separator')
  return (
    <g
      onMouseEnter={() => setHovered('separator')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect x={AN_INSET} y={AN_SEP_LINE_Y - 4} width={AN_ITEM_W} height={9} fill="transparent" />
      <line
        x1={AN_INSET}
        y1={AN_SEP_LINE_Y + 0.5}
        x2={AN_INSET + AN_ITEM_W}
        y2={AN_SEP_LINE_Y + 0.5}
        stroke="currentColor"
        strokeWidth={active ? 1.5 : 1}
        className={`opacity-40 ${spotlight.className}`}
        style={spotlight.style}
      />
    </g>
  )
}

function AnnotationsLayer() {
  const { hovered, pinned } = useAnatomy()
  const dimmed = (hovered ?? pinned) !== null
  return (
    <g
      style={{ pointerEvents: 'none', filter: dimmed ? 'url(#spotlight-blur)' : 'none' }}
      className={`transition-[opacity,filter] duration-(--motion-dur-base) ease-(--motion-ease-in-out) motion-reduce:transition-none motion-reduce:filter-none ${dimmed ? 'opacity-30' : 'opacity-100'}`}
    >
      <GripFrame x={0} y={AN_PANEL_Y} w={AN.width} h={AN_PANEL_H} />
      <MeasureH x1={0} x2={AN.width} y={-14} label={`${AN.width}`} />
      <MeasureNote x={-8} y={AN.triggerH + AN.sideOffset / 2 + 2.5} anchor="end">
        {`${AN.sideOffset}`}
      </MeasureNote>
    </g>
  )
}

const AN_LANE_X = TX + AN.width + 24
const AN_ITEM_RIGHT = TX + AN_INSET + AN_ITEM_W
const AN_PANEL_ROOT_Y = TY + AN_PANEL_Y

function Callouts() {
  return (
    <>
      <AnatomyCallout
        part="trigger"
        label="Trigger"
        anchor={[TX + AN.width, TY + AN.triggerH / 2]}
        side="end"
        distance={24}
        isAccent
        measure={`${AN.width} × ${AN.triggerH} · rounded-md · px-4 py-3`}
        caption="Button with aria-expanded. The chevron flips 180° when open."
      />
      <AnatomyCallout
        part="item-1"
        label="Item"
        anchor={[AN_ITEM_RIGHT, AN_PANEL_ROOT_Y + AN_ITEM_Y[0] + AN.itemH / 2]}
        side="end"
        distance={AN_LANE_X - AN_ITEM_RIGHT}
        measure={`${AN_ITEM_W} × ${AN.itemH} · rounded-md · px-3`}
        caption="menuitem. Arrow keys move focus, Enter selects and closes."
      />
      <AnatomyCallout
        part="highlight"
        label="Highlight"
        anchor={[AN_ITEM_RIGHT, AN_PANEL_ROOT_Y + AN_ITEM_Y[1] + AN.itemH / 2]}
        side="end"
        distance={AN_LANE_X - AN_ITEM_RIGHT}
        isAccent
        measure={`${AN_ITEM_W} × ${AN.itemH} · surface-2`}
        caption="Muted highlight that springs toward the pointer between items."
      />
      <AnatomyCallout
        part="separator"
        label="Separator"
        anchor={[TX + AN_INSET, AN_PANEL_ROOT_Y + AN_SEP_LINE_Y + 0.5]}
        side="start"
        distance={AN_INSET + 24}
        measure={`${AN_ITEM_W} × 1 · my-1`}
        caption="DropdownMenuSeparator, a 1px divider in the border token."
      />
      <AnatomyCallout
        part="panel"
        label="Panel"
        anchor={[TX + AN.width / 2, AN_PANEL_ROOT_Y + AN_PANEL_H]}
        side="bottom"
        distance={24}
        measure={`${AN.width} × ${AN_PANEL_H} · rounded-md · p-1.5`}
        caption="Portaled role=menu, 8px below the trigger and matched to its width."
      />
    </>
  )
}

export function DropdownMenuAnatomy() {
  return (
    <AnatomyFrame viewBox="-50 -16 444 303" ariaLabel="Dropdown menu anatomy">
      <g transform={`translate(${TX}, ${TY})`}>
        <TriggerShape />
        <g transform={`translate(0, ${AN_PANEL_Y})`}>
          <PanelShape />
          <HighlightShape />
          <ItemShape y={AN_ITEM_Y[0]} label="Edit" id="item-1" />
          <ItemShape y={AN_ITEM_Y[1]} label="Duplicate" id="highlight" />
          <SeparatorShape />
          <ItemShape y={AN_ITEM2_Y} label="Delete" id="item-3" destructive />
        </g>
        <AnnotationsLayer />
      </g>
      <Callouts />
    </AnatomyFrame>
  )
}

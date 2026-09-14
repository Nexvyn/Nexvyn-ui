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
  DRAFT_INK_MORPH,
  DRAFT_SCAFFOLD_FADE,
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
  DRAFT_LABEL_ALT_BEAT,
  stampBeat,
} from '@/components/diagrams/lib/diagram-parts'

const BP_MORPH_OPACITY =
  'transition-opacity duration-(--motion-dur-showcase) ease-(--motion-ease-in-out) motion-reduce:transition-none'

const CM = {
  scale: 0.65,
  panelW: 192,
  panelRx: 4,
  border: 1,
  panelPad: 6,
  itemH: 44,
  itemRx: 4,
  itemPadX: 12,
  sepMarginY: 4,
  font: 14,
  kbdW: 26,
  kbdH: 20,
  kbdFont: 10,
} as const

const CM_ITEM_LABELS = ['Copy', 'Rename', 'Delete'] as const
const CM_INSET = CM.border + CM.panelPad
const CM_ITEM_Y_REAL = [
  CM_INSET,
  CM_INSET + CM.itemH,
  CM_INSET + CM.itemH * 2 + CM.sepMarginY * 2 + 1,
] as const
const CM_SEP_Y_REAL = CM_INSET + CM.itemH * 2 + CM.sepMarginY
const CM_PANEL_H_REAL = CM_ITEM_Y_REAL[2] + CM.itemH + CM_INSET

const S = CM.scale
const BP_PANEL = {
  x: 62,
  y: 30,
  w: CM.panelW * S,
  h: CM_PANEL_H_REAL * S,
  rx: CM.panelRx * S,
} as const
const BP_INSET = CM_INSET * S
const BP_ITEM = {
  x: BP_PANEL.x + BP_INSET,
  w: BP_PANEL.w - BP_INSET * 2,
  h: CM.itemH * S,
  rx: CM.itemRx * S,
  font: CM.font * S,
} as const
const BP_ITEM_Y = CM_ITEM_Y_REAL.map((y) => BP_PANEL.y + y * S)
const BP_SEP_Y = BP_PANEL.y + CM_SEP_Y_REAL * S
const BP_TRIGGER = { x: 6, y: BP_PANEL.y + 10, w: 26, h: BP_PANEL.h - 20, rx: 4 } as const
const BP_ORIGIN = { x: BP_TRIGGER.x + BP_TRIGGER.w - 6, y: BP_PANEL.y + BP_PANEL.h - 12 } as const
const BP_NOTE_X = BP_PANEL.x - 12
const BP_KBD = {
  w: CM.kbdW * S,
  h: CM.kbdH * S,
  x: BP_ITEM.x + BP_ITEM.w - CM.itemPadX * S - CM.kbdW * S,
  y: BP_ITEM_Y[0] + ((CM.itemH - CM.kbdH) / 2) * S,
  font: Math.max(7, CM.kbdFont * S),
} as const

function rowBaseline(rowY: number, rowH: number, font: number) {
  return rowY + rowH / 2 + font * 0.35
}

export function ContextMenuBlueprint() {
  const theme = draftTheme
  return (
    <DraftSurface>
      <rect
        x={BP_TRIGGER.x}
        y={BP_TRIGGER.y}
        width={BP_TRIGGER.w}
        height={BP_TRIGGER.h}
        rx={BP_TRIGGER.rx}
        stroke="currentColor"
        strokeWidth={theme.wireframe.strokeWidth * 0.6}
        strokeOpacity={theme.wireframe.strokeOpacity * 0.25}
        strokeDasharray="2 2"
        className={`${DRAFT_SCAFFOLD_FADE} dash-march`}
        style={beat(DRAFT_BEAT.guide)}
      />
      <circle
        cx={BP_ORIGIN.x}
        cy={BP_ORIGIN.y}
        r={2.5}
        fill="var(--bp-accent, var(--color-accent))"
        style={beat(DRAFT_BEAT.hatch)}
        className={`fade-note ${BP_MORPH_OPACITY}`}
      />
      <line
        x1={BP_ORIGIN.x}
        y1={BP_ORIGIN.y}
        x2={BP_PANEL.x}
        y2={BP_PANEL.y + BP_PANEL.h}
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={0.75}
        strokeDasharray="2 2"
        className={`${DRAFT_SCAFFOLD_FADE} dash-march opacity-60`}
        style={beat(DRAFT_BEAT.guide)}
      />
      <g>
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
          style={beat(DRAFT_BEAT.outline)}
          className={`ink-draw ${DRAFT_FILL_PANEL}`}
        />
        <rect
          x={BP_ITEM.x}
          y={BP_ITEM_Y[0]}
          width={BP_ITEM.w}
          height={BP_ITEM.h}
          rx={BP_ITEM.rx}
          fill="currentColor"
          className={`opacity-0 ${BP_MORPH_OPACITY} group-hover:opacity-10 group-hover:delay-(--motion-dur-slow) group-focus-visible:opacity-10 group-focus-visible:delay-(--motion-dur-slow)`}
        />
        {CM_ITEM_LABELS.map((label, i) => (
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
              x={BP_ITEM.x + CM.itemPadX * S}
              y={rowBaseline(BP_ITEM_Y[i], BP_ITEM.h, BP_ITEM.font)}
              fontSize={BP_ITEM.font}
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
        <rect
          x={BP_KBD.x}
          y={BP_KBD.y}
          width={BP_KBD.w}
          height={BP_KBD.h}
          rx={CM.itemRx * S}
          strokeWidth={theme.guide.strokeWidth}
          style={beat(DRAFT_DETAIL_BEAT.d)}
          className={`fade-note ${DRAFT_FILL_PANEL} stroke-(--color-border) opacity-60 group-hover:opacity-100 group-focus-visible:opacity-100`}
        />
        <text
          x={BP_KBD.x + BP_KBD.w / 2}
          y={rowBaseline(BP_KBD.y, BP_KBD.h, BP_KBD.font)}
          textAnchor="middle"
          fontSize={BP_KBD.font}
          fontFamily="var(--font-sans)"
          style={beat(DRAFT_LABEL_ALT_BEAT)}
          className={`fade-note ${DRAFT_TEXT_SOFT}`}
        >
          ⌘C
        </text>
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
        <MeasureH
          x1={BP_PANEL.x}
          x2={BP_PANEL.x + BP_PANEL.w}
          y={BP_PANEL.y - 10}
          label={`min ${CM.panelW}`}
          className="note-stamp"
          style={beat(stampBeat(0))}
        />
        <MeasureV
          x={BP_PANEL.x - 8}
          y1={BP_ITEM_Y[0]}
          y2={BP_ITEM_Y[0] + BP_ITEM.h}
          label={`${CM.itemH}`}
          labelXOffset={-4}
          className="note-stamp"
          style={beat(stampBeat(1))}
        />
        <MeasureNote
          x={BP_NOTE_X}
          y={rowBaseline(BP_ITEM_Y[1], BP_ITEM.h, 7) - 5.5}
          anchor="end"
          className="note-stamp"
          style={beat(stampBeat(2))}
        >
          {`p ${CM.panelPad}`}
        </MeasureNote>
        <MeasureNote
          x={BP_NOTE_X}
          y={rowBaseline(BP_ITEM_Y[1], BP_ITEM.h, 7) + 5.5}
          anchor="end"
          className="note-stamp"
          style={beat(stampBeat(3))}
        >
          {`r${CM.panelRx}`}
        </MeasureNote>
        <MeasureV
          x={BP_PANEL.x + BP_PANEL.w + 8}
          y1={BP_PANEL.y}
          y2={BP_PANEL.y + BP_PANEL.h}
          label={`${CM_PANEL_H_REAL}`}
          labelXOffset={5}
          labelAnchor="start"
          className="note-stamp"
          style={beat(stampBeat(4))}
        />
      </g>
    </DraftSurface>
  )
}

const AN = {
  panelW: 192,
  panelRx: 4,
  border: 1,
  panelPad: 6,
  itemH: 44,
  itemRx: 4,
  itemPadX: 12,
  sepMarginY: 4,
  font: 14,
  kbdW: 26,
  kbdH: 20,
} as const

const AN_INSET = AN.border + AN.panelPad
const AN_ITEM_W = AN.panelW - AN_INSET * 2
const AN_ITEM0_Y = AN_INSET
const AN_ITEM1_Y = AN_ITEM0_Y + AN.itemH
const AN_SEP_LINE_Y = AN_ITEM1_Y + AN.itemH + AN.sepMarginY
const AN_ITEM2_Y = AN_SEP_LINE_Y + 1 + AN.sepMarginY
const AN_PANEL_H = AN_ITEM2_Y + AN.itemH + AN_INSET
const AN_KBD_X = AN_INSET + AN_ITEM_W - AN.itemPadX - AN.kbdW
const AN_KBD_Y = AN_ITEM0_Y + (AN.itemH - AN.kbdH) / 2

const TX = 60
const TY = 20

function useEngaged(id: string) {
  const { hovered, pinned } = useAnatomy()
  return (hovered ?? pinned) === id
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
        width={AN.panelW}
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
          w={AN.panelW - AN_INSET * 2}
          h={AN_PANEL_H - AN_INSET * 2}
          offset={0.8}
          boxX={0}
          boxY={0}
          boxW={AN.panelW}
          boxH={AN_PANEL_H}
          boxRx={AN.panelRx}
          clipOffset={0.8}
        />
        <MeasureNote x={AN_INSET - 2} y={AN_PANEL_H / 2 + 2.5} anchor="end">
          {`${AN.panelPad}`}
        </MeasureNote>
        <MeasureNote x={AN.panelW - AN_INSET + 2} y={AN_PANEL_H / 2 + 2.5} anchor="start">
          {`${AN.panelPad}`}
        </MeasureNote>
        <MeasureNote x={AN.panelW / 2} y={AN_INSET - 1.5} anchor="middle">
          {`${AN.panelPad}`}
        </MeasureNote>
        <MeasureNote x={AN.panelW / 2} y={AN_PANEL_H - 1.5} anchor="middle">
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
        fillOpacity={active ? 0.12 : 0.05}
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

function ShortcutShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('shortcut')
  const active = useEngaged('shortcut')
  return (
    <g
      onMouseEnter={() => setHovered('shortcut')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={AN_KBD_X}
        y={AN_KBD_Y}
        width={AN.kbdW}
        height={AN.kbdH}
        rx={4}
        stroke="currentColor"
        strokeWidth={active ? 1.5 : 1}
        fill="currentColor"
        fillOpacity={active ? 0.12 : 0.04}
        className={spotlight.className}
        style={spotlight.style}
      />
      <text
        x={AN_KBD_X + AN.kbdW / 2}
        y={AN_KBD_Y + AN.kbdH / 2 + 3.5}
        textAnchor="middle"
        fontSize={10}
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
      <GripFrame x={0} y={0} w={AN.panelW} h={AN_PANEL_H} />
      <MeasureH x1={0} x2={AN.panelW} y={-14} label={`${AN.panelW}`} />
    </g>
  )
}

const AN_LANE_X = TX + AN.panelW + 24
const AN_ITEM_RIGHT = TX + AN_INSET + AN_ITEM_W

function Callouts() {
  return (
    <>
      <AnatomyCallout
        part="shortcut"
        label="Shortcut"
        anchor={[TX + AN_KBD_X + AN.kbdW, TY + AN_KBD_Y + AN.kbdH / 2]}
        side="end"
        distance={AN_LANE_X - (TX + AN_KBD_X + AN.kbdW)}
        measure="auto × 20 · rounded-md · 10px"
        caption="Optional kbd hint from item.shortcut, hidden from screen readers."
      />
      <AnatomyCallout
        part="item"
        label="Item"
        anchor={[AN_ITEM_RIGHT, TY + AN_ITEM1_Y + AN.itemH / 2]}
        side="end"
        distance={AN_LANE_X - AN_ITEM_RIGHT}
        measure={`${AN_ITEM_W} × ${AN.itemH} · rounded-md · px-3`}
        caption="menuitem button. Arrow keys move focus, Enter selects."
      />
      <AnatomyCallout
        part="destructive"
        label="Destructive item"
        anchor={[AN_ITEM_RIGHT, TY + AN_ITEM2_Y + AN.itemH / 2]}
        side="end"
        distance={AN_LANE_X - AN_ITEM_RIGHT}
        measure={`${AN_ITEM_W} × ${AN.itemH} · text-error`}
        caption="Item with destructive: true, tinted with the error token."
      />
      <AnatomyCallout
        part="separator"
        label="Separator"
        anchor={[TX + AN_INSET, TY + AN_SEP_LINE_Y + 0.5]}
        side="start"
        distance={AN_INSET + 24}
        measure={`${AN_ITEM_W} × 1 · my-1`}
        caption="Divider rendered after an item with separatorAfter."
      />
      <AnatomyCallout
        part="panel"
        label="Panel"
        anchor={[TX + AN.panelW / 2, TY + AN_PANEL_H]}
        side="bottom"
        distance={24}
        isAccent
        measure={`${AN.panelW} × ${AN_PANEL_H} · rounded-md · p-1.5`}
        caption="Portaled role=menu that unfurls from the pointer position."
      />
    </>
  )
}

export function ContextMenuAnatomy() {
  return (
    <AnatomyFrame viewBox="-50 -18 454 253" ariaLabel="Context menu anatomy">
      <g transform={`translate(${TX}, ${TY})`}>
        <PanelShape />
        <ItemShape y={AN_ITEM0_Y} label="Copy" id="item" />
        <ShortcutShape />
        <ItemShape y={AN_ITEM1_Y} label="Rename" id="item" />
        <SeparatorShape />
        <ItemShape y={AN_ITEM2_Y} label="Delete" id="destructive" destructive />
        <AnnotationsLayer />
      </g>
      <Callouts />
    </AnatomyFrame>
  )
}

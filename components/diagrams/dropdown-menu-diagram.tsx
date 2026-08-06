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
  DRAFT_LABEL_ALT_BEAT,
  stampBeat,
} from '@/components/diagrams/lib/diagram-parts'

const DM = {
  triggerW: 160,
  triggerH: 32,
  triggerRx: 8,
  panelW: 160,
  panelRx: 8,
  itemH: 20,
  itemRx: 6,
  itemPadX: 12,
  padY: 6,
  sepGap: 6,

  itemGap: 2,
} as const

const ITEM_Y = [DM.padY, DM.padY + DM.itemH + DM.itemGap] as const
const SEP_Y = ITEM_Y[1] + DM.itemH + DM.sepGap
const ITEM2_Y = SEP_Y + DM.sepGap
const PANEL_H = ITEM2_Y + DM.itemH + DM.padY

const ITEM_LABELS = ['Edit', 'Duplicate', 'Delete'] as const

const BP_TRIGGER = { x: 30, y: 20, w: DM.triggerW, h: DM.triggerH, rx: DM.triggerRx } as const
const BP_PANEL = {
  x: 30,
  y: BP_TRIGGER.y + BP_TRIGGER.h + 2,
  w: DM.panelW,
  h: PANEL_H,
  rx: DM.panelRx,
} as const
const BP_ITEM_Y = [BP_PANEL.y + ITEM_Y[0], BP_PANEL.y + ITEM_Y[1], BP_PANEL.y + ITEM2_Y] as const
const BP_SEP_Y = BP_PANEL.y + SEP_Y

export function DropdownMenuBlueprint() {
  const theme = draftTheme
  return (
    <DraftSurface>
      <g
        style={{ transformOrigin: `${BP_PANEL.x + BP_PANEL.w / 2}px ${BP_PANEL.y}px` }}
        className="transition-transform duration-(--motion-dur-showcase) ease-(--motion-ease-out) group-hover:translate-y-[6px] group-hover:delay-[320ms] group-focus-visible:translate-y-[6px] group-focus-visible:delay-[320ms] motion-reduce:transition-none"
      >
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
        {ITEM_LABELS.map((label, i) => (
          <g key={i}>
            <rect
              x={BP_PANEL.x + 6}
              y={BP_ITEM_Y[i]}
              width={BP_PANEL.w - 12}
              height={DM.itemH}
              rx={DM.itemRx}
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1}
              strokeWidth={theme.wireframe.strokeWidth * 0.5}
              strokeOpacity={theme.wireframe.strokeOpacity * 0.3}
              style={beat(DRAFT_DETAIL_BEAT.c)}
              className={`ink-draw ${DRAFT_SCAFFOLD_FADE}`}
            />
            <text
              x={BP_PANEL.x + DM.itemPadX}
              y={BP_ITEM_Y[i] + DM.itemH / 2 + 4}
              fontSize={10}
              fontFamily="var(--font-sans)"
              style={beat(`${400 + i * 70}ms`)}
              className={`fade-note ${DRAFT_TEXT_SOFT}`}
            >
              {label}
            </text>
          </g>
        ))}
        <line
          x1={BP_PANEL.x + DM.itemPadX}
          y1={BP_SEP_Y}
          x2={BP_PANEL.x + BP_PANEL.w - DM.itemPadX}
          y2={BP_SEP_Y}
          stroke="currentColor"
          strokeWidth={0.5}
          opacity={theme.wireframe.strokeOpacity * 0.4}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1}
          style={beat(DRAFT_DETAIL_BEAT.c)}
          className={`ink-draw ${DRAFT_SCAFFOLD_FADE}`}
        />
      </g>
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
        x={BP_TRIGGER.x + 16}
        y={BP_TRIGGER.y + BP_TRIGGER.h / 2 + 4}
        fontSize={11}
        fontWeight={500}
        fontFamily="var(--font-sans)"
        style={beat(DRAFT_LABEL_BEAT)}
        className={`fade-note ${DRAFT_TEXT_SOFT}`}
      >
        Actions
      </text>

      <g
        style={{
          transformOrigin: `${BP_TRIGGER.x + BP_TRIGGER.w - 20}px ${BP_TRIGGER.y + BP_TRIGGER.h / 2 - 1}px`,
        }}
        className="transition-transform duration-(--motion-dur-slow) ease-(--motion-ease-in-out) group-hover:rotate-180 group-focus-visible:rotate-180 motion-reduce:transition-none motion-reduce:rotate-none"
      >
        <path
          d={`M${BP_TRIGGER.x + BP_TRIGGER.w - 24} ${BP_TRIGGER.y + BP_TRIGGER.h / 2 - 3} l4 4 4-4`}
          strokeWidth={1.5}
          stroke="currentColor"
          fill="none"
          opacity={theme.wireframe.strokeOpacity}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1}
          style={beat(DRAFT_DETAIL_BEAT.a)}
          className={`ink-draw ${DRAFT_INK_MORPH} group-hover:opacity-100 group-focus-visible:opacity-100`}
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
        <MeasureH
          x1={BP_TRIGGER.x}
          x2={BP_TRIGGER.x + BP_TRIGGER.w}
          y={BP_TRIGGER.y - 12}
          label={`${BP_PANEL.w}`}
          className="note-stamp"
          style={beat(stampBeat(0))}
        />
        <MeasureV
          x={BP_PANEL.x - 12}
          y1={BP_PANEL.y}
          y2={BP_PANEL.y + BP_PANEL.h}
          label={`${BP_PANEL.h}`}
          className="note-stamp"
          style={beat(stampBeat(1))}
        />

        <InsetGuide
          x={BP_TRIGGER.x + 16}
          y={BP_TRIGGER.y + 12}
          w={BP_TRIGGER.w - 32}
          h={BP_TRIGGER.h - 24}
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

        <MeasureNote
          x={BP_TRIGGER.x + 8}
          y={BP_TRIGGER.y + BP_TRIGGER.h - 4}
          anchor="middle"
          className="note-stamp"
          style={beat(stampBeat(2))}
        >
          16
        </MeasureNote>
        <MeasureNote
          x={BP_TRIGGER.x + BP_TRIGGER.w / 2}
          y={BP_TRIGGER.y + 9}
          anchor="middle"
          className="note-stamp"
          style={beat(stampBeat(3))}
        >
          12
        </MeasureNote>

        <InsetGuide
          x={BP_PANEL.x + DM.padY}
          y={BP_PANEL.y + DM.padY}
          w={BP_PANEL.w - DM.padY * 2}
          h={BP_PANEL.h - DM.padY * 2}
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
        <MeasureNote
          x={BP_PANEL.x + DM.padY - 2}
          y={BP_PANEL.y + BP_PANEL.h / 2 + 2.5}
          anchor="end"
          className="note-stamp"
          style={beat(stampBeat(4))}
        >
          {`${DM.padY}`}
        </MeasureNote>
      </g>
    </DraftSurface>
  )
}

const AN = {
  triggerH: 44,
  triggerRx: 6,
  triggerPadX: 16,
  triggerPadY: 12,
  panelW: 192,
  panelRx: 6,
  panelPad: 6,
  itemH: 44,
  itemRx: 4,
  itemPadX: 12,
  sepMarginY: 4,

  itemGap: 4,
} as const
const AN_TRIGGER_W = AN.panelW

const AN_ITEM_Y = [AN.panelPad, AN.panelPad + AN.itemH + AN.itemGap] as const
const AN_SEP_LINE_Y = AN_ITEM_Y[1] + AN.itemH + AN.sepMarginY
const AN_ITEM2_Y = AN_SEP_LINE_Y + 1 + AN.sepMarginY
const AN_PANEL_H = AN_ITEM2_Y + AN.itemH + AN.panelPad

const TX = 60
const TY = 20

const AN_TRIGGER_Y = AN_PANEL_H + 8

function TriggerShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('trigger')
  const midY = AN_TRIGGER_Y + AN.triggerH / 2
  const contentH = AN.triggerH - AN.triggerPadY * 2
  return (
    <g
      onMouseEnter={() => setHovered('trigger')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={0}
        y={AN_TRIGGER_Y}
        width={AN_TRIGGER_W}
        height={AN.triggerH}
        rx={AN.triggerRx}
        stroke="currentColor"
        strokeWidth={draftTheme.wireframe.strokeWidth}
        fill="currentColor"
        fillOpacity={0.05}
        className={spotlight.className}
        style={spotlight.style}
      />
      <text
        x={AN.triggerPadX}
        y={AN_TRIGGER_Y + AN.triggerH / 2 + 4}
        fontSize={12}
        fontWeight={500}
        fontFamily="var(--font-sans)"
        className={`fill-current ${spotlight.className}`}
      >
        Actions
      </text>
      <path
        d={`M${AN_TRIGGER_W - AN.triggerPadX - 8} ${midY - 3} l6 6 l6 -6`}
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        fill="none"
        className={`opacity-60 ${spotlight.className}`}
      />

      <g className="pointer-events-none">
        <InsetGuide
          x={AN.triggerPadX}
          y={AN_TRIGGER_Y + AN.triggerPadY}
          w={AN_TRIGGER_W - AN.triggerPadX * 2}
          h={contentH}
          offset={0.8}
          boxX={0}
          boxY={AN_TRIGGER_Y}
          boxW={AN_TRIGGER_W}
          boxH={AN.triggerH}
          boxRx={AN.triggerRx}
          clipOffset={0.8}
        />
        <MeasureNote x={7} y={AN_TRIGGER_Y + AN.triggerH / 2 + 2.5} anchor="middle">
          {`${AN.triggerPadX}`}
        </MeasureNote>
        <MeasureNote x={AN_TRIGGER_W - 7} y={AN_TRIGGER_Y + AN.triggerH / 2 + 2.5} anchor="middle">
          {`${AN.triggerPadX}`}
        </MeasureNote>
        <MeasureNote x={AN_TRIGGER_W / 2} y={AN_TRIGGER_Y + 8} anchor="middle">
          {`${AN.triggerPadY}`}
        </MeasureNote>
        <MeasureNote x={AN_TRIGGER_W / 2} y={AN_TRIGGER_Y + AN.triggerH - 4} anchor="middle">
          {`${AN.triggerPadY}`}
        </MeasureNote>
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
        x={0}
        y={0}
        width={AN.panelW}
        height={AN_PANEL_H}
        rx={AN.panelRx}
        stroke="currentColor"
        strokeWidth={draftTheme.wireframe.strokeWidth}
        fill="currentColor"
        fillOpacity={0.03}
        className={spotlight.className}
        style={spotlight.style}
      />

      <g className="pointer-events-none">
        <InsetGuide
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
        <MeasureNote x={AN.panelPad - 2} y={AN_PANEL_H / 2 + 2.5} anchor="end">
          {`${AN.panelPad}`}
        </MeasureNote>
        <MeasureNote x={AN.panelW - AN.panelPad + 2} y={AN_PANEL_H / 2 + 2.5} anchor="start">
          {`${AN.panelPad}`}
        </MeasureNote>
        <MeasureNote x={AN.panelW / 2} y={AN.panelPad - 3} anchor="middle">
          {`${AN.panelPad}`}
        </MeasureNote>
        <MeasureNote x={AN.panelW / 2} y={AN_PANEL_H - AN.panelPad + 9} anchor="middle">
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

function HighlightShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('highlight')
  return (
    <g
      onMouseEnter={() => setHovered('highlight')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={AN.panelPad}
        y={AN_ITEM_Y[1]}
        width={AN.panelW - AN.panelPad * 2}
        height={AN.itemH}
        rx={AN.itemRx}
        fill="currentColor"
        fillOpacity={0.12}
        className={spotlight.className}
        style={spotlight.style}
      />
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
      <GripFrame x={0} y={0} w={AN.panelW} h={AN_PANEL_H} />
      <MeasureH x1={0} x2={AN.panelW} y={-14} label={`${AN.panelW}`} />
      <MeasureV x={-12} y1={0} y2={AN_PANEL_H} label={`${AN_PANEL_H}`} labelXOffset={-6} />
    </g>
  )
}

function OverlayLines() {
  const triggerMidX = TX + AN_TRIGGER_W / 2
  const triggerBottom = TY + AN_TRIGGER_Y + AN.triggerH
  const panelMidX = TX + AN.panelW / 2
  const panelTop = TY
  const item1Right = TX + (AN.panelW - AN.panelPad)
  const item1MidY = TY + AN_ITEM_Y[0] + AN.itemH / 2
  const item2MidY = TY + AN_ITEM_Y[1] + AN.itemH / 2
  const sepMidY = TY + AN_SEP_LINE_Y
  return (
    <g strokeWidth="1" className="pointer-events-none">
      <OverlayLine
        id="trigger"
        x1={triggerMidX}
        y1={triggerBottom}
        x2={triggerMidX}
        y2={triggerBottom + 16}
      />
      <OverlayLine id="panel" x1={panelMidX} y1={panelTop} x2={panelMidX} y2={panelTop - 12} />
      <OverlayLine id="item-1" x1={item1Right} y1={item1MidY} x2={item1Right + 26} y2={item1MidY} />
      <OverlayLine
        id="highlight"
        x1={item1Right}
        y1={item2MidY}
        x2={item1Right + 26}
        y2={item2MidY}
      />
      <OverlayLine id="separator" x1={item1Right} y1={sepMidY} x2={item1Right + 26} y2={sepMidY} />
    </g>
  )
}

function Tags() {
  const triggerMidX = TX + AN_TRIGGER_W / 2
  const triggerBottom = TY + AN_TRIGGER_Y + AN.triggerH
  const panelMidX = TX + AN.panelW / 2
  const panelTop = TY
  const item1Right = TX + (AN.panelW - AN.panelPad)
  const item1MidY = TY + AN_ITEM_Y[0] + AN.itemH / 2
  const item2MidY = TY + AN_ITEM_Y[1] + AN.itemH / 2
  const sepMidY = TY + AN_SEP_LINE_Y
  const tagX = item1Right + 26
  return (
    <>
      <foreignObject
        x={triggerMidX - 50}
        y={triggerBottom + 16}
        width={100}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part="trigger"
          label="Trigger"
          className="items-start justify-center"
          isAccent
        />
      </foreignObject>
      <foreignObject
        x={panelMidX - 60}
        y={panelTop - 12 - 24}
        width={120}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="panel" label="Panel" className="items-end justify-center" />
      </foreignObject>
      <foreignObject
        x={tagX}
        y={item1MidY - 12}
        width={80}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="item-1" label="Item" className="items-center justify-start" />
      </foreignObject>
      <foreignObject
        x={tagX}
        y={item2MidY - 12}
        width={100}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part="highlight"
          label="Hover"
          className="items-center justify-start"
          isAccent
        />
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
    </>
  )
}

export function DropdownMenuAnatomy() {
  return (
    <AnatomyFrame viewBox="-20 -50 420 340" maxWidthClassName="max-w-[480px]">
      <g transform={`translate(${TX}, ${TY})`}>
        <PanelShape />
        <ItemShape y={AN_ITEM_Y[0]} label="Edit" id="item-1" />
        <HighlightShape />
        <ItemShape y={AN_ITEM_Y[1]} label="Duplicate" id="highlight" />
        <SeparatorShape />
        <ItemShape y={AN_ITEM2_Y} label="Delete" id="item-3" destructive />
        <TriggerShape />
        <AnnotationsLayer />
      </g>
      <OverlayLines />
      <Tags />
    </AnatomyFrame>
  )
}

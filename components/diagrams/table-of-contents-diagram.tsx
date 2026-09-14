'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset, licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root LICENSE.

import {
  DraftSurface,
  DRAFT_SCAFFOLD_FADE,
  DRAFT_INK_MORPH,
  DRAFT_FILL_PANEL,
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
import {
  AnatomyFrame,
  AnatomyCallout,
  useAnatomy,
  useSpotlight,
} from '@/components/diagrams/lib/anatomy-parts'

const BP_S = 0.56
const BP = {
  w: 280 * BP_S,
  rx: 4 * BP_S,
  panelPad: 8 * BP_S,
  listPadY: 4 * BP_S,
  itemH: 40 * BP_S,
  itemGap: 2 * BP_S,
  itemPadX: 16 * BP_S,
  gap: 12 * BP_S,
  triggerH: 56 * BP_S,
  triggerPadX: 24 * BP_S,
  border: 1 * BP_S,
  clusterGap: 12 * BP_S,
  chevron: 16 * BP_S,
  ring: 18 * BP_S,
  ringStroke: 2 * BP_S,
  divider: 16 * BP_S,
  font: 10,
} as const

const BP_ITEMS = ['Introduction', 'Getting Started', 'Features'] as const
const BP_ACTIVE_INDEX = 1
const BP_PROGRESS = 0.4
const BP_PANEL_H =
  BP.panelPad * 2 +
  BP.listPadY * 2 +
  BP_ITEMS.length * BP.itemH +
  (BP_ITEMS.length - 1) * BP.itemGap
const BP_X = (220 - BP.w) / 2
const BP_Y = 2.5
const BP_ITEM_X = BP_X + BP.panelPad
const BP_ITEM_W = BP.w - BP.panelPad * 2
const BP_TRIGGER_Y = BP_Y + BP_PANEL_H + BP.gap
const BP_TRIGGER_CY = BP_TRIGGER_Y + BP.triggerH / 2
const BP_CHEVRON_X = BP_X + BP.w - BP.border - BP.triggerPadX - BP.chevron
const BP_RING_CX = BP_CHEVRON_X - BP.clusterGap - BP.ring / 2
const BP_RING_R = (BP.ring - BP.ringStroke) / 2
const BP_DIVIDER_X = BP_RING_CX - BP.ring / 2 - BP.clusterGap

function bpItemY(i: number) {
  return BP_Y + BP.panelPad + BP.listPadY + i * (BP.itemH + BP.itemGap)
}

export function TableOfContentsWireframe() {
  const theme = draftTheme
  const k = BP.chevron / 24
  const chevronY = BP_TRIGGER_CY - BP.chevron / 2
  const ringC = 2 * Math.PI * BP_RING_R
  return (
    <DraftSurface>
      <rect
        x={BP_X}
        y={BP_Y}
        width={BP.w}
        height={BP_PANEL_H}
        rx={BP.rx}
        className={`${DRAFT_INK_MORPH} fill-transparent stroke-transparent group-hover:fill-(--color-popover) group-focus-visible:fill-(--color-popover) group-hover:drop-shadow-md group-focus-visible:drop-shadow-md`}
      />
      <rect
        x={BP_ITEM_X}
        y={bpItemY(BP_ACTIVE_INDEX)}
        width={BP_ITEM_W}
        height={BP.itemH}
        rx={BP.rx}
        className={`${DRAFT_INK_MORPH} fill-current opacity-0 group-hover:opacity-10 group-focus-visible:opacity-10`}
      />
      {BP_ITEMS.map((label, i) => (
        <text
          key={label}
          x={BP_ITEM_X + BP.itemPadX}
          y={bpItemY(i) + BP.itemH / 2 + BP.font * 0.35}
          fontSize={BP.font}
          fontFamily="var(--font-sans)"
          style={beat(stampBeat(i))}
          className={`fade-note ${DRAFT_INK_MORPH} opacity-35 group-hover:opacity-100 group-focus-visible:opacity-100 ${
            i === BP_ACTIVE_INDEX ? 'fill-current' : 'fill-(--color-muted)'
          }`}
        >
          {label}
        </text>
      ))}

      <rect
        x={BP_X}
        y={BP_TRIGGER_Y}
        width={BP.w}
        height={BP.triggerH}
        rx={BP.rx}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        style={beat(DRAFT_BEAT.outline)}
        className={`ink-draw ${DRAFT_FILL_PANEL}`}
      />
      <text
        x={BP_X + BP.border + BP.triggerPadX}
        y={BP_TRIGGER_CY + BP.font * 0.35}
        fontSize={BP.font}
        fontFamily="var(--font-sans)"
        style={beat(DRAFT_LABEL_BEAT)}
        className={`fade-note ${DRAFT_TEXT_SOFT}`}
      >
        {BP_ITEMS[BP_ACTIVE_INDEX]}
      </text>
      <line
        x1={BP_DIVIDER_X}
        y1={BP_TRIGGER_CY - BP.divider / 2}
        x2={BP_DIVIDER_X}
        y2={BP_TRIGGER_CY + BP.divider / 2}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        stroke="currentColor"
        strokeWidth={theme.guide.strokeWidth}
        opacity={theme.guide.dimOpacity}
        style={beat(DRAFT_BEAT.anatomy)}
        className="ink-draw"
      />
      <circle
        cx={BP_RING_CX}
        cy={BP_TRIGGER_CY}
        r={BP_RING_R}
        fill="none"
        stroke="currentColor"
        strokeWidth={BP.ringStroke}
        opacity={0.15}
      />
      <circle
        cx={BP_RING_CX}
        cy={BP_TRIGGER_CY}
        r={BP_RING_R}
        fill="none"
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={BP.ringStroke}
        strokeDasharray={`${ringC * BP_PROGRESS} ${ringC}`}
        transform={`rotate(-90 ${BP_RING_CX} ${BP_TRIGGER_CY})`}
        style={beat(DRAFT_BEAT.hatch)}
        className="fade-note"
      />
      <g
        style={{ transformOrigin: `${BP_CHEVRON_X + BP.chevron / 2}px ${BP_TRIGGER_CY}px` }}
        className="transition-transform duration-(--motion-dur-base) ease-(--motion-ease-in-out) group-hover:rotate-180 group-hover:delay-(--motion-dur-base) group-focus-visible:rotate-180 group-focus-visible:delay-(--motion-dur-base) motion-reduce:transition-none motion-reduce:transform-none"
      >
        <path
          d={`M${BP_CHEVRON_X + 5 * k} ${chevronY + 15 * k} l${7 * k} ${-7 * k} ${7 * k} ${7 * k}`}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.25}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={beat(DRAFT_DETAIL_BEAT.b)}
          className={`ink-draw ${DRAFT_INK_MORPH} opacity-60 group-hover:opacity-100 group-focus-visible:opacity-100`}
        />
      </g>

      <g className={DRAFT_SCAFFOLD_FADE}>
        <rect
          x={BP_X}
          y={BP_Y}
          width={BP.w}
          height={BP_PANEL_H}
          rx={BP.rx}
          fill="none"
          stroke="currentColor"
          strokeWidth={theme.guide.strokeWidth}
          strokeDasharray="3 3"
          opacity={theme.guide.structOpacity}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <InsetGuide
          x={BP_X + BP.panelPad}
          y={BP_Y + BP.panelPad}
          w={BP.w - BP.panelPad * 2}
          h={BP_PANEL_H - BP.panelPad * 2}
          offset={0.8}
          boxX={BP_X}
          boxY={BP_Y}
          boxW={BP.w}
          boxH={BP_PANEL_H}
          boxRx={BP.rx}
          clipOffset={0.8}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <InsetGuide
          x={BP_X + BP.border + BP.triggerPadX}
          y={BP_TRIGGER_Y}
          w={BP.w - (BP.border + BP.triggerPadX) * 2}
          h={BP.triggerH}
          offset={0.8}
          boxX={BP_X}
          boxY={BP_TRIGGER_Y}
          boxW={BP.w}
          boxH={BP.triggerH}
          boxRx={BP.rx}
          clipOffset={0.8}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <GripFrame
          x={BP_X}
          y={BP_TRIGGER_Y}
          w={BP.w}
          h={BP.triggerH}
          style={beat(DRAFT_BEAT.handle)}
        />
        <MeasureV
          x={BP_X - 10}
          y1={BP_TRIGGER_Y}
          y2={BP_TRIGGER_Y + BP.triggerH}
          label="56"
          className="note-stamp"
          style={beat(stampBeat(0))}
        />
        <MeasureNote
          x={BP_X - 6}
          y={BP_Y + BP_PANEL_H / 2 + 2.5}
          anchor="end"
          className="note-stamp"
          style={beat(stampBeat(2))}
        >
          p8
        </MeasureNote>
        <MeasureV
          x={BP_X + BP.w + 10}
          y1={bpItemY(0)}
          y2={bpItemY(0) + BP.itemH}
          label="40"
          labelXOffset={5}
          labelAnchor="start"
          className="note-stamp"
          style={beat(stampBeat(1))}
        />
        <MeasureNote
          x={BP_X + BP.w + 5}
          y={BP_TRIGGER_CY + 2.5}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(4))}
        >
          r4
        </MeasureNote>
        <MeasureNote
          x={BP_X + BP.border + BP.triggerPadX / 2}
          y={BP_TRIGGER_CY + 2.5}
          className="note-stamp"
          style={beat(stampBeat(2))}
        >
          24
        </MeasureNote>
        <MeasureH
          x1={BP_X}
          x2={BP_X + BP.w}
          y={BP_TRIGGER_Y + BP.triggerH + 5}
          label="280"
          labelYOffset={8}
          className="note-stamp"
          style={beat(stampBeat(0))}
        />
        <g
          stroke="var(--bp-accent, var(--color-accent))"
          strokeWidth={theme.guide.strokeWidth}
          strokeDasharray="2 2"
          opacity={theme.guide.structOpacity}
          className="dash-march"
          style={beat(DRAFT_LABEL_ALT_BEAT)}
        >
          <line
            x1={BP_X + BP.w + 10}
            y1={BP_Y + BP_PANEL_H}
            x2={BP_X + BP.w + 10}
            y2={BP_TRIGGER_Y}
          />
        </g>
        <MeasureNote
          x={BP_X + BP.w + 15}
          y={BP_Y + BP_PANEL_H + BP.gap / 2 + 2.5}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(5))}
        >
          12
        </MeasureNote>
      </g>
    </DraftSurface>
  )
}

const AN = {
  w: 280,
  rx: 4,
  panelPad: 8,
  listPadY: 4,
  itemH: 40,
  itemGap: 2,
  itemPadX: 16,
  gap: 12,
  triggerH: 56,
  triggerPadX: 24,
  clusterGap: 12,
  chevron: 16,
  ring: 18,
  ringStroke: 2,
  font: 14,
} as const

const AN_ITEMS = [
  { label: 'Introduction', isActive: false },
  { label: 'Getting Started', isActive: true },
  { label: 'API Reference', isActive: false },
] as const
const AN_ACTIVE_INDEX = 1
const AN_ITEM_X = AN.panelPad
const AN_ITEM_W = AN.w - AN.panelPad * 2
const AN_PANEL_H =
  AN.panelPad * 2 +
  AN.listPadY * 2 +
  AN_ITEMS.length * AN.itemH +
  (AN_ITEMS.length - 1) * AN.itemGap
const AN_TRIGGER_Y = AN_PANEL_H + AN.gap
const AN_TRIGGER_MID = AN_TRIGGER_Y + AN.triggerH / 2
const AN_TITLE = 'Getting Started'
const AN_TITLE_X = AN.triggerPadX + 1
const AN_TITLE_W = AN_TITLE.length * AN.font * 0.55
const AN_CHEVRON_X = AN.w - 1 - AN.triggerPadX - AN.chevron
const AN_RING_CX = AN_CHEVRON_X - AN.clusterGap - AN.ring / 2
const AN_RING_R = (AN.ring - AN.ringStroke) / 2
const AN_DIVIDER_X = AN_RING_CX - AN.ring / 2 - AN.clusterGap
const AN_TEXT_BOTTOM = AN_TRIGGER_MID + 5 + 3
const AN_TAG_LANE_END = AN.w + 24

function anItemY(i: number) {
  return AN.panelPad + AN.listPadY + i * (AN.itemH + AN.itemGap)
}

function PanelShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('panel')
  const active = hovered === 'panel'

  return (
    <rect
      x={0}
      y={0}
      width={AN.w}
      height={AN_PANEL_H}
      rx={AN.rx}
      stroke="currentColor"
      strokeWidth={active ? 2 : draftTheme.wireframe.strokeWidth}
      strokeDasharray={active ? undefined : '3 3'}
      fill="currentColor"
      fillOpacity={active ? 0.08 : 0.03}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ ...spotlight.style, pointerEvents: 'all' }}
      onMouseEnter={() => setHovered('panel')}
      onMouseLeave={() => setHovered(null)}
    />
  )
}

function ItemShape({
  index,
  label,
  isActive,
}: {
  index: number
  label: string
  isActive: boolean
}) {
  const { hovered, setHovered } = useAnatomy()
  const partId = isActive ? 'item' : `item-${index}`
  const spotlight = useSpotlight(partId)
  const active = hovered === partId
  const y = anItemY(index)

  return (
    <g
      onMouseEnter={() => setHovered(partId)}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect
        x={AN_ITEM_X}
        y={y}
        width={AN_ITEM_W}
        height={AN.itemH}
        rx={AN.rx}
        fill="currentColor"
        fillOpacity={active ? 0.16 : isActive ? 0.1 : 0}
        stroke="currentColor"
        strokeOpacity={active ? 0.6 : 0}
        className={spotlight.className}
      />
      <text
        x={AN_ITEM_X + AN.itemPadX}
        y={y + AN.itemH / 2 + 5}
        fontSize={AN.font}
        fontFamily="var(--font-sans)"
        className={`pointer-events-none fill-current ${isActive ? 'opacity-100' : 'opacity-60'} ${spotlight.className}`}
      >
        {label}
      </text>
    </g>
  )
}

function TriggerShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('trigger')
  const active = hovered === 'trigger'
  const chevronY = AN_TRIGGER_MID - AN.chevron / 2

  return (
    <g
      onMouseEnter={() => setHovered('trigger')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect
        x={0}
        y={AN_TRIGGER_Y}
        width={AN.w}
        height={AN.triggerH}
        rx={AN.rx}
        stroke="currentColor"
        strokeWidth={active ? 2 : draftTheme.wireframe.strokeWidth}
        fill="currentColor"
        fillOpacity={active ? 0.08 : 0.03}
        className={spotlight.className}
      />
      <line
        x1={AN_DIVIDER_X}
        y1={AN_TRIGGER_MID - 8}
        x2={AN_DIVIDER_X}
        y2={AN_TRIGGER_MID + 8}
        stroke="currentColor"
        strokeOpacity={0.4}
        className={`pointer-events-none ${spotlight.className}`}
      />
      <path
        d={`M${AN_CHEVRON_X + 3.33} ${chevronY + 10} l4.67 -4.67 l4.67 4.67`}
        stroke="currentColor"
        strokeWidth={1.67}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className={`pointer-events-none ${spotlight.className}`}
      />
    </g>
  )
}

function TitleShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('title')
  const active = hovered === 'title'

  return (
    <g
      onMouseEnter={() => setHovered('title')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect
        x={AN_TITLE_X - 2}
        y={AN_TRIGGER_MID - 10}
        width={AN_TITLE_W + 4}
        height={20}
        rx={2}
        fill="currentColor"
        fillOpacity={active ? 0.12 : 0}
        className={spotlight.className}
      />
      <text
        x={AN_TITLE_X}
        y={AN_TRIGGER_MID + 5}
        fontSize={AN.font}
        fontFamily="var(--font-sans)"
        className={`pointer-events-none fill-current ${spotlight.className}`}
      >
        {AN_TITLE}
      </text>
    </g>
  )
}

function ProgressShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('progress')
  const active = hovered === 'progress'
  const circumference = 2 * Math.PI * AN_RING_R

  return (
    <g
      onMouseEnter={() => setHovered('progress')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect
        x={AN_RING_CX - AN.ring / 2}
        y={AN_TRIGGER_MID - AN.ring / 2}
        width={AN.ring}
        height={AN.ring}
        fill="transparent"
      />
      <g transform={`rotate(-90 ${AN_RING_CX} ${AN_TRIGGER_MID})`} className={spotlight.className}>
        <circle
          cx={AN_RING_CX}
          cy={AN_TRIGGER_MID}
          r={AN_RING_R}
          fill="none"
          stroke="currentColor"
          strokeWidth={active ? 3 : AN.ringStroke}
          opacity={0.15}
        />
        <circle
          cx={AN_RING_CX}
          cy={AN_TRIGGER_MID}
          r={AN_RING_R}
          fill="none"
          stroke="var(--bp-accent, var(--color-accent))"
          strokeWidth={active ? 3 : AN.ringStroke}
          strokeDasharray={`${circumference * 0.4} ${circumference}`}
          strokeLinecap="round"
        />
      </g>
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
      <InsetGuide
        x={AN.panelPad}
        y={AN.panelPad}
        w={AN.w - AN.panelPad * 2}
        h={AN_PANEL_H - AN.panelPad * 2}
        offset={0.8}
        boxX={0}
        boxY={0}
        boxW={AN.w}
        boxH={AN_PANEL_H}
        boxRx={AN.rx}
        clipOffset={0.8}
      />
      <MeasureNote x={AN.w / 2} y={AN.panelPad / 2 + 2.5} anchor="middle">
        {`${AN.panelPad}`}
      </MeasureNote>
      <InsetGuide
        x={AN.triggerPadX}
        y={AN_TRIGGER_Y}
        w={AN.w - AN.triggerPadX * 2}
        h={AN.triggerH}
        offset={0.8}
        boxX={0}
        boxY={AN_TRIGGER_Y}
        boxW={AN.w}
        boxH={AN.triggerH}
        boxRx={AN.rx}
        clipOffset={0.8}
      />
      <MeasureNote x={AN.triggerPadX / 2} y={AN_TRIGGER_MID + 2.5} anchor="middle">
        {`${AN.triggerPadX}`}
      </MeasureNote>
      <MeasureNote x={AN.w - AN.triggerPadX / 2} y={AN_TRIGGER_MID + 2.5} anchor="middle">
        {`${AN.triggerPadX}`}
      </MeasureNote>
      <GripFrame x={0} y={AN_TRIGGER_Y} w={AN.w} h={AN.triggerH} />
      <MeasureH x1={0} x2={AN.w} y={-12} label={`${AN.w}`} />
      <MeasureV
        x={-12}
        y1={anItemY(AN_ACTIVE_INDEX)}
        y2={anItemY(AN_ACTIVE_INDEX) + AN.itemH}
        label={`${AN.itemH}`}
        labelXOffset={-6}
      />
      <MeasureV x={-12} y1={AN_PANEL_H} y2={AN_TRIGGER_Y} label={`${AN.gap}`} labelXOffset={-6} />
      <MeasureV
        x={AN.w + 12}
        y1={AN_TRIGGER_Y}
        y2={AN_TRIGGER_Y + AN.triggerH}
        label={`${AN.triggerH}`}
        labelXOffset={5}
        labelAnchor="start"
      />
    </g>
  )
}

export function TableOfContentsBreakdown() {
  const itemMid = anItemY(AN_ACTIVE_INDEX) + AN.itemH / 2
  const itemEnd = AN_ITEM_X + AN_ITEM_W
  const bottomDistance = AN_TRIGGER_Y + AN.triggerH + 12 - AN_TEXT_BOTTOM

  return (
    <AnatomyFrame viewBox="-98 -36 500 296" ariaLabel="Table of contents anatomy">
      <PanelShape />
      {AN_ITEMS.map((item, index) => (
        <ItemShape key={item.label} index={index} label={item.label} isActive={item.isActive} />
      ))}
      <TriggerShape />
      <TitleShape />
      <ProgressShape />
      <AnnotationsLayer />
      <AnatomyCallout
        part="panel"
        label="Panel"
        anchor={[0, 24]}
        side="start"
        measure={`p-${AN.panelPad / 4}, ${AN.itemGap} between rows, max 50vh`}
        caption="Expanded section list, scrolls when it outgrows 50vh"
      />
      <AnatomyCallout
        part="item"
        label="Active item"
        anchor={[itemEnd, itemMid]}
        side="end"
        distance={AN_TAG_LANE_END - itemEnd}
        measure={`${AN.itemH} tall, px ${AN.itemPadX}, level 3 indents to 32`}
        caption="Section button, active one tinted, click smooth-scrolls"
      />
      <AnatomyCallout
        part="trigger"
        label="Trigger"
        anchor={[0, AN_TRIGGER_MID]}
        side="start"
        isAccent
        measure={`${AN.w} x ${AN.triggerH}, px ${AN.triggerPadX}, r${AN.rx}`}
        caption="Floating pill, click expands the list, Esc collapses it"
      />
      <AnatomyCallout
        part="title"
        label="Active title"
        anchor={[AN_TITLE_X + AN_TITLE_W / 2, AN_TEXT_BOTTOM]}
        side="bottom"
        distance={bottomDistance}
        measure={`${AN.font}px text, truncates`}
        caption="Section currently in view, tracked by IntersectionObserver"
      />
      <AnatomyCallout
        part="progress"
        label="Progress ring"
        anchor={[AN_RING_CX, AN_TRIGGER_MID + AN.ring / 2]}
        side="bottom"
        distance={AN_TRIGGER_Y + AN.triggerH + 12 - (AN_TRIGGER_MID + AN.ring / 2)}
        measure={`${AN.ring} ring, stroke ${AN.ringStroke}, ${AN.clusterGap} gaps`}
        caption="CircularProgress showing how far the page has scrolled"
      />
    </AnatomyFrame>
  )
}

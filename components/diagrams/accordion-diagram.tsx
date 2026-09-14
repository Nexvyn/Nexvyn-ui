'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset, licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root LICENSE.

import {
  AnatomyFrame,
  AnatomyCallout,
  useAnatomy,
  useSpotlight,
} from '@/components/diagrams/lib/anatomy-parts'
import {
  DraftSurface,
  DRAFT_BEAT,
  DRAFT_FILL_PANEL,
  DRAFT_INK_MORPH,
  DRAFT_SCAFFOLD_FADE,
  DRAFT_TEXT_SOFT,
  draftTheme,
  beat,
  MeasureH,
  MeasureV,
  InsetGuide,
  GripFrame,
  squircleRectPath,
  DRAFT_LABEL_BEAT,
  stampBeat,
} from '@/components/diagrams/lib/diagram-parts'

const BP_S = 0.75
const BP_ITEM_W = 164
const BP_TRIGGER_H = 48 * BP_S
const BP_FONT = 16 * BP_S
const BP_CONTENT_FONT = 14 * BP_S
const BP_CONTENT_LINE = 20 * BP_S
const BP_PAD_X = 16 * BP_S
const BP_PAD_Y = 12 * BP_S
const BP_CONTENT_H = BP_CONTENT_LINE + BP_PAD_Y
const BP_ITEM_GAP = 8 * BP_S
const BP_ITEM_R = 4 * BP_S
const BP_CHEVRON = 16 * BP_S
const BP_X = (220 - BP_ITEM_W) / 2

const BP_ITEM0_H = BP_TRIGGER_H + BP_CONTENT_H
const BP_Y = (140 - (BP_ITEM0_H + BP_ITEM_GAP + BP_TRIGGER_H)) / 2
const BP_ITEM1_Y = BP_Y + BP_ITEM0_H + BP_ITEM_GAP

const BP_CONTENT_RISE =
  'opacity-60 -translate-y-[3px] transition-[opacity,translate] duration-(--motion-dur-showcase) ease-(--motion-ease-in-out) group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-(--motion-dur-base) group-focus-visible:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:delay-(--motion-dur-base) motion-reduce:transition-none motion-reduce:translate-none'

const BP_CHEVRON_FLIP =
  'origin-center transition-transform duration-(--motion-dur-slow) ease-(--motion-ease-in-out) group-hover:rotate-180 group-hover:delay-(--motion-dur-base) group-focus-visible:rotate-180 group-focus-visible:delay-(--motion-dur-base) motion-reduce:transition-none motion-reduce:transform-none'

const BP_CHEVRON_INK = `${DRAFT_INK_MORPH} stroke-current opacity-35 group-hover:opacity-60 group-focus-visible:opacity-60`

function TriggerRow({ y, label, flips }: { y: number; label: string; flips: boolean }) {
  const midY = y + BP_TRIGGER_H / 2
  const cx = BP_X + BP_ITEM_W - BP_PAD_X - BP_CHEVRON / 2
  const u = BP_CHEVRON / 24
  return (
    <>
      <text
        x={BP_X + BP_PAD_X}
        y={midY + BP_FONT * 0.35}
        fontSize={BP_FONT}
        fontFamily="var(--font-sans)"
        style={beat(DRAFT_LABEL_BEAT)}
        className={`fade-note ${DRAFT_TEXT_SOFT}`}
      >
        {label}
      </text>
      <g className={flips ? BP_CHEVRON_FLIP : undefined} style={{ transformBox: 'fill-box' }}>
        <rect
          x={cx - BP_CHEVRON / 2}
          y={midY - BP_CHEVRON / 2}
          width={BP_CHEVRON}
          height={BP_CHEVRON}
          fill="none"
          stroke="none"
        />
        <path
          d={`M${cx - 6 * u} ${midY - 3 * u} L${cx} ${midY + 3 * u} L${cx + 6 * u} ${midY - 3 * u}`}
          fill="none"
          strokeWidth={draftTheme.wireframe.strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={BP_CHEVRON_INK}
        />
      </g>
    </>
  )
}

export function AccordionBlueprint() {
  const theme = draftTheme
  const contentY = BP_Y + BP_TRIGGER_H

  return (
    <DraftSurface>
      <path
        d={squircleRectPath(BP_X, BP_Y, BP_ITEM_W, BP_ITEM0_H, BP_ITEM_R)}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        style={beat(DRAFT_BEAT.outline)}
        className={`ink-draw ${DRAFT_FILL_PANEL}`}
      />
      <TriggerRow y={BP_Y} label="Is it accessible?" flips />
      <g className={BP_CONTENT_RISE}>
        <text
          x={BP_X + BP_PAD_X}
          y={contentY + BP_CONTENT_LINE / 2 + BP_CONTENT_FONT * 0.35}
          fontSize={BP_CONTENT_FONT}
          fontFamily="var(--font-sans)"
          className={`${DRAFT_INK_MORPH} fill-current opacity-35 group-hover:opacity-80 group-focus-visible:opacity-80`}
        >
          Adheres to WAI-ARIA.
        </text>
      </g>

      <path
        d={squircleRectPath(BP_X, BP_ITEM1_Y, BP_ITEM_W, BP_TRIGGER_H, BP_ITEM_R)}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        style={beat(DRAFT_BEAT.anatomy)}
        className={`ink-draw ${DRAFT_FILL_PANEL}`}
      />
      <TriggerRow y={BP_ITEM1_Y} label="Is it animated?" flips={false} />

      <g className={DRAFT_SCAFFOLD_FADE}>
        <InsetGuide
          x={BP_X + BP_PAD_X}
          y={BP_Y + BP_PAD_Y}
          w={BP_ITEM_W - BP_PAD_X * 2}
          h={BP_ITEM0_H - BP_PAD_Y * 2}
          offset={0.8}
          boxX={BP_X}
          boxY={BP_Y}
          boxW={BP_ITEM_W}
          boxH={BP_ITEM0_H}
          boxRx={BP_ITEM_R}
          clipOffset={0.8}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <MeasureV
          x={BP_X + BP_ITEM_W + 8}
          y1={BP_Y + BP_ITEM0_H}
          y2={BP_ITEM1_Y}
          label="8"
          labelXOffset={5}
          labelAnchor="start"
          className="note-stamp"
          style={beat(stampBeat(0))}
        />
        <MeasureV
          x={BP_X - 12}
          y1={BP_ITEM1_Y}
          y2={BP_ITEM1_Y + BP_TRIGGER_H}
          label="48"
          labelXOffset={-5}
          className="note-stamp"
          style={beat(stampBeat(1))}
        />
      </g>
    </DraftSurface>
  )
}

const ITEM_W = 200
const ITEM_H = 48
const CONTENT_H = 52
const ITEM_GAP = 8
const ITEM_R = 4
const CHEVRON_SIZE = 16
const PAD_X = 16

const ITEM0_Y = 0
const ITEM1_Y = ITEM_H + CONTENT_H + ITEM_GAP
const ITEM2_Y = ITEM1_Y + ITEM_H + ITEM_GAP
const TOTAL_H = ITEM2_Y + ITEM_H
const CHEVRON_CX = ITEM_W - PAD_X - CHEVRON_SIZE / 2

function itemY(index: number) {
  return index === 0 ? ITEM0_Y : index === 1 ? ITEM1_Y : ITEM2_Y
}

function ContainerShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('container')

  return (
    <g
      onMouseEnter={() => setHovered('container')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={-4}
        y={-4}
        width={ITEM_W + 8}
        height={TOTAL_H + 8}
        rx={ITEM_R + 4}
        fill="transparent"
        stroke="currentColor"
        strokeWidth={hovered === 'container' ? 1.5 : 1}
        strokeDasharray="3 3"
        strokeOpacity={0.3}
        className={spotlight.className}
        style={spotlight.style}
      />
    </g>
  )
}

function ItemShape({ index, isExpanded }: { index: number; isExpanded: boolean }) {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('item')

  const yOffset = itemY(index)
  const itemH = isExpanded ? ITEM_H + CONTENT_H : ITEM_H

  return (
    <g
      onMouseEnter={() => setHovered('item')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={0}
        y={yOffset}
        width={ITEM_W}
        height={itemH}
        rx={ITEM_R}
        fill="none"
        stroke="currentColor"
        strokeWidth={hovered === 'item' ? 1.75 : 1.25}
        strokeOpacity={0.6}
        className={spotlight.className}
        style={spotlight.style}
      />
    </g>
  )
}

function TriggerShape({ index }: { index: number }) {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('trigger')

  const yOffset = itemY(index)

  return (
    <g
      onMouseEnter={() => setHovered('trigger')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={1}
        y={yOffset + 1}
        width={ITEM_W - 2}
        height={ITEM_H - 2}
        rx={ITEM_R - 1}
        fill="currentColor"
        fillOpacity={hovered === 'trigger' ? 0.12 : 0.04}
        className={spotlight.className}
        style={spotlight.style}
      />
      <text
        x={PAD_X}
        y={yOffset + ITEM_H / 2 + 5}
        fontSize={16}
        fontFamily="var(--font-sans)"
        className={`fill-current ${spotlight.className}`}
        style={spotlight.style}
      >
        {index === 0 ? 'Section title' : index === 1 ? 'Another section' : 'Third section'}
      </text>
    </g>
  )
}

function ChevronShape({ index, isExpanded }: { index: number; isExpanded: boolean }) {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('chevron')

  const cx = CHEVRON_CX
  const cy = itemY(index) + ITEM_H / 2

  return (
    <g
      onMouseEnter={() => setHovered('chevron')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
      transform={isExpanded ? `rotate(180, ${cx}, ${cy})` : undefined}
    >
      <rect
        x={cx - CHEVRON_SIZE / 2}
        y={cy - CHEVRON_SIZE / 2}
        width={CHEVRON_SIZE}
        height={CHEVRON_SIZE}
        fill="transparent"
      />
      <polyline
        points={`${cx - 4},${cy - 2} ${cx},${cy + 2} ${cx + 4},${cy - 2}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={hovered === 'chevron' ? 2 : 1.33}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={spotlight.className}
        style={spotlight.style}
      />
    </g>
  )
}

function ContentShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('content')
  const lineOpacity = hovered === 'content' ? 0.6 : 0.3

  return (
    <g
      onMouseEnter={() => setHovered('content')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect x={0} y={ITEM_H} width={ITEM_W} height={CONTENT_H} fill="transparent" />
      <line
        x1={PAD_X}
        y1={ITEM_H + 10}
        x2={ITEM_W - PAD_X - 8}
        y2={ITEM_H + 10}
        stroke="currentColor"
        strokeWidth={1.5}
        strokeOpacity={lineOpacity}
        strokeLinecap="round"
        className={spotlight.className}
        style={spotlight.style}
      />
      <line
        x1={PAD_X}
        y1={ITEM_H + 30}
        x2={ITEM_W - PAD_X - 48}
        y2={ITEM_H + 30}
        stroke="currentColor"
        strokeWidth={1.5}
        strokeOpacity={lineOpacity}
        strokeLinecap="round"
        className={spotlight.className}
        style={spotlight.style}
      />
    </g>
  )
}

function HeadingShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('heading')

  return (
    <g
      onMouseEnter={() => setHovered('heading')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={-2}
        y={-2}
        width={ITEM_W + 4}
        height={ITEM_H + 4}
        rx={ITEM_R + 2}
        fill="none"
        stroke="currentColor"
        strokeWidth={hovered === 'heading' ? 1.25 : 0.75}
        strokeOpacity={0.35}
        strokeDasharray="4 2"
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
      className={`transition-[opacity,filter] duration-(--motion-dur-base) ease-(--motion-ease-in-out) motion-reduce:transition-none motion-reduce:filter-none ${dimmed ? 'opacity-30' : 'opacity-100'}`}
    >
      <GripFrame x={0} y={0} w={ITEM_W} h={ITEM_H} />
      <InsetGuide
        x={PAD_X}
        y={ITEM2_Y}
        w={ITEM_W - PAD_X * 2}
        h={ITEM_H}
        offset={0.8}
        boxX={0}
        boxY={ITEM2_Y}
        boxW={ITEM_W}
        boxH={ITEM_H}
        boxRx={ITEM_R}
        clipOffset={0.8}
      />
      <InsetGuide
        x={PAD_X}
        y={ITEM_H}
        w={ITEM_W - PAD_X * 2}
        h={CONTENT_H - 12}
        offset={0.8}
        boxX={0}
        boxY={ITEM_H}
        boxW={ITEM_W}
        boxH={CONTENT_H}
        boxRx={0}
        clipOffset={0.8}
      />
      <MeasureV
        x={ITEM_W + 10}
        y1={ITEM_H + CONTENT_H - 12}
        y2={ITEM_H + CONTENT_H}
        label="12"
        labelXOffset={5}
        labelAnchor="start"
      />
      <MeasureH x1={0} x2={PAD_X} y={TOTAL_H + 14} label={`${PAD_X}`} labelYOffset={11} />
      <MeasureV x={-14} y1={ITEM2_Y} y2={TOTAL_H} label={`${ITEM_H}`} labelXOffset={-6} />
      <MeasureV
        x={-14}
        y1={ITEM1_Y + ITEM_H}
        y2={ITEM2_Y}
        label={`${ITEM_GAP}`}
        labelXOffset={-6}
      />
    </g>
  )
}

function Callouts() {
  return (
    <>
      <AnatomyCallout
        part="container"
        label="Container"
        anchor={[-4, TOTAL_H / 2]}
        side="start"
        distance={24}
        isAccent
        measure="flex col · gap 8"
        caption="Accordion root. Holds items and the single or multiple mode."
      />
      <AnatomyCallout
        part="heading"
        label="Heading"
        anchor={[-2, ITEM_H / 2]}
        side="start"
        distance={26}
        measure="h3 · headingLevel 2 to 6"
        caption="Heading element that wraps each trigger for the document outline."
      />
      <AnatomyCallout
        part="trigger"
        label="Trigger"
        anchor={[ITEM_W / 2, 0]}
        side="top"
        distance={24}
        isAccent
        measure={`${ITEM_H} tall · px ${PAD_X} · py 12 · text 16`}
        caption="Button that toggles its panel. Enter or Space to toggle."
      />
      <AnatomyCallout
        part="chevron"
        label="Chevron"
        anchor={[CHEVRON_CX + 4, ITEM_H / 2]}
        side="end"
        distance={ITEM_W + 24 - CHEVRON_CX - 4}
        measure={`${CHEVRON_SIZE} × ${CHEVRON_SIZE} · rotates 180`}
        caption="State icon. Flips when the item is expanded."
      />
      <AnatomyCallout
        part="content"
        label="Content"
        anchor={[ITEM_W, ITEM_H + CONTENT_H / 2]}
        side="end"
        distance={24}
        measure={`px ${PAD_X} · pb 12 · text 14`}
        caption="Region panel that unfolds with a grid-rows reveal and y-settle."
      />
      <AnatomyCallout
        part="item"
        label="Item"
        anchor={[ITEM_W, ITEM1_Y + ITEM_H / 2]}
        side="end"
        distance={24}
        measure={`w full · r${ITEM_R} · border 1`}
        caption="One section. Pairs a trigger with its content by value."
      />
    </>
  )
}

export function AccordionAnatomy() {
  return (
    <AnatomyFrame
      viewBox="-114 -60 412 316"
      ariaLabel="Accordion anatomy: container, item, heading, trigger, chevron and content"
    >
      <ContainerShape />
      <ItemShape index={0} isExpanded />
      <HeadingShape />
      <TriggerShape index={0} />
      <ChevronShape index={0} isExpanded />
      <ContentShape />
      <ItemShape index={1} isExpanded={false} />
      <TriggerShape index={1} />
      <ChevronShape index={1} isExpanded={false} />
      <ItemShape index={2} isExpanded={false} />
      <TriggerShape index={2} />
      <ChevronShape index={2} isExpanded={false} />
      <AnnotationsLayer />
      <Callouts />
    </AnatomyFrame>
  )
}

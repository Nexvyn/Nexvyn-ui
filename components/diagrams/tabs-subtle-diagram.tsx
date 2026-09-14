'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset, licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root LICENSE.

import { type CSSProperties } from 'react'

import {
  AnatomyFrame,
  AnatomyCallout,
  useAnatomy,
  useSpotlight,
} from '@/components/diagrams/lib/anatomy-parts'
import {
  DraftSurface,
  DRAFT_SCAFFOLD_FADE,
  DRAFT_INK_MORPH,
  DRAFT_FILL_MUTED,
  draftTheme,
  MeasureH,
  MeasureNote,
  MeasureV,
  InsetGuide,
  GripFrame,
  beat,
  DRAFT_BEAT,
  DRAFT_LABEL_ALT_BEAT,
  stampBeat,
} from '@/components/diagrams/lib/diagram-parts'

const LABELS = ['Overview', 'Activity', 'Settings']

const BP_S = 0.72
const BP = {
  pad: 6 * BP_S,
  gap: 2 * BP_S,
  itemH: 32 * BP_S,
  itemPadX: 12 * BP_S,
  itemPadY: 6 * BP_S,
  rx: 4 * BP_S,
  font: 10,
} as const
const BP_ITEM_W = [80, 70, 74].map((w) => w * BP_S)
const BP_ITEM_X = BP_ITEM_W.map(
  (_, i) => BP.pad + BP_ITEM_W.slice(0, i).reduce((sum, w) => sum + w + BP.gap, 0),
)
const BP_W = BP.pad * 2 + BP_ITEM_W.reduce((sum, w) => sum + w, 0) + BP.gap * 2
const BP_H = BP.pad * 2 + BP.itemH
const BP_X = (220 - BP_W) / 2
const BP_Y = (140 - BP_H) / 2
const BP_TARGET = 1
const BP_PILL_TRAVEL = BP_ITEM_X[BP_TARGET] - BP_ITEM_X[0]
const BP_PILL_SCALE = BP_ITEM_W[BP_TARGET] / BP_ITEM_W[0]
const BP_NOTE_Y = BP_Y + BP_H + 16

const BP_TEXT_CLASS = [
  `${DRAFT_INK_MORPH} fill-current opacity-70 group-hover:fill-(--color-muted) group-hover:opacity-100 group-focus-visible:fill-(--color-muted) group-focus-visible:opacity-100`,
  `${DRAFT_INK_MORPH} fill-current opacity-35 group-hover:opacity-100 group-focus-visible:opacity-100`,
  `${DRAFT_INK_MORPH} fill-current opacity-35 group-hover:fill-(--color-muted) group-hover:opacity-100 group-focus-visible:fill-(--color-muted) group-focus-visible:opacity-100`,
] as const

export function TabsSubtleBlueprint() {
  const theme = draftTheme
  const gapX = BP_X + BP_ITEM_X[0] + BP_ITEM_W[0]
  return (
    <DraftSurface>
      <rect
        x={BP_X}
        y={BP_Y}
        width={BP_W}
        height={BP_H}
        rx={BP.rx}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        style={beat(DRAFT_BEAT.outline)}
        className={`ink-draw ${DRAFT_FILL_MUTED}`}
      />
      <rect
        x={BP_X + BP_ITEM_X[0]}
        y={BP_Y + BP.pad}
        width={BP_ITEM_W[0]}
        height={BP.itemH}
        rx={BP.rx}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={theme.wireframe.strokeWidth}
        style={
          {
            transformBox: 'fill-box',
            transformOrigin: 'left center',
            '--bp-pill-travel': `${BP_PILL_TRAVEL}px`,
            '--bp-pill-scale': `${BP_PILL_SCALE}`,
            ...beat(DRAFT_BEAT.anatomy),
          } as CSSProperties
        }
        className={`ink-draw fill-transparent stroke-current transition-[fill,stroke,filter,translate,scale] duration-(--motion-dur-slow) ease-(--motion-ease-in-out) group-hover:delay-(--motion-dur-base) group-focus-visible:delay-(--motion-dur-base) motion-reduce:transition-none group-hover:translate-x-(--bp-pill-travel) group-hover:scale-x-(--bp-pill-scale) group-hover:fill-(--color-bg) group-hover:stroke-transparent group-hover:drop-shadow-sm group-focus-visible:translate-x-(--bp-pill-travel) group-focus-visible:scale-x-(--bp-pill-scale) group-focus-visible:fill-(--color-bg) group-focus-visible:stroke-transparent group-focus-visible:drop-shadow-sm motion-reduce:transform-none`}
      />
      {LABELS.map((label, i) => (
        <text
          key={label}
          x={BP_X + BP_ITEM_X[i] + BP_ITEM_W[i] / 2}
          y={BP_Y + BP.pad + BP.itemH / 2 + BP.font * 0.35}
          textAnchor="middle"
          fontSize={BP.font}
          fontFamily="var(--font-sans)"
          style={beat(stampBeat(i))}
          className={`fade-note ${BP_TEXT_CLASS[i]}`}
        >
          {label}
        </text>
      ))}
      <g className={DRAFT_SCAFFOLD_FADE}>
        <GripFrame x={BP_X} y={BP_Y} w={BP_W} h={BP_H} style={beat(DRAFT_BEAT.handle)} />
        <MeasureH
          x1={BP_X}
          x2={BP_X + BP_W}
          y={BP_Y - 14}
          label="240"
          className="note-stamp"
          style={beat(stampBeat(1))}
        />
        <InsetGuide
          x={BP_X + BP.pad}
          y={BP_Y + BP.pad}
          w={BP_W - BP.pad * 2}
          h={BP_H - BP.pad * 2}
          offset={0.8}
          boxX={BP_X}
          boxY={BP_Y}
          boxW={BP_W}
          boxH={BP_H}
          boxRx={BP.rx}
          clipOffset={0.8}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <InsetGuide
          x={BP_X + BP_ITEM_X[0] + BP.itemPadX}
          y={BP_Y + BP.pad + BP.itemPadY}
          w={BP_ITEM_W[0] - BP.itemPadX * 2}
          h={BP.itemH - BP.itemPadY * 2}
          offset={0.8}
          boxX={BP_X + BP_ITEM_X[0]}
          boxY={BP_Y + BP.pad}
          boxW={BP_ITEM_W[0]}
          boxH={BP.itemH}
          boxRx={BP.rx}
          clipOffset={0.8}
          className="dash-march"
          style={beat(DRAFT_LABEL_ALT_BEAT)}
        />
        <g
          stroke="var(--bp-accent, var(--color-accent))"
          strokeWidth={theme.guide.strokeWidth}
          strokeDasharray="2 2"
          opacity={theme.guide.structOpacity}
          className="dash-march"
          style={beat(stampBeat(0))}
        >
          <line x1={gapX} y1={BP_Y + BP_H + 2} x2={gapX} y2={BP_Y + BP_H + 7} />
          <line x1={gapX + BP.gap} y1={BP_Y + BP_H + 2} x2={gapX + BP.gap} y2={BP_Y + BP_H + 7} />
        </g>
        <MeasureNote
          x={BP_X + BP.pad}
          y={BP_NOTE_Y}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(2))}
        >
          p6
        </MeasureNote>
        <MeasureNote
          x={gapX + BP.gap / 2}
          y={BP_NOTE_Y}
          className="note-stamp"
          style={beat(stampBeat(3))}
        >
          gap 2
        </MeasureNote>
        <MeasureV
          x={BP_X - 8}
          y1={BP_Y}
          y2={BP_Y + BP_H}
          label="44"
          className="note-stamp"
          style={beat(stampBeat(2))}
        />
        <MeasureNote
          x={BP_X + BP_ITEM_X[0] + BP.itemPadX / 2}
          y={BP_Y - 4}
          className="note-stamp"
          style={beat(stampBeat(4))}
        >
          12
        </MeasureNote>
      </g>
    </DraftSurface>
  )
}

const AN = {
  pad: 6,
  gap: 2,
  itemH: 32,
  itemPadX: 12,
  itemPadY: 6,
  rx: 4,
  font: 13,
} as const

const AN_ITEM_W = [80, 70, 74] as const
const AN_ITEM_X = AN_ITEM_W.map(
  (_, i) => AN.pad + AN_ITEM_W.slice(0, i).reduce((sum, w) => sum + w + AN.gap, 0),
)
const AN_W = AN.pad * 2 + AN_ITEM_W.reduce((sum, w) => sum + w, 0) + AN.gap * 2
const AN_H = AN.pad * 2 + AN.itemH
const AN_ITEM_BOTTOM = AN.pad + AN.itemH
const AN_TAG_TOP = AN_H + 22
const AN_ITEM_INDEX = 2

function ContainerShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('container')
  const active = hovered === 'container'
  return (
    <rect
      x={0}
      y={0}
      width={AN_W}
      height={AN_H}
      rx={AN.rx}
      fill="currentColor"
      fillOpacity={active ? 0.18 : 0.08}
      stroke="currentColor"
      strokeOpacity={active ? 0.6 : 0}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ ...spotlight.style, pointerEvents: 'all' }}
      onMouseEnter={() => setHovered('container')}
      onMouseLeave={() => setHovered(null)}
    />
  )
}

function PillShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('pill')
  const active = hovered === 'pill'
  return (
    <g
      onMouseEnter={() => setHovered('pill')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect
        x={AN_ITEM_X[0]}
        y={AN.pad}
        width={AN_ITEM_W[0]}
        height={AN.itemH}
        rx={AN.rx}
        fill="var(--color-bg)"
        stroke="currentColor"
        strokeWidth={active ? 2 : draftTheme.wireframe.strokeWidth}
        className={spotlight.className}
      />
      <text
        x={AN_ITEM_X[0] + AN.itemPadX}
        y={AN.pad + AN.itemH / 2 + 4.5}
        fontSize={AN.font}
        fontFamily="var(--font-sans)"
        className={`pointer-events-none fill-current ${spotlight.className}`}
      >
        {LABELS[0]}
      </text>
    </g>
  )
}

function ItemShape({ index }: { index: number }) {
  const { hovered, setHovered } = useAnatomy()
  const partId = index === AN_ITEM_INDEX ? 'item' : `item-${index}`
  const spotlight = useSpotlight(partId)
  const active = hovered === partId
  return (
    <g
      onMouseEnter={() => setHovered(partId)}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect
        x={AN_ITEM_X[index]}
        y={AN.pad}
        width={AN_ITEM_W[index]}
        height={AN.itemH}
        rx={AN.rx}
        fill="currentColor"
        fillOpacity={active ? 0.1 : 0}
        stroke="currentColor"
        strokeOpacity={active ? 0.6 : 0}
        strokeDasharray="2 2"
        className={spotlight.className}
      />
      <text
        x={AN_ITEM_X[index] + AN.itemPadX}
        y={AN.pad + AN.itemH / 2 + 4.5}
        fontSize={AN.font}
        fontFamily="var(--font-sans)"
        className={`pointer-events-none fill-current ${active ? 'opacity-100' : 'opacity-60'} ${spotlight.className}`}
      >
        {LABELS[index]}
      </text>
    </g>
  )
}

function AnnotationsLayer() {
  const { hovered, pinned } = useAnatomy()
  const dimmed = (hovered ?? pinned) !== null
  const gapX = AN_ITEM_X[0] + AN_ITEM_W[0]
  return (
    <g
      style={{ pointerEvents: 'none', filter: dimmed ? 'url(#spotlight-blur)' : 'none' }}
      className={`transition-[opacity,filter] duration-(--motion-dur-base) ease-(--motion-ease-in-out) motion-reduce:transition-none motion-reduce:filter-none ${dimmed ? 'opacity-30' : 'opacity-100'}`}
    >
      <GripFrame x={0} y={0} w={AN_W} h={AN_H} />
      <MeasureH x1={0} x2={AN_W} y={-14} label={`${AN_W}`} />
      <MeasureV
        x={AN_W + 12}
        y1={0}
        y2={AN_H}
        label={`${AN_H}`}
        labelXOffset={5}
        labelAnchor="start"
      />
      <InsetGuide
        x={AN.pad}
        y={AN.pad}
        w={AN_W - AN.pad * 2}
        h={AN_H - AN.pad * 2}
        offset={0.8}
        boxX={0}
        boxY={0}
        boxW={AN_W}
        boxH={AN_H}
        boxRx={AN.rx}
        clipOffset={0.8}
      />
      <MeasureNote x={AN.pad / 2} y={-4} anchor="middle">
        {`${AN.pad}`}
      </MeasureNote>
      <InsetGuide
        x={AN_ITEM_X[0] + AN.itemPadX}
        y={AN.pad + AN.itemPadY}
        w={AN_ITEM_W[0] - AN.itemPadX * 2}
        h={AN.itemH - AN.itemPadY * 2}
        offset={0.8}
        boxX={AN_ITEM_X[0]}
        boxY={AN.pad}
        boxW={AN_ITEM_W[0]}
        boxH={AN.itemH}
        boxRx={AN.rx}
        clipOffset={0.8}
      />
      <MeasureNote x={AN_ITEM_X[0] + AN.itemPadX / 2} y={AN_H + 10} anchor="middle">
        {`${AN.itemPadX}`}
      </MeasureNote>
      <g
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={draftTheme.guide.strokeWidth}
        opacity={draftTheme.guide.structOpacity}
      >
        <line x1={gapX} y1={AN_H + 2} x2={gapX} y2={AN_H + 6} />
        <line x1={gapX + AN.gap} y1={AN_H + 2} x2={gapX + AN.gap} y2={AN_H + 6} />
      </g>
      <MeasureNote x={gapX + AN.gap / 2 + 4} y={AN_H + 10} anchor="start">
        {`${AN.gap}`}
      </MeasureNote>
    </g>
  )
}

export function TabsSubtleAnatomy() {
  const pillMidX = AN_ITEM_X[0] + AN_ITEM_W[0] / 2
  const itemMidX = AN_ITEM_X[AN_ITEM_INDEX] + AN_ITEM_W[AN_ITEM_INDEX] / 2
  return (
    <AnatomyFrame viewBox="-104 -38 384 138" ariaLabel="Tabs subtle anatomy">
      <ContainerShape />
      {AN_ITEM_W.map((_, index) => (index === 0 ? null : <ItemShape key={index} index={index} />))}
      <PillShape />
      <AnnotationsLayer />
      <AnatomyCallout
        part="container"
        label="Tab list"
        anchor={[0, AN_H / 2]}
        side="start"
        measure={`${AN_W} x ${AN_H}, p-1.5, gap ${AN.gap}, r${AN.rx}`}
        caption="role tablist on surface-2, arrows, Home and End move focus"
      />
      <AnatomyCallout
        part="pill"
        label="Selected pill"
        anchor={[pillMidX, AN_ITEM_BOTTOM]}
        side="bottom"
        distance={AN_TAG_TOP - AN_ITEM_BOTTOM}
        isAccent
        measure={`${AN_ITEM_W[0]} x ${AN.itemH}, bg fill, r${AN.rx}`}
        caption="Shared layout indicator that springs to the selected tab"
      />
      <AnatomyCallout
        part="item"
        label="Tab"
        anchor={[itemMidX, AN_ITEM_BOTTOM]}
        side="bottom"
        distance={AN_TAG_TOP - AN_ITEM_BOTTOM}
        measure={`${AN.itemH} tall, px ${AN.itemPadX}, ${AN.font}px text`}
        caption="role tab button, muted until selected, roving tabindex"
      />
    </AnatomyFrame>
  )
}

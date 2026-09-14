'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset, licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root LICENSE.

import {
  type DraftTheme,
  DraftSurface,
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
  DRAFT_LABEL_BEAT,
  stampBeat,
} from '@/components/diagrams/lib/diagram-parts'
import {
  AnatomyFrame,
  AnatomyCallout,
  useAnatomy,
  useSpotlight,
} from '@/components/diagrams/lib/anatomy-parts'

const GD = {
  scale: 0.65,
  width: 240,
  btnW: 78,
  btnH: 34,
  btnRx: 12,
  gap: 18,
  itemH: 40,
  itemRx: 4,
  itemPadX: 12,
  panelPad: 6,
  panelRx: 20,
  font: 15,
} as const

const GD_ITEMS = ['Copy link', 'Share on X', 'Embed'] as const
const GD_PANEL_H = GD_ITEMS.length * GD.itemH + GD.panelPad * 2

const S = GD.scale
const BP_W = GD.width * S
const BP_TOTAL_H = (GD.btnH + GD.gap + GD_PANEL_H) * S
const BP_NOTE_LANE = 29
const BP_X = (220 - BP_W - BP_NOTE_LANE) / 2
const BP_Y = (140 - BP_TOTAL_H) / 2
const BP_TRIGGER = {
  x: BP_X + (GD.width - GD.btnW) * S,
  y: BP_Y,
  w: GD.btnW * S,
  h: GD.btnH * S,
  rx: GD.btnRx * S,
} as const
const BP_PANEL = {
  x: BP_X,
  y: BP_Y + (GD.btnH + GD.gap) * S,
  w: BP_W,
  h: GD_PANEL_H * S,
  rx: GD.panelRx * S,
} as const
const BP_PAD = GD.panelPad * S
const BP_ITEM = {
  x: BP_PANEL.x + BP_PAD,
  w: BP_PANEL.w - BP_PAD * 2,
  h: GD.itemH * S,
  rx: GD.itemRx * S,
} as const
const BP_ITEM_Y = GD_ITEMS.map((_, i) => BP_PANEL.y + BP_PAD + i * BP_ITEM.h)
const BP_FONT = GD.font * S
const BP_BRIDGE_X = BP_TRIGGER.x + BP_TRIGGER.w / 2
const BP_GAP_DIM_X = BP_TRIGGER.x - 12

function rowBaseline(rowY: number, rowH: number, font: number) {
  return rowY + rowH / 2 + font * 0.35
}

const GD_CARD_FILL = `${DRAFT_INK_MORPH} fill-transparent stroke-current group-hover:fill-(--color-card) group-focus-visible:fill-(--color-card) group-hover:stroke-(--color-border-strong) group-focus-visible:stroke-(--color-border-strong)`

export function GooDropdownWireframe() {
  const theme = draftTheme
  return (
    <DraftSurface>
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
        className={`ink-draw ${GD_CARD_FILL}`}
      />
      <text
        x={BP_TRIGGER.x + BP_TRIGGER.w / 2}
        y={rowBaseline(BP_TRIGGER.y, BP_TRIGGER.h, BP_FONT)}
        textAnchor="middle"
        fontSize={BP_FONT}
        fontFamily="var(--font-sans)"
        style={beat(DRAFT_LABEL_BEAT)}
        className={`fade-note ${DRAFT_TEXT_SOFT}`}
      >
        Share
      </text>
      <g
        className={`${DRAFT_INK_MORPH} opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100`}
      >
        <rect
          x={BP_PANEL.x}
          y={BP_PANEL.y}
          width={BP_PANEL.w}
          height={BP_PANEL.h}
          rx={BP_PANEL.rx}
          strokeWidth={theme.wireframe.strokeWidth}
          className={`${GD_CARD_FILL} group-hover:drop-shadow-md group-focus-visible:drop-shadow-md`}
        />
        <rect
          x={BP_ITEM.x}
          y={BP_ITEM_Y[0]}
          width={BP_ITEM.w}
          height={BP_ITEM.h}
          rx={BP_ITEM.rx}
          fill="currentColor"
          opacity={0.08}
        />
      </g>
      {GD_ITEMS.map((label, i) => (
        <text
          key={label}
          x={BP_ITEM.x + GD.itemPadX * S}
          y={rowBaseline(BP_ITEM_Y[i], BP_ITEM.h, BP_FONT)}
          fontSize={BP_FONT}
          fontFamily="var(--font-sans)"
          style={beat(`${450 + i * 70}ms`)}
          className={`fade-note ${DRAFT_INK_MORPH} opacity-30 group-hover:opacity-100 group-focus-visible:opacity-100 ${
            i === 0 ? 'fill-current' : 'fill-(--color-muted)'
          }`}
        >
          {label}
        </text>
      ))}

      <g className={DRAFT_SCAFFOLD_FADE}>
        <path
          d={`M${BP_BRIDGE_X - 6} ${BP_TRIGGER.y + BP_TRIGGER.h} q6 8 12 0`}
          fill="none"
          stroke="var(--bp-accent, var(--color-accent))"
          strokeWidth={theme.guide.strokeWidth}
          strokeDasharray="2 2"
          opacity={theme.guide.structOpacity}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <rect
          x={BP_PANEL.x}
          y={BP_PANEL.y}
          width={BP_PANEL.w}
          height={BP_PANEL.h}
          rx={BP_PANEL.rx}
          fill="none"
          stroke="currentColor"
          strokeWidth={theme.guide.strokeWidth}
          strokeDasharray="3 3"
          opacity={theme.guide.structOpacity}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        {BP_ITEM_Y.map((y) => (
          <rect
            key={y}
            x={BP_ITEM.x}
            y={y}
            width={BP_ITEM.w}
            height={BP_ITEM.h}
            rx={BP_ITEM.rx}
            fill="none"
            stroke="currentColor"
            strokeWidth={theme.guide.strokeWidth}
            strokeOpacity={theme.wireframe.strokeOpacity * 0.3}
            style={beat(DRAFT_BEAT.guide)}
            className="fade-note"
          />
        ))}
      </g>
      <g className={DRAFT_SCAFFOLD_FADE}>
        <GripFrame
          x={BP_TRIGGER.x}
          y={BP_TRIGGER.y}
          w={BP_TRIGGER.w}
          h={BP_TRIGGER.h}
          style={beat(DRAFT_BEAT.handle)}
        />
        <MeasureNote
          x={BP_TRIGGER.x + BP_TRIGGER.w + 8}
          y={BP_TRIGGER.y + BP_TRIGGER.h / 2 - 2}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(0))}
        >
          {`${GD.btnW}x${GD.btnH}`}
        </MeasureNote>
        <MeasureNote
          x={BP_TRIGGER.x + BP_TRIGGER.w + 8}
          y={BP_TRIGGER.y + BP_TRIGGER.h / 2 + 9}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(0))}
        >
          {`r${GD.btnRx}`}
        </MeasureNote>
        <InsetGuide
          x={BP_PANEL.x + BP_PAD}
          y={BP_PANEL.y + BP_PAD}
          w={BP_PANEL.w - BP_PAD * 2}
          h={BP_PANEL.h - BP_PAD * 2}
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
          x={BP_PANEL.x + BP_PANEL.rx}
          y={BP_PANEL.y - 6}
          anchor="middle"
          className="note-stamp"
          style={beat(stampBeat(1))}
        >
          {`p ${GD.panelPad}`}
        </MeasureNote>
        <MeasureV
          x={BP_GAP_DIM_X}
          y1={BP_TRIGGER.y + BP_TRIGGER.h}
          y2={BP_PANEL.y}
          label=""
          className="note-stamp"
          style={beat(stampBeat(2))}
        />
        <MeasureNote
          x={BP_GAP_DIM_X - 7}
          y={BP_TRIGGER.y + BP_TRIGGER.h / 2 + 2.5}
          anchor="end"
          className="note-stamp"
          style={beat(stampBeat(3))}
        >
          {`goo gap ${GD.gap}`}
        </MeasureNote>
      </g>
    </DraftSurface>
  )
}

const AN_ITEMS = ['Copy link', 'Share on X', 'Embed'] as const

function TriggerShape({ theme }: { theme: DraftTheme }) {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('trigger')

  return (
    <rect
      x={10}
      y={10}
      width={78}
      height={34}
      rx={12}
      stroke="currentColor"
      strokeWidth={hovered === 'trigger' ? 2 : theme.wireframe.strokeWidth}
      fill={hovered === 'trigger' ? 'currentColor' : 'transparent'}
      fillOpacity={hovered === 'trigger' ? 0.1 : 0}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ ...spotlight.style, pointerEvents: 'all' }}
      onMouseEnter={() => setHovered('trigger')}
      onMouseLeave={() => setHovered(null)}
    />
  )
}

function TriggerTextShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('trigger')

  return (
    <g
      onMouseEnter={() => setHovered('trigger')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <text
        x={49}
        y={31}
        textAnchor="middle"
        fontSize={15}
        fontFamily="var(--font-sans)"
        className={`fill-current ${spotlight.className}`}
      >
        Share
      </text>
    </g>
  )
}

function PanelShape({ theme }: { theme: DraftTheme }) {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('panel')

  return (
    <rect
      x={10}
      y={54}
      width={156}
      height={120}
      rx={20}
      stroke="currentColor"
      strokeWidth={hovered === 'panel' ? 2 : theme.wireframe.strokeWidth}
      fill={hovered === 'panel' ? 'currentColor' : 'transparent'}
      fillOpacity={hovered === 'panel' ? 0.05 : 0}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ ...spotlight.style, pointerEvents: 'all' }}
      onMouseEnter={() => setHovered('panel')}
      onMouseLeave={() => setHovered(null)}
    />
  )
}

function GooBridgeShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('goo')

  return (
    <g
      onMouseEnter={() => setHovered('goo')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect x={24} y={40} width={50} height={16} fill="transparent" />
      <path
        d="M30,44 Q49,52 68,44"
        stroke="currentColor"
        strokeWidth={hovered === 'goo' ? 1.5 : 1}
        strokeDasharray={hovered === 'goo' ? 'none' : '3 2'}
        fill="none"
        className={spotlight.className}
      />
    </g>
  )
}

function ItemShape({ theme, index, label }: { theme: DraftTheme; index: number; label: string }) {
  const { hovered, setHovered } = useAnatomy()
  const partId = `item-${index}`
  const spotlight = useSpotlight(partId)
  const itemY = 60 + index * 40

  return (
    <g
      onMouseEnter={() => setHovered(partId)}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect
        x={16}
        y={itemY}
        width={144}
        height={40}
        rx={4}
        stroke="currentColor"
        strokeWidth={hovered === partId ? 1 : theme.wireframe.strokeWidth}
        fill={hovered === partId ? 'currentColor' : 'transparent'}
        fillOpacity={hovered === partId ? 0.08 : 0}
        className={spotlight.className}
      />
      <text
        x={25}
        y={itemY + 22}
        fontSize={10}
        fontFamily="var(--font-sans)"
        className={`fill-current ${spotlight.className}`}
      >
        {label}
      </text>
    </g>
  )
}

function AnnotationsLayer() {
  const { hovered } = useAnatomy()
  const isOthersHovered = hovered !== null

  return (
    <g
      style={{
        pointerEvents: 'none',
        filter: isOthersHovered ? 'url(#spotlight-blur)' : 'none',
      }}
      className={`transition-[opacity,filter] duration-(--motion-dur-base) ease-(--motion-ease-in-out) motion-reduce:transition-none motion-reduce:filter-none ${isOthersHovered ? 'opacity-30' : 'opacity-100'}`}
    >
      <g
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={draftTheme.guide.strokeWidth}
        strokeDasharray="2 2"
        opacity={draftTheme.guide.structOpacity}
      >
        <line x1={88} y1={44} x2={88} y2={54} />
      </g>
      <InsetGuide
        x={22}
        y={60}
        w={144}
        h={120}
        offset={0.8}
        boxX={10}
        boxY={54}
        boxW={156}
        boxH={120}
        boxRx={20}
        clipOffset={0.8}
      />
      <MeasureNote x={100} y={51} anchor="start">
        18
      </MeasureNote>
      <MeasureNote x={22} y={184} anchor="middle">
        6
      </MeasureNote>
      <GripFrame x={10} y={10} w={78} h={34} />
      <GripFrame x={10} y={54} w={156} h={120} />
      <MeasureH x1={10} x2={166} y={5} label="240" />
      <MeasureV x={170} y1={10} y2={44} label="34" labelXOffset={5} labelAnchor="start" />
      <MeasureV x={170} y1={54} y2={174} label="120" labelXOffset={5} labelAnchor="start" />
    </g>
  )
}

export function GooDropdownBreakdown() {
  return (
    <AnatomyFrame
      viewBox="-70 -2 340 184"
      ariaLabel="Gooey dropdown anatomy: trigger, panel, goo bridge, menu item"
    >
      <g transform="translate(60, 20)">
        <TriggerShape theme={draftTheme} />
        <TriggerTextShape />
        <PanelShape theme={draftTheme} />
        <GooBridgeShape />
        {AN_ITEMS.map((label, index) => (
          <ItemShape key={label} theme={draftTheme} index={index} label={label} />
        ))}
        <AnnotationsLayer />
      </g>

      <AnatomyCallout
        part="trigger"
        label="Trigger.Button"
        anchor={[88, 27]}
        side="start"
        distance={30}
        isAccent
        measure="78 × 34 · r12"
        caption="Opens the menu and morphs into the panel"
      />
      <AnatomyCallout
        part="goo"
        label="Goo Bridge"
        anchor={[88, 49]}
        side="start"
        distance={35}
        measure="svg goo filter · strength 8"
        caption="Elastic bridge that joins trigger and panel"
      />
      <AnatomyCallout
        part="item-1"
        label="Menu Item"
        anchor={[166, 80]}
        side="end"
        distance={32}
        measure="40 tall · rounded-md 4"
        caption="Menu row with hover and focus highlight"
      />
      <AnatomyCallout
        part="panel"
        label="Dropdown.Panel"
        anchor={[88, 174]}
        side="start"
        distance={30}
        measure="240 wide · r20 · pad 6"
        caption="Menu surface that grows out of the trigger"
      />
    </AnatomyFrame>
  )
}

'use client'

import {
  DraftSurface,
  DRAFT_BEAT,
  DRAFT_FILL_PANEL,
  DRAFT_SCAFFOLD_FADE,
  DRAFT_INK_MORPH,
  DRAFT_TEXT_SOFT,
  draftTheme,
  beat,
  MeasureH,
  MeasureNote,
  MeasureV,
  InsetGuide,
  GripFrame,
  DRAFT_LABEL_BEAT,
  stampBeat,
} from '@/components/diagrams/lib/diagram-parts'
import {
  AnatomyFrame,
  AnatomyCallout,
  useAnatomy,
  useSpotlight,
} from '@/components/diagrams/lib/anatomy-parts'

const BP_S = 0.68
const BP = {
  w: 192 * BP_S,
  triggerH: 44 * BP_S,
  rx: 4 * BP_S,
  triggerPadX: 16 * BP_S,
  triggerPadY: 12 * BP_S,
  chevron: 16 * BP_S,
  gap: 8 * BP_S,
  border: 1 * BP_S,
  panelPad: 4 * BP_S,
  itemH: 44 * BP_S,
  itemPadX: 12 * BP_S,
  check: 16 * BP_S,
  fontSize: 10,
} as const

const BP_ITEMS = ['Small', 'Medium', 'Large'] as const
const BP_SELECTED_INDEX = 1
const BP_INNER = BP.border + BP.panelPad
const BP_PANEL_H = BP_INNER * 2 + BP_ITEMS.length * BP.itemH
const BP_X = (220 - BP.w) / 2
const BP_Y = 6
const BP_PANEL_Y = BP_Y + BP.triggerH + BP.gap
const BP_TRIGGER_CY = BP_Y + BP.triggerH / 2
const BP_CHEVRON_X = BP_X + BP.w - BP.triggerPadX - BP.chevron
const BP_CHECK_X = BP_X + BP.w - BP_INNER - BP.itemPadX - BP.check

function bpItemY(i: number) {
  return BP_PANEL_Y + BP_INNER + i * BP.itemH
}

export function SelectBlueprint() {
  const theme = draftTheme
  const chevronY = BP_TRIGGER_CY - BP.chevron / 2
  const checkY = bpItemY(BP_SELECTED_INDEX) + (BP.itemH - BP.check) / 2
  const checkK = BP.check / 24
  return (
    <DraftSurface>
      <rect
        x={BP_X}
        y={BP_Y}
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
        x={BP_X + BP.triggerPadX}
        y={BP_TRIGGER_CY + BP.fontSize * 0.35}
        fontSize={BP.fontSize}
        fontFamily="var(--font-sans)"
        style={beat(DRAFT_LABEL_BEAT)}
        className={`fade-note ${DRAFT_TEXT_SOFT}`}
      >
        {BP_ITEMS[BP_SELECTED_INDEX]}
      </text>
      <g
        style={{
          transformOrigin: `${BP_CHEVRON_X + BP.chevron / 2}px ${BP_TRIGGER_CY}px`,
        }}
        className="transition-transform duration-(--motion-dur-base) ease-(--motion-ease-in-out) group-hover:rotate-180 group-hover:delay-(--motion-dur-base) group-focus-visible:rotate-180 group-focus-visible:delay-(--motion-dur-base) motion-reduce:transition-none motion-reduce:transform-none"
      >
        <path
          d={`M${BP_CHEVRON_X + 4 * BP_S} ${chevronY + 6 * BP_S} l${4 * BP_S} ${4 * BP_S} ${4 * BP_S} ${-4 * BP_S}`}
          strokeWidth={1.25}
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`${DRAFT_INK_MORPH} opacity-40 group-hover:opacity-60 group-focus-visible:opacity-60`}
        />
      </g>

      <rect
        x={BP_X}
        y={BP_PANEL_Y}
        width={BP.w}
        height={BP_PANEL_H}
        rx={BP.rx}
        strokeWidth={theme.wireframe.strokeWidth}
        className={`${DRAFT_INK_MORPH} fill-transparent stroke-transparent opacity-0 group-hover:opacity-100 group-hover:fill-(--color-popover) group-hover:stroke-(--color-border-strong) group-hover:drop-shadow-md group-focus-visible:opacity-100 group-focus-visible:fill-(--color-popover) group-focus-visible:stroke-(--color-border-strong) group-focus-visible:drop-shadow-md`}
      />
      <rect
        x={BP_X + BP_INNER}
        y={bpItemY(BP_SELECTED_INDEX)}
        width={BP.w - BP_INNER * 2}
        height={BP.itemH}
        rx={BP.rx}
        fill="var(--bp-accent, var(--color-accent))"
        className={`${DRAFT_INK_MORPH} opacity-0 group-hover:opacity-15 group-focus-visible:opacity-15`}
      />
      {BP_ITEMS.map((label, i) => (
        <text
          key={label}
          x={BP_X + BP_INNER + BP.itemPadX}
          y={bpItemY(i) + BP.itemH / 2 + BP.fontSize * 0.35}
          fontSize={BP.fontSize}
          fontFamily="var(--font-sans)"
          style={beat(DRAFT_LABEL_BEAT)}
          className={`fade-note ${DRAFT_INK_MORPH} fill-current ${
            i === BP_SELECTED_INDEX
              ? 'opacity-35 group-hover:opacity-100 group-focus-visible:opacity-100'
              : 'opacity-25 group-hover:opacity-60 group-focus-visible:opacity-60'
          }`}
        >
          {label}
        </text>
      ))}
      <path
        d={`M${BP_CHECK_X + 4 * checkK} ${checkY + 12 * checkK} L${BP_CHECK_X + 9 * checkK} ${checkY + 17 * checkK} L${BP_CHECK_X + 20 * checkK} ${checkY + 6 * checkK}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${DRAFT_INK_MORPH} opacity-35 group-hover:opacity-100 group-focus-visible:opacity-100`}
      />

      <g className={DRAFT_SCAFFOLD_FADE}>
        <rect
          x={BP_X}
          y={BP_PANEL_Y}
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
          x={BP_X + BP.triggerPadX}
          y={BP_Y + BP.triggerPadY}
          w={BP.w - BP.triggerPadX * 2}
          h={BP.triggerH - BP.triggerPadY * 2}
          offset={0.8}
          boxX={BP_X}
          boxY={BP_Y}
          boxW={BP.w}
          boxH={BP.triggerH}
          boxRx={BP.rx}
          clipOffset={0.8}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <InsetGuide
          x={BP_X + BP_INNER}
          y={BP_PANEL_Y + BP_INNER}
          w={BP.w - BP_INNER * 2}
          h={BP_PANEL_H - BP_INNER * 2}
          offset={0.8}
          boxX={BP_X}
          boxY={BP_PANEL_Y}
          boxW={BP.w}
          boxH={BP_PANEL_H}
          boxRx={BP.rx}
          clipOffset={0.8}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <GripFrame
          x={BP_X}
          y={BP_Y}
          w={BP.w}
          h={BP.triggerH}
          className="note-stamp"
          style={beat(DRAFT_BEAT.handle)}
        />
        <MeasureV
          x={BP_X - 10}
          y1={BP_Y}
          y2={BP_Y + BP.triggerH}
          label="44"
          className="note-stamp"
          style={beat(stampBeat(0))}
        />
        <MeasureV
          x={BP_X - 10}
          y1={BP_Y + BP.triggerH}
          y2={BP_PANEL_Y}
          label="8"
          className="note-stamp"
          style={beat(stampBeat(1))}
        />
        <MeasureNote
          x={BP_X - 6}
          y={BP_PANEL_Y + BP_PANEL_H / 2 + 2.5}
          anchor="end"
          className="note-stamp"
          style={beat(stampBeat(2))}
        >
          p4
        </MeasureNote>
        <MeasureNote
          x={BP_X + BP.w + 6}
          y={BP_TRIGGER_CY + 2.5}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(0))}
        >
          w192
        </MeasureNote>
        <MeasureNote
          x={BP_X + BP.w + 6}
          y={BP_Y + BP.triggerH + 1}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(2))}
        >
          r4
        </MeasureNote>
        <MeasureNote
          x={BP_X + BP.triggerPadX / 2}
          y={BP_TRIGGER_CY + 2.5}
          className="note-stamp"
          style={beat(stampBeat(2))}
        >
          16
        </MeasureNote>
        <MeasureNote
          x={BP_X + BP.w - BP.triggerPadX / 2}
          y={BP_TRIGGER_CY + 2.5}
          className="note-stamp"
          style={beat(stampBeat(2))}
        >
          16
        </MeasureNote>
        <MeasureNote
          x={BP_X + BP.w / 2}
          y={BP_Y + BP.triggerPadY / 2 + 2.5}
          className="note-stamp"
          style={beat(stampBeat(3))}
        >
          12
        </MeasureNote>
        <MeasureNote
          x={BP_X + BP.w / 2}
          y={BP_Y + BP.triggerH - BP.triggerPadY / 2 + 2.5}
          className="note-stamp"
          style={beat(stampBeat(3))}
        >
          12
        </MeasureNote>
        <MeasureV
          x={BP_X + BP.w + 10}
          y1={bpItemY(0)}
          y2={bpItemY(0) + BP.itemH}
          label="44"
          labelXOffset={5}
          labelAnchor="start"
          className="note-stamp"
          style={beat(stampBeat(1))}
        />
        <MeasureNote
          x={BP_X + BP.w + 6}
          y={bpItemY(2) + BP.itemH / 2 + 2.5}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(2))}
        >
          r4
        </MeasureNote>
      </g>
    </DraftSurface>
  )
}

const AN = {
  w: 192,
  triggerH: 44,
  rx: 4,
  triggerPadX: 16,
  triggerPadY: 12,
  chevron: 16,
  gap: 8,
  border: 1,
  panelPad: 4,
  itemH: 44,
  itemPadX: 12,
  check: 16,
} as const

const AN_PANEL_Y = AN.triggerH + AN.gap
const AN_INNER = AN.border + AN.panelPad
const AN_ITEMS = ['Small', 'Medium', 'Large'] as const
const AN_PANEL_H = AN_INNER * 2 + AN_ITEMS.length * AN.itemH
const AN_SELECTED_INDEX = 1
const AN_TEXT_X = AN_INNER + AN.itemPadX
const AN_VALUE = AN_ITEMS[AN_SELECTED_INDEX]
const AN_VALUE_W = AN_VALUE.length * 14 * 0.55
const AN_TAG_X = AN.w + 24

function anItemY(i: number) {
  return AN_PANEL_Y + AN_INNER + i * AN.itemH
}

function TriggerShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('trigger')
  const active = hovered === 'trigger'
  const cx = AN.w - AN.triggerPadX - AN.chevron
  const cy = AN.triggerH / 2 - AN.chevron / 2

  return (
    <g
      onMouseEnter={() => setHovered('trigger')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect
        x={0}
        y={0}
        width={AN.w}
        height={AN.triggerH}
        rx={AN.rx}
        stroke="currentColor"
        strokeWidth={active ? 2 : 1.25}
        fill="currentColor"
        fillOpacity={active ? 0.08 : 0.03}
        className={spotlight.className}
      />
      <path
        d={`M${cx + 4} ${cy + 6} l4 4 4-4`}
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className={`pointer-events-none ${spotlight.className}`}
      />
    </g>
  )
}

function ValueShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('value')
  const active = hovered === 'value'

  return (
    <g
      onMouseEnter={() => setHovered('value')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect
        x={AN_TEXT_X - 2}
        y={AN.triggerPadY}
        width={AN_VALUE_W + 4}
        height={AN.triggerH - AN.triggerPadY * 2}
        rx={2}
        fill="currentColor"
        fillOpacity={active ? 0.12 : 0}
        className={spotlight.className}
      />
      <text
        x={AN_TEXT_X}
        y={AN.triggerH / 2 + 5}
        fontSize={14}
        fontFamily="var(--font-sans)"
        className={`pointer-events-none fill-current ${spotlight.className}`}
      >
        {AN_VALUE}
      </text>
    </g>
  )
}

function ContentShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('content')
  const active = hovered === 'content'

  return (
    <rect
      x={0}
      y={AN_PANEL_Y}
      width={AN.w}
      height={AN_PANEL_H}
      rx={AN.rx}
      stroke="currentColor"
      strokeWidth={active ? 2 : 1.25}
      fill={active ? 'currentColor' : 'var(--color-bg)'}
      fillOpacity={active ? 0.04 : 1}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ ...spotlight.style, pointerEvents: 'all' }}
      onMouseEnter={() => setHovered('content')}
      onMouseLeave={() => setHovered(null)}
    />
  )
}

function ItemShape({ index, label }: { index: number; label: string }) {
  const { hovered, setHovered } = useAnatomy()
  const isSelected = index === AN_SELECTED_INDEX
  const partId = isSelected ? 'item' : `item-${index}`
  const spotlight = useSpotlight(partId)
  const active = hovered === partId
  const y = anItemY(index)
  const itemW = AN.w - AN_INNER * 2
  const checkX = AN.w - AN_INNER - AN.itemPadX - AN.check
  const checkY = y + AN.itemH / 2 - AN.check / 2

  return (
    <g
      onMouseEnter={() => setHovered(partId)}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      {isSelected && (
        <rect
          x={AN_INNER}
          y={y}
          width={itemW}
          height={AN.itemH}
          rx={AN.rx}
          fill="var(--bp-accent, var(--color-accent))"
          fillOpacity={0.15}
          className="pointer-events-none"
        />
      )}
      <rect
        x={AN_INNER}
        y={y}
        width={itemW}
        height={AN.itemH}
        rx={AN.rx}
        fill="currentColor"
        fillOpacity={active ? 0.08 : 0}
        stroke="currentColor"
        strokeOpacity={active ? 0.6 : 0}
        className={spotlight.className}
      />
      <text
        x={AN_TEXT_X}
        y={y + AN.itemH / 2 + 5}
        fontSize={14}
        fontFamily="var(--font-sans)"
        className={`pointer-events-none fill-current ${spotlight.className}`}
      >
        {label}
      </text>
      {isSelected && (
        <path
          d={`M${checkX + 2.67} ${checkY + 8} l3.33 3.33 l7.33 -7.33`}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.33}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`pointer-events-none ${spotlight.className}`}
        />
      )}
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
      <GripFrame x={0} y={0} w={AN.w} h={AN.triggerH} />
      <GripFrame x={0} y={AN_PANEL_Y} w={AN.w} h={AN_PANEL_H} />
      <MeasureNote x={0} y={-4} anchor="start">
        {`r${AN.rx}`}
      </MeasureNote>
      <MeasureNote x={-4} y={AN_PANEL_Y + AN_PANEL_H - 2} anchor="end">
        {`r${AN.rx}`}
      </MeasureNote>
      <MeasureV x={-14} y1={0} y2={AN.triggerH} label={`${AN.triggerH}`} labelXOffset={-6} />
      <MeasureV x={-14} y1={AN.triggerH} y2={AN_PANEL_Y} label={`${AN.gap}`} labelXOffset={-6} />
      <MeasureV
        x={-14}
        y1={anItemY(AN_SELECTED_INDEX)}
        y2={anItemY(AN_SELECTED_INDEX) + AN.itemH}
        label={`${AN.itemH}`}
        labelXOffset={-6}
      />
      <MeasureH x1={0} x2={AN.w} y={AN_PANEL_Y + AN_PANEL_H + 14} label={`${AN.w}`} />

      <InsetGuide
        x={AN.triggerPadX}
        y={AN.triggerPadY}
        w={AN.w - AN.triggerPadX * 2}
        h={AN.triggerH - AN.triggerPadY * 2}
        offset={0.8}
        boxX={0}
        boxY={0}
        boxW={AN.w}
        boxH={AN.triggerH}
        boxRx={AN.rx}
        clipOffset={0.8}
      />
      <MeasureNote x={AN.triggerPadX / 2} y={AN.triggerH / 2 + 2.5} anchor="middle">
        {`${AN.triggerPadX}`}
      </MeasureNote>
      <MeasureNote x={AN.w - AN.triggerPadX / 2} y={AN.triggerH / 2 + 2.5} anchor="middle">
        {`${AN.triggerPadX}`}
      </MeasureNote>
      <MeasureNote x={AN.w / 2} y={AN.triggerPadY / 2 + 2.5} anchor="middle">
        {`${AN.triggerPadY}`}
      </MeasureNote>
      <MeasureNote x={AN.w / 2} y={AN.triggerH - AN.triggerPadY / 2 + 2.5} anchor="middle">
        {`${AN.triggerPadY}`}
      </MeasureNote>

      <InsetGuide
        x={AN_INNER}
        y={AN_PANEL_Y + AN_INNER}
        w={AN.w - AN_INNER * 2}
        h={AN_PANEL_H - AN_INNER * 2}
        offset={0.8}
        boxX={0}
        boxY={AN_PANEL_Y}
        boxW={AN.w}
        boxH={AN_PANEL_H}
        boxRx={AN.rx}
        clipOffset={0.8}
      />
      <MeasureNote x={AN_INNER / 2} y={anItemY(2) + AN.itemH / 2 + 2.5} anchor="middle">
        {`${AN.panelPad}`}
      </MeasureNote>
      <MeasureNote
        x={AN.w - AN_INNER - AN.itemPadX - AN.check - 6}
        y={anItemY(AN_SELECTED_INDEX) + AN.itemH / 2 + 2.5}
        anchor="end"
      >
        {`r${AN.rx}`}
      </MeasureNote>
    </g>
  )
}

export function SelectBreakdown() {
  const itemY = anItemY(AN_SELECTED_INDEX) + AN.itemH / 2
  return (
    <AnatomyFrame viewBox="-44 -52 384 276" ariaLabel="Select anatomy">
      <TriggerShape />
      <ValueShape />
      <ContentShape />
      {AN_ITEMS.map((label, index) => (
        <ItemShape key={label} index={index} label={label} />
      ))}
      <AnnotationsLayer />
      <AnatomyCallout
        part="trigger"
        label="Trigger"
        anchor={[AN.w, AN.triggerH / 2]}
        side="end"
        isAccent
        measure={`${AN.w} x ${AN.triggerH}, px 16, r4`}
        caption="Combobox button that toggles the listbox open"
      />
      <AnatomyCallout
        part="value"
        label="Value"
        anchor={[AN_TEXT_X + AN_VALUE_W / 2, AN.triggerPadY]}
        side="top"
        distance={AN.triggerPadY + 16}
        measure={`14px text at x ${AN_TEXT_X}`}
        caption="Selected label, morphs when the selection changes"
      />
      <AnatomyCallout
        part="content"
        label="Content"
        anchor={[AN.w, AN_PANEL_Y + 20]}
        side="end"
        measure={`min ${AN.w} wide, p-1, ${AN.gap} below trigger`}
        caption="Portaled listbox with the proximity hover highlight"
      />
      <AnatomyCallout
        part="item"
        label="Item (selected)"
        anchor={[AN.w - AN_INNER, itemY]}
        side="end"
        distance={AN_TAG_X - (AN.w - AN_INNER)}
        measure={`${AN.w - AN_INNER * 2} x ${AN.itemH}, px 12, text at x ${AN_TEXT_X}`}
        caption="Accent tint and a drawn check mark the chosen option"
      />
    </AnatomyFrame>
  )
}

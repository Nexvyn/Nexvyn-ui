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
  DRAFT_FILL_MUTED,
  DRAFT_SCAFFOLD_FADE,
  DRAFT_INK_MORPH,
  DRAFT_TEXT_SOFT,
  draftTheme,
  MeasureH,
  MeasureNote,
  MeasureV,
  GripFrame,
  beat,
  DRAFT_BEAT,
  DRAFT_DETAIL_BEAT,
  DRAFT_LABEL_BEAT,
  stampBeat,
} from '@/components/diagrams/lib/diagram-parts'

const IB = {
  btnH: 44,
  icon: 36,
  gap: 4,
  iconGlyph: 18,
  itemRx: 4,
  barRx: 4,
  barPad: 4,
  barBorder: 1,
  dotR: 2,
  dotInset: 6,
  bloomW: 48,
} as const

const BTN1_W = IB.icon + IB.bloomW
const BTN2_W = IB.icon
const BTN3_W = IB.icon

const BTN_X = [0, BTN1_W + IB.gap, BTN1_W + IB.gap + BTN2_W + IB.gap]
const TOTAL_W = BTN_X[2] + BTN3_W
const ICON_Y = (IB.btnH - IB.icon) / 2

const LABEL_SIZE = 14
const LABEL_PAD_END = 12
const BP_X = (220 - TOTAL_W) / 2
const BP_Y = (140 - IB.btnH) / 2
const BP_BTN_Y = BP_Y + IB.btnH / 2 + LABEL_SIZE * 0.35
const BP_DOT_CX = BP_X + BTN1_W - IB.dotInset - IB.dotR
const BP_DOT_CY = BP_Y + IB.dotInset + IB.dotR
const BP_PE_X = BP_X + BTN1_W - LABEL_PAD_END
const BP_GAP_X = BP_X + BTN1_W
const BP_CHAIN_Y = BP_Y + IB.btnH + 6
const BP_CHAIN_NOTE_Y = BP_CHAIN_Y + 13

const BORDERLESS_ITEM = `${DRAFT_INK_MORPH} fill-transparent stroke-current group-hover:stroke-transparent group-focus-visible:stroke-transparent`

const PEN_PATHS = ['M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z', 'm15 5 4 4']
const ERASER_PATHS = [
  'm7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21',
  'M22 21H7',
  'm5 11 9 9',
]
const FILL_PATHS = [
  'm19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z',
  'm5 2 5 5',
  'M2 13h15',
  'M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.8 2-4 .3 1.2 2 2.4 2 4Z',
]

function IconGlyph({
  paths,
  x,
  y,
  cell,
  size,
  strokeWidth = 1.5,
  opacity,
  className,
  enterAt,
}: {
  paths: string[]
  x: number
  y: number
  cell: number
  size: number
  strokeWidth?: number
  opacity?: number
  className?: string
  enterAt?: string
}) {
  const scale = size / 24
  const offset = (cell - size) / 2
  return (
    <g
      transform={`translate(${x + offset}, ${y + offset}) scale(${scale})`}
      opacity={opacity}
      className={className}
      style={enterAt ? beat(enterAt) : undefined}
    >
      {paths.map((pd) => (
        <path
          key={pd}
          d={pd}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth / scale}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={enterAt ? 1 : undefined}
          strokeDasharray={enterAt ? 1 : undefined}
          strokeDashoffset={enterAt ? 1 : undefined}
          className={enterAt ? 'ink-draw' : undefined}
        />
      ))}
    </g>
  )
}

export function IconBarBlueprint() {
  const theme = draftTheme
  const outline = {
    pathLength: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1,
    strokeWidth: theme.wireframe.strokeWidth * 0.5,
    y: BP_Y,
    height: IB.btnH,
    rx: IB.itemRx,
  }
  return (
    <DraftSurface>
      <rect
        {...outline}
        x={BP_X + BTN_X[0]}
        width={BTN1_W}
        strokeOpacity={theme.wireframe.strokeOpacity * 0.4}
        style={beat(DRAFT_BEAT.outline)}
        className={`ink-draw ${DRAFT_FILL_MUTED}`}
      />
      <rect
        {...outline}
        x={BP_X + BTN_X[1]}
        width={BTN2_W}
        strokeOpacity={theme.wireframe.strokeOpacity * 0.3}
        style={beat(DRAFT_DETAIL_BEAT.b)}
        className={`ink-draw ${BORDERLESS_ITEM}`}
      />
      <rect
        {...outline}
        x={BP_X + BTN_X[2]}
        width={BTN3_W}
        strokeOpacity={theme.wireframe.strokeOpacity * 0.15}
        style={beat(DRAFT_DETAIL_BEAT.c)}
        className={`ink-draw ${BORDERLESS_ITEM}`}
      />

      <IconGlyph
        paths={PEN_PATHS}
        x={BP_X + BTN_X[0]}
        y={BP_Y + ICON_Y}
        cell={IB.icon}
        size={IB.iconGlyph}
        enterAt={DRAFT_BEAT.anatomy}
        className={`${DRAFT_INK_MORPH} opacity-70 group-hover:opacity-100 group-focus-visible:opacity-100`}
      />
      <text
        x={BP_X + IB.icon}
        y={BP_BTN_Y}
        fontSize={LABEL_SIZE}
        fontFamily="var(--font-sans)"
        style={beat(DRAFT_LABEL_BEAT)}
        className={`fade-note ${DRAFT_TEXT_SOFT}`}
      >
        Pen
      </text>
      <g className="fade-note" style={beat(DRAFT_BEAT.handle)}>
        <circle
          cx={BP_DOT_CX}
          cy={BP_DOT_CY}
          r={IB.dotR}
          fill="var(--bp-accent, var(--color-accent))"
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          className="scale-75 opacity-50 transition-[opacity,transform] duration-(--motion-dur-slow) ease-(--motion-ease-out) group-hover:scale-100 group-hover:opacity-100 group-hover:delay-(--motion-dur-base) group-focus-visible:scale-100 group-focus-visible:opacity-100 group-focus-visible:delay-(--motion-dur-base) motion-reduce:transform-none motion-reduce:transition-none"
        />
      </g>

      <IconGlyph
        paths={ERASER_PATHS}
        x={BP_X + BTN_X[1]}
        y={BP_Y + ICON_Y}
        cell={IB.icon}
        size={IB.iconGlyph}
        enterAt={DRAFT_DETAIL_BEAT.b}
        className="opacity-60"
      />
      <IconGlyph
        paths={FILL_PATHS}
        x={BP_X + BTN_X[2]}
        y={BP_Y + ICON_Y}
        cell={IB.icon}
        size={IB.iconGlyph}
        enterAt={DRAFT_DETAIL_BEAT.c}
        className="opacity-30"
      />

      <g className={DRAFT_SCAFFOLD_FADE}>
        <GripFrame x={BP_X} y={BP_Y} w={TOTAL_W} h={IB.btnH} style={beat(DRAFT_BEAT.handle)} />
        <MeasureH
          x1={BP_X}
          x2={BP_X + TOTAL_W}
          y={BP_Y - 12}
          label={`${TOTAL_W}`}
          className="note-stamp"
          style={beat(stampBeat(0))}
        />
        <MeasureV
          x={BP_X - 10}
          y1={BP_Y}
          y2={BP_Y + IB.btnH}
          label={`${IB.btnH}`}
          className="note-stamp"
          style={beat(stampBeat(1))}
        />

        <line
          x1={BP_PE_X}
          y1={BP_Y}
          x2={BP_PE_X}
          y2={BP_Y + IB.btnH}
          stroke="var(--bp-accent, var(--color-accent))"
          strokeWidth={theme.guide.strokeWidth}
          strokeDasharray="2 2"
          opacity={theme.guide.structOpacity}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <MeasureH
          x1={BP_PE_X}
          x2={BP_GAP_X}
          y={BP_CHAIN_Y}
          label=""
          className="note-stamp"
          style={beat(stampBeat(2))}
        />
        <g
          stroke="var(--bp-accent, var(--color-accent))"
          strokeWidth={theme.guide.strokeWidth}
          strokeDasharray="2 2"
          opacity={theme.guide.structOpacity}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        >
          <line x1={BP_GAP_X} y1={BP_CHAIN_Y - 3} x2={BP_GAP_X} y2={BP_CHAIN_Y + 3} />
          <line
            x1={BP_GAP_X + IB.gap}
            y1={BP_CHAIN_Y - 3}
            x2={BP_GAP_X + IB.gap}
            y2={BP_CHAIN_Y + 3}
          />
          <line x1={BP_GAP_X} y1={BP_CHAIN_Y} x2={BP_GAP_X + IB.gap} y2={BP_CHAIN_Y} />
        </g>
        <MeasureNote
          x={BP_GAP_X - 6}
          y={BP_CHAIN_NOTE_Y}
          anchor="end"
          className="note-stamp"
          style={beat(stampBeat(3))}
        >
          {`pe ${LABEL_PAD_END}`}
        </MeasureNote>
        <MeasureNote
          x={BP_GAP_X}
          y={BP_CHAIN_NOTE_Y}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(3))}
        >
          {`gap ${IB.gap}`}
        </MeasureNote>
      </g>
    </DraftSurface>
  )
}

const BAR_INSET = IB.barBorder + IB.barPad
const BAR_X = -BAR_INSET
const BAR_Y = -BAR_INSET
const BAR_W = TOTAL_W + BAR_INSET * 2
const BAR_H = IB.btnH + BAR_INSET * 2
const DOT_CX = BTN_X[0] + BTN1_W - IB.dotInset - IB.dotR
const DOT_CY = IB.dotInset + IB.dotR

function ToolbarShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('toolbar')
  return (
    <g
      onMouseEnter={() => setHovered('toolbar')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={BAR_X + 0.5}
        y={BAR_Y + 0.5}
        width={BAR_W - 1}
        height={BAR_H - 1}
        rx={IB.barRx}
        stroke="currentColor"
        strokeWidth={hovered === 'toolbar' ? 1.5 : 1}
        fill="none"
        className={spotlight.className}
        style={spotlight.style}
      />
    </g>
  )
}

function SelectedFillShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('selected')
  return (
    <g
      onMouseEnter={() => setHovered('selected')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={BTN_X[0]}
        y={0}
        width={BTN1_W}
        height={IB.btnH}
        rx={IB.itemRx}
        fill="currentColor"
        fillOpacity={hovered === 'selected' ? 0.18 : 0.1}
        className={spotlight.className}
        style={spotlight.style}
      />
    </g>
  )
}

function Btn1IconShape() {
  return (
    <IconGlyph
      paths={PEN_PATHS}
      x={BTN_X[0]}
      y={ICON_Y}
      cell={IB.icon}
      size={IB.iconGlyph}
      className="opacity-70"
    />
  )
}

function BloomShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('bloom')
  const x = BTN_X[0] + IB.icon
  return (
    <g
      onMouseEnter={() => setHovered('bloom')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={x}
        y={ICON_Y}
        width={IB.bloomW}
        height={IB.icon}
        fill="currentColor"
        fillOpacity={hovered === 'bloom' ? 0.12 : 0.04}
        className={spotlight.className}
        style={spotlight.style}
      />
      <text
        x={x}
        y={IB.btnH / 2 + 5}
        fontSize={14}
        fontFamily="var(--font-sans)"
        className={`fill-current ${spotlight.className}`}
      >
        Pen
      </text>
    </g>
  )
}

function DotShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('dot')
  return (
    <g
      onMouseEnter={() => setHovered('dot')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <circle
        cx={DOT_CX}
        cy={DOT_CY}
        r={IB.dotR + 2}
        fill="currentColor"
        fillOpacity={hovered === 'dot' ? 0.12 : 0}
        className={spotlight.className}
        style={spotlight.style}
      />
      <circle
        cx={DOT_CX}
        cy={DOT_CY}
        r={IB.dotR}
        fill="var(--bp-accent, var(--color-accent))"
        className={spotlight.className}
      />
    </g>
  )
}

function RestingButtonShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('button')
  return (
    <g
      onMouseEnter={() => setHovered('button')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={BTN_X[1]}
        y={0}
        width={BTN2_W}
        height={IB.btnH}
        rx={IB.itemRx}
        fill="currentColor"
        fillOpacity={hovered === 'button' ? 0.12 : 0.04}
        className={spotlight.className}
        style={spotlight.style}
      />
      <IconGlyph
        paths={ERASER_PATHS}
        x={BTN_X[1]}
        y={ICON_Y}
        cell={IB.icon}
        size={IB.iconGlyph}
        className="opacity-60"
      />
    </g>
  )
}

function DisabledButtonShape() {
  return (
    <g className="opacity-50">
      <IconGlyph paths={FILL_PATHS} x={BTN_X[2]} y={ICON_Y} cell={IB.icon} size={IB.iconGlyph} />
    </g>
  )
}

function AnnotationsLayer() {
  const { hovered } = useAnatomy()
  const dimmed = hovered !== null
  const gapTop = BAR_Y + BAR_H
  return (
    <g
      style={{ pointerEvents: 'none', filter: dimmed ? 'url(#spotlight-blur)' : 'none' }}
      className={`transition-[opacity,filter] duration-(--motion-dur-base) ease-(--motion-ease-in-out) motion-reduce:transition-none motion-reduce:filter-none ${dimmed ? 'opacity-30' : 'opacity-100'}`}
    >
      <MeasureV
        x={BAR_X + BAR_W + 12}
        y1={BAR_Y}
        y2={BAR_Y + BAR_H}
        label={`${BAR_H}`}
        labelXOffset={5}
        labelAnchor="start"
      />
      <g
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={draftTheme.guide.strokeWidth}
        strokeDasharray="2 2"
        opacity={draftTheme.guide.structOpacity}
      >
        <line x1={BTN_X[1] - IB.gap} y1={gapTop + 2} x2={BTN_X[1] - IB.gap} y2={gapTop + 6} />
        <line x1={BTN_X[1]} y1={gapTop + 2} x2={BTN_X[1]} y2={gapTop + 6} />
        <line x1={BTN_X[1] - IB.gap} y1={gapTop + 4} x2={BTN_X[1]} y2={gapTop + 4} />
      </g>
      <MeasureNote x={BTN_X[1] - IB.gap / 2} y={gapTop + 14} anchor="middle">
        {`gap ${IB.gap}`}
      </MeasureNote>
    </g>
  )
}

function Callouts() {
  return (
    <>
      <AnatomyCallout
        part="toolbar"
        label="IconBar"
        anchor={[BAR_X + BAR_W - 15, BAR_Y]}
        side="top"
        distance={11}
        measure={`${BAR_H}px tall, p-1 (4px), 1px border`}
        caption="Toolbar with roving tabindex; arrow keys move focus"
      />
      <AnatomyCallout
        part="dot"
        label="Status dot"
        anchor={[DOT_CX, DOT_CY - IB.dotR]}
        side="top"
        distance={22}
        isAccent
        measure={`${IB.dotR * 2}px, inset ${IB.dotInset}px`}
        caption="Accent dot marks the selected item"
      />
      <AnatomyCallout
        part="selected"
        label="Selected fill"
        anchor={[BTN_X[0], IB.btnH / 2]}
        side="start"
        distance={30}
        isAccent
        measure={`${BTN1_W} × ${IB.btnH}px, rounded-md`}
        caption="Surface fill on the item matching value"
      />
      <AnatomyCallout
        part="button"
        label="IconBarItem"
        anchor={[BTN_X[1] + BTN2_W / 2, IB.btnH]}
        side="bottom"
        distance={24}
        measure={`${BTN2_W} × ${IB.btnH}px, icon ${IB.iconGlyph}px`}
        caption="Icon button; click selects, click again deselects"
      />
      <AnatomyCallout
        part="bloom"
        label="Label bloom"
        anchor={[BTN_X[0] + IB.icon + IB.bloomW / 2, ICON_Y + IB.icon]}
        side="bottom"
        distance={58}
        measure={`${IB.bloomW}px for Pen, text-sm`}
        caption="Label width opens on hover, focus or selection"
      />
    </>
  )
}

export function IconBarAnatomy() {
  return (
    <AnatomyFrame viewBox="-140 -52 350 184" ariaLabel="Icon bar anatomy">
      <SelectedFillShape />
      <Btn1IconShape />
      <BloomShape />
      <DotShape />
      <RestingButtonShape />
      <DisabledButtonShape />
      <ToolbarShape />
      <AnnotationsLayer />
      <Callouts />
    </AnatomyFrame>
  )
}

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
  GripFrame,
  beat,
  DRAFT_BEAT,
  DRAFT_DETAIL_BEAT,
  DRAFT_LABEL_BEAT,
  DRAFT_LABEL_ALT_BEAT,
  stampBeat,
} from '@/components/diagrams/lib/parts'

const IB = {
  btnH: 44,
  icon: 36,
  gap: 4,
  itemRx: 4,
  dotR: 2,
  dotInset: 6,
  bloomLabelW: 24,
  bloomPadEnd: 12,
} as const

const BTN1_W = IB.icon + IB.bloomLabelW + IB.bloomPadEnd
const BTN2_W = IB.icon
const BTN3_W = IB.icon

const BTN_X = [0, BTN1_W + IB.gap, BTN1_W + IB.gap + BTN2_W + IB.gap]
const TOTAL_W = BTN_X[2] + BTN3_W
const ICON_Y = (IB.btnH - IB.icon) / 2

const BP = {
  btnH: 26,
  icon: 20,
  gap: 4,
  itemRx: 4,
  bloomLabelW: 18,
  bloomPadEnd: 7,
} as const
const BP_BTN1_W = BP.icon + BP.bloomLabelW + BP.bloomPadEnd
const BP_BTN2_W = BP.icon
const BP_BTN3_W = BP.icon
const BP_BTN_X = [0, BP_BTN1_W + BP.gap, BP_BTN1_W + BP.gap + BP_BTN2_W + BP.gap]
const BP_TOTAL_W = BP_BTN_X[2] + BP_BTN3_W
const BP_ICON_Y = (BP.btnH - BP.icon) / 2
const BP_X = (220 - BP_TOTAL_W) / 2
const BP_Y = (140 - BP.btnH) / 2

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
  return (
    <DraftSurface>
      <g className="transition-transform duration-(--motion-dur-slow) ease-(--motion-ease-in-out) group-hover:translate-x-[49px] group-hover:delay-(--motion-dur-base) group-focus-visible:translate-x-[49px] group-focus-visible:delay-(--motion-dur-base) motion-reduce:transition-none">
        <rect
          x={BP_X + BP_BTN_X[0]}
          y={BP_Y}
          width={BP_BTN1_W}
          height={BP.btnH}
          rx={BP.itemRx}
          fill="currentColor"
          fillOpacity={0.1}
          style={beat(DRAFT_BEAT.hatch)}
          className="fade-note"
        />
      </g>
      <rect
        x={BP_X + BP_BTN_X[0]}
        y={BP_Y}
        width={BP_BTN1_W}
        height={BP.btnH}
        rx={BP.itemRx}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={theme.wireframe.strokeWidth * 0.5}
        strokeOpacity={theme.wireframe.strokeOpacity * 0.3}
        style={beat(DRAFT_BEAT.outline)}
        className={`ink-draw ${DRAFT_FILL_PANEL}`}
      />

      <IconGlyph
        paths={PEN_PATHS}
        x={BP_X + BP_BTN_X[0]}
        y={BP_Y + BP_ICON_Y}
        cell={BP.icon}
        size={BP.icon * 0.65}
        strokeWidth={1.25}
        enterAt={DRAFT_BEAT.anatomy}
        className={`${DRAFT_INK_MORPH} opacity-70 group-hover:opacity-100 group-focus-visible:opacity-100`}
      />
      <text
        x={BP_X + BP.icon + 6}
        y={BP_Y + BP.btnH / 2 + 3.5}
        fontSize={9}
        fontWeight={500}
        fontFamily="var(--font-sans)"
        style={beat(DRAFT_LABEL_BEAT)}
        className={`fade-note ${DRAFT_TEXT_SOFT}`}
      >
        Pen
      </text>
      <circle
        cx={BP_X + BP_BTN1_W - 4}
        cy={BP_Y + 4}
        r={1.5}
        fill="currentColor"
        opacity={0.6}
        style={beat(DRAFT_BEAT.hatch)}
        className={`fade-note ${DRAFT_SCAFFOLD_FADE}`}
      />

      <rect
        x={BP_X + BP_BTN_X[1]}
        y={BP_Y}
        width={BP_BTN2_W}
        height={BP.btnH}
        rx={BP.itemRx}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={theme.wireframe.strokeWidth * 0.5}
        strokeOpacity={theme.wireframe.strokeOpacity * 0.3}
        style={beat(DRAFT_DETAIL_BEAT.b)}
        className={`ink-draw ${DRAFT_FILL_PANEL}`}
      />
      <IconGlyph
        paths={ERASER_PATHS}
        x={BP_X + BP_BTN_X[1]}
        y={BP_Y + BP_ICON_Y}
        cell={BP.icon}
        size={BP.icon * 0.65}
        strokeWidth={1.25}
        enterAt="260ms"
        className={`${DRAFT_INK_MORPH} opacity-70 group-hover:opacity-100 group-focus-visible:opacity-100`}
      />

      <rect
        x={BP_X + BP_BTN_X[2]}
        y={BP_Y}
        width={BP_BTN3_W}
        height={BP.btnH}
        rx={BP.itemRx}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={theme.wireframe.strokeWidth * 0.5}
        strokeOpacity={theme.wireframe.strokeOpacity * 0.15}
        style={beat(DRAFT_DETAIL_BEAT.c)}
        className={`ink-draw ${DRAFT_FILL_PANEL}`}
      />

      <IconGlyph
        paths={FILL_PATHS}
        x={BP_X + BP_BTN_X[2]}
        y={BP_Y + BP_ICON_Y}
        cell={BP.icon}
        size={BP.icon * 0.65}
        strokeWidth={1.25}
        enterAt="320ms"
        className="opacity-30"
      />

      <g className={DRAFT_SCAFFOLD_FADE}>
        <GripFrame x={BP_X} y={BP_Y} w={BP_TOTAL_W} h={BP.btnH} style={beat(DRAFT_BEAT.handle)} />
        <MeasureH
          x1={BP_X}
          x2={BP_X + BP_TOTAL_W}
          y={BP_Y - 12}
          label={`${BP_TOTAL_W}`}
          className="note-stamp"
          style={beat(stampBeat(0))}
        />
        <MeasureV
          x={BP_X - 12}
          y1={BP_Y}
          y2={BP_Y + BP.btnH}
          label={`${BP.btnH}`}
          className="note-stamp"
          style={beat(stampBeat(1))}
        />

        <g
          stroke="var(--bp-accent, var(--color-accent))"
          strokeWidth={theme.guide.strokeWidth}
          strokeDasharray="2 2"
          opacity={theme.guide.structOpacity}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        >
          <line
            x1={BP_X + BP_BTN_X[1] - BP.gap}
            y1={BP_Y + BP.btnH + 4}
            x2={BP_X + BP_BTN_X[1] - BP.gap}
            y2={BP_Y + BP.btnH + 9}
          />
          <line
            x1={BP_X + BP_BTN_X[1]}
            y1={BP_Y + BP.btnH + 4}
            x2={BP_X + BP_BTN_X[1]}
            y2={BP_Y + BP.btnH + 9}
          />
          <line
            x1={BP_X + BP_BTN_X[1] - BP.gap}
            y1={BP_Y + BP.btnH + 6.5}
            x2={BP_X + BP_BTN_X[1]}
            y2={BP_Y + BP.btnH + 6.5}
          />
        </g>
        <MeasureNote
          x={BP_X + BP_BTN_X[1] - BP.gap / 2}
          y={BP_Y + BP.btnH + 18}
          anchor="middle"
          className="note-stamp"
          style={beat(stampBeat(2))}
        >
          {`gap ${BP.gap}`}
        </MeasureNote>
      </g>
    </DraftSurface>
  )
}

const TX = 50
const TY = 40

function ToolbarShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('toolbar')
  return (
    <g
      onMouseEnter={() => setHovered('toolbar')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={0}
        y={0}
        width={TOTAL_W}
        height={IB.btnH}
        rx={6}
        stroke="currentColor"
        strokeWidth={draftTheme.wireframe.strokeWidth}
        strokeDasharray="3 3"
        fill="none"
        className={spotlight.className}
        style={spotlight.style}
      />
    </g>
  )
}

function SelectedFillShape() {
  const { setHovered } = useAnatomy()
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
        fillOpacity={0.1}
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
      size={IB.icon * 0.5}
      className="opacity-70"
    />
  )
}

function BloomShape() {
  const { setHovered } = useAnatomy()
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
        width={IB.bloomLabelW + IB.bloomPadEnd}
        height={IB.icon}
        fill="currentColor"
        fillOpacity={0.05}
        className={spotlight.className}
        style={spotlight.style}
      />
      <text
        x={x + 2}
        y={IB.btnH / 2 + 4}
        fontSize={12}
        fontWeight={500}
        fontFamily="var(--font-sans)"
        className={`fill-current ${spotlight.className}`}
      >
        Pen
      </text>
    </g>
  )
}

function DotShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('dot')
  const cx = BTN_X[0] + BTN1_W - IB.dotInset - IB.dotR
  const cy = IB.dotInset + IB.dotR
  return (
    <g
      onMouseEnter={() => setHovered('dot')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <circle
        cx={cx}
        cy={cy}
        r={IB.dotR + 2}
        fill="currentColor"
        fillOpacity={0}
        className={spotlight.className}
        style={spotlight.style}
      />
      <circle cx={cx} cy={cy} r={IB.dotR} fill="currentColor" className={spotlight.className} />
    </g>
  )
}

function RestingButtonShape() {
  const { setHovered } = useAnatomy()
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
        fillOpacity={0.04}
        className={spotlight.className}
        style={spotlight.style}
      />
      <IconGlyph
        paths={ERASER_PATHS}
        x={BTN_X[1]}
        y={ICON_Y}
        cell={IB.icon}
        size={IB.icon * 0.5}
        className="opacity-60"
      />
    </g>
  )
}

function DisabledButtonShape() {
  return (
    <g className="opacity-40">
      <IconGlyph paths={FILL_PATHS} x={BTN_X[2]} y={ICON_Y} cell={IB.icon} size={IB.icon * 0.5} />
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
      <GripFrame x={0} y={0} w={TOTAL_W} h={IB.btnH} />
      <MeasureH x1={0} x2={TOTAL_W} y={-14} label={`${TOTAL_W}`} />
      <MeasureV x={-12} y1={0} y2={IB.btnH} label={`${IB.btnH}`} labelXOffset={-6} />

      <g
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={draftTheme.guide.strokeWidth}
        strokeDasharray="2 2"
        opacity={draftTheme.guide.structOpacity}
      >
        <line x1={BTN_X[1] - IB.gap} y1={IB.btnH + 2} x2={BTN_X[1] - IB.gap} y2={IB.btnH + 6} />
        <line x1={BTN_X[1]} y1={IB.btnH + 2} x2={BTN_X[1]} y2={IB.btnH + 6} />
        <line x1={BTN_X[1] - IB.gap} y1={IB.btnH + 4} x2={BTN_X[1]} y2={IB.btnH + 4} />
      </g>
      <MeasureNote x={BTN_X[1] - IB.gap / 2} y={IB.btnH + 13} anchor="middle">
        {`${IB.gap}`}
      </MeasureNote>
    </g>
  )
}

const ROW_BUTTON_Y = 100
const ROW_DOT_Y = 132
const ROW_SELECTED_Y = 164
const ROW_BLOOM_Y = 196

function OverlayLines() {
  const toolbarMidX = TX + TOTAL_W / 2
  const toolbarTop = TY
  const btn2BottomMidX = TX + BTN_X[1] + BTN2_W / 2
  const btn2Bottom = TY + IB.btnH
  const btn1BottomMidX = TX + BTN_X[0] + BTN1_W / 2
  const btn1Bottom = TY + IB.btnH
  const bloomMidX = TX + BTN_X[0] + IB.icon + (IB.bloomLabelW + IB.bloomPadEnd) / 2
  const bloomBottom = TY + ICON_Y + IB.icon
  const dotCx = TX + BTN_X[0] + BTN1_W - IB.dotInset - IB.dotR
  const dotBottom = TY + IB.dotInset + IB.dotR + IB.dotR
  return (
    <g strokeWidth="1" className="pointer-events-none">
      <OverlayLine
        id="toolbar"
        x1={toolbarMidX}
        y1={toolbarTop}
        x2={toolbarMidX}
        y2={toolbarTop - 12}
      />
      <OverlayLine
        id="button"
        x1={btn2BottomMidX}
        y1={btn2Bottom}
        x2={btn2BottomMidX}
        y2={ROW_BUTTON_Y}
      />
      <OverlayLine id="dot" x1={dotCx} y1={dotBottom} x2={dotCx} y2={ROW_DOT_Y} />
      <OverlayLine
        id="selected"
        x1={btn1BottomMidX}
        y1={btn1Bottom}
        x2={btn1BottomMidX}
        y2={ROW_SELECTED_Y}
      />
      <OverlayLine id="bloom" x1={bloomMidX} y1={bloomBottom} x2={bloomMidX} y2={ROW_BLOOM_Y} />
    </g>
  )
}

function Tags() {
  const toolbarMidX = TX + TOTAL_W / 2
  const toolbarTop = TY
  const btn2BottomMidX = TX + BTN_X[1] + BTN2_W / 2
  const btn1BottomMidX = TX + BTN_X[0] + BTN1_W / 2
  const bloomMidX = TX + BTN_X[0] + IB.icon + (IB.bloomLabelW + IB.bloomPadEnd) / 2
  const dotCx = TX + BTN_X[0] + BTN1_W - IB.dotInset - IB.dotR
  return (
    <>
      <foreignObject
        x={toolbarMidX - 70}
        y={toolbarTop - 12 - 24}
        width={140}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="toolbar" label="IconBar" className="items-end justify-center" />
      </foreignObject>
      <foreignObject
        x={btn2BottomMidX - 55}
        y={ROW_BUTTON_Y}
        width={110}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="button" label="IconBarItem" className="items-start justify-center" />
      </foreignObject>
      <foreignObject
        x={dotCx - 45}
        y={ROW_DOT_Y}
        width={90}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="dot" label="Status dot" className="items-start justify-center" isAccent />
      </foreignObject>
      <foreignObject
        x={btn1BottomMidX - 55}
        y={ROW_SELECTED_Y}
        width={110}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part="selected"
          label="Selected fill"
          className="items-start justify-center"
          isAccent
        />
      </foreignObject>
      <foreignObject
        x={bloomMidX - 55}
        y={ROW_BLOOM_Y}
        width={110}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="bloom" label="Label bloom" className="items-start justify-center" />
      </foreignObject>
    </>
  )
}

export function IconBarAnatomy() {
  return (
    <AnatomyFrame viewBox="10 -20 210 260" maxWidthClassName="max-w-[280px]">
      <g transform={`translate(${TX}, ${TY})`}>
        <SelectedFillShape />
        <Btn1IconShape />
        <BloomShape />
        <DotShape />
        <RestingButtonShape />
        <DisabledButtonShape />
        <ToolbarShape />
        <AnnotationsLayer />
      </g>
      <OverlayLines />
      <Tags />
    </AnatomyFrame>
  )
}

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
  DRAFT_BEAT,
  DRAFT_FILL_MUTED,
  InsetGuide,
  DRAFT_SCAFFOLD_FADE,
  DRAFT_INK_MORPH,
  DRAFT_TEXT_SOFT,
  draftTheme,
  beat,
  MeasureH,
  MeasureNote,
  MeasureV,
  GripFrame,
  DRAFT_DETAIL_BEAT,
  DRAFT_LABEL_BEAT,
  DRAFT_LABEL_ALT_BEAT,
  stampBeat,
} from '@/components/diagrams/lib/parts'

// Three 44px rows exceed the 140px sheet, so the blueprint shows the final two.
const RADIO = {
  circle: 20,
  r: 10,
  dot: 10,
  gap: 12,
  rowGap: 8,
  rowH: 44,
  font: 14,
  labelW: 56,
} as const

const ROW_H = RADIO.rowH
const ROW_PITCH = ROW_H + RADIO.rowGap
const TOTAL_W = RADIO.circle + RADIO.gap + RADIO.labelW

const BP_ROWS = ['Medium', 'Large'] as const
const BP_SELECTED_ROW = 0
const BP_NEXT_ROW = BP_SELECTED_ROW + 1
const BP_TOTAL_H = BP_ROWS.length * ROW_H + (BP_ROWS.length - 1) * RADIO.rowGap
const BOX = { w: 120, inset: 12, rx: 6 } as const
const BP_X = (220 - BOX.w) / 2
const BP_Y = (140 - BP_TOTAL_H) / 2
const BP_CIRCLE_X = BP_X + BOX.inset
const BP_LABEL_X = BP_CIRCLE_X + RADIO.circle + RADIO.gap

function bpRowY(i: number) {
  return BP_Y + i * ROW_PITCH
}

const ROW_SURFACE = `${DRAFT_INK_MORPH} fill-transparent group-hover:fill-(--color-surface-2) group-focus-visible:fill-(--color-surface-2)`

const DOT_OUT_CLASS =
  'origin-center transition-[opacity,transform] duration-(--motion-dur-base) ease-(--motion-ease-out) delay-0 group-hover:opacity-0 group-hover:scale-50 group-hover:delay-(--motion-dur-base) group-focus-visible:opacity-0 group-focus-visible:scale-50 group-focus-visible:delay-(--motion-dur-base) motion-reduce:transition-none motion-reduce:transform-none'

const DOT_IN_CLASS =
  'origin-center opacity-0 scale-50 transition-[opacity,transform] duration-(--motion-dur-base) ease-(--motion-ease-out) delay-150 group-hover:opacity-100 group-hover:scale-100 group-hover:delay-500 group-focus-visible:opacity-100 group-focus-visible:scale-100 group-focus-visible:delay-500 motion-reduce:transition-none motion-reduce:transform-none'

export function RadioGroupBlueprint() {
  const theme = draftTheme
  return (
    <DraftSurface>
      {BP_ROWS.map((label, i) => {
        const y = bpRowY(i)
        const cy = y + ROW_H / 2
        const isSelected = i === BP_SELECTED_ROW
        const isNext = i === BP_NEXT_ROW
        return (
          <g key={label}>
            <rect
              x={BP_X}
              y={y}
              width={BOX.w}
              height={ROW_H}
              rx={BOX.rx}
              stroke="currentColor"
              strokeWidth={theme.wireframe.strokeWidth * 0.5}
              strokeOpacity={theme.wireframe.strokeOpacity * 0.35}
              style={beat(i === 0 ? DRAFT_BEAT.anatomy : `${260 + i * 60}ms`)}
              className={`fade-note ${ROW_SURFACE}`}
            />
            <circle
              cx={BP_CIRCLE_X + RADIO.r}
              cy={cy}
              r={RADIO.r}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeOpacity={
                isSelected ? theme.wireframe.strokeOpacity : theme.wireframe.strokeOpacity * 0.55
              }
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1}
              style={beat(isSelected ? DRAFT_BEAT.outline : '120ms')}
              className={
                isSelected
                  ? `ink-draw ${DRAFT_INK_MORPH} group-hover:stroke-opacity-40 group-focus-visible:stroke-opacity-40`
                  : isNext
                    ? `ink-draw ${DRAFT_INK_MORPH} group-hover:stroke-opacity-100 group-focus-visible:stroke-opacity-100`
                    : 'ink-draw'
              }
            />
            {isSelected && (
              <circle
                cx={BP_CIRCLE_X + RADIO.r}
                cy={cy}
                r={RADIO.dot / 2}
                fill="currentColor"
                style={{ transformBox: 'fill-box' }}
                className={DOT_OUT_CLASS}
              />
            )}
            {isNext && (
              <circle
                cx={BP_CIRCLE_X + RADIO.r}
                cy={cy}
                r={RADIO.dot / 2}
                fill="currentColor"
                style={{ transformBox: 'fill-box' }}
                className={DOT_IN_CLASS}
              />
            )}
            <text
              x={BP_LABEL_X}
              y={cy + 5}
              fontSize={RADIO.font}
              fontWeight={500}
              fontFamily="var(--font-sans)"
              style={beat(i === 0 ? DRAFT_LABEL_BEAT : DRAFT_LABEL_ALT_BEAT)}
              className={`fade-note ${DRAFT_TEXT_SOFT}`}
            >
              {label}
            </text>
          </g>
        )
      })}
      <g className={DRAFT_SCAFFOLD_FADE}>
        <GripFrame
          x={BP_X}
          y={bpRowY(BP_SELECTED_ROW)}
          w={BOX.w}
          h={ROW_H}
          className="note-stamp"
          style={beat(DRAFT_BEAT.handle)}
        />
        <InsetGuide
          x={BP_CIRCLE_X}
          y={bpRowY(BP_SELECTED_ROW) + (ROW_H - RADIO.circle) / 2}
          w={RADIO.circle}
          h={RADIO.circle}
          offset={0.8}
          boxX={BP_X}
          boxY={bpRowY(BP_SELECTED_ROW)}
          boxW={BOX.w}
          boxH={ROW_H}
          boxRx={BOX.rx}
          clipOffset={0.8}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <MeasureH
          x1={BP_X}
          x2={BP_X + BOX.w}
          y={BP_Y - 11}
          label={`${BOX.w}`}
          className="note-stamp"
          style={beat(stampBeat(0))}
        />
        <MeasureV
          x={BP_X - 13}
          y1={bpRowY(0)}
          y2={bpRowY(0) + ROW_H}
          label={`${ROW_H}`}
          labelXOffset={-5}
          className="note-stamp"
          style={beat(stampBeat(1))}
        />
        <MeasureV
          x={BP_X + BOX.w + 13}
          y1={bpRowY(0) + ROW_H / 2}
          y2={bpRowY(1) + ROW_H / 2}
          label={`${ROW_PITCH}`}
          labelAnchor="start"
          labelXOffset={5}
          className="note-stamp"
          style={beat(stampBeat(2))}
        />
        <MeasureNote
          x={BP_X}
          y={BP_Y + BP_TOTAL_H + 12}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(3))}
        >
          {`gap ${RADIO.rowGap} · r${BOX.rx}`}
        </MeasureNote>
      </g>
    </DraftSurface>
  )
}

const TX = 56
const TY = 20

const AN_ROWS = ['Small', 'Medium', 'Large'] as const
const AN_SELECTED_ROW = 1
const AN_TOTAL_H = AN_ROWS.length * ROW_H + (AN_ROWS.length - 1) * RADIO.rowGap

function anRowY(i: number) {
  return i * ROW_PITCH
}

function ContainerShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('container')

  return (
    <g
      onMouseEnter={() => setHovered('container')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={-8}
        y={-8}
        width={TOTAL_W + 16}
        height={AN_TOTAL_H + 16}
        fill="transparent"
        stroke="currentColor"
        strokeWidth={1}
        strokeDasharray="3 3"
        strokeOpacity={0.3}
        className={spotlight.className}
        style={spotlight.style}
      />
    </g>
  )
}

function RowBoxesShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('row')

  return (
    <g
      onMouseEnter={() => setHovered('row')}
      onMouseLeave={() => setHovered(null)}
      style={{ pointerEvents: 'all' }}
    >
      {AN_ROWS.map((label, i) => (
        <rect
          key={label}
          x={0}
          y={anRowY(i)}
          width={TOTAL_W}
          height={ROW_H}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={draftTheme.guide.strokeWidth}
          strokeDasharray="2 2"
          strokeOpacity={0.25}
          className={spotlight.className}
          style={spotlight.style}
        />
      ))}
    </g>
  )
}

function CircleShape({ i }: { i: number }) {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('circle')
  const isSelected = i === AN_SELECTED_ROW
  const cy = anRowY(i) + ROW_H / 2
  return (
    <g
      onMouseEnter={() => setHovered('circle')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <circle
        cx={RADIO.r}
        cy={cy}
        r={RADIO.r}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeOpacity={isSelected ? 1 : 0.45}
        className={isSelected ? spotlight.className : undefined}
        style={isSelected ? spotlight.style : undefined}
      />
    </g>
  )
}

function DotShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('dot')
  const cy = anRowY(AN_SELECTED_ROW) + ROW_H / 2
  return (
    <g
      onMouseEnter={() => setHovered('dot')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <circle cx={RADIO.r} cy={cy} r={RADIO.r} fill="transparent" />
      <circle
        cx={RADIO.r}
        cy={cy}
        r={RADIO.dot / 2}
        fill="currentColor"
        className={spotlight.className}
        style={spotlight.style}
      />
    </g>
  )
}

function LabelShape({ i }: { i: number }) {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('label')
  const cy = anRowY(i) + ROW_H / 2
  const x = RADIO.circle + RADIO.gap
  return (
    <g
      onMouseEnter={() => setHovered('label')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect x={0} y={anRowY(i)} width={TOTAL_W} height={ROW_H} fill="transparent" />
      <text
        x={x}
        y={cy + 5}
        fontSize={14}
        fontFamily="var(--font-sans)"
        className={
          i === AN_SELECTED_ROW ? `fill-current ${spotlight.className}` : 'fill-current opacity-70'
        }
        style={i === AN_SELECTED_ROW ? spotlight.style : undefined}
      >
        {AN_ROWS[i]}
      </text>
    </g>
  )
}

function HiddenInputShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('hidden-input')
  const cy = anRowY(AN_SELECTED_ROW) + ROW_H / 2
  return (
    <g
      onMouseEnter={() => setHovered('hidden-input')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={-6}
        y={cy - 6}
        width={12}
        height={12}
        rx={2}
        fill="none"
        stroke="currentColor"
        strokeWidth={0.75}
        strokeDasharray="2 1.5"
        strokeOpacity={0.5}
        className={spotlight.className}
        style={spotlight.style}
      />
      <text
        x={0}
        y={cy + 2.5}
        textAnchor="middle"
        fontSize={6}
        fontFamily="var(--font-mono)"
        fillOpacity={0.5}
        className={`fill-current ${spotlight.className}`}
        style={spotlight.style}
      >
        ⌧
      </text>
    </g>
  )
}

function FocusRingShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('focus-ring')
  const cy = anRowY(0) + ROW_H / 2
  return (
    <g
      onMouseEnter={() => setHovered('focus-ring')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <circle
        cx={RADIO.r}
        cy={cy}
        r={RADIO.r + 4}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeOpacity={0.4}
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
  const selCy = anRowY(AN_SELECTED_ROW) + ROW_H / 2
  const row0Bottom = anRowY(0) + ROW_H
  const row1Top = anRowY(1)
  return (
    <g
      style={{ pointerEvents: 'none', filter: dimmed ? 'url(#spotlight-blur)' : 'none' }}
      className={`transition-[opacity,filter] duration-(--motion-dur-base) ease-(--motion-ease-in-out) motion-reduce:transition-none motion-reduce:filter-none ${dimmed ? 'opacity-30' : 'opacity-100'}`}
    >
      <GripFrame x={0} y={anRowY(AN_SELECTED_ROW)} w={TOTAL_W} h={ROW_H} />
      <MeasureH x1={0} x2={RADIO.circle} y={selCy - RADIO.r - 14} label={`${RADIO.circle}`} />
      <MeasureV
        x={-12}
        y1={selCy - RADIO.r}
        y2={selCy + RADIO.r}
        label={`${RADIO.circle}`}
        labelXOffset={-6}
      />
      <g
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={draftTheme.guide.strokeWidth}
        strokeDasharray="2 2"
        opacity={draftTheme.guide.structOpacity}
      >
        <line x1={RADIO.circle} y1={selCy} x2={RADIO.circle + RADIO.gap} y2={selCy} />
      </g>
      <MeasureNote x={RADIO.circle + RADIO.gap / 2} y={selCy - 6} anchor="middle">
        {`${RADIO.gap}`}
      </MeasureNote>
      <g
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={draftTheme.guide.strokeWidth}
        strokeDasharray="2 2"
        opacity={draftTheme.guide.structOpacity}
      >
        <line x1={-16} y1={row0Bottom} x2={-10} y2={row0Bottom} />
        <line x1={-16} y1={row1Top} x2={-10} y2={row1Top} />
        <line x1={-13} y1={row0Bottom} x2={-13} y2={row1Top} />
      </g>
      <MeasureNote x={-19} y={(row0Bottom + row1Top) / 2 + 2.5} anchor="end">
        {`${RADIO.rowGap}`}
      </MeasureNote>
    </g>
  )
}

function OverlayLines() {
  const selCy = anRowY(AN_SELECTED_ROW) + ROW_H / 2
  const circleMidX = TX + RADIO.r
  const circleTop = TY + selCy - RADIO.r
  const circleCy = TY + selCy
  const dotBottom = circleCy + RADIO.dot / 2
  const labelMidX = TX + RADIO.circle + RADIO.gap + RADIO.labelW / 2
  const labelY = TY + selCy - 7
  const containerLeft = TX - 8
  const containerMidY = TY + AN_TOTAL_H / 2
  const focusCy = TY + anRowY(0) + ROW_H / 2
  const focusRight = TX + RADIO.r + RADIO.r + 4
  return (
    <g strokeWidth="1" className="pointer-events-none">
      <OverlayLine
        id="container"
        x1={containerLeft}
        y1={containerMidY}
        x2={containerLeft - 30}
        y2={containerMidY}
      />
      <OverlayLine id="circle" x1={circleMidX} y1={circleTop} x2={circleMidX} y2={circleTop - 40} />
      <OverlayLine id="dot" x1={circleMidX} y1={dotBottom} x2={circleMidX} y2={dotBottom + 36} />
      <OverlayLine id="label" x1={labelMidX} y1={labelY} x2={labelMidX} y2={labelY - 40} />
      <OverlayLine
        id="hidden-input"
        x1={TX - 6}
        y1={circleCy}
        x2={TX - 6 - 30}
        y2={circleCy + 30}
      />
      <OverlayLine
        id="focus-ring"
        x1={focusRight}
        y1={focusCy}
        x2={focusRight + 30}
        y2={focusCy - 20}
      />
    </g>
  )
}

function Tags() {
  const selCy = anRowY(AN_SELECTED_ROW) + ROW_H / 2
  const circleMidX = TX + RADIO.r
  const circleTop = TY + selCy - RADIO.r
  const circleCy = TY + selCy
  const dotBottom = circleCy + RADIO.dot / 2
  const labelMidX = TX + RADIO.circle + RADIO.gap + RADIO.labelW / 2
  const labelY = TY + selCy - 7
  const containerLeft = TX - 8
  const containerMidY = TY + AN_TOTAL_H / 2
  const focusCy = TY + anRowY(0) + ROW_H / 2
  const focusRight = TX + RADIO.r + RADIO.r + 4
  return (
    <>
      <foreignObject
        x={containerLeft - 30 - 75}
        y={containerMidY - 12}
        width={75}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="container" label="Group" className="items-center justify-end" isAccent />
      </foreignObject>

      <foreignObject
        x={circleMidX - 50}
        y={circleTop - 40 - 24}
        width={100}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part="circle"
          label="Radio circle"
          className="items-end justify-center"
          isAccent
        />
      </foreignObject>

      <foreignObject
        x={circleMidX - 60}
        y={dotBottom + 36}
        width={120}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="dot" label="Traveling dot" className="items-start justify-center" />
      </foreignObject>

      <foreignObject
        x={labelMidX - 45}
        y={labelY - 40 - 24}
        width={90}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="label" label="Label" className="items-end justify-center" />
      </foreignObject>

      <foreignObject
        x={TX - 6 - 30 - 80}
        y={circleCy + 30 - 4}
        width={80}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="hidden-input" label="Hidden input" className="items-center justify-end" />
      </foreignObject>

      <foreignObject
        x={focusRight + 30}
        y={focusCy - 20 - 12}
        width={80}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="focus-ring" label="Focus ring" className="items-end justify-start" />
      </foreignObject>
    </>
  )
}

export function RadioGroupAnatomy() {
  return (
    <AnatomyFrame viewBox="-80 -80 340 290" maxWidthClassName="max-w-[400px]">
      <g transform={`translate(${TX}, ${TY})`}>
        <ContainerShape />
        <RowBoxesShape />
        {AN_ROWS.map((label, i) => (
          <g key={label}>
            <CircleShape i={i} />
            <LabelShape i={i} />
          </g>
        ))}
        <DotShape />
        <HiddenInputShape />
        <FocusRingShape />
        <AnnotationsLayer />
      </g>
      <OverlayLines />
      <Tags />
    </AnatomyFrame>
  )
}

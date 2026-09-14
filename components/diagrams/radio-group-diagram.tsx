'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset, licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root LICENSE.

import type { CSSProperties } from 'react'
import {
  AnatomyFrame,
  AnatomyCallout,
  useAnatomy,
  useSpotlight,
} from '@/components/diagrams/lib/anatomy-parts'
import {
  DraftSurface,
  DRAFT_BEAT,
  DRAFT_SCAFFOLD_FADE,
  DRAFT_INK_MORPH,
  DRAFT_TEXT_SOFT,
  draftTheme,
  beat,
  InsetGuide,
  MeasureH,
  MeasureNote,
  MeasureV,
  GripFrame,
  DRAFT_LABEL_BEAT,
  DRAFT_LABEL_ALT_BEAT,
  stampBeat,
} from '@/components/diagrams/lib/diagram-parts'

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
const BP_X = (220 - TOTAL_W) / 2
const BP_Y = (140 - BP_TOTAL_H) / 2
const BP_CIRCLE_CX = BP_X + RADIO.r
const BP_LABEL_X = BP_X + RADIO.circle + RADIO.gap
const BP_BORDER = 2

function bpRowY(i: number) {
  return BP_Y + i * ROW_PITCH
}

const CIRCLE_BASE = `ink-draw ${DRAFT_INK_MORPH} fill-transparent`
const CIRCLE_CLASS: Record<number, string> = {
  [BP_SELECTED_ROW]: `${CIRCLE_BASE} stroke-current group-hover:stroke-(--color-border) group-focus-visible:stroke-(--color-border)`,
  [BP_NEXT_ROW]: `${CIRCLE_BASE} stroke-current opacity-50 group-hover:opacity-100 group-focus-visible:opacity-100`,
}

export function RadioGroupBlueprint() {
  const theme = draftTheme
  const firstMid = bpRowY(0) + ROW_H / 2
  return (
    <DraftSurface>
      <g className={DRAFT_SCAFFOLD_FADE}>
        {BP_ROWS.map((label, i) => (
          <rect
            key={label}
            x={BP_X}
            y={bpRowY(i)}
            width={TOTAL_W}
            height={ROW_H}
            fill="none"
            stroke="currentColor"
            strokeWidth={theme.guide.strokeWidth}
            strokeDasharray="2 2"
            opacity={theme.guide.dimOpacity}
            style={beat(i === 0 ? DRAFT_BEAT.guide : `${410 + i * 60}ms`)}
            className="fade-note"
          />
        ))}
      </g>

      {BP_ROWS.map((label, i) => {
        const cy = bpRowY(i) + ROW_H / 2
        return (
          <g key={label}>
            <circle
              cx={BP_CIRCLE_CX}
              cy={cy}
              r={RADIO.r - BP_BORDER / 2}
              strokeWidth={BP_BORDER}
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1}
              style={beat(i === 0 ? DRAFT_BEAT.outline : '120ms')}
              className={CIRCLE_CLASS[i]}
            />
            <text
              x={BP_LABEL_X}
              y={cy + RADIO.font * 0.35}
              fontSize={RADIO.font}
              fontFamily="var(--font-sans)"
              style={beat(i === 0 ? DRAFT_LABEL_BEAT : DRAFT_LABEL_ALT_BEAT)}
              className={`fade-note ${DRAFT_TEXT_SOFT}`}
            >
              {label}
            </text>
          </g>
        )
      })}

      <g
        style={
          {
            '--rg-travel': `${ROW_PITCH * (BP_NEXT_ROW - BP_SELECTED_ROW)}px`,
            ...beat(DRAFT_BEAT.anatomy),
          } as CSSProperties
        }
        className="fade-note transition-transform duration-(--motion-dur-slow) ease-(--motion-ease-in-out) group-hover:translate-y-(--rg-travel) group-hover:delay-(--motion-dur-base) group-focus-visible:translate-y-(--rg-travel) group-focus-visible:delay-(--motion-dur-base) motion-reduce:transition-none motion-reduce:transform-none"
      >
        <circle
          cx={BP_CIRCLE_CX}
          cy={bpRowY(BP_SELECTED_ROW) + ROW_H / 2}
          r={RADIO.dot / 2}
          className={`${DRAFT_INK_MORPH} fill-current opacity-70 group-hover:opacity-100 group-focus-visible:opacity-100`}
        />
      </g>

      <g className={DRAFT_SCAFFOLD_FADE}>
        <GripFrame
          x={BP_X}
          y={bpRowY(BP_SELECTED_ROW)}
          w={TOTAL_W}
          h={ROW_H}
          className="note-stamp"
          style={beat(DRAFT_BEAT.handle)}
        />
        <InsetGuide
          x={BP_X}
          y={bpRowY(BP_SELECTED_ROW) + (ROW_H - RADIO.circle) / 2}
          w={RADIO.circle}
          h={RADIO.circle}
          offset={0.8}
          boxX={BP_X}
          boxY={bpRowY(BP_SELECTED_ROW)}
          boxW={RADIO.circle + RADIO.gap}
          boxH={ROW_H}
          clipOffset={0.8}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <MeasureH
          x1={BP_X}
          x2={BP_X + TOTAL_W}
          y={BP_Y + BP_TOTAL_H + 8}
          label={`${TOTAL_W}`}
          labelYOffset={9}
          className="note-stamp"
          style={beat(stampBeat(4))}
        />
        <MeasureNote
          x={BP_X + RADIO.r}
          y={BP_Y - 9}
          anchor="end"
          className="note-stamp"
          style={beat(stampBeat(5))}
        >
          {`r${RADIO.r}`}
        </MeasureNote>
        <MeasureH
          x1={BP_X + RADIO.circle}
          x2={BP_LABEL_X}
          y={BP_Y - 6}
          label={`${RADIO.gap}`}
          className="note-stamp"
          style={beat(stampBeat(0))}
        />
        <MeasureV
          x={BP_X - 12}
          y1={bpRowY(0)}
          y2={bpRowY(0) + ROW_H}
          label={`${ROW_H}`}
          className="note-stamp"
          style={beat(stampBeat(1))}
        />
        <MeasureV
          x={BP_X + TOTAL_W + 12}
          y1={firstMid}
          y2={bpRowY(1) + ROW_H / 2}
          label={`${ROW_PITCH}`}
          labelAnchor="start"
          labelXOffset={5}
          className="note-stamp"
          style={beat(stampBeat(2))}
        />
        <MeasureV
          x={BP_X - 12}
          y1={bpRowY(0) + ROW_H}
          y2={bpRowY(1)}
          label={`gap ${RADIO.rowGap}`}
          className="note-stamp"
          style={beat(stampBeat(3))}
        />
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
        fontSize={7}
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

export function RadioGroupAnatomy() {
  const rowMid = (i: number) => TY + anRowY(i) + ROW_H / 2
  const circleCx = TX + RADIO.r
  const containerLeft = TX - 8
  const labelRight = TX + TOTAL_W

  return (
    <AnatomyFrame
      viewBox="-84 -24 330 240"
      ariaLabel="Radio group anatomy: group, radio circle, traveling dot, label, hidden input and focus ring"
    >
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
      <AnatomyCallout
        part="container"
        label="Group"
        anchor={[containerLeft, rowMid(0)]}
        side="start"
        distance={30}
        isAccent
        measure="flex column · gap 8"
        caption="Holds the items and runs roving arrow-key focus"
      />
      <AnatomyCallout
        part="dot"
        label="Traveling dot"
        anchor={[circleCx - RADIO.dot / 2, rowMid(AN_SELECTED_ROW)]}
        side="start"
        distance={circleCx - RADIO.dot / 2 - containerLeft + 30}
        measure="size-2.5 · 10 × 10"
        caption="Springs from the previous choice to the new one"
      />
      <AnatomyCallout
        part="hidden-input"
        label="Hidden input"
        anchor={[TX, rowMid(2)]}
        side="start"
        distance={TX - containerLeft + 30}
        measure="sr-only native radio"
        caption="Keeps the value in native forms"
      />
      <AnatomyCallout
        part="focus-ring"
        label="Focus ring"
        anchor={[circleCx, rowMid(0) - RADIO.r - 4]}
        side="top"
        distance={24}
        measure="ring 2 · accent"
        caption="Shows on keyboard focus only"
      />
      <AnatomyCallout
        part="circle"
        label="Radio circle"
        anchor={[circleCx, rowMid(2) + RADIO.r]}
        side="bottom"
        distance={28}
        isAccent
        measure="size-5 · 20 × 20 · border 2"
        caption="Outline for each option"
      />
      <AnatomyCallout
        part="label"
        label="Label"
        anchor={[labelRight, rowMid(AN_SELECTED_ROW)]}
        side="end"
        distance={30}
        measure="text-sm · row min-h-11 · gap 12"
        caption="Clickable text that selects the item"
      />
    </AnatomyFrame>
  )
}

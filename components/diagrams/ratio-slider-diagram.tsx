'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset, licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root LICENSE.

import {
  DraftSurface,
  DRAFT_FILL_SOLID,
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
  DRAFT_LABEL_BEAT,
  stampBeat,
} from '@/components/diagrams/lib/diagram-parts'
import {
  AnatomyFrame,
  AnatomyCallout,
  useAnatomy,
  useSpotlight,
} from '@/components/diagrams/lib/anatomy-parts'

const BP = {
  x: 30,
  y: 16,
  w: 168,
  labelsRowH: 32,
  labelsGap: 16,
  barH: 32,
  rx: 4,
  gap: 8,
  divW: 6,
  divPct: 0.8,
  divBorder: 1.5,
  labelInset: 12,
  labelSize: 12,
  labelGap: 8,
  leftPct: 0.6,
} as const

const BP_BAR_Y = BP.y + BP.labelsRowH + BP.labelsGap
const BP_MID_Y = BP_BAR_Y + BP.barH / 2
const BP_TRACK_W = BP.w - BP.gap * 2 - BP.divW
const BP_LEFT_W = Math.round(BP_TRACK_W * BP.leftPct)
const BP_RIGHT_W = BP_TRACK_W - BP_LEFT_W
const BP_DIV_X = BP.x + BP_LEFT_W + BP.gap
const BP_DIV_H = BP.barH * BP.divPct
const BP_RIGHT_X = BP_DIV_X + BP.divW + BP.gap
const BP_LABEL_Y = BP.y + BP.labelsRowH / 2 + BP.labelSize * 0.35
const BP_LEFT_LABEL_X = BP.x + BP.labelInset
const BP_RIGHT_LABEL_X = BP.x + BP.w - BP.labelInset
const BP_GAP_DIM_Y = BP_BAR_Y - 9
const BP_WORD_OPACITY = 0.8

const BP_RIGHT_BAR_CLASS = `${DRAFT_INK_MORPH} fill-transparent stroke-current group-hover:fill-(--color-border-strong) group-hover:stroke-transparent group-focus-visible:fill-(--color-border-strong) group-focus-visible:stroke-transparent`

export function RatioSliderWireframe() {
  const theme = draftTheme
  const bar = {
    y: BP_BAR_Y,
    height: BP.barH,
    rx: BP.rx,
    pathLength: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1,
    strokeWidth: theme.wireframe.strokeWidth,
    strokeOpacity: theme.wireframe.strokeOpacity,
    style: beat(DRAFT_BEAT.outline),
  }
  const label = {
    y: BP_LABEL_Y,
    fontSize: BP.labelSize,
    letterSpacing: '0.025em',
    fontFamily: 'var(--font-sans)',
    style: beat(DRAFT_LABEL_BEAT),
  }

  return (
    <DraftSurface>
      <rect {...bar} x={BP.x} width={BP_LEFT_W} className={`ink-draw ${DRAFT_FILL_SOLID}`} />
      <rect
        {...bar}
        x={BP_RIGHT_X}
        width={BP_RIGHT_W}
        className={`ink-draw ${BP_RIGHT_BAR_CLASS}`}
      />

      <g
        style={{ transformOrigin: `${BP_DIV_X + BP.divW / 2}px ${BP_MID_Y}px` }}
        className="transition-transform duration-(--motion-dur-fast) ease-(--motion-ease-out) group-hover:scale-y-[1.15] group-hover:delay-(--motion-dur-base) group-focus-visible:scale-y-[1.15] group-focus-visible:delay-(--motion-dur-base) motion-reduce:transition-none motion-reduce:transform-none"
      >
        <rect
          x={BP_DIV_X}
          y={BP_MID_Y - BP_DIV_H / 2}
          width={BP.divW}
          height={BP_DIV_H}
          rx={BP.divW / 2}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1}
          strokeWidth={BP.divBorder}
          style={beat(DRAFT_BEAT.anatomy)}
          className={`ink-draw ${DRAFT_INK_MORPH} fill-transparent stroke-(--color-fg) group-hover:fill-(--color-accent) group-focus-visible:fill-(--color-accent)`}
        />
      </g>

      <text {...label} x={BP_LEFT_LABEL_X} className={`fade-note ${DRAFT_TEXT_SOFT}`}>
        <tspan fillOpacity={BP_WORD_OPACITY}>RICH</tspan>
        <tspan dx={BP.labelGap}>60%</tspan>
      </text>
      <text
        {...label}
        x={BP_RIGHT_LABEL_X}
        textAnchor="end"
        className={`fade-note ${DRAFT_INK_MORPH} fill-(--color-muted) opacity-35 group-hover:opacity-100 group-focus-visible:opacity-100`}
      >
        <tspan>40%</tspan>
        <tspan dx={BP.labelGap} fillOpacity={BP_WORD_OPACITY}>
          LIGHT
        </tspan>
      </text>

      <g className={DRAFT_SCAFFOLD_FADE}>
        <rect
          x={BP.x}
          y={BP.y}
          width={BP.w}
          height={BP.labelsRowH}
          rx={BP.rx}
          fill="none"
          stroke="currentColor"
          strokeWidth={theme.guide.strokeWidth}
          strokeDasharray="2 2"
          opacity={theme.guide.dimOpacity}
          className="fade-note"
          style={beat(DRAFT_BEAT.guide)}
        />
        <g
          stroke="var(--bp-accent, var(--color-accent))"
          strokeWidth={theme.guide.strokeWidth}
          strokeDasharray="2 2"
          opacity={theme.guide.structOpacity}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        >
          <line x1={BP_LEFT_LABEL_X} y1={BP.y} x2={BP_LEFT_LABEL_X} y2={BP.y + BP.labelsRowH} />
          <line x1={BP_RIGHT_LABEL_X} y1={BP.y} x2={BP_RIGHT_LABEL_X} y2={BP.y + BP.labelsRowH} />
        </g>
        <GripFrame x={BP.x} y={BP_BAR_Y} w={BP.w} h={BP.barH} style={beat(DRAFT_BEAT.handle)} />
        <MeasureV
          x={BP.x - 12}
          y1={BP.y}
          y2={BP.y + BP.labelsRowH}
          label={`${BP.labelsRowH}`}
          className="note-stamp"
          style={beat(stampBeat(0))}
        />
        <MeasureV
          x={BP.x - 12}
          y1={BP.y + BP.labelsRowH}
          y2={BP_BAR_Y}
          label={`${BP.labelsGap}`}
          className="note-stamp"
          style={beat(stampBeat(1))}
        />
        <MeasureV
          x={BP.x - 12}
          y1={BP_BAR_Y}
          y2={BP_BAR_Y + BP.barH}
          label={`${BP.barH}`}
          className="note-stamp"
          style={beat(stampBeat(2))}
        />
        <MeasureH
          x1={BP.x + BP_LEFT_W}
          x2={BP_DIV_X}
          y={BP_GAP_DIM_Y}
          label=""
          className="note-stamp"
          style={beat(stampBeat(3))}
        />
        <MeasureNote
          x={BP.x + BP_LEFT_W - 4}
          y={BP_GAP_DIM_Y + 2.5}
          anchor="end"
          className="note-stamp"
          style={beat(stampBeat(3))}
        >
          {`gap ${BP.gap}`}
        </MeasureNote>
        <MeasureNote
          x={BP.x + BP.labelInset / 2}
          y={BP.y + 8}
          className="note-stamp"
          style={beat(stampBeat(5))}
        >
          {`${BP.labelInset}`}
        </MeasureNote>
        <MeasureNote
          x={BP.x}
          y={BP_GAP_DIM_Y + 2.5}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(6))}
        >
          {`r${BP.rx}`}
        </MeasureNote>
        <MeasureNote
          x={BP_DIV_X + BP.divW / 2}
          y={BP_BAR_Y + BP.barH + 9}
          className="note-stamp"
          style={beat(stampBeat(7))}
        >
          {`${BP.divW}`}
        </MeasureNote>
        <MeasureH
          x1={BP.x}
          x2={BP.x + BP.w}
          y={BP_BAR_Y + BP.barH + 16}
          label="w-full"
          labelYOffset={9}
          className="note-stamp"
          style={beat(stampBeat(4))}
        />
      </g>
    </DraftSurface>
  )
}

const AN = {
  x: 80,
  y: 70,
  w: 280,
  h: 48,
  rx: 6,
  gap: 8,
  divW: 6,
  divH: 38,
  leftPct: 0.6,
} as const

const AN_LEFT_W = Math.round((AN.w - AN.gap - AN.divW) * AN.leftPct)
const AN_RIGHT_W = AN.w - AN.gap - AN.divW - AN_LEFT_W
const AN_DIV_X = AN.x + AN_LEFT_W + AN.gap / 2
const AN_RIGHT_X = AN.x + AN_LEFT_W + AN.gap + AN.divW
const AN_MID_Y = AN.y + AN.h / 2

function LeftBarShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight(['left-bar', 'left-label'])
  const active = hovered === 'left-bar' || hovered === 'left-label'

  return (
    <g
      onMouseEnter={() => setHovered('left-bar')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect
        x={AN.x}
        y={AN.y}
        width={AN_LEFT_W}
        height={AN.h}
        rx={AN.rx}
        fill="currentColor"
        fillOpacity={active ? 0.95 : 0.88}
        className={spotlight.className}
      />
      <text
        x={AN.x + 12}
        y={AN_MID_Y + 4}
        fontSize={12}
        fontWeight={400}
        fontFamily="var(--font-sans)"
        className={`fill-(--color-bg) pointer-events-none ${spotlight.className}`}
      >
        RICH <tspan>60%</tspan>
      </text>
    </g>
  )
}

function RightBarShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight(['right-bar', 'right-label'])
  const active = hovered === 'right-bar' || hovered === 'right-label'

  return (
    <g
      onMouseEnter={() => setHovered('right-bar')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect
        x={AN_RIGHT_X}
        y={AN.y}
        width={AN_RIGHT_W}
        height={AN.h}
        rx={AN.rx}
        fill="currentColor"
        fillOpacity={active ? 0.35 : 0.22}
        className={spotlight.className}
      />
      <text
        x={AN_RIGHT_X + AN_RIGHT_W - 12}
        y={AN_MID_Y + 4}
        textAnchor="end"
        fontSize={12}
        fontWeight={400}
        fontFamily="var(--font-sans)"
        className={`fill-current pointer-events-none ${spotlight.className}`}
      >
        <tspan>40%</tspan> LIGHT
      </text>
    </g>
  )
}

function DividerShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('divider')
  const scale = hovered === 'divider' ? 1.15 : 1

  return (
    <g
      onMouseEnter={() => setHovered('divider')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer transition-transform duration-(--motion-dur-fast) ease-(--motion-ease-out) motion-reduce:transition-none motion-reduce:transform-none"
      style={{
        pointerEvents: 'all',
        filter: spotlight.style.filter,
        transformOrigin: `${AN_DIV_X + AN.divW / 2}px ${AN_MID_Y}px`,
        transform: `scaleY(${scale})`,
      }}
    >
      <rect
        x={AN_DIV_X - 10}
        y={AN.y - 4}
        width={AN.divW + 20}
        height={AN.h + 8}
        fill="transparent"
      />
      <rect
        x={AN_DIV_X}
        y={AN_MID_Y - AN.divH / 2}
        width={AN.divW}
        height={AN.divH}
        rx={3}
        fill="var(--bp-accent, var(--color-accent))"
        stroke="var(--color-fg)"
        strokeWidth={1.5}
        className={spotlight.className}
      />
    </g>
  )
}

function GapShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('gap')
  const fillOpacity = hovered === 'gap' ? 0.22 : 0.12

  return (
    <g
      onMouseEnter={() => setHovered('gap')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect
        x={AN.x + AN_LEFT_W}
        y={AN.y}
        width={AN.gap / 2 + 1}
        height={AN.h}
        fill="currentColor"
        fillOpacity={fillOpacity}
        className={spotlight.className}
      />
      <rect
        x={AN_DIV_X + AN.divW}
        y={AN.y}
        width={AN.gap / 2 + 1}
        height={AN.h}
        fill="currentColor"
        fillOpacity={fillOpacity}
        className={spotlight.className}
      />
    </g>
  )
}

function AnnotationsLayer() {
  const { hovered } = useAnatomy()
  const dimmed = hovered !== null

  return (
    <g
      style={{
        pointerEvents: 'none',
        filter: dimmed ? 'url(#spotlight-blur)' : 'none',
      }}
      className={`transition-[opacity,filter] duration-(--motion-dur-base) ease-(--motion-ease-in-out) motion-reduce:transition-none motion-reduce:filter-none ${dimmed ? 'opacity-30' : 'opacity-100'}`}
    >
      <GripFrame x={AN.x} y={AN.y} w={AN.w} h={AN.h} />
      <MeasureH x1={AN.x} x2={AN.x + AN.w} y={AN.y - 14} label={`${AN.w}`} />
      <MeasureV
        x={AN.x + AN.w + 14}
        y1={AN.y}
        y2={AN.y + AN.h}
        label={`${AN.h}`}
        labelXOffset={5}
        labelAnchor="start"
      />
      <MeasureNote x={AN.x} y={AN.y - 4} anchor="start">
        {`r${AN.rx}`}
      </MeasureNote>

      <g
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={draftTheme.guide.strokeWidth}
        strokeDasharray="2 2"
        opacity={draftTheme.guide.structOpacity}
      >
        <line
          x1={AN.x + AN_LEFT_W}
          y1={AN.y + AN.h + 4}
          x2={AN.x + AN_LEFT_W}
          y2={AN.y + AN.h + 10}
        />
        <line x1={AN_RIGHT_X} y1={AN.y + AN.h + 4} x2={AN_RIGHT_X} y2={AN.y + AN.h + 10} />
        <line x1={AN.x + AN_LEFT_W} y1={AN.y + AN.h + 7} x2={AN_DIV_X} y2={AN.y + AN.h + 7} />
        <line x1={AN_DIV_X + AN.divW} y1={AN.y + AN.h + 7} x2={AN_RIGHT_X} y2={AN.y + AN.h + 7} />
      </g>
      <MeasureNote x={AN.x + AN_LEFT_W + AN.gap / 2} y={AN.y + AN.h + 20} anchor="middle">
        gap 8
      </MeasureNote>
      <MeasureNote x={AN_DIV_X + AN.divW / 2} y={AN.y - 12} anchor="middle">
        handle 6
      </MeasureNote>

      <g
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={draftTheme.guide.strokeWidth}
        strokeDasharray="2 2"
        opacity={draftTheme.guide.structOpacity}
      >
        <line x1={AN.x} y1={AN.y + 12} x2={AN.x + 12} y2={AN.y + 12} />
        <line
          x1={AN_RIGHT_X + AN_RIGHT_W - 12}
          y1={AN.y + 12}
          x2={AN_RIGHT_X + AN_RIGHT_W}
          y2={AN.y + 12}
        />
      </g>
      <MeasureNote x={AN.x + 6} y={AN.y + 12 - 4} anchor="middle">
        12
      </MeasureNote>
      <MeasureNote x={AN_RIGHT_X + AN_RIGHT_W - 6} y={AN.y + 12 - 4} anchor="middle">
        12
      </MeasureNote>
    </g>
  )
}

export function RatioSliderBreakdown() {
  return (
    <AnatomyFrame viewBox="-64 -6 568 200" ariaLabel="Ratio slider anatomy">
      <LeftBarShape />
      <RightBarShape />
      <GapShape />
      <DividerShape />
      <AnnotationsLayer />
      <AnatomyCallout
        part="left-bar"
        label="Left bar"
        anchor={[AN.x, AN_MID_Y]}
        side="start"
        distance={40}
        isAccent
        measure={`${AN_LEFT_W} × ${AN.h} · rounded-md`}
        caption="Filled bar for the first share of the ratio"
      />
      <AnatomyCallout
        part="right-bar"
        label="Right bar"
        anchor={[AN.x + AN.w, AN_MID_Y]}
        side="end"
        distance={40}
        measure={`${AN_RIGHT_W} × ${AN.h} · rounded-md`}
        caption="Bar for the remaining share"
      />
      <AnatomyCallout
        part="left-label"
        label="Left label"
        anchor={[AN.x + 40, AN.y + AN.h]}
        side="bottom"
        distance={48}
        measure="text-sm · moves above when compact"
        caption="Value label for the left bar"
      />
      <AnatomyCallout
        part="divider"
        label="Divider"
        anchor={[AN_DIV_X + AN.divW / 2, AN.y + AN.h]}
        side="bottom"
        distance={48}
        isAccent
        measure={`${AN.divW} × ${AN.divH} · draggable`}
        caption="Drag or use arrow keys to change the split"
      />
      <AnatomyCallout
        part="right-label"
        label="Right label"
        anchor={[AN_RIGHT_X + AN_RIGHT_W - 24, AN.y + AN.h]}
        side="bottom"
        distance={48}
        measure="text-sm · moves above when compact"
        caption="Value label for the right bar"
      />
    </AnatomyFrame>
  )
}

'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset — licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root MIT LICENSE.

import {
  AnatomyFrame,
  AnatomyTag,
  OverlayLine,
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
  MeasureNote,
  MeasureV,
  MeasureH,
  GripFrame,
  InsetGuide,
  squircleRectPath,
  DRAFT_DETAIL_BEAT,
  DRAFT_LABEL_BEAT,
  DRAFT_LABEL_ALT_BEAT,
  stampBeat,
} from '@/components/diagrams/lib/parts'

const AA = {
  btnW: 72,
  btnH: 44,
  iconSize: 16,
  gap: 4,
  moreBtnW: 44,
  rx: 6,
  pad: 12,
} as const

const BTN_COUNT = 3
const TOTAL_W = BTN_COUNT * AA.btnW + (BTN_COUNT - 1) * AA.gap + AA.gap + AA.moreBtnW
const BAR_H = AA.btnH
const MENU_W = 160
const MENU_ITEM_H = 40
const MENU_PAD = 4
const MENU_H = MENU_PAD * 2 + 3 * MENU_ITEM_H
const MENU_Y = BAR_H + 4

const OX = 30
const OY = 30

function ToolbarShape() {
  const spotlight = useSpotlight('toolbar')
  return (
    <rect
      x={OX}
      y={OY}
      width={TOTAL_W}
      height={BAR_H}
      rx={AA.rx}
      className={`fill-transparent stroke-(--color-fg) ${spotlight.className}`}
      strokeDasharray="3 3"
      strokeOpacity={0.3}
      style={spotlight.style}
      strokeWidth={1}
    />
  )
}

function ActionButtonShape({ index }: { index: number }) {
  const spotlight = useSpotlight(`action-${index}`)
  const x = OX + index * (AA.btnW + AA.gap)
  const iconX = x + AA.pad
  const iconY = OY + (AA.btnH - AA.iconSize) / 2
  const labelX = iconX + AA.iconSize + 8
  const labelY = OY + BAR_H / 2 + 3

  return (
    <g {...spotlight}>
      <rect
        x={x}
        y={OY}
        width={AA.btnW}
        height={AA.btnH}
        rx={AA.rx}
        className="fill-transparent stroke-(--color-border)"
        strokeWidth={0.75}
      />
      <rect
        x={iconX}
        y={iconY}
        width={AA.iconSize}
        height={AA.iconSize}
        rx={2}
        className="fill-(--color-muted)/30"
      />
      <rect
        x={labelX}
        y={labelY - 4}
        width={28}
        height={6}
        rx={2}
        className="fill-(--color-fg)/30"
      />
    </g>
  )
}

function MoreButtonShape() {
  const spotlight = useSpotlight('more-trigger')
  const x = OX + BTN_COUNT * (AA.btnW + AA.gap)
  const cy = OY + BAR_H / 2

  return (
    <g {...spotlight}>
      <rect
        x={x}
        y={OY}
        width={AA.moreBtnW}
        height={AA.btnH}
        rx={AA.rx}
        className="fill-transparent stroke-(--color-border)"
        strokeWidth={0.75}
        strokeDasharray="3 2"
      />
      <circle cx={x + 18} cy={cy} r={1.5} className="fill-(--color-fg)/50" />
      <circle cx={x + 22} cy={cy} r={1.5} className="fill-(--color-fg)/50" />
      <circle cx={x + 26} cy={cy} r={1.5} className="fill-(--color-fg)/50" />
    </g>
  )
}

function OverflowMenuShape() {
  const spotlight = useSpotlight('overflow-menu')
  const x = OX + TOTAL_W - MENU_W
  const y = OY + MENU_Y

  return (
    <g {...spotlight}>
      <rect
        x={x}
        y={y}
        width={MENU_W}
        height={MENU_H}
        rx={AA.rx}
        className="fill-(--color-surface) stroke-(--color-border)"
        strokeWidth={1}
      />
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={x + MENU_PAD}
          y={y + MENU_PAD + i * MENU_ITEM_H}
          width={MENU_W - MENU_PAD * 2}
          height={MENU_ITEM_H}
          rx={4}
          className={
            i === 0 ? 'fill-(--color-surface-2) stroke-none' : 'fill-transparent stroke-none'
          }
        />
      ))}
      {[0, 1, 2].map((i) => (
        <rect
          key={`label-${i}`}
          x={x + MENU_PAD + 12}
          y={y + MENU_PAD + i * MENU_ITEM_H + (MENU_ITEM_H - 5) / 2}
          width={50 + (i === 1 ? 10 : 0)}
          height={5}
          rx={2}
          className="fill-(--color-fg)/30"
        />
      ))}
    </g>
  )
}

function TagsLayer() {
  return (
    <foreignObject x={OX - 10} y={OY - 28} width={TOTAL_W + 20} height={24}>
      <div className="flex items-start justify-between gap-2">
        <AnatomyTag part="toolbar" label="Toolbar" isAccent />
        <AnatomyTag part="action-0" label="Action" />
        <AnatomyTag part="more-trigger" label="More" />
        <AnatomyTag part="overflow-menu" label="Menu" />
      </div>
    </foreignObject>
  )
}

function LinesLayer() {
  const menuX = OX + TOTAL_W - MENU_W

  return (
    <g strokeWidth={0.75} strokeDasharray="2 2">
      <OverlayLine id="toolbar" x1={OX} y1={OY} x2={OX} y2={OY - 6} />
      <OverlayLine id="action-0" x1={OX + AA.btnW / 2} y1={OY} x2={OX + AA.btnW / 2} y2={OY - 6} />
      <OverlayLine
        id="more-trigger"
        x1={OX + BTN_COUNT * (AA.btnW + AA.gap) + AA.moreBtnW / 2}
        y1={OY}
        x2={OX + BTN_COUNT * (AA.btnW + AA.gap) + AA.moreBtnW / 2}
        y2={OY - 6}
      />
      <OverlayLine
        id="overflow-menu"
        x1={menuX + MENU_W / 2}
        y1={OY + MENU_Y}
        x2={menuX + MENU_W / 2}
        y2={OY + MENU_Y - 4}
      />
    </g>
  )
}

export function AdaptiveActionsAnatomy() {
  return (
    <AnatomyFrame viewBox={`0 0 ${TOTAL_W + 60} ${BAR_H + MENU_Y + MENU_H + 50}`}>
      <ToolbarShape />
      {[0, 1, 2].map((i) => (
        <ActionButtonShape key={i} index={i} />
      ))}
      <MoreButtonShape />
      <OverflowMenuShape />
      <LinesLayer />
      <TagsLayer />
    </AnatomyFrame>
  )
}

const BP_C = {
  btnW: 64,
  btnH: 44,
  gap: 3,
  moreBtnW: 44,
  rx: 6,
  iconSize: 16,
  padX: 12,
} as const

const BP_BTNS = 2
const BP_TOTAL_W = BP_BTNS * BP_C.btnW + (BP_BTNS - 1) * BP_C.gap + BP_C.gap + BP_C.moreBtnW
const BP_OX = (220 - BP_TOTAL_W) / 2
const BP_OY = (140 - BP_C.btnH) / 2

const BP_BTN_FILL = `${DRAFT_INK_MORPH} fill-transparent group-hover:fill-(--color-surface-2) group-focus-visible:fill-(--color-surface-2)`

export function AdaptiveActionsBlueprint() {
  const theme = draftTheme

  return (
    <DraftSurface>
      {[0, 1].map((i) => {
        const x = BP_OX + i * (BP_C.btnW + BP_C.gap)
        const iconX = x + BP_C.padX
        const iconY = BP_OY + (BP_C.btnH - BP_C.iconSize) / 2
        return (
          <g key={i}>
            <path
              d={squircleRectPath(x, BP_OY, BP_C.btnW, BP_C.btnH, BP_C.rx)}
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1}
              strokeWidth={theme.wireframe.strokeWidth}
              strokeOpacity={theme.wireframe.strokeOpacity}
              style={beat(DRAFT_BEAT.outline)}
              className={`ink-draw ${BP_BTN_FILL}`}
            />
            <rect
              x={iconX}
              y={iconY}
              width={BP_C.iconSize}
              height={BP_C.iconSize}
              rx={2}
              strokeWidth={theme.wireframe.strokeWidth * 0.6}
              style={beat(i === 0 ? '200ms' : '360ms')}
              className={`fade-note ${DRAFT_TEXT_SOFT} fill-transparent stroke-current`}
            />
            <rect
              x={iconX + BP_C.iconSize + 8}
              y={BP_OY + BP_C.btnH / 2 - 2.5}
              width={14}
              height={5}
              rx={2}
              style={beat(i === 0 ? '280ms' : '440ms')}
              className={`fade-note ${DRAFT_TEXT_SOFT}`}
            />
          </g>
        )
      })}
      {(() => {
        const x = BP_OX + BP_BTNS * (BP_C.btnW + BP_C.gap)
        const cy = BP_OY + BP_C.btnH / 2
        return (
          <g>
            <rect
              x={x}
              y={BP_OY}
              width={BP_C.moreBtnW}
              height={BP_C.btnH}
              rx={BP_C.rx}
              strokeWidth={theme.wireframe.strokeWidth}
              strokeOpacity={theme.wireframe.strokeOpacity}
              strokeDasharray="2 1.5"
              style={beat(DRAFT_BEAT.anatomy)}
              className={`fade-note ${DRAFT_INK_MORPH}`}
            />
            <circle
              cx={x + 18}
              cy={cy}
              r={1.5}
              style={beat(DRAFT_BEAT.hatch)}
              className={`fade-note ${DRAFT_TEXT_SOFT}`}
            />
            <circle
              cx={x + 22}
              cy={cy}
              r={1.5}
              style={beat(DRAFT_BEAT.hatch)}
              className={`fade-note ${DRAFT_TEXT_SOFT}`}
            />
            <circle
              cx={x + 26}
              cy={cy}
              r={1.5}
              style={beat(DRAFT_BEAT.hatch)}
              className={`fade-note ${DRAFT_TEXT_SOFT}`}
            />
          </g>
        )
      })()}
      <g className={DRAFT_SCAFFOLD_FADE}>
        <InsetGuide
          x={BP_OX + BP_C.padX}
          y={BP_OY + 8}
          w={BP_C.btnW - BP_C.padX * 2}
          h={28}
          offset={0.8}
          boxX={BP_OX}
          boxY={BP_OY}
          boxW={BP_C.btnW}
          boxH={BP_C.btnH}
          boxRx={BP_C.rx}
          clipOffset={0.8}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <MeasureNote
          x={BP_OX + BP_C.padX / 2}
          y={BP_OY + BP_C.btnH / 2 + 2}
          anchor="middle"
          className="note-stamp"
          style={beat(stampBeat(1))}
        >
          {`${BP_C.padX}`}
        </MeasureNote>
        <MeasureV
          x={BP_OX - 10}
          y1={BP_OY}
          y2={BP_OY + BP_C.btnH}
          label={`${BP_C.btnH}`}
          labelXOffset={-6}
          className="note-stamp"
          style={beat(stampBeat(0))}
        />
        <MeasureH
          x1={BP_OX}
          x2={BP_OX + BP_TOTAL_W}
          y={BP_OY - 12}
          label={`${BP_TOTAL_W}`}
          className="note-stamp"
          style={beat(stampBeat(2))}
        />
        <GripFrame
          x={BP_OX}
          y={BP_OY}
          w={BP_TOTAL_W}
          h={BP_C.btnH}
          style={beat(DRAFT_BEAT.handle)}
        />
        <g
          stroke="var(--bp-accent, var(--color-accent))"
          strokeWidth={theme.guide.strokeWidth}
          opacity={theme.guide.structOpacity}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        >
          <line
            x1={BP_OX + BP_C.btnW}
            y1={BP_OY + BP_C.btnH + 4}
            x2={BP_OX + BP_C.btnW}
            y2={BP_OY + BP_C.btnH + 14}
          />
          <line
            x1={BP_OX + BP_C.btnW + BP_C.gap}
            y1={BP_OY + BP_C.btnH + 4}
            x2={BP_OX + BP_C.btnW + BP_C.gap}
            y2={BP_OY + BP_C.btnH + 14}
          />
        </g>
        <MeasureNote
          x={BP_OX + BP_C.btnW + BP_C.gap / 2}
          y={BP_OY + BP_C.btnH + 24}
          anchor="middle"
          className="note-stamp"
          style={beat(stampBeat(3))}
        >
          {`gap ${BP_C.gap} · r${BP_C.rx}`}
        </MeasureNote>
        <MeasureNote
          x={BP_OX + BP_TOTAL_W - BP_C.moreBtnW / 2}
          y={BP_OY - 18}
          anchor="middle"
          className="note-stamp"
          style={beat(stampBeat(4))}
        >
          overflow
        </MeasureNote>
      </g>
    </DraftSurface>
  )
}

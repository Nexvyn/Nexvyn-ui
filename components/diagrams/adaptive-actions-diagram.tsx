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
  Blueprint,
  BP_FILL_PANEL,
  BP_HIDE_ON_MORPH,
  BP_MORPH,
  BP_TEXT_SOFT,
  blueprintTheme,
  DimLabel,
  DimV,
  PadGuide,
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
const MENU_W = 140
const MENU_H = 90
const MENU_Y = BAR_H + 6

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
      className={`fill-(--color-surface) stroke-(--color-border) ${spotlight.className}`}
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
  const labelX = iconX + AA.iconSize + 6
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
      <circle cx={x + 14} cy={cy} r={2} className="fill-(--color-fg)/50" />
      <circle cx={x + 22} cy={cy} r={2} className="fill-(--color-fg)/50" />
      <circle cx={x + 30} cy={cy} r={2} className="fill-(--color-fg)/50" />
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
          x={x + 10}
          y={y + 10 + i * 26}
          width={100}
          height={18}
          rx={4}
          className={
            i === 0 ? 'fill-(--color-surface-2) stroke-none' : 'fill-transparent stroke-none'
          }
        />
      ))}
      {[0, 1, 2].map((i) => (
        <rect
          key={`label-${i}`}
          x={x + 16}
          y={y + 16 + i * 26}
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
  btnW: 42,
  btnH: 26,
  gap: 3,
  moreBtnW: 26,
  rx: 6,
  iconSize: 10,
} as const

const BP_BTNS = 3
const BP_TOTAL_W = BP_BTNS * BP_C.btnW + (BP_BTNS - 1) * BP_C.gap + BP_C.gap + BP_C.moreBtnW
const BP_OX = (220 - BP_TOTAL_W) / 2
const BP_OY = (140 - BP_C.btnH) / 2

export function AdaptiveActionsBlueprint() {
  const theme = blueprintTheme

  return (
    <Blueprint>
      <rect
        x={BP_OX}
        y={BP_OY}
        width={BP_TOTAL_W}
        height={BP_C.btnH}
        rx={BP_C.rx}
        strokeWidth={theme.wireframe.strokeWidth}
        className={`${BP_FILL_PANEL} supports-[corner-shape:squircle]:corner-squircle`}
      />
      {[0, 1, 2].map((i) => {
        const x = BP_OX + i * (BP_C.btnW + BP_C.gap)
        const iconX = x + 6
        const iconY = BP_OY + (BP_C.btnH - BP_C.iconSize) / 2
        return (
          <g key={i}>
            <rect
              x={x}
              y={BP_OY}
              width={BP_C.btnW}
              height={BP_C.btnH}
              rx={BP_C.rx}
              strokeWidth={theme.wireframe.strokeWidth}
              className={`${BP_MORPH} fill-transparent stroke-transparent group-hover:stroke-(--color-border) group-focus-visible:stroke-(--color-border) supports-[corner-shape:squircle]:corner-squircle`}
            />
            <rect
              x={iconX}
              y={iconY}
              width={BP_C.iconSize}
              height={BP_C.iconSize}
              rx={2}
              strokeWidth={theme.wireframe.strokeWidth * 0.6}
              className={`${BP_TEXT_SOFT} fill-transparent stroke-current`}
            />
            <rect
              x={iconX + BP_C.iconSize + 3}
              y={BP_OY + BP_C.btnH / 2 - 2}
              width={16}
              height={4}
              rx={2}
              className={BP_TEXT_SOFT}
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
              strokeDasharray="2 1.5"
              className={`${BP_MORPH} fill-transparent stroke-transparent group-hover:stroke-(--color-border) group-focus-visible:stroke-(--color-border) supports-[corner-shape:squircle]:corner-squircle`}
            />
            <circle cx={x + 8} cy={cy} r={1.5} className={BP_TEXT_SOFT} />
            <circle cx={x + 13} cy={cy} r={1.5} className={BP_TEXT_SOFT} />
            <circle cx={x + 18} cy={cy} r={1.5} className={BP_TEXT_SOFT} />
          </g>
        )
      })()}
      <g className={BP_HIDE_ON_MORPH}>
        <PadGuide
          x={BP_OX + 6}
          y={BP_OY + 3}
          w={BP_C.btnW - 12}
          h={BP_C.btnH - 6}
          offset={0.8}
          boxX={BP_OX}
          boxY={BP_OY}
          boxW={BP_C.btnW}
          boxH={BP_C.btnH}
          boxRx={BP_C.rx}
          clipOffset={0.8}
        />
        <DimLabel x={BP_OX + 3} y={BP_OY + BP_C.btnH / 2 + 2} anchor="middle">
          12
        </DimLabel>
        <DimV x={BP_OX - 10} y1={BP_OY} y2={BP_OY + BP_C.btnH} label="44" />
      </g>
    </Blueprint>
  )
}

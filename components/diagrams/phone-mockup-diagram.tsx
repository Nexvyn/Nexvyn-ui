'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset — licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root MIT LICENSE.

import {
  Blueprint,
  BP_FILL_PANEL,
  BP_FILL_SOLID,
  BP_HIDE_ON_MORPH,
  BP_MORPH,
  blueprintTheme,
  DimH,
  DimLabel,
  DimV,
  PadGuide,
  Selection,
} from '@/components/diagrams/lib/parts'

const BP = { x: 84, y: 12, w: 53, h: 110, rx: 9 } as const
const SCALE = BP.w / 256

const SCREEN_INSET = Math.round(3.5 * SCALE * 100) / 100
const SCREEN_RX = Math.round(36.8 * SCALE * 100) / 100
const ISLAND = {
  w: Math.round(66 * SCALE * 10) / 10,
  h: Math.round(20 * SCALE * 10) / 10,
  top: Math.round(9 * SCALE * 10) / 10,
}
const HOME = { w: Math.round(0.32 * BP.w * 10) / 10, h: 1, bottom: Math.round(5.5 * SCALE * 10) / 10 }

const SIDE_BUTTONS = [
  { side: 'left', top: 15.5, height: 3.2 },
  { side: 'left', top: 21, height: 7.2 },
  { side: 'left', top: 30.5, height: 7.2 },
  { side: 'right', top: 23, height: 11.5 },
] as const

export function PhoneMockupWireframe() {
  const theme = blueprintTheme
  const screenX = BP.x + SCREEN_INSET
  const screenY = BP.y + SCREEN_INSET
  const screenW = BP.w - SCREEN_INSET * 2
  const screenH = BP.h - SCREEN_INSET * 2

  return (
    <Blueprint className="h-auto w-90 sm:w-110">
      {SIDE_BUTTONS.map((btn, i) => {
        const x = btn.side === 'left' ? BP.x - 2 : BP.x + BP.w + 2
        const y1 = BP.y + (btn.top / 100) * BP.h
        const y2 = y1 + (btn.height / 100) * BP.h
        return (
          <line
            key={i}
            x1={x}
            x2={x}
            y1={y1}
            y2={y2}
            stroke="currentColor"
            strokeWidth={theme.wireframe.strokeWidth}
            strokeOpacity={theme.wireframe.strokeOpacity}
            strokeLinecap="round"
          />
        )
      })}

      <rect
        x={BP.x}
        y={BP.y}
        width={BP.w}
        height={BP.h}
        rx={BP.rx}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        className={BP_FILL_PANEL}
      />

      <rect
        x={screenX}
        y={screenY}
        width={screenW}
        height={screenH}
        rx={SCREEN_RX}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        className={BP_FILL_SOLID}
      />

      <rect
        x={BP.x + BP.w / 2 - ISLAND.w / 2}
        y={screenY + ISLAND.top}
        width={ISLAND.w}
        height={ISLAND.h}
        rx={ISLAND.h / 2}
        className={`${BP_MORPH} fill-current opacity-60 group-hover:fill-(--color-bg) group-hover:opacity-90 group-focus-visible:fill-(--color-bg) group-focus-visible:opacity-90`}
      />

      <rect
        x={BP.x + BP.w / 2 - HOME.w / 2}
        y={BP.y + BP.h - HOME.bottom - HOME.h}
        width={HOME.w}
        height={HOME.h}
        rx={HOME.h / 2}
        className={`${BP_MORPH} fill-current opacity-30 group-hover:opacity-60 group-focus-visible:opacity-60`}
      />

      <g className={BP_HIDE_ON_MORPH}>
        <Selection x={BP.x} y={BP.y} w={BP.w} h={BP.h} />
        <DimH x1={BP.x} x2={BP.x + BP.w} y={BP.y + BP.h + 14} label="256" />
        <DimV x={BP.x - 14} y1={BP.y} y2={BP.y + BP.h} label="532" labelXOffset={-6} />
        <DimLabel x={BP.x} y={BP.y - 4} anchor="start">
          r42
        </DimLabel>
        <PadGuide
          x={screenX}
          y={screenY}
          w={screenW}
          h={screenH}
          offset={0.8}
          boxX={BP.x}
          boxY={BP.y}
          boxW={BP.w}
          boxH={BP.h}
          boxRx={BP.rx}
          clipOffset={0.8}
        />
        <DimLabel x={BP.x + BP.w + 6} y={screenY + 4} anchor="start">
          3.5
        </DimLabel>
        <DimLabel x={BP.x + BP.w / 2} y={screenY + ISLAND.top - 3} anchor="middle">
          66x20
        </DimLabel>
      </g>
    </Blueprint>
  )
}

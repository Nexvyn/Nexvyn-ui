'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset — licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root MIT LICENSE.

import {
  Blueprint,
  BP_FILL_PANEL,
  BP_HIDE_ON_MORPH,
  BP_MORPH,
  BP_TEXT_SOFT,
  blueprintTheme,
  DimH,
  DimLabel,
  DimV,
  PadGuide,
  Selection,
} from '@/components/diagrams/lib/parts'
import {
  AnatomyFrame,
  AnatomyTag,
  OverlayLine,
  useAnatomy,
  useSpotlight,
} from '@/components/diagrams/lib/anatomy-parts'

const BP = {
  x: 30,
  y: 16,
  w: 160,
  inputH: 32,
  inputRx: 6,
  padStart: 16,
  padEnd: 40,
  padY: 10,
  gap: 6,
  panelPad: 5,
  itemH: 26,
  itemRx: 4,
  clearR: 7,
} as const

const BP_PANEL_Y = BP.y + BP.inputH + BP.gap
const BP_ITEMS = [
  { label: 'Berlin', desc: undefined },
  { label: 'Paris', desc: 'France' },
] as const
const BP_PANEL_H = BP.panelPad * 2 + BP_ITEMS.length * BP.itemH
const BP_ACTIVE_INDEX = 0

function bpItemY(i: number) {
  return BP_PANEL_Y + BP.panelPad + i * BP.itemH
}

export function ComboboxBlueprint() {
  const theme = blueprintTheme
  const clearCx = BP.x + BP.w - BP.padEnd / 2 - 2
  const clearCy = BP.y + BP.inputH / 2

  return (
    <Blueprint>
      <rect
        x={BP.x}
        y={BP.y}
        width={BP.w}
        height={BP.inputH}
        rx={BP.inputRx}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        className={BP_FILL_PANEL}
      />
      <text
        x={BP.x + BP.padStart}
        y={BP.y + BP.inputH / 2 + 4}
        fontSize={12}
        fontWeight={500}
        fontFamily="var(--font-sans)"
        className={BP_TEXT_SOFT}
      >
        Search city…
      </text>

      <g className={`${BP_MORPH} opacity-0 group-hover:opacity-70 group-focus-visible:opacity-70`}>
        <circle
          cx={clearCx}
          cy={clearCy}
          r={BP.clearR}
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
        />
        <path
          d={`M${clearCx - 3} ${clearCy - 3}l6 6M${clearCx + 3} ${clearCy - 3}l-6 6`}
          stroke="currentColor"
          strokeWidth={1}
          strokeLinecap="round"
        />
      </g>

      <rect
        x={BP.x}
        y={BP_PANEL_Y}
        width={BP.w}
        height={BP_PANEL_H}
        rx={BP.inputRx}
        strokeWidth={theme.wireframe.strokeWidth}
        className={`${BP_MORPH} fill-transparent stroke-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 group-hover:fill-popover group-focus-visible:fill-popover group-hover:stroke-(--color-border) group-focus-visible:stroke-(--color-border)`}
      />
      <rect
        x={BP.x + BP.panelPad}
        y={bpItemY(BP_ACTIVE_INDEX)}
        width={BP.w - BP.panelPad * 2}
        height={BP.itemH}
        rx={BP.itemRx}
        fill="var(--bp-accent, var(--color-accent))"
        className={`${BP_MORPH} opacity-0 group-hover:opacity-15 group-focus-visible:opacity-15`}
      />
      {BP_ITEMS.map((opt, i) => (
        <g key={opt.label}>
          <text
            x={BP.x + BP.panelPad + 10}
            y={bpItemY(i) + (opt.desc ? BP.itemH / 2 - 3 : BP.itemH / 2) + 4}
            fontSize={11}
            fontFamily="var(--font-sans)"
            className={`${BP_MORPH} fill-current opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100`}
          >
            {opt.label}
          </text>
          {opt.desc && (
            <text
              x={BP.x + BP.panelPad + 10}
              y={bpItemY(i) + BP.itemH / 2 + 8}
              fontSize={8}
              fontFamily="var(--font-sans)"
              className={`${BP_MORPH} fill-current opacity-0 group-hover:opacity-60 group-focus-visible:opacity-60`}
            >
              {opt.desc}
            </text>
          )}
        </g>
      ))}

      <g className={BP_HIDE_ON_MORPH}>
        <rect
          x={BP.x}
          y={BP_PANEL_Y}
          width={BP.w}
          height={BP_PANEL_H}
          rx={BP.inputRx}
          fill="none"
          stroke="currentColor"
          strokeWidth={theme.guide.strokeWidth}
          strokeDasharray="3 3"
          opacity={theme.guide.structOpacity}
        />
        <PadGuide
          x={BP.x + BP.panelPad}
          y={BP_PANEL_Y + BP.panelPad}
          w={BP.w - BP.panelPad * 2}
          h={BP_PANEL_H - BP.panelPad * 2}
          offset={0.8}
          boxX={BP.x}
          boxY={BP_PANEL_Y}
          boxW={BP.w}
          boxH={BP_PANEL_H}
          boxRx={BP.inputRx}
          clipOffset={0.8}
        />
        <Selection x={BP.x} y={BP.y} w={BP.w} h={BP.inputH} />
        <DimH x1={BP.x} x2={BP.x + BP.w} y={BP.y - 8} label={`${BP.w}`} />
        <DimV
          x={BP.x - 12}
          y1={BP.y}
          y2={BP.y + BP.inputH}
          label={`${BP.inputH}`}
          labelXOffset={-6}
        />
        <DimV
          x={BP.x - 12}
          y1={BP.y + BP.inputH}
          y2={BP_PANEL_Y}
          label={`${BP.gap}`}
          labelXOffset={-6}
        />
        <DimLabel x={BP.x} y={BP.y - 4} anchor="start">
          {`r${BP.inputRx}`}
        </DimLabel>

        <PadGuide
          x={BP.x + BP.padStart}
          y={BP.y + BP.padY}
          w={BP.w - BP.padStart - BP.padEnd}
          h={BP.inputH - BP.padY * 2}
          offset={0.8}
          boxX={BP.x}
          boxY={BP.y}
          boxW={BP.w}
          boxH={BP.inputH}
          boxRx={BP.inputRx}
          clipOffset={0.8}
        />

        <DimLabel x={BP.x + 8} y={BP.y + BP.inputH - 4} anchor="middle">
          {`${BP.padStart}`}
        </DimLabel>
        <DimLabel x={BP.x + BP.w - 20} y={BP.y + BP.inputH - 4} anchor="middle">
          {`${BP.padEnd}`}
        </DimLabel>
        <DimLabel x={BP.x + BP.w / 2} y={BP.y + 6} anchor="middle">
          {`${BP.padY}`}
        </DimLabel>
        <DimLabel x={BP.x + BP.w / 2} y={BP.y + BP.inputH - 2} anchor="middle">
          {`${BP.padY}`}
        </DimLabel>
        <DimLabel x={BP.x + BP.panelPad / 2} y={BP_PANEL_Y + BP_PANEL_H / 2 + 2} anchor="middle">
          {`${BP.panelPad}`}
        </DimLabel>
      </g>
    </Blueprint>
  )
}

const AN = {
  x: 60,
  y: 20,
  w: 130,
  inputH: 36,
  inputRx: 6,
  padStart: 16,
  padEnd: 36,
  padY: 12,
  gap: 8,
  panelPad: 6,
  itemH: 30,
  itemRx: 4,
} as const

const AN_PANEL_Y = AN.y + AN.inputH + AN.gap
const AN_ITEMS = [
  { label: 'Berlin', desc: undefined },
  { label: 'Paris', desc: 'France' },
] as const
const AN_PANEL_H = AN.panelPad * 2 + AN_ITEMS.length * AN.itemH
const AN_ACTIVE_INDEX = 0

function anItemY(i: number) {
  return AN_PANEL_Y + AN.panelPad + i * AN.itemH
}

function InputShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('input')

  return (
    <g
      onMouseEnter={() => setHovered('input')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect
        x={AN.x}
        y={AN.y}
        width={AN.w}
        height={AN.inputH}
        rx={AN.inputRx}
        stroke="currentColor"
        strokeWidth={hovered === 'input' ? 2 : 1.25}
        fill={hovered === 'input' ? 'currentColor' : 'transparent'}
        fillOpacity={hovered === 'input' ? 0.05 : 0}
        className={spotlight.className}
      />
      <text
        x={AN.x + 14}
        y={AN.y + AN.inputH / 2 + 4}
        fontSize={13}
        fontFamily="var(--font-sans)"
        className={`fill-current pointer-events-none ${spotlight.className}`}
      >
        Search city…
      </text>
      <circle
        cx={AN.x + AN.w - AN.padEnd / 2 - 2}
        cy={AN.y + AN.inputH / 2}
        r={7}
        fill="none"
        stroke="currentColor"
        strokeWidth={1}
        className="pointer-events-none opacity-50"
      />
    </g>
  )
}

function PanelShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('panel')

  return (
    <rect
      x={AN.x}
      y={AN_PANEL_Y}
      width={AN.w}
      height={AN_PANEL_H}
      rx={AN.inputRx}
      stroke="currentColor"
      strokeWidth={hovered === 'panel' ? 2 : 1.25}
      fill={hovered === 'panel' ? 'currentColor' : 'var(--color-bg)'}
      fillOpacity={hovered === 'panel' ? 0.04 : 1}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ ...spotlight.style, pointerEvents: 'all' }}
      onMouseEnter={() => setHovered('panel')}
      onMouseLeave={() => setHovered(null)}
    />
  )
}

function OptionShape({ index, label, desc }: { index: number; label: string; desc?: string }) {
  const { hovered, setHovered } = useAnatomy()
  const partId = index === AN_ACTIVE_INDEX ? 'option' : `option-${index}`
  const spotlight = useSpotlight(partId)
  const isActive = index === AN_ACTIVE_INDEX
  const y = anItemY(index)

  return (
    <g
      onMouseEnter={() => setHovered(partId)}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      {isActive && (
        <rect
          x={AN.x + AN.panelPad}
          y={y}
          width={AN.w - AN.panelPad * 2}
          height={AN.itemH}
          rx={AN.itemRx}
          fill="var(--bp-accent, var(--color-accent))"
          fillOpacity={0.15}
          className="pointer-events-none"
        />
      )}
      <rect
        x={AN.x + AN.panelPad}
        y={y}
        width={AN.w - AN.panelPad * 2}
        height={AN.itemH}
        rx={AN.itemRx}
        fill="currentColor"
        fillOpacity={hovered === partId ? 0.06 : 0}
        className={spotlight.className}
      />
      <text
        x={AN.x + AN.panelPad + 12}
        y={y + (desc ? AN.itemH / 2 - 2 : AN.itemH / 2) + 4}
        fontSize={12}
        fontFamily="var(--font-sans)"
        className={`fill-current pointer-events-none ${spotlight.className}`}
      >
        {label}
      </text>
      {desc && (
        <text
          x={AN.x + AN.panelPad + 12}
          y={y + AN.itemH / 2 + 11}
          fontSize={9}
          fontFamily="var(--font-sans)"
          className="fill-current pointer-events-none opacity-60"
        >
          {desc}
        </text>
      )}
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
      <Selection x={AN.x} y={AN.y} w={AN.w} h={AN.inputH} />
      <Selection x={AN.x} y={AN_PANEL_Y} w={AN.w} h={AN_PANEL_H} />
      <DimH x1={AN.x} x2={AN.x + AN.w} y={AN.y - 14} label={`${AN.w}`} />
      <DimV
        x={AN.x + AN.w + 14}
        y1={AN.y}
        y2={AN.y + AN.inputH}
        label={`${AN.inputH}`}
        labelXOffset={5}
        labelAnchor="start"
      />
      <DimLabel x={AN.x} y={AN.y - 4} anchor="start">
        {`r${AN.inputRx}`}
      </DimLabel>
      <DimLabel x={AN.x} y={AN_PANEL_Y - 4} anchor="start">
        {`r${AN.inputRx}`}
      </DimLabel>

      <PadGuide
        x={AN.x + AN.padStart}
        y={AN.y + AN.padY}
        w={AN.w - AN.padStart - AN.padEnd}
        h={AN.inputH - AN.padY * 2}
        offset={0.8}
        boxX={AN.x}
        boxY={AN.y}
        boxW={AN.w}
        boxH={AN.inputH}
        boxRx={AN.inputRx}
        clipOffset={0.8}
      />

      <DimLabel x={AN.x + 8} y={AN.y + AN.inputH - 4} anchor="middle">
        {`${AN.padStart}`}
      </DimLabel>
      <DimLabel x={AN.x + AN.w - 18} y={AN.y + AN.inputH - 4} anchor="middle">
        {`${AN.padEnd}`}
      </DimLabel>
      <DimLabel x={AN.x + AN.w / 2} y={AN.y + 7} anchor="middle">
        {`${AN.padY}`}
      </DimLabel>
      <DimLabel x={AN.x + AN.w / 2} y={AN.y + AN.inputH - 3} anchor="middle">
        {`${AN.padY}`}
      </DimLabel>
      <PadGuide
        x={AN.x + AN.panelPad}
        y={AN_PANEL_Y + AN.panelPad}
        w={AN.w - AN.panelPad * 2}
        h={AN_PANEL_H - AN.panelPad * 2}
        offset={0.8}
        boxX={AN.x}
        boxY={AN_PANEL_Y}
        boxW={AN.w}
        boxH={AN_PANEL_H}
        boxRx={AN.inputRx}
        clipOffset={0.8}
      />
      <DimLabel x={AN.x + AN.panelPad / 2} y={AN_PANEL_Y + AN_PANEL_H / 2 + 2} anchor="middle">
        {`${AN.panelPad}`}
      </DimLabel>
      <DimLabel x={AN.x} y={AN_PANEL_Y + AN_PANEL_H + 14} anchor="start">
        {`r${AN.itemRx}`}
      </DimLabel>
    </g>
  )
}

function LinesLayer() {
  const rightEdge = AN.x + AN.w
  const tagX = rightEdge + 30
  const optionMidY = anItemY(AN_ACTIVE_INDEX) + AN.itemH / 2

  return (
    <g strokeWidth="1" className="pointer-events-none">
      <OverlayLine
        id="input"
        x1={rightEdge}
        y1={AN.y + AN.inputH / 2}
        x2={tagX}
        y2={AN.y + AN.inputH / 2}
      />
      <OverlayLine
        id="panel"
        x1={rightEdge}
        y1={AN_PANEL_Y + AN_PANEL_H / 2}
        x2={tagX}
        y2={AN_PANEL_Y + AN_PANEL_H / 2}
      />
      <OverlayLine
        id="option"
        x1={AN.x + AN.w - AN.panelPad}
        y1={optionMidY}
        x2={tagX}
        y2={optionMidY + 28}
      />
    </g>
  )
}

function TagsLayer() {
  const rightEdge = AN.x + AN.w
  const tagX = rightEdge + 30
  const optionMidY = anItemY(AN_ACTIVE_INDEX) + AN.itemH / 2

  return (
    <>
      <foreignObject
        x={tagX}
        y={AN.y + AN.inputH / 2 - 12}
        width={100}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="input" label="Input" isAccent className="items-center justify-start" />
      </foreignObject>
      <foreignObject
        x={tagX}
        y={AN_PANEL_Y + AN_PANEL_H / 2 - 12}
        width={100}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="panel" label="Panel" className="items-center justify-start" />
      </foreignObject>
      <foreignObject
        x={tagX}
        y={optionMidY + 16}
        width={110}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="option" label="Option (active)" className="items-center justify-start" />
      </foreignObject>
    </>
  )
}

export function ComboboxAnatomy() {
  return (
    <AnatomyFrame viewBox="-10 -10 350 210" maxWidthClassName="max-w-[440px]">
      <InputShape />
      <PanelShape />
      {AN_ITEMS.map((opt, index) => (
        <OptionShape key={opt.label} index={index} label={opt.label} desc={opt.desc} />
      ))}
      <AnnotationsLayer />
      <LinesLayer />
      <TagsLayer />
    </AnatomyFrame>
  )
}

'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset — licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root MIT LICENSE.

import {
  Blueprint,
  BP_FILL_SOLID,
  BP_HIDE_ON_MORPH,
  BP_TEXT_SOFT,
  blueprintTheme,
  DimH,
  PadGuide,
} from '@/components/diagrams/lib/parts'
import {
  AnatomyFrame,
  AnatomyTag,
  OverlayLine,
  useAnatomy,
  useSpotlight,
} from '@/components/diagrams/lib/anatomy-parts'

const BOX = { size: 20, r: 5 } as const
const ROW = { labelGap: 12, labelFont: 14 } as const
const BP_CENTER = { x: 88, y: 70 } as const
const WRAP = { x: 58, y: 47, w: 148, h: 46, rx: 8 } as const

export function CheckboxBlueprint() {
  const theme = blueprintTheme
  const bx = BP_CENTER.x - BOX.size / 2
  const by = BP_CENTER.y - BOX.size / 2

  return (
    <Blueprint>
      <defs>
        <pattern
          id="bp-hatch-checkbox"
          width="4"
          height="4"
          patternTransform="rotate(45)"
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="4"
            stroke="currentColor"
            strokeWidth="0.75"
            opacity="0.35"
          />
        </pattern>
      </defs>
      <rect
        x={bx}
        y={by}
        width={BOX.size}
        height={BOX.size}
        rx={BOX.r}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        className={BP_FILL_SOLID}
      />
      <rect
        x={bx}
        y={by}
        width={BOX.size}
        height={BOX.size}
        rx={BOX.r}
        fill="url(#bp-hatch-checkbox)"
        className={BP_HIDE_ON_MORPH}
      />
      <path
        d={`M${bx + 4.38} ${by + 10.62}L${bx + 8.75} ${by + 15}L${bx + 15.62} ${by + 6.88}`}
        pathLength={1}
        stroke="var(--color-bg)"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className="[stroke-dasharray:1] [stroke-dashoffset:1] transition-[stroke-dashoffset] duration-(--motion-dur-slow) ease-(--motion-ease-out) group-hover:[stroke-dashoffset:0] group-focus-visible:[stroke-dashoffset:0] motion-reduce:transition-none"
      />
      <text
        x={bx + BOX.size + ROW.labelGap}
        y={BP_CENTER.y + 4}
        fontSize={ROW.labelFont}
        fontWeight={500}
        fontFamily="var(--font-sans)"
        className={BP_TEXT_SOFT}
      >
        Label
      </text>
      <g className={BP_HIDE_ON_MORPH}>
        <PadGuide
          x={bx - 1}
          y={by - 1}
          w={BOX.size + 2}
          h={BOX.size + 2}
          boxX={WRAP.x}
          boxY={WRAP.y}
          boxW={WRAP.w}
          boxH={WRAP.h}
          boxRx={WRAP.rx}
        />
        <DimH x1={bx} x2={bx + BOX.size} y={by - 14} label={`${BOX.size}`} />
        <DimH
          x1={bx + BOX.size}
          x2={bx + BOX.size + ROW.labelGap}
          y={by + BOX.size + 18}
          label={`${ROW.labelGap}`}
        />
      </g>
    </Blueprint>
  )
}

const AN = { x: 130, y: 67 } as const
const AN_MID_Y = AN.y + BOX.size / 2

function BoxShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('box')

  return (
    <rect
      x={AN.x}
      y={AN.y}
      width={BOX.size}
      height={BOX.size}
      rx={BOX.r}
      stroke="currentColor"
      strokeWidth={hovered === 'box' ? 2 : blueprintTheme.wireframe.strokeWidth}
      fill={hovered === 'box' ? 'currentColor' : 'transparent'}
      fillOpacity={hovered === 'box' ? 0.15 : 0}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ ...spotlight.style, pointerEvents: 'all' }}
      onMouseEnter={() => setHovered('box')}
      onMouseLeave={() => setHovered(null)}
    />
  )
}

function GlyphShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('glyph')

  return (
    <g
      onMouseEnter={() => setHovered('glyph')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect x={AN.x + 2} y={AN.y + 2} width={16} height={16} fill="transparent" />
      <path
        d={`M${AN.x + 4} ${AN_MID_Y}L${AN.x + 7.5} ${AN_MID_Y + 3}L${AN.x + 14} ${AN_MID_Y - 4}`}
        stroke="currentColor"
        strokeWidth={hovered === 'glyph' ? 2 : 1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className={spotlight.className}
      />
    </g>
  )
}

function LabelShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('label')

  return (
    <g
      onMouseEnter={() => setHovered('label')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect
        x={AN.x + BOX.size + ROW.labelGap - 4}
        y={AN.y}
        width={ROW.labelW}
        height={BOX.size}
        fill="transparent"
      />
      <text
        x={AN.x + BOX.size + ROW.labelGap}
        y={AN_MID_Y + 4}
        fontSize={ROW.labelFont}
        fontWeight={500}
        fontFamily="var(--font-sans)"
        className={`fill-current ${spotlight.className}`}
      >
        Accept terms
      </text>
    </g>
  )
}

function HiddenInputShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('hidden-input')

  return (
    <g
      onMouseEnter={() => setHovered('hidden-input')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect
        x={AN.x - 4}
        y={AN.y + BOX.size + 8}
        width={28}
        height={12}
        rx={2}
        stroke="currentColor"
        strokeWidth={hovered === 'hidden-input' ? 1.5 : 0.75}
        strokeDasharray="2 2"
        fill={hovered === 'hidden-input' ? 'currentColor' : 'transparent'}
        fillOpacity={hovered === 'hidden-input' ? 0.08 : 0}
        className={spotlight.className}
      />
      <text
        x={AN.x + 10}
        y={AN.y + BOX.size + 17}
        fontSize={6}
        fontFamily="var(--font-mono)"
        textAnchor="middle"
        className={`fill-current ${spotlight.className}`}
        opacity={0.6}
      >
        input
      </text>
    </g>
  )
}

function TouchTargetShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('touch-target')

  return (
    <rect
      x={AN.x - 12}
      y={AN_MID_Y - ROW.h / 2}
      width={BOX.size + ROW.labelGap + ROW.labelW + 24}
      height={ROW.h}
      rx={4}
      stroke="currentColor"
      strokeWidth={hovered === 'touch-target' ? 1.5 : blueprintTheme.guide.strokeWidth}
      strokeDasharray="4 3"
      fill={hovered === 'touch-target' ? 'currentColor' : 'transparent'}
      fillOpacity={hovered === 'touch-target' ? 0.04 : 0}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ ...spotlight.style, pointerEvents: 'all' }}
      onMouseEnter={() => setHovered('touch-target')}
      onMouseLeave={() => setHovered(null)}
    />
  )
}

function LinesLayer() {
  return (
    <g strokeWidth="1" className="pointer-events-none">
      <OverlayLine id="box" x1={AN.x} y1={AN.y} x2={AN.x - 40} y2={AN.y - 24} />
      <OverlayLine id="glyph" x1={AN.x + BOX.size / 2} y1={AN.y} x2={AN.x + BOX.size / 2} y2={22} />
      <OverlayLine
        id="label"
        x1={AN.x + BOX.size + ROW.labelGap + 40}
        y1={AN.y}
        x2={AN.x + BOX.size + ROW.labelGap + 40}
        y2={28}
      />
      <OverlayLine
        id="hidden-input"
        x1={AN.x + 24}
        y1={AN.y + BOX.size + 14}
        x2={AN.x + 60}
        y2={AN.y + BOX.size + 24}
      />
      <OverlayLine
        id="touch-target"
        x1={AN.x + BOX.size + ROW.labelGap + ROW.labelW + 12}
        y1={AN_MID_Y}
        x2={340}
        y2={AN_MID_Y}
      />
    </g>
  )
}

function TagsLayer() {
  return (
    <>
      <foreignObject
        x={AN.x - 88}
        y={AN.y - 46}
        width={100}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="box" label="Checkbox.Box" className="items-end justify-end" />
      </foreignObject>
      <foreignObject
        x={AN.x + BOX.size / 2 - 40}
        y={6}
        width={100}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="glyph" label="Check Glyph" className="items-end justify-center" />
      </foreignObject>
      <foreignObject
        x={AN.x + BOX.size + ROW.labelGap + 10}
        y={10}
        width={90}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="label" label="Label Text" className="items-end justify-center" />
      </foreignObject>
      <foreignObject
        x={AN.x + 58}
        y={AN.y + BOX.size + 16}
        width={110}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part="hidden-input"
          label="Hidden Input"
          className="items-start justify-start"
        />
      </foreignObject>
      <foreignObject
        x={338}
        y={AN_MID_Y - 12}
        width={120}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part="touch-target"
          label="Touch Target 44px"
          className="items-center justify-start"
          isAccent
        />
      </foreignObject>
    </>
  )
}

export function CheckboxAnatomy() {
  return (
    <AnatomyFrame viewBox="-14 -2 500 164" maxWidthClassName="max-w-[600px]">
      <TouchTargetShape />
      <BoxShape />
      <GlyphShape />
      <LabelShape />
      <HiddenInputShape />
      <LinesLayer />
      <TagsLayer />
    </AnatomyFrame>
  )
}

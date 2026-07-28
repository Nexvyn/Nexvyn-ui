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
  DimV,
  DimLabel,
  PadGuide,
  Selection,
  squirclePillPath,
} from '@/components/diagrams/lib/parts'
import {
  AnatomyFrame,
  AnatomyTag,
  OverlayLine,
  useAnatomy,
  useSpotlight,
} from '@/components/diagrams/lib/anatomy-parts'

const BP_BTN = { w: 120, h: 44, r: 6, padX: 16, font: 13 } as const
const BP_X = (220 - BP_BTN.w) / 2
const BP_Y = (140 - BP_BTN.h) / 2

export function ButtonBlueprint() {
  const theme = blueprintTheme
  const cy = BP_Y + BP_BTN.h / 2

  return (
    <Blueprint>
      <path
        d={squirclePillPath(BP_X, BP_Y, BP_BTN.w, BP_BTN.h)}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        className={`${BP_FILL_SOLID} supports-[corner-shape:squircle]:corner-squircle`}
      />
      <text
        x={BP_X + BP_BTN.w / 2}
        y={cy + 4.5}
        textAnchor="middle"
        fontSize={BP_BTN.font}
        fontWeight={500}
        fontFamily="var(--font-sans)"
        className={`${BP_TEXT_SOFT} group-hover:fill-(--color-bg) group-focus-visible:fill-(--color-bg)`}
      >
        Click me
      </text>

      <g className={BP_HIDE_ON_MORPH}>
        <Selection x={BP_X} y={BP_Y} w={BP_BTN.w} h={BP_BTN.h} />
        <PadGuide
          x={BP_X + BP_BTN.padX}
          y={BP_Y + 8}
          w={BP_BTN.w - BP_BTN.padX * 2}
          h={BP_BTN.h - 16}
          offset={0.8}
          boxX={BP_X}
          boxY={BP_Y}
          boxW={BP_BTN.w}
          boxH={BP_BTN.h}
          boxRx={BP_BTN.r}
          clipOffset={0.8}
        />
        <DimLabel x={BP_X + BP_BTN.padX / 2} y={cy + 2} anchor="middle">
          16
        </DimLabel>
        <DimLabel x={BP_X + BP_BTN.w - BP_BTN.padX / 2} y={cy + 2} anchor="middle">
          16
        </DimLabel>
        <DimH x1={BP_X} x2={BP_X + BP_BTN.w} y={BP_Y - 12} label={`${BP_BTN.w}`} />
        <DimV
          x={BP_X - 12}
          y1={BP_Y}
          y2={BP_Y + BP_BTN.h}
          label={`${BP_BTN.h}`}
          labelXOffset={-6}
        />
      </g>
    </Blueprint>
  )
}

const BTN = {
  w: 120,
  h: 44,
  padX: 16,
  r: 6,
  font: 13,
  focusGap: 4,
  touchSize: 44,
} as const

const AN = { x: 140, y: 60 } as const
const AN_MID_X = AN.x + BTN.w / 2
const AN_MID_Y = AN.y + BTN.h / 2

function RootShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('root')

  return (
    <path
      d={squirclePillPath(AN.x, AN.y, BTN.w, BTN.h)}
      stroke="currentColor"
      strokeWidth={hovered === 'root' ? 2 : blueprintTheme.wireframe.strokeWidth}
      fill={hovered === 'root' ? 'currentColor' : 'transparent'}
      fillOpacity={hovered === 'root' ? 0.1 : 0}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ ...spotlight.style, pointerEvents: 'all' }}
      onMouseEnter={() => setHovered('root')}
      onMouseLeave={() => setHovered(null)}
    />
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
      <rect x={AN.x + 24} y={AN.y + 10} width={72} height={24} fill="transparent" />
      <text
        x={AN_MID_X}
        y={AN_MID_Y + 4.5}
        textAnchor="middle"
        fontSize={BTN.font}
        fontWeight={500}
        fontFamily="var(--font-sans)"
        className={`fill-current ${spotlight.className}`}
      >
        Click me
      </text>
    </g>
  )
}

function FocusRingShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('focus-ring')
  const gap = BTN.focusGap

  return (
    <g
      onMouseEnter={() => setHovered('focus-ring')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect
        x={AN.x - gap - 3}
        y={AN.y - gap - 3}
        width={BTN.w + (gap + 3) * 2}
        height={BTN.h + (gap + 3) * 2}
        fill="transparent"
      />
      <rect
        x={AN.x - gap}
        y={AN.y - gap}
        width={BTN.w + gap * 2}
        height={BTN.h + gap * 2}
        rx={BTN.r + gap}
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={hovered === 'focus-ring' ? 2 : 1.5}
        strokeDasharray="4 3"
        fill="none"
        opacity={hovered === 'focus-ring' ? 1 : 0.6}
        className={spotlight.className}
      />
    </g>
  )
}

function TouchTargetShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('touch-target', { isInteraction: true })
  const offset = (BTN.touchSize - BTN.h) / 2

  return (
    <g
      onMouseEnter={() => setHovered('touch-target')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect
        x={AN.x - offset - 4}
        y={AN.y - offset - 4}
        width={BTN.w + (offset + 4) * 2}
        height={BTN.h + (offset + 4) * 2}
        fill="transparent"
      />
      <rect
        x={AN.x - offset}
        y={AN.y - offset}
        width={BTN.w + offset * 2}
        height={BTN.touchSize}
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={hovered === 'touch-target' ? 1.5 : blueprintTheme.guide.strokeWidth}
        strokeDasharray="3 2"
        fill="none"
        opacity={hovered === 'touch-target' ? 0.9 : 0.35}
        className={spotlight.className}
      />
    </g>
  )
}

function AnnotationsLayer() {
  const { hovered } = useAnatomy()
  const isOthersHovered = hovered !== null

  return (
    <g
      style={{
        pointerEvents: 'none',
        filter: isOthersHovered ? 'url(#spotlight-blur)' : 'none',
      }}
      className={`transition-[opacity,filter] duration-(--motion-dur-base) ease-(--motion-ease-in-out) motion-reduce:transition-none motion-reduce:filter-none ${isOthersHovered ? 'opacity-30' : 'opacity-100'}`}
    >
      <PadGuide
        x={AN.x + BTN.padX}
        y={AN.y + 10}
        w={BTN.w - BTN.padX * 2}
        h={BTN.h - 20}
        offset={0.8}
        boxX={AN.x}
        boxY={AN.y}
        boxW={BTN.w}
        boxH={BTN.h}
        boxRx={BTN.r}
        clipOffset={0.8}
      />
      <DimLabel x={AN.x + BTN.padX / 2} y={AN_MID_Y + 2} anchor="middle">
        16
      </DimLabel>
      <DimLabel x={AN.x + BTN.w - BTN.padX / 2} y={AN_MID_Y + 2} anchor="middle">
        16
      </DimLabel>

      <Selection x={AN.x} y={AN.y} w={BTN.w} h={BTN.h} />
      <DimH x1={AN.x} x2={AN.x + BTN.w} y={AN.y - 18} label={`${BTN.w}`} />
      <DimV
        x={AN.x - 18}
        y1={AN.y}
        y2={AN.y + BTN.h}
        label={`${BTN.h}`}
        labelXOffset={-6}
        labelAnchor="end"
      />
      <DimLabel x={AN.x} y={AN.y - 8} anchor="start">
        {`r${BTN.r}`}
      </DimLabel>
    </g>
  )
}

function LinesLayer() {
  return (
    <g strokeWidth="1" className="pointer-events-none">
      <OverlayLine id="root" x1={AN.x + BTN.w} y1={AN_MID_Y} x2={310} y2={AN_MID_Y} />
      <OverlayLine id="label" x1={AN_MID_X} y1={AN.y + 6} x2={AN_MID_X} y2={24} />
      <OverlayLine id="focus-ring" x1={AN.x - BTN.focusGap} y1={AN_MID_Y} x2={20} y2={AN_MID_Y} />
      <OverlayLine id="touch-target" x1={AN_MID_X} y1={AN.y + BTN.h + 2} x2={AN_MID_X} y2={140} />
    </g>
  )
}

function TagsLayer() {
  return (
    <>
      <foreignObject
        x={308}
        y={AN_MID_Y - 12}
        width={120}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part="root"
          label="Button.Root"
          className="items-center justify-start"
          isAccent
        />
      </foreignObject>
      <foreignObject
        x={AN_MID_X - 44}
        y={4}
        width={100}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="label" label="Button.Label" className="items-end justify-center" />
      </foreignObject>
      <foreignObject
        x={-10}
        y={AN_MID_Y - 12}
        width={120}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part="focus-ring"
          label="Button.FocusRing"
          className="items-center justify-end"
        />
      </foreignObject>
      <foreignObject
        x={AN_MID_X - 60}
        y={142}
        width={130}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part="touch-target"
          label="Button.TouchTarget"
          className="items-start justify-center"
        />
      </foreignObject>
    </>
  )
}

export function ButtonDiagram() {
  return (
    <AnatomyFrame viewBox="-20 -4 470 180" maxWidthClassName="max-w-lg">
      <TouchTargetShape />
      <FocusRingShape />
      <RootShape />
      <LabelShape />
      <AnnotationsLayer />
      <LinesLayer />
      <TagsLayer />
    </AnatomyFrame>
  )
}

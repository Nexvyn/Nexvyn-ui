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
  Blueprint,
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

const TABS = {
  pad: 4,
  gap: 2,
  itemW: 60,
  itemH: 28,
  itemPad: { x: 12, y: 6 },
  radiusContainer: 6,
  radiusItem: 4,
} as const

const LABELS = ['Overview', 'Activity', 'Settings']

const CONTAINER_W = TABS.pad * 2 + TABS.itemW * 3 + TABS.gap * 2
const CONTAINER_H = TABS.pad * 2 + TABS.itemH

const ITEM_X = [
  TABS.pad,
  TABS.pad + TABS.itemW + TABS.gap,
  TABS.pad + (TABS.itemW + TABS.gap) * 2,
] as const

const BP_X = (220 - CONTAINER_W) / 2
const BP_Y = (140 - CONTAINER_H) / 2

const PILL_MORPH_CLASS =
  `${BP_MORPH} transition-transform duration-(--motion-dur-showcase) ease-(--motion-ease-in-out) ` +
  'fill-transparent stroke-current group-hover:fill-(--color-bg) group-hover:stroke-transparent ' +
  'group-focus-visible:fill-(--color-bg) group-focus-visible:stroke-transparent ' +
  'group-hover:translate-x-[62px] group-focus-visible:translate-x-[62px] ' +
  'motion-reduce:transition-none motion-reduce:transform-none'

export function TabsSubtleBlueprint() {
  const theme = blueprintTheme
  return (
    <Blueprint>
      <g transform={`translate(${BP_X}, ${BP_Y})`}>
        <rect
          x={0}
          y={0}
          width={CONTAINER_W}
          height={CONTAINER_H}
          rx={TABS.radiusContainer}
          strokeWidth={theme.wireframe.strokeWidth}
          strokeOpacity={theme.wireframe.strokeOpacity}
          className="fill-(--color-surface-2) stroke-current"
        />
        <rect
          x={ITEM_X[0]}
          y={TABS.pad}
          width={TABS.itemW}
          height={TABS.itemH}
          rx={TABS.radiusItem}
          strokeWidth={theme.wireframe.strokeWidth}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          className={PILL_MORPH_CLASS}
        />
        {LABELS.map((label, i) => {
          const isFirst = i === 0
          const textClass = isFirst
            ? `${BP_MORPH} fill-current opacity-100 group-hover:opacity-60 group-focus-visible:opacity-60`
            : BP_TEXT_SOFT
          return (
            <text
              key={label}
              x={ITEM_X[i] + TABS.itemW / 2}
              y={TABS.pad + TABS.itemH / 2 + 3}
              textAnchor="middle"
              fontSize={9}
              fontWeight={500}
              fontFamily="var(--font-sans)"
              className={textClass}
            >
              {label}
            </text>
          )
        })}
      </g>
      <g className={BP_HIDE_ON_MORPH}>
        <Selection x={BP_X} y={BP_Y} w={CONTAINER_W} h={CONTAINER_H} />
        <DimH x1={BP_X} x2={BP_X + CONTAINER_W} y={BP_Y - 14} label={`${CONTAINER_W}`} />
        <DimV x={BP_X - 12} y1={BP_Y} y2={BP_Y + CONTAINER_H} label={`${CONTAINER_H}`} />
        <PadGuide
          x={BP_X + TABS.pad}
          y={BP_Y + TABS.pad}
          w={CONTAINER_W - TABS.pad * 2}
          h={CONTAINER_H - TABS.pad * 2}
          offset={0.8}
          boxX={BP_X}
          boxY={BP_Y}
          boxW={CONTAINER_W}
          boxH={CONTAINER_H}
          boxRx={TABS.radiusContainer}
          clipOffset={0.8}
        />
        <DimLabel x={BP_X + TABS.pad} y={BP_Y - 4} anchor="start">
          {`${TABS.pad}`}
        </DimLabel>
        <PadGuide
          x={BP_X + ITEM_X[0] + TABS.itemPad.x}
          y={BP_Y + TABS.pad + TABS.itemPad.y}
          w={TABS.itemW - TABS.itemPad.x * 2}
          h={TABS.itemH - TABS.itemPad.y * 2}
          offset={0.8}
          boxX={BP_X + ITEM_X[0]}
          boxY={BP_Y + TABS.pad}
          boxW={TABS.itemW}
          boxH={TABS.itemH}
          boxRx={TABS.radiusItem}
          clipOffset={0.8}
        />
        <DimLabel x={BP_X + ITEM_X[0] + TABS.itemPad.x} y={BP_Y + CONTAINER_H + 12} anchor="start">
          {`${TABS.itemPad.x}`}
        </DimLabel>
        <g
          stroke="var(--bp-accent, var(--color-accent))"
          strokeWidth={theme.guide.strokeWidth}
          strokeDasharray="2 2"
          opacity={theme.guide.structOpacity}
        >
          <line
            x1={BP_X + ITEM_X[0] + TABS.itemW}
            y1={BP_Y + TABS.pad + TABS.itemH + 2}
            x2={BP_X + ITEM_X[0] + TABS.itemW}
            y2={BP_Y + TABS.pad + TABS.itemH + 7}
          />
          <line
            x1={BP_X + ITEM_X[1]}
            y1={BP_Y + TABS.pad + TABS.itemH + 2}
            x2={BP_X + ITEM_X[1]}
            y2={BP_Y + TABS.pad + TABS.itemH + 7}
          />
          <line
            x1={BP_X + ITEM_X[0] + TABS.itemW}
            y1={BP_Y + TABS.pad + TABS.itemH + 4.5}
            x2={BP_X + ITEM_X[1]}
            y2={BP_Y + TABS.pad + TABS.itemH + 4.5}
          />
        </g>
        <DimLabel
          x={BP_X + ITEM_X[0] + TABS.itemW + TABS.gap / 2}
          y={BP_Y + TABS.pad + TABS.itemH + 18}
          anchor="middle"
        >
          {`${TABS.gap}`}
        </DimLabel>
      </g>
    </Blueprint>
  )
}

const TX = 70
const TY = 56

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
        x={0}
        y={0}
        width={CONTAINER_W}
        height={CONTAINER_H}
        rx={TABS.radiusContainer}
        fill="currentColor"
        fillOpacity={0.08}
        className={spotlight.className}
        style={spotlight.style}
      />
    </g>
  )
}

function PillShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('pill')
  return (
    <g
      onMouseEnter={() => setHovered('pill')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={ITEM_X[0]}
        y={TABS.pad}
        width={TABS.itemW}
        height={TABS.itemH}
        rx={TABS.radiusItem}
        fill="currentColor"
        fillOpacity={0.9}
        className={spotlight.className}
        style={spotlight.style}
      />
      <text
        x={ITEM_X[0] + TABS.itemW / 2}
        y={TABS.pad + TABS.itemH / 2 + 3}
        textAnchor="middle"
        fontSize={10}
        fontWeight={500}
        fontFamily="var(--font-sans)"
        className="fill-(--color-bg)"
      >
        {LABELS[0]}
      </text>
    </g>
  )
}

function ItemShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('item')
  return (
    <g
      onMouseEnter={() => setHovered('item')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect x={ITEM_X[2]} y={TABS.pad} width={TABS.itemW} height={TABS.itemH} fill="transparent" />
      <text
        x={ITEM_X[2] + TABS.itemW / 2}
        y={TABS.pad + TABS.itemH / 2 + 3}
        textAnchor="middle"
        fontSize={10}
        fontWeight={500}
        fontFamily="var(--font-sans)"
        className={`fill-current ${spotlight.className}`}
      >
        {LABELS[2]}
      </text>
    </g>
  )
}

function AnnotationsLayer() {
  const { hovered } = useAnatomy()
  const dimmed = hovered !== null
  return (
    <g
      style={{ pointerEvents: 'none', filter: dimmed ? 'url(#spotlight-blur)' : 'none' }}
      className={`transition-all duration-200 ease-out ${dimmed ? 'opacity-30' : 'opacity-100'}`}
    >
      <Selection x={0} y={0} w={CONTAINER_W} h={CONTAINER_H} />
      <DimH x1={0} x2={CONTAINER_W} y={-14} label={`${CONTAINER_W}`} />
      <DimV x={-12} y1={0} y2={CONTAINER_H} label={`${CONTAINER_H}`} labelXOffset={-6} />
      <PadGuide
        x={TABS.pad}
        y={TABS.pad}
        w={CONTAINER_W - TABS.pad * 2}
        h={CONTAINER_H - TABS.pad * 2}
        offset={0.8}
        boxX={0}
        boxY={0}
        boxW={CONTAINER_W}
        boxH={CONTAINER_H}
        boxRx={TABS.radiusContainer}
        clipOffset={0.8}
      />
      <DimLabel x={TABS.pad} y={-4} anchor="start">
        {`${TABS.pad}`}
      </DimLabel>
      <PadGuide
        x={ITEM_X[0] + TABS.itemPad.x}
        y={TABS.pad + TABS.itemPad.y}
        w={TABS.itemW - TABS.itemPad.x * 2}
        h={TABS.itemH - TABS.itemPad.y * 2}
        offset={0.8}
        boxX={ITEM_X[0]}
        boxY={TABS.pad}
        boxW={TABS.itemW}
        boxH={TABS.itemH}
        boxRx={TABS.radiusItem}
        clipOffset={0.8}
      />
      <DimLabel x={ITEM_X[0] + TABS.itemPad.x} y={CONTAINER_H + 12} anchor="start">
        {`${TABS.itemPad.x}`}
      </DimLabel>
      <g
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={blueprintTheme.guide.strokeWidth}
        strokeDasharray="2 2"
        opacity={blueprintTheme.guide.structOpacity}
      >
        <line
          x1={ITEM_X[0] + TABS.itemW}
          y1={TABS.pad + TABS.itemH + 2}
          x2={ITEM_X[0] + TABS.itemW}
          y2={TABS.pad + TABS.itemH + 7}
        />
        <line
          x1={ITEM_X[1]}
          y1={TABS.pad + TABS.itemH + 2}
          x2={ITEM_X[1]}
          y2={TABS.pad + TABS.itemH + 7}
        />
        <line
          x1={ITEM_X[0] + TABS.itemW}
          y1={TABS.pad + TABS.itemH + 4.5}
          x2={ITEM_X[1]}
          y2={TABS.pad + TABS.itemH + 4.5}
        />
      </g>
      <DimLabel
        x={ITEM_X[0] + TABS.itemW + TABS.gap / 2}
        y={TABS.pad + TABS.itemH + 18}
        anchor="middle"
      >
        {`${TABS.gap}`}
      </DimLabel>
    </g>
  )
}

function OverlayLines() {
  const containerMidX = TX + CONTAINER_W / 2
  const pillMidX = TX + ITEM_X[0] + TABS.itemW / 2
  const pillBottomY = TY + TABS.pad + TABS.itemH
  const itemRightX = TX + ITEM_X[2] + TABS.itemW
  const itemMidY = TY + TABS.pad + TABS.itemH / 2
  return (
    <g strokeWidth="1" className="pointer-events-none">
      <OverlayLine id="container" x1={containerMidX} y1={TY} x2={containerMidX} y2={TY - 40} />
      <OverlayLine id="pill" x1={pillMidX} y1={pillBottomY} x2={pillMidX} y2={pillBottomY + 36} />
      <OverlayLine id="item" x1={itemRightX} y1={itemMidY} x2={itemRightX + 36} y2={itemMidY} />
    </g>
  )
}

function Tags() {
  const containerMidX = TX + CONTAINER_W / 2
  const pillMidX = TX + ITEM_X[0] + TABS.itemW / 2
  const pillBottomY = TY + TABS.pad + TABS.itemH
  const itemRightX = TX + ITEM_X[2] + TABS.itemW
  const itemMidY = TY + TABS.pad + TABS.itemH / 2
  return (
    <>
      <foreignObject
        x={containerMidX - 45}
        y={TY - 40 - 24}
        width={90}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part="container"
          label="Container"
          className="items-end justify-center"
          isAccent
        />
      </foreignObject>
      <foreignObject
        x={pillMidX - 45}
        y={pillBottomY + 36}
        width={90}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="pill" label="Selected pill" className="items-start justify-center" />
      </foreignObject>
      <foreignObject
        x={itemRightX + 36}
        y={itemMidY - 12}
        width={90}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="item" label="Item" className="items-center justify-start" />
      </foreignObject>
    </>
  )
}

export function TabsSubtleAnatomy() {
  return (
    <AnatomyFrame viewBox="43 -24 377 188" maxWidthClassName="max-w-[452px]">
      <g transform={`translate(${TX}, ${TY})`}>
        <ContainerShape />
        <PillShape />
        <ItemShape />
        <AnnotationsLayer />
      </g>
      <OverlayLines />
      <Tags />
    </AnatomyFrame>
  )
}

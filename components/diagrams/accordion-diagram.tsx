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
  BP_FILL_PANEL,
  BP_HIDE_ON_MORPH,
  BP_TEXT_SOFT,
  blueprintTheme,
  DimH,
  DimV,
  PadGuide,
  Selection,
} from '@/components/diagrams/lib/parts'

const BP_ITEM_W = 172
const BP_TRIGGER_H = 26
const BP_CONTENT_H = 24
const BP_ITEM_GAP = 8
const BP_ITEM_R = 6
const BP_CHEVRON = 8
const BP_PAD_X = 16
const BP_CONTENT_PAD_B = 6
const BP_X = (220 - BP_ITEM_W) / 2

const BP_ITEM0_H = BP_TRIGGER_H + BP_CONTENT_H
const BP_Y = (140 - (BP_ITEM0_H + 2 * BP_ITEM_GAP + 2 * BP_TRIGGER_H)) / 2
const BP_ITEM1_Y = BP_Y + BP_ITEM0_H + BP_ITEM_GAP
const BP_ITEM2_Y = BP_ITEM1_Y + BP_TRIGGER_H + BP_ITEM_GAP

function rowY(i: number) {
  return i === 0 ? BP_Y : i === 1 ? BP_ITEM1_Y : BP_ITEM2_Y
}

function TriggerRow({
  y,
  label,
  chevronRotated,
}: {
  y: number
  label: string
  chevronRotated: boolean
}) {
  const midY = y + BP_TRIGGER_H / 2
  return (
    <>
      <text
        x={BP_X + BP_PAD_X}
        y={midY + 4}
        fontSize={12}
        fontWeight={500}
        fontFamily="var(--font-sans)"
        className={BP_TEXT_SOFT}
      >
        {label}
      </text>
      <path
        d={`M${BP_X + BP_ITEM_W - BP_PAD_X - BP_CHEVRON} ${midY - BP_CHEVRON / 3} L${BP_X + BP_ITEM_W - BP_PAD_X - BP_CHEVRON / 2} ${midY + BP_CHEVRON / 3} L${BP_X + BP_ITEM_W - BP_PAD_X} ${midY - BP_CHEVRON / 3}`}
        fill="none"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${BP_TEXT_SOFT} origin-center transition-[fill,stroke,fill-opacity,stroke-opacity,opacity,transform] motion-reduce:transform-none ${chevronRotated ? 'rotate-180' : ''}`}
        style={{ transformBox: 'fill-box' }}
      />
    </>
  )
}

export function AccordionBlueprint() {
  const theme = blueprintTheme
  const contentY = BP_Y + BP_TRIGGER_H

  return (
    <Blueprint>
      <rect
        x={BP_X}
        y={BP_Y}
        width={BP_ITEM_W}
        height={BP_ITEM0_H}
        rx={BP_ITEM_R}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        className={`${BP_FILL_PANEL} supports-[corner-shape:squircle]:corner-squircle`}
      />
      <TriggerRow y={BP_Y} label="Section title" chevronRotated={false} />
      <line
        x1={BP_X + BP_PAD_X}
        y1={contentY + BP_CONTENT_H / 2 - 4}
        x2={BP_X + BP_ITEM_W - BP_PAD_X}
        y2={contentY + BP_CONTENT_H / 2 - 4}
        strokeWidth={1.25}
        strokeLinecap="round"
        className={BP_TEXT_SOFT}
      />
      <line
        x1={BP_X + BP_PAD_X}
        y1={contentY + BP_CONTENT_H / 2 + 4}
        x2={BP_X + BP_ITEM_W * 0.65}
        y2={contentY + BP_CONTENT_H / 2 + 4}
        strokeWidth={1.25}
        strokeLinecap="round"
        className={BP_TEXT_SOFT}
      />

      {[1, 2].map((i) => (
        <g key={i}>
          <rect
            x={BP_X}
            y={rowY(i)}
            width={BP_ITEM_W}
            height={BP_TRIGGER_H}
            rx={BP_ITEM_R}
            strokeWidth={theme.wireframe.strokeWidth}
            strokeOpacity={theme.wireframe.strokeOpacity}
            className={`${BP_FILL_PANEL} supports-[corner-shape:squircle]:corner-squircle`}
          />
          <TriggerRow
            y={rowY(i)}
            label={i === 1 ? 'Another section' : 'Third section'}
            chevronRotated={false}
          />
        </g>
      ))}

      <g className={BP_HIDE_ON_MORPH}>
        <PadGuide
          x={BP_X + BP_PAD_X}
          y={BP_Y}
          w={BP_ITEM_W - BP_PAD_X * 2}
          h={BP_TRIGGER_H}
          offset={0.8}
          boxX={BP_X}
          boxY={BP_Y}
          boxW={BP_ITEM_W}
          boxH={BP_TRIGGER_H}
          boxRx={BP_ITEM_R}
          clipOffset={0.8}
        />
        <PadGuide
          x={BP_X + BP_PAD_X}
          y={contentY}
          w={BP_ITEM_W - BP_PAD_X * 2}
          h={BP_CONTENT_H - BP_CONTENT_PAD_B}
          offset={0.8}
          boxX={BP_X}
          boxY={contentY}
          boxW={BP_ITEM_W}
          boxH={BP_CONTENT_H}
          boxRx={0}
          clipOffset={0.8}
        />
        <DimH x1={BP_X} x2={BP_X + BP_ITEM_W} y={BP_Y - 10} label={`${BP_ITEM_W}`} />
        <DimV
          x={BP_X - 10}
          y1={BP_ITEM1_Y}
          y2={BP_ITEM2_Y}
          label={`${BP_ITEM_GAP}`}
          labelXOffset={-6}
        />
      </g>
    </Blueprint>
  )
}

const ITEM_W = 200
const ITEM_H = 38
const CONTENT_H = 44
const ITEM_GAP = 8
const ITEM_R = 6
const CHEVRON_SIZE = 10
const PAD_X = 16

const TX = 40
const TY = 30

const ITEM0_Y = 0
const ITEM1_Y = ITEM_H + CONTENT_H + ITEM_GAP
const ITEM2_Y = ITEM1_Y + ITEM_H + ITEM_GAP
const TOTAL_H = ITEM2_Y + ITEM_H

function itemY(index: number) {
  return index === 0 ? ITEM0_Y : index === 1 ? ITEM1_Y : ITEM2_Y
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
        x={-4}
        y={-4}
        width={ITEM_W + 8}
        height={TOTAL_H + 8}
        rx={ITEM_R + 2}
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

function ItemShape({ index, isExpanded }: { index: number; isExpanded: boolean }) {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('item')

  const yOffset = itemY(index)
  const itemH = isExpanded ? ITEM_H + CONTENT_H : ITEM_H

  return (
    <g
      onMouseEnter={() => setHovered('item')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={0}
        y={yOffset}
        width={ITEM_W}
        height={itemH}
        rx={ITEM_R}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.25}
        strokeOpacity={0.6}
        className={spotlight.className}
        style={spotlight.style}
      />
    </g>
  )
}

function TriggerShape({ index }: { index: number }) {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('trigger')

  const yOffset = itemY(index)

  return (
    <g
      onMouseEnter={() => setHovered('trigger')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={1}
        y={yOffset + 1}
        width={ITEM_W - 2}
        height={ITEM_H - 2}
        rx={ITEM_R - 1}
        fill="currentColor"
        fillOpacity={0.05}
        className={spotlight.className}
        style={spotlight.style}
      />
      <text
        x={PAD_X}
        y={yOffset + ITEM_H / 2 + 4}
        fontSize={11}
        fontFamily="var(--font-sans)"
        fontWeight={500}
        className={`fill-current ${spotlight.className}`}
        style={spotlight.style}
      >
        {index === 0 ? 'Section title' : index === 1 ? 'Another section' : 'Third section'}
      </text>
    </g>
  )
}

function ChevronShape({ index, isExpanded }: { index: number; isExpanded: boolean }) {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('chevron')

  const yOffset = itemY(index)

  const cx = ITEM_W - PAD_X - CHEVRON_SIZE / 2
  const cy = yOffset + ITEM_H / 2

  return (
    <g
      onMouseEnter={() => setHovered('chevron')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
      transform={isExpanded ? `rotate(180, ${cx}, ${cy})` : undefined}
    >
      <circle cx={cx} cy={cy} r={8} fill="transparent" />
      <polyline
        points={`${cx - 4},${cy - 2} ${cx},${cy + 2} ${cx + 4},${cy - 2}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={spotlight.className}
        style={spotlight.style}
      />
    </g>
  )
}

function ContentShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('content')

  const yOffset = ITEM_H
  const textX = PAD_X
  const lineGap = 10

  return (
    <g
      onMouseEnter={() => setHovered('content')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect x={0} y={yOffset} width={ITEM_W} height={CONTENT_H} fill="transparent" />
      <line
        x1={textX}
        y1={yOffset + 12}
        x2={ITEM_W - PAD_X - 16}
        y2={yOffset + 12}
        stroke="currentColor"
        strokeWidth={1.5}
        strokeOpacity={0.3}
        strokeLinecap="round"
        className={spotlight.className}
        style={spotlight.style}
      />
      <line
        x1={textX}
        y1={yOffset + 12 + lineGap}
        x2={ITEM_W - PAD_X - 36}
        y2={yOffset + 12 + lineGap}
        stroke="currentColor"
        strokeWidth={1.5}
        strokeOpacity={0.3}
        strokeLinecap="round"
        className={spotlight.className}
        style={spotlight.style}
      />
    </g>
  )
}

function HeadingShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('heading')

  return (
    <g
      onMouseEnter={() => setHovered('heading')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all' }}
    >
      <rect
        x={-2}
        y={-2}
        width={ITEM_W + 4}
        height={ITEM_H + 4}
        rx={ITEM_R + 1}
        fill="none"
        stroke="currentColor"
        strokeWidth={0.75}
        strokeOpacity={0.35}
        strokeDasharray="4 2"
        className={spotlight.className}
        style={spotlight.style}
      />
      <text
        x={-6}
        y={ITEM_H / 2 + 3}
        fontSize={8}
        fontFamily="var(--font-mono)"
        textAnchor="end"
        className={`fill-current opacity-50 ${spotlight.className}`}
        style={spotlight.style}
      >
        h3
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
      className={`transition-[opacity,filter] duration-(--motion-dur-base) ease-(--motion-ease-in-out) motion-reduce:transition-none motion-reduce:filter-none ${dimmed ? 'opacity-30' : 'opacity-100'}`}
    >
      <Selection x={0} y={0} w={ITEM_W} h={ITEM_H} />
      <PadGuide
        x={PAD_X}
        y={0}
        w={ITEM_W - PAD_X * 2}
        h={ITEM_H}
        offset={0.8}
        boxX={0}
        boxY={0}
        boxW={ITEM_W}
        boxH={ITEM_H}
        boxRx={ITEM_R}
        clipOffset={0.8}
      />
      <DimH x1={0} x2={PAD_X} y={ITEM_H + 14} label={`${PAD_X}`} />
      <DimV x={-14} y1={0} y2={ITEM_H} label={`${ITEM_H}`} labelXOffset={-6} />

      <PadGuide
        x={PAD_X}
        y={ITEM_H}
        w={ITEM_W - PAD_X * 2}
        h={CONTENT_H - 12}
        offset={0.8}
        boxX={0}
        boxY={ITEM_H}
        boxW={ITEM_W}
        boxH={CONTENT_H}
        boxRx={0}
        clipOffset={0.8}
      />
      <DimV
        x={ITEM_W + 14}
        y1={ITEM_H + CONTENT_H - 12}
        y2={ITEM_H + CONTENT_H}
        label="12"
        labelXOffset={6}
        labelAnchor="start"
      />

      <DimV x={-14} y1={ITEM1_Y} y2={ITEM2_Y} label={`${ITEM_GAP}`} labelXOffset={-6} />
    </g>
  )
}

function OverlayLines() {
  const containerX = TX - 4
  const containerMidY = TY + TOTAL_H / 2

  const itemX = TX + ITEM_W + 4
  const itemMidY = TY + (ITEM_H + CONTENT_H) / 2

  const triggerMidX = TX + ITEM_W / 2
  const triggerY = TY

  const chevronX = TX + ITEM_W - PAD_X - CHEVRON_SIZE / 2
  const chevronY = TY + ITEM_H / 2

  const contentMidX = TX + ITEM_W / 2
  const contentY = TY + ITEM_H + CONTENT_H

  const headingX = TX - 2
  const headingY = TY - 2

  return (
    <g strokeWidth="1" className="pointer-events-none">
      <OverlayLine
        id="container"
        x1={containerX}
        y1={containerMidY}
        x2={containerX - 30}
        y2={containerMidY}
      />
      <OverlayLine id="item" x1={itemX} y1={itemMidY} x2={itemX + 30} y2={itemMidY} />
      <OverlayLine
        id="trigger"
        x1={triggerMidX}
        y1={triggerY}
        x2={triggerMidX}
        y2={triggerY - 30}
      />
      <OverlayLine id="chevron" x1={chevronX} y1={chevronY} x2={chevronX + 30} y2={chevronY - 20} />
      <OverlayLine
        id="content"
        x1={contentMidX}
        y1={contentY}
        x2={contentMidX}
        y2={contentY + 30}
      />
      <OverlayLine id="heading" x1={headingX} y1={headingY} x2={headingX - 20} y2={headingY - 20} />
    </g>
  )
}

function Tags() {
  const containerX = TX - 4
  const containerMidY = TY + TOTAL_H / 2
  const itemX = TX + ITEM_W + 4
  const itemMidY = TY + (ITEM_H + CONTENT_H) / 2
  const triggerMidX = TX + ITEM_W / 2
  const triggerY = TY
  const chevronX = TX + ITEM_W - PAD_X - CHEVRON_SIZE / 2
  const chevronY = TY + ITEM_H / 2
  const contentMidX = TX + ITEM_W / 2
  const contentY = TY + ITEM_H + CONTENT_H
  const headingX = TX - 2
  const headingY = TY - 2

  return (
    <>
      <foreignObject
        x={containerX - 30 - 70}
        y={containerMidY - 12}
        width={70}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part="container"
          label="Container"
          className="items-center justify-end"
          isAccent
        />
      </foreignObject>

      <foreignObject
        x={itemX + 30}
        y={itemMidY - 12}
        width={60}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="item" label="Item" className="items-center justify-start" />
      </foreignObject>

      <foreignObject
        x={triggerMidX - 35}
        y={triggerY - 30 - 24}
        width={70}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="trigger" label="Trigger" className="items-end justify-center" isAccent />
      </foreignObject>

      <foreignObject
        x={chevronX + 30}
        y={chevronY - 20 - 12}
        width={70}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="chevron" label="Chevron" className="items-end justify-start" />
      </foreignObject>

      <foreignObject
        x={contentMidX - 40}
        y={contentY + 30}
        width={80}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="content" label="Content" className="items-start justify-center" />
      </foreignObject>

      <foreignObject
        x={headingX - 20 - 70}
        y={headingY - 20 - 12}
        width={70}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="heading" label="Heading" className="items-end justify-end" />
      </foreignObject>
    </>
  )
}

export function AccordionAnatomy() {
  return (
    <AnatomyFrame viewBox="-78 -38 426 260" maxWidthClassName="max-w-[500px]">
      <g transform={`translate(${TX}, ${TY})`}>
        <ContainerShape />
        <ItemShape index={0} isExpanded />
        <HeadingShape />
        <TriggerShape index={0} />
        <ChevronShape index={0} isExpanded />
        <ContentShape />
        <ItemShape index={1} isExpanded={false} />
        <TriggerShape index={1} />
        <ChevronShape index={1} isExpanded={false} />
        <ItemShape index={2} isExpanded={false} />
        <TriggerShape index={2} />
        <ChevronShape index={2} isExpanded={false} />
        <AnnotationsLayer />
      </g>
      <OverlayLines />
      <Tags />
    </AnatomyFrame>
  )
}

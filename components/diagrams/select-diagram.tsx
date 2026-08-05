'use client'

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
  y: 14,
  w: 160,
  triggerH: 40,
  triggerRx: 6,
  triggerPadX: 16,
  triggerPadY: 11,
  gap: 6,
  panelPad: 6,
  itemH: 22,
  itemRx: 4,
} as const

const BP_PANEL_Y = BP.y + BP.triggerH + BP.gap
const BP_PANEL_H = BP.panelPad * 2 + 3 * BP.itemH
const BP_ITEMS = ['Small', 'Medium', 'Large'] as const

function bpItemY(i: number) {
  return BP_PANEL_Y + BP.panelPad + i * BP.itemH
}

export function SelectBlueprint() {
  const theme = blueprintTheme
  return (
    <Blueprint>
      <rect
        x={BP.x}
        y={BP.y}
        width={BP.w}
        height={BP.triggerH}
        rx={BP.triggerRx}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        className={BP_FILL_PANEL}
      />
      <text
        x={BP.x + BP.triggerPadX}
        y={BP.y + BP.triggerH / 2 + 4}
        fontSize={13}
        fontWeight={500}
        fontFamily="var(--font-sans)"
        className={BP_TEXT_SOFT}
      >
        Select...
      </text>

      <g
        style={{
          transformOrigin: `${BP.x + BP.w - BP.triggerPadX - 4}px ${BP.y + BP.triggerH / 2}px`,
        }}
        className="transition-transform duration-(--motion-dur-base) ease-(--motion-ease-in-out) group-hover:rotate-180 group-focus-visible:rotate-180 motion-reduce:transition-none motion-reduce:transform-none"
      >
        <path
          d={`M${BP.x + BP.w - BP.triggerPadX - 8} ${BP.y + BP.triggerH / 2 - 3} l4 4 4-4`}
          strokeWidth={1.5}
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`${BP_MORPH} opacity-55 group-hover:opacity-100 group-focus-visible:opacity-100`}
        />
      </g>
      <rect
        x={BP.x}
        y={BP_PANEL_Y}
        width={BP.w}
        height={BP_PANEL_H}
        rx={BP.triggerRx}
        strokeWidth={theme.wireframe.strokeWidth}
        className={`${BP_MORPH} fill-transparent stroke-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 group-hover:fill-popover group-focus-visible:fill-popover group-hover:stroke-(--color-border) group-focus-visible:stroke-(--color-border)`}
      />
      <g className="transition-transform duration-(--motion-dur-slow) ease-(--motion-ease-out) delay-0 group-hover:translate-y-5.5 group-focus-visible:translate-y-5.5 group-hover:delay-150 group-focus-visible:delay-150 motion-reduce:transition-none motion-reduce:transform-none">
        <rect
          x={BP.x + BP.panelPad}
          y={bpItemY(0)}
          width={BP.w - BP.panelPad * 2}
          height={BP.itemH}
          rx={BP.itemRx}
          fill="var(--bp-accent, var(--color-accent))"
          className={`${BP_MORPH} opacity-0 group-hover:opacity-15 group-focus-visible:opacity-15`}
        />
      </g>
      {BP_ITEMS.map((label, i) => (
        <text
          key={label}
          x={BP.x + BP.panelPad + 10}
          y={bpItemY(i) + BP.itemH / 2 + 4}
          fontSize={12}
          fontFamily="var(--font-sans)"
          className={`${BP_MORPH} fill-current opacity-40 group-hover:opacity-100 group-focus-visible:opacity-100`}
        >
          {label}
        </text>
      ))}

      <g className={BP_HIDE_ON_MORPH}>
        <rect
          x={BP.x}
          y={BP_PANEL_Y}
          width={BP.w}
          height={BP_PANEL_H}
          rx={BP.triggerRx}
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
          boxRx={BP.triggerRx}
          clipOffset={0.8}
        />
        <Selection x={BP.x} y={BP.y} w={BP.w} h={BP.triggerH} />
        <DimH x1={BP.x} x2={BP.x + BP.w} y={BP.y - 8} label={`${BP.w}`} />
        <DimV
          x={BP.x - 12}
          y1={BP.y}
          y2={BP.y + BP.triggerH}
          label={`${BP.triggerH}`}
          labelXOffset={-6}
        />
        <DimV
          x={BP.x - 12}
          y1={BP.y + BP.triggerH}
          y2={BP_PANEL_Y}
          label={`${BP.gap}`}
          labelXOffset={-6}
        />
        <DimLabel x={BP.x} y={BP.y - 4} anchor="start">
          {`r${BP.triggerRx}`}
        </DimLabel>

        <PadGuide
          x={BP.x + BP.triggerPadX}
          y={BP.y + BP.triggerPadY}
          w={BP.w - BP.triggerPadX * 2}
          h={BP.triggerH - BP.triggerPadY * 2}
          offset={0.8}
          boxX={BP.x}
          boxY={BP.y}
          boxW={BP.w}
          boxH={BP.triggerH}
          boxRx={BP.triggerRx}
          clipOffset={0.8}
        />

        <DimLabel x={BP.x + 7} y={BP.y + BP.triggerH - 4} anchor="middle">
          {`${BP.triggerPadX}`}
        </DimLabel>
        <DimLabel x={BP.x + BP.w - 7} y={BP.y + BP.triggerH - 4} anchor="middle">
          {`${BP.triggerPadX}`}
        </DimLabel>
        <DimLabel x={BP.x + BP.w / 2} y={BP.y + 6} anchor="middle">
          {`${BP.triggerPadY}`}
        </DimLabel>
        <DimLabel x={BP.x + BP.w / 2} y={BP.y + BP.triggerH - 2} anchor="middle">
          {`${BP.triggerPadY}`}
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
  triggerH: 36,
  triggerRx: 6,
  triggerPadX: 16,
  triggerPadY: 12,
  gap: 8,
  panelPad: 6,
  itemH: 32,
  itemRx: 4,
} as const

const AN_PANEL_Y = AN.y + AN.triggerH + AN.gap
const AN_PANEL_H = AN.panelPad * 2 + 3 * AN.itemH
const AN_ITEMS = ['Small', 'Medium', 'Large'] as const
const AN_SELECTED_INDEX = 1

function anItemY(i: number) {
  return AN_PANEL_Y + AN.panelPad + i * AN.itemH
}

function TriggerShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('trigger')

  return (
    <g
      onMouseEnter={() => setHovered('trigger')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect
        x={AN.x}
        y={AN.y}
        width={AN.w}
        height={AN.triggerH}
        rx={AN.triggerRx}
        stroke="currentColor"
        strokeWidth={hovered === 'trigger' ? 2 : 1.25}
        fill={hovered === 'trigger' ? 'currentColor' : 'transparent'}
        fillOpacity={hovered === 'trigger' ? 0.05 : 0}
        className={spotlight.className}
      />
      <text
        x={AN.x + 14}
        y={AN.y + AN.triggerH / 2 + 4}
        fontSize={13}
        fontFamily="var(--font-sans)"
        className={`fill-current pointer-events-none ${spotlight.className}`}
      >
        Select...
      </text>

      <path
        d={`M${AN.x + AN.w - AN.triggerPadX - 8} ${AN.y + AN.triggerH / 2 - 3} l4 4 4-4`}
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className={`pointer-events-none ${spotlight.className}`}
      />
    </g>
  )
}

function ContentShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('content')

  return (
    <rect
      x={AN.x}
      y={AN_PANEL_Y}
      width={AN.w}
      height={AN_PANEL_H}
      rx={AN.triggerRx}
      stroke="currentColor"
      strokeWidth={hovered === 'content' ? 2 : 1.25}
      fill={hovered === 'content' ? 'currentColor' : 'var(--color-bg)'}
      fillOpacity={hovered === 'content' ? 0.04 : 1}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ ...spotlight.style, pointerEvents: 'all' }}
      onMouseEnter={() => setHovered('content')}
      onMouseLeave={() => setHovered(null)}
    />
  )
}

function ItemShape({ index, label }: { index: number; label: string }) {
  const { hovered, setHovered } = useAnatomy()
  const partId = `item-${index}`
  const spotlight = useSpotlight(partId)
  const isSelected = index === AN_SELECTED_INDEX
  const y = anItemY(index)

  return (
    <g
      onMouseEnter={() => setHovered(partId)}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      {isSelected && (
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
        y={y + AN.itemH / 2 + 4}
        fontSize={13}
        fontFamily="var(--font-sans)"
        className={`fill-current pointer-events-none ${spotlight.className}`}
      >
        {label}
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
      <Selection x={AN.x} y={AN.y} w={AN.w} h={AN.triggerH} />
      <Selection x={AN.x} y={AN_PANEL_Y} w={AN.w} h={AN_PANEL_H} />
      <DimH x1={AN.x} x2={AN.x + AN.w} y={AN.y - 14} label={`${AN.w}`} />
      <DimV
        x={AN.x + AN.w + 14}
        y1={AN.y}
        y2={AN.y + AN.triggerH}
        label={`${AN.triggerH}`}
        labelXOffset={5}
        labelAnchor="start"
      />
      <DimLabel x={AN.x} y={AN.y - 4} anchor="start">
        {`r${AN.triggerRx}`}
      </DimLabel>
      <DimLabel x={AN.x} y={AN_PANEL_Y - 4} anchor="start">
        {`r${AN.triggerRx}`}
      </DimLabel>

      <PadGuide
        x={AN.x + AN.triggerPadX}
        y={AN.y + AN.triggerPadY}
        w={AN.w - AN.triggerPadX * 2}
        h={AN.triggerH - AN.triggerPadY * 2}
        offset={0.8}
        boxX={AN.x}
        boxY={AN.y}
        boxW={AN.w}
        boxH={AN.triggerH}
        boxRx={AN.triggerRx}
        clipOffset={0.8}
      />

      <DimLabel x={AN.x + 7} y={AN.y + AN.triggerH - 4} anchor="middle">
        {`${AN.triggerPadX}`}
      </DimLabel>
      <DimLabel x={AN.x + AN.w - 7} y={AN.y + AN.triggerH - 4} anchor="middle">
        {`${AN.triggerPadX}`}
      </DimLabel>
      <DimLabel x={AN.x + AN.w / 2} y={AN.y + 7} anchor="middle">
        {`${AN.triggerPadY}`}
      </DimLabel>
      <DimLabel x={AN.x + AN.w / 2} y={AN.y + AN.triggerH - 3} anchor="middle">
        {`${AN.triggerPadY}`}
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
        boxRx={AN.triggerRx}
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
  return (
    <g strokeWidth="1" className="pointer-events-none">
      <OverlayLine
        id="trigger"
        x1={rightEdge}
        y1={AN.y + AN.triggerH / 2}
        x2={tagX}
        y2={AN.y + AN.triggerH / 2}
      />
      <OverlayLine
        id="content"
        x1={rightEdge}
        y1={AN_PANEL_Y + AN_PANEL_H / 2}
        x2={tagX}
        y2={AN_PANEL_Y + AN_PANEL_H / 2}
      />
      <OverlayLine
        id={`item-${AN_SELECTED_INDEX}`}
        x1={AN.x + AN.w - AN.panelPad}
        y1={anItemY(AN_SELECTED_INDEX) + AN.itemH / 2}
        x2={tagX}
        y2={anItemY(AN_SELECTED_INDEX) + AN.itemH / 2 + 28}
      />
    </g>
  )
}

function TagsLayer() {
  const rightEdge = AN.x + AN.w
  const tagX = rightEdge + 30
  return (
    <>
      <foreignObject
        x={tagX}
        y={AN.y + AN.triggerH / 2 - 12}
        width={100}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part="trigger"
          label="Trigger"
          isAccent
          className="items-center justify-start"
        />
      </foreignObject>
      <foreignObject
        x={tagX}
        y={AN_PANEL_Y + AN_PANEL_H / 2 - 12}
        width={100}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="content" label="Content" className="items-center justify-start" />
      </foreignObject>
      <foreignObject
        x={tagX}
        y={anItemY(AN_SELECTED_INDEX) + AN.itemH / 2 + 16}
        width={110}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part={`item-${AN_SELECTED_INDEX}`}
          label="Item (selected)"
          className="items-center justify-start"
        />
      </foreignObject>
    </>
  )
}

export function SelectBreakdown() {
  return (
    <AnatomyFrame viewBox="-10 -10 350 220" maxWidthClassName="max-w-[440px]">
      <TriggerShape />
      <ContentShape />
      {AN_ITEMS.map((label, index) => (
        <ItemShape key={label} index={index} label={label} />
      ))}
      <AnnotationsLayer />
      <LinesLayer />
      <TagsLayer />
    </AnatomyFrame>
  )
}

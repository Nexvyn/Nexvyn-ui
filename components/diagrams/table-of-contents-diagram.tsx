'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset — licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root MIT LICENSE.

import {
  type BlueprintTheme,
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
import {
  AnatomyFrame,
  AnatomyTag,
  OverlayLine,
  useAnatomy,
  useSpotlight,
} from '@/components/diagrams/lib/anatomy-parts'

const BP_TRIGGER = { x: 20, y: 94, w: 180, h: 36, rx: 4 } as const
const BP_PANEL = { x: 20, y: 10, w: 180, h: 74, rx: 8 } as const
const BP_RING = { cx: 162, cy: 112, r: 6 } as const

export function TableOfContentsWireframe() {
  const theme = blueprintTheme
  return (
    <Blueprint>
      <g className={BP_HIDE_ON_MORPH}>
        <rect
          x={BP_PANEL.x}
          y={BP_PANEL.y}
          width={BP_PANEL.w}
          height={BP_PANEL.h}
          rx={BP_PANEL.rx}
          fill="none"
          stroke="currentColor"
          strokeWidth={theme.guide.strokeWidth}
          strokeDasharray="3 3"
          opacity={theme.guide.structOpacity}
        />
        <g fill="currentColor" opacity={theme.guide.structOpacity}>
          <rect x={28} y={22} width={156} height={18} rx={4} fillOpacity={0.5} />
          <rect x={28} y={44} width={156} height={18} rx={4} fillOpacity={0.3} />
        </g>
      </g>
      {/* Trigger fills to surface on morph (real floating TOC chip). */}
      <rect
        x={BP_TRIGGER.x}
        y={BP_TRIGGER.y}
        width={BP_TRIGGER.w}
        height={BP_TRIGGER.h}
        rx={BP_TRIGGER.rx}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        className={`${BP_MORPH} fill-transparent stroke-current group-hover:fill-muted group-focus-visible:fill-muted group-hover:stroke-border group-focus-visible:stroke-border`}
      />
      <text
        x={BP_TRIGGER.x + 24}
        y={BP_TRIGGER.y + 22}
        fontSize={11}
        fontWeight={600}
        fontFamily="var(--font-sans)"
        className={BP_TEXT_SOFT}
      >
        Getting Started
      </text>
      <line
        x1={145}
        y1={BP_TRIGGER.y + 8}
        x2={145}
        y2={BP_TRIGGER.y + 28}
        stroke="currentColor"
        strokeWidth={theme.guide.strokeWidth}
        opacity={theme.guide.dimOpacity}
      />
      <circle
        cx={BP_RING.cx}
        cy={BP_RING.cy}
        r={BP_RING.r}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        opacity={0.2}
      />
      <circle
        cx={BP_RING.cx}
        cy={BP_RING.cy}
        r={BP_RING.r}
        fill="none"
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={1.5}
        strokeDasharray={`${BP_RING.r * 2 * Math.PI * 0.6} ${BP_RING.r * 2 * Math.PI}`}
        strokeLinecap="round"
      />
      <path
        d={`M${178} ${BP_RING.cy - 3} L${182} ${BP_RING.cy + 1} L${186} ${BP_RING.cy - 3}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={theme.wireframe.strokeOpacity}
      />
      <g className={BP_HIDE_ON_MORPH}>
        <Selection x={BP_TRIGGER.x} y={BP_TRIGGER.y} w={BP_TRIGGER.w} h={BP_TRIGGER.h} />
        <DimH
          x1={BP_TRIGGER.x}
          x2={BP_TRIGGER.x + BP_TRIGGER.w}
          y={BP_TRIGGER.y + BP_TRIGGER.h + 14}
          label={`${BP_TRIGGER.w}`}
        />
        <DimV
          x={BP_TRIGGER.x - 12}
          y1={BP_TRIGGER.y}
          y2={BP_TRIGGER.y + BP_TRIGGER.h}
          label={`${BP_TRIGGER.h}`}
          labelXOffset={-6}
        />
        <PadGuide
          x={BP_TRIGGER.x + 24}
          y={BP_TRIGGER.y}
          w={BP_TRIGGER.w - 48}
          h={BP_TRIGGER.h}
          offset={0.8}
          boxX={BP_TRIGGER.x}
          boxY={BP_TRIGGER.y}
          boxW={BP_TRIGGER.w}
          boxH={BP_TRIGGER.h}
          boxRx={BP_TRIGGER.rx}
          clipOffset={0.8}
        />
        <DimLabel x={BP_TRIGGER.x + 12} y={BP_TRIGGER.y + BP_TRIGGER.h / 2 + 2} anchor="middle">
          24
        </DimLabel>
        <DimLabel
          x={BP_TRIGGER.x + BP_TRIGGER.w - 12}
          y={BP_TRIGGER.y + BP_TRIGGER.h / 2 + 2}
          anchor="middle"
        >
          24
        </DimLabel>
        <DimLabel x={BP_TRIGGER.x} y={BP_TRIGGER.y - 4} anchor="start">
          r4
        </DimLabel>
      </g>
    </Blueprint>
  )
}

const AN_ITEMS = [
  { label: 'Introduction', isActive: false },
  { label: 'Getting Started', isActive: true },
  { label: 'API Reference', isActive: false },
] as const

function PanelShape({ theme }: { theme: BlueprintTheme }) {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('panel')

  return (
    <rect
      x={10}
      y={10}
      width={220}
      height={140}
      rx={10}
      stroke="currentColor"
      strokeWidth={hovered === 'panel' ? 2 : theme.wireframe.strokeWidth}
      fill={hovered === 'panel' ? 'currentColor' : 'transparent'}
      fillOpacity={hovered === 'panel' ? 0.03 : 0}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ ...spotlight.style, pointerEvents: 'all' }}
      onMouseEnter={() => setHovered('panel')}
      onMouseLeave={() => setHovered(null)}
    />
  )
}

function ItemShape({
  index,
  label,
  isActive,
}: {
  index: number
  label: string
  isActive: boolean
}) {
  const { hovered, setHovered } = useAnatomy()
  const partId = `item-${index}`
  const spotlight = useSpotlight(partId)

  return (
    <g
      onMouseEnter={() => setHovered(partId)}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect
        x={18}
        y={20 + index * 38}
        width={204}
        height={32}
        rx={4}
        fill="currentColor"
        fillOpacity={hovered === partId ? 0.1 : isActive ? 0.08 : 0}
        className={spotlight.className}
      />
      <text
        x={30}
        y={40 + index * 38}
        fontSize={11}
        fontWeight={isActive ? 600 : 400}
        fontFamily="var(--font-sans)"
        className={`fill-current ${isActive ? 'opacity-100' : 'opacity-55'} ${spotlight.className}`}
      >
        {label}
      </text>
    </g>
  )
}

function TriggerShape({ theme }: { theme: BlueprintTheme }) {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('trigger')

  return (
    <rect
      x={10}
      y={170}
      width={220}
      height={48}
      rx={4}
      stroke="currentColor"
      strokeWidth={hovered === 'trigger' ? 2 : theme.wireframe.strokeWidth}
      fill={hovered === 'trigger' ? 'currentColor' : 'transparent'}
      fillOpacity={hovered === 'trigger' ? 0.05 : 0}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ ...spotlight.style, pointerEvents: 'all' }}
      onMouseEnter={() => setHovered('trigger')}
      onMouseLeave={() => setHovered(null)}
    />
  )
}

function TitleShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('title')

  return (
    <g
      onMouseEnter={() => setHovered('title')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect x={34} y={186} width={120} height={24} fill="transparent" />
      <text
        x={34}
        y={198}
        fontSize={12}
        fontWeight={600}
        fontFamily="var(--font-sans)"
        className={`fill-current ${spotlight.className}`}
      >
        Getting Started
      </text>
    </g>
  )
}

function ProgressShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('progress')

  return (
    <g
      onMouseEnter={() => setHovered('progress')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect x={176} y={182} width={24} height={24} fill="transparent" />
      {/* Real component rotates -90deg so progress starts at 12 o'clock, like a clock hand. */}
      <g transform="rotate(-90 188 194)">
        <circle
          cx={188}
          cy={194}
          r={8}
          fill="none"
          stroke="currentColor"
          strokeWidth={hovered === 'progress' ? 2 : 1.5}
          opacity={0.15}
        />
        <circle
          cx={188}
          cy={194}
          r={8}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth={hovered === 'progress' ? 2 : 1.5}
          strokeDasharray={`${8 * 2 * Math.PI * 0.6} ${8 * 2 * Math.PI}`}
          strokeLinecap="round"
          style={{ filter: 'drop-shadow(0 0 2px var(--color-accent))' }}
          className={spotlight.className}
        />
      </g>
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
      className={`transition-all duration-200 ease-out ${isOthersHovered ? 'opacity-30' : 'opacity-100'}`}
    >
      <g
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={blueprintTheme.guide.strokeWidth}
        strokeDasharray="2 2"
        opacity={blueprintTheme.guide.structOpacity}
      >
        <line x1={140} y1={52} x2={140} y2={58} />
        <line x1={10} y1={30} x2={18} y2={30} />
      </g>
      <DimLabel x={148} y={57} anchor="start">
        6
      </DimLabel>
      <DimLabel x={14} y={25} anchor="middle">
        8
      </DimLabel>
      <PadGuide
        x={10 + 24}
        y={170}
        w={220 - 48}
        h={48}
        offset={0.8}
        boxX={10}
        boxY={170}
        boxW={220}
        boxH={48}
        boxRx={4}
        clipOffset={0.8}
      />
      <Selection x={10} y={170} w={220} h={48} />
      <DimH x1={10} x2={230} y={160} label="220" />
      <DimV x={245} y1={170} y2={218} label="48" labelXOffset={5} labelAnchor="start" />
      <DimLabel x={10 + 12} y={170 + 24 + 2} anchor="middle">
        24
      </DimLabel>
      <DimLabel x={230 - 12} y={170 + 24 + 2} anchor="middle">
        24
      </DimLabel>
      <DimLabel x={10} y={166} anchor="start">
        r4
      </DimLabel>
    </g>
  )
}

function InteractionZone() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('interaction', { isInteraction: true })

  return (
    <rect
      x={158}
      y={172}
      width={44}
      height={44}
      rx={8}
      strokeWidth={1}
      strokeDasharray={hovered === 'interaction' ? 'none' : '2 2'}
      className={`cursor-pointer stroke-(--color-fg) ${hovered === 'interaction' ? 'fill-(--color-fg)' : 'fill-transparent'} ${spotlight.className}`}
      style={{
        pointerEvents: 'all',
        fillOpacity: hovered === 'interaction' ? 0.1 : 0,
        ...spotlight.style,
      }}
      onMouseEnter={() => setHovered('interaction')}
      onMouseLeave={() => setHovered(null)}
    />
  )
}

function LinesLayer() {
  return (
    <g strokeWidth="1" className="pointer-events-none">
      <OverlayLine id="panel" x1={70} y1={100} x2={10} y2={100} />
      <OverlayLine id="item-1" x1={282} y1={94} x2={340} y2={104} />
      <OverlayLine id="title" x1={94} y1={230} x2={94} y2={250} />
      <OverlayLine id="progress" x1={248} y1={222} x2={248} y2={275} />
      <OverlayLine id="trigger" x1={180} y1={238} x2={180} y2={300} />
    </g>
  )
}

function TagsLayer() {
  return (
    <>
      <foreignObject
        x={-130}
        y={88}
        width={140}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="panel" label="Panel" className="items-center justify-end" />
      </foreignObject>
      <foreignObject
        x={340}
        y={92}
        width={140}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="item-1" label="TOC Item" className="items-center justify-start" />
      </foreignObject>
      <foreignObject
        x={40}
        y={252}
        width={120}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="title" label="Active Title" className="items-start justify-center" />
      </foreignObject>
      <foreignObject
        x={190}
        y={278}
        width={120}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="progress" label="Progress Ring" className="items-start justify-center" />
      </foreignObject>
      <foreignObject
        x={120}
        y={304}
        width={140}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part="trigger"
          label="TOC Trigger"
          className="items-start justify-center"
          isAccent
        />
      </foreignObject>
    </>
  )
}

export function TableOfContentsBreakdown() {
  return (
    <AnatomyFrame viewBox="-146 -76 642 420" maxWidthClassName="max-w-[770px]">
      <g transform="translate(60, 20)">
        <PanelShape theme={blueprintTheme} />
        {AN_ITEMS.map((item, index) => (
          <ItemShape key={item.label} index={index} label={item.label} isActive={item.isActive} />
        ))}
        <TriggerShape theme={blueprintTheme} />
        <TitleShape />
        <ProgressShape />
        <InteractionZone />
        <AnnotationsLayer />
      </g>

      <LinesLayer />
      <TagsLayer />
    </AnatomyFrame>
  )
}
'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset — licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root MIT LICENSE.

import { type CSSProperties } from 'react'

import {
  type DraftTheme,
  DraftSurface,
  DRAFT_SCAFFOLD_FADE,
  DRAFT_INK_MORPH,
  DRAFT_TEXT_SOFT,
  draftTheme,
  MeasureH,
  MeasureNote,
  MeasureV,
  InsetGuide,
  GripFrame,
  beat,
  DRAFT_BEAT,
  DRAFT_DETAIL_BEAT,
  DRAFT_LABEL_BEAT,
  DRAFT_LABEL_ALT_BEAT,
  stampBeat,
} from '@/components/diagrams/lib/parts'
import {
  AnatomyFrame,
  AnatomyTag,
  OverlayLine,
  useAnatomy,
  useSpotlight,
} from '@/components/diagrams/lib/anatomy-parts'

const BP_PANEL = { x: 26, y: 6, w: 182, h: 72, rx: 8 } as const
const BP_GAP = 8
const BP_TRIGGER = { x: 26, y: BP_PANEL.y + BP_PANEL.h + BP_GAP, w: 182, h: 36, rx: 4 } as const
const BP_RING = { cx: 170, cy: BP_TRIGGER.y + BP_TRIGGER.h / 2, r: 6 } as const
const BP_ENTRY = { x: 34, y: 14, w: 166, h: 15, pitch: 21 } as const

export function TableOfContentsWireframe() {
  const theme = draftTheme
  return (
    <DraftSurface>
      <g className={DRAFT_SCAFFOLD_FADE}>
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
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
      </g>
      <rect
        x={BP_PANEL.x}
        y={BP_PANEL.y}
        width={BP_PANEL.w}
        height={BP_PANEL.h}
        rx={BP_PANEL.rx}
        strokeWidth={theme.wireframe.strokeWidth}
        className={`${DRAFT_INK_MORPH} fill-transparent stroke-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 group-hover:fill-(--color-popover) group-focus-visible:fill-(--color-popover) group-hover:stroke-(--color-border-strong) group-focus-visible:stroke-(--color-border-strong) group-hover:drop-shadow-md group-focus-visible:drop-shadow-md`}
      />
      <g fill="currentColor">
        <rect
          x={BP_ENTRY.x}
          y={BP_ENTRY.y}
          width={BP_ENTRY.w}
          height={BP_ENTRY.h}
          rx={4}
          fillOpacity={0.5}
          style={beat(DRAFT_BEAT.hatch)}
          className={`fade-note ${DRAFT_INK_MORPH} opacity-50 group-hover:opacity-90 group-focus-visible:opacity-90`}
        />
        <rect
          x={BP_ENTRY.x}
          y={BP_ENTRY.y + BP_ENTRY.pitch}
          width={BP_ENTRY.w}
          height={BP_ENTRY.h}
          rx={4}
          fillOpacity={0.3}
          style={beat(stampBeat(0))}
          className={`fade-note ${DRAFT_INK_MORPH} opacity-50 group-hover:opacity-70 group-focus-visible:opacity-70`}
        />
        <rect
          x={BP_ENTRY.x}
          y={BP_ENTRY.y + BP_ENTRY.pitch * 2}
          width={BP_ENTRY.w}
          height={BP_ENTRY.h}
          rx={4}
          fillOpacity={0.2}
          style={beat(stampBeat(1))}
          className={`fade-note ${DRAFT_INK_MORPH} opacity-50 group-hover:opacity-60 group-focus-visible:opacity-60`}
        />
      </g>
      <g
        className="translate-y-0 transition-transform duration-(--motion-dur-base) ease-(--motion-ease-in-out) group-hover:translate-y-(--bp-toc-entry-step) group-hover:delay-(--motion-dur-base) group-focus-visible:translate-y-(--bp-toc-entry-step) group-focus-visible:delay-(--motion-dur-base) motion-reduce:transition-none"
        style={{ '--bp-toc-entry-step': `${BP_ENTRY.pitch}px` } as CSSProperties}
      >
        <rect
          x={BP_ENTRY.x - 4}
          y={BP_ENTRY.y + 4}
          width={1.5}
          height={BP_ENTRY.h - 8}
          rx={0.75}
          fill="var(--bp-accent, var(--color-accent))"
          style={beat(stampBeat(1))}
          className="fade-note"
        />
      </g>
      <rect
        x={BP_TRIGGER.x}
        y={BP_TRIGGER.y}
        width={BP_TRIGGER.w}
        height={BP_TRIGGER.h}
        rx={BP_TRIGGER.rx}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        style={beat(DRAFT_BEAT.outline)}
        className={`ink-draw ${DRAFT_INK_MORPH} fill-transparent stroke-current group-hover:fill-(--color-surface-2) group-focus-visible:fill-(--color-surface-2) group-hover:stroke-(--color-border) group-focus-visible:stroke-(--color-border)`}
      />
      <text
        x={BP_TRIGGER.x + 24}
        y={BP_TRIGGER.y + 22}
        fontSize={11}
        fontWeight={600}
        fontFamily="var(--font-sans)"
        style={beat(DRAFT_LABEL_BEAT)}
        className={`fade-note ${DRAFT_TEXT_SOFT}`}
      >
        Getting Started
      </text>
      <line
        x1={153}
        y1={BP_TRIGGER.y + 8}
        x2={153}
        y2={BP_TRIGGER.y + 28}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        stroke="currentColor"
        strokeWidth={theme.guide.strokeWidth}
        opacity={theme.guide.dimOpacity}
        style={beat(DRAFT_BEAT.anatomy)}
        className="ink-draw"
      />
      <circle
        cx={BP_RING.cx}
        cy={BP_RING.cy}
        r={BP_RING.r}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        opacity={0.2}
        style={beat(DRAFT_BEAT.anatomy)}
        className="ink-draw"
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
        style={beat(DRAFT_BEAT.hatch)}
        className="fade-note"
      />
      <path
        d={`M${186} ${BP_RING.cy - 3} L${190} ${BP_RING.cy + 1} L${194} ${BP_RING.cy - 3}`}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={theme.wireframe.strokeOpacity}
        style={beat(DRAFT_DETAIL_BEAT.b)}
        className="ink-draw"
      />
      <g className={DRAFT_SCAFFOLD_FADE}>
        <GripFrame
          x={BP_TRIGGER.x}
          y={BP_TRIGGER.y}
          w={BP_TRIGGER.w}
          h={BP_TRIGGER.h}
          style={beat(DRAFT_BEAT.handle)}
        />
        <MeasureH
          x1={BP_TRIGGER.x}
          x2={BP_TRIGGER.x + BP_TRIGGER.w}
          y={BP_TRIGGER.y + BP_TRIGGER.h + 12}
          label={`${BP_TRIGGER.w}`}
          className="note-stamp"
          style={beat(stampBeat(0))}
        />
        <MeasureV
          x={BP_TRIGGER.x - 12}
          y1={BP_TRIGGER.y}
          y2={BP_TRIGGER.y + BP_TRIGGER.h}
          label={`${BP_TRIGGER.h}`}
          labelXOffset={-6}
          className="note-stamp"
          style={beat(stampBeat(1))}
        />
        <InsetGuide
          x={BP_TRIGGER.x + 24}
          y={BP_TRIGGER.y + 10}
          w={97}
          h={BP_TRIGGER.h - 20}
          offset={0.8}
          boxX={BP_TRIGGER.x}
          boxY={BP_TRIGGER.y}
          boxW={BP_TRIGGER.w}
          boxH={BP_TRIGGER.h}
          boxRx={BP_TRIGGER.rx}
          clipOffset={0.8}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <MeasureNote
          x={BP_TRIGGER.x + 12}
          y={BP_TRIGGER.y + BP_TRIGGER.h / 2 + 2}
          anchor="middle"
          className="note-stamp"
          style={beat(stampBeat(2))}
        >
          24
        </MeasureNote>
        <MeasureNote
          x={BP_TRIGGER.x}
          y={BP_TRIGGER.y - 4}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(4))}
        >
          r4
        </MeasureNote>

        <g
          stroke="var(--bp-accent, var(--color-accent))"
          strokeWidth={theme.guide.strokeWidth}
          strokeDasharray="2 2"
          opacity={theme.guide.structOpacity}
          className="dash-march"
          style={beat(DRAFT_LABEL_ALT_BEAT)}
        >
          <line
            x1={BP_TRIGGER.x + BP_TRIGGER.w - 24}
            y1={BP_PANEL.y + BP_PANEL.h}
            x2={BP_TRIGGER.x + BP_TRIGGER.w - 24}
            y2={BP_TRIGGER.y}
          />
        </g>
        <MeasureNote
          x={BP_TRIGGER.x + BP_TRIGGER.w - 18}
          y={(BP_PANEL.y + BP_PANEL.h + BP_TRIGGER.y) / 2 + 2.5}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(5))}
        >
          {`${BP_GAP}`}
        </MeasureNote>
      </g>
    </DraftSurface>
  )
}

const AN_ITEMS = [
  { label: 'Introduction', isActive: false },
  { label: 'Getting Started', isActive: true },
  { label: 'API Reference', isActive: false },
] as const

function PanelShape({ theme }: { theme: DraftTheme }) {
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

function TriggerShape({ theme }: { theme: DraftTheme }) {
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
          stroke="var(--bp-accent, var(--color-accent))"
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
      className={`transition-[opacity,filter] duration-(--motion-dur-base) ease-(--motion-ease-in-out) motion-reduce:transition-none motion-reduce:filter-none ${isOthersHovered ? 'opacity-30' : 'opacity-100'}`}
    >
      <g
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={draftTheme.guide.strokeWidth}
        strokeDasharray="2 2"
        opacity={draftTheme.guide.structOpacity}
      >
        <line x1={140} y1={52} x2={140} y2={58} />
        <line x1={10} y1={30} x2={18} y2={30} />
      </g>
      <MeasureNote x={148} y={57} anchor="start">
        6
      </MeasureNote>
      <MeasureNote x={14} y={25} anchor="middle">
        8
      </MeasureNote>
      <InsetGuide
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
      <GripFrame x={10} y={170} w={220} h={48} />
      <MeasureH x1={10} x2={230} y={160} label="220" />
      <MeasureV x={245} y1={170} y2={218} label="48" labelXOffset={5} labelAnchor="start" />
      <MeasureNote x={10 + 12} y={170 + 24 + 2} anchor="middle">
        24
      </MeasureNote>
      <MeasureNote x={230 - 12} y={170 + 24 + 2} anchor="middle">
        24
      </MeasureNote>
      <MeasureNote x={10} y={166} anchor="start">
        r4
      </MeasureNote>
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
        <PanelShape theme={draftTheme} />
        {AN_ITEMS.map((item, index) => (
          <ItemShape key={item.label} index={index} label={item.label} isActive={item.isActive} />
        ))}
        <TriggerShape theme={draftTheme} />
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

'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset, licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root LICENSE.

import {
  DraftSurface,
  DRAFT_INK_MORPH,
  DRAFT_SCAFFOLD_FADE,
  DRAFT_TEXT_SOFT,
  draftTheme,
  MeasureH,
  MeasureNote,
  MeasureV,
  InsetGuide,
  GripFrame,
  squirclePillPath,
  beat,
  DRAFT_BEAT,
  DRAFT_LABEL_BEAT,
  stampBeat,
} from '@/components/diagrams/lib/diagram-parts'
import {
  AnatomyFrame,
  AnatomyCallout,
  useAnatomy,
  useSpotlight,
} from '@/components/diagrams/lib/anatomy-parts'

const BADGE = {
  h: 26,
  padX: 12,
  r: 13,
  font: 12,
  solidW: 104,
  dotW: 104,
  dot: 7,
} as const

const BP = { x: (220 - BADGE.solidW) / 2, y: (140 - BADGE.h) / 2 } as const
const BP_SURFACE = `${DRAFT_INK_MORPH} fill-transparent stroke-current group-hover:fill-(--color-surface) group-focus-visible:fill-(--color-surface) group-hover:stroke-(--color-border) group-focus-visible:stroke-(--color-border)`

export function BadgeBlueprint() {
  const theme = draftTheme
  return (
    <DraftSurface>
      <style>{`
        @keyframes bp-badge-press {
          0% { transform: scale(1) translateY(0); }
          35% { transform: scale(0.97) translateY(1px); }
          100% { transform: scale(1) translateY(0); }
        }
        .blueprint .bp-badge-press {
          transform-box: fill-box;
          transform-origin: center;
        }
        .group:hover .blueprint .bp-badge-press,
        .group:focus-visible .blueprint .bp-badge-press {
          animation: bp-badge-press 450ms var(--motion-ease-in-out) 550ms both;
        }
        @media (prefers-reduced-motion: reduce) {
          .group:hover .blueprint .bp-badge-press,
          .group:focus-visible .blueprint .bp-badge-press {
            animation: none;
          }
        }
      `}</style>
      <g className="bp-badge-press">
        <path
          d={squirclePillPath(BP.x, BP.y, BADGE.solidW, BADGE.h)}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1}
          strokeWidth={theme.wireframe.strokeWidth}
          strokeOpacity={theme.wireframe.strokeOpacity}
          style={beat(DRAFT_BEAT.outline)}
          className={`ink-draw ${BP_SURFACE}`}
        />
        <text
          x={BP.x + BADGE.solidW / 2}
          y={BP.y + BADGE.h / 2 + BADGE.font * 0.35}
          textAnchor="middle"
          fontSize={BADGE.font}
          fontFamily="var(--font-sans)"
          style={beat(DRAFT_LABEL_BEAT)}
          className={`fade-note ${DRAFT_TEXT_SOFT}`}
        >
          Early Access
        </text>
      </g>
      <g className={DRAFT_SCAFFOLD_FADE}>
        <GripFrame x={BP.x} y={BP.y} w={BADGE.solidW} h={BADGE.h} style={beat(DRAFT_BEAT.handle)} />
        <InsetGuide
          x={BP.x + BADGE.padX}
          y={BP.y}
          w={BADGE.solidW - BADGE.padX * 2}
          h={BADGE.h}
          offset={0.8}
          boxX={BP.x}
          boxY={BP.y}
          boxW={BADGE.solidW}
          boxH={BADGE.h}
          boxRx={BADGE.r}
          clipOffset={0.8}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <MeasureH
          x1={BP.x}
          x2={BP.x + BADGE.solidW}
          y={BP.y - 12}
          label={`${BADGE.solidW}`}
          className="note-stamp"
          style={beat(stampBeat(0))}
        />
        <MeasureV
          x={BP.x - 12}
          y1={BP.y}
          y2={BP.y + BADGE.h}
          label={`${BADGE.h}`}
          className="note-stamp"
          style={beat(stampBeat(1))}
        />
        <MeasureH
          x1={BP.x}
          x2={BP.x + BADGE.padX}
          y={BP.y + BADGE.h + 10}
          label={`${BADGE.padX}`}
          labelYOffset={10}
          className="note-stamp"
          style={beat(stampBeat(2))}
        />
        <MeasureH
          x1={BP.x + BADGE.solidW - BADGE.padX}
          x2={BP.x + BADGE.solidW}
          y={BP.y + BADGE.h + 10}
          label={`${BADGE.padX}`}
          labelYOffset={10}
          className="note-stamp"
          style={beat(stampBeat(3))}
        />
        <MeasureNote
          x={BP.x + BADGE.solidW + 8}
          y={BP.y + BADGE.h / 2 + 2.5}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(4))}
        >
          {`r${BADGE.r}`}
        </MeasureNote>
      </g>
    </DraftSurface>
  )
}

const AN_MID_Y = BADGE.h / 2
const AN_DOT_CX = BADGE.padX + BADGE.dot / 2
const AN_GAP = 6
const AN_TEXT_X = AN_DOT_CX + BADGE.dot / 2 + AN_GAP
const AN_TEXT_BASELINE = AN_MID_Y + 4
const AN_TEXT_TOP = AN_TEXT_BASELINE - 0.72 * BADGE.font
const TOP_TAG_END = -24

function ContainerShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('container')

  return (
    <path
      d={squirclePillPath(0, 0, BADGE.dotW, BADGE.h)}
      stroke="currentColor"
      strokeWidth={hovered === 'container' ? 2 : draftTheme.wireframe.strokeWidth}
      fill={hovered === 'container' ? 'currentColor' : 'transparent'}
      fillOpacity={hovered === 'container' ? 0.1 : 0}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ ...spotlight.style, pointerEvents: 'all' }}
      onMouseEnter={() => setHovered('container')}
      onMouseLeave={() => setHovered(null)}
    />
  )
}

function DotShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('dot')

  return (
    <g
      onMouseEnter={() => setHovered('dot')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect x={AN_DOT_CX - 6} y={AN_MID_Y - 6} width={12} height={12} fill="transparent" />
      <circle
        cx={AN_DOT_CX}
        cy={AN_MID_Y}
        r={BADGE.dot / 2}
        stroke="currentColor"
        strokeWidth={hovered === 'dot' ? 1 : 0.75}
        fill="currentColor"
        fillOpacity={hovered === 'dot' ? 0.8 : 0.4}
        className={spotlight.className}
      />
    </g>
  )
}

function LabelShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('text')

  return (
    <g
      onMouseEnter={() => setHovered('text')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect
        x={AN_TEXT_X - 2}
        y={3}
        width={BADGE.dotW - BADGE.padX - AN_TEXT_X + 2}
        height={20}
        fill="currentColor"
        fillOpacity={hovered === 'text' ? 0.08 : 0}
      />
      <text
        x={AN_TEXT_X}
        y={AN_TEXT_BASELINE}
        fontSize={BADGE.font}
        fontFamily="var(--font-sans)"
        className={`fill-current ${spotlight.className}`}
      >
        Early Access
      </text>
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
      <InsetGuide
        x={BADGE.padX}
        y={6}
        w={BADGE.dotW - BADGE.padX * 2}
        h={BADGE.h - 12}
        offset={0.8}
        boxX={0}
        boxY={0}
        boxW={BADGE.dotW}
        boxH={BADGE.h}
        boxRx={BADGE.r}
        clipOffset={0.8}
      />
      <MeasureNote x={BADGE.padX / 2} y={AN_MID_Y + 2} anchor="middle">
        {`${BADGE.padX}`}
      </MeasureNote>
      <MeasureNote x={BADGE.dotW - BADGE.padX / 2} y={AN_MID_Y + 2} anchor="middle">
        {`${BADGE.padX}`}
      </MeasureNote>
      <g
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={draftTheme.guide.strokeWidth}
        strokeDasharray="2 2"
        opacity={draftTheme.guide.structOpacity}
      >
        <line x1={AN_DOT_CX + BADGE.dot / 2} y1={AN_MID_Y} x2={AN_TEXT_X} y2={AN_MID_Y} />
      </g>
      <MeasureNote x={(AN_DOT_CX + BADGE.dot / 2 + AN_TEXT_X) / 2} y={AN_MID_Y + 9} anchor="middle">
        {`${AN_GAP}`}
      </MeasureNote>
      <GripFrame x={0} y={0} w={BADGE.dotW} h={BADGE.h} />
      <MeasureH x1={0} x2={BADGE.dotW} y={BADGE.h + 14} label={`${BADGE.dotW}`} labelYOffset={10} />
      <MeasureV
        x={-15}
        y1={0}
        y2={BADGE.h}
        label={`${BADGE.h}`}
        labelXOffset={-6}
        labelAnchor="end"
      />
      <MeasureNote x={BADGE.dotW} y={-6} anchor="end">
        {`r${BADGE.r}`}
      </MeasureNote>
    </g>
  )
}

function Callouts() {
  return (
    <>
      <AnatomyCallout
        part="dot"
        label="Dot"
        anchor={[AN_DOT_CX, AN_MID_Y - BADGE.dot / 2]}
        side="top"
        distance={AN_MID_Y - BADGE.dot / 2 - TOP_TAG_END}
        measure={`${BADGE.dot} × ${BADGE.dot} · round · md size`}
        caption="Status dot for the dot variant. Pulses when pulse is set."
      />
      <AnatomyCallout
        part="text"
        label="Label"
        anchor={[70, AN_TEXT_TOP]}
        side="top"
        distance={AN_TEXT_TOP - TOP_TAG_END}
        measure={`text ${BADGE.font} · font normal · nowrap`}
        caption="Badge content. Solid badges can run a shimmer wave across it."
      />
      <AnatomyCallout
        part="container"
        label="Container"
        anchor={[BADGE.dotW, AN_MID_Y]}
        side="end"
        distance={24}
        isAccent
        measure={`${BADGE.dotW} × ${BADGE.h} · r${BADGE.r} · px ${BADGE.padX} · border 1`}
        caption="Pill shell with solid, muted and dot variants in three sizes."
      />
    </>
  )
}

export function BadgeAnatomy() {
  return (
    <AnatomyFrame viewBox="-44 -60 258 126" ariaLabel="Badge anatomy: container, dot and label">
      <ContainerShape />
      <DotShape />
      <LabelShape />
      <AnnotationsLayer />
      <Callouts />
    </AnatomyFrame>
  )
}

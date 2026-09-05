'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset — licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root MIT LICENSE.

import {
  DraftSurface,
  DRAFT_FILL_PANEL,
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
  DRAFT_DETAIL_BEAT,
  DRAFT_LABEL_BEAT,
  DRAFT_LABEL_ALT_BEAT,
  stampBeat,
} from '@/components/diagrams/lib/diagram-parts'
import {
  AnatomyFrame,
  AnatomyTag,
  OverlayLine,
  useAnatomy,
  useSpotlight,
} from '@/components/diagrams/lib/anatomy-parts'

const BADGE = {
  h: 26,
  padX: 12,
  r: 13,
  font: 12,
  solidW: 100,
  dotW: 104,
  dot: 7,
} as const

const BP = { x: (220 - BADGE.solidW) / 2, y: (140 - BADGE.h) / 2 } as const

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
          className={`ink-draw ${DRAFT_FILL_PANEL}`}
        />
        <text
          x={BP.x + BADGE.solidW / 2}
          y={BP.y + BADGE.h / 2 + 4}
          textAnchor="middle"
          fontSize={BADGE.font}
          fontWeight={500}
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
          y={BP.y + 6}
          w={BADGE.solidW - BADGE.padX * 2}
          h={BADGE.h - 12}
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
        <MeasureNote
          x={BP.x + BADGE.padX / 2}
          y={BP.y + BADGE.h / 2 + 2}
          anchor="middle"
          className="note-stamp"
          style={beat(stampBeat(0))}
        >
          12
        </MeasureNote>
        <MeasureNote
          x={BP.x + BADGE.solidW - BADGE.padX / 2}
          y={BP.y + BADGE.h / 2 + 2}
          anchor="middle"
          className="note-stamp"
          style={beat(stampBeat(1))}
        >
          12
        </MeasureNote>
        <MeasureH
          x1={BP.x}
          x2={BP.x + BADGE.solidW}
          y={BP.y - 14}
          label={`${BADGE.solidW}`}
          className="note-stamp"
          style={beat(stampBeat(2))}
        />
        <MeasureV
          x={BP.x - 14}
          y1={BP.y}
          y2={BP.y + BADGE.h}
          label={`${BADGE.h}`}
          labelXOffset={-6}
          className="note-stamp"
          style={beat(stampBeat(3))}
        />
        <MeasureNote
          x={BP.x}
          y={BP.y - 6}
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

const AN = { x: 158, y: 67 } as const
const AN_MID_Y = AN.y + BADGE.h / 2
const AN_DOT_CX = AN.x + BADGE.padX + BADGE.dot / 2
const AN_TEXT_X = AN_DOT_CX + BADGE.dot / 2 + 6
const AN_TEXT_CENTER = 216

function ContainerShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('container')

  return (
    <path
      d={squirclePillPath(AN.x, AN.y, BADGE.dotW, BADGE.h)}
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
      <rect x={AN_DOT_CX - 10} y={AN_MID_Y - 10} width={20} height={20} fill="transparent" />
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
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('text')

  return (
    <g
      onMouseEnter={() => setHovered('text')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect x={AN_TEXT_X - 4} y={AN.y + 3} width={78} height={20} fill="transparent" />
      <text
        x={AN_TEXT_X}
        y={AN_MID_Y + 4}
        fontSize={BADGE.font}
        fontWeight={500}
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
        x={AN.x + BADGE.padX}
        y={AN.y + 6}
        w={BADGE.dotW - BADGE.padX * 2}
        h={BADGE.h - 12}
        offset={0.8}
        boxX={AN.x}
        boxY={AN.y}
        boxW={BADGE.dotW}
        boxH={BADGE.h}
        boxRx={BADGE.r}
        clipOffset={0.8}
      />
      <MeasureNote x={AN.x + BADGE.padX / 2} y={AN_MID_Y + 2} anchor="middle">
        12
      </MeasureNote>
      <MeasureNote x={AN.x + BADGE.dotW - BADGE.padX / 2} y={AN_MID_Y + 2} anchor="middle">
        12
      </MeasureNote>
      <g
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={draftTheme.guide.strokeWidth}
        strokeDasharray="2 2"
        opacity={draftTheme.guide.structOpacity}
      >
        <line x1={AN_DOT_CX + BADGE.dot / 2} y1={AN_MID_Y} x2={AN_TEXT_X} y2={AN_MID_Y} />
      </g>
      <MeasureNote x={(AN_DOT_CX + BADGE.dot / 2 + AN_TEXT_X) / 2} y={AN_MID_Y - 6} anchor="middle">
        6
      </MeasureNote>
      <GripFrame x={AN.x} y={AN.y} w={BADGE.dotW} h={BADGE.h} />
      <MeasureH x1={AN.x} x2={AN.x + BADGE.dotW} y={AN.y - 15} label={`${BADGE.dotW}`} />
      <MeasureV
        x={AN.x - 15}
        y1={AN.y}
        y2={AN.y + BADGE.h}
        label={`${BADGE.h}`}
        labelXOffset={-6}
        labelAnchor="end"
      />
      <MeasureNote x={AN.x} y={AN.y - 6} anchor="start">
        {`r${BADGE.r}`}
      </MeasureNote>
    </g>
  )
}

function LinesLayer() {
  return (
    <g strokeWidth="1" className="pointer-events-none">
      <OverlayLine id="container" x1={AN.x + BADGE.dotW} y1={AN_MID_Y} x2={292} y2={AN_MID_Y} />
      <OverlayLine id="dot" x1={AN_DOT_CX} y1={AN_MID_Y + BADGE.dot / 2} x2={AN_DOT_CX} y2={124} />
      <OverlayLine id="text" x1={AN_TEXT_CENTER} y1={AN_MID_Y - 6} x2={AN_TEXT_CENTER} y2={36} />
    </g>
  )
}

function TagsLayer() {
  return (
    <>
      <foreignObject
        x={AN_DOT_CX - 58}
        y={118}
        width={140}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part="dot"
          label={'Dot (variant="dot")'}
          className="items-start justify-center"
        />
      </foreignObject>
      <foreignObject
        x={AN_TEXT_CENTER - 44}
        y={12}
        width={100}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="text" label="Label Text" className="items-end justify-center" />
      </foreignObject>
      <foreignObject
        x={290}
        y={AN_MID_Y - 12}
        width={130}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part="container"
          label="Badge.Container"
          className="items-center justify-start"
          isAccent
        />
      </foreignObject>
    </>
  )
}

export function BadgeAnatomy() {
  return (
    <AnatomyFrame viewBox="-14 -2 448 164" maxWidthClassName="max-w-[538px]">
      <ContainerShape />
      <DotShape />
      <LabelShape />
      <AnnotationsLayer />
      <LinesLayer />
      <TagsLayer />
    </AnatomyFrame>
  )
}

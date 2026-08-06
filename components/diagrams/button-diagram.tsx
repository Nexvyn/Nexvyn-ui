'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset — licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root MIT LICENSE.

import {
  DraftSurface,
  DRAFT_BEAT,
  DRAFT_FILL_SOLID,
  DRAFT_SCAFFOLD_FADE,
  DRAFT_TEXT_ON_SOLID,
  draftTheme,
  beat,
  MeasureH,
  MeasureV,
  MeasureNote,
  InsetGuide,
  GripFrame,
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

const BTN = {
  w: 120,
  h: 44,
  r: 6,
  padX: 16,
  font: 14,
  focusGap: 3, // ring-2 outside a 2px offset -> band midline at 3px
} as const

const BP_X = (220 - BTN.w) / 2
const BP_Y = (140 - BTN.h) / 2

export function ButtonBlueprint() {
  const theme = draftTheme
  const cy = BP_Y + BTN.h / 2

  return (
    <DraftSurface>
      <style>{`
        @keyframes bp-btn-press {
          0% { transform: scale(1) translateY(0); }
          35% { transform: scale(0.97) translateY(1px); }
          100% { transform: scale(1) translateY(0); }
        }
        .blueprint .bp-press {
          transform-box: fill-box;
          transform-origin: center;
        }
        .group:hover .blueprint .bp-press,
        .group:focus-visible .blueprint .bp-press {
          animation: bp-btn-press 450ms var(--motion-ease-in-out) 550ms both;
        }
        @media (prefers-reduced-motion: reduce) {
          .group:hover .blueprint .bp-press,
          .group:focus-visible .blueprint .bp-press {
            animation: none;
          }
        }
      `}</style>
      <g className="bp-press">
        <rect
          x={BP_X}
          y={BP_Y}
          width={BTN.w}
          height={BTN.h}
          rx={BTN.r}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1}
          strokeWidth={theme.wireframe.strokeWidth}
          strokeOpacity={theme.wireframe.strokeOpacity}
          style={beat(DRAFT_BEAT.outline)}
          className={`ink-draw ${DRAFT_FILL_SOLID} supports-[corner-shape:squircle]:corner-squircle`}
        />
        <text
          x={BP_X + BTN.w / 2}
          y={cy + 5}
          textAnchor="middle"
          fontSize={BTN.font}
          fontWeight={500}
          fontFamily="var(--font-sans)"
          strokeWidth={theme.wireframe.textStrokeWidth}
          strokeOpacity={theme.wireframe.textOpacity}
          style={beat(DRAFT_LABEL_BEAT)}
          className={`fade-note ${DRAFT_TEXT_ON_SOLID}`}
        >
          Click me
        </text>
      </g>

      <g className={DRAFT_SCAFFOLD_FADE}>
        <GripFrame x={BP_X} y={BP_Y} w={BTN.w} h={BTN.h} style={beat(DRAFT_BEAT.handle)} />
        <InsetGuide
          x={BP_X + BTN.padX}
          y={cy - 10}
          w={BTN.w - BTN.padX * 2}
          h={20}
          offset={0.8}
          boxX={BP_X}
          boxY={BP_Y}
          boxW={BTN.w}
          boxH={BTN.h}
          boxRx={BTN.r}
          clipOffset={0.8}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <MeasureH
          x1={BP_X}
          x2={BP_X + BTN.w}
          y={BP_Y - 12}
          label={`${BTN.w}`}
          className="note-stamp"
          style={beat(stampBeat(1))}
        />
        <MeasureV
          x={BP_X - 12}
          y1={BP_Y}
          y2={BP_Y + BTN.h}
          label={`${BTN.h}`}
          labelXOffset={-6}
          className="note-stamp"
          style={beat(stampBeat(0))}
        />
        <MeasureNote
          x={BP_X + BTN.padX / 2}
          y={cy + 2}
          anchor="middle"
          className="note-stamp"
          style={beat(stampBeat(2))}
        >
          16
        </MeasureNote>
        <MeasureNote
          x={BP_X + BTN.w - BTN.padX / 2}
          y={cy + 2}
          anchor="middle"
          className="note-stamp"
          style={beat(stampBeat(3))}
        >
          16
        </MeasureNote>
        <MeasureNote
          x={BP_X + BTN.w / 2}
          y={BP_Y + 8}
          anchor="middle"
          className="note-stamp"
          style={beat(stampBeat(4))}
        >
          {`${(BTN.h - 20) / 2}`}
        </MeasureNote>
        <MeasureNote
          x={BP_X + BTN.w / 2}
          y={BP_Y + BTN.h - 4}
          anchor="middle"
          className="note-stamp"
          style={beat(stampBeat(5))}
        >
          {`${(BTN.h - 20) / 2}`}
        </MeasureNote>
        <MeasureNote
          x={BP_X}
          y={BP_Y + BTN.h + 18}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(6))}
        >
          {`r${BTN.r}`}
        </MeasureNote>
      </g>
    </DraftSurface>
  )
}

const AN = { x: 140, y: 60 } as const
const AN_MID_X = AN.x + BTN.w / 2
const AN_MID_Y = AN.y + BTN.h / 2

const LABEL_BASELINE = AN_MID_Y + 5
// Cap-height top of the 14px label (baseline − ~0.72em).
const LABEL_CAP_TOP = LABEL_BASELINE - Math.round(BTN.font * 0.72)

const PARTS = {
  root: {
    label: 'Button.Root',
    accent: true,
    anchor: { x: AN.x + BTN.w, y: AN_MID_Y },
    lineEnd: { x: 308, y: AN_MID_Y },
    badge: { x: 308, y: AN_MID_Y - 12, w: 120, h: 24, align: 'items-center justify-start' },
  },
  label: {
    label: 'Button.Label',
    accent: false,
    anchor: { x: AN_MID_X, y: LABEL_CAP_TOP },
    lineEnd: { x: AN_MID_X, y: 24 },
    badge: { x: AN_MID_X - 50, y: 0, w: 100, h: 24, align: 'items-end justify-center' },
  },
  'focus-ring': {
    label: 'Button.FocusRing',
    accent: false,
    anchor: { x: AN.x - BTN.focusGap, y: AN_MID_Y },
    lineEnd: { x: 110, y: AN_MID_Y },
    badge: { x: -10, y: AN_MID_Y - 12, w: 120, h: 24, align: 'items-center justify-end' },
  },
} as const

function RootShape() {
  const { hovered, setHovered, togglePinned } = useAnatomy()
  const spotlight = useSpotlight('root')

  return (
    <rect
      x={AN.x}
      y={AN.y}
      width={BTN.w}
      height={BTN.h}
      rx={BTN.r}
      stroke="currentColor"
      strokeWidth={hovered === 'root' ? 2 : draftTheme.wireframe.strokeWidth}
      fill={hovered === 'root' ? 'currentColor' : 'transparent'}
      fillOpacity={hovered === 'root' ? 0.1 : 0}
      className={`cursor-pointer supports-[corner-shape:squircle]:corner-squircle ${spotlight.className}`}
      style={{ ...spotlight.style, pointerEvents: 'all' }}
      onMouseEnter={() => setHovered('root')}
      onMouseLeave={() => setHovered(null)}
      onClick={(event) => {
        event.stopPropagation()
        togglePinned('root')
      }}
    />
  )
}

function LabelShape() {
  const { setHovered, togglePinned } = useAnatomy()
  const spotlight = useSpotlight('label')

  return (
    <g
      onMouseEnter={() => setHovered('label')}
      onMouseLeave={() => setHovered(null)}
      onClick={(event) => {
        event.stopPropagation()
        togglePinned('label')
      }}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect x={AN.x + 24} y={LABEL_CAP_TOP - 4} width={72} height={24} fill="transparent" />
      <text
        x={AN_MID_X}
        y={LABEL_BASELINE}
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
  const { hovered, setHovered, togglePinned } = useAnatomy()
  const spotlight = useSpotlight('focus-ring')
  const gap = BTN.focusGap

  return (
    <g
      onMouseEnter={() => setHovered('focus-ring')}
      onMouseLeave={() => setHovered(null)}
      onClick={(event) => {
        event.stopPropagation()
        togglePinned('focus-ring')
      }}
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

function AnnotationsLayer() {
  const { hovered, pinned } = useAnatomy()
  const isOthersEngaged = (hovered ?? pinned) !== null

  return (
    <g
      style={{
        pointerEvents: 'none',
        filter: isOthersEngaged ? 'url(#spotlight-blur)' : 'none',
      }}
      className={`transition-[opacity,filter] duration-(--motion-dur-base) ease-(--motion-ease-in-out) motion-reduce:transition-none motion-reduce:filter-none ${isOthersEngaged ? 'opacity-30' : 'opacity-100'}`}
    >
      <InsetGuide
        x={AN.x + BTN.padX}
        y={AN_MID_Y - 10}
        w={BTN.w - BTN.padX * 2}
        h={20}
        offset={0.8}
        boxX={AN.x}
        boxY={AN.y}
        boxW={BTN.w}
        boxH={BTN.h}
        boxRx={BTN.r}
        clipOffset={0.8}
      />
      <MeasureNote x={AN.x + BTN.padX / 2} y={AN_MID_Y + 2} anchor="middle">
        16
      </MeasureNote>
      <MeasureNote x={AN.x + BTN.w - BTN.padX / 2} y={AN_MID_Y + 2} anchor="middle">
        16
      </MeasureNote>
      <MeasureNote x={AN_MID_X} y={AN.y + 8} anchor="middle">
        {`${(BTN.h - 20) / 2}`}
      </MeasureNote>
      <MeasureNote x={AN_MID_X} y={AN.y + BTN.h - 4} anchor="middle">
        {`${(BTN.h - 20) / 2}`}
      </MeasureNote>

      <GripFrame x={AN.x} y={AN.y} w={BTN.w} h={BTN.h} />
      <MeasureH x1={AN.x} x2={AN.x + BTN.w} y={AN.y + BTN.h + 14} label={`${BTN.w}`} />
      <MeasureV
        x={AN.x - 18}
        y1={AN.y}
        y2={AN.y + BTN.h}
        label={`${BTN.h}`}
        labelXOffset={-6}
        labelAnchor="end"
      />
      <MeasureNote x={AN.x} y={AN.y - 8} anchor="start">
        {`r${BTN.r}`}
      </MeasureNote>
    </g>
  )
}

function LinesLayer() {
  return (
    <g strokeWidth="1" className="pointer-events-none">
      {Object.entries(PARTS).map(([id, part]) => (
        <OverlayLine
          key={id}
          id={id}
          x1={part.anchor.x}
          y1={part.anchor.y}
          x2={part.lineEnd.x}
          y2={part.lineEnd.y}
        />
      ))}
    </g>
  )
}

function TagsLayer() {
  return (
    <>
      {Object.entries(PARTS).map(([id, part]) => (
        <foreignObject
          key={id}
          x={part.badge.x}
          y={part.badge.y}
          width={part.badge.w}
          height={part.badge.h}
          className="pointer-events-none overflow-visible"
        >
          <AnatomyTag
            part={id}
            label={part.label}
            isAccent={part.accent}
            className={part.badge.align}
          />
        </foreignObject>
      ))}
    </>
  )
}

export function ButtonDiagram() {
  return (
    <AnatomyFrame
      viewBox="-22 -12 462 148"
      maxWidthClassName="max-w-lg"
      ariaLabel="Anatomy of the Button component"
    >
      <FocusRingShape />
      <RootShape />
      <LabelShape />
      <AnnotationsLayer />
      <LinesLayer />
      <TagsLayer />
    </AnatomyFrame>
  )
}

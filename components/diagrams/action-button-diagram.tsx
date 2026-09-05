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
  DRAFT_TEXT_SOFT,
  draftTheme,
  beat,
  MeasureH,
  MeasureV,
  MeasureNote,
  InsetGuide,
  GripFrame,
  squircleRectPath,
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

const BP_BTN = {
  w: 130,
  h: 44,
  r: 6,
  padX: 16,
  padY: 14,
  iconGap: 8,
  iconSize: 16,
  font: 14,
} as const
const BP_X = (220 - BP_BTN.w) / 2
const BP_Y = (140 - BP_BTN.h) / 2

export function ActionButtonBlueprint() {
  const theme = draftTheme
  const cy = BP_Y + BP_BTN.h / 2
  const iconX = BP_X + BP_BTN.padX
  const labelX = iconX + BP_BTN.iconSize + BP_BTN.iconGap

  return (
    <DraftSurface>
      <style>{`
        @keyframes bp-abtn-press {
          0% { transform: scale(1) translateY(0); }
          35% { transform: scale(0.97) translateY(1px); }
          100% { transform: scale(1) translateY(0); }
        }
        .blueprint .bp-abtn-press {
          transform-box: fill-box;
          transform-origin: center;
        }
        .group:hover .blueprint .bp-abtn-press,
        .group:focus-visible .blueprint .bp-abtn-press {
          animation: bp-abtn-press 450ms var(--motion-ease-in-out) 550ms both;
        }
        @media (prefers-reduced-motion: reduce) {
          .group:hover .blueprint .bp-abtn-press,
          .group:focus-visible .blueprint .bp-abtn-press {
            animation: none;
          }
        }
      `}</style>
      <g className="bp-abtn-press">
        <path
          d={squircleRectPath(BP_X, BP_Y, BP_BTN.w, BP_BTN.h, BP_BTN.r)}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1}
          strokeWidth={theme.wireframe.strokeWidth}
          strokeOpacity={theme.wireframe.strokeOpacity}
          style={beat(DRAFT_BEAT.outline)}
          className={`ink-draw ${DRAFT_FILL_SOLID}`}
        />
        <rect
          x={iconX}
          y={cy - BP_BTN.iconSize / 2}
          width={BP_BTN.iconSize}
          height={BP_BTN.iconSize}
          rx={2}
          stroke="currentColor"
          strokeWidth={1}
          style={beat(DRAFT_DETAIL_BEAT.a)}
          className="fade-note fill-current opacity-35 transition-opacity duration-(--motion-dur-base) ease-(--motion-ease-out) group-hover:opacity-0 group-hover:delay-(--motion-dur-base) group-focus-visible:opacity-0 group-focus-visible:delay-(--motion-dur-base) motion-reduce:transition-none"
        />
        <circle
          cx={iconX + BP_BTN.iconSize / 2}
          cy={cy}
          r={6}
          fill="none"
          stroke="var(--color-bg)"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeDasharray="4 3"
          className="animate-spin opacity-0 transition-opacity duration-(--motion-dur-base) ease-(--motion-ease-out) group-hover:opacity-100 group-hover:delay-(--motion-dur-base) group-focus-visible:opacity-100 group-focus-visible:delay-(--motion-dur-base) motion-reduce:transition-none motion-reduce:animate-none"
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        />
        <text
          x={labelX}
          y={cy + 5}
          fontSize={BP_BTN.font}
          fontWeight={500}
          fontFamily="var(--font-sans)"
          style={beat(DRAFT_LABEL_BEAT)}
          className={`fade-note ${DRAFT_TEXT_SOFT} group-hover:fill-(--color-bg) group-focus-visible:fill-(--color-bg)`}
        >
          Save
        </text>
      </g>

      <g className={DRAFT_SCAFFOLD_FADE}>
        <GripFrame x={BP_X} y={BP_Y} w={BP_BTN.w} h={BP_BTN.h} style={beat(DRAFT_BEAT.handle)} />
        <InsetGuide
          x={BP_X + BP_BTN.padX}
          y={BP_Y + BP_BTN.padY}
          w={BP_BTN.w - BP_BTN.padX * 2}
          h={BP_BTN.h - BP_BTN.padY * 2}
          offset={0.8}
          boxX={BP_X}
          boxY={BP_Y}
          boxW={BP_BTN.w}
          boxH={BP_BTN.h}
          boxRx={BP_BTN.r}
          clipOffset={0.8}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <MeasureNote
          x={BP_X + BP_BTN.padX / 2}
          y={cy + 2}
          anchor="middle"
          className="note-stamp"
          style={beat(stampBeat(2))}
        >
          16
        </MeasureNote>
        <MeasureNote
          x={iconX + BP_BTN.iconSize + BP_BTN.iconGap / 2}
          y={cy + 2}
          anchor="middle"
          className="note-stamp"
          style={beat(stampBeat(3))}
        >
          8
        </MeasureNote>
        <MeasureNote
          x={BP_X + BP_BTN.w / 2}
          y={BP_Y + 8}
          anchor="middle"
          className="note-stamp"
          style={beat(stampBeat(4))}
        >
          {`${BP_BTN.padY}`}
        </MeasureNote>
        <MeasureH
          x1={BP_X}
          x2={BP_X + BP_BTN.w}
          y={BP_Y - 12}
          label={`${BP_BTN.w}`}
          className="note-stamp"
          style={beat(stampBeat(1))}
        />
        <MeasureV
          x={BP_X - 12}
          y1={BP_Y}
          y2={BP_Y + BP_BTN.h}
          label={`${BP_BTN.h}`}
          labelXOffset={-6}
          className="note-stamp"
          style={beat(stampBeat(0))}
        />
      </g>
    </DraftSurface>
  )
}

const BTN = {
  w: 150,
  h: 44,
  r: 6,
} as const

const AN = { x: 100, y: 60 } as const
const AN_MID_X = AN.x + BTN.w / 2
const AN_MID_Y = AN.y + BTN.h / 2

function RootShape() {
  const { hovered, setHovered } = useAnatomy()
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
    />
  )
}

function IdleLayerShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('idle-layer')

  return (
    <g
      onMouseEnter={() => setHovered('idle-layer')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect x={AN.x + 12} y={AN.y + 8} width={126} height={28} fill="transparent" />
      <rect
        x={AN.x + 16}
        y={AN_MID_Y - 8}
        width={16}
        height={16}
        rx={2}
        stroke="currentColor"
        strokeWidth={hovered === 'idle-layer' ? 1.5 : 1}
        fill="none"
        opacity={0.6}
        className={spotlight.className}
      />
      <text
        x={AN.x + 40}
        y={AN_MID_Y + 5}
        fontSize={14}
        fontWeight={500}
        fontFamily="var(--font-sans)"
        className={`fill-current ${spotlight.className}`}
      >
        Save
      </text>
    </g>
  )
}

function PendingLayerShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('pending-layer')

  return (
    <g
      onMouseEnter={() => setHovered('pending-layer')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect
        x={AN.x + 4}
        y={AN.y + 4}
        width={BTN.w - 8}
        height={BTN.h - 8}
        rx={BTN.r - 2}
        fill="var(--bp-accent, var(--color-accent))"
        fillOpacity={hovered === 'pending-layer' ? 0.15 : 0.06}
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={hovered === 'pending-layer' ? 1.5 : 0.75}
        strokeDasharray="4 3"
        className={spotlight.className}
      />
      <circle
        cx={AN.x + 24}
        cy={AN_MID_Y}
        r={8}
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={1.5}
        strokeDasharray="8 6"
        fill="none"
        opacity={hovered === 'pending-layer' ? 0.9 : 0.5}
      />
    </g>
  )
}

function LiveRegionShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('live-region')

  return (
    <g
      onMouseEnter={() => setHovered('live-region')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect
        x={AN.x + 20}
        y={AN.y + BTN.h + 14}
        width={110}
        height={18}
        rx={3}
        stroke="currentColor"
        strokeWidth={hovered === 'live-region' ? 1.5 : 1}
        strokeDasharray="2 2"
        fill="none"
        opacity={hovered === 'live-region' ? 0.8 : 0.4}
        className={spotlight.className}
      />
      <text
        x={AN.x + 75}
        y={AN.y + BTN.h + 26}
        textAnchor="middle"
        fontSize={7}
        fontFamily="var(--font-mono)"
        opacity={hovered === 'live-region' ? 0.8 : 0.4}
        className={`fill-current ${spotlight.className}`}
      >
        aria-live=&quot;polite&quot;
      </text>
    </g>
  )
}

function SizingLayerShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('sizing')

  return (
    <g
      onMouseEnter={() => setHovered('sizing')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect
        x={AN.x + 6}
        y={AN.y + 6}
        width={BTN.w - 12}
        height={BTN.h - 12}
        rx={4}
        stroke="currentColor"
        strokeWidth={hovered === 'sizing' ? 1.2 : 0.8}
        strokeDasharray="6 2"
        fill="none"
        opacity={hovered === 'sizing' ? 0.7 : 0.3}
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
      <GripFrame x={AN.x} y={AN.y} w={BTN.w} h={BTN.h} />
      <MeasureH x1={AN.x} x2={AN.x + BTN.w} y={AN.y - 18} label={`${BTN.w}`} />
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
      <OverlayLine id="root" x1={AN.x + BTN.w} y1={AN_MID_Y} x2={320} y2={AN_MID_Y} />
      <OverlayLine id="idle-layer" x1={AN_MID_X} y1={AN.y + 6} x2={AN_MID_X} y2={22} />
      <OverlayLine id="pending-layer" x1={AN.x + BTN.w} y1={AN.y + BTN.h - 8} x2={320} y2={128} />
      <OverlayLine id="live-region" x1={AN.x + 75} y1={AN.y + BTN.h + 14} x2={40} y2={140} />
      <OverlayLine id="sizing" x1={AN.x} y1={AN_MID_Y} x2={30} y2={AN_MID_Y} />
    </g>
  )
}

function TagsLayer() {
  return (
    <>
      <foreignObject
        x={318}
        y={AN_MID_Y - 12}
        width={140}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part="root"
          label="Action.Root"
          className="items-center justify-start"
          isAccent
        />
      </foreignObject>
      <foreignObject
        x={AN_MID_X - 50}
        y={2}
        width={110}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part="idle-layer"
          label="Action.IdleLayer"
          className="items-end justify-center"
        />
      </foreignObject>
      <foreignObject
        x={318}
        y={116}
        width={150}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part="pending-layer"
          label="Action.PendingLayer"
          className="items-center justify-start"
          isAccent
        />
      </foreignObject>
      <foreignObject
        x={-10}
        y={128}
        width={140}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part="live-region"
          label="Action.LiveRegion"
          className="items-center justify-end"
        />
      </foreignObject>
      <foreignObject
        x={-10}
        y={AN_MID_Y - 12}
        width={130}
        height={24}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="sizing" label="Action.Sizer" className="items-center justify-end" />
      </foreignObject>
    </>
  )
}

export function ActionButtonDiagram() {
  return (
    <AnatomyFrame viewBox="-20 -4 510 170" maxWidthClassName="max-w-lg">
      <RootShape />
      <SizingLayerShape />
      <IdleLayerShape />
      <PendingLayerShape />
      <LiveRegionShape />
      <AnnotationsLayer />
      <LinesLayer />
      <TagsLayer />
    </AnatomyFrame>
  )
}

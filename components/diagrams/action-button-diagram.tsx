'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset, licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root LICENSE.

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
  DRAFT_LABEL_BEAT,
  stampBeat,
} from '@/components/diagrams/lib/diagram-parts'
import {
  AnatomyFrame,
  AnatomyCallout,
  useAnatomy,
  useSpotlight,
} from '@/components/diagrams/lib/anatomy-parts'

const BP_BTN = {
  w: 112,
  h: 44,
  r: 4,
  padX: 16,
  gap: 8,
  iconSize: 16,
  spinnerR: 6.67,
  font: 14,
} as const
const BP_X = (220 - BP_BTN.w) / 2
const BP_Y = (140 - BP_BTN.h) / 2
const BP_CX = BP_X + BP_BTN.w / 2
const BP_CY = BP_Y + BP_BTN.h / 2
const BP_TEXT_Y = BP_CY + BP_BTN.font * 0.35
const BP_PENDING_X = BP_X + BP_BTN.padX
const BP_LINE_H = 20
const BP_CONTENT_INSET = (BP_BTN.h - BP_LINE_H) / 2

export function ActionButtonBlueprint() {
  const theme = draftTheme
  const spinnerCx = BP_PENDING_X + BP_BTN.iconSize / 2

  return (
    <DraftSurface>
      <style>{`
        @keyframes bp-abtn-press {
          0% { transform: scale(1); }
          35% { transform: scale(0.97); }
          100% { transform: scale(1); }
        }
        .blueprint .bp-abtn-press,
        .blueprint .bp-abtn-layer {
          transform-box: fill-box;
          transform-origin: center;
        }
        .blueprint .bp-abtn-layer {
          transition-property: opacity, transform, filter;
          transition-duration: var(--motion-dur-base);
          transition-timing-function: var(--motion-ease-in-out);
        }
        .blueprint .bp-abtn-pending {
          opacity: 0;
          transform: scale(0.95);
          filter: blur(1px);
        }
        .group:hover .blueprint .bp-abtn-press,
        .group:focus-visible .blueprint .bp-abtn-press {
          animation: bp-abtn-press 450ms var(--motion-ease-in-out) 550ms both;
        }
        .group:hover .blueprint .bp-abtn-layer,
        .group:focus-visible .blueprint .bp-abtn-layer {
          transition-delay: var(--motion-dur-showcase);
        }
        .group:hover .blueprint .bp-abtn-idle,
        .group:focus-visible .blueprint .bp-abtn-idle {
          opacity: 0;
          transform: scale(0.95);
          filter: blur(1px);
        }
        .group:hover .blueprint .bp-abtn-pending,
        .group:focus-visible .blueprint .bp-abtn-pending {
          opacity: 1;
          transform: scale(1);
          filter: none;
        }
        @media (prefers-reduced-motion: reduce) {
          .group:hover .blueprint .bp-abtn-press,
          .group:focus-visible .blueprint .bp-abtn-press {
            animation: none;
          }
          .blueprint .bp-abtn-layer {
            transition: none;
            transform: none;
            filter: none;
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
        <g className="bp-abtn-layer bp-abtn-idle">
          <text
            x={BP_CX}
            y={BP_TEXT_Y}
            textAnchor="middle"
            fontSize={BP_BTN.font}
            fontFamily="var(--font-sans)"
            style={beat(DRAFT_LABEL_BEAT)}
            className={`fade-note ${DRAFT_TEXT_SOFT} group-hover:fill-(--color-bg) group-focus-visible:fill-(--color-bg)`}
          >
            Save
          </text>
        </g>
        <g className="bp-abtn-layer bp-abtn-pending">
          <circle
            cx={spinnerCx}
            cy={BP_CY}
            r={BP_BTN.spinnerR}
            fill="none"
            stroke="var(--color-bg)"
            strokeWidth={1.5}
            strokeOpacity={0.25}
          />
          <circle
            cx={spinnerCx}
            cy={BP_CY}
            r={BP_BTN.spinnerR}
            fill="none"
            stroke="var(--color-bg)"
            strokeWidth={1.5}
            strokeLinecap="round"
            pathLength={4}
            strokeDasharray="1 3"
            className="animate-spin motion-reduce:animate-none"
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />
          <text
            x={BP_PENDING_X + BP_BTN.iconSize + BP_BTN.gap}
            y={BP_TEXT_Y}
            fontSize={BP_BTN.font}
            fontFamily="var(--font-sans)"
            fill="var(--color-bg)"
          >
            Saving…
          </text>
        </g>
      </g>

      <g className={DRAFT_SCAFFOLD_FADE}>
        <GripFrame x={BP_X} y={BP_Y} w={BP_BTN.w} h={BP_BTN.h} style={beat(DRAFT_BEAT.handle)} />
        <InsetGuide
          x={BP_X + BP_BTN.padX}
          y={BP_Y}
          w={BP_BTN.w - BP_BTN.padX * 2}
          h={BP_BTN.h}
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
          className="note-stamp"
          style={beat(stampBeat(0))}
        />
        <MeasureH
          x1={BP_X}
          x2={BP_X + BP_BTN.padX}
          y={BP_Y + BP_BTN.h + 10}
          label={`${BP_BTN.padX}`}
          labelYOffset={10}
          className="note-stamp"
          style={beat(stampBeat(2))}
        />
        <MeasureH
          x1={BP_PENDING_X + BP_BTN.iconSize}
          x2={BP_PENDING_X + BP_BTN.iconSize + BP_BTN.gap}
          y={BP_Y + BP_BTN.h + 10}
          label={`${BP_BTN.gap}`}
          labelYOffset={10}
          className="note-stamp"
          style={beat(stampBeat(3))}
        />
        <MeasureV
          x={BP_X + BP_BTN.w + 12}
          y1={BP_Y}
          y2={BP_Y + BP_CONTENT_INSET}
          label={`${BP_CONTENT_INSET}`}
          labelXOffset={5}
          labelAnchor="start"
          className="note-stamp"
          style={beat(stampBeat(4))}
        />
      </g>
    </DraftSurface>
  )
}

const BTN = {
  w: 112,
  h: 44,
  r: 4,
  padX: 16,
  lineH: 20,
  spinnerR: 6.67,
} as const

const MID_X = BTN.w / 2
const MID_Y = BTN.h / 2
const SIZER = { x: BTN.padX, y: MID_Y - BTN.lineH / 2, w: BTN.w - BTN.padX * 2, h: BTN.lineH }
const PENDING_INSET = 2
const LIVE = { x: 10, y: 80, w: BTN.w - 20, h: 18 }
const LEFT_LANE = -14

function RootShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('root')

  return (
    <rect
      x={0}
      y={0}
      width={BTN.w}
      height={BTN.h}
      rx={BTN.r}
      stroke="currentColor"
      strokeWidth={hovered === 'root' ? 2 : draftTheme.wireframe.strokeWidth}
      fill={hovered === 'root' ? 'currentColor' : 'transparent'}
      fillOpacity={hovered === 'root' ? 0.1 : 0}
      className={`cursor-pointer squircle-corners ${spotlight.className}`}
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
      <rect x={MID_X - 20} y={MID_Y - 8} width={40} height={16} fill="transparent" />
      <text
        x={MID_X}
        y={MID_Y + 5}
        fontSize={14}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        opacity={hovered === 'idle-layer' ? 1 : 0.8}
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
        x={PENDING_INSET}
        y={PENDING_INSET}
        width={BTN.w - PENDING_INSET * 2}
        height={BTN.h - PENDING_INSET * 2}
        rx={BTN.r - 1}
        fill="var(--bp-accent, var(--color-accent))"
        fillOpacity={hovered === 'pending-layer' ? 0.15 : 0.06}
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={hovered === 'pending-layer' ? 1.5 : 0.75}
        strokeDasharray="4 3"
        className={spotlight.className}
      />
      <circle
        cx={BTN.padX + 8}
        cy={MID_Y}
        r={BTN.spinnerR}
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={1.67}
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
        x={LIVE.x}
        y={LIVE.y}
        width={LIVE.w}
        height={LIVE.h}
        rx={4}
        stroke="currentColor"
        strokeWidth={hovered === 'live-region' ? 1.5 : 1}
        strokeDasharray="2 2"
        fill="none"
        opacity={hovered === 'live-region' ? 0.8 : 0.4}
        className={spotlight.className}
      />
      <text
        x={LIVE.x + LIVE.w / 2}
        y={LIVE.y + 12}
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
        x={SIZER.x}
        y={SIZER.y}
        width={SIZER.w}
        height={SIZER.h}
        rx={2}
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
      <GripFrame x={0} y={0} w={BTN.w} h={BTN.h} />
      <MeasureH x1={0} x2={BTN.w} y={BTN.h + 12} label={`${BTN.w}`} labelYOffset={11} />
      <MeasureV
        x={BTN.w + 8}
        y1={0}
        y2={BTN.h}
        label={`${BTN.h}`}
        labelXOffset={5}
        labelAnchor="start"
      />
      <MeasureNote x={0} y={-8} anchor="start">
        {`r${BTN.r}`}
      </MeasureNote>
    </g>
  )
}

function Callouts() {
  return (
    <>
      <AnatomyCallout
        part="idle-layer"
        label="Idle layer"
        anchor={[MID_X, MID_Y - 5]}
        side="top"
        distance={MID_Y - 5 + 24}
        measure="inset 0 · gap 8 · text 14"
        caption="Idle content. Shows idleLabel and idleIcon until clicked."
      />
      <AnatomyCallout
        part="root"
        label="Root"
        anchor={[BTN.w, 8]}
        side="end"
        distance={24}
        isAccent
        measure={`${BTN.w} × ${BTN.h} · r${BTN.r} · px ${BTN.padX}`}
        caption="Button root. Disabled and aria-busy while onAction is pending."
      />
      <AnatomyCallout
        part="pending-layer"
        label="Pending layer"
        anchor={[BTN.w - PENDING_INSET, BTN.h - 6]}
        side="end"
        distance={24 + PENDING_INSET}
        isAccent
        measure="inset 0 · spinner 16 · scale 0.95 to 1"
        caption="Crossfades in with opacity, scale and 1px blur while pending."
      />
      <AnatomyCallout
        part="sizing"
        label="Sizer"
        anchor={[SIZER.x, MID_Y]}
        side="start"
        distance={SIZER.x - LEFT_LANE}
        measure={`${SIZER.w} × ${SIZER.h} · invisible grid stack`}
        caption="Stacks every state label so the widest one fixes the width."
      />
      <AnatomyCallout
        part="live-region"
        label="Live region"
        anchor={[LIVE.x, LIVE.y + LIVE.h / 2]}
        side="start"
        distance={LIVE.x - LEFT_LANE}
        measure="sr-only · role status · polite"
        caption="Announces each state from the announcements prop."
      />
    </>
  )
}

export function ActionButtonDiagram() {
  return (
    <AnatomyFrame
      viewBox="-112 -60 358 174"
      ariaLabel="Action button anatomy: root, sizer, idle layer, pending layer and live region"
    >
      <RootShape />
      <SizingLayerShape />
      <IdleLayerShape />
      <PendingLayerShape />
      <LiveRegionShape />
      <AnnotationsLayer />
      <Callouts />
    </AnatomyFrame>
  )
}

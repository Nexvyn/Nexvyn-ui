'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset -- licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root LICENSE.

import { type CSSProperties, useId } from 'react'
import {
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
} from '@/components/diagrams/lib/diagram-parts'
import {
  AnatomyCallout,
  AnatomyFrame,
  useAnatomy,
  useSpotlight,
} from '@/components/diagrams/lib/anatomy-parts'

const BP_W = 176
const BP_DIM_LANE = 20
const BP_TRACK = {
  x: (220 - BP_W - BP_DIM_LANE) / 2 + BP_DIM_LANE,
  y: 42,
  w: BP_W,
  h: 40,
  rx: 4,
} as const
const BP_BAR_BOX = 16
const BP_BAR = { w: 4, h: 20 } as const
const BP_BAR_INSET_Y = (BP_TRACK.h - BP_BAR.h) / 2
const BP_PAD_X = 14
const BP_FONT = 14
const BP_VALUE_REST = 50
const BP_VALUE_HOVER = 67
const BP_FILL_REST = (BP_VALUE_REST / 100) * BP_TRACK.w
const BP_TRAVEL = ((BP_VALUE_HOVER - BP_VALUE_REST) / 100) * BP_TRACK.w
const BP_MID_Y = BP_TRACK.y + BP_TRACK.h / 2
const BP_BASELINE = BP_MID_Y + BP_FONT * 0.35
const BP_BAR_CX = BP_TRACK.x + BP_FILL_REST - BP_BAR_BOX / 2

const BP_SLIDE =
  'transition-transform duration-(--motion-dur-slow) ease-(--motion-ease-in-out) group-hover:translate-x-(--fader-bp-travel) group-hover:delay-(--motion-dur-base) group-focus-visible:translate-x-(--fader-bp-travel) group-focus-visible:delay-(--motion-dur-base) motion-reduce:transition-none motion-reduce:transform-none'

export function FaderBlueprint() {
  const theme = draftTheme
  const uid = useId().replace(/:/g, '')
  const hatchId = `bp-fader-hatch-${uid}`
  const clipId = `bp-fader-clip-${uid}`
  const travelStyle = { '--fader-bp-travel': `${BP_TRAVEL}px` } as CSSProperties
  return (
    <DraftSurface>
      <defs>
        <pattern
          id={hatchId}
          patternUnits="userSpaceOnUse"
          width="4"
          height="4"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="4" stroke="currentColor" strokeWidth="1" opacity={0.35} />
        </pattern>
        <clipPath id={clipId}>
          <rect
            x={BP_TRACK.x}
            y={BP_TRACK.y}
            width={BP_TRACK.w}
            height={BP_TRACK.h}
            rx={BP_TRACK.rx}
          />
        </clipPath>
      </defs>
      <rect
        x={BP_TRACK.x}
        y={BP_TRACK.y}
        width={BP_TRACK.w}
        height={BP_TRACK.h}
        rx={BP_TRACK.rx}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        style={beat(DRAFT_BEAT.outline)}
        className={`ink-draw ${DRAFT_INK_MORPH} fill-transparent stroke-current group-hover:fill-(--color-surface-2) group-focus-visible:fill-(--color-surface-2) group-hover:stroke-(--color-border) group-focus-visible:stroke-(--color-border)`}
      />
      <g clipPath={`url(#${clipId})`}>
        <g style={travelStyle} className={BP_SLIDE}>
          <rect
            x={BP_TRACK.x + BP_FILL_REST - BP_TRACK.w}
            y={BP_TRACK.y}
            width={BP_TRACK.w}
            height={BP_TRACK.h}
            rx={BP_TRACK.rx}
            fill={`url(#${hatchId})`}
            style={beat(DRAFT_BEAT.hatch)}
            className={`fade-note ${DRAFT_INK_MORPH} opacity-100 group-hover:opacity-0 group-focus-visible:opacity-0`}
          />
          <rect
            x={BP_TRACK.x + BP_FILL_REST - BP_TRACK.w}
            y={BP_TRACK.y}
            width={BP_TRACK.w}
            height={BP_TRACK.h}
            rx={BP_TRACK.rx}
            strokeWidth={1}
            fillOpacity={0.4}
            strokeOpacity={0.3}
            className={`${DRAFT_INK_MORPH} fill-(--color-muted) stroke-(--color-muted) opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100`}
          />
        </g>
      </g>
      <g style={travelStyle} className={BP_SLIDE}>
        <rect
          x={BP_BAR_CX - BP_BAR.w / 2}
          y={BP_MID_Y - BP_BAR.h / 2}
          width={BP_BAR.w}
          height={BP_BAR.h}
          rx={BP_BAR.w / 2}
          style={{
            transformOrigin: `${BP_BAR_CX}px ${BP_MID_Y}px`,
            ...beat(DRAFT_DETAIL_BEAT.c),
          }}
          className="fade-note fill-(--color-muted) opacity-85 transition-[opacity,transform] duration-(--motion-dur-slow) ease-(--motion-ease-in-out) group-hover:scale-y-120 group-hover:opacity-100 group-hover:delay-(--motion-dur-base) group-focus-visible:scale-y-120 group-focus-visible:opacity-100 group-focus-visible:delay-(--motion-dur-base) motion-reduce:transition-none motion-reduce:transform-none"
        />
      </g>
      <text
        x={BP_TRACK.x + BP_PAD_X}
        y={BP_BASELINE}
        fontSize={BP_FONT}
        fontFamily="var(--font-sans)"
        style={beat(DRAFT_LABEL_BEAT)}
        className={`fade-note ${DRAFT_TEXT_SOFT}`}
      >
        Volume
      </text>
      <text
        x={BP_TRACK.x + BP_TRACK.w - BP_PAD_X}
        y={BP_BASELINE}
        textAnchor="end"
        fontSize={BP_FONT}
        fontFamily="var(--font-sans)"
        style={beat(DRAFT_LABEL_ALT_BEAT)}
        className={`fade-note ${DRAFT_INK_MORPH} fill-current opacity-35 tabular-nums group-hover:opacity-0 group-focus-visible:opacity-0`}
      >
        {BP_VALUE_REST}
        <tspan className="fill-(--color-muted)">%</tspan>
      </text>
      <text
        x={BP_TRACK.x + BP_TRACK.w - BP_PAD_X}
        y={BP_BASELINE}
        textAnchor="end"
        fontSize={BP_FONT}
        fontFamily="var(--font-sans)"
        className={`${DRAFT_INK_MORPH} fill-current opacity-0 tabular-nums group-hover:opacity-100 group-focus-visible:opacity-100`}
      >
        {BP_VALUE_HOVER}
        <tspan className="fill-(--color-muted)">%</tspan>
      </text>
      <g className={DRAFT_SCAFFOLD_FADE}>
        <InsetGuide
          x={BP_TRACK.x + BP_PAD_X}
          y={BP_TRACK.y}
          w={BP_TRACK.w - BP_PAD_X * 2}
          h={BP_TRACK.h}
          offset={0.8}
          boxX={BP_TRACK.x}
          boxY={BP_TRACK.y}
          boxW={BP_TRACK.w}
          boxH={BP_TRACK.h}
          boxRx={BP_TRACK.rx}
          clipOffset={0.8}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <GripFrame
          x={BP_TRACK.x}
          y={BP_TRACK.y}
          w={BP_TRACK.w}
          h={BP_TRACK.h}
          style={beat(DRAFT_BEAT.handle)}
        />
        <MeasureNote
          x={BP_TRACK.x}
          y={BP_TRACK.y - 6}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(0))}
        >
          {`r${BP_TRACK.rx}`}
        </MeasureNote>
        <MeasureNote
          x={BP_BAR_CX}
          y={BP_TRACK.y - 6}
          className="note-stamp"
          style={beat(stampBeat(1))}
        >
          {`${BP_BAR_INSET_Y}`}
        </MeasureNote>
        <MeasureNote
          x={BP_TRACK.x + BP_TRACK.w - BP_PAD_X / 2}
          y={BP_TRACK.y - 6}
          className="note-stamp"
          style={beat(stampBeat(2))}
        >
          {`${BP_PAD_X}`}
        </MeasureNote>
        <MeasureNote
          x={BP_TRACK.x + BP_PAD_X / 2}
          y={BP_TRACK.y + BP_TRACK.h + 10}
          className="note-stamp"
          style={beat(stampBeat(3))}
        >
          {`${BP_PAD_X}`}
        </MeasureNote>
        <MeasureNote
          x={BP_BAR_CX}
          y={BP_TRACK.y + BP_TRACK.h + 10}
          className="note-stamp"
          style={beat(stampBeat(4))}
        >
          {`${BP_BAR_INSET_Y}`}
        </MeasureNote>
        <MeasureNote
          x={BP_BAR_CX + 11}
          y={BP_TRACK.y + BP_TRACK.h + 10}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(5))}
        >
          {`bar ${BP_BAR.w}x${BP_BAR.h}`}
        </MeasureNote>
        <MeasureV
          x={BP_TRACK.x - 8}
          y1={BP_TRACK.y}
          y2={BP_TRACK.y + BP_TRACK.h}
          label={`${BP_TRACK.h}`}
          labelXOffset={-4}
          className="note-stamp"
          style={beat(stampBeat(6))}
        />
        <MeasureH
          x1={BP_TRACK.x}
          x2={BP_TRACK.x + BP_TRACK.w}
          y={BP_TRACK.y + BP_TRACK.h + 24}
          label="w-full"
          className="note-stamp"
          style={beat(stampBeat(7))}
        />
      </g>
    </DraftSurface>
  )
}

const AN = {
  x: 0,
  y: 0,
  w: 240,
  h: 40,
  rx: 4,
  fillW: 156,
  barBox: 16,
  barW: 4,
  barH: 20,
  thumbW: 20,
  thumbH: 32,
  padX: 14,
  font: 14,
} as const

const AN_MID_Y = AN.y + AN.h / 2
const AN_BAR_X = AN.x + AN.fillW - AN.barBox / 2 - AN.barW / 2
const AN_BAR_Y = AN_MID_Y - AN.barH / 2
const AN_THUMB = {
  x: AN.x + AN.fillW - AN.thumbW / 2,
  y: AN_MID_Y - AN.thumbH / 2,
  w: AN.thumbW,
  h: AN.thumbH,
} as const

function useEngaged(id: string) {
  const { hovered, pinned } = useAnatomy()
  return (hovered ?? pinned) === id
}

function AnatomyTrack() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight(['root', 'track'])
  const isRoot = useEngaged('root')
  const isTrack = useEngaged('track')

  return (
    <rect
      x={AN.x}
      y={AN.y}
      width={AN.w}
      height={AN.h}
      rx={AN.rx}
      stroke="currentColor"
      strokeWidth={isRoot ? 2 : draftTheme.wireframe.strokeWidth}
      fill="currentColor"
      fillOpacity={isRoot ? 0.03 : isTrack ? 0.1 : 0}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ ...spotlight.style, pointerEvents: 'all' }}
      onMouseEnter={() => setHovered('track')}
      onMouseLeave={() => setHovered(null)}
    />
  )
}

function AnatomyFill() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('fill')
  const active = useEngaged('fill')

  return (
    <rect
      x={AN.x}
      y={AN.y}
      width={AN.fillW}
      height={AN.h}
      rx={AN.rx}
      stroke="currentColor"
      strokeWidth={1}
      fill={active ? 'currentColor' : 'url(#bp-anatomy-hatch)'}
      className={`cursor-pointer ${active ? 'text-(--color-fg)' : ''} ${spotlight.className}`}
      style={{ ...spotlight.style, pointerEvents: 'all' }}
      onMouseEnter={() => setHovered('fill')}
      onMouseLeave={() => setHovered(null)}
    />
  )
}

function AnatomyThumb() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('thumb')
  const active = useEngaged('thumb')

  return (
    <g
      onMouseEnter={() => setHovered('thumb')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect x={AN_BAR_X - 4} y={AN_BAR_Y} width={AN.barW + 8} height={AN.barH} fill="transparent" />
      <rect
        x={AN_BAR_X}
        y={AN_BAR_Y}
        width={AN.barW}
        height={AN.barH}
        rx={AN.barW / 2}
        stroke="currentColor"
        strokeWidth={active ? 1.25 : draftTheme.wireframe.strokeWidth}
        fill={active ? 'currentColor' : 'var(--color-bg)'}
        className={`${active ? 'text-(--color-fg)' : ''} ${spotlight.className}`}
      />
    </g>
  )
}

function AnatomyTexts() {
  const fillActive = useEngaged('fill')
  const trackActive = useEngaged('track')
  const fillSpot = useSpotlight('fill', { defaultOpacity: 70 })
  const trackSpot = useSpotlight('track', { defaultOpacity: 70 })
  const baseline = AN_MID_Y + AN.font * 0.35

  return (
    <>
      <text
        x={AN.x + AN.padX}
        y={baseline}
        fontSize={AN.font}
        fontFamily="var(--font-sans)"
        style={{ pointerEvents: 'none', ...fillSpot.style }}
        className={`${fillActive ? 'fill-(--color-bg)' : 'fill-current'} ${fillSpot.className}`}
      >
        Volume
      </text>
      <text
        x={AN.x + AN.w - AN.padX}
        y={baseline}
        textAnchor="end"
        fontSize={AN.font}
        fontFamily="var(--font-sans)"
        style={{ pointerEvents: 'none', ...trackSpot.style }}
        className={`${trackActive ? 'fill-(--color-fg)' : 'fill-current'} tabular-nums ${trackSpot.className}`}
      >
        65%
      </text>
    </>
  )
}

function AnatomyBackground() {
  const { hovered, pinned } = useAnatomy()
  const dimmed = (hovered ?? pinned) !== null

  return (
    <g
      style={{
        pointerEvents: 'none',
        filter: dimmed ? 'url(#spotlight-blur)' : 'none',
      }}
      className={`transition-[opacity,filter] duration-(--motion-dur-base) ease-(--motion-ease-in-out) motion-reduce:transition-none motion-reduce:filter-none ${dimmed ? 'opacity-30' : 'opacity-100'}`}
    >
      <InsetGuide
        x={AN.x + AN.padX}
        y={AN.y}
        w={AN.w - AN.padX * 2}
        h={AN.h}
        offset={0.8}
        boxX={AN.x}
        boxY={AN.y}
        boxW={AN.w}
        boxH={AN.h}
        boxRx={AN.rx}
        clipOffset={0.8}
      />
      <MeasureNote x={AN.x + AN.padX / 2} y={AN.y + AN.h - 4}>
        {`${AN.padX}`}
      </MeasureNote>
      <MeasureNote x={AN.x + AN.w - AN.padX / 2} y={AN.y + AN.h - 4}>
        {`${AN.padX}`}
      </MeasureNote>
      <GripFrame x={AN.x} y={AN.y} w={AN.w} h={AN.h} />
      <MeasureV x={AN.x - 12} y1={AN.y} y2={AN.y + AN.h} label={`${AN.h}`} labelXOffset={-6} />
    </g>
  )
}

function AnatomyInteractionZone() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('interaction', { isInteraction: true })
  const active = useEngaged('interaction')

  return (
    <rect
      x={AN_THUMB.x}
      y={AN_THUMB.y}
      width={AN_THUMB.w}
      height={AN_THUMB.h}
      rx={AN.rx}
      stroke="var(--bp-accent, var(--color-accent))"
      strokeWidth={1}
      strokeDasharray={active ? 'none' : '2 2'}
      className={`cursor-pointer ${active ? 'fill-(--color-fg)' : 'fill-transparent'} ${spotlight.className}`}
      style={{
        pointerEvents: 'all',
        fillOpacity: active ? 0.1 : 0,
        ...spotlight.style,
      }}
      onMouseEnter={() => setHovered('interaction')}
      onMouseLeave={() => setHovered(null)}
    />
  )
}

function AnatomyCallouts() {
  return (
    <>
      <AnatomyCallout
        part="fill"
        label="Fill"
        anchor={[AN.x + 40, AN.y]}
        side="top"
        distance={24}
        isAccent
        measure={`${AN.fillW} × ${AN.h} · 65% · rounded-md`}
        caption="Fill whose edge is the reading. Stretches elastically on overdrag."
      />
      <AnatomyCallout
        part="interaction"
        label="Thumb hit area"
        anchor={[AN_THUMB.x + AN_THUMB.w / 2, AN_THUMB.y]}
        side="top"
        distance={AN_THUMB.y - AN.y + 24}
        isAccent
        measure={`${AN.thumbW} × ${AN.thumbH} · Slider.Thumb`}
        caption="Focusable thumb. Arrows step, PageUp and PageDown take big steps."
      />
      <AnatomyCallout
        part="root"
        label="Fader.Root"
        anchor={[AN.x + 30, AN.y + AN.h]}
        side="bottom"
        distance={24}
        measure={`w-full × ${AN.h} · size md`}
        caption="Slider root, controlled through value and onValueChange."
      />
      <AnatomyCallout
        part="thumb"
        label="Grab bar"
        anchor={[AN_BAR_X + AN.barW / 2, AN_BAR_Y + AN.barH]}
        side="bottom"
        distance={AN.y + AN.h + 24 - (AN_BAR_Y + AN.barH)}
        measure={`${AN.barW} × ${AN.barH} · rounded-full`}
        caption="Grab signifier riding the fill edge, centered 8px inside it."
      />
      <AnatomyCallout
        part="track"
        label="Fader.Track"
        anchor={[AN.x + AN.w, AN_MID_Y]}
        side="end"
        distance={24}
        measure={`w-full × ${AN.h} · rounded-md · px-3.5`}
        caption="Clickable track that holds the label and value readout."
      />
    </>
  )
}

export function FaderAnatomy() {
  return (
    <AnatomyFrame viewBox="-40 -60 402 160" ariaLabel="Fader anatomy">
      <AnatomyTrack />
      <AnatomyFill />
      <AnatomyThumb />
      <AnatomyTexts />
      <AnatomyBackground />
      <AnatomyInteractionZone />
      <AnatomyCallouts />
    </AnatomyFrame>
  )
}

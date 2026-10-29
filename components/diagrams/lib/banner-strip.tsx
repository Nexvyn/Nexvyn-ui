'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset, licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root LICENSE.

import { useId } from 'react'
import {
  DraftSurface,
  DRAFT_FILL_SOLID,
  DRAFT_INK_MORPH,
  DRAFT_SCAFFOLD_FADE,
  DRAFT_TEXT_SOFT,
  draftTheme,
  MeasureH,
  MeasureNote,
  MeasureV,
  InsetGuide,
  GripFrame,
  beat,
  DRAFT_BEAT,
  DRAFT_LABEL_BEAT,
  stampBeat,
} from '@/components/diagrams/lib/diagram-parts'

export const STRIP = {
  w: 180,
  h: 44,
  ps: 16,
  pe: 48,
  py: 12,
  lineH: 20,
  close: 32,
  closeInset: 8,
  font: 12,
  tagH: 20,
  tagPx: 6,
  tagR: 4,
  tagFont: 9,
  tagGap: 8,
  icon: 16,
  iconGap: 8,
  linkGap: 4,
} as const

const LANE = 18
export const BP_X = (220 - STRIP.w - LANE) / 2 + LANE
export const BP_Y = (140 - STRIP.h) / 2
const CONTENT_X = BP_X + STRIP.ps
const CONTENT_W = STRIP.w - STRIP.ps - STRIP.pe
const CONTENT_CX = CONTENT_X + CONTENT_W / 2
const BASELINE = BP_Y + STRIP.h / 2 + STRIP.font * 0.35
const CHAR = STRIP.font * 0.55
const CLOSE_X = BP_X + STRIP.w - STRIP.closeInset - STRIP.close
const CLOSE_Y = BP_Y + (STRIP.h - STRIP.close) / 2
const NOTE_Y = BP_Y + STRIP.h + 16

export type StripKind = 'filled' | 'outline' | 'tagged' | 'notice'

const TEXT_ON_SOLID = `${DRAFT_TEXT_SOFT} group-hover:fill-(--color-bg) group-focus-visible:fill-(--color-bg)`
const INK_ON_SOLID = `${DRAFT_INK_MORPH} stroke-current group-hover:stroke-(--color-bg) group-focus-visible:stroke-(--color-bg)`
const INK_SOFT = `${DRAFT_INK_MORPH} stroke-current opacity-35 group-hover:opacity-100 group-focus-visible:opacity-100`
const OUTLINE_SIDES = `${DRAFT_INK_MORPH} fill-transparent stroke-current group-hover:stroke-transparent group-focus-visible:stroke-transparent`
const OUTLINE_BOTTOM = `${DRAFT_INK_MORPH} stroke-current group-hover:stroke-(--color-border) group-focus-visible:stroke-(--color-border)`

const PRESS_CSS = `
  @keyframes bp-banner-press {
    0% { transform: scale(1); }
    40% { transform: scale(0.97); }
    100% { transform: scale(1); }
  }
  .blueprint .bp-banner-press { transform-box: fill-box; transform-origin: center; }
  .group:hover .blueprint .bp-banner-press,
  .group:focus-visible .blueprint .bp-banner-press {
    animation: bp-banner-press 450ms var(--motion-ease-in-out) 650ms both;
  }
  @media (prefers-reduced-motion: reduce) {
    .group:hover .blueprint .bp-banner-press,
    .group:focus-visible .blueprint .bp-banner-press { animation: none; }
  }
`

function Text({ x, children, solid }: { x: number; children: string; solid: boolean }) {
  return (
    <text
      x={x}
      y={BASELINE}
      fontSize={STRIP.font}
      fontFamily="var(--font-sans)"
      style={beat(DRAFT_LABEL_BEAT)}
      className={`fade-note ${solid ? TEXT_ON_SOLID : DRAFT_TEXT_SOFT}`}
    >
      {children}
    </text>
  )
}

function Link({ x, label, solid }: { x: number; label: string; solid: boolean }) {
  return (
    <>
      <Text x={x} solid={solid}>
        {label}
      </Text>
      <path
        d={`M${x} ${BASELINE + 2.5} H${x + label.length * CHAR}`}
        strokeWidth={0.75}
        style={beat(DRAFT_LABEL_BEAT)}
        className={`fade-note ${solid ? INK_ON_SOLID : INK_SOFT}`}
      />
    </>
  )
}

function inlineWidth(kind: StripKind, message: string, link: string) {
  const text = message.length * CHAR + STRIP.linkGap + link.length * CHAR
  if (kind === 'tagged') {
    const tagW = STRIP.tagPx * 2 + 3 * STRIP.tagFont * 0.55
    return tagW + STRIP.tagGap + text + 10
  }
  if (kind === 'notice') return STRIP.icon + STRIP.iconGap + message.length * CHAR
  return text
}

export function BannerStripBlueprint({
  kind,
  message,
  link,
  note,
}: {
  kind: StripKind
  message: string
  link: string
  note: string
}) {
  const theme = draftTheme
  const hatchId = `bp-hatch-banner-${useId().replace(/:/g, '')}`
  const solid = kind === 'filled'
  let x = CONTENT_CX - inlineWidth(kind, message, link) / 2

  const parts = []
  if (kind === 'tagged') {
    const tagW = STRIP.tagPx * 2 + 3 * STRIP.tagFont * 0.55
    const tagY = BP_Y + (STRIP.h - STRIP.tagH) / 2
    parts.push(
      <g key="tag">
        <rect
          x={x}
          y={tagY}
          width={tagW}
          height={STRIP.tagH}
          rx={STRIP.tagR}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1}
          strokeWidth={theme.wireframe.strokeWidth}
          style={beat(DRAFT_BEAT.anatomy)}
          className={`ink-draw ${DRAFT_INK_MORPH} fill-transparent stroke-current group-hover:stroke-(--color-border-strong) group-focus-visible:stroke-(--color-border-strong)`}
        />
        <text
          x={x + tagW / 2}
          y={tagY + STRIP.tagH / 2 + STRIP.tagFont * 0.35}
          textAnchor="middle"
          fontSize={STRIP.tagFont}
          fontFamily="var(--font-sans)"
          style={beat(DRAFT_LABEL_BEAT)}
          className={`fade-note ${DRAFT_TEXT_SOFT}`}
        >
          New
        </text>
      </g>,
    )
    x += tagW + STRIP.tagGap
  }
  if (kind === 'notice') {
    const cx = x + STRIP.icon / 2
    parts.push(
      <g
        key="icon"
        strokeWidth={1.25}
        strokeLinecap="round"
        style={beat(DRAFT_BEAT.anatomy)}
        className={`fade-note ${INK_SOFT}`}
      >
        <circle cx={cx} cy={BP_Y + STRIP.h / 2} r={6.5} />
        <path d={`M${cx} ${BP_Y + STRIP.h / 2 - 0.5} V${BP_Y + STRIP.h / 2 + 3}`} />
        <path d={`M${cx} ${BP_Y + STRIP.h / 2 - 3.2} V${BP_Y + STRIP.h / 2 - 3}`} />
      </g>,
    )
    x += STRIP.icon + STRIP.iconGap
  }
  parts.push(
    <Text key="message" x={x} solid={solid}>
      {message}
    </Text>,
  )
  if (kind !== 'notice') {
    const linkX = x + message.length * CHAR + STRIP.linkGap
    parts.push(<Link key="link" x={linkX} label={link} solid={solid} />)
    if (kind === 'tagged') {
      const ax = linkX + link.length * CHAR + 4
      parts.push(
        <path
          key="arrow"
          d={`M${ax} ${BASELINE - 7} L${ax + 3.5} ${BASELINE - 3.5} L${ax} ${BASELINE}`}
          strokeWidth={1.25}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={beat(DRAFT_LABEL_BEAT)}
          className={`fade-note ${INK_SOFT}`}
        />,
      )
    }
  }

  const closeCx = CLOSE_X + STRIP.close / 2
  const closeCy = CLOSE_Y + STRIP.close / 2

  return (
    <DraftSurface>
      <style>{PRESS_CSS}</style>
      <defs>
        <pattern
          id={hatchId}
          width="4"
          height="4"
          patternTransform="rotate(45)"
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="4"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.35"
          />
        </pattern>
      </defs>

      {solid ? (
        <rect
          x={BP_X}
          y={BP_Y}
          width={STRIP.w}
          height={STRIP.h}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1}
          strokeWidth={theme.wireframe.strokeWidth}
          strokeOpacity={theme.wireframe.strokeOpacity}
          style={beat(DRAFT_BEAT.outline)}
          className={`ink-draw ${DRAFT_FILL_SOLID}`}
        />
      ) : (
        <>
          <rect
            x={BP_X}
            y={BP_Y}
            width={STRIP.w}
            height={STRIP.h}
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1}
            strokeWidth={theme.wireframe.strokeWidth}
            strokeOpacity={theme.wireframe.strokeOpacity}
            style={beat(DRAFT_BEAT.outline)}
            className={`ink-draw ${OUTLINE_SIDES}`}
          />
          <path
            d={`M${BP_X} ${BP_Y + STRIP.h} H${BP_X + STRIP.w}`}
            strokeWidth={theme.wireframe.strokeWidth}
            style={beat(DRAFT_BEAT.outline)}
            className={OUTLINE_BOTTOM}
          />
        </>
      )}

      {solid && (
        <rect
          x={BP_X}
          y={BP_Y}
          width={STRIP.w}
          height={STRIP.h}
          fill={`url(#${hatchId})`}
          stroke="none"
          style={beat(DRAFT_BEAT.hatch)}
          className={`fade-note ${DRAFT_SCAFFOLD_FADE}`}
        />
      )}

      {parts}

      <g className="bp-banner-press">
        <g
          strokeWidth={1.5}
          strokeLinecap="round"
          style={beat(DRAFT_BEAT.anatomy)}
          className={`fade-note ${solid ? INK_ON_SOLID : INK_SOFT}`}
        >
          <path d={`M${closeCx - 4} ${closeCy - 4} L${closeCx + 4} ${closeCy + 4}`} />
          <path d={`M${closeCx + 4} ${closeCy - 4} L${closeCx - 4} ${closeCy + 4}`} />
        </g>
      </g>

      <g className={DRAFT_SCAFFOLD_FADE}>
        <rect
          x={CLOSE_X}
          y={CLOSE_Y}
          width={STRIP.close}
          height={STRIP.close}
          rx={4}
          stroke="currentColor"
          strokeWidth={theme.guide.strokeWidth}
          strokeDasharray="3 3"
          opacity={theme.guide.structOpacity}
          style={beat(DRAFT_BEAT.guide)}
          className="dash-march"
        />
        <InsetGuide
          x={CONTENT_X}
          y={BP_Y + STRIP.py}
          w={CONTENT_W}
          h={STRIP.lineH}
          offset={0.8}
          boxX={BP_X}
          boxY={BP_Y}
          boxW={STRIP.w}
          boxH={STRIP.h}
          clipOffset={0.8}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <GripFrame x={BP_X} y={BP_Y} w={STRIP.w} h={STRIP.h} style={beat(DRAFT_BEAT.handle)} />
        <MeasureH
          x1={BP_X}
          x2={BP_X + STRIP.w}
          y={BP_Y - 12}
          label="w-full"
          className="note-stamp"
          style={beat(stampBeat(0))}
        />
        <MeasureV
          x={BP_X - 12}
          y1={BP_Y}
          y2={BP_Y + STRIP.h}
          label={`${STRIP.h}`}
          className="note-stamp"
          style={beat(stampBeat(1))}
        />
        <MeasureNote
          x={BP_X}
          y={NOTE_Y}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(2))}
        >
          {`ps ${STRIP.ps} · pe ${STRIP.pe} · py ${STRIP.py}`}
        </MeasureNote>
        <MeasureNote
          x={BP_X}
          y={NOTE_Y + 11}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(3))}
        >
          {note}
        </MeasureNote>
      </g>
    </DraftSurface>
  )
}

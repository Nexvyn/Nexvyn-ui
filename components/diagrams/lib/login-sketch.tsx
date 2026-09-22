'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset, licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root LICENSE.

import { useId, type ReactNode } from 'react'
import {
  DraftSurface,
  DRAFT_FILL_PANEL,
  DRAFT_FILL_SOLID,
  DRAFT_INK_MORPH,
  DRAFT_SCAFFOLD_FADE,
  DRAFT_TEXT_SOFT,
  draftTheme,
  MeasureNote,
  MeasureV,
  GripFrame,
  beat,
  DRAFT_BEAT,
  DRAFT_LABEL_BEAT,
  stampBeat,
} from '@/components/diagrams/lib/diagram-parts'

export type LoginKind = 'social' | 'email' | 'split' | 'quote'

const FORM_W = 70
const ROW = 9.5
const GAP = 4

const COPY = `${DRAFT_INK_MORPH} fill-current opacity-25 group-hover:opacity-40 group-focus-visible:opacity-40`
const TEXT_ON_SOLID = `${DRAFT_TEXT_SOFT} group-hover:fill-(--color-bg) group-focus-visible:fill-(--color-bg)`
const EYE_SWAP =
  'transition-opacity duration-(--motion-dur-base) ease-(--motion-ease-in-out) group-hover:delay-(--motion-dur-slow) group-focus-visible:delay-(--motion-dur-slow) motion-reduce:transition-none'

function Box({
  x,
  y,
  w,
  h,
  solid,
}: {
  x: number
  y: number
  w: number
  h: number
  solid?: boolean
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={2.5}
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={1}
      strokeWidth={draftTheme.guide.strokeWidth + 0.25}
      style={beat(DRAFT_BEAT.anatomy)}
      className={`ink-draw ${solid ? DRAFT_FILL_SOLID : DRAFT_FILL_PANEL}`}
    />
  )
}

function Bar({ x, y, w }: { x: number; y: number; w: number }) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={2.5}
      rx={1.25}
      style={beat(DRAFT_LABEL_BEAT)}
      className={`fade-note ${COPY}`}
    />
  )
}

function Eye({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g
      strokeWidth={0.8}
      strokeLinecap="round"
      className={`fade-note ${DRAFT_INK_MORPH} stroke-current opacity-50`}
      style={beat(DRAFT_LABEL_BEAT)}
    >
      <g className={`${EYE_SWAP} group-hover:opacity-0 group-focus-visible:opacity-0`}>
        <path
          d={`M${cx - 3} ${cy} Q${cx} ${cy - 2.6} ${cx + 3} ${cy} Q${cx} ${cy + 2.6} ${cx - 3} ${cy}`}
          fill="none"
        />
        <circle cx={cx} cy={cy} r={0.9} fill="none" />
      </g>
      <g
        className={`${EYE_SWAP} opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100`}
      >
        <path
          d={`M${cx - 3} ${cy} Q${cx} ${cy - 2.6} ${cx + 3} ${cy} Q${cx} ${cy + 2.6} ${cx - 3} ${cy}`}
          fill="none"
        />
        <path d={`M${cx - 3} ${cy + 2.5} L${cx + 3} ${cy - 2.5}`} />
      </g>
    </g>
  )
}

function Form({ x, top, kind }: { x: number; top: number; kind: LoginKind }) {
  const cx = x + FORM_W / 2
  const providersFirst = kind === 'social'
  const rows: ReactNode[] = []
  let y = top + 20

  const providers = () => {
    if (kind === 'social') {
      rows.push(
        <Box key="g" x={x} y={y} w={FORM_W} h={ROW} />,
        <Box key="a" x={x} y={y + ROW + 4} w={FORM_W} h={ROW} />,
      )
      y += ROW * 2 + 4 + GAP
    } else {
      const half = (FORM_W - 4) / 2
      rows.push(
        <Box key="g" x={x} y={y} w={half} h={ROW} />,
        <Box key="a" x={x + half + 4} y={y} w={half} h={ROW} />,
      )
      y += ROW + GAP
    }
  }
  const divider = () => {
    rows.push(
      <g key={`div-${y}`}>
        <Bar x={x} y={y + 1} w={FORM_W / 2 - 6} />
        <Bar x={cx + 6} y={y + 1} w={FORM_W / 2 - 6} />
      </g>,
    )
    y += GAP + 2
  }

  if (providersFirst) {
    providers()
    divider()
  }
  rows.push(<Bar key="el" x={x} y={y} w={14} />, <Box key="e" x={x} y={y + 4} w={FORM_W} h={ROW} />)
  y += ROW + 4 + GAP
  rows.push(
    <Bar key="pl" x={x} y={y} w={18} />,
    <Box key="p" x={x} y={y + 4} w={FORM_W} h={ROW} />,
    <Eye key="eye" cx={x + FORM_W - 6} cy={y + 4 + ROW / 2} />,
  )
  y += ROW + 4 + GAP
  rows.push(
    <g key="s">
      <Box x={x} y={y} w={FORM_W} h={ROW} solid />
      <text
        x={cx}
        y={y + ROW / 2 + 2.5}
        fontSize={7}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        style={beat(DRAFT_LABEL_BEAT)}
        className={`fade-note ${TEXT_ON_SOLID}`}
      >
        Sign in
      </text>
    </g>,
  )
  y += ROW + GAP
  if (!providersFirst) {
    divider()
    providers()
  }

  return (
    <>
      <text
        x={cx}
        y={top + 10}
        fontSize={10}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        style={beat(DRAFT_LABEL_BEAT)}
        className={`fade-note ${DRAFT_TEXT_SOFT}`}
      >
        Welcome back
      </text>
      <Bar x={cx - 22} y={top + 14} w={44} />
      {rows}
    </>
  )
}

export function LoginBlueprint({ kind }: { kind: LoginKind }) {
  const hatchId = `bp-hatch-login-${useId().replace(/:/g, '')}`
  const split = kind === 'split' || kind === 'quote'
  const W = split ? 176 : 120
  const H = 108
  const X = (220 - W - 18) / 2 + 18
  const Y = 12
  const formX = split ? X + 12 : X + (W - FORM_W) / 2
  const panelX = X + 94
  const panelW = W - 94

  return (
    <DraftSurface>
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
      <rect
        x={X}
        y={Y}
        width={W}
        height={H}
        rx={4}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={draftTheme.wireframe.strokeWidth}
        style={beat(DRAFT_BEAT.outline)}
        className={`ink-draw ${DRAFT_INK_MORPH} fill-transparent stroke-current group-hover:stroke-(--color-border) group-focus-visible:stroke-(--color-border)`}
      />
      <Form x={formX} top={Y + 6} kind={kind} />
      {split && (
        <g>
          <rect
            x={panelX}
            y={Y}
            width={panelW}
            height={H}
            fill={`url(#${hatchId})`}
            style={beat(DRAFT_BEAT.hatch)}
            className="fade-note"
          />
          <rect
            x={panelX}
            y={Y}
            width={panelW}
            height={H}
            strokeWidth={draftTheme.guide.strokeWidth}
            style={beat(DRAFT_BEAT.anatomy)}
            className={`fade-note ${DRAFT_INK_MORPH} fill-transparent stroke-current opacity-50 group-hover:fill-(--color-surface-2) group-hover:opacity-100 group-focus-visible:fill-(--color-surface-2) group-focus-visible:opacity-100`}
          />
          {kind === 'quote' && (
            <g>
              <Bar x={panelX + 8} y={Y + H - 34} w={panelW - 18} />
              <Bar x={panelX + 8} y={Y + H - 28} w={panelW - 30} />
              <circle
                cx={panelX + 13}
                cy={Y + H - 13}
                r={5}
                strokeWidth={draftTheme.guide.strokeWidth}
                style={beat(DRAFT_BEAT.anatomy)}
                className={`fade-note ${DRAFT_INK_MORPH} fill-transparent stroke-current opacity-60`}
              />
              <Bar x={panelX + 22} y={Y + H - 15} w={24} />
            </g>
          )}
        </g>
      )}
      <g className={DRAFT_SCAFFOLD_FADE}>
        <GripFrame x={formX} y={Y + 26} w={FORM_W} h={ROW} style={beat(DRAFT_BEAT.handle)} />
        <MeasureV
          x={X - 10}
          y1={Y + 26}
          y2={Y + 26 + ROW}
          label="44"
          className="note-stamp"
          style={beat(stampBeat(1))}
        />
        <MeasureNote
          x={X}
          y={Y + H + 12}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(2))}
        >
          {split ? 'max 320 · lg 2fr + 3fr · photo from lg' : 'max 384 · fields h44 · r4'}
        </MeasureNote>
      </g>
    </DraftSurface>
  )
}

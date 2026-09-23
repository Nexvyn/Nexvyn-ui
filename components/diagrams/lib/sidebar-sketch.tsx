'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset, licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root LICENSE.

import { useId, type CSSProperties } from 'react'
import {
  DraftSurface,
  DRAFT_FILL_MUTED,
  DRAFT_INK_MORPH,
  DRAFT_SCAFFOLD_FADE,
  draftTheme,
  MeasureH,
  MeasureNote,
  GripFrame,
  beat,
  DRAFT_BEAT,
  DRAFT_LABEL_BEAT,
  stampBeat,
} from '@/components/diagrams/lib/diagram-parts'

export type SidebarKind = 'workspace' | 'rail' | 'collapsible'

const S = 0.25
const X = 22
const Y = 24
const W = 176
const H = 96
const TOP = 56 * S
const PAD = 8 * S
const ROW = 36 * S
const STEP = ROW + 2 * S
const ICON = 20 * S
const ITEM_PX = 10 * S
const LABEL_X = ITEM_PX + ICON + 12 * S
const RAIL = 56 * S
const COMPACT = 40 * S

const PANEL_W: Record<SidebarKind, number> = {
  workspace: 256 * S,
  rail: 224 * S,
  collapsible: 256 * S,
}

const INK = `${DRAFT_INK_MORPH} stroke-current`
const COPY = `${DRAFT_INK_MORPH} fill-current opacity-25 group-hover:opacity-40 group-focus-visible:opacity-40`
const SKELETON = `${DRAFT_INK_MORPH} fill-transparent stroke-current opacity-50 group-hover:fill-(--color-surface-2) group-hover:stroke-transparent group-hover:opacity-100 group-focus-visible:fill-(--color-surface-2) group-focus-visible:stroke-transparent group-focus-visible:opacity-100`
const GLYPH = `${DRAFT_INK_MORPH} fill-transparent stroke-current opacity-60 group-hover:opacity-90 group-focus-visible:opacity-90`
const MOVE =
  'duration-(--motion-dur-slow) ease-(--motion-ease-in-out) group-hover:delay-(--motion-dur-base) group-focus-visible:delay-(--motion-dur-base) motion-reduce:transition-none'
const LABEL_IN =
  'transition-opacity duration-(--motion-dur-slow) ease-(--motion-ease-in-out) opacity-0 group-hover:opacity-100 group-hover:delay-(--motion-dur-slow) group-focus-visible:opacity-100 group-focus-visible:delay-(--motion-dur-slow) motion-reduce:transition-none'
const FOLD = `scale-x-(--bp-fold) transition-[scale] ${MOVE} group-hover:scale-x-100 group-focus-visible:scale-x-100`
const SHIFT = `translate-x-(--bp-shift) transition-[translate] ${MOVE} group-hover:translate-x-0 group-focus-visible:translate-x-0`

function foldStyle(ratio: number): CSSProperties {
  return {
    '--bp-fold': `${ratio}`,
    transformBox: 'fill-box',
    transformOrigin: 'left center',
  } as CSSProperties
}

function Bar({
  x,
  y,
  w,
  h = 2.5,
  className = COPY,
}: {
  x: number
  y: number
  w: number
  h?: number
  className?: string
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={h / 2}
      style={beat(DRAFT_LABEL_BEAT)}
      className={`fade-note ${className}`}
    />
  )
}

function Glyph({ x, y, accent }: { x: number; y: number; accent?: boolean }) {
  return (
    <rect
      x={x}
      y={y}
      width={ICON}
      height={ICON}
      rx={1}
      strokeWidth={1}
      style={beat(DRAFT_LABEL_BEAT)}
      className={`fade-note ${GLYPH} ${accent ? 'group-hover:stroke-(--color-accent) group-focus-visible:stroke-(--color-accent)' : ''}`}
    />
  )
}

function Row({
  x,
  y,
  w,
  label,
  active,
  icon = true,
  folds,
  labelClass,
}: {
  x: number
  y: number
  w: number
  label: number
  active?: boolean
  icon?: boolean
  folds?: boolean
  labelClass?: string
}) {
  return (
    <g>
      {active && (
        <g style={folds ? foldStyle(COMPACT / w) : undefined} className={folds ? FOLD : undefined}>
          <rect
            x={x}
            y={y}
            width={w}
            height={ROW}
            rx={1}
            vectorEffect="non-scaling-stroke"
            strokeWidth={draftTheme.guide.strokeWidth}
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1}
            style={beat(DRAFT_BEAT.anatomy)}
            className={`ink-draw ${DRAFT_FILL_MUTED}`}
          />
        </g>
      )}
      {icon && <Glyph x={x + ITEM_PX} y={y + (ROW - ICON) / 2} accent={active} />}
      <g className={labelClass}>
        <Bar x={x + (icon ? LABEL_X : ITEM_PX)} y={y + ROW / 2 - 1.25} w={label} />
      </g>
    </g>
  )
}

function Canvas({ x, y, w }: { x: number; y: number; w: number }) {
  const px = 32 * S
  const inner = w - px * 2
  const card = (inner - 12 * S * 2) / 3

  return (
    <g>
      <Bar x={x + px} y={y + 24 * S} w={40} h={3} />
      <Bar x={x + px} y={y + 24 * S + 7} w={60} />
      {[0, 1, 2].map((index) => (
        <rect
          key={index}
          x={x + px + index * (card + 12 * S)}
          y={y + 24 * S + 15}
          width={card}
          height={18}
          rx={1}
          strokeWidth={draftTheme.guide.strokeWidth}
          style={beat(DRAFT_BEAT.anatomy)}
          className={`fade-note ${SKELETON}`}
        />
      ))}
      <rect
        x={x + px}
        y={y + 24 * S + 39}
        width={inner}
        height={48}
        rx={1}
        strokeWidth={draftTheme.guide.strokeWidth}
        style={beat(DRAFT_BEAT.anatomy)}
        className={`fade-note ${SKELETON}`}
      />
    </g>
  )
}

function Mark({ x, y, size = 28 * S }: { x: number; y: number; size?: number }) {
  return (
    <rect
      x={x}
      y={y}
      width={size}
      height={size}
      rx={1}
      style={beat(DRAFT_LABEL_BEAT)}
      className={`fade-note ${DRAFT_INK_MORPH} fill-current opacity-50 group-hover:opacity-100 group-focus-visible:opacity-100`}
    />
  )
}

function Line({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      strokeWidth={draftTheme.guide.strokeWidth}
      style={beat(DRAFT_BEAT.guide)}
      className={`fade-note ${INK} opacity-60 group-hover:stroke-(--color-border) group-hover:opacity-100 group-focus-visible:stroke-(--color-border) group-focus-visible:opacity-100`}
    />
  )
}

function WorkspacePanel() {
  const pw = PANEL_W.workspace
  const ix = X + PAD
  const iw = pw - PAD * 2
  const listY = Y + 12 * S + 40 * S + 4 * S
  const groupY = listY + STEP * 4 + 16 * S
  const footY = Y + H - PAD * 2 - ROW

  return (
    <g>
      <Mark x={X + PAD + 8 * S} y={Y + 12 * S + 8 * S} size={24 * S} />
      <Bar x={X + PAD + 40 * S} y={Y + 12 * S + 20 * S - 1.25} w={24} />
      <Glyph x={X + pw - PAD - 30 * S} y={Y + 12 * S + 10 * S} />
      {[18, 22, 16, 20].map((label, index) => (
        <Row
          key={index}
          x={ix}
          y={listY + index * STEP}
          w={iw}
          label={label}
          active={index === 1}
        />
      ))}
      <Bar x={ix + ITEM_PX} y={groupY} w={14} h={2} />
      {[30, 26].map((label, index) => (
        <Row key={index} x={ix} y={groupY + 5 + index * STEP} w={iw} label={label} icon={false} />
      ))}
      <Line x1={X} y1={footY - PAD} x2={X + pw} y2={footY - PAD} />
      <Row x={ix} y={footY} w={iw} label={20} />
      <Line x1={X + pw} y1={Y} x2={X + pw} y2={Y + H} />
    </g>
  )
}

function FoldingPanel({ kind, top }: { kind: 'rail' | 'collapsible'; top: number }) {
  const pw = PANEL_W[kind]
  const ix = X + PAD
  const iw = pw - PAD * 2
  const shift = { '--bp-shift': `${RAIL - pw}px` } as CSSProperties
  const actions = kind === 'rail' ? [18, 26, 16, 20, 12, 14] : [20, 14, 16, 18]
  const listY = kind === 'rail' ? top + PAD : top + TOP
  const recentY = listY + STEP * actions.length + 16 * S
  const footY = Y + H - PAD * 2 - (kind === 'rail' ? 40 * S : 44 * S)

  return (
    <g>
      <g style={foldStyle(RAIL / pw)} className={FOLD}>
        <rect
          x={X}
          y={top}
          width={pw}
          height={Y + H - top}
          className={`${DRAFT_INK_MORPH} fill-transparent group-hover:fill-(--color-bg) group-focus-visible:fill-(--color-bg)`}
        />
      </g>
      {kind === 'collapsible' && <Mark x={X + 14 * S} y={top + 14 * S} />}
      {kind === 'collapsible' && (
        <g className={LABEL_IN}>
          <Bar x={X + 50 * S} y={top + TOP / 2 - 1.25} w={20} />
        </g>
      )}
      {actions.map((label, index) => (
        <Row
          key={index}
          x={ix}
          y={listY + index * STEP}
          w={iw}
          label={label}
          active={kind === 'rail' && index === 0}
          folds
          labelClass={LABEL_IN}
        />
      ))}
      {kind === 'collapsible' && (
        <g className={LABEL_IN}>
          <Bar x={ix + ITEM_PX} y={recentY} w={14} h={2} />
          {[34, 28].map((label, index) => (
            <Row
              key={index}
              x={ix}
              y={recentY + 5 + index * STEP}
              w={iw}
              label={label}
              icon={false}
              active={index === 0}
            />
          ))}
          <Line x1={X + RAIL} y1={footY} x2={X + pw} y2={footY} />
        </g>
      )}
      <Line x1={X} y1={footY} x2={X + RAIL} y2={footY} />
      {kind === 'rail' ? (
        <Glyph x={X + (RAIL - ICON) / 2} y={footY + PAD + (40 * S - ICON) / 2} />
      ) : (
        <g>
          <circle
            cx={X + RAIL / 2}
            cy={footY + PAD + 22 * S}
            r={16 * S}
            strokeWidth={1}
            style={beat(DRAFT_LABEL_BEAT)}
            className={`fade-note ${GLYPH}`}
          />
          <g className={LABEL_IN}>
            <Bar x={X + RAIL + 2} y={footY + PAD + 22 * S - 1.25} w={26} />
          </g>
        </g>
      )}
      <g style={shift} className={SHIFT}>
        <Line x1={X + pw} y1={top} x2={X + pw} y2={Y + H} />
      </g>
    </g>
  )
}

const NOTE: Record<SidebarKind, string> = {
  workspace: 'rows h36 · settings pinned · r4',
  rail: 'w224 on hover · over the page',
  collapsible: 'w256 open · page shifts with it',
}

export function SidebarBlueprint({ kind }: { kind: SidebarKind }) {
  const clipId = `bp-clip-sidebar-${useId().replace(/:/g, '')}`
  const pw = PANEL_W[kind]
  const top = kind === 'rail' ? Y + TOP : Y
  const mainX = kind === 'rail' ? X + RAIL : X + pw
  const mainW = X + W - mainX
  const barH = kind === 'rail' ? 48 * S : TOP
  const titleX = mainX + 24 * S + (kind === 'workspace' ? 48 * S : 0)

  return (
    <DraftSurface>
      <defs>
        <clipPath id={clipId}>
          <rect x={X} y={Y} width={W} height={H} rx={4} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <g
          style={
            kind === 'collapsible'
              ? ({ '--bp-shift': `${RAIL - pw}px` } as CSSProperties)
              : undefined
          }
          className={kind === 'collapsible' ? SHIFT : undefined}
        >
          {kind === 'workspace' && (
            <>
              <Glyph x={mainX + 16 * S + (40 * S - ICON) / 2} y={top + (TOP - ICON) / 2} />
              <Line x1={mainX} y1={top + TOP} x2={X + W} y2={top + TOP} />
            </>
          )}
          <Bar x={titleX} y={top + barH / 2 - 1.25} w={22} />
          <Canvas x={mainX} y={top + barH} w={mainW} />
        </g>
        {kind === 'rail' && (
          <g>
            <Mark x={X + 14 * S} y={Y + 14 * S} />
            <Bar x={X + 50 * S} y={Y + TOP / 2 - 1.25} w={20} />
            <circle
              cx={X + W - 10 * S - 20 * S}
              cy={Y + TOP / 2}
              r={16 * S}
              strokeWidth={1}
              style={beat(DRAFT_LABEL_BEAT)}
              className={`fade-note ${GLYPH}`}
            />
            <Line x1={X} y1={Y + TOP} x2={X + W} y2={Y + TOP} />
          </g>
        )}
        {kind === 'workspace' ? <WorkspacePanel /> : <FoldingPanel kind={kind} top={top} />}
      </g>
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
        className={`ink-draw ${INK} fill-transparent group-hover:stroke-(--color-border) group-focus-visible:stroke-(--color-border)`}
      />
      <g className={DRAFT_SCAFFOLD_FADE}>
        <GripFrame
          x={X + PAD}
          y={kind === 'workspace' ? Y + TOP + STEP : top + (kind === 'rail' ? PAD : TOP)}
          w={kind === 'workspace' ? pw - PAD * 2 : COMPACT}
          h={ROW}
          style={beat(DRAFT_BEAT.handle)}
        />
        <MeasureH
          x1={X}
          x2={X + (kind === 'workspace' ? pw : RAIL)}
          y={Y - 8}
          label={kind === 'workspace' ? '256' : '56'}
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
          {NOTE[kind]}
        </MeasureNote>
      </g>
    </DraftSurface>
  )
}

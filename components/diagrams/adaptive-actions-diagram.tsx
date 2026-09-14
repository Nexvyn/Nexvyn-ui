'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset, licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root LICENSE.

import {
  AnatomyFrame,
  AnatomyCallout,
  useAnatomy,
  useSpotlight,
} from '@/components/diagrams/lib/anatomy-parts'
import {
  DraftSurface,
  DRAFT_BEAT,
  DRAFT_SCAFFOLD_FADE,
  DRAFT_INK_MORPH,
  DRAFT_TEXT_SOFT,
  draftTheme,
  beat,
  MeasureV,
  MeasureH,
  MeasureNote,
  GripFrame,
  InsetGuide,
  squircleRectPath,
  stampBeat,
  DRAFT_LABEL_BEAT,
} from '@/components/diagrams/lib/diagram-parts'

const AA = {
  btnW: 72,
  btnH: 44,
  iconSize: 16,
  gap: 4,
  moreBtnW: 44,
  rx: 4,
  pad: 12,
  iconGap: 8,
} as const

const BTN_COUNT = 3
const MORE_X = BTN_COUNT * (AA.btnW + AA.gap)
const TOTAL_W = MORE_X + AA.moreBtnW
const BAR_H = AA.btnH
const TOOLBAR_OUTSET = 2
const MENU_W = 176
const MENU_ITEM_H = 36
const MENU_ITEM_GAP = 2
const MENU_PAD = 4
const MENU_H = MENU_PAD * 2 + 3 * MENU_ITEM_H + 2 * MENU_ITEM_GAP
const MENU_X = TOTAL_W - MENU_W
const MENU_Y = BAR_H + 4

function menuItemY(i: number) {
  return MENU_Y + MENU_PAD + i * (MENU_ITEM_H + MENU_ITEM_GAP)
}

function usePartHover(part: string) {
  const { hovered, setHovered } = useAnatomy()
  return {
    isHovered: hovered === part,
    handlers: {
      onMouseEnter: () => setHovered(part),
      onMouseLeave: () => setHovered(null),
      style: { pointerEvents: 'all' as const },
      className: 'cursor-pointer',
    },
  }
}

function ToolbarShape() {
  const spotlight = useSpotlight('toolbar')
  const { isHovered, handlers } = usePartHover('toolbar')
  return (
    <g {...handlers}>
      <rect
        x={-TOOLBAR_OUTSET}
        y={-TOOLBAR_OUTSET}
        width={TOTAL_W + TOOLBAR_OUTSET * 2}
        height={BAR_H + TOOLBAR_OUTSET * 2}
        rx={AA.rx + TOOLBAR_OUTSET}
        className={`fill-transparent stroke-(--color-fg) ${spotlight.className}`}
        strokeDasharray="3 3"
        strokeOpacity={isHovered ? 0.6 : 0.3}
        style={spotlight.style}
        strokeWidth={isHovered ? 1.5 : 1}
      />
    </g>
  )
}

function ActionButtonShape({ index }: { index: number }) {
  const spotlight = useSpotlight('action-0')
  const { isHovered, handlers } = usePartHover('action-0')
  const x = index * (AA.btnW + AA.gap)
  const iconX = x + AA.pad
  const iconY = (AA.btnH - AA.iconSize) / 2
  const labelX = iconX + AA.iconSize + AA.iconGap

  return (
    <g {...handlers}>
      <g className={spotlight.className} style={spotlight.style}>
        <rect
          x={x}
          y={0}
          width={AA.btnW}
          height={AA.btnH}
          rx={AA.rx}
          className="stroke-(--color-border) squircle-corners"
          fill="currentColor"
          fillOpacity={isHovered ? 0.12 : 0.02}
          strokeWidth={0.75}
        />
        <rect
          x={iconX}
          y={iconY}
          width={AA.iconSize}
          height={AA.iconSize}
          rx={2}
          className="fill-(--color-muted)/30"
        />
        <rect
          x={labelX}
          y={BAR_H / 2 - 3}
          width={AA.btnW - AA.pad * 2 - AA.iconSize - AA.iconGap}
          height={6}
          rx={2}
          className="fill-(--color-fg)/30"
        />
      </g>
    </g>
  )
}

function MoreButtonShape() {
  const spotlight = useSpotlight('more-trigger')
  const { isHovered, handlers } = usePartHover('more-trigger')
  const cx = MORE_X + AA.moreBtnW / 2
  const cy = BAR_H / 2

  return (
    <g {...handlers}>
      <g className={spotlight.className} style={spotlight.style}>
        <rect
          x={MORE_X}
          y={0}
          width={AA.moreBtnW}
          height={AA.btnH}
          rx={AA.rx}
          className="stroke-(--color-border)"
          fill="currentColor"
          fillOpacity={isHovered ? 0.12 : 0.02}
          strokeWidth={0.75}
          strokeDasharray="3 2"
        />
        {[-5, 0, 5].map((dx) => (
          <circle key={dx} cx={cx + dx} cy={cy} r={1.5} className="fill-(--color-fg)/50" />
        ))}
      </g>
    </g>
  )
}

function OverflowMenuShape() {
  const spotlight = useSpotlight('overflow-menu')
  const { isHovered, handlers } = usePartHover('overflow-menu')

  return (
    <g {...handlers}>
      <rect
        x={MENU_X}
        y={MENU_Y}
        width={MENU_W}
        height={MENU_H}
        rx={AA.rx}
        className={`fill-(--color-surface) stroke-(--color-border) ${spotlight.className}`}
        strokeWidth={isHovered ? 1.75 : 1}
        style={spotlight.style}
      />
    </g>
  )
}

function MenuItemShape({ index }: { index: number }) {
  const spotlight = useSpotlight('menu-item')
  const { isHovered, handlers } = usePartHover('menu-item')
  const x = MENU_X + MENU_PAD
  const y = menuItemY(index)

  return (
    <g {...handlers}>
      <g className={spotlight.className} style={spotlight.style}>
        <rect
          x={x}
          y={y}
          width={MENU_W - MENU_PAD * 2}
          height={MENU_ITEM_H}
          rx={AA.rx}
          fill="currentColor"
          fillOpacity={index === 0 ? (isHovered ? 0.14 : 0.06) : isHovered ? 0.08 : 0}
        />
        <rect
          x={x + 10}
          y={y + (MENU_ITEM_H - 16) / 2}
          width={16}
          height={16}
          rx={2}
          className="fill-(--color-muted)/30"
        />
        <rect
          x={x + 36}
          y={y + (MENU_ITEM_H - 5) / 2}
          width={50 + (index === 1 ? 10 : 0)}
          height={5}
          rx={2}
          className="fill-(--color-fg)/30"
        />
      </g>
    </g>
  )
}

function AnnotationsLayer() {
  const { hovered } = useAnatomy()
  const dimmed = hovered !== null

  return (
    <g
      style={{ pointerEvents: 'none', filter: dimmed ? 'url(#spotlight-blur)' : 'none' }}
      className={`transition-[opacity,filter] duration-(--motion-dur-base) ease-(--motion-ease-in-out) motion-reduce:transition-none motion-reduce:filter-none ${dimmed ? 'opacity-30' : 'opacity-100'}`}
    >
      <MeasureV x={-14} y1={0} y2={BAR_H} label={`${BAR_H}`} labelXOffset={-6} />
      <MeasureH x1={0} x2={AA.btnW} y={BAR_H + 16} label={`${AA.btnW}`} />
      <MeasureH
        x1={MENU_X}
        x2={TOTAL_W}
        y={MENU_Y + MENU_H + 12}
        label={`${MENU_W}`}
        labelYOffset={11}
      />
    </g>
  )
}

function Callouts() {
  return (
    <>
      <AnatomyCallout
        part="action-0"
        label="Action"
        anchor={[AA.btnW / 2, 0]}
        side="top"
        distance={24}
        measure={`${AA.btnW} × ${AA.btnH} · px ${AA.pad} · gap ${AA.iconGap} · r${AA.rx}`}
        caption="Visible action. Pinned and higher priority items stay in view."
      />
      <AnatomyCallout
        part="toolbar"
        label="Toolbar"
        anchor={[TOTAL_W / 2, -TOOLBAR_OUTSET]}
        side="top"
        distance={24 - TOOLBAR_OUTSET}
        isAccent
        measure={`w full · gap ${AA.gap} · role toolbar`}
        caption="Measures its inline size and roves focus with the arrow keys."
      />
      <AnatomyCallout
        part="more-trigger"
        label="More"
        anchor={[MORE_X + AA.moreBtnW / 2, 0]}
        side="top"
        distance={24}
        measure={`${AA.moreBtnW} × ${AA.btnH} · icon ${AA.iconSize} · r${AA.rx}`}
        caption="Overflow trigger with a localized More actions label."
      />
      <AnatomyCallout
        part="overflow-menu"
        label="Overflow menu"
        anchor={[TOTAL_W, MENU_Y + MENU_H / 2]}
        side="end"
        distance={24}
        measure={`min w ${MENU_W} · p ${MENU_PAD} · gap ${MENU_ITEM_GAP} · r${AA.rx} · y +4`}
        caption="Holds overflowed actions, aligned to the trigger's inline end."
      />
      <AnatomyCallout
        part="menu-item"
        label="Menu item"
        anchor={[MENU_X + MENU_PAD, menuItemY(2) + MENU_ITEM_H / 2]}
        side="start"
        distance={MENU_X + MENU_PAD - 72}
        measure={`min h ${MENU_ITEM_H} · px 10 · gap 10 · r${AA.rx}`}
        caption="Overflowed action. ArrowUp and ArrowDown move between items."
      />
    </>
  )
}

export function AdaptiveActionsAnatomy() {
  return (
    <AnatomyFrame
      viewBox="-42 -60 448 267"
      ariaLabel="Adaptive actions anatomy: toolbar, action, more trigger, overflow menu and menu item"
    >
      <ToolbarShape />
      {[0, 1, 2].map((i) => (
        <ActionButtonShape key={i} index={i} />
      ))}
      <MoreButtonShape />
      <OverflowMenuShape />
      {[0, 1, 2].map((i) => (
        <MenuItemShape key={i} index={i} />
      ))}
      <AnnotationsLayer />
      <Callouts />
    </AnatomyFrame>
  )
}

const BP_S = 0.75
const BP_C = {
  btnH: 44 * BP_S,
  padX: 12 * BP_S,
  iconSize: 16 * BP_S,
  iconGap: 8 * BP_S,
  font: 14 * BP_S,
  gap: 4 * BP_S,
  moreBtnW: 44 * BP_S,
  rx: 4 * BP_S,
  menuW: 176 * BP_S,
  menuPad: 4 * BP_S,
  menuOffset: 4 * BP_S,
  itemH: 36 * BP_S,
  itemGap: 2 * BP_S,
  itemPadX: 10 * BP_S,
  itemIconGap: 10 * BP_S,
} as const

const BP_VISIBLE = ['Edit', 'Share'] as const
const BP_OVERFLOW = ['Archive', 'Delete'] as const

function bpBtnW(label: string) {
  return BP_C.padX * 2 + BP_C.iconSize + BP_C.iconGap + label.length * BP_C.font * 0.55
}

const BP_BTN_W = BP_VISIBLE.map(bpBtnW)
const BP_BTN_XS = [0, BP_BTN_W[0] + BP_C.gap]
const BP_MORE_X = BP_BTN_XS[1] + BP_BTN_W[1] + BP_C.gap
const BP_TOTAL_W = BP_MORE_X + BP_C.moreBtnW
const BP_MENU_H =
  BP_C.menuPad * 2 + BP_OVERFLOW.length * BP_C.itemH + (BP_OVERFLOW.length - 1) * BP_C.itemGap
const BP_OX = (220 - BP_TOTAL_W) / 2
const BP_OY = 36
const BP_DIM_Y = BP_OY - 6
const BP_CY = BP_OY + BP_C.btnH / 2
const BP_MENU_X = BP_OX + BP_TOTAL_W - BP_C.menuW
const BP_MENU_Y = BP_OY + BP_C.btnH + BP_C.menuOffset

function bpItemY(i: number) {
  return BP_MENU_Y + BP_C.menuPad + i * (BP_C.itemH + BP_C.itemGap)
}

const BP_GHOST_BTN = `${DRAFT_INK_MORPH} fill-transparent stroke-current group-hover:stroke-transparent group-focus-visible:stroke-transparent`
const BP_MORE_BTN = `${DRAFT_INK_MORPH} fill-transparent stroke-current group-hover:fill-(--color-surface-2) group-focus-visible:fill-(--color-surface-2) group-hover:stroke-transparent group-focus-visible:stroke-transparent`
const BP_MENU_SURFACE = `${DRAFT_INK_MORPH} fill-transparent stroke-current group-hover:fill-(--color-surface) group-focus-visible:fill-(--color-surface) group-hover:stroke-(--color-border) group-focus-visible:stroke-(--color-border)`
const BP_MENU_DROP = 'bp-aa-drop'
const BP_ITEM_FOCUS = `${DRAFT_INK_MORPH} fill-(--color-surface-2) opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100`
const BP_ICON = `${DRAFT_INK_MORPH} fill-none stroke-current opacity-35 group-hover:opacity-100 group-focus-visible:opacity-100`

function BpIcon({ x, cy }: { x: number; cy: number }) {
  return (
    <rect
      x={x}
      y={cy - BP_C.iconSize / 2}
      width={BP_C.iconSize}
      height={BP_C.iconSize}
      rx={2}
      strokeWidth={1}
      className={BP_ICON}
    />
  )
}

export function AdaptiveActionsBlueprint() {
  const theme = draftTheme
  const moreX = BP_OX + BP_MORE_X

  return (
    <DraftSurface>
      <style>{`
        @keyframes bp-aa-drop {
          from { opacity: 0; transform: translateY(-3px); }
        }
        .group:hover .blueprint .bp-aa-drop,
        .group:focus-visible .blueprint .bp-aa-drop {
          animation: bp-aa-drop var(--motion-dur-slow) var(--motion-ease-out) var(--motion-dur-base) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .group:hover .blueprint .bp-aa-drop,
          .group:focus-visible .blueprint .bp-aa-drop {
            animation: none;
          }
        }
      `}</style>
      {BP_VISIBLE.map((label, i) => {
        const x = BP_OX + BP_BTN_XS[i]
        const iconX = x + BP_C.padX
        return (
          <g key={label}>
            <path
              d={squircleRectPath(x, BP_OY, BP_BTN_W[i], BP_C.btnH, BP_C.rx)}
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1}
              strokeWidth={theme.wireframe.strokeWidth}
              strokeOpacity={theme.wireframe.strokeOpacity}
              style={beat(DRAFT_BEAT.outline)}
              className={`ink-draw ${BP_GHOST_BTN}`}
            />
            <BpIcon x={iconX} cy={BP_CY} />
            <text
              x={iconX + BP_C.iconSize + BP_C.iconGap}
              y={BP_CY + BP_C.font * 0.35}
              fontSize={BP_C.font}
              fontFamily="var(--font-sans)"
              style={beat(DRAFT_LABEL_BEAT)}
              className={`fade-note ${DRAFT_TEXT_SOFT}`}
            >
              {label}
            </text>
          </g>
        )
      })}

      <path
        d={squircleRectPath(moreX, BP_OY, BP_C.moreBtnW, BP_C.btnH, BP_C.rx)}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        style={beat(DRAFT_BEAT.anatomy)}
        className={`ink-draw ${BP_MORE_BTN}`}
      />
      {[-4, 0, 4].map((dx) => (
        <circle
          key={dx}
          cx={moreX + BP_C.moreBtnW / 2 + dx}
          cy={BP_CY}
          r={1.1}
          style={beat(DRAFT_LABEL_BEAT)}
          className={`fade-note ${DRAFT_TEXT_SOFT}`}
        />
      ))}

      <g className={BP_MENU_DROP}>
        <path
          d={squircleRectPath(BP_MENU_X, BP_MENU_Y, BP_C.menuW, BP_MENU_H, BP_C.rx)}
          strokeWidth={theme.wireframe.strokeWidth}
          strokeOpacity={theme.wireframe.strokeOpacity}
          className={BP_MENU_SURFACE}
        />
        <rect
          x={BP_MENU_X + BP_C.menuPad}
          y={bpItemY(0)}
          width={BP_C.menuW - BP_C.menuPad * 2}
          height={BP_C.itemH}
          rx={BP_C.rx}
          className={BP_ITEM_FOCUS}
        />
        {BP_OVERFLOW.map((label, i) => {
          const cy = bpItemY(i) + BP_C.itemH / 2
          const iconX = BP_MENU_X + BP_C.menuPad + BP_C.itemPadX
          return (
            <g key={label}>
              <BpIcon x={iconX} cy={cy} />
              <text
                x={iconX + BP_C.iconSize + BP_C.itemIconGap}
                y={cy + BP_C.font * 0.35}
                fontSize={BP_C.font}
                fontFamily="var(--font-sans)"
                className={DRAFT_TEXT_SOFT}
              >
                {label}
              </text>
            </g>
          )
        })}
      </g>

      <g className={DRAFT_SCAFFOLD_FADE}>
        <InsetGuide
          x={BP_OX + BP_C.padX}
          y={BP_OY}
          w={BP_BTN_W[0] - BP_C.padX * 2}
          h={BP_C.btnH}
          offset={0.8}
          boxX={BP_OX}
          boxY={BP_OY}
          boxW={BP_BTN_W[0]}
          boxH={BP_C.btnH}
          boxRx={BP_C.rx}
          clipOffset={0.8}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <InsetGuide
          x={BP_MENU_X + BP_C.menuPad}
          y={BP_MENU_Y + BP_C.menuPad}
          w={BP_C.menuW - BP_C.menuPad * 2}
          h={BP_MENU_H - BP_C.menuPad * 2}
          offset={0.8}
          boxX={BP_MENU_X}
          boxY={BP_MENU_Y}
          boxW={BP_C.menuW}
          boxH={BP_MENU_H}
          boxRx={BP_C.rx}
          clipOffset={0.8}
          className="dash-march"
          style={beat(DRAFT_BEAT.guide)}
        />
        <GripFrame
          x={BP_OX}
          y={BP_OY}
          w={BP_TOTAL_W}
          h={BP_C.btnH}
          style={beat(DRAFT_BEAT.handle)}
        />
        <MeasureH
          x1={BP_OX}
          x2={BP_OX + BP_TOTAL_W}
          y={BP_OY - 22}
          label={`${Math.round(BP_TOTAL_W / BP_S)}`}
          labelYOffset={-2}
          className="note-stamp"
          style={beat(stampBeat(5))}
        />
        <MeasureH
          x1={BP_OX}
          x2={BP_OX + BP_C.padX}
          y={BP_DIM_Y}
          label="12"
          className="note-stamp"
          style={beat(stampBeat(1))}
        />
        <MeasureH
          x1={BP_OX + BP_BTN_W[0]}
          x2={BP_OX + BP_BTN_XS[1]}
          y={BP_DIM_Y}
          label="4"
          className="note-stamp"
          style={beat(stampBeat(2))}
        />
        <MeasureNote
          x={BP_OX + BP_TOTAL_W - BP_C.moreBtnW / 2}
          y={BP_DIM_Y - 3}
          className="note-stamp"
          style={beat(stampBeat(4))}
        >
          overflow
        </MeasureNote>
        <MeasureNote
          x={BP_OX}
          y={BP_OY + BP_C.btnH + 10}
          anchor="start"
          className="note-stamp"
          style={beat(stampBeat(6))}
        >
          r4
        </MeasureNote>
        <MeasureV
          x={BP_OX - 10}
          y1={BP_OY}
          y2={BP_OY + BP_C.btnH}
          label="44"
          className="note-stamp"
          style={beat(stampBeat(0))}
        />
        <MeasureV
          x={BP_OX + BP_TOTAL_W + 10}
          y1={bpItemY(0)}
          y2={bpItemY(0) + BP_C.itemH}
          label="36"
          labelXOffset={5}
          labelAnchor="start"
          className="note-stamp"
          style={beat(stampBeat(3))}
        />
      </g>
    </DraftSurface>
  )
}

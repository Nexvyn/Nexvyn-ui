'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset — licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root MIT LICENSE.

import {
  Blueprint,
  BP_FILL_PANEL,
  BP_HIDE_ON_MORPH,
  BP_TEXT_SOFT,
  blueprintTheme,
  DimH,
  DimV,
  Selection,
} from '@/components/diagrams/lib/parts'
import {
  AnatomyFrame,
  AnatomyTag,
  OverlayLine,
  useAnatomy,
  useSpotlight,
} from '@/components/diagrams/lib/anatomy-parts'

const BREAD = {
  items: ['Home', 'Components', 'Breadcrumbs'] as const,
  itemH: 20,
  sepW: 14,
  gap: 4,
  rx: 4,
} as const

function breadItemW(label: string) {
  return label.length * 5 + 10
}

const BREAD_TOTAL_W = BREAD.items.reduce(
  (sum, label, i) =>
    sum + breadItemW(label) + (i < BREAD.items.length - 1 ? BREAD.gap + BREAD.sepW + BREAD.gap : 0),
  0,
)

const BP = {
  x: (220 - BREAD_TOTAL_W) / 2,
  y: (140 - BREAD.itemH) / 2,
} as const

function itemX(i: number) {
  let x = BP.x
  for (let j = 0; j < i; j++) {
    x += breadItemW(BREAD.items[j]) + BREAD.gap + BREAD.sepW + BREAD.gap
  }
  return x
}

export function BreadcrumbsBlueprint() {
  const theme = blueprintTheme
  return (
    <Blueprint>
      {BREAD.items.map((label, i) => {
        const w = breadItemW(label)
        return (
          <g key={i}>
            <rect
              x={itemX(i)}
              y={BP.y}
              width={w}
              height={BREAD.itemH}
              rx={BREAD.rx}
              strokeWidth={theme.wireframe.strokeWidth}
              strokeOpacity={theme.wireframe.strokeOpacity}
              className={i < BREAD.items.length - 1 ? BP_FILL_PANEL : ''}
            />
            <text
              x={itemX(i) + w / 2}
              y={BP.y + BREAD.itemH / 2 + 4}
              fontSize={9}
              textAnchor="middle"
              fontFamily="var(--font-sans)"
              className={BP_TEXT_SOFT}
            >
              {label}
            </text>
            {i < BREAD.items.length - 1 &&
              (() => {
               const cx = itemX(i) + w + BREAD.gap + BREAD.sepW / 2
                const cy = BP.y + BREAD.itemH / 2 + 1
                return (
                  <path
                    d={`M${cx - 1.5} ${cy - 3.5}l3 3.5-3 3.5`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={theme.wireframe.strokeWidth}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={theme.wireframe.strokeOpacity}
                    className={BP_HIDE_ON_MORPH}
                  />
                )
              })()}
          </g>
        )
      })}
      <g className={BP_HIDE_ON_MORPH}>
        <Selection
          x={BP.x}
          y={BP.y - 2}
          w={itemX(2) + breadItemW(BREAD.items[2]) - BP.x}
          h={BREAD.itemH + 4}
        />
        <DimH
          x1={BP.x}
          x2={itemX(2) + breadItemW(BREAD.items[2])}
          y={BP.y - 12}
          label={`${itemX(2) + breadItemW(BREAD.items[2]) - BP.x}`}
        />
        <DimV x={BP.x - 12} y1={BP.y} y2={BP.y + BREAD.itemH} label={`${BREAD.itemH}`} />
      </g>
    </Blueprint>
  )
}

const AN = {
  x: 40,
  y: 60,
  itemH: 20,
  gap: 6,
  sepW: 14,
  items: [
    { label: 'Home', w: 34 },
    { label: 'Components', w: 78 },
    { label: 'Breadcrumbs', w: 86 },
  ],
} as const

function anItemX(i: number) {
  let x = AN.x
  for (let j = 0; j < i; j++) {
    x += AN.items[j].w + AN.gap + AN.sepW + AN.gap
  }
  return x
}

function AnatomyLink({ i }: { i: number }) {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('link')
  const item = AN.items[i]
  const x = anItemX(i)
  const isHovered = hovered === 'link'
  return (
    <g
      onMouseEnter={() => setHovered('link')}
      onMouseLeave={() => setHovered(null)}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ pointerEvents: 'all', ...spotlight.style }}
    >
      <rect
        x={x}
        y={AN.y}
        width={item.w}
        height={AN.itemH}
        rx={3}
        fill="currentColor"
        fillOpacity={isHovered ? 0.08 : 0}
      />
      <text
        x={x + item.w / 2}
        y={AN.y + AN.itemH / 2 + 4}
        fontSize={13}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        className={`fill-current ${isHovered ? 'opacity-100' : 'opacity-70'}`}
      >
        {item.label}
      </text>
    </g>
  )
}

function AnatomySeparator({ i }: { i: number }) {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('separator')
  const item = AN.items[i]
  const x = anItemX(i) + item.w + AN.gap
  const isHovered = hovered === 'separator'
  const cx = x + AN.sepW / 2
  const cy = AN.y + AN.itemH / 2 + 1
  return (
    <g
      onMouseEnter={() => setHovered('separator')}
      onMouseLeave={() => setHovered(null)}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ pointerEvents: 'all', ...spotlight.style }}
    >
      <rect x={x} y={AN.y} width={AN.sepW} height={AN.itemH} fill="currentColor" fillOpacity={isHovered ? 0.08 : 0} rx={2} />
      <path
        d={`M${cx - 1.5} ${cy - 3.5}l3 3.5-3 3.5`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={isHovered ? 'opacity-100' : 'opacity-60'}
      />
    </g>
  )
}

function AnatomyCurrent() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('current')
  const item = AN.items[2]
  const x = anItemX(2)
  const isHovered = hovered === 'current'
  return (
    <g
      onMouseEnter={() => setHovered('current')}
      onMouseLeave={() => setHovered(null)}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ pointerEvents: 'all', ...spotlight.style }}
    >
      <rect
        x={x}
        y={AN.y}
        width={item.w}
        height={AN.itemH}
        rx={3}
        fill="currentColor"
        fillOpacity={isHovered ? 0.08 : 0}
      />
      <text
        x={x + item.w / 2}
        y={AN.y + AN.itemH / 2 + 4}
        fontSize={13}
        fontWeight={500}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        className={`fill-current ${isHovered ? 'opacity-100' : 'opacity-90'}`}
      >
        {item.label}
      </text>
    </g>
  )
}

function AnatomyBackground() {
  const { hovered } = useAnatomy()
  const dimmed = hovered !== null
  const last = AN.items.length - 1
  const rowW = anItemX(last) + AN.items[last].w - AN.x
  return (
    <g
      style={{ pointerEvents: 'none', filter: dimmed ? 'url(#spotlight-blur)' : 'none' }}
      className={`transition-all duration-200 ease-out ${dimmed ? 'opacity-30' : 'opacity-100'}`}
    >
      <Selection x={AN.x} y={AN.y} w={rowW} h={AN.itemH} />
      <DimH x1={AN.x} x2={AN.x + rowW} y={AN.y - 14} label={`${rowW}`} />
      <DimV x={AN.x - 12} y1={AN.y} y2={AN.y + AN.itemH} label={`${AN.itemH}`} labelXOffset={-6} />
    </g>
  )
}

function AnatomyLines() {
  const linkX = anItemX(0) + AN.items[0].w / 2
  const sepX = anItemX(0) + AN.items[0].w + AN.gap + AN.sepW / 2
  const currentX = anItemX(2) + AN.items[2].w / 2
  return (
    <g strokeWidth="1" className="pointer-events-none">
      <OverlayLine id="link" x1={linkX} y1={AN.y} x2={linkX} y2={AN.y - 8} />
      <OverlayLine id="separator" x1={sepX} y1={AN.y + AN.itemH} x2={sepX} y2={AN.y + AN.itemH + 8} />
      <OverlayLine id="current" x1={currentX} y1={AN.y} x2={currentX} y2={AN.y - 8} />
    </g>
  )
}

function AnatomyTags() {
  const linkX = anItemX(0) + AN.items[0].w / 2
  const sepX = anItemX(0) + AN.items[0].w + AN.gap + AN.sepW / 2
  const currentX = anItemX(2) + AN.items[2].w / 2
  return (
    <>
      <foreignObject
        x={linkX - 35}
        y={AN.y - 32}
        width={70}
        height={24}
        className="overflow-visible pointer-events-none"
      >
        <AnatomyTag part="link" label="Link" className="items-end justify-center" />
      </foreignObject>
      <foreignObject
        x={sepX - 50}
        y={AN.y + AN.itemH + 8}
        width={100}
        height={24}
        className="overflow-visible pointer-events-none"
      >
        <AnatomyTag part="separator" label="Separator" className="items-start justify-center" />
      </foreignObject>
      <foreignObject
        x={currentX - 55}
        y={AN.y - 32}
        width={110}
        height={24}
        className="overflow-visible pointer-events-none"
      >
        <AnatomyTag part="current" label="Current page" isAccent className="items-end justify-center" />
      </foreignObject>
    </>
  )
}

export function BreadcrumbsAnatomy() {
  return (
    <AnatomyFrame viewBox="0 8 320 130" maxWidthClassName="max-w-sm">
      <AnatomyLink i={0} />
      <AnatomySeparator i={0} />
      <AnatomyLink i={1} />
      <AnatomySeparator i={1} />
      <AnatomyCurrent />
      <AnatomyBackground />
      <AnatomyLines />
      <AnatomyTags />
    </AnatomyFrame>
  )
}

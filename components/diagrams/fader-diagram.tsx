'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Wireframe/anatomy diagram asset — licensed separately from the rest of
// this repository under CC BY-NC 4.0. See components/diagrams/LICENSE.
// This file is NOT covered by the repository's root MIT LICENSE.

import {
  Blueprint,
  BP_HIDE_ON_MORPH,
  BP_MORPH,
  blueprintTheme,
  DimH,
  DimLabel,
  DimV,
  PadGuide,
  Selection,
} from '@/components/diagrams/lib/parts'
import {
  AnatomyFrame,
  AnatomyTag,
  OverlayLine,
  useAnatomy,
  useSpotlight,
} from '@/components/diagrams/lib/anatomy-parts'

const BP_TRACK = { x: 20, y: 50, w: 180, h: 40, rx: 4 } as const
const BP_FILL_IDLE = 90
const BP_BAR = { w: 4, h: 20 } as const
const BP_PAD_X = 14

export function FaderBlueprint() {
  const theme = blueprintTheme
  const midY = BP_TRACK.y + BP_TRACK.h / 2
  return (
    <Blueprint>
      <defs>
        <style>
          {`
            .nx-fader-progress {
              transition: fill 0.15s, stroke 0.15s, opacity 0.15s, width var(--motion-dur-slow) var(--motion-ease-out) 0s;
            }
            .group:hover .nx-fader-progress,
            .group:focus-visible .nx-fader-progress {
              transition: fill 0.15s, stroke 0.15s, opacity 0.15s, width var(--motion-dur-slow) var(--motion-ease-out) 200ms;
            }
            .nx-fader-bar {
              transition: transform var(--motion-dur-slow) var(--motion-ease-out) 0s, fill 0.15s, stroke 0.15s, opacity 0.15s;
            }
            .group:hover .nx-fader-bar,
            .group:focus-visible .nx-fader-bar {
              transition: transform var(--motion-dur-slow) var(--motion-ease-out) 200ms, fill 0.15s, stroke 0.15s, opacity 0.15s;
            }
          `}
        </style>
      </defs>

      <rect
        x={BP_TRACK.x}
        y={BP_TRACK.y}
        width={BP_TRACK.w}
        height={BP_TRACK.h}
        rx={BP_TRACK.rx}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        className={`${BP_MORPH} fill-transparent stroke-current group-hover:fill-(--color-surface-2) group-focus-visible:fill-(--color-surface-2) group-hover:stroke-(--color-border) group-focus-visible:stroke-(--color-border)`}
      />
      <rect
        x={BP_TRACK.x}
        y={BP_TRACK.y}
        height={BP_TRACK.h}
        rx={BP_TRACK.rx}
        className="nx-fader-progress w-[90px] fill-current opacity-20 group-hover:w-[120px] group-focus-visible:w-[120px] group-hover:opacity-35 group-focus-visible:opacity-35 motion-reduce:transition-none"
      />
      <g
        className="nx-fader-bar group-hover:translate-x-[30px] group-focus-visible:translate-x-[30px] motion-reduce:transform-none"
        style={{ transformOrigin: `${BP_TRACK.x + BP_FILL_IDLE}px ${midY}px` }}
      >
        <rect
          x={BP_TRACK.x + BP_FILL_IDLE - BP_BAR.w / 2}
          y={midY - BP_BAR.h / 2}
          width={BP_BAR.w}
          height={BP_BAR.h}
          rx={2}
          strokeWidth={theme.wireframe.strokeWidth}
          className={`${BP_MORPH} fill-transparent stroke-current opacity-60 group-hover:fill-(--color-surface-2) group-focus-visible:fill-(--color-surface-2) group-hover:stroke-transparent group-focus-visible:stroke-transparent group-hover:opacity-100 group-focus-visible:opacity-100 group-hover:scale-y-125 group-focus-visible:scale-y-125 motion-reduce:transform-none`}
          style={{ transformOrigin: `${BP_TRACK.x + BP_FILL_IDLE}px ${midY}px` }}
        />
      </g>
      <text
        x={BP_TRACK.x + BP_PAD_X}
        y={midY + 4}
        fontSize={14}
        fontWeight={500}
        fontFamily="var(--font-sans)"
        className={`${BP_MORPH} fill-current opacity-35 group-hover:opacity-100 group-focus-visible:opacity-100`}
      >
        Volume
      </text>
      <text
        x={BP_TRACK.x + BP_TRACK.w - BP_PAD_X}
        y={midY + 4}
        textAnchor="end"
        fontSize={14}
        fontFamily="var(--font-sans)"
        className={`${BP_MORPH} fill-current opacity-35 group-hover:opacity-0 group-focus-visible:opacity-0`}
      >
        50%
      </text>
      <text
        x={BP_TRACK.x + BP_TRACK.w - BP_PAD_X}
        y={midY + 4}
        textAnchor="end"
        fontSize={14}
        fontFamily="var(--font-sans)"
        strokeWidth={theme.wireframe.textStrokeWidth}
        strokeOpacity={theme.wireframe.textOpacity}
        className={`${BP_MORPH} fill-transparent stroke-current opacity-0 group-hover:fill-current group-focus-visible:fill-current group-hover:stroke-transparent group-focus-visible:stroke-transparent group-hover:opacity-100 group-focus-visible:opacity-100`}
      >
        67%
      </text>
      <g className={BP_HIDE_ON_MORPH}>
        <PadGuide
          x={BP_TRACK.x + BP_PAD_X}
          y={BP_TRACK.y + 10}
          w={BP_TRACK.w - BP_PAD_X * 2}
          h={BP_TRACK.h - 20}
          offset={0.8}
          boxX={BP_TRACK.x}
          boxY={BP_TRACK.y}
          boxW={BP_TRACK.w}
          boxH={BP_TRACK.h}
          boxRx={BP_TRACK.rx}
          clipOffset={0.8}
        />
        <DimLabel x={BP_TRACK.x + 7} y={midY + 2} anchor="middle">
          14
        </DimLabel>
        <DimLabel x={BP_TRACK.x + BP_TRACK.w - 7} y={midY + 2} anchor="middle">
          14
        </DimLabel>
        <DimLabel x={BP_TRACK.x + BP_TRACK.w / 2} y={BP_TRACK.y + 7} anchor="middle">
          10
        </DimLabel>
        <DimLabel x={BP_TRACK.x + BP_TRACK.w / 2} y={BP_TRACK.y + BP_TRACK.h - 3} anchor="middle">
          10
        </DimLabel>
        <Selection x={BP_TRACK.x} y={BP_TRACK.y} w={BP_TRACK.w} h={BP_TRACK.h} />
        <DimH x1={BP_TRACK.x} x2={BP_TRACK.x + BP_TRACK.w} y={BP_TRACK.y - 10} label="180" />
        <DimV
          x={BP_TRACK.x - 12}
          y1={BP_TRACK.y}
          y2={BP_TRACK.y + BP_TRACK.h}
          label="40"
          labelXOffset={-6}
        />
        <DimLabel x={BP_TRACK.x} y={BP_TRACK.y - 4} anchor="start">
          r4
        </DimLabel>
      </g>
    </Blueprint>
  )
}

const AN = {
  x: 10,
  y: 50,
  w: 200,
  h: 38,
  rx: 4,
  fillW: 100,
  barW: 4,
  barH: 18,
  padX: 14,
  padY: 10,
} as const

function AnatomyTrack() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight(['root', 'track'])
  const active = hovered === 'root' || hovered === 'track'

  return (
    <rect
      x={AN.x}
      y={AN.y}
      width={AN.w}
      height={AN.h}
      rx={AN.rx}
      stroke="currentColor"
      strokeWidth={hovered === 'root' ? 2 : blueprintTheme.wireframe.strokeWidth}
      fill={active ? 'currentColor' : 'transparent'}
      fillOpacity={hovered === 'root' ? 0.03 : hovered === 'track' ? 0.1 : 0}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ ...spotlight.style, pointerEvents: 'all' }}
      onMouseEnter={() => setHovered('track')}
      onMouseLeave={() => setHovered(null)}
    />
  )
}

function AnatomyFill() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('fill')

  return (
    <rect
      x={AN.x}
      y={AN.y}
      width={AN.fillW}
      height={AN.h}
      rx={AN.rx}
      stroke="currentColor"
      strokeWidth={1}
      fill={hovered === 'fill' ? 'currentColor' : 'url(#bp-anatomy-hatch)'}
      className={`cursor-pointer ${hovered === 'fill' ? 'text-(--color-fg)' : ''} ${spotlight.className}`}
      style={{ ...spotlight.style, pointerEvents: 'all' }}
      onMouseEnter={() => setHovered('fill')}
      onMouseLeave={() => setHovered(null)}
    />
  )
}

function AnatomyThumb() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('thumb')
  const barX = AN.x + AN.fillW - AN.barW / 2
  const barY = AN.y + (AN.h - AN.barH) / 2

  return (
    <g
      onMouseEnter={() => setHovered('thumb')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect x={barX - 10} y={AN.y} width={24} height={AN.h} fill="transparent" />
      <rect
        x={barX}
        y={barY}
        width={AN.barW}
        height={AN.barH}
        rx={2}
        stroke="currentColor"
        strokeWidth={hovered === 'thumb' ? 1.25 : blueprintTheme.wireframe.strokeWidth}
        fill={hovered === 'thumb' ? 'currentColor' : 'transparent'}
        className={`${hovered === 'thumb' ? 'text-(--color-fg)' : ''} ${spotlight.className}`}
      />
    </g>
  )
}

function AnatomyTexts() {
  const { hovered } = useAnatomy()
  const fillSpot = useSpotlight('fill', { defaultOpacity: 70 })
  const trackSpot = useSpotlight('track', { defaultOpacity: 70 })
  const midY = AN.y + AN.h / 2 + 4.5

  return (
    <>
      <text
        x={AN.x + AN.padX}
        y={midY}
        fontSize={14}
        fontWeight={500}
        fontFamily="var(--font-sans)"
        style={{ pointerEvents: 'none', ...fillSpot.style }}
        className={`${hovered === 'fill' ? 'fill-(--color-bg)' : 'fill-current'} ${fillSpot.className}`}
      >
        Volume
      </text>
      <text
        x={AN.x + AN.w - AN.padX}
        y={midY}
        textAnchor="end"
        fontSize={14}
        fontWeight={500}
        fontFamily="var(--font-sans)"
        style={{ pointerEvents: 'none', ...trackSpot.style }}
        className={`${hovered === 'track' ? 'fill-(--color-fg)' : 'fill-current'} tabular-nums ${trackSpot.className}`}
      >
        50%
      </text>
    </>
  )
}

function AnatomyBackground() {
  const { hovered } = useAnatomy()
  const dimmed = hovered !== null

  return (
    <g
      style={{
        pointerEvents: 'none',
        filter: dimmed ? 'url(#spotlight-blur)' : 'none',
      }}
      className={`transition-all duration-200 ease-out ${dimmed ? 'opacity-30' : 'opacity-100'}`}
    >
      <PadGuide
        x={AN.x + AN.padX}
        y={AN.y + AN.padY}
        w={AN.w - AN.padX * 2}
        h={AN.h - AN.padY * 2}
        offset={0.8}
        boxX={AN.x}
        boxY={AN.y}
        boxW={AN.w}
        boxH={AN.h}
        boxRx={AN.rx}
        clipOffset={0.8}
      />
      <g
        fontSize={9}
        fontFamily="var(--font-mono)"
        fill="currentColor"
        textAnchor="middle"
        opacity={0.5}
      >
        <text x={AN.x + 7} y={AN.y + AN.h / 2 + 3}>
          14
        </text>
        <text x={AN.x + AN.w - 7} y={AN.y + AN.h / 2 + 3}>
          14
        </text>
        <text x={AN.x + AN.w / 2} y={AN.y + 7.5}>
          10
        </text>
        <text x={AN.x + AN.w / 2} y={AN.y + AN.h - 3.5}>
          10
        </text>
      </g>
      <text
        x={AN.x}
        y={AN.y - 7}
        fontSize={10}
        fontFamily="var(--font-mono)"
        fill="currentColor"
        opacity={0.5}
        fontWeight={500}
      >
        r4
      </text>
      <Selection x={AN.x} y={AN.y} w={AN.w} h={AN.h} />
      <DimH x1={AN.x} x2={AN.x + AN.w} y={AN.y - 15} label="200" />
      <DimV
        x={AN.x + AN.w + 15}
        y1={AN.y}
        y2={AN.y + AN.h}
        label="38"
        labelXOffset={5}
        labelAnchor="start"
      />
    </g>
  )
}

function AnatomyInteractionZone() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('interaction', { isInteraction: true })
  const barCenterX = AN.x + AN.fillW
  const barCenterY = AN.y + AN.h / 2
  const zone = { x: barCenterX - 22, y: barCenterY - 22, w: 44, h: 44 }

  return (
    <>
      <rect
        x={zone.x}
        y={zone.y}
        width={zone.w}
        height={zone.h}
        rx={8}
        strokeWidth={1}
        strokeDasharray={hovered === 'interaction' ? 'none' : '2 2'}
        className={`cursor-pointer stroke-(--color-fg) ${hovered === 'interaction' ? 'fill-(--color-fg)' : 'fill-transparent'} ${spotlight.className}`}
        style={{
          pointerEvents: 'all',
          fillOpacity: hovered === 'interaction' ? 0.1 : 0,
          ...spotlight.style,
        }}
        onMouseEnter={() => setHovered('interaction')}
        onMouseLeave={() => setHovered(null)}
      />
      <line
        x1={zone.x + zone.w}
        y1={zone.y + zone.h / 2}
        x2={240}
        y2={68}
        strokeWidth={1}
        strokeDasharray={hovered === 'interaction' ? 'none' : '2 2'}
        className={`pointer-events-none stroke-(--color-fg) ${spotlight.className}`}
        style={spotlight.style}
      />
    </>
  )
}

function AnatomyLines() {
  return (
    <g strokeWidth="1" className="pointer-events-none">
      <OverlayLine id="root" x1={70} y1={109} x2={20} y2={109} />
      <OverlayLine id="fill" x1={130} y1={40} x2={130} y2={90} />
      <OverlayLine id="thumb" x1={162} y1={145} x2={162} y2={128} />
      <OverlayLine id="track" x1={220} y1={178} x2={220} y2={128} />
    </g>
  )
}

function AnatomyTags() {
  return (
    <>
      <foreignObject
        x={-90}
        y={97}
        width={110}
        height={24}
        className="overflow-visible pointer-events-none"
      >
        <AnatomyTag part="root" label="Fader.Root" className="items-center justify-end" />
      </foreignObject>
      <foreignObject
        x={70}
        y={16}
        width={120}
        height={24}
        className="overflow-visible pointer-events-none"
      >
        <AnatomyTag
          part="fill"
          label="Fill (custom)"
          isAccent
          className="items-end justify-center"
        />
      </foreignObject>
      <foreignObject
        x={112}
        y={148}
        width={110}
        height={24}
        className="overflow-visible pointer-events-none"
      >
        <AnatomyTag part="thumb" label="Grab bar" className="items-start justify-center" />
      </foreignObject>
      <foreignObject
        x={220}
        y={178}
        width={110}
        height={24}
        className="overflow-visible pointer-events-none"
      >
        <AnatomyTag part="track" label="Fader.Track" className="items-start justify-start" />
      </foreignObject>
      <foreignObject
        x={300}
        y={96}
        width={200}
        height={24}
        className="overflow-visible pointer-events-none"
      >
        <AnatomyTag
          part="interaction"
          label="Interaction zone (≥24px)"
          isAccent
          className="items-center justify-start"
        />
      </foreignObject>
    </>
  )
}

export function FaderAnatomy() {
  return (
    <AnatomyFrame viewBox="-104 7 549 204" maxWidthClassName="max-w-[659px]">
      <g transform="translate(60, 40)">
        <AnatomyTrack />
        <AnatomyFill />
        <AnatomyThumb />
        <AnatomyTexts />
        <AnatomyBackground />
      </g>
      <AnatomyLines />
      <g transform="translate(60, 40)">
        <AnatomyInteractionZone />
      </g>
      <AnatomyTags />
    </AnatomyFrame>
  )
}

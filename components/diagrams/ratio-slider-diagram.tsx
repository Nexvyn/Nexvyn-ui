'use client'

import {
  type BlueprintTheme,
  Blueprint,
  BP_FILL_MUTED,
  BP_FILL_SOLID,
  BP_HIDE_ON_MORPH,
  BP_MORPH,
  BP_TEXT_ON_PANEL,
  blueprintTheme,
  DimH,
  DimLabel,
  DimV,
  Selection,
} from '@/components/showcase/parts'
import {
  AnatomyFrame,
  AnatomyTag,
  OverlayLine,
  useAnatomy,
  useSpotlight,
} from '@/components/showcase/anatomy-parts'

const BP_W = 140
const BP_X0 = 40
const BP_BAR = { y: 78, h: 32, rx: 8 } as const
const BP_GAP = 8
const BP_DIVIDER = { w: 6, h: 26, rx: 3 } as const
const BP_LEFT_W = Math.round(BP_W * 0.6) - 9
const BP_DIV_X = BP_X0 + BP_LEFT_W + BP_GAP
const BP_RIGHT_X = BP_DIV_X + BP_DIVIDER.w + BP_GAP
const BP_RIGHT_W = BP_X0 + BP_W - BP_RIGHT_X
const BP_LABEL_Y = 49

export function RatioSliderWireframe() {
  const theme = blueprintTheme
  return (
    <Blueprint>
      <text
        x={BP_X0 + 12}
        y={BP_LABEL_Y}
        textAnchor="start"
        fontSize={10}
        fontWeight={500}
        fontFamily="var(--font-sans)"
        strokeWidth={theme.wireframe.textStrokeWidth}
        strokeOpacity={theme.wireframe.textOpacity}
        className={BP_TEXT_ON_PANEL}
      >
        RICH 60%
      </text>
      <text
        x={BP_X0 + BP_W - 12}
        y={BP_LABEL_Y}
        textAnchor="end"
        fontSize={10}
        fontWeight={500}
        fontFamily="var(--font-sans)"
        strokeWidth={theme.wireframe.textStrokeWidth}
        strokeOpacity={theme.wireframe.textOpacity}
        className={BP_TEXT_ON_PANEL}
      >
        40% LIGHT
      </text>
      <rect
        x={BP_X0}
        y={BP_BAR.y}
        width={BP_LEFT_W}
        height={BP_BAR.h}
        rx={BP_BAR.rx}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        className={BP_FILL_SOLID}
      />
      <rect
        x={BP_DIV_X}
        y={BP_BAR.y + (BP_BAR.h - BP_DIVIDER.h) / 2}
        width={BP_DIVIDER.w}
        height={BP_DIVIDER.h}
        rx={BP_DIVIDER.rx}
        stroke="var(--bp-accent, var(--color-accent))"
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        className={`${BP_MORPH} fill-transparent group-hover:fill-accent group-focus-visible:fill-accent`}
      />
      <rect
        x={BP_RIGHT_X}
        y={BP_BAR.y}
        width={BP_RIGHT_W}
        height={BP_BAR.h}
        rx={BP_BAR.rx}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        className={`${BP_FILL_MUTED} stroke-current`}
      />
      <g className={BP_HIDE_ON_MORPH}>
        <Selection x={BP_X0} y={BP_BAR.y} w={BP_W} h={BP_BAR.h} />
        <DimH x1={BP_X0} x2={BP_X0 + BP_W} y={BP_BAR.y + BP_BAR.h + 14} label={`${BP_W}`} />
        <DimV
          x={BP_X0 - 12}
          y1={BP_BAR.y}
          y2={BP_BAR.y + BP_BAR.h}
          label={`${BP_BAR.h}`}
          labelXOffset={-6}
        />
        <DimLabel x={BP_DIV_X + BP_DIVIDER.w / 2} y={BP_BAR.y - 6}>
          {`${BP_DIVIDER.w}`}
        </DimLabel>
        <DimLabel x={BP_X0} y={BP_BAR.y - 6} anchor="start">
          {`r${BP_BAR.rx}`}
        </DimLabel>
      </g>
    </Blueprint>
  )
}

function TrackShape({ theme }: { theme: BlueprintTheme }) {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('track')

  return (
    <rect
      x={10}
      y={36}
      width={280}
      height={40}
      rx={20}
      stroke="currentColor"
      strokeWidth={hovered === 'track' ? 2 : theme.wireframe.strokeWidth}
      fill={hovered === 'track' ? 'currentColor' : 'transparent'}
      fillOpacity={hovered === 'track' ? 0.05 : 0}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ ...spotlight.style, pointerEvents: 'all' }}
      onMouseEnter={() => setHovered('track')}
      onMouseLeave={() => setHovered(null)}
    />
  )
}

function LeftFillShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('left-fill')

  return (
    <rect
      x={10}
      y={36}
      width={168}
      height={40}
      rx={20}
      stroke="none"
      fill="currentColor"
      fillOpacity={hovered === 'left-fill' ? 0.4 : 0.25}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ ...spotlight.style, pointerEvents: 'all' }}
      onMouseEnter={() => setHovered('left-fill')}
      onMouseLeave={() => setHovered(null)}
    />
  )
}

function RightFillShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('right-fill')

  return (
    <rect
      x={178}
      y={36}
      width={112}
      height={40}
      rx={20}
      stroke="none"
      fill="currentColor"
      fillOpacity={hovered === 'right-fill' ? 0.15 : 0.08}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ ...spotlight.style, pointerEvents: 'all' }}
      onMouseEnter={() => setHovered('right-fill')}
      onMouseLeave={() => setHovered(null)}
    />
  )
}

function DividerShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('divider')

  return (
    <g
      onMouseEnter={() => setHovered('divider')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect x={168} y={32} width={20} height={48} fill="transparent" />
      <line
        x1={178}
        y1={42}
        x2={178}
        y2={70}
        stroke="currentColor"
        strokeWidth={hovered === 'divider' ? 2 : 1.5}
        className={spotlight.className}
      />
    </g>
  )
}

function LeftLabelShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('left-label')

  return (
    <g
      onMouseEnter={() => setHovered('left-label')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect x={10} y={0} width={90} height={20} fill="transparent" />
      <text
        x={14}
        y={15}
        textAnchor="start"
        fontSize={11}
        fontWeight={500}
        fontFamily="var(--font-sans)"
        className={`fill-current ${spotlight.className}`}
      >
        RICH
      </text>
    </g>
  )
}

function RightLabelShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('right-label')

  return (
    <g
      onMouseEnter={() => setHovered('right-label')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect x={200} y={0} width={90} height={20} fill="transparent" />
      <text
        x={286}
        y={15}
        textAnchor="end"
        fontSize={11}
        fontWeight={500}
        fontFamily="var(--font-sans)"
        className={`fill-current opacity-60 ${spotlight.className}`}
      >
        LIGHT
      </text>
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
      className={`transition-all duration-200 ease-out ${isOthersHovered ? 'opacity-30' : 'opacity-100'}`}
    >
      <Selection x={10} y={36} w={280} h={40} />
      <DimH x1={10} x2={290} y={26} label="280" />
      <DimV x={305} y1={36} y2={76} label="40" labelXOffset={5} labelAnchor="start" />
    </g>
  )
}

function LinesLayer() {
  return (
    <g strokeWidth="1" className="pointer-events-none">
      <OverlayLine id="left-label" x1={74} y1={30} x2={74} y2={10} />
      <OverlayLine id="right-label" x1={346} y1={30} x2={346} y2={10} />
      <OverlayLine id="left-fill" x1={70} y1={86} x2={20} y2={86} />
      <OverlayLine id="right-fill" x1={350} y1={86} x2={400} y2={86} />
      <OverlayLine id="track" x1={210} y1={106} x2={210} y2={130} />
      <OverlayLine id="divider" x1={238} y1={100} x2={238} y2={160} />
    </g>
  )
}

function TagsLayer() {
  return (
    <>
      <foreignObject
        x={24}
        y={-14}
        width={100}
        height={20}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="left-label" label="Left Label" className="items-end justify-center" />
      </foreignObject>
      <foreignObject
        x={296}
        y={-14}
        width={100}
        height={20}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="right-label" label="Right Label" className="items-end justify-center" />
      </foreignObject>
      <foreignObject
        x={-80}
        y={76}
        width={90}
        height={20}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="left-fill" label="Left Fill" className="items-center justify-end" />
      </foreignObject>
      <foreignObject
        x={400}
        y={76}
        width={100}
        height={20}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="right-fill" label="Right Fill" className="items-center justify-start" />
      </foreignObject>
      <foreignObject
        x={160}
        y={130}
        width={100}
        height={20}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="track" label="Slider.Track" className="items-start justify-center" isAccent />
      </foreignObject>
      <foreignObject
        x={188}
        y={160}
        width={100}
        height={20}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="divider" label="Divider" className="items-start justify-center" />
      </foreignObject>
    </>
  )
}

export function RatioSliderBreakdown() {
  return (
    <AnatomyFrame viewBox="-90 -24 600 214" maxWidthClassName="max-w-xl">
      <g transform="translate(60, 30)">
        <TrackShape theme={blueprintTheme} />
        <LeftFillShape />
        <RightFillShape />
        <DividerShape />
        <LeftLabelShape />
        <RightLabelShape />
        <AnnotationsLayer />
      </g>

      <LinesLayer />
      <TagsLayer />
    </AnatomyFrame>
  )
}

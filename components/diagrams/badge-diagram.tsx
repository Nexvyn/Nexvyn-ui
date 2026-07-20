'use client'

import {
  Blueprint,
  BP_FILL_PANEL,
  BP_HIDE_ON_MORPH,
  BP_TEXT_SOFT,
  blueprintTheme,
  DimH,
  DimLabel,
  DimV,
  PadGuide,
  Selection,
  squirclePillPath,
} from '@/components/showcase/parts'
import {
  AnatomyFrame,
  AnatomyTag,
  OverlayLine,
  useAnatomy,
  useSpotlight,
} from '@/components/showcase/anatomy-parts'

const BADGE = {
  h: 26,
  padX: 12,
  r: 13,
  font: 12,
  solidW: 92,
  dotW: 104,
  dot: 7,
} as const

const BP = { x: 64, y: 57 } as const

export function BadgeBlueprint() {
  const theme = blueprintTheme
  return (
    <Blueprint>
      <path
        d={squirclePillPath(BP.x, BP.y, BADGE.solidW, BADGE.h)}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        className={BP_FILL_PANEL}
      />
      <text
        x={BP.x + BADGE.solidW / 2}
        y={BP.y + 17}
        textAnchor="middle"
        fontSize={BADGE.font}
        fontWeight={500}
        fontFamily="var(--font-sans)"
        className={`fill-current ${BP_TEXT_SOFT}`}
      >
        Early Access
      </text>
      <g className={BP_HIDE_ON_MORPH}>
        <Selection x={BP.x} y={BP.y} w={BADGE.solidW} h={BADGE.h} />
        <PadGuide
          x={BP.x + BADGE.padX}
          y={BP.y + 12}
          w={BADGE.solidW - BADGE.padX * 2}
          h={2}
          offset={10}
          boxX={BP.x}
          boxY={BP.y}
          boxW={BADGE.solidW}
          boxH={BADGE.h}
          boxRx={BADGE.r}
          clipOffset={10}
        />
        <DimH x1={BP.x} x2={BP.x + BADGE.solidW} y={BP.y - 14} label={`${BADGE.solidW}`} />
        <DimV x={BP.x - 14} y1={BP.y} y2={BP.y + BADGE.h} label={`${BADGE.h}`} labelXOffset={-6} />
        <DimLabel x={BP.x} y={BP.y - 6} anchor="start">
          {`r${BADGE.r}`}
        </DimLabel>
      </g>
    </Blueprint>
  )
}

const AN = { x: 158, y: 67 } as const
const AN_MID_Y = AN.y + BADGE.h / 2
const AN_DOT_CX = AN.x + BADGE.padX + BADGE.dot / 2
const AN_TEXT_X = AN_DOT_CX + BADGE.dot / 2 + 6
const AN_TEXT_CENTER = 216

function ContainerShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('container')

  return (
    <path
      d={squirclePillPath(AN.x, AN.y, BADGE.dotW, BADGE.h)}
      stroke="currentColor"
      strokeWidth={hovered === 'container' ? 2 : blueprintTheme.wireframe.strokeWidth}
      fill={hovered === 'container' ? 'currentColor' : 'transparent'}
      fillOpacity={hovered === 'container' ? 0.1 : 0}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ ...spotlight.style, pointerEvents: 'all' }}
      onMouseEnter={() => setHovered('container')}
      onMouseLeave={() => setHovered(null)}
    />
  )
}

function DotShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('dot')

  return (
    <g
      onMouseEnter={() => setHovered('dot')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect x={AN_DOT_CX - 10} y={AN_MID_Y - 10} width={20} height={20} fill="transparent" />
      <circle
        cx={AN_DOT_CX}
        cy={AN_MID_Y}
        r={BADGE.dot / 2}
        stroke="currentColor"
        strokeWidth={hovered === 'dot' ? 1 : 0.75}
        fill="currentColor"
        fillOpacity={hovered === 'dot' ? 0.8 : 0.4}
        className={spotlight.className}
      />
    </g>
  )
}

function LabelShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('text')

  return (
    <g
      onMouseEnter={() => setHovered('text')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect x={AN_TEXT_X - 4} y={AN.y + 3} width={78} height={20} fill="transparent" />
      <text
        x={AN_TEXT_X}
        y={AN_MID_Y + 4}
        fontSize={BADGE.font}
        fontWeight={500}
        fontFamily="var(--font-sans)"
        className={`fill-current ${spotlight.className}`}
      >
        Early Access
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
      <PadGuide
        x={AN.x + BADGE.padX}
        y={AN_MID_Y - 1}
        w={BADGE.dotW - BADGE.padX * 2}
        h={2}
        offset={10}
        boxX={AN.x}
        boxY={AN.y}
        boxW={BADGE.dotW}
        boxH={BADGE.h}
        boxRx={BADGE.r}
        clipOffset={10}
      />
      <Selection x={AN.x} y={AN.y} w={BADGE.dotW} h={BADGE.h} />
      <DimH x1={AN.x} x2={AN.x + BADGE.dotW} y={AN.y - 15} label={`${BADGE.dotW}`} />
      <DimV
        x={AN.x - 15}
        y1={AN.y}
        y2={AN.y + BADGE.h}
        label={`${BADGE.h}`}
        labelXOffset={-6}
        labelAnchor="end"
      />
      <DimLabel x={AN.x} y={AN.y - 6} anchor="start">
        {`r${BADGE.r}`}
      </DimLabel>
    </g>
  )
}

function LinesLayer() {
  return (
    <g strokeWidth="1" className="pointer-events-none">
      <OverlayLine id="container" x1={AN.x + BADGE.dotW} y1={AN_MID_Y} x2={292} y2={AN_MID_Y} />
      <OverlayLine id="dot" x1={AN_DOT_CX} y1={AN.y + BADGE.h} x2={AN_DOT_CX} y2={124} />
      <OverlayLine id="text" x1={AN_TEXT_CENTER} y1={AN.y} x2={AN_TEXT_CENTER} y2={36} />
    </g>
  )
}

function TagsLayer() {
  return (
    <>
      <foreignObject
        x={AN_DOT_CX - 50}
        y={122}
        width={100}
        height={20}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="dot" label="Dot Indicator" className="items-start justify-center" />
      </foreignObject>
      <foreignObject
        x={AN_TEXT_CENTER - 50}
        y={16}
        width={100}
        height={20}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="text" label="Label Text" className="items-end justify-center" />
      </foreignObject>
      <foreignObject
        x={290}
        y={AN_MID_Y - 10}
        width={120}
        height={20}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part="container"
          label="Badge.Container"
          className="items-center justify-start"
          isAccent
        />
      </foreignObject>
    </>
  )
}

export function BadgeAnatomy() {
  return (
    <AnatomyFrame viewBox="105 0 320 160" maxWidthClassName="max-w-xl">
      <ContainerShape />
      <DotShape />
      <LabelShape />
      <AnnotationsLayer />
      <LinesLayer />
      <TagsLayer />
    </AnatomyFrame>
  )
}

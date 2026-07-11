'use client'

import {
  type BlueprintTheme,
  Blueprint,
  BP_FILL_PANEL,
  BP_HIDE_ON_MORPH,
  BP_MORPH,
  blueprintTheme,
  DimH,
  DimLabel,
  DimV,
  PadGuide,
  Selection,
} from '@/components/showcase/parts'
import {
  AnatomyFrame,
  AnatomyTag,
  OverlayLine,
  useAnatomy,
  useSpotlight,
} from '@/components/showcase/anatomy-parts'

const BP_FIELD = { x: 30, y: 62, w: 160, h: 44, rx: 12 } as const
const BP_LABEL = { x: 30, y: 41, w: 38, h: 5, rx: 2.5 } as const
const BP_DOT_XS = [46, 58, 70, 82] as const
const BP_DOT_CY = 84
const BP_EYE = { cx: 168, cy: 84 } as const

export function PasswordInputWireframe() {
  const theme = blueprintTheme
  return (
    <Blueprint>
      <rect
        x={BP_LABEL.x}
        y={BP_LABEL.y}
        width={BP_LABEL.w}
        height={BP_LABEL.h}
        rx={BP_LABEL.rx}
        fill="currentColor"
        opacity={theme.guide.structOpacity}
      />
      <rect
        x={BP_FIELD.x}
        y={BP_FIELD.y}
        width={BP_FIELD.w}
        height={BP_FIELD.h}
        rx={BP_FIELD.rx}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        className={BP_FILL_PANEL}
      />
      {BP_DOT_XS.map((x) => (
        <circle
          key={x}
          cx={x}
          cy={BP_DOT_CY}
          r={3}
          fill="currentColor"
          opacity={theme.wireframe.strokeOpacity}
          className={`${BP_MORPH} group-hover:fill-foreground group-focus-visible:fill-foreground`}
        />
      ))}
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={theme.wireframe.strokeWidth}
        opacity={theme.wireframe.strokeOpacity}
      >
        <path d={`M${BP_EYE.cx - 8} ${BP_EYE.cy} q8 -8 16 0 q-8 8 -16 0 Z`} />
        <circle cx={BP_EYE.cx} cy={BP_EYE.cy} r={2.5} />
      </g>
      <g className={BP_HIDE_ON_MORPH}>
        <Selection x={BP_FIELD.x} y={BP_FIELD.y} w={BP_FIELD.w} h={BP_FIELD.h} />
        <DimH
          x1={BP_FIELD.x}
          x2={BP_FIELD.x + BP_FIELD.w}
          y={BP_FIELD.y + BP_FIELD.h + 14}
          label={`${BP_FIELD.w}`}
        />
        <DimV
          x={BP_FIELD.x - 12}
          y1={BP_FIELD.y}
          y2={BP_FIELD.y + BP_FIELD.h}
          label={`${BP_FIELD.h}`}
          labelXOffset={-6}
        />
        <DimLabel x={BP_FIELD.x} y={BP_FIELD.y - 4} anchor="start">
          {`r${BP_FIELD.rx}`}
        </DimLabel>
        <DimLabel x={BP_EYE.cx + 22} y={BP_EYE.cy - 30} anchor="end">
          eye tracks pointer
        </DimLabel>
      </g>
    </Blueprint>
  )
}

function LabelShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('label')

  return (
    <g
      onMouseEnter={() => setHovered('label')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect x={10} y={10} width={80} height={16} fill="transparent" />
      <text
        x={10}
        y={22}
        fontSize={12}
        fontWeight={500}
        fontFamily="var(--font-sans)"
        className={`fill-current ${spotlight.className}`}
      >
        Password
      </text>
    </g>
  )
}

function InputShape({ theme }: { theme: BlueprintTheme }) {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('input')

  return (
    <rect
      x={10}
      y={34}
      width={240}
      height={40}
      rx={12}
      stroke="currentColor"
      strokeWidth={hovered === 'input' ? 2 : theme.wireframe.strokeWidth}
      fill={hovered === 'input' ? 'currentColor' : 'transparent'}
      fillOpacity={hovered === 'input' ? 0.05 : 0}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ ...spotlight.style, pointerEvents: 'all' }}
      onMouseEnter={() => setHovered('input')}
      onMouseLeave={() => setHovered(null)}
    />
  )
}

function ToggleShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('toggle')

  return (
    <g
      onMouseEnter={() => setHovered('toggle')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect x={220} y={42} width={24} height={24} fill="transparent" />
      <circle
        cx={232}
        cy={54}
        r={6}
        stroke="currentColor"
        strokeWidth={hovered === 'toggle' ? 1.5 : 1}
        fill={hovered === 'toggle' ? 'currentColor' : 'transparent'}
        fillOpacity={hovered === 'toggle' ? 0.3 : 0}
        className={spotlight.className}
      />
      <circle
        cx={232}
        cy={54}
        r={2}
        fill="currentColor"
        className={`${hovered === 'toggle' ? 'opacity-100' : 'opacity-60'} ${spotlight.className}`}
      />
    </g>
  )
}

function DotsShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('dots')
  const dotXs = [28, 38, 48, 58]

  return (
    <g
      onMouseEnter={() => setHovered('dots')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect x={20} y={48} width={60} height={12} fill="transparent" />
      {dotXs.map((x) => (
        <circle
          key={x}
          cx={x}
          cy={54}
          r={2.5}
          fill="currentColor"
          className={`${hovered === 'dots' ? 'opacity-80' : 'opacity-40'} ${spotlight.className}`}
        />
      ))}
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
        x={22}
        y={46}
        w={216}
        h={16}
        offset={0.8}
        boxX={10}
        boxY={34}
        boxW={240}
        boxH={40}
        boxRx={12}
        clipOffset={0.8}
      />
      <Selection x={10} y={34} w={240} h={40} />
      <DimH x1={10} x2={250} y={85} label="240" />
      <DimV x={265} y1={34} y2={74} label="40" labelXOffset={5} labelAnchor="start" />
    </g>
  )
}

function LinesLayer() {
  return (
    <g strokeWidth="1" className="pointer-events-none">
      <OverlayLine id="label" x1={85} y1={30} x2={85} y2={10} />
      <OverlayLine id="input" x1={190} y1={94} x2={190} y2={115} />
      <OverlayLine id="toggle" x1={292} y1={74} x2={292} y2={115} />
      <OverlayLine id="dots" x1={103} y1={94} x2={103} y2={115} />
    </g>
  )
}

function TagsLayer() {
  return (
    <>
      <foreignObject
        x={35}
        y={0}
        width={100}
        height={20}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="label" label="Label" className="items-start justify-center" />
      </foreignObject>
      <foreignObject
        x={140}
        y={115}
        width={100}
        height={20}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part="input"
          label="Input.Field"
          className="items-start justify-center"
          isAccent
        />
      </foreignObject>
      <foreignObject
        x={242}
        y={115}
        width={100}
        height={20}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="toggle" label="Eye Toggle" className="items-start justify-center" />
      </foreignObject>
      <foreignObject
        x={53}
        y={115}
        width={100}
        height={20}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="dots" label="Dots" className="items-start justify-start" />
      </foreignObject>
    </>
  )
}

export function PasswordInputBreakdown() {
  return (
    <AnatomyFrame viewBox="27 -8 323 151" maxWidthClassName="max-w-lg">
      <g transform="translate(60, 20)">
        <LabelShape />
        <InputShape theme={blueprintTheme} />
        <DotsShape />
        <ToggleShape />
        <AnnotationsLayer />
      </g>

      <LinesLayer />
      <TagsLayer />
    </AnatomyFrame>
  )
}

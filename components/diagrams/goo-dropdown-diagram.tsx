'use client'

import {
  type BlueprintTheme,
  Blueprint,
  BP_FILL_MUTED,
  BP_HIDE_ON_MORPH,
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

const BP_TRIGGER = { x: 82, y: 6, w: 78, h: 34, rx: 12 } as const
const BP_PANEL = { x: 60, y: 50, w: 100, h: 84, rx: 20 } as const
const BP_ITEM_CYS = [68, 92, 116] as const

export function GooDropdownWireframe() {
  const theme = blueprintTheme
  return (
    <Blueprint>
      <rect
        x={BP_TRIGGER.x}
        y={BP_TRIGGER.y}
        width={BP_TRIGGER.w}
        height={BP_TRIGGER.h}
        rx={BP_TRIGGER.rx}
        strokeWidth={theme.wireframe.strokeWidth}
        strokeOpacity={theme.wireframe.strokeOpacity}
        className={`${BP_FILL_MUTED} stroke-current`}
      />
      <text
        x={BP_TRIGGER.x + BP_TRIGGER.w / 2}
        y={BP_TRIGGER.y + 22}
        textAnchor="middle"
        fontSize={13}
        fontWeight={500}
        fontFamily="var(--font-sans)"
        strokeWidth={theme.wireframe.textStrokeWidth}
        strokeOpacity={theme.wireframe.textOpacity}
        className={BP_TEXT_ON_PANEL}
      >
        Share
      </text>
      <g className={BP_HIDE_ON_MORPH}>
        <path
          d={`M${BP_TRIGGER.x + 18} ${BP_TRIGGER.y + BP_TRIGGER.h} q6 6 12 0`}
          fill="none"
          stroke="var(--bp-accent, var(--color-accent))"
          strokeWidth={theme.guide.strokeWidth}
          strokeDasharray="2 2"
          opacity={theme.guide.structOpacity}
        />
        <rect
          x={BP_PANEL.x}
          y={BP_PANEL.y}
          width={BP_PANEL.w}
          height={BP_PANEL.h}
          rx={BP_PANEL.rx}
          fill="none"
          stroke="currentColor"
          strokeWidth={theme.guide.strokeWidth}
          strokeDasharray="3 3"
          opacity={theme.guide.structOpacity}
        />
        <g fill="currentColor" opacity={theme.guide.structOpacity}>
          {BP_ITEM_CYS.map((cy, i) => (
            <rect key={cy} x={BP_PANEL.x + 12} y={cy - 2} width={44 - i * 8} height={4} rx={2} />
          ))}
        </g>
      </g>
      <g className={BP_HIDE_ON_MORPH}>
        <Selection x={BP_TRIGGER.x} y={BP_TRIGGER.y} w={BP_TRIGGER.w} h={BP_TRIGGER.h} />
        <DimLabel
          x={BP_TRIGGER.x + BP_TRIGGER.w + 10}
          y={BP_TRIGGER.y + BP_TRIGGER.h / 2 + 3}
          anchor="start"
        >
          {`${BP_TRIGGER.w}x${BP_TRIGGER.h} r${BP_TRIGGER.rx}`}
        </DimLabel>
        <DimLabel x={BP_PANEL.x + BP_PANEL.w + 6} y={BP_ITEM_CYS[1] + 3} anchor="start">
          goo
        </DimLabel>
      </g>
    </Blueprint>
  )
}

const AN_ITEMS = ['Copy link', 'Share on X', 'Embed'] as const

function TriggerShape({ theme }: { theme: BlueprintTheme }) {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('trigger')

  return (
    <rect
      x={10}
      y={10}
      width={78}
      height={34}
      rx={8}
      stroke="currentColor"
      strokeWidth={hovered === 'trigger' ? 2 : theme.wireframe.strokeWidth}
      fill={hovered === 'trigger' ? 'currentColor' : 'transparent'}
      fillOpacity={hovered === 'trigger' ? 0.1 : 0}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ ...spotlight.style, pointerEvents: 'all' }}
      onMouseEnter={() => setHovered('trigger')}
      onMouseLeave={() => setHovered(null)}
    />
  )
}

function TriggerTextShape() {
  const { setHovered } = useAnatomy()
  const spotlight = useSpotlight('trigger')

  return (
    <g
      onMouseEnter={() => setHovered('trigger')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <text
        x={49}
        y={31}
        textAnchor="middle"
        fontSize={12}
        fontWeight={500}
        fontFamily="var(--font-sans)"
        className={`fill-current ${spotlight.className}`}
      >
        Share
      </text>
    </g>
  )
}

function PanelShape({ theme }: { theme: BlueprintTheme }) {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('panel')

  return (
    <rect
      x={10}
      y={52}
      width={78}
      height={96}
      rx={10}
      stroke="currentColor"
      strokeWidth={hovered === 'panel' ? 2 : theme.wireframe.strokeWidth}
      fill={hovered === 'panel' ? 'currentColor' : 'transparent'}
      fillOpacity={hovered === 'panel' ? 0.05 : 0}
      className={`cursor-pointer ${spotlight.className}`}
      style={{ ...spotlight.style, pointerEvents: 'all' }}
      onMouseEnter={() => setHovered('panel')}
      onMouseLeave={() => setHovered(null)}
    />
  )
}

function GooBridgeShape() {
  const { hovered, setHovered } = useAnatomy()
  const spotlight = useSpotlight('goo')

  return (
    <g
      onMouseEnter={() => setHovered('goo')}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect x={24} y={40} width={50} height={16} fill="transparent" />
      <path
        d="M30,44 Q49,52 68,44"
        stroke="currentColor"
        strokeWidth={hovered === 'goo' ? 1.5 : 1}
        strokeDasharray={hovered === 'goo' ? 'none' : '3 2'}
        fill="none"
        className={spotlight.className}
      />
    </g>
  )
}

function ItemShape({
  theme,
  index,
  label,
}: {
  theme: BlueprintTheme
  index: number
  label: string
}) {
  const { hovered, setHovered } = useAnatomy()
  const partId = `item-${index}`
  const spotlight = useSpotlight(partId)

  return (
    <g
      onMouseEnter={() => setHovered(partId)}
      onMouseLeave={() => setHovered(null)}
      className="cursor-pointer"
      style={{ pointerEvents: 'all', filter: spotlight.style.filter }}
    >
      <rect
        x={16}
        y={58 + index * 30}
        width={66}
        height={24}
        rx={6}
        stroke="currentColor"
        strokeWidth={hovered === partId ? 1 : theme.wireframe.strokeWidth}
        fill={hovered === partId ? 'currentColor' : 'transparent'}
        fillOpacity={hovered === partId ? 0.08 : 0}
        className={spotlight.className}
      />
      <text
        x={49}
        y={74 + index * 30}
        textAnchor="middle"
        fontSize={10}
        fontFamily="var(--font-sans)"
        className={`fill-current ${spotlight.className}`}
      >
        {label}
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
      <Selection x={10} y={10} w={78} h={34} />
      <Selection x={10} y={52} w={78} h={96} />
      <DimH x1={10} x2={88} y={5} label="78" />
      <DimV x={95} y1={10} y2={44} label="34" labelXOffset={5} labelAnchor="start" />
      <DimV x={95} y1={52} y2={148} label="96" labelXOffset={5} labelAnchor="start" />
    </g>
  )
}

function LinesLayer() {
  return (
    <g strokeWidth="1" className="pointer-events-none">
      <OverlayLine id="trigger" x1={109} y1={64} x2={109} y2={165} />
      <OverlayLine id="panel" x1={148} y1={120} x2={170} y2={120} />
      <OverlayLine id="goo" x1={109} y1={64} x2={170} y2={45} />
      <OverlayLine id="item-1" x1={142} y1={120} x2={170} y2={100} />
    </g>
  )
}

function TagsLayer() {
  return (
    <>
      <foreignObject
        x={70}
        y={165}
        width={100}
        height={20}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag
          part="trigger"
          label="Trigger.Button"
          className="items-start justify-center"
          isAccent
        />
      </foreignObject>
      <foreignObject
        x={170}
        y={110}
        width={100}
        height={20}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="panel" label="Dropdown.Panel" className="items-center justify-start" />
      </foreignObject>
      <foreignObject
        x={170}
        y={35}
        width={100}
        height={20}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="goo" label="Goo Bridge" className="items-center justify-start" />
      </foreignObject>
      <foreignObject
        x={170}
        y={90}
        width={100}
        height={20}
        className="pointer-events-none overflow-visible"
      >
        <AnatomyTag part="item-1" label="Menu Item" className="items-center justify-start" />
      </foreignObject>
    </>
  )
}

export function GooDropdownBreakdown() {
  return (
    <AnatomyFrame viewBox="60 15 220 180" maxWidthClassName="max-w-lg">
      <g transform="translate(60, 20)">
        <TriggerShape theme={blueprintTheme} />
        <TriggerTextShape />
        <PanelShape theme={blueprintTheme} />
        <GooBridgeShape />
        {AN_ITEMS.map((label, index) => (
          <ItemShape key={label} theme={blueprintTheme} index={index} label={label} />
        ))}
        <AnnotationsLayer />
      </g>

      <LinesLayer />
      <TagsLayer />
    </AnatomyFrame>
  )
}

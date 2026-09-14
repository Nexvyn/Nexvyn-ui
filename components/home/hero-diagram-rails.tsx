'use client'

import type { ComponentType } from 'react'
import { cn } from '@/lib/utils'
import { DraftQuiet } from '@/components/diagrams/lib/diagram-parts'
import { BreadcrumbsBlueprint } from '@/components/diagrams/breadcrumbs-diagram'
import { BadgeBlueprint } from '@/components/diagrams/badge-diagram'
import { SwitchBlueprint } from '@/components/diagrams/switch-diagram'
import { SelectBlueprint } from '@/components/diagrams/select-diagram'
import { TabsSubtleBlueprint } from '@/components/diagrams/tabs-subtle-diagram'
import { AccordionBlueprint } from '@/components/diagrams/accordion-diagram'
import { PasswordInputWireframe } from '@/components/diagrams/password-input-diagram'
import { RatioSliderWireframe } from '@/components/diagrams/ratio-slider-diagram'
import { ScrollIndicatorWireframe } from '@/components/diagrams/scroll-indicator-diagram'
import { IconBarBlueprint } from '@/components/diagrams/icon-bar-diagram'
import { FaderBlueprint } from '@/components/diagrams/fader-diagram'
import { ClipboardFieldBlueprint } from '@/components/diagrams/clipboard-field-diagram'
import { InputCopyWireframe } from '@/components/diagrams/input-copy-diagram'
import { RadioGroupBlueprint } from '@/components/diagrams/radio-group-diagram'
import { ActionButtonBlueprint } from '@/components/diagrams/action-button-diagram'
import { BarsThemeBlueprint } from '@/components/diagrams/bars-theme-diagram'
import { NavMenuBlueprint } from '@/components/diagrams/nav-menu-diagram'
import { GooDropdownWireframe } from '@/components/diagrams/goo-dropdown-diagram'
import { InputMessageBlueprint } from '@/components/diagrams/input-message-diagram'
import { ComboboxBlueprint } from '@/components/diagrams/combobox-diagram'
import { ButtonBlueprint } from '@/components/diagrams/button-diagram'
import { TableBlueprint } from '@/components/diagrams/table-diagram'
import { InputWireframe } from '@/components/diagrams/input-diagram'
import { MobileDrawerBlueprint } from '@/components/diagrams/mobile-drawer-diagram'

interface RailPiece {
  Drawing: ComponentType
  x: number
  y: number
  scale: number
  opacity: number
}

const LEFT_PIECES: RailPiece[] = [
  { Drawing: InputMessageBlueprint, x: 18, y: 10, scale: 0.68, opacity: 0.3 },
  { Drawing: BreadcrumbsBlueprint, x: 48, y: 17, scale: 0.72, opacity: 0.22 },
  { Drawing: BadgeBlueprint, x: 22, y: 24, scale: 0.75, opacity: 0.3 },
  { Drawing: InputWireframe, x: 56, y: 32, scale: 0.7, opacity: 0.2 },
  { Drawing: SwitchBlueprint, x: 6, y: 40, scale: 0.8, opacity: 0.35 },
  { Drawing: ButtonBlueprint, x: 46, y: 46, scale: 0.75, opacity: 0.2 },
  { Drawing: SelectBlueprint, x: 80, y: 52, scale: 0.72, opacity: 0.12 },
  { Drawing: TabsSubtleBlueprint, x: 30, y: 58, scale: 0.72, opacity: 0.24 },
  { Drawing: AccordionBlueprint, x: 64, y: 65, scale: 0.68, opacity: 0.18 },
  { Drawing: PasswordInputWireframe, x: 4, y: 73, scale: 0.76, opacity: 0.35 },
  { Drawing: RatioSliderWireframe, x: 42, y: 80, scale: 0.72, opacity: 0.2 },
  { Drawing: ScrollIndicatorWireframe, x: 16, y: 88, scale: 0.72, opacity: 0.28 },
]

const RIGHT_PIECES: RailPiece[] = [
  { Drawing: IconBarBlueprint, x: 82, y: 10, scale: 0.68, opacity: 0.3 },
  { Drawing: FaderBlueprint, x: 52, y: 17, scale: 0.72, opacity: 0.22 },
  { Drawing: ClipboardFieldBlueprint, x: 78, y: 24, scale: 0.75, opacity: 0.3 },
  { Drawing: InputCopyWireframe, x: 44, y: 32, scale: 0.7, opacity: 0.2 },
  { Drawing: RadioGroupBlueprint, x: 94, y: 40, scale: 0.8, opacity: 0.35 },
  { Drawing: ActionButtonBlueprint, x: 54, y: 46, scale: 0.75, opacity: 0.2 },
  { Drawing: ComboboxBlueprint, x: 20, y: 52, scale: 0.72, opacity: 0.12 },
  { Drawing: TableBlueprint, x: 70, y: 58, scale: 0.72, opacity: 0.24 },
  { Drawing: BarsThemeBlueprint, x: 36, y: 65, scale: 0.68, opacity: 0.18 },
  { Drawing: MobileDrawerBlueprint, x: 96, y: 73, scale: 0.76, opacity: 0.35 },
  { Drawing: NavMenuBlueprint, x: 58, y: 80, scale: 0.72, opacity: 0.2 },
  { Drawing: GooDropdownWireframe, x: 84, y: 88, scale: 0.72, opacity: 0.28 },
]

function DiagramRail({ side, pieces }: { side: 'left' | 'right'; pieces: RailPiece[] }) {
  const maskImage =
    side === 'left'
      ? 'linear-gradient(to right, black 70%, transparent 100%)'
      : 'linear-gradient(to left, black 70%, transparent 100%)'

  return (
    <div
      className={cn(
        'hero-rail-vertical-mask absolute inset-y-0 overflow-hidden',
        'w-[clamp(100px,26vw,170px)] sm:w-[clamp(190px,28vw,320px)] md:w-[clamp(280px,30vw,460px)] lg:w-[clamp(320px,32vw,540px)]',
        '[--rail-scale:0.46] min-[400px]:[--rail-scale:0.54] sm:[--rail-scale:0.72] md:[--rail-scale:0.86] lg:[--rail-scale:1]',
        side === 'left' ? 'start-0' : 'end-0',
      )}
    >
      <div className="relative h-full w-full" style={{ maskImage, WebkitMaskImage: maskImage }}>
        {pieces.map(({ Drawing, x, y, scale, opacity }, index) => (
          <div
            key={index}
            className="absolute origin-center text-(--hero-rail-ink) [--bp-accent:var(--hero-rail-ink)] [--color-accent:var(--hero-rail-ink)] [--color-error:var(--hero-rail-ink)] [&_*]:[stroke-dasharray:none!important] [&_*]:[stroke-dashoffset:0!important] [&_*]:[stroke-opacity:1!important] [&_.dash-march]:hidden [&_.dim-draw]:hidden [&_.draft-scaffold]:hidden [&_.handle-pop]:hidden [&_.note-lift]:hidden [&_.note-measure]:hidden [&_.note-stamp]:hidden [&_path:not([stroke])]:stroke-current [&_path]:[fill:transparent!important] [&_rect]:[fill:transparent!important] [&_svg.blueprint]:relative [&_svg.blueprint]:overflow-visible [&_svg.blueprint]:text-(--hero-rail-ink) [&_text.note-measure]:hidden [&_text]:[fill-opacity:1!important] [&_text]:[opacity:1!important]"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: `translate(-50%, -50%) scale(calc(${scale} * var(--rail-scale, 1)))`,
              opacity,
            }}
          >
            <DraftQuiet>
              <Drawing />
            </DraftQuiet>
          </div>
        ))}
      </div>
    </div>
  )
}

export function HeroDiagramRails() {
  return (
    <div
      aria-hidden="true"
      data-hero-diagram-rails
      className="pointer-events-none absolute inset-0 z-1 overflow-hidden"
    >
      <DiagramRail side="left" pieces={LEFT_PIECES} />
      <DiagramRail side="right" pieces={RIGHT_PIECES} />
    </div>
  )
}

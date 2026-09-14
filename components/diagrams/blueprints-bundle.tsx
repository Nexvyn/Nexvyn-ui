'use client'

// SPDX-License-Identifier: CC-BY-NC-4.0
// Aggregates every blueprint wireframe into ONE module so the showcase loads a
// single lazily-fetched chunk instead of 40 per-component chunks. The Anatomy /
// Breakdown exports from these files are tree-shaken out (nothing here uses them).
// Licensed separately under CC BY-NC 4.0, see components/diagrams/LICENSE.

import type { ComponentType } from 'react'

import { AccordionBlueprint } from './accordion-diagram'
import { ActionButtonBlueprint } from './action-button-diagram'
import { AdaptiveActionsBlueprint } from './adaptive-actions-diagram'
import { AiInputBlueprint } from './ai-input-diagram'
import { BadgeBlueprint } from './badge-diagram'
import { BarsThemeBlueprint } from './bars-theme-diagram'
import { BounceSidebarWireframe } from './bounce-sidebar-diagram'
import { BreadcrumbsBlueprint } from './breadcrumbs-diagram'
import { CheckboxBlueprint } from './checkbox-diagram'
import { ClipboardFieldBlueprint } from './clipboard-field-diagram'
import { ColorPickerWireframe } from './color-picker-diagram'
import { ContextMenuBlueprint } from './context-menu-diagram'
import { DiaTextBlueprint } from './dia-text-diagram'
import { DropdownMenuBlueprint } from './dropdown-menu-diagram'
import { FaderBlueprint } from './fader-diagram'
import { FluidOrbBlueprint } from './fluid-orb-diagram'
import { GlowOrbBlueprint } from './glow-orb-diagram'
import { GooDropdownWireframe } from './goo-dropdown-diagram'
import { IconBarBlueprint } from './icon-bar-diagram'
import { InputCopyWireframe } from './input-copy-diagram'
import { LaptopMockupWireframe } from './laptop-mockup-diagram'
import { MorphNavBlueprint } from './morph-nav-diagram'
import { NavMenuBlueprint } from './nav-menu-diagram'
import { NavigationCompassBlueprint } from './navigation-compass-diagram'
import { PasswordInputWireframe } from './password-input-diagram'
import { PhoneMockupWireframe } from './phone-mockup-diagram'
import { RadioGroupBlueprint } from './radio-group-diagram'
import { RatioSliderWireframe } from './ratio-slider-diagram'
import { RocketLaunchBlueprint } from './rocket-launch-diagram'
import { ScrollIndicatorWireframe } from './scroll-indicator-diagram'
import { SelectBlueprint } from './select-diagram'
import { SwitchBlueprint } from './switch-diagram'
import { TableOfContentsWireframe } from './table-of-contents-diagram'
import { TabsSubtleBlueprint } from './tabs-subtle-diagram'

const BLUEPRINTS: Record<string, ComponentType> = {
  'accordion-blueprint': AccordionBlueprint,
  'action-button-blueprint': ActionButtonBlueprint,
  'adaptive-actions-blueprint': AdaptiveActionsBlueprint,
  'ai-input-blueprint': AiInputBlueprint,
  'phone-mockup-blueprint': PhoneMockupWireframe,
  'laptop-mockup-blueprint': LaptopMockupWireframe,
  'rocket-launch-blueprint': RocketLaunchBlueprint,
  'dia-text-blueprint': DiaTextBlueprint,
  'navigation-compass-blueprint': NavigationCompassBlueprint,
  'badge-blueprint': BadgeBlueprint,
  'breadcrumbs-blueprint': BreadcrumbsBlueprint,
  'dropdown-menu-blueprint': DropdownMenuBlueprint,
  'nav-menu-blueprint': NavMenuBlueprint,
  'icon-bar-blueprint': IconBarBlueprint,
  'checkbox-blueprint': CheckboxBlueprint,
  'context-menu-blueprint': ContextMenuBlueprint,
  'morph-nav-blueprint': MorphNavBlueprint,
  'clipboard-field-blueprint': ClipboardFieldBlueprint,
  'fader-blueprint': FaderBlueprint,
  'bounce-sidebar-blueprint': BounceSidebarWireframe,
  'color-picker-blueprint': ColorPickerWireframe,
  'goo-dropdown-blueprint': GooDropdownWireframe,
  'password-input-blueprint': PasswordInputWireframe,
  'radio-group-blueprint': RadioGroupBlueprint,
  'ratio-slider-blueprint': RatioSliderWireframe,
  'scroll-indicator-blueprint': ScrollIndicatorWireframe,
  'select-blueprint': SelectBlueprint,
  'switch-blueprint': SwitchBlueprint,
  'table-of-contents-blueprint': TableOfContentsWireframe,
  'tabs-subtle-blueprint': TabsSubtleBlueprint,
  'input-copy-blueprint': InputCopyWireframe,
  'bars-theme-blueprint': BarsThemeBlueprint,
  'glow-orb-blueprint': GlowOrbBlueprint,
  'fluid-orb-blueprint': FluidOrbBlueprint,
}

export default function BlueprintsBundle({ render, ...props }: { render: string }) {
  const Drawing = BLUEPRINTS[render]
  if (!Drawing) return null
  return <Drawing {...props} />
}

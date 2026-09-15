import dynamic from 'next/dynamic'
import type { ComponentType } from 'react'

// One dynamic() for all blueprints ships them as a single lazy chunk instead of ~40 requests.
const BlueprintsBundle = dynamic(() => import('@/components/diagrams/blueprints-bundle'))

function makePreview(key: string): ComponentType {
  return function BlueprintPreview(props) {
    return <BlueprintsBundle render={key} {...props} />
  }
}

export const blueprintPreviews: Record<string, ComponentType> = {
  'accordion-blueprint': makePreview('accordion-blueprint'),
  'action-button-blueprint': makePreview('action-button-blueprint'),
  'adaptive-actions-blueprint': makePreview('adaptive-actions-blueprint'),
  'ai-input-blueprint': makePreview('ai-input-blueprint'),
  'phone-mockup-blueprint': makePreview('phone-mockup-blueprint'),
  'laptop-mockup-blueprint': makePreview('laptop-mockup-blueprint'),
  'rocket-launch-blueprint': makePreview('rocket-launch-blueprint'),
  'dia-text-blueprint': makePreview('dia-text-blueprint'),
  'navigation-compass-blueprint': makePreview('navigation-compass-blueprint'),
  'badge-blueprint': makePreview('badge-blueprint'),
  'breadcrumbs-blueprint': makePreview('breadcrumbs-blueprint'),
  'dropdown-menu-blueprint': makePreview('dropdown-menu-blueprint'),
  'nav-menu-blueprint': makePreview('nav-menu-blueprint'),
  'icon-bar-blueprint': makePreview('icon-bar-blueprint'),
  'checkbox-blueprint': makePreview('checkbox-blueprint'),
  'context-menu-blueprint': makePreview('context-menu-blueprint'),
  'morph-nav-blueprint': makePreview('morph-nav-blueprint'),
  'clipboard-field-blueprint': makePreview('clipboard-field-blueprint'),
  'fader-blueprint': makePreview('fader-blueprint'),
  'bounce-sidebar-blueprint': makePreview('bounce-sidebar-blueprint'),
  'color-picker-blueprint': makePreview('color-picker-blueprint'),
  'goo-dropdown-blueprint': makePreview('goo-dropdown-blueprint'),
  'password-input-blueprint': makePreview('password-input-blueprint'),
  'radio-group-blueprint': makePreview('radio-group-blueprint'),
  'ratio-slider-blueprint': makePreview('ratio-slider-blueprint'),
  'scroll-indicator-blueprint': makePreview('scroll-indicator-blueprint'),
  'select-blueprint': makePreview('select-blueprint'),
  'switch-blueprint': makePreview('switch-blueprint'),
  'table-of-contents-blueprint': makePreview('table-of-contents-blueprint'),
  'tabs-subtle-blueprint': makePreview('tabs-subtle-blueprint'),
  'input-copy-blueprint': makePreview('input-copy-blueprint'),
  'bars-theme-blueprint': makePreview('bars-theme-blueprint'),
  'glow-orb-blueprint': makePreview('glow-orb-blueprint'),
  'fluid-orb-blueprint': makePreview('fluid-orb-blueprint'),
}

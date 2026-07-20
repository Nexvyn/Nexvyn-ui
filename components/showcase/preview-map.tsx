import dynamic from 'next/dynamic'

export const blueprintPreviews: Record<string, React.ComponentType> = {
  'badge-blueprint': dynamic(() =>
    import('@/components/diagrams/badge-diagram').then((m) => m.BadgeBlueprint),
  ),
  'breadcrumbs-blueprint': dynamic(() =>
    import('@/components/diagrams/breadcrumbs-diagram').then((m) => m.BreadcrumbsBlueprint),
  ),
  'clipboard-field-blueprint': dynamic(() =>
    import('@/components/diagrams/clipboard-field-diagram').then((m) => m.ClipboardFieldBlueprint),
  ),
  'fader-blueprint': dynamic(() =>
    import('@/components/diagrams/fader-diagram').then((m) => m.FaderBlueprint),
  ),
  'bounce-sidebar-blueprint': dynamic(() =>
    import('@/components/diagrams/bounce-sidebar-diagram').then((m) => m.BounceSidebarWireframe),
  ),
  'color-picker-blueprint': dynamic(() =>
    import('@/components/diagrams/color-picker-diagram').then((m) => m.ColorPickerWireframe),
  ),
  'goo-dropdown-blueprint': dynamic(() =>
    import('@/components/diagrams/goo-dropdown-diagram').then((m) => m.GooDropdownWireframe),
  ),
  'password-input-blueprint': dynamic(() =>
    import('@/components/diagrams/password-input-diagram').then((m) => m.PasswordInputWireframe),
  ),
  'ratio-slider-blueprint': dynamic(() =>
    import('@/components/diagrams/ratio-slider-diagram').then((m) => m.RatioSliderWireframe),
  ),
  'scroll-indicator-blueprint': dynamic(() =>
    import('@/components/diagrams/scroll-indicator-diagram').then(
      (m) => m.ScrollIndicatorWireframe,
    ),
  ),
  'select-blueprint': dynamic(() =>
    import('@/components/diagrams/select-diagram').then((m) => m.SelectBlueprint),
  ),
  'table-of-contents-blueprint': dynamic(() =>
    import('@/components/diagrams/table-of-contents-diagram').then(
      (m) => m.TableOfContentsWireframe,
    ),
  ),
}

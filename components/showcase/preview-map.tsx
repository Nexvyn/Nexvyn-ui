import dynamic from 'next/dynamic'

export const blueprintPreviews: Record<string, React.ComponentType> = {
  'phone-mockup-blueprint': dynamic(() =>
    import('@/components/diagrams/phone-mockup-diagram').then((m) => m.PhoneMockupWireframe),
  ),
  'laptop-mockup-blueprint': dynamic(() =>
    import('@/components/diagrams/laptop-mockup-diagram').then((m) => m.LaptopMockupWireframe),
  ),
  'rocket-launch-blueprint': dynamic(() =>
    import('@/components/diagrams/rocket-launch-diagram').then((m) => m.RocketLaunchBlueprint),
  ),
  'badge-blueprint': dynamic(() =>
    import('@/components/diagrams/badge-diagram').then((m) => m.BadgeBlueprint),
  ),
  'breadcrumbs-blueprint': dynamic(() =>
    import('@/components/diagrams/breadcrumbs-diagram').then((m) => m.BreadcrumbsBlueprint),
  ),
  'dropdown-menu-blueprint': dynamic(() =>
    import('@/components/diagrams/dropdown-menu-diagram').then((m) => m.DropdownMenuBlueprint),
  ),
  'nav-menu-blueprint': dynamic(() =>
    import('@/components/diagrams/nav-menu-diagram').then((m) => m.NavMenuBlueprint),
  ),
  'icon-bar-blueprint': dynamic(() =>
    import('@/components/diagrams/icon-bar-diagram').then((m) => m.IconBarBlueprint),
  ),
  'input-blueprint': dynamic(() =>
    import('@/components/diagrams/input-diagram').then((m) => m.InputWireframe),
  ),
  'checkbox-blueprint': dynamic(() =>
    import('@/components/diagrams/checkbox-diagram').then((m) => m.CheckboxBlueprint),
  ),
  'combobox-blueprint': dynamic(() =>
    import('@/components/diagrams/combobox-diagram').then((m) => m.ComboboxBlueprint),
  ),
  'context-menu-blueprint': dynamic(() =>
    import('@/components/diagrams/context-menu-diagram').then((m) => m.ContextMenuBlueprint),
  ),
  'morph-nav-blueprint': dynamic(() =>
    import('@/components/diagrams/morph-nav-diagram').then((m) => m.MorphNavBlueprint),
  ),
  'mobile-drawer-blueprint': dynamic(() =>
    import('@/components/diagrams/mobile-drawer-diagram').then((m) => m.MobileDrawerBlueprint),
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
  'radio-group-blueprint': dynamic(() =>
    import('@/components/diagrams/radio-group-diagram').then((m) => m.RadioGroupBlueprint),
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
  'switch-blueprint': dynamic(() =>
    import('@/components/diagrams/switch-diagram').then((m) => m.SwitchBlueprint),
  ),
  'table-blueprint': dynamic(() =>
    import('@/components/diagrams/table-diagram').then((m) => m.TableBlueprint),
  ),
  'table-of-contents-blueprint': dynamic(() =>
    import('@/components/diagrams/table-of-contents-diagram').then(
      (m) => m.TableOfContentsWireframe,
    ),
  ),
  'tabs-subtle-blueprint': dynamic(() =>
    import('@/components/diagrams/tabs-subtle-diagram').then((m) => m.TabsSubtleBlueprint),
  ),
  'input-copy-blueprint': dynamic(() =>
    import('@/components/diagrams/input-copy-diagram').then((m) => m.InputCopyWireframe),
  ),
  'input-message-blueprint': dynamic(() =>
    import('@/components/diagrams/input-message-diagram').then((m) => m.InputMessageBlueprint),
  ),
  'bars-theme-blueprint': dynamic(() =>
    import('@/components/diagrams/bars-theme-diagram').then((m) => m.BarsThemeBlueprint),
  ),
  'glow-orb-blueprint': dynamic(() =>
    import('@/components/diagrams/glow-orb-diagram').then((m) => m.GlowOrbBlueprint),
  ),
  'fluid-orb-blueprint': dynamic(() =>
    import('@/components/diagrams/fluid-orb-diagram').then((m) => m.FluidOrbBlueprint),
  ),
}

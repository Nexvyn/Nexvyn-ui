import type { ComponentItem, ComponentProp } from '@/lib/components-registry'

export const sidebarSelectionProps: ComponentProp[] = [
  {
    name: 'value',
    type: 'string',
    description: 'Controlled id of the current item. It gets aria-current="page".',
  },
  { name: 'defaultValue', type: 'string', description: 'Initial current item when uncontrolled.' },
  {
    name: 'onValueChange',
    type: '(id: string) => void',
    description: 'Called with the item id when a link is pressed.',
  },
]

export function sidebarOpenProps(meaning: string, fallback: string): ComponentProp[] {
  return [
    { name: 'open', type: 'boolean', description: `Controlled state: ${meaning}.` },
    {
      name: 'defaultOpen',
      type: 'boolean',
      description: `Initial state when uncontrolled. Defaults to ${fallback}.`,
    },
    {
      name: 'onOpenChange',
      type: '(open: boolean) => void',
      description: 'Called when the toggle is pressed.',
    },
  ]
}

export const sidebarBaseProps: ComponentProp[] = [
  {
    name: 'title',
    type: 'ReactNode',
    description: 'Heading of the page area. Defaults to the label of the current item.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    description: 'Content of the page area. Defaults to a placeholder layout.',
  },
  {
    name: 'sidebarLabel, navLabel, menuLabel, closeLabel',
    type: 'string',
    description:
      'Accessible names of the sidebar, its navigation and the mobile menu buttons, all overridable for localization.',
  },
]

export const SIDEBAR_DEPENDENCIES = [
  { name: '@hugeicons/react' },
  { name: '@hugeicons/core-free-icons' },
  { name: 'motion' },
]

export const sidebarShared: Pick<
  ComponentItem,
  'collection' | 'previewType' | 'dependencies' | 'interaction'
> = {
  collection: 'blocks',
  previewType: 'default',
  dependencies: SIDEBAR_DEPENDENCIES,
  interaction:
    'An aside with a labelled nav and plain link lists; the current page has aria-current and an accent icon. Toggles are buttons with aria-expanded and aria-controls. Below the medium breakpoint the sidebar becomes a sheet opened from a menu button: focus moves in and is trapped, Escape or the backdrop closes it, and focus returns to the menu button. Only transform and clip-path animate, and reduced motion turns it off.',
}

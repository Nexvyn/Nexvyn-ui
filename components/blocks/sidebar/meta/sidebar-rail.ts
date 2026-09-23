import type { ComponentItem } from '@/lib/components-registry'
import {
  sidebarBaseProps,
  sidebarOpenProps,
  sidebarSelectionProps,
  sidebarShared,
} from '@/components/blocks/sidebar/meta/shared'

export const sidebarRailMetadata: ComponentItem = {
  ...sidebarShared,
  id: 'sidebar-rail',
  name: 'Rail',
  parent: 'sidebar',
  href: '/blocks/sidebar/rail',
  registry: 'sidebar-rail',
  description:
    'A full width header with the brand and account, and an icon rail under it. Hovering or tabbing into the rail opens it over the page without moving it; the button at the bottom keeps it open and makes room for it.',
  props: [
    {
      name: 'items',
      type: '{ id: string; label: string; href: string; icon?: ReactNode }[]',
      description: 'Links in the rail. Give each an icon, since the rail shows icons only.',
    },
    ...sidebarSelectionProps,
    ...sidebarOpenProps('whether the rail is kept open and pushes the page', 'false'),
    {
      name: 'peek',
      type: '"hover" | "off"',
      description:
        'Whether the closed rail opens over the page on hover and keyboard focus. Defaults to "hover".',
      options: ['"hover"', '"off"'],
    },
    { name: 'brand', type: 'string', description: 'Name beside the mark in the header.' },
    { name: 'brandHref', type: 'string', description: 'Where the brand link points.' },
    {
      name: 'userName',
      type: 'string',
      description: 'Name behind the initials avatar; also the accessible name of its link.',
    },
    { name: 'accountHref', type: 'string', description: 'Where the avatar link points.' },
    {
      name: 'expandLabel, collapseLabel',
      type: 'string',
      description: 'Accessible names of the keep open button in each state.',
    },
    ...sidebarBaseProps,
  ],
  usage: `<SidebarRail peek="hover" value={section} onValueChange={setSection}>
  <Dashboard />
</SidebarRail>`,
}

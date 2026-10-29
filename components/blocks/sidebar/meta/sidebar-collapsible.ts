import type { ComponentItem } from '@/lib/components-registry'
import {
  sidebarBaseProps,
  sidebarOpenProps,
  sidebarSelectionProps,
  sidebarShared,
} from '@/components/blocks/sidebar/meta/shared'

export const sidebarCollapsibleMetadata: ComponentItem = {
  ...sidebarShared,
  id: 'sidebar-collapsible',
  name: 'Collapsible',
  parent: 'sidebar',
  href: '/blocks/sidebar/collapsible',
  registry: 'sidebar-collapsible',
  description:
    'A sidebar that folds down to its icons: actions with icons, a list of recent pages that fades out when folded, and the account at the bottom. Folded, the mark turns into the expand button on hover.',
  props: [
    {
      name: 'actions',
      type: '{ id: string; label: string; href: string; icon?: ReactNode }[]',
      description: 'Links that stay visible as icons when the sidebar is folded.',
    },
    {
      name: 'recents',
      type: 'SidebarItem[]',
      description: 'Text only links under the actions, hidden while folded.',
    },
    { name: 'recentsLabel', type: 'string', description: 'Heading of the recent list.' },
    {
      name: 'user',
      type: '{ name: string; detail?: string; href: string }',
      description: 'Account link at the bottom, with initials drawn from the name.',
    },
    ...sidebarSelectionProps,
    ...sidebarOpenProps('whether the sidebar is unfolded from the medium breakpoint', 'true'),
    { name: 'brand', type: 'string', description: 'Name beside the mark.' },
    { name: 'brandHref', type: 'string', description: 'Where the brand link points.' },
    {
      name: 'expandLabel, collapseLabel',
      type: 'string',
      description: 'Accessible names of the fold buttons.',
    },
    ...sidebarBaseProps,
  ],
  usage: `<SidebarCollapsible
  open={unfolded}
  onOpenChange={setUnfolded}
  recents={recentPages}
  user={{ name: 'Mira Tan', detail: 'mira@nexvyn.dev', href: '/account' }}
>
  <Editor />
</SidebarCollapsible>`,
}

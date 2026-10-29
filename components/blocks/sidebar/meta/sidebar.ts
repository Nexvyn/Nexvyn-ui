import type { ComponentItem } from '@/lib/components-registry'
import {
  sidebarBaseProps,
  sidebarSelectionProps,
  sidebarShared,
} from '@/components/blocks/sidebar/meta/shared'

export const sidebarMetadata: ComponentItem = {
  ...sidebarShared,
  id: 'sidebar',
  name: 'Sidebar',
  href: '/blocks/sidebar',
  registry: 'sidebar',
  description:
    'App shells with a sidebar beside the page: a sectioned workspace sidebar that slides away, an icon rail that opens on hover, and a sidebar that folds down to its icons.',
  props: [
    {
      name: 'items',
      type: '{ id: string; label: string; href: string; icon?: ReactNode }[]',
      description: 'Links in the sidebar. Every variant takes them in its own named lists.',
    },
    ...sidebarSelectionProps,
    ...sidebarBaseProps,
  ],
  usage: `<SidebarRail
  value={section}
  onValueChange={setSection}
  items={[
    { id: 'overview', label: 'Overview', href: '/overview', icon: <OverviewIcon /> },
    { id: 'releases', label: 'Releases', href: '/releases', icon: <ReleasesIcon /> },
  ]}
>
  <Dashboard />
</SidebarRail>`,
}

import type { ComponentItem } from '@/lib/components-registry'

export const breadcrumbsMetadata: ComponentItem = {
  id: 'breadcrumbs',
  name: 'Breadcrumbs',
  collection: 'navigation',
  basic: true,
  previewType: 'default',
  description:
    'A horizontal trail of links that auto-collapses into an ellipsis menu when the trail exceeds maxItems. Uses DropdownMenu for the collapsed items.',
  registry: 'breadcrumbs',
  dependencies: [{ name: 'motion' }],
  interaction:
    'Navigate through breadcrumb links. When the trail is long, collapsed items appear in an ellipsis dropdown menu.',
  props: [
    {
      name: 'items',
      type: '{ label: ReactNode; href?: string; icon?: ReactNode; title?: string }[]',
      description: 'The breadcrumb items. Last item without href is the current page.',
      required: true,
    },
    {
      name: 'maxItems',
      type: 'number',
      description: 'Maximum items to show before collapsing. Defaults to 4.',
    },
    {
      name: 'siteUrl',
      type: 'string',
      description: 'Enables JSON-LD BreadcrumbList emission for SEO.',
    },
  ],
  usage: `<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'Components', href: '/components' },
    { label: 'Breadcrumbs' },
  ]}
  maxItems={4}
  siteUrl="https://ui.nexvyn.dev"
/>`,
}

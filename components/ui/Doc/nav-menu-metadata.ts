import type { ComponentItem } from '@/lib/components-registry'

export const navMenuMetadata: ComponentItem = {
  id: 'nav-menu',
  name: 'Nav Menu',
  collection: 'navigation',

  previewType: 'default',
  isNew: true,
  description:
    'A vertical navigation list with two-layer proximity highlight (active route + hover), weight-shift labels, and status dots for new/updated items.',
  registry: 'nav-menu',
  dependencies: [{ name: 'motion' }],
  interaction:
    'Hover or use arrow keys to navigate links. Active route gets a persistent accent-tinted highlight. Labels weight-shift on hover.',
  props: [
    {
      name: 'activeSlug',
      type: 'string | null',
      description: 'The current route path. Required — the router owns truth.',
      required: true,
    },
    {
      name: 'aria-label',
      type: 'string',
      description: 'Accessible label for the nav. Defaults to "Main".',
    },
  ],
  usage: `<NavMenu activeSlug={pathname} aria-label="Docs">
  <NavMenuItem href="/docs" label="Overview" />
  <NavMenuItem href="/docs/install" label="Install" isNew />
  <NavMenuItem href="/docs/theming" label="Theming" isUpdated />
</NavMenu>`,
}

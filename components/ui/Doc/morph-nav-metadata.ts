import type { ComponentItem } from '@/lib/components-registry'

export const morphNavMetadata: ComponentItem = {
  id: 'morph-nav',
  name: 'Morph Nav',
  collection: 'navigation',
  previewType: 'default',
  isNew: true,
  description:
    'A floating action button that morphs through states (closed/main/sub) with SVG path-morphing trigger icon and directional panel slides.',
  registry: 'morph-nav',
  dependencies: [{ name: 'motion' }],
  interaction:
    'Click the trigger to open. Items with sub-menus drill into a sub-view. The trigger icon morphs between hamburger/minus/back-arrow.',
  props: [
    {
      name: 'items',
      type: 'MorphNavItem[]',
      description: 'The nav items. Required.',
      required: true,
    },
    {
      name: 'placement',
      type: "'bottom-end' | 'bottom-start' | 'top-end' | 'top-start'",
      description: 'Panel placement.',
    },
    {
      name: 'onNavigate',
      type: '(href: string, item: MorphNavItem) => void',
      description: 'Called on link navigation.',
    },
  ],
  usage: `<MorphNav items={[{ id: 'dash', label: 'Dashboard', href: '/dash' }]} />`,
}

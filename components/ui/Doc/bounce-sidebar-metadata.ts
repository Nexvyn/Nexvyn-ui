import type { ComponentItem } from '@/lib/components-registry'

export const bounceSidebarMetadata: ComponentItem = {
  id: 'bounce-sidebar',
  name: 'Bounce Sidebar',
  collection: 'navigation',
  previewType: 'default',
  description:
    'A vertical nav whose active marker springs and bounces between items. Pass your own items and dot color; controlled or uncontrolled.',
  registry: 'bounce-sidebar',
  dependencies: [{ name: 'motion' }],
  interaction: 'Click any item to spring the bouncing marker over to it.',
  props: [
    {
      name: 'items',
      type: 'string[]',
      description: 'Labels rendered as the vertical list of nav items.',
      required: true,
    },
    {
      name: 'value',
      type: 'number',
      description: "Active item index for controlled usage. When set, the component won't manage its own state.",
    },
    {
      name: 'defaultValue',
      type: 'number',
      description: 'Initial active index for uncontrolled usage. Ignored when value is provided.',
    },
    {
      name: 'onChange',
      type: '(index: number) => void',
      description: 'Called with the new index whenever an item is selected.',
    },
    {
      name: 'dotColor',
      type: 'string',
      description: 'Any CSS color for the bouncing active marker (hex, rgb, hsl, var).',
    },
    {
      name: 'className',
      type: 'string',
      description: 'Extra classes merged onto the root <ul> element.',
    },
  ],
  usage: `import { BounceSidebar } from "@/components/ui/bounce-sidebar"
  
const items = ["Home", "About", "Services", "Contact"]

export function Demo() {
  return <BounceSidebar items={items} dotColor="#FC4C01" />
}`,
  credits: 'Inspired by aave.com/design',
}

import type { ComponentItem } from '@/lib/components-registry'

export const bounceSidebarMetadata: ComponentItem = {
  id: 'bounce-sidebar',
  name: 'Bounce Sidebar',
  collection: 'effects',
  previewType: 'default',
  description:
    'A sidebar navigation with a bouncing dot indicator that smoothly animates between items using spring physics.',
  registry: 'bounce-sidebar',
  dependencies: [{ name: 'motion' }],
  interaction: 'Click on different items to see the dot bounce and stretch to each position.',
  props: [
    {
      name: 'items',
      type: 'string[]',
      description: 'Array of navigation item labels.',
      required: true,
    },
    {
      name: 'value',
      type: 'number',
      description: 'Controlled active index.',
    },
    {
      name: 'defaultValue',
      type: 'number',
      description: 'Initial active index (default: 0).',
    },
    {
      name: 'onChange',
      type: '(index: number) => void',
      description: 'Callback when active item changes.',
    },
    {
      name: 'dotColor',
      type: 'string',
      description: 'Color of the bouncing dot indicator.',
    },
  ],
  usage: `import { BounceSidebar } from "@/components/ui/bounce-sidebar"

export function Demo() {
  return (
    <BounceSidebar
      items={["Dashboard", "Analytics", "Projects"]}
      defaultValue={0}
    />
  )
}`,
}

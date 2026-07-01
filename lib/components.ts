export type ComponentProp = {
  name: string
  type: string
  description: string
  required?: boolean
  options?: string[]
  control?: 'swatch'
  optionColors?: Record<string, string>
}

export type ComponentItem = {
  id: string
  name: string
  href: string
  description?: string
  registry?: string
  collection?: string
  interaction?: string
  dependencies?: { name: string; icon?: string }[]
  props?: ComponentProp[]
  usage?: string
}

export const components: ComponentItem[] = [
  {
    id: 'bounce-sidebar',
    name: 'Bounce Sidebar',
    href: '/components/bounce-sidebar',
    registry: 'bounce-sidebar',
    description: 'A sidebar navigation with a bouncing dot indicator that smoothly animates between items using spring physics.',
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
  },
]

export function activeComponent(pathname: string): ComponentItem | undefined {
  return components.find((c) => pathname.endsWith(c.id))
}

export function installCommand(item: ComponentItem): string | null {
  if (!item.registry) return null
  return `npx shadcn@latest add ${item.registry}`
}

export const PANEL_INFO = {
  sourceHint: 'Click the code icon in the top-right corner to view the source code.',
  keepInMind: 'These components are built with React, Tailwind CSS, and motion. They work with Next.js and any React framework.',
  contactEmail: 'hello@nexvyn.dev',
  contactNote: 'Questions or feedback? Reach out anytime.',
  license: [
    'Free for personal and commercial use',
    'No attribution required',
    'Cannot be resold as a standalone product',
  ],
}

export function swatchProp(item: ComponentItem | undefined): ComponentProp | undefined {
  return item?.props?.find((p) => p.control === 'swatch' && p.optionColors)
}

export function cleanDefault(prop: ComponentProp | undefined): string | undefined {
  return prop?.options?.[0]?.replace(/^["']|["']$/g, '')
}

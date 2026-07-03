import type { ComponentItem } from '@/lib/components-registry'

export const scrollIndicatorMetadata: ComponentItem = {
  id: 'scroll-indicator',
  name: 'Scroll Indicator',
  collection: 'scroll',
  previewType: 'default',
  description:
    'A vertical TOC-style scroll indicator with tick marks, section labels, and a position readout. Tracks scroll and highlights the active section.',
  registry: 'scroll-indicator',
  dependencies: [{ name: 'motion' }],
  interaction:
    'Scroll the content to see the indicator move. Hover to reveal section labels. Click a label to jump to that section.',
  props: [
    {
      name: 'sections',
      type: 'Section[]',
      description: 'Array of section objects with id, title, and level (2 for h2, 3 for h3).',
      required: true,
    },
    {
      name: 'activeIndex',
      type: 'number',
      description:
        'Controlled active section index. When set, the component does not manage its own state.',
    },
    {
      name: 'onIndexChange',
      type: '(index: number) => void',
      description: 'Called when the active section changes via click.',
    },
    {
      name: 'scrollRef',
      type: 'RefObject<HTMLDivElement>',
      description: 'Ref to the scrollable container for automatic scroll tracking.',
    },
    {
      name: 'className',
      type: 'string',
      description: 'Additional CSS classes.',
    },
  ],
  usage: `import { ScrollIndicator } from "@/components/ui/scroll-indicator"

const sections = [
  { id: "intro", title: "Introduction", level: 2 },
  { id: "setup", title: "Setup", level: 2 },
  { id: "config", title: "Configuration", level: 3 },
]

export function Demo() {
  return <ScrollIndicator sections={sections} />
}`,
}

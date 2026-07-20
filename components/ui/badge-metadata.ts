import type { ComponentItem } from '@/lib/components-registry'

export const badgeMetadata: ComponentItem = {
  id: 'badge',
  name: 'Badge',
  collection: 'inputs',
  previewType: 'default',
  description:
    'A compact status label with solid, muted, and dot variants for tagging content inline.',
  registry: 'badge',
  dependencies: [{ name: 'class-variance-authority' }],
  interaction:
    'Static label by default; supports a shimmer wave on solid badges, a pulsing status dot, dismissible chips, and click interactivity.',
  props: [
    {
      name: 'variant',
      type: '"solid" | "muted" | "dot"',
      description: 'Visual style. Defaults to "solid".',
    },
    {
      name: 'size',
      type: '"sm" | "md" | "lg"',
      description: 'Badge size. Defaults to "md".',
    },
    {
      name: 'icon',
      type: 'ReactNode',
      description: 'Leading decorative icon (solid/muted variants).',
    },
    {
      name: 'shimmer',
      type: 'boolean',
      description:
        'Solid variant only: a soft light wave sweeps across the badge (default: true). Disabled under reduced motion.',
    },
    {
      name: 'pulse',
      type: 'boolean',
      description:
        'Dot variant only: softly pulses the status dot (default: false). Disabled under reduced motion.',
    },
    {
      name: 'onDismiss',
      type: '(event) => void',
      description: 'Renders a trailing remove button and calls back on activation.',
    },
    {
      name: 'dismissLabel',
      type: 'string',
      description: 'Accessible label for the remove button (default: "Remove").',
    },
    {
      name: 'asChild',
      type: 'boolean',
      description: 'Merge badge styling onto the child element (Slot pattern).',
    },
    {
      name: 'className',
      type: 'string',
      description: 'Additional CSS classes.',
    },
  ],
  usage: `import { Badge } from "@/components/ui/badge"

export function Demo() {
  return (
    <div className="flex items-center gap-2">
      <Badge>New</Badge>
      <Badge variant="muted">Beta</Badge>
      <Badge variant="dot" pulse>Live</Badge>
      <Badge variant="muted" onDismiss={() => console.log("removed")}>
        Filter
      </Badge>
    </div>
  )
}`,
}

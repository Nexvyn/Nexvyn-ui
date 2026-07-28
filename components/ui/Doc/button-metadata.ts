import type { ComponentItem } from '@/lib/components-registry'

export const buttonMetadata: ComponentItem = {
  id: 'button',
  name: 'Button',
  collection: 'primitives',
  basic: true,
  previewType: 'default',
  isNew: true,
  description:
    'A pressable trigger with spring-animated depth feedback, sound cues, and solid/outline/ghost/link variants.',
  registry: 'button',
  dependencies: [
    { name: 'motion' },
    { name: '@radix-ui/react-slot' },
    { name: 'class-variance-authority' },
  ],
  interaction:
    'Press animates scale(0.97) + translateY(1px) via spring physics; hover shifts background color; sound cues on hover and click; loading state swaps content for a spinner while preserving width.',
  props: [
    {
      name: 'variant',
      type: '"solid" | "outline" | "ghost" | "link"',
      description: 'Visual style. Defaults to "solid".',
    },
    {
      name: 'size',
      type: '"sm" | "md" | "lg"',
      description: 'Button height and padding tier. Defaults to "md" (44px touch target).',
    },
    {
      name: 'destructive',
      type: 'boolean',
      description: 'Applies error-color styling appropriate to the current variant.',
    },
    {
      name: 'loading',
      type: 'boolean',
      description: 'Shows a spinner, preserves width, sets aria-busy and disables interaction.',
    },
    {
      name: 'asChild',
      type: 'boolean',
      description: 'Merge button styling onto the child element via the Slot pattern.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      description: 'Disables the button with reduced opacity and no pointer events.',
    },
    {
      name: 'className',
      type: 'string',
      description: 'Additional CSS classes merged via cn().',
    },
  ],
  usage: `import { Button } from "@/components/ui/button"

export function Demo() {
  return (
    <div className="flex items-center gap-3">
      <Button>Primary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button destructive>Delete</Button>
      <Button loading>Saving…</Button>
    </div>
  )
}`,
}

import type { ComponentItem } from '@/lib/components-registry'

export const diaTextMetadata: ComponentItem = {
  id: 'dia-text',
  name: 'Dia Text',
  collection: 'text-effects',
  previewType: 'default',
  isNew: true,
  description:
    'Diagonal clip-path reveal for bold display typography. Text sweeps into view with an angled edge as the component enters the viewport, creating a striking editorial entrance effect.',
  registry: 'dia-text',
  dependencies: [{ name: 'motion' }],
  interaction:
    'Scroll-triggered — text reveals via an animated diagonal clip-path polygon when the component enters the viewport. Direction and angle are configurable. Respects prefers-reduced-motion by showing text immediately.',
  props: [
    {
      name: 'children',
      type: 'string',
      description: 'The text string to reveal with a diagonal clip-path sweep.',
      required: true,
    },
    {
      name: 'direction',
      type: "'left' | 'right'",
      description:
        'Direction of the diagonal sweep. "left" sweeps from left to right, "right" sweeps from right to left. Defaults to "left".',
    },
    {
      name: 'angle',
      type: 'number',
      description:
        'Angle of the diagonal slant in degrees. Higher values create a steeper diagonal. Defaults to 12.',
    },
    {
      name: 'once',
      type: 'boolean',
      description:
        'Only animate on first viewport entry. When false, re-animates each time it scrolls into view. Defaults to true.',
    },
    {
      name: 'className',
      type: 'string',
      description: 'Additional CSS classes merged onto the wrapper element.',
    },
  ],
  usage: `import { DiaText } from "@/components/ui/dia-text"

export function Hero() {
  return (
    <DiaText direction="left" angle={12}>
      Fluid Precision
    </DiaText>
  )
}`,
}

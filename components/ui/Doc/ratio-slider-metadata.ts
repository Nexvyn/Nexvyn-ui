import type { ComponentItem } from '@/lib/components-registry'

export const ratioSliderMetadata: ComponentItem = {
  id: 'ratio-slider',
  name: 'Ratio Slider',
  collection: 'inputs',
  previewType: 'default',
  description:
    'A split ratio slider with two color bars, a draggable divider, and responsive labels that collapse when space is tight.',
  registry: 'ratio-slider',
  dependencies: [{ name: 'motion' }],
  interaction:
    'Drag the divider or use arrow keys to adjust the ratio. Labels collapse on narrow widths.',
  props: [
    {
      name: 'value',
      type: 'number',
      description: 'Controlled ratio value (0-100).',
    },
    {
      name: 'defaultValue',
      type: 'number',
      description: 'Initial ratio for uncontrolled usage. Defaults to 60.',
    },
    {
      name: 'onChange',
      type: '(value: number) => void',
      description: 'Called with the new ratio on each change.',
    },
    {
      name: 'leftLabel',
      type: 'string',
      description: 'Label for the left side. Defaults to "RICH".',
    },
    {
      name: 'rightLabel',
      type: 'string',
      description: 'Label for the right side. Defaults to "LIGHT".',
    },
    {
      name: 'leftColor',
      type: 'string',
      description: 'Background color of the left bar.',
    },
    {
      name: 'rightColor',
      type: 'string',
      description: 'Background color of the right bar.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      description: 'Disables all interactions.',
    },
    {
      name: 'className',
      type: 'string',
      description: 'Additional CSS classes.',
    },
  ],
  usage: `import { RatioSlider } from "@/components/ui/ratio-slider"

export function Demo() {
  return (
    <RatioSlider
      defaultValue={60}
      leftLabel="RICH"
      rightLabel="LIGHT"
      leftColor="var(--color-fg)"
      rightColor="var(--color-muted)"
    />
  )
}`,
}

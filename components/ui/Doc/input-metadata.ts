import type { ComponentItem } from '@/lib/components-registry'

export const inputMetadata: ComponentItem = {
  id: 'input',
  name: 'Input',
  collection: 'inputs',
  previewType: 'default',
  basic: true,
  description: 'The text field foundation with adornments, size variants, and animated focus ring.',
  registry: 'input',
  dependencies: [],
  interaction: 'Type text. Focus ring draws in. Start/end adornments for icons.',
  props: [
    { name: 'label', type: 'string', description: 'Label text above the input.' },
    { name: 'size', type: "'sm' | 'md'", description: 'Input size. Defaults to md.' },
    { name: 'startAdornment', type: 'ReactNode', description: 'Icon or element before the input.' },
    { name: 'endAdornment', type: 'ReactNode', description: 'Icon or element after the input.' },
    { name: 'error', type: 'string', description: 'Error message below the input.' },
  ],
  usage: `<Input label="Email" placeholder="you@example.com" />`,
}

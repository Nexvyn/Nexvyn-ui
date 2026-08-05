import type { ComponentItem } from '@/lib/components-registry'

export const inputMetadata: ComponentItem = {
  id: 'input',
  name: 'Input',
  collection: 'inputs',
  previewType: 'default',
  basic: true,
  description:
    'Text field foundation with start/end adornment slots, size variants, and a signature animated focus ring that draws in on focus.',
  registry: 'input',
  dependencies: [{ name: 'motion' }, { name: 'class-variance-authority' }],
  interaction:
    'Focus the field — accent ring draws in (opacity + scale 0.98→1 settle). Start/end adornments for icons or kbd hints. Invalid state recolors ring and border.',
  props: [
    { name: 'size', type: "'sm' | 'md'", description: 'Input size variant. Defaults to md.' },
    {
      name: 'startAdornment',
      type: 'ReactNode',
      description: 'Icon or element rendered before the input.',
    },
    {
      name: 'endAdornment',
      type: 'ReactNode',
      description: 'Icon or element rendered after the input.',
    },
    { name: 'label', type: 'string', description: 'Label text above the input.' },
    {
      name: 'error',
      type: 'string',
      description: 'Error message below the input. Triggers invalid state.',
    },
    {
      name: 'containerClassName',
      type: 'string',
      description: 'Additional classes for the outer wrapper.',
    },
  ],
  usage: `<Input
  label="Email"
  placeholder="you@example.com"
  startAdornment={<MailIcon />}
/>`,
}

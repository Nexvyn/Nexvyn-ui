import type { ComponentItem } from '@/lib/components-registry'

export const checkboxMetadata: ComponentItem = {
  id: 'checkbox',
  name: 'Checkbox',
  collection: 'inputs',
  previewType: 'default',
  isNew: true,
  basic: true,
  description:
    'A checkbox with drawn check animation, indeterminate state, and hidden native input for forms.',
  registry: 'checkbox',
  dependencies: [{ name: 'motion' }],
  interaction: 'Click to toggle. Supports checked, unchecked, and indeterminate states.',
  props: [
    { name: 'checked', type: 'boolean', description: 'Controlled checked state.' },
    {
      name: 'onCheckedChange',
      type: '(checked: boolean) => void',
      description: 'Called on change.',
    },
    { name: 'label', type: 'string', description: 'Label text.' },
    { name: 'indeterminate', type: 'boolean', description: 'Show indeterminate state.' },
    {
      name: 'strikeThrough',
      type: 'boolean',
      description: 'Draws a line through the label when checked, to-do-list style.',
    },
  ],
  usage: `<Checkbox label="Accept terms" checked={checked} onCheckedChange={setChecked} />`,
}

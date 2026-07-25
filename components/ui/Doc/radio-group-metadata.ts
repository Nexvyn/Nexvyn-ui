import type { ComponentItem } from '@/lib/components-registry'

export const radioGroupMetadata: ComponentItem = {
  id: 'radio-group',
  name: 'Radio Group',
  collection: 'inputs',
  previewType: 'default',
  isNew: true,
  basic: true,
  description: 'A radio group with roving tabindex and a dot morph selection indicator.',
  registry: 'radio-group',
  dependencies: [{ name: 'motion' }],
  interaction: 'Click or use arrow keys to select. One radio at a time.',
  props: [
    { name: 'value', type: 'string', description: 'Controlled selected value.' },
    { name: 'onValueChange', type: '(value: string) => void', description: 'Called on selection.' },
    { name: 'name', type: 'string', description: 'Form field name.' },
  ],
  usage: `<RadioGroup value={size} onValueChange={setSize}>
  <RadioItem value="small" label="Small" />
  <RadioItem value="large" label="Large" />
</RadioGroup>`,
}

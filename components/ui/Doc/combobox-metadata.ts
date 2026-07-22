import type { ComponentItem } from '@/lib/components-registry'

export const comboboxMetadata: ComponentItem = {
  id: 'combobox',
  name: 'Combobox',
  collection: 'menus',
  previewType: 'default',
  basic: true,
  description:
    'A filterable select with live search, proximity highlight riding the filter, clearable input, and native <select> mirror for forms.',
  registry: 'combobox',
  dependencies: [{ name: 'motion' }],
  interaction:
    'Type to filter options. Arrow keys navigate matches. Enter commits. The highlight springs to the new first match on each keystroke.',
  props: [
    {
      name: 'options',
      type: '{ value: string; label: string; description?: string }[]',
      description: 'The options to filter.',
      required: true,
    },
    { name: 'value', type: 'string', description: 'Controlled value.' },
    { name: 'onValueChange', type: '(value: string) => void', description: 'Called on selection.' },
    {
      name: 'placeholder',
      type: 'string',
      description: 'Input placeholder. Defaults to "Search…".',
    },
    { name: 'clearable', type: 'boolean', description: 'Show clear button. Defaults to true.' },
  ],
  usage: `<Combobox options={[{ value: 'ber', label: 'Berlin' }]} value={city} onValueChange={setCity} placeholder="Search city…">
  <ComboboxInput />
  <ComboboxContent />
</Combobox>`,
}

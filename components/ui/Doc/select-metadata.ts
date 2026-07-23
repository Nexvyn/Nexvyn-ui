import type { ComponentItem } from '@/lib/components-registry'

export const selectMetadata: ComponentItem = {
  id: 'select',
  name: 'Select',
  collection: 'menus',
  basic: true,
  previewType: 'default',
  isNew: true,
  description:
    'A form select with a two-layer proximity highlight (selected accent tint + muted hover), drawn check animation, and a trigger label morph on selection change.',
  registry: 'select',
  dependencies: [{ name: 'motion' }],
  interaction:
    'Click the trigger to open. Hover or use arrow keys to navigate items. Click or press Enter to select. The trigger label morphs when selection changes.',
  props: [
    {
      name: 'value',
      type: 'string',
      description: 'Controlled selected value.',
    },
    {
      name: 'defaultValue',
      type: 'string',
      description: 'Initial selected value for uncontrolled usage.',
    },
    {
      name: 'onValueChange',
      type: '(value: string) => void',
      description: 'Called when the selection changes.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      description: 'Disables all items. Defaults to false.',
    },
    {
      name: 'name',
      type: 'string',
      description: 'Name for the hidden native <select> (form integration).',
    },
    {
      name: 'required',
      type: 'boolean',
      description: 'Required for form validation. Defaults to false.',
    },
  ],
  usage: `import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

export function Demo() {
  const [value, setValue] = useState("")
  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger>
        <SelectValue placeholder="Choose size" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="small">Small</SelectItem>
        <SelectItem value="medium">Medium</SelectItem>
        <SelectItem value="large">Large</SelectItem>
      </SelectContent>
    </Select>
  )
}`,
}

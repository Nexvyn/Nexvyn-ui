import type { ComponentItem } from '@/lib/components-registry'

export const radioGroupMetadata: ComponentItem = {
  id: 'radio-group',
  name: 'Radio Group',
  collection: 'inputs',
  previewType: 'default',
  basic: true,
  description:
    'A radio group with roving tabindex and a traveling dot morph — the selection indicator springs from the previous radio to the new one via layoutId animation.',
  registry: 'radio-group',
  dependencies: [{ name: 'motion' }],
  interaction:
    'Click to select. Arrow keys move and select (Up/Down vertical, Left/Right horizontal, RTL-aware). Tab enters/exits the group as a single stop.',
  props: [
    {
      name: 'value',
      type: 'string',
      description: 'Controlled selected value.',
    },
    {
      name: 'defaultValue',
      type: 'string',
      description: 'Initial value for uncontrolled usage.',
    },
    {
      name: 'onValueChange',
      type: '(value: string) => void',
      description: 'Called when the selected value changes.',
    },
    {
      name: 'name',
      type: 'string',
      description: 'Form field name applied to hidden radio inputs.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      description: 'Disables all items in the group.',
    },
    {
      name: 'required',
      type: 'boolean',
      description: 'Marks the group as required for form validation.',
    },
    {
      name: 'orientation',
      type: "'vertical' | 'horizontal'",
      description: 'Layout direction. Determines which arrow keys navigate.',
    },
  ],
  usage: `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function Demo() {
  const [size, setSize] = useState('medium')
  return (
    <RadioGroup value={size} onValueChange={setSize} name="size">
      <RadioGroupItem value="small">Small</RadioGroupItem>
      <RadioGroupItem value="medium">Medium</RadioGroupItem>
      <RadioGroupItem value="large">Large</RadioGroupItem>
    </RadioGroup>
  )
}`,
}

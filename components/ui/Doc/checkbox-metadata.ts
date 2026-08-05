import type { ComponentItem } from '@/lib/components-registry'

export const checkboxMetadata: ComponentItem = {
  id: 'checkbox',
  name: 'Checkbox',
  collection: 'inputs',
  basic: true,
  previewType: 'default',
  description:
    'A toggle control with drawn-check animation, indeterminate state, and full form integration via hidden native input.',
  registry: 'checkbox',
  dependencies: [{ name: 'motion' }],
  interaction:
    'Click or Space/Enter to toggle. Supports checked, unchecked, and indeterminate states. Drawn check glyph animates on toggle with spring physics. Respects reduced motion.',
  props: [
    {
      name: 'checked',
      type: 'boolean | "indeterminate"',
      description: 'Controlled checked state. Omit for uncontrolled.',
    },
    {
      name: 'defaultChecked',
      type: 'boolean',
      description: 'Initial checked state for uncontrolled usage.',
    },
    {
      name: 'onCheckedChange',
      type: '(checked: boolean | "indeterminate") => void',
      description: 'Callback when the checked state changes.',
    },
    {
      name: 'name',
      type: 'string',
      description: 'Form field name for the hidden native input.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      description: 'Disables the checkbox.',
    },
    {
      name: 'required',
      type: 'boolean',
      description: 'Marks the field as required for form validation.',
    },
    {
      name: 'aria-invalid',
      type: 'boolean',
      description: 'Indicates validation error state.',
    },
    {
      name: 'aria-describedby',
      type: 'string',
      description: 'ID of the element describing the checkbox.',
    },
    {
      name: 'className',
      type: 'string',
      description: 'Additional CSS classes merged via cn().',
    },
  ],
  usage: `import { Checkbox, CheckboxField } from "@/components/ui/checkbox"

export function Demo() {
  return (
    <div className="flex flex-col gap-4">
      <CheckboxField label="Accept terms" description="You agree to our Terms.">
        <Checkbox name="terms" required />
      </CheckboxField>
      <CheckboxField label="Subscribe to updates">
        <Checkbox name="subscribe" defaultChecked />
      </CheckboxField>
    </div>
  )
}`,
}

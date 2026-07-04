import type { ComponentItem } from '@/lib/components-registry'

export const passwordInputMetadata: ComponentItem = {
  id: 'password-input',
  name: 'Password Input',
  collection: 'inputs',
  previewType: 'default',
  description:
    'A password input with an animated eye toggle. The eye follows your cursor and blinks periodically, creating a playful yet functional reveal control.',
  registry: 'password-input',
  dependencies: [{ name: 'motion' }],
  interaction: 'Click the eye icon to toggle password visibility. The pupil tracks your cursor.',
  props: [
    {
      name: 'label',
      type: 'string',
      description: 'Label text above the input. Defaults to "Password".',
    },
    {
      name: 'showLabel',
      type: 'string',
      description: 'Accessible label when password is hidden. Defaults to "Show password".',
    },
    {
      name: 'hideLabel',
      type: 'string',
      description: 'Accessible label when password is visible. Defaults to "Hide password".',
    },
    {
      name: 'containerClassName',
      type: 'string',
      description: 'Additional classes for the outer container.',
    },
    {
      name: 'labelClassName',
      type: 'string',
      description: 'Additional classes for the label element.',
    },
    {
      name: 'className',
      type: 'string',
      description: 'Additional classes for the input element.',
    },
  ],
  usage: `import { PasswordInput } from "@/components/ui/password-input"

export function Demo() {
  return <PasswordInput placeholder="Enter your password" />
}`,
}

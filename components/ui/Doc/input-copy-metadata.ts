import type { ComponentItem } from '@/lib/components-registry'

export const inputCopyMetadata: ComponentItem = {
  id: 'input-copy',
  name: 'Input Copy',
  collection: 'inputs',
  basic: true,
  previewType: 'default',
  description:
    'A copy-to-clipboard field that shows a monospace value in a read-only input with an icon or button trigger, animating a checkmark on copy.',
  registry: 'input-copy',
  dependencies: [{ name: 'motion' }],
  interaction:
    'Click or press Enter on the copy button to copy the value with tactile audio feedback. The icon morphs into a checkmark and the result is announced to screen readers. Falls back to a legacy copy when the Clipboard API is unavailable.',
  props: [
    {
      name: 'value',
      type: 'string',
      description: 'The value to display and copy to clipboard.',
    },
    {
      name: 'label',
      type: 'string',
      description: 'Optional label displayed above the value.',
    },
    {
      name: 'onCopy',
      type: '() => void',
      description: 'Called after the value is copied.',
    },
    {
      name: 'variant',
      type: '"icon" | "button"',
      description: 'Icon-only with tooltip, or a labeled button. Defaults to "icon".',
    },
    {
      name: 'align',
      type: '"right" | "left"',
      description: 'Position of the copy action relative to the value. Defaults to "right".',
    },
    {
      name: 'disabled',
      type: 'boolean',
      description: 'Disables copying.',
    },
    {
      name: 'copyLabel',
      type: 'string',
      description:
        'Accessible label and tooltip for the icon trigger. Defaults to "Copy to clipboard".',
    },
    {
      name: 'copiedLabel',
      type: 'string',
      description: 'Text shown and announced after a successful copy. Defaults to "Copied".',
    },
    {
      name: 'failedLabel',
      type: 'string',
      description: 'Text announced when copying fails and the value is selected instead.',
    },
    {
      name: 'buttonText',
      type: 'string',
      description: 'Trigger text for the button variant. Defaults to "Copy".',
    },
    {
      name: 'resetDelay',
      type: 'number',
      description: 'Milliseconds before the copied state resets. Defaults to 2000.',
    },
  ],
  usage: `import { InputCopy } from "@/components/ui/input-copy"

export function Demo() {
  return <InputCopy label="API Key" value="sk-proj-a1b2c3d4e5f6" variant="button" />
}`,
}

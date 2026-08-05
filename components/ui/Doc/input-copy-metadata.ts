import type { ComponentItem } from '@/lib/components-registry'

export const inputCopyMetadata: ComponentItem = {
  id: 'input-copy',
  name: 'Input Copy',
  collection: 'inputs',
  previewType: 'default',
  description:
    'A copy-to-clipboard field that shows a monospace value with an icon or button trigger, animating a checkmark on copy.',
  registry: 'input-copy',
  dependencies: [{ name: 'motion' }],
  interaction:
    'Hover field for micro-clicks; click to copy the value with tactile audio feedback. The icon morphs into a checkmark.',
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
  ],
  usage: `import { InputCopy } from "@/components/ui/input-copy"

export function Demo() {
  return <InputCopy label="API Key" value="sk-proj-a1b2c3d4e5f6" variant="button" />
}`,
}

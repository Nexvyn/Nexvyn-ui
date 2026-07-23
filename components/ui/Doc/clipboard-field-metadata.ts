import type { ComponentItem } from '@/lib/components-registry'

export const clipboardFieldMetadata: ComponentItem = {
  id: 'clipboard-field',
  name: 'Clipboard Field',
  collection: 'inputs',
  previewType: 'default',
  isNew: true,
  description:
    'A one-click install/copy field that morphs between the command and a success label using CSS grid fr tracks — JS only copies and toggles state.',
  registry: 'clipboard-field',
  dependencies: [],
  interaction:
    'Click (or activate with keyboard) to copy the command. The field morphs width via grid-template-columns, blurs between command and success text, then resets after a short delay. Respects reduced motion.',
  props: [
    {
      name: 'value',
      type: 'string',
      required: true,
      description: 'Command or string written to the clipboard.',
    },
    {
      name: 'prompt',
      type: 'string',
      description: 'Leading prompt glyph (default: "$").',
    },
    {
      name: 'copiedLabel',
      type: 'string',
      description: 'Success label after copy (default: "Copied to clipboard").',
    },
    {
      name: 'copyLabel',
      type: 'string',
      description: 'Accessible label while idle (default: "Copy to clipboard").',
    },
    {
      name: 'resetDelay',
      type: 'number',
      description: 'Milliseconds the success state stays visible (default: 2000).',
    },
    {
      name: 'onCopy',
      type: '() => void',
      description: 'Callback after a successful clipboard write.',
    },
    {
      name: 'hideIcon',
      type: 'boolean',
      description: 'Hide the trailing copy/check icon.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      description: 'Disable interaction.',
    },
    {
      name: 'className',
      type: 'string',
      description: 'Additional CSS classes.',
    },
  ],
  usage: `import { ClipboardField } from "@/components/ui/clipboard-field"

export function Demo() {
  return (
    <ClipboardField
      value="npx shadcn@latest add @nexvyn/badge"
      onCopy={() => console.log("copied")}
    />
  )
}`,
}

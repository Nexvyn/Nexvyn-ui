import type { ComponentItem } from '@/lib/components-registry'

export const inputMessageMetadata: ComponentItem = {
  id: 'input-message',
  name: 'Input Message',
  collection: 'inputs',
  previewType: 'default',
  description:
    'An auto-growing chat composer with drag-and-drop file attachments, image/PDF preview tiles, and Enter-to-send.',
  registry: 'input-message',
  dependencies: [{ name: 'motion' }, { name: 'pdfjs-dist' }],
  interaction:
    'Type and press Enter to send (Shift+Enter for a newline). Drag files onto the composer or use the attach slot to add image/PDF previews.',
  props: [
    {
      name: 'value',
      type: 'string',
      description: 'Controlled textarea value.',
    },
    {
      name: 'onValueChange',
      type: '(value: string) => void',
      description: 'Called with the new value on every textarea change.',
    },
    {
      name: 'onSend',
      type: '(value: string, files: File[]) => void',
      description: 'Fired when the user submits via Enter or the send button.',
    },
    {
      name: 'placeholder',
      type: 'string',
      description: 'Placeholder shown when the value is empty.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      description: 'Disables the textarea, send button, and drag-and-drop.',
    },
    {
      name: 'minRows',
      type: 'number',
      description: 'Minimum visible rows before the textarea grows. Defaults to 1.',
    },
    {
      name: 'maxRows',
      type: 'number',
      description: 'Maximum visible rows before the textarea scrolls. Defaults to 8.',
    },
    {
      name: 'files',
      type: 'File[]',
      description: 'Controlled list of attached files. Omit to disable attachments entirely.',
    },
    {
      name: 'onFilesChange',
      type: '(files: File[]) => void',
      description: 'Called when files are added (drag-drop or picker) or removed.',
    },
    {
      name: 'accept',
      type: 'string',
      description: 'Accepted MIME types, comma-separated. Defaults to PNG/JPEG/PDF.',
    },
    {
      name: 'maxFiles',
      type: 'number',
      description: 'Maximum number of files. Extra files are dropped past the limit.',
    },
    {
      name: 'sendLabel',
      type: 'string',
      description: 'Accessible label for the send button. Defaults to "Send".',
    },
  ],
  usage: `import { useState } from "react"
import { InputMessage } from "@/components/ui/input-message"

export function Demo() {
  const [value, setValue] = useState("")
  return (
    <InputMessage
      value={value}
      onValueChange={setValue}
      onSend={() => setValue("")}
    />
  )
}`,
}

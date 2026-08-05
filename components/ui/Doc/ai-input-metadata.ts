import type { ComponentItem } from '@/lib/components-registry'

export const aiInputMetadata: ComponentItem = {
  id: 'ai-input',
  name: 'AI Input',
  collection: 'inputs',
  previewType: 'default',
  isNew: true,
  description:
    'AI composer textarea with auto-grow, send/stop button morph, attachment slots, and Enter-to-send.',
  registry: 'ai-input',
  dependencies: [{ name: 'motion' }],
  interaction:
    'Type and press Enter to send (Shift+Enter for newline, IME-guarded). Send glyph launches upward on submit while the field relaxes to one row. During streaming the send button crossfades to a stop button.',
  props: [
    {
      name: 'value',
      type: 'string',
      description: 'Controlled textarea value.',
    },
    {
      name: 'defaultValue',
      type: 'string',
      description: 'Initial value for uncontrolled usage.',
    },
    {
      name: 'onValueChange',
      type: '(value: string) => void',
      description: 'Called with the new value on every textarea change.',
    },
    {
      name: 'onSubmit',
      type: '(value: string) => void',
      description: 'Fired when the user submits via Enter or the send button.',
    },
    {
      name: 'streaming',
      type: 'boolean',
      description: 'When true, the send button morphs into a stop button.',
    },
    {
      name: 'onStop',
      type: '() => void',
      description: 'Fired when the user clicks the stop button during streaming.',
    },
    {
      name: 'placeholder',
      type: 'string',
      description: 'Placeholder shown when the textarea is empty.',
    },
    {
      name: 'maxRows',
      type: 'number',
      description: 'Maximum visible rows before internal scroll. Defaults to 6.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      description: 'Disables the textarea and all buttons.',
    },
    {
      name: 'name',
      type: 'string',
      description: 'Form field name attribute forwarded to the textarea.',
    },
    {
      name: 'startSlot',
      type: 'ReactNode',
      description: 'Slot rendered before the textarea (e.g. attach button).',
    },
    {
      name: 'endSlot',
      type: 'ReactNode',
      description:
        'Slot rendered after the textarea and before the send button (e.g. model picker).',
    },
    {
      name: 'className',
      type: 'string',
      description: 'Additional CSS classes for the container.',
    },
  ],
  usage: `import { useState } from "react"
import { AiInput } from "@/components/ui/ai-input"

export function Demo() {
  const [value, setValue] = useState("")
  return (
    <AiInput
      value={value}
      onValueChange={setValue}
      onSubmit={() => setValue("")}
      placeholder="Ask anything..."
    />
  )
}`,
}

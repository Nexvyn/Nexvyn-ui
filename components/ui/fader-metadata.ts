import type { ComponentItem } from '@/lib/components-registry'

export const faderMetadata: ComponentItem = {
  id: 'fader',
  name: 'Fader',
  collection: 'inputs',
  previewType: 'default',
  isNew: true,
  description:
    'A mixing-console-style parameter fader where the control IS the display — label and value live inside the track, the fill edge is the reading, and a thin bar rides the edge as the grab signifier. Supports continuous and detent (snappy) value grammars, elastic overdrag, and spring-animated settle.',
  registry: 'fader',
  dependencies: [{ name: '@base-ui/react' }, { name: 'motion' }],
  interaction:
    'Click or drag the track to change the value. Use arrow keys for keyboard control. PageUp/PageDown for large steps.',
  props: [
    {
      name: 'label',
      type: 'string',
      description: 'Accessible name; also used to attribute dev-time warnings.',
      required: true,
    },
    {
      name: 'value',
      type: 'number',
      description: 'Controlled value for the slider.',
      required: true,
    },
    {
      name: 'onValueChange',
      type: '(value: number) => void',
      description: 'Called with the new value whenever it changes.',
      required: true,
    },
    {
      name: 'min',
      type: 'number',
      description: 'Minimum value. Defaults to 0.',
    },
    {
      name: 'max',
      type: 'number',
      description: 'Maximum value. Defaults to 100.',
    },
    {
      name: 'step',
      type: 'number',
      description: 'Step increment. Defaults to 1.',
    },
    {
      name: 'unit',
      type: 'string',
      description: 'Spoken after the value via aria-valuetext (e.g. "%").',
    },
    {
      name: 'points',
      type: 'number[]',
      description:
        'Snap-points grammar: pointer input only ever lands on these values. Omit for continuous.',
    },
    {
      name: 'size',
      type: '"sm" | "md" | "lg"',
      description: 'Size variant. Defaults to "md".',
      options: ['sm', 'md', 'lg'],
    },
    {
      name: 'tone',
      type: '"accent" | "neutral"',
      description: 'Color tone. Defaults to "accent".',
      options: ['accent', 'neutral'],
    },
    {
      name: 'bordered',
      type: 'boolean',
      description: 'Hairline input outline for busy surfaces.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      description: 'Disables the fader.',
    },
    {
      name: 'className',
      type: 'string',
      description: 'Extra classes merged onto the root element.',
    },
  ],
  usage: `import { Fader } from "@/components/ui/fader"

export function Demo() {
  const [value, setValue] = useState(65)

  return (
    <Fader
      label="Volume"
      value={value}
      onValueChange={setValue}
      min={0}
      max={100}
      unit="%"
      size="md"
      tone="accent"
    />
  )
}`,
}

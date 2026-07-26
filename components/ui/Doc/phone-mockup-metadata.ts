import type { ComponentItem } from '@/lib/components-registry'

export const phoneMockupMetadata: ComponentItem = {
  id: 'phone-mockup',
  name: 'Phone Mockup',
  collection: 'illustration',
  previewType: 'default',
  size: 'lg',
  description:
    'A device-frame illustration with side buttons, dynamic island, and a cropped/scrolled variant for showcasing app screens.',
  registry: 'phone-mockup',
  dependencies: [],
  props: [
    {
      name: 'variant',
      type: '"black" | "white" | "accent"',
      description: 'Chassis color. Defaults to "accent".',
    },
    {
      name: 'visibleRatio',
      type: 'number',
      description:
        'Fraction of the phone height shown, cropping the frame from the bottom to simulate a scrolled screen. Defaults to 1 (full phone).',
    },
    {
      name: 'showDynamicIsland',
      type: 'boolean',
      description: 'Shows the dynamic island cutout. Defaults to true.',
    },
    {
      name: 'className',
      type: 'string',
      description: 'Extra classes merged onto the root element.',
    },
  ],
  usage: `import { PhoneMockupCard } from "@/components/illustration/phone-mockup"

export function Example() {
  return (
    <PhoneMockupCard variant="accent">
      <YourAppScreen />
    </PhoneMockupCard>
  )
}`,
}

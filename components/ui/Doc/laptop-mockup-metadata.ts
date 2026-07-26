import type { ComponentItem } from '@/lib/components-registry'

export const laptopMockupMetadata: ComponentItem = {
  id: 'laptop-mockup',
  name: 'Laptop Mockup',
  collection: 'illustration',
  previewType: 'default',
  size: 'xl',
  description: 'A laptop device-frame illustration for showcasing app screens.',
  registry: 'laptop-mockup',
  dependencies: [],
  props: [
    {
      name: 'variant',
      type: '"gray" | "titanium"',
      description: 'Chassis color. Defaults to "gray".',
    },
    {
      name: 'className',
      type: 'string',
      description: 'Extra classes merged onto the root element.',
    },
  ],
  usage: `import { LaptopMockupCard } from "@/components/illustration/laptop-mockup"

export function Example() {
  return (
    <LaptopMockupCard variant="titanium">
      <YourAppScreen />
    </LaptopMockupCard>
  )
}`,
}

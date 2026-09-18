import type { ComponentItem, ComponentProp } from '@/lib/components-registry'

export const ctaSectionProps: ComponentProp[] = [
  { name: 'description', type: 'ReactNode', description: 'Supporting text under the heading.' },
  { name: 'className', type: 'string', description: 'Merged onto the section with cn().' },
]

export const CTA_DEPENDENCIES = [
  { name: '@radix-ui/react-slot' },
  { name: 'class-variance-authority' },
  { name: '@hugeicons/react' },
  { name: '@hugeicons/core-free-icons' },
]

export const ctaShared: Pick<
  ComponentItem,
  'collection' | 'previewType' | 'dependencies' | 'interaction'
> = {
  collection: 'blocks',
  previewType: 'default',
  dependencies: CTA_DEPENDENCIES,
  interaction:
    'A labelled section landmark: the heading names it for screen readers. Tab moves through the actions in reading order, each with the accent focus ring and a 44px target. Hover or focus the primary action and its arrow slides forward; reduced motion keeps it still.',
}

import type { ComponentItem, ComponentProp } from '@/lib/components-registry'

export const bannerOpenProps: ComponentProp[] = [
  { name: 'open', type: 'boolean', description: 'Controlled open state.' },
  { name: 'defaultOpen', type: 'boolean', description: 'Initial open state. Defaults to true.' },
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    description: 'Called when the banner is dismissed.',
  },
  {
    name: 'dismissible',
    type: 'boolean',
    description: 'Shows the dismiss button. Defaults to true.',
  },
  {
    name: 'dismissLabel',
    type: 'string',
    description: 'Accessible label of the dismiss button. Defaults to "Dismiss banner".',
  },
]

export function bannerCopyProps(defaults: { message: string; linkLabel: string }): ComponentProp[] {
  return [
    {
      name: 'message',
      type: 'ReactNode',
      description: `Banner text. Defaults to "${defaults.message}"`,
    },
    {
      name: 'linkLabel',
      type: 'string',
      description: `Link text after the message. Defaults to "${defaults.linkLabel}". Pass an empty string to hide it.`,
    },
    { name: 'href', type: 'string', description: 'Where the link points.' },
  ]
}

export const BANNER_DEPENDENCIES = [
  { name: '@radix-ui/react-slot' },
  { name: 'motion' },
  { name: 'class-variance-authority' },
  { name: '@hugeicons/react' },
  { name: '@hugeicons/core-free-icons' },
]

export const bannerShared: Pick<
  ComponentItem,
  'collection' | 'previewType' | 'dependencies' | 'interaction'
> = {
  collection: 'blocks',
  previewType: 'default',
  dependencies: BANNER_DEPENDENCIES,
  interaction:
    'Press the close button to dismiss the banner. The close button is reachable by keyboard and shows the accent focus ring.',
}

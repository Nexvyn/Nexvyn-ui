import type { ComponentItem } from '@/lib/components-registry'
import { ctaSectionProps, ctaShared } from '@/components/blocks/cta/meta/shared'

export const ctaCenteredMetadata: ComponentItem = {
  ...ctaShared,
  id: 'cta-centered',
  name: 'Centered',
  parent: 'cta',
  href: '/blocks/cta/centered',
  registry: 'cta-centered',
  description:
    'A centered call to action that closes the page: heading and supporting text over a primary and a secondary action, inside a bordered box. The actions stack full width on mobile and sit in a row from the small breakpoint.',
  props: [
    {
      name: 'title',
      type: 'ReactNode',
      description: 'Heading. Defaults to "Start building with Nexvyn UI".',
    },
    ...ctaSectionProps,
    {
      name: 'primaryLabel',
      type: 'string',
      description: 'Primary action text. Defaults to "Browse components". Empty hides it.',
    },
    { name: 'primaryHref', type: 'string', description: 'Where the primary action points.' },
    {
      name: 'primaryIcon',
      type: 'ReactNode',
      description: 'Icon after the primary label, slides forward on hover. Pass null to hide it.',
    },
    {
      name: 'secondaryLabel',
      type: 'string',
      description: 'Secondary action text. Defaults to "Set up MCP". Empty hides it.',
    },
    { name: 'secondaryHref', type: 'string', description: 'Where the secondary action points.' },
  ],
  usage: `<CtaCentered
  title="Ship the next screen today."
  description="Accessible, typed components you own."
  primaryLabel="Get started"
  primaryHref="/components"
  secondaryLabel="Read the docs"
  secondaryHref="/docs"
/>`,
}

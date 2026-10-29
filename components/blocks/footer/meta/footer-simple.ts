import type { ComponentItem } from '@/lib/components-registry'
import { footerBaseProps, footerShared } from '@/components/blocks/footer/meta/shared'

export const footerSimpleMetadata: ComponentItem = {
  ...footerShared,
  id: 'footer-simple',
  name: 'Simple',
  parent: 'footer',
  href: '/blocks/footer/simple',
  registry: 'footer-simple',
  description:
    'A one row footer: wordmark and copyright on the start side, a wrapping row of links on the end side. It stacks on mobile.',
  props: [
    {
      name: 'links',
      type: '{ label: string; href: string }[]',
      description: 'Links in the footer nav.',
    },
    {
      name: 'navLabel',
      type: 'string',
      description: 'Accessible name of the nav. Defaults to "Footer".',
    },
    ...footerBaseProps,
  ],
  usage: `<FooterSimple
  links={[
    { label: 'Docs', href: '/docs' },
    { label: 'Pricing', href: '/pricing' },
  ]}
  copyright="© 2026 Your Company"
/>`,
}

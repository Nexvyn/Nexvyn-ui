import type { ComponentItem } from '@/lib/components-registry'
import {
  footerBaseProps,
  footerShared,
  footerSocialProp,
} from '@/components/blocks/footer/meta/shared'

export const footerCenteredMetadata: ComponentItem = {
  ...footerShared,
  id: 'footer-centered',
  name: 'Centered',
  parent: 'footer',
  href: '/blocks/footer/centered',
  registry: 'footer-centered',
  description:
    'A centered footer stack: wordmark, a wrapping row of links, icon links and the copyright line.',
  props: [
    {
      name: 'links',
      type: '{ label: string; href: string }[]',
      description: 'Links in the footer nav.',
    },
    footerSocialProp,
    {
      name: 'navLabel',
      type: 'string',
      description: 'Accessible name of the nav. Defaults to "Footer".',
    },
    ...footerBaseProps,
  ],
  usage: `<FooterCentered
  links={[
    { label: 'Docs', href: '/docs' },
    { label: 'Blog', href: '/blog' },
  ]}
/>`,
}

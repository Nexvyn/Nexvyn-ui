import type { ComponentItem } from '@/lib/components-registry'
import {
  footerBaseProps,
  footerShared,
  footerSocialProp,
} from '@/components/blocks/footer/meta/shared'

export const footerColumnsMetadata: ComponentItem = {
  ...footerShared,
  id: 'footer-columns',
  name: 'Columns',
  parent: 'footer',
  href: '/blocks/footer/columns',
  registry: 'footer-columns',
  description:
    'A sitemap footer: wordmark, a short description and icon links, then titled link columns, with copyright and legal links on a bottom bar. Columns stack on mobile.',
  props: [
    { name: 'description', type: 'ReactNode', description: 'Short text under the wordmark.' },
    {
      name: 'columns',
      type: '{ title: string; links: { label: string; href: string }[] }[]',
      description: 'Titled link columns. Each title is a heading for its list.',
    },
    footerSocialProp,
    {
      name: 'legal',
      type: '{ label: string; href: string }[]',
      description: 'Small links on the bottom bar. Defaults to Privacy and Terms.',
    },
    {
      name: 'legalLabel',
      type: 'string',
      description: 'Accessible name of the legal nav. Defaults to "Legal".',
    },
    ...footerBaseProps,
  ],
  usage: `<FooterColumns
  description="Tools for teams that ship."
  columns={[
    { title: 'Product', links: [{ label: 'Pricing', href: '/pricing' }] },
    { title: 'Company', links: [{ label: 'About', href: '/about' }] },
  ]}
/>`,
}

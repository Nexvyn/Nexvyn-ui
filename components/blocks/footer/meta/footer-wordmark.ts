import type { ComponentItem } from '@/lib/components-registry'
import { footerBaseProps, footerShared } from '@/components/blocks/footer/meta/shared'

export const footerWordmarkMetadata: ComponentItem = {
  ...footerShared,
  id: 'footer-wordmark',
  name: 'Wordmark',
  parent: 'footer',
  href: '/blocks/footer/wordmark',
  registry: 'footer-wordmark',
  description:
    'A footer that ends on the brand: four link columns and a home mark, a bottom bar, then a bold wordmark set edge to edge with tight spacing, ending at the page edge.',
  props: [
    {
      name: 'wordmark',
      type: 'string',
      description:
        'Text stretched to the full width. Hidden from screen readers. Defaults to "Nexvyn UI".',
    },
    {
      name: 'mark',
      type: 'ReactNode',
      description: 'Small logo linking home. Pass null to hide it.',
    },
    { name: 'homeHref', type: 'string', description: 'Where the mark links.' },
    {
      name: 'homeLabel',
      type: 'string',
      description: 'Accessible name of the mark link. Defaults to "Nexvyn UI home".',
    },
    {
      name: 'columns',
      type: '{ title: string; links: { label: string; href: string }[] }[]',
      description: 'Titled link columns.',
    },
    {
      name: 'legal',
      type: '{ label: string; href: string }[]',
      description: 'Links on the bottom bar.',
    },
    ...footerBaseProps.filter((prop) => prop.name !== 'brand'),
  ],
  usage: `<FooterWordmark wordmark="Acme" homeHref="/" homeLabel="Acme home" />`,
}

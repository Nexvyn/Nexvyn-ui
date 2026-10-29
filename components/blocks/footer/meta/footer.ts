import type { ComponentItem } from '@/lib/components-registry'
import { footerShared } from '@/components/blocks/footer/meta/shared'

export const footerMetadata: ComponentItem = {
  ...footerShared,
  id: 'footer',
  name: 'Footer',
  href: '/blocks/footer',
  registry: 'footer',
  description:
    'Page footers built from FooterLink, FooterColumn, FooterSocialLinks and FooterBrand: a single row, a multi column sitemap and a centered stack.',
  props: [
    {
      name: 'asChild',
      type: 'boolean',
      description: 'FooterLink renders its child, such as a router Link, with the link styles.',
    },
  ],
  usage: `<footer className="border-t border-(--color-border)">
  <nav aria-label="Footer">
    <FooterLink asChild>
      <Link href="/components">Components</Link>
    </FooterLink>
  </nav>
</footer>`,
}

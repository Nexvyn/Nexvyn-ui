import type { ComponentItem } from '@/lib/components-registry'
import { bannerOpenProps, bannerShared } from '@/components/blocks/banner/meta/shared'

export const bannerMetadata: ComponentItem = {
  ...bannerShared,
  id: 'banner',
  name: 'Banner',
  href: '/blocks/banner',
  registry: 'banner',
  description:
    'Six banner blocks, each in its own file: filled, outline, tagged, notice, cookie consent and subscribe. They share the Banner, BannerLink and BannerTag primitives.',
  props: [
    {
      name: 'variant',
      type: '"filled" | "outline" | "destructive"',
      description:
        'Filled uses the inverted foreground surface, outline a bottom border, destructive the error color.',
      options: ['"filled"', '"outline"', '"destructive"'],
    },
    {
      name: 'icon',
      type: 'ReactNode',
      description: 'Decorative icon shown before the text. Hidden from screen readers.',
    },
    ...bannerOpenProps,
  ],
  usage: `<Banner variant="outline">
  Your message here.
  <BannerLink href="/pricing">Learn more</BannerLink>
</Banner>`,
}

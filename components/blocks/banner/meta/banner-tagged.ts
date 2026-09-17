import type { ComponentItem } from '@/lib/components-registry'
import {
  bannerCopyProps,
  bannerOpenProps,
  bannerShared,
} from '@/components/blocks/banner/meta/shared'

export const bannerTaggedMetadata: ComponentItem = {
  ...bannerShared,
  id: 'banner-tagged',
  name: 'Tagged',
  parent: 'banner',
  href: '/blocks/banner/tagged',
  registry: 'banner-tagged',
  description:
    'An outline banner led by a small tag, for launches and changelog news that deserve a label.',
  props: [
    {
      name: 'tag',
      type: 'ReactNode',
      description: 'Tag text before the message. Defaults to "New".',
    },
    ...bannerCopyProps({
      message: 'Banner blocks are here, six layouts for every kind of notice.',
      linkLabel: 'Read more',
    }),
    ...bannerOpenProps,
  ],
  usage: `<BannerTagged
  tag="New"
  message="Banner blocks are here."
  linkLabel="Read more"
  href="/changelog"
/>`,
}

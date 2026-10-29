import type { ComponentItem } from '@/lib/components-registry'
import {
  bannerCopyProps,
  bannerOpenProps,
  bannerShared,
} from '@/components/blocks/banner/meta/shared'

export const bannerFilledMetadata: ComponentItem = {
  ...bannerShared,
  id: 'banner-filled',
  name: 'Filled',
  parent: 'banner',
  href: '/blocks/banner/filled',
  registry: 'banner-filled',
  description:
    'The filled banner inverts the page: a foreground surface with background-colored text, for announcements that should be seen first.',
  props: [
    ...bannerCopyProps({
      message: 'New blocks are landing in Nexvyn UI, ready to copy into your project.',
      linkLabel: 'Browse blocks',
    }),
    ...bannerOpenProps,
  ],
  usage: `<BannerFilled
  message="New blocks are landing in Nexvyn UI."
  linkLabel="Browse blocks"
  href="/blocks"
/>`,
}

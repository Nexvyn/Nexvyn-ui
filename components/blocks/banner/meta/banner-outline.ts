import type { ComponentItem } from '@/lib/components-registry'
import {
  bannerCopyProps,
  bannerOpenProps,
  bannerShared,
} from '@/components/blocks/banner/meta/shared'

export const bannerOutlineMetadata: ComponentItem = {
  ...bannerShared,
  id: 'banner-outline',
  name: 'Outline',
  parent: 'banner',
  href: '/blocks/banner/outline',
  registry: 'banner-outline',
  description:
    'The outline banner keeps the page background and closes with a hairline border, for quieter notices above a header.',
  props: [
    ...bannerCopyProps({
      message: 'Install any component with one command, no setup beyond shadcn.',
      linkLabel: 'Get started',
    }),
    ...bannerOpenProps,
  ],
  usage: `<BannerOutline
  message="Install any component with one command."
  linkLabel="Get started"
  href="/components"
/>`,
}

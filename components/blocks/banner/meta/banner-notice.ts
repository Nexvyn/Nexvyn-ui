import type { ComponentItem } from '@/lib/components-registry'
import { bannerOpenProps, bannerShared } from '@/components/blocks/banner/meta/shared'

export const bannerNoticeMetadata: ComponentItem = {
  ...bannerShared,
  id: 'banner-notice',
  name: 'Notice',
  parent: 'banner',
  href: '/blocks/banner/notice',
  registry: 'banner-notice',
  description:
    'Status banners with an icon: a neutral information notice and a destructive error notice, each with the right live-region role.',
  props: [
    {
      name: 'tone',
      type: '"info" | "error"',
      description:
        'Info uses the outline style with role status, error uses the destructive color with role alert.',
      options: ['"info"', '"error"'],
    },
    { name: 'message', type: 'ReactNode', description: 'Notice text. Each tone has a default.' },
    { name: 'linkLabel', type: 'string', description: 'Link text after the message.' },
    { name: 'href', type: 'string', description: 'Where the link points.' },
    { name: 'icon', type: 'ReactNode', description: 'Overrides the tone icon.' },
    ...bannerOpenProps,
  ],
  usage: `<BannerNotice tone="info" message="Scheduled maintenance on Friday at 02:00 UTC." />
<BannerNotice tone="error" message="We could not process your last payment." href="/billing" />`,
}

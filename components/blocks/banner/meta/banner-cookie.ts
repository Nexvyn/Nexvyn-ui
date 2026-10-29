import type { ComponentItem } from '@/lib/components-registry'
import { bannerShared } from '@/components/blocks/banner/meta/shared'

export const bannerCookieMetadata: ComponentItem = {
  ...bannerShared,
  id: 'banner-cookie',
  name: 'Cookie',
  parent: 'banner',
  href: '/blocks/banner/cookie',
  registry: 'banner-cookie',
  dependencies: [{ name: 'motion' }],
  interaction:
    'Choose Accept all or Decline. The card fades and lifts away, and both choices call back before closing.',
  description:
    'A cookie consent card with accept and decline actions. It lifts in once and lifts away on a choice.',
  props: [
    { name: 'title', type: 'ReactNode', description: 'Heading text.' },
    { name: 'description', type: 'ReactNode', description: 'Supporting copy.' },
    { name: 'acceptLabel', type: 'string', description: 'Accept button label.' },
    { name: 'declineLabel', type: 'string', description: 'Decline button label.' },
    { name: 'onAccept', type: '() => void', description: 'Called when the visitor accepts.' },
    { name: 'onDecline', type: '() => void', description: 'Called when the visitor declines.' },
    { name: 'open', type: 'boolean', description: 'Controlled open state.' },
    { name: 'defaultOpen', type: 'boolean', description: 'Initial open state. Defaults to true.' },
    {
      name: 'onOpenChange',
      type: '(open: boolean) => void',
      description: 'Called when the card closes.',
    },
  ],
  usage: `<BannerCookie
  onAccept={() => setConsent('all')}
  onDecline={() => setConsent('essential')}
/>`,
}

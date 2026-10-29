import type { ComponentItem } from '@/lib/components-registry'
import { bannerShared } from '@/components/blocks/banner/meta/shared'

export const bannerSubscribeMetadata: ComponentItem = {
  ...bannerShared,
  id: 'banner-subscribe',
  name: 'Subscribe',
  parent: 'banner',
  href: '/blocks/banner/subscribe',
  registry: 'banner-subscribe',
  dependencies: [],
  interaction:
    'Enter an email and submit. Invalid input shows an inline error linked with aria-describedby, and success crossfades the form into a confirmation.',
  description:
    'An email signup banner that validates inline and morphs into a thank-you message on success.',
  props: [
    { name: 'title', type: 'ReactNode', description: 'Heading text.' },
    { name: 'description', type: 'ReactNode', description: 'Supporting copy.' },
    { name: 'successMessage', type: 'ReactNode', description: 'Shown after a successful signup.' },
    { name: 'emailLabel', type: 'string', description: 'Screen reader label of the input.' },
    { name: 'placeholder', type: 'string', description: 'Input placeholder.' },
    { name: 'submitLabel', type: 'string', description: 'Submit button label.' },
    { name: 'invalidMessage', type: 'string', description: 'Error shown for an invalid email.' },
    {
      name: 'onSubscribe',
      type: '(email: string) => void | Promise<void>',
      description: 'Called with the email on a valid submit.',
    },
  ],
  usage: `<BannerSubscribe
  onSubscribe={async (email) => {
    await fetch('/api/subscribe', { method: 'POST', body: email })
  }}
/>`,
}

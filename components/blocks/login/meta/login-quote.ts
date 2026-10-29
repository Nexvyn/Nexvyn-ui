import type { ComponentItem } from '@/lib/components-registry'
import { loginFormProps, loginShared, loginImageProps } from '@/components/blocks/login/meta/shared'

export const loginQuoteMetadata: ComponentItem = {
  ...loginShared,
  id: 'login-quote',
  name: 'Testimonial',
  parent: 'login',
  href: '/blocks/login/quote',
  registry: 'login-quote',
  description:
    'The split sign in page with a customer quote over the photo: a soft scrim keeps the quote and author readable in both themes.',
  props: [
    { name: 'quote', type: 'ReactNode', description: 'Quote set over the photo.' },
    {
      name: 'author',
      type: '{ name: string; role: string; avatarSrc?: string }',
      description: 'Who said it. Without avatarSrc the avatar shows initials.',
    },
    ...loginImageProps,
    ...loginFormProps,
  ],
  usage: `<LoginQuote
  imageSrc="/images/login.jpg"
  quote="Setup took one afternoon."
  author={{ name: 'Ada Park', role: 'CTO' }}
/>`,
}

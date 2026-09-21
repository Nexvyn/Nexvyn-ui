import type { ComponentItem } from '@/lib/components-registry'
import { footerBaseProps, footerShared } from '@/components/blocks/footer/meta/shared'

export const footerNewsletterMetadata: ComponentItem = {
  ...footerShared,
  id: 'footer-newsletter',
  name: 'Newsletter',
  parent: 'footer',
  href: '/blocks/footer/newsletter',
  registry: 'footer-newsletter',
  interaction:
    'A footer landmark. The email field has a visible label and native validation; submitting calls onSubscribe and announces the success line through a polite live region. The submit button is 44px with an aria-label, and its arrow nudges forward on hover.',
  description:
    'A footer with a release notes signup: wordmark, tagline and an email form on the start side, four link columns on the end side, and a bottom bar with copyright and legal links.',
  props: [
    { name: 'tagline', type: 'ReactNode', description: 'Short line under the wordmark.' },
    {
      name: 'columns',
      type: '{ title: string; links: { label: string; href: string }[] }[]',
      description: 'Titled link columns. Two per row on mobile, four from the small breakpoint.',
    },
    {
      name: 'onSubscribe',
      type: '(email: string) => void',
      description: 'Called with the email on submit. The form resets and shows successMessage.',
    },
    {
      name: 'formLabel',
      type: 'string',
      description: 'Visible label of the email field. Defaults to "Release notes by email".',
    },
    { name: 'placeholder', type: 'string', description: 'Placeholder of the email field.' },
    {
      name: 'submitLabel',
      type: 'string',
      description: 'Accessible name of the submit button. Defaults to "Subscribe".',
    },
    { name: 'successMessage', type: 'string', description: 'Announced after a submit.' },
    {
      name: 'legal',
      type: '{ label: string; href: string }[]',
      description: 'Links on the bottom bar.',
    },
    ...footerBaseProps,
  ],
  usage: `<FooterNewsletter
  tagline="Notes on shipping calm interfaces."
  onSubscribe={(email) => subscribe(email)}
/>`,
}

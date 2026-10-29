import type { ComponentItem } from '@/lib/components-registry'
import {
  FAQ_GRID_INTERACTION,
  faqContactProps,
  faqHeaderProps,
  faqShared,
} from '@/components/blocks/faq/meta/shared'

export const faqNumberedMetadata: ComponentItem = {
  ...faqShared,
  id: 'faq-numbered',
  name: 'Numbered',
  parent: 'faq',
  href: '/blocks/faq/numbered',
  registry: 'faq-numbered',
  interaction: FAQ_GRID_INTERACTION,
  description:
    'An open FAQ grid with every answer visible: up to three columns, each answer under a hairline rule with a plain two digit number, and the contact line beside the heading.',
  props: [
    ...faqHeaderProps,
    {
      name: 'items',
      type: '{ value: string; question: string; answer: ReactNode }[]',
      description: 'Questions and answers, numbered in order.',
    },
    ...faqContactProps,
  ],
  usage: `<FaqNumbered
  items={[
    { value: 'refunds', question: 'Can I get a refund?', answer: 'Yes, within 30 days.' },
  ]}
  contactHref="/contact"
/>`,
}

import type { ComponentItem } from '@/lib/components-registry'
import {
  FAQ_GRID_INTERACTION,
  faqContactProps,
  faqHeaderProps,
  faqShared,
} from '@/components/blocks/faq/meta/shared'

export const faqIconsMetadata: ComponentItem = {
  ...faqShared,
  id: 'faq-icons',
  name: 'Icons',
  parent: 'faq',
  href: '/blocks/faq/icons',
  registry: 'faq-icons',
  interaction: FAQ_GRID_INTERACTION,
  description:
    'An open FAQ grid where each answer sits under a hairline rule with a small topic icon: up to three columns, with the contact line beside the heading.',
  props: [
    ...faqHeaderProps,
    {
      name: 'items',
      type: '{ value: string; question: string; answer: ReactNode; marker: ReactNode }[]',
      description: 'Questions and answers, each with its own icon as the marker.',
    },
    ...faqContactProps,
  ],
  usage: `<FaqIcons
  items={[
    {
      value: 'refunds',
      question: 'Can I get a refund?',
      answer: 'Yes, within 30 days.',
      marker: <RefundIcon />,
    },
  ]}
/>`,
}

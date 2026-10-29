import type { ComponentItem } from '@/lib/components-registry'
import {
  FAQ_ACCORDION_INTERACTION,
  faqHeaderProps,
  faqShared,
  faqSupportProps,
} from '@/components/blocks/faq/meta/shared'

export const faqAccordionMetadata: ComponentItem = {
  ...faqShared,
  id: 'faq-accordion',
  name: 'Accordion',
  parent: 'faq',
  href: '/blocks/faq/accordion',
  registry: 'faq-accordion',
  interaction: FAQ_ACCORDION_INTERACTION,
  description:
    'A two column FAQ: heading and a quiet contact line with the team avatars on the start side, a flat hairline list of questions on the end side. It stacks on mobile.',
  props: [
    ...faqHeaderProps,
    {
      name: 'items',
      type: '{ value: string; question: string; answer: ReactNode }[]',
      description: 'Questions and answers. The value must be unique.',
    },
    ...faqSupportProps,
  ],
  usage: `<FaqAccordion
  items={[
    { value: 'refunds', question: 'Can I get a refund?', answer: 'Yes, within 30 days.' },
    { value: 'teams', question: 'Is there a team plan?', answer: 'Yes, from three seats.' },
  ]}
  supportHref="/contact"
/>`,
}

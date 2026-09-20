import type { ComponentItem } from '@/lib/components-registry'
import { FAQ_ACCORDION_INTERACTION, faqShared } from '@/components/blocks/faq/meta/shared'

export const faqMetadata: ComponentItem = {
  ...faqShared,
  id: 'faq',
  name: 'FAQ',
  href: '/blocks/faq',
  registry: 'faq',
  interaction: FAQ_ACCORDION_INTERACTION,
  description:
    'Frequently asked question sections: an accordion, an accordion grouped by topic, and two open grids with numbered or icon markers. They share FaqSection, FaqHeader, FaqList and FaqSupport.',
  props: [
    {
      name: 'items',
      type: '{ value: string; question: string; answer: ReactNode }[]',
      description: 'Questions and answers. The value must be unique.',
    },
  ],
  usage: `<FaqAccordion
  title="Questions, answered"
  items={[
    { value: 'refunds', question: 'Can I get a refund?', answer: 'Yes, within 30 days.' },
  ]}
/>`,
}

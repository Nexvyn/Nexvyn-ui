import type { ComponentItem } from '@/lib/components-registry'
import {
  FAQ_ACCORDION_INTERACTION,
  faqHeaderProps,
  faqShared,
  faqSupportProps,
} from '@/components/blocks/faq/meta/shared'

export const faqGroupedMetadata: ComponentItem = {
  ...faqShared,
  id: 'faq-grouped',
  name: 'Grouped',
  parent: 'faq',
  href: '/blocks/faq/grouped',
  registry: 'faq-grouped',
  interaction: FAQ_ACCORDION_INTERACTION,
  description:
    'A two column FAQ split by topic: each group has a small heading over its own hairline list, next to the heading and contact line.',
  props: [
    ...faqHeaderProps,
    {
      name: 'groups',
      type: '{ title: string; items: { value: string; question: string; answer: ReactNode }[] }[]',
      description: 'Topic groups. Each title is a heading over its own accordion.',
    },
    ...faqSupportProps,
  ],
  usage: `<FaqGrouped
  groups={[
    {
      title: 'Billing',
      items: [{ value: 'refunds', question: 'Can I get a refund?', answer: 'Yes, within 30 days.' }],
    },
  ]}
/>`,
}

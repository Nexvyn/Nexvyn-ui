import type { ComponentItem } from '@/lib/components-registry'
import {
  TESTIMONIALS_GRID_INTERACTION,
  testimonialsHeaderProps,
  testimonialsListProp,
  testimonialsShared,
} from '@/components/blocks/social-proof/meta/testimonials-shared'

export const socialProofTestimonialsMetadata: ComponentItem = {
  ...testimonialsShared,
  id: 'social-proof-testimonials',
  name: 'Testimonial grid',
  parent: 'social-proof',
  href: '/blocks/social-proof/testimonials',
  registry: 'social-proof-testimonials',
  interaction: TESTIMONIALS_GRID_INTERACTION,
  description:
    'Quiet testimonial cards in balanced columns, three on large screens and two on medium. On mobile the first three show under a soft fade, with a Show more button for the rest.',
  props: [
    ...testimonialsHeaderProps,
    testimonialsListProp,
    {
      name: 'initialCount',
      type: 'number',
      description: 'Cards shown on mobile before Show more. Defaults to 3.',
    },
    {
      name: 'showMoreLabel, showLessLabel',
      type: 'string',
      description: 'Labels of the mobile toggle, overridable for localization.',
    },
  ],
  usage: `<SocialProofTestimonials
  title="What teams say"
  testimonials={[
    { quote: 'Setup took one afternoon.', name: 'Ada Park', role: 'CTO, Brightfold' },
    { quote: 'Dark mode just worked.', name: 'Leo Marsh', role: 'Designer, Tallow' },
  ]}
/>`,
}

import type { ComponentItem } from '@/lib/components-registry'
import {
  TESTIMONIALS_MARQUEE_INTERACTION,
  testimonialsHeaderProps,
  testimonialsListProp,
  testimonialsShared,
} from '@/components/blocks/social-proof/meta/testimonials-shared'

export const socialProofTestimonialsMarqueeMetadata: ComponentItem = {
  ...testimonialsShared,
  id: 'social-proof-testimonials-marquee',
  name: 'Testimonial marquee',
  parent: 'social-proof',
  href: '/blocks/social-proof/testimonials-marquee',
  registry: 'social-proof-testimonials-marquee',
  interaction: TESTIMONIALS_MARQUEE_INTERACTION,
  description:
    'Two rows of testimonial cards drifting in opposite directions with faded edges. Rows pause on hover or focus, and a Pause button stops them for everyone else.',
  props: [
    ...testimonialsHeaderProps,
    {
      ...testimonialsListProp,
      description: `${testimonialsListProp.description} The list is split in half, one half per row.`,
    },
    {
      name: 'pauseLabel, playLabel',
      type: 'string',
      description: 'Labels of the pause toggle in each state, overridable for localization.',
    },
  ],
  usage: `<SocialProofTestimonialsMarquee
  title="In their words"
  testimonials={[
    { quote: 'Setup took one afternoon.', name: 'Ada Park', role: 'CTO, Brightfold' },
    { quote: 'Dark mode just worked.', name: 'Leo Marsh', role: 'Designer, Tallow' },
  ]}
/>`,
}

import type { ComponentItem } from '@/lib/components-registry'
import { logosProps, logosShared } from '@/components/blocks/social-proof/meta/logos-shared'

export const socialProofLogosMarqueeMetadata: ComponentItem = {
  ...logosShared,
  id: 'social-proof-logos-marquee',
  name: 'Logo marquee',
  parent: 'social-proof',
  href: '/blocks/social-proof/logos-marquee',
  registry: 'social-proof-logos-marquee',
  interaction:
    'A labelled section landmark. The logos drift in one endless row that fades out at both edges; the second copy that closes the loop is hidden from screen readers and from Tab. Hover or keyboard focus pauses it, and it runs the other way in RTL. Reduced motion stops it and wraps the logos into a static centered row.',
  description:
    'The tools a product is built with, drifting past in a slow, seamless marquee under a short heading, with soft edges instead of hard cuts.',
  props: [
    ...logosProps,
    {
      name: 'duration',
      type: 'number',
      description: 'Seconds for one full loop. Defaults to 40; longer is calmer.',
    },
  ],
  usage: `<SocialProofLogosMarquee duration={60} />`,
}

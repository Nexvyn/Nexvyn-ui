import type { ComponentItem } from '@/lib/components-registry'
import {
  LOGOS_GRID_INTERACTION,
  logosProps,
  logosShared,
} from '@/components/blocks/social-proof/meta/logos-shared'

export const socialProofLogosRevealMetadata: ComponentItem = {
  ...logosShared,
  id: 'social-proof-logos-reveal',
  name: 'Logo reveal',
  parent: 'social-proof',
  href: '/blocks/social-proof/logos-reveal',
  registry: 'social-proof-logos-reveal',
  interaction: `${LOGOS_GRID_INTERACTION} The first time the grid scrolls into view the logos rise, sharpen and fade in one after another; the observer then disconnects, so it never replays. Reduced motion shows them at once.`,
  description:
    'The logo grid with an entrance: the hairline grid is there from the start and the logos rise into their cells in a short stagger, once, when the section first scrolls into view.',
  props: [
    ...logosProps,
    {
      name: 'threshold',
      type: 'number',
      description:
        'Share of the grid that must be visible before the reveal plays. Defaults to 0.25.',
    },
  ],
  usage: `<SocialProofLogosReveal threshold={0.4} />`,
}

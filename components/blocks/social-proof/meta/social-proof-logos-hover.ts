import type { ComponentItem } from '@/lib/components-registry'
import {
  LOGOS_DEPENDENCIES,
  logosProps,
  logosShared,
} from '@/components/blocks/social-proof/meta/logos-shared'

export const socialProofLogosHoverMetadata: ComponentItem = {
  ...logosShared,
  id: 'social-proof-logos-hover',
  name: 'Logo hover',
  parent: 'social-proof',
  href: '/blocks/social-proof/logos-hover',
  registry: 'social-proof-logos-hover',
  dependencies: [
    ...LOGOS_DEPENDENCIES,
    { name: '@hugeicons/react' },
    { name: '@hugeicons/core-free-icons' },
  ],
  interaction:
    'A labelled section landmark with the logos in a list, each with its brand name as alt text. Hovering the grid, or tabbing to its link, makes the logos recede slightly while a real link rises in over them, with the accent focus ring and a 44px target. On touch screens the link simply sits under the grid. Reduced motion swaps states without the movement.',
  description:
    'The logo grid with one call to action: on hover or keyboard focus the logos step back and a link fades in over the middle of the grid.',
  props: [
    ...logosProps,
    {
      name: 'linkLabel',
      type: 'string',
      description:
        'Link text. Defaults to "See the full stack". Empty hides the link and the recede.',
    },
    { name: 'linkHref', type: 'string', description: 'Where the link points.' },
    {
      name: 'linkIcon',
      type: 'ReactNode',
      description: 'Icon after the label, mirrored in RTL. Pass null to hide it.',
    },
  ],
  usage: `<SocialProofLogosHover linkLabel="Read how it is built" linkHref="/docs" />`,
}

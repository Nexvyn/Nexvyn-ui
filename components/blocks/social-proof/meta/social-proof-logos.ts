import type { ComponentItem } from '@/lib/components-registry'
import {
  LOGOS_GRID_INTERACTION,
  logosProps,
  logosShared,
} from '@/components/blocks/social-proof/meta/logos-shared'

export const socialProofLogosMetadata: ComponentItem = {
  ...logosShared,
  id: 'social-proof-logos',
  name: 'Logo grid',
  parent: 'social-proof',
  href: '/blocks/social-proof/logos',
  registry: 'social-proof-logos',
  interaction: LOGOS_GRID_INTERACTION,
  description:
    'The tools a product is built with, as a quiet logo grid under a short heading: two per row on mobile and four from the small breakpoint, split by hairlines.',
  props: logosProps,
  usage: `import reactLogo from 'runeicons-brands/svg/react.svg'
import typescriptLogo from 'runeicons-brands/svg/typescript.svg'

<SocialProofLogos
  title="Built on the tools you already ship"
  logos={[
    { name: 'React', src: reactLogo, invert: 'dark', href: 'https://react.dev' },
    { name: 'TypeScript', src: typescriptLogo, href: 'https://www.typescriptlang.org' },
  ]}
/>`,
}

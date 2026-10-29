import type { ComponentItem } from '@/lib/components-registry'
import { ctaShared } from '@/components/blocks/cta/meta/shared'

export const ctaSplitMetadata: ComponentItem = {
  ...ctaShared,
  id: 'cta-split',
  name: 'Split',
  parent: 'cta',
  href: '/blocks/cta/split',
  registry: 'cta-split',
  description:
    'A two column call to action: heading, text and one action on the start side, a phone showing your app screen below its status bar on the end side. It stacks with the phone under the text on mobile.',
  props: [
    {
      name: 'title',
      type: 'ReactNode',
      description: 'Heading. Defaults to "Blocks that fit every screen".',
    },
    { name: 'description', type: 'ReactNode', description: 'Supporting text under the heading.' },
    {
      name: 'actionLabel',
      type: 'string',
      description: 'Action text. Defaults to "Browse blocks". Empty hides it.',
    },
    { name: 'actionHref', type: 'string', description: 'Where the action points.' },
    {
      name: 'actionIcon',
      type: 'ReactNode',
      description: 'Icon after the action label, slides forward on hover. Pass null to hide it.',
    },
    {
      name: 'imageSrc',
      type: 'string',
      description: 'Screen image inside the phone. Without it the phone shows a skeleton screen.',
    },
    {
      name: 'imageDarkSrc',
      type: 'string',
      description: 'Optional dark theme screen image, shown under the .dark class.',
    },
    {
      name: 'imageAlt',
      type: 'string',
      description: 'Alt text of the screen image. Defaults to "App screen on a phone".',
    },
    {
      name: 'media',
      type: 'ReactNode',
      description: 'Replaces the phone entirely with your own media.',
    },
    { name: 'className', type: 'string', description: 'Merged onto the section with cn().' },
  ],
  usage: `<CtaSplit
  title="Your app, in every pocket."
  description="Install it on any device in under a minute."
  actionLabel="Get the app"
  actionHref="/download"
  imageSrc="/screens/home-light.jpg"
  imageDarkSrc="/screens/home-dark.jpg"
  imageAlt="The home screen on a phone"
/>`,
}

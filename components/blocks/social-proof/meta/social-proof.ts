import type { ComponentItem } from '@/lib/components-registry'

export const socialProofMetadata: ComponentItem = {
  id: 'social-proof',
  name: 'Social Proof',
  href: '/blocks/social-proof',
  registry: 'social-proof',
  collection: 'blocks',
  previewType: 'default',
  dependencies: [],
  interaction:
    'Each section is a labelled landmark. Logos carry their company name as accessible text, and quotes are figures with the person named in plain text. Avatars are decorative and hidden from screen readers. Moving rows pause on hover, focus and a Pause button, and stand still under reduced motion.',
  description:
    'Sections that show who already uses the product: logo walls of customer marks, and testimonials as a card grid or a slow two row marquee. Avatars come from NameAvatar, an abstract mark generated from each name, so no photos are needed.',
  props: [
    {
      name: 'name',
      type: 'string',
      description:
        'NameAvatar: the name the mark is generated from. The same name always draws the same shapes, on the server and the client.',
      required: true,
    },
    {
      name: 'size',
      type: 'number',
      description: 'NameAvatar: width and height in px. Defaults to 32.',
    },
    {
      name: 'className',
      type: 'string',
      description: 'NameAvatar: extra classes, merged with cn().',
    },
  ],
  usage: `<figcaption className="flex items-center gap-3">
  <NameAvatar name="Ada Park" size={32} />
  <span>Ada Park</span>
</figcaption>`,
}

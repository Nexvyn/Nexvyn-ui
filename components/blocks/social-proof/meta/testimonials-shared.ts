import type { ComponentItem, ComponentProp } from '@/lib/components-registry'

export const testimonialsHeaderProps: ComponentProp[] = [
  { name: 'title', type: 'ReactNode', description: 'Section heading, left aligned.' },
  { name: 'description', type: 'ReactNode', description: 'One short line under the heading.' },
]

export const testimonialsListProp: ComponentProp = {
  name: 'testimonials',
  type: '{ quote: string; name: string; role: string }[]',
  description:
    'Quotes with the person and their role. Each card shows a generated NameAvatar next to the name, so no photos are needed.',
}

export const testimonialsShared: Pick<
  ComponentItem,
  'collection' | 'previewType' | 'dependencies'
> = {
  collection: 'blocks',
  previewType: 'default',
  dependencies: [],
}

export const TESTIMONIALS_GRID_INTERACTION =
  'A labelled section landmark with the quotes in a list of figures. From the medium breakpoint every card is visible in two or three columns. On mobile the first cards show under a soft bottom fade and a 44px Show more button with aria-expanded and aria-controls reveals the rest, which fade and rise in one after another; Show less folds them away and keeps the button in view. Reduced motion reveals them without the rise.'

export const TESTIMONIALS_MARQUEE_INTERACTION =
  'A labelled section landmark with two rows of quotes drifting in opposite directions, with soft faded edges. A row stops while it is hovered or holds focus, and a Pause button stops both rows for keyboard and touch users. The looping copies are aria-hidden and inert, so screen readers and Tab meet each quote once. The direction follows RTL. Reduced motion removes the motion and the pause button and sets the quotes as a static grid.'

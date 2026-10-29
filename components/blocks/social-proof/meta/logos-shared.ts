import type { ComponentItem, ComponentProp } from '@/lib/components-registry'

export const logosProps: ComponentProp[] = [
  {
    name: 'title',
    type: 'ReactNode',
    description: 'Section heading. Defaults to "Built on the tools you already ship".',
  },
  { name: 'description', type: 'ReactNode', description: 'Supporting text under the heading.' },
  {
    name: 'logos',
    type: '{ name: string; src: StaticImageData | string; invert?: "dark" | "light"; href?: string }[]',
    description:
      'Logos in order. name is the alt text, invert flips a one color mark in that theme: "dark" turns a black mark white in dark mode, "light" turns a white mark black in light mode, href links it in a new tab. Defaults to the eight tools Nexvyn UI is built with.',
  },
  { name: 'className', type: 'string', description: 'Merged onto the section with cn().' },
]

export const LOGOS_DEPENDENCIES = [{ name: 'runeicons-brands' }]

export const logosShared: Pick<ComponentItem, 'collection' | 'previewType' | 'dependencies'> = {
  collection: 'blocks',
  previewType: 'default',
  dependencies: LOGOS_DEPENDENCIES,
}

export const LOGOS_GRID_INTERACTION =
  'A labelled section landmark with the logos in a list. Every logo keeps its brand name as alt text and is shown unaltered; only black marks flip to white in dark mode. Linked logos open the brand site in a new tab, each a full cell target with the accent focus ring.'

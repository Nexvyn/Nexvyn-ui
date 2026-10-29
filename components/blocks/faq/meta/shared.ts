import type { ComponentItem, ComponentProp } from '@/lib/components-registry'

export const faqHeaderProps: ComponentProp[] = [
  {
    name: 'title',
    type: 'ReactNode',
    description: 'Section heading. Defaults to "Frequently asked questions".',
  },
  { name: 'description', type: 'ReactNode', description: 'Supporting text under the heading.' },
]

export const faqSupportProps: ComponentProp[] = [
  {
    name: 'supportPeople',
    type: '{ name: string; src?: string }[]',
    description: 'Overlapping avatars above the contact line. Without src they show initials.',
  },
  {
    name: 'supportText',
    type: 'ReactNode',
    description: 'Line under the avatars. Defaults to "Cannot find what you need?".',
  },
  {
    name: 'supportLabel',
    type: 'string',
    description: 'Contact link text. Defaults to "Write to the team". Empty hides it.',
  },
  { name: 'supportHref', type: 'string', description: 'Where the contact link points.' },
]

export const faqContactProps: ComponentProp[] = [
  {
    name: 'contactText',
    type: 'ReactNode',
    description: 'Text before the contact link. Defaults to "Cannot find what you need?".',
  },
  {
    name: 'contactLabel',
    type: 'string',
    description: 'Contact link text. Defaults to "Write to the team". Empty hides the line.',
  },
  { name: 'contactHref', type: 'string', description: 'Where the contact link points.' },
]

export const FAQ_DEPENDENCIES = [
  { name: 'motion' },
  { name: '@hugeicons/react' },
  { name: '@hugeicons/core-free-icons' },
]

export const faqShared: Pick<ComponentItem, 'collection' | 'previewType' | 'dependencies'> = {
  collection: 'blocks',
  previewType: 'default',
  dependencies: FAQ_DEPENDENCIES,
}

export const FAQ_ACCORDION_INTERACTION =
  'A labelled section landmark. Questions sit in a flat list divided by hairlines; each is a heading with a button. Enter or Space opens it, its answer unfolds and the chevron turns. One answer stays open at a time and can be closed again. Reduced motion opens answers without the unfold.'

export const FAQ_GRID_INTERACTION =
  'A labelled section landmark with every answer visible, so there is nothing to open. Questions are headings in a list under hairline rules, each with an id for deep links, and markers are hidden from screen readers.'

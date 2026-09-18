import type { ComponentItem } from '@/lib/components-registry'
import { ctaSectionProps, ctaShared } from '@/components/blocks/cta/meta/shared'

export const ctaMetadata: ComponentItem = {
  ...ctaShared,
  id: 'cta',
  name: 'CTA',
  href: '/blocks/cta',
  registry: 'cta',
  description:
    'Call to action sections for the end of a page, built from the Cta, CtaAction and CtaActionIcon primitives: a labelled section with a heading, supporting text and a row of actions.',
  props: [
    { name: 'title', type: 'ReactNode', description: 'Section heading.', required: true },
    ...ctaSectionProps,
    {
      name: 'actions',
      type: 'ReactNode',
      description: 'Action row, usually CtaAction links. Stacks on mobile.',
    },
  ],
  usage: `<Cta
  title="Ready when you are."
  description="Start with one component and grow from there."
  actions={
    <>
      <CtaAction href="/components">
        Browse components
        <CtaActionIcon>
          <ArrowIcon />
        </CtaActionIcon>
      </CtaAction>
      <CtaAction href="/docs" variant="secondary">
        Read the docs
      </CtaAction>
    </>
  }
/>`,
}

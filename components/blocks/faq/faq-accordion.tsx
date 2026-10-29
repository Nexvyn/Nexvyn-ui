'use client'

import { forwardRef, useId, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import {
  FAQ_ITEMS,
  FAQ_SUPPORT_TEAM,
  FaqHeader,
  FaqSection,
  FaqSupport,
  type FaqItem,
  type FaqPerson,
} from '@/components/blocks/faq/faq'
import { FaqList } from '@/components/blocks/faq/faq-list'

export interface FaqAccordionProps extends Omit<ComponentPropsWithoutRef<'section'>, 'title'> {
  title?: ReactNode
  description?: ReactNode
  items?: FaqItem[]
  supportPeople?: FaqPerson[]
  supportText?: ReactNode
  supportLabel?: string
  supportHref?: string
}

export const FaqAccordion = forwardRef<HTMLElement, FaqAccordionProps>(
  (
    {
      title = 'Frequently asked questions',
      description = 'Installing, theming and licensing, in short answers.',
      items = FAQ_ITEMS,
      supportPeople = FAQ_SUPPORT_TEAM,
      supportText = 'Cannot find what you need?',
      supportLabel = 'Write to the team',
      supportHref = '#',
      ...props
    },
    ref,
  ) => {
    const headingId = useId()

    return (
      <FaqSection ref={ref} labelledBy={headingId} {...props}>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div className="flex flex-col gap-8">
            <FaqHeader id={headingId} title={title} description={description} />
            <FaqSupport
              people={supportPeople}
              text={supportText}
              linkLabel={supportLabel}
              href={supportHref}
            />
          </div>
          <FaqList items={items} />
        </div>
      </FaqSection>
    )
  },
)
FaqAccordion.displayName = 'FaqAccordion'

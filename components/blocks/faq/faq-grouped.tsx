'use client'

import { forwardRef, useId, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import {
  FAQ_GROUPS,
  FAQ_SUPPORT_TEAM,
  FaqHeader,
  FaqSection,
  FaqSupport,
  type FaqGroup,
  type FaqPerson,
} from '@/components/blocks/faq/faq'
import { FaqList } from '@/components/blocks/faq/faq-list'

export interface FaqGroupedProps extends Omit<ComponentPropsWithoutRef<'section'>, 'title'> {
  title?: ReactNode
  description?: ReactNode
  groups?: FaqGroup[]
  supportPeople?: FaqPerson[]
  supportText?: ReactNode
  supportLabel?: string
  supportHref?: string
}

export const FaqGrouped = forwardRef<HTMLElement, FaqGroupedProps>(
  (
    {
      title = 'Frequently asked questions',
      description = 'Sorted by topic, so you can go straight to the part you need.',
      groups = FAQ_GROUPS,
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
          <div className="flex flex-col gap-10">
            {groups.map((group) => (
              <div key={group.title} className="flex flex-col gap-3">
                <h3 className="text-sm text-(--color-muted)">{group.title}</h3>
                <FaqList items={group.items} headingLevel={4} />
              </div>
            ))}
          </div>
        </div>
      </FaqSection>
    )
  },
)
FaqGrouped.displayName = 'FaqGrouped'

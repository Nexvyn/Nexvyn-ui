'use client'

import { forwardRef, useId, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { FaqHeader, FaqSection, FaqTextLink, type FaqItem } from '@/components/blocks/faq/faq'

export interface FaqGridItem extends FaqItem {
  marker: ReactNode
}

export interface FaqGridProps extends Omit<ComponentPropsWithoutRef<'section'>, 'title'> {
  title: ReactNode
  description?: ReactNode
  items: FaqGridItem[]
  contactText?: ReactNode
  contactLabel?: string
  contactHref?: string
}

export const FaqGrid = forwardRef<HTMLElement, FaqGridProps>(
  (
    {
      title,
      description,
      items,
      contactText = 'Cannot find what you need?',
      contactLabel = 'Write to the team',
      contactHref = '#',
      ...props
    },
    ref,
  ) => {
    const headingId = useId()

    return (
      <FaqSection ref={ref} labelledBy={headingId} {...props}>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-12">
          <FaqHeader id={headingId} title={title} description={description} />
          {contactLabel && (
            <p className="text-sm text-(--color-muted) md:text-end">
              {contactText} <FaqTextLink href={contactHref}>{contactLabel}</FaqTextLink>
            </p>
          )}
        </div>
        <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li
              key={item.value}
              id={`faq-${item.value}`}
              className="flex flex-col border-t border-(--color-border) pt-5"
            >
              <span
                aria-hidden="true"
                className="flex h-5 items-center font-mono text-xs tabular-nums text-(--color-muted)"
              >
                {item.marker}
              </span>
              <h3 className="mt-4 text-base text-(--color-fg)">{item.question}</h3>
              <p className="mt-2 text-sm text-pretty text-(--color-muted)">{item.answer}</p>
            </li>
          ))}
        </ul>
      </FaqSection>
    )
  },
)
FaqGrid.displayName = 'FaqGrid'

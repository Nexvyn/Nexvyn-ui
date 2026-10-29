'use client'

import { forwardRef } from 'react'
import { FaqGrid, type FaqGridProps } from '@/components/blocks/faq/faq-grid'
import { FAQ_ITEMS, type FaqItem } from '@/components/blocks/faq/faq'

export interface FaqNumberedProps extends Omit<FaqGridProps, 'title' | 'items'> {
  title?: FaqGridProps['title']
  items?: FaqItem[]
}

export const FaqNumbered = forwardRef<HTMLElement, FaqNumberedProps>(
  (
    {
      title = 'Frequently asked questions',
      description = 'Installing, theming and licensing, in short answers.',
      items = FAQ_ITEMS,
      ...props
    },
    ref,
  ) => (
    <FaqGrid
      ref={ref}
      title={title}
      description={description}
      items={items.map((item, index) => ({
        ...item,
        marker: String(index + 1).padStart(2, '0'),
      }))}
      {...props}
    />
  ),
)
FaqNumbered.displayName = 'FaqNumbered'

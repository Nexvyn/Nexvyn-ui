'use client'

import { forwardRef } from 'react'
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react'
import {
  AccessIcon,
  ArrowReloadHorizontalIcon,
  ColorsIcon,
  CommandLineIcon,
  LicenseIcon,
  Moon02Icon,
} from '@hugeicons/core-free-icons'
import { FaqGrid, type FaqGridItem, type FaqGridProps } from '@/components/blocks/faq/faq-grid'
import { FAQ_ITEMS } from '@/components/blocks/faq/faq'

const ICONS: IconSvgElement[] = [
  CommandLineIcon,
  ColorsIcon,
  Moon02Icon,
  AccessIcon,
  LicenseIcon,
  ArrowReloadHorizontalIcon,
]

const DEFAULT_ITEMS: FaqGridItem[] = FAQ_ITEMS.map((item, index) => ({
  ...item,
  marker: <HugeiconsIcon icon={ICONS[index]} size={18} strokeWidth={1.5} />,
}))

export interface FaqIconsProps extends Omit<FaqGridProps, 'title' | 'items'> {
  title?: FaqGridProps['title']
  items?: FaqGridItem[]
}

export const FaqIcons = forwardRef<HTMLElement, FaqIconsProps>(
  (
    {
      title = 'Frequently asked questions',
      description = 'Installing, theming and licensing, in short answers.',
      items = DEFAULT_ITEMS,
      ...props
    },
    ref,
  ) => <FaqGrid ref={ref} title={title} description={description} items={items} {...props} />,
)
FaqIcons.displayName = 'FaqIcons'

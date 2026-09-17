'use client'

import { forwardRef, type ReactNode } from 'react'
import { Banner, type BannerProps } from '@/components/blocks/banner/banner'
import { BannerLink } from '@/components/blocks/banner/banner-link'

export interface BannerFilledProps extends Omit<BannerProps, 'variant' | 'children'> {
  message?: ReactNode
  linkLabel?: string
  href?: string
}

export const BannerFilled = forwardRef<HTMLElement, BannerFilledProps>(
  (
    {
      message = 'New blocks are landing in Nexvyn UI, ready to copy into your project.',
      linkLabel = 'Browse blocks',
      href = '#',
      ...props
    },
    ref,
  ) => (
    <Banner ref={ref} variant="filled" {...props}>
      {message}
      {linkLabel && <BannerLink href={href}>{linkLabel}</BannerLink>}
    </Banner>
  ),
)
BannerFilled.displayName = 'BannerFilled'

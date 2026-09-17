'use client'

import { forwardRef, type ReactNode } from 'react'
import { Banner, type BannerProps } from '@/components/blocks/banner/banner'
import { BannerLink } from '@/components/blocks/banner/banner-link'

export interface BannerOutlineProps extends Omit<BannerProps, 'variant' | 'children'> {
  message?: ReactNode
  linkLabel?: string
  href?: string
}

export const BannerOutline = forwardRef<HTMLElement, BannerOutlineProps>(
  (
    {
      message = 'Install any component with one command, no setup beyond shadcn.',
      linkLabel = 'Get started',
      href = '/components',
      ...props
    },
    ref,
  ) => (
    <Banner ref={ref} variant="outline" {...props}>
      {message}
      {linkLabel && <BannerLink href={href}>{linkLabel}</BannerLink>}
    </Banner>
  ),
)
BannerOutline.displayName = 'BannerOutline'

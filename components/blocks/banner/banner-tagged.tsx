'use client'

import { forwardRef, type ReactNode } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowRight01Icon } from '@hugeicons/core-free-icons'
import { Banner, type BannerProps } from '@/components/blocks/banner/banner'
import { BannerLink } from '@/components/blocks/banner/banner-link'
import { BannerTag } from '@/components/blocks/banner/banner-tag'

export interface BannerTaggedProps extends Omit<BannerProps, 'variant' | 'children'> {
  tag?: ReactNode
  message?: ReactNode
  linkLabel?: string
  href?: string
}

export const BannerTagged = forwardRef<HTMLElement, BannerTaggedProps>(
  (
    {
      tag = 'New',
      message = 'Banner blocks are here, six layouts for every kind of notice.',
      linkLabel = 'Read more',
      href = '#',
      ...props
    },
    ref,
  ) => (
    <Banner ref={ref} variant="outline" {...props}>
      {tag && <BannerTag>{tag}</BannerTag>}
      {message}
      {linkLabel && (
        <BannerLink href={href} className="inline-flex items-center gap-0.5">
          {linkLabel}
          <HugeiconsIcon icon={ArrowRight01Icon} size={14} strokeWidth={1.5} aria-hidden="true" />
        </BannerLink>
      )}
    </Banner>
  ),
)
BannerTagged.displayName = 'BannerTagged'

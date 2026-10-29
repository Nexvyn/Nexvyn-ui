'use client'

import { forwardRef, type ReactNode } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { Alert02Icon, InformationCircleIcon } from '@hugeicons/core-free-icons'
import { Banner, type BannerProps } from '@/components/blocks/banner/banner'
import { BannerLink } from '@/components/blocks/banner/banner-link'

export interface BannerNoticeProps extends Omit<BannerProps, 'variant' | 'children'> {
  tone?: 'info' | 'error'
  message?: ReactNode
  linkLabel?: string
  href?: string
}

const TONES = {
  info: {
    variant: 'outline',
    role: 'status',
    label: 'Information',
    icon: InformationCircleIcon,
    message: 'Scheduled maintenance on Friday at 02:00 UTC.',
    linkLabel: 'Details',
  },
  error: {
    variant: 'destructive',
    role: 'alert',
    label: 'Error',
    icon: Alert02Icon,
    message: 'We could not process your last payment.',
    linkLabel: 'Update billing',
  },
} as const

export const BannerNotice = forwardRef<HTMLElement, BannerNoticeProps>(
  ({ tone = 'info', message, linkLabel, href = '#', icon, ...props }, ref) => {
    const preset = TONES[tone]
    const label = linkLabel ?? preset.linkLabel

    return (
      <Banner
        ref={ref}
        variant={preset.variant}
        role={preset.role}
        aria-label={preset.label}
        icon={icon ?? <HugeiconsIcon icon={preset.icon} size={16} strokeWidth={1.5} />}
        {...props}
      >
        {message ?? preset.message}
        {label && <BannerLink href={href}>{label}</BannerLink>}
      </Banner>
    )
  },
)
BannerNotice.displayName = 'BannerNotice'

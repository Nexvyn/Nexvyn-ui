'use client'

import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

export interface BannerLinkProps extends ComponentPropsWithoutRef<'a'> {
  asChild?: boolean
}

export const BannerLink = forwardRef<HTMLAnchorElement, BannerLinkProps>(
  ({ asChild, className, ...props }, ref) => {
    const Comp = asChild ? Slot : 'a'

    return (
      <Comp
        ref={ref}
        className={cn(
          'ms-1 rounded-md underline underline-offset-4 transition-opacity duration-(--motion-dur-fast) hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) motion-reduce:transition-none',
          className,
        )}
        {...props}
      />
    )
  },
)
BannerLink.displayName = 'BannerLink'

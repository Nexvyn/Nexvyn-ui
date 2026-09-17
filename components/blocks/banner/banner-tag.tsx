import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

export type BannerTagProps = ComponentPropsWithoutRef<'span'>

export const BannerTag = forwardRef<HTMLSpanElement, BannerTagProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'me-2 inline-flex h-5 items-center rounded-md border border-current/30 px-1.5 text-xs leading-none',
        className,
      )}
      {...props}
    />
  ),
)
BannerTag.displayName = 'BannerTag'

'use client'

import { forwardRef } from 'react'
import { LoginForm, type LoginFormProps } from '@/components/blocks/login/login'
import { cn } from '@/lib/utils'

export type LoginSocialProps = Omit<LoginFormProps, 'providerPlacement' | 'providerLayout'>

export const LoginSocial = forwardRef<HTMLDivElement, LoginSocialProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex min-h-full w-full items-center justify-center bg-(--color-bg) px-6 py-16',
        className,
      )}
    >
      <LoginForm providerPlacement="before" providerLayout="stack" {...props} />
    </div>
  ),
)
LoginSocial.displayName = 'LoginSocial'

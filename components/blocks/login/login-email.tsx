'use client'

import { forwardRef } from 'react'
import { LoginForm, type LoginFormProps } from '@/components/blocks/login/login'
import { cn } from '@/lib/utils'

export type LoginEmailProps = Omit<LoginFormProps, 'providerPlacement' | 'providerLayout'>

export const LoginEmail = forwardRef<HTMLDivElement, LoginEmailProps>(
  ({ dividerLabel = 'or continue with', className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex min-h-full w-full items-center justify-center bg-(--color-bg) px-6 py-16',
        className,
      )}
    >
      <LoginForm
        providerPlacement="after"
        providerLayout="grid"
        dividerLabel={dividerLabel}
        {...props}
      />
    </div>
  ),
)
LoginEmail.displayName = 'LoginEmail'

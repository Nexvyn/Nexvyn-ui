'use client'

import { forwardRef, type ReactNode } from 'react'
import Image from 'next/image'
import { LoginForm, LoginMark, type LoginFormProps } from '@/components/blocks/login/login'
import { cn } from '@/lib/utils'

export interface LoginSplitProps extends Omit<
  LoginFormProps,
  'providerPlacement' | 'providerLayout'
> {
  imageSrc?: string
  imageAlt?: string
  aside?: ReactNode
}

export function LoginPhoto({ src, alt }: { src?: string; alt: string }) {
  if (!src) return <div aria-hidden="true" className="absolute inset-0 bg-(--color-surface-2)" />

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 1024px) 60vw, 0px"
      className="object-cover dark:brightness-40 dark:grayscale"
    />
  )
}

export const LoginSplit = forwardRef<HTMLDivElement, LoginSplitProps>(
  (
    {
      imageSrc,
      imageAlt = '',
      aside,
      mark = <LoginMark />,
      dividerLabel = 'or continue with',
      className,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn('grid min-h-full w-full bg-(--color-bg) lg:grid-cols-[2fr_3fr]', className)}
    >
      <div className="flex items-center justify-center px-6 py-16">
        <LoginForm
          mark={mark}
          providerPlacement="after"
          providerLayout="grid"
          dividerLabel={dividerLabel}
          className="max-w-xs"
          {...props}
        />
      </div>
      <div className="relative hidden overflow-hidden lg:block">
        <LoginPhoto src={imageSrc} alt={imageAlt} />
        {aside}
      </div>
    </div>
  ),
)
LoginSplit.displayName = 'LoginSplit'

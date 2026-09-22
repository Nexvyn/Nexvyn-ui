'use client'

import { forwardRef, type ReactNode } from 'react'
import Image from 'next/image'
import { LoginSplit, type LoginSplitProps } from '@/components/blocks/login/login-split'

export type LoginQuoteAuthor = { name: string; role: string; avatarSrc?: string }

export interface LoginQuoteProps extends Omit<LoginSplitProps, 'aside'> {
  quote?: ReactNode
  author?: LoginQuoteAuthor
}

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
}

export const LoginQuote = forwardRef<HTMLDivElement, LoginQuoteProps>(
  (
    {
      quote = 'We replaced a whole folder of one-off buttons in an afternoon. The team still talks about it.',
      author = { name: 'Maya Okafor', role: 'Design lead' },
      ...props
    },
    ref,
  ) => (
    <LoginSplit
      ref={ref}
      aside={
        <div className="dark absolute inset-0 flex flex-col justify-end">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-(--color-bg)/85 via-(--color-bg)/25 to-transparent"
          />
          <figure className="relative flex max-w-lg flex-col gap-5 p-10">
            <blockquote className="text-pretty text-xl text-(--color-fg) xl:text-2xl">
              <p>“{quote}”</p>
            </blockquote>
            <figcaption className="flex items-center gap-3">
              <span className="squircle relative flex size-10 shrink-0 items-center justify-center overflow-hidden bg-(--color-surface-2) text-xs text-(--color-muted)">
                {author.avatarSrc ? (
                  <Image src={author.avatarSrc} alt="" fill sizes="40px" className="object-cover" />
                ) : (
                  <span aria-hidden="true">{initials(author.name)}</span>
                )}
              </span>
              <span className="flex flex-col">
                <span className="text-sm text-(--color-fg)">{author.name}</span>
                <span className="text-xs text-(--color-muted)">{author.role}</span>
              </span>
            </figcaption>
          </figure>
        </div>
      }
      {...props}
    />
  ),
)
LoginQuote.displayName = 'LoginQuote'

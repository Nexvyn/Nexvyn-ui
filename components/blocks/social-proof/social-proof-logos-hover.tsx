'use client'

import { forwardRef, useId, type ReactNode } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons'
import {
  LOGOS_DESCRIPTION,
  LOGOS_TITLE,
  LogoGrid,
  LogosHeader,
  LogosSection,
  SOCIAL_PROOF_LOGOS,
  type LogosBlockProps,
} from '@/components/blocks/social-proof/logos'

export interface SocialProofLogosHoverProps extends LogosBlockProps {
  linkLabel?: string
  linkHref?: string
  linkIcon?: ReactNode
}

const RECEDE =
  'transition-[scale,opacity] duration-(--motion-dur-base) ease-(--motion-ease-in-out) group-hover/logos:scale-95 group-hover/logos:opacity-40 group-focus-within/logos:scale-95 group-focus-within/logos:opacity-40 motion-reduce:transition-none'

export const SocialProofLogosHover = forwardRef<HTMLElement, SocialProofLogosHoverProps>(
  (
    {
      title = LOGOS_TITLE,
      description = LOGOS_DESCRIPTION,
      logos = SOCIAL_PROOF_LOGOS,
      linkLabel = 'See the full stack',
      linkHref = '#',
      linkIcon = <HugeiconsIcon icon={ArrowUpRight01Icon} size={16} strokeWidth={1.5} />,
      ...props
    },
    ref,
  ) => {
    const headingId = useId()

    return (
      <LogosSection ref={ref} labelledBy={headingId} {...props}>
        <LogosHeader id={headingId} title={title} description={description} />
        <div className="group/logos relative flex flex-col gap-4">
          <LogoGrid logos={logos} linked={false} imageClassName={linkLabel ? RECEDE : undefined} />
          {linkLabel && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center [@media(hover:none)]:static [@media(hover:none)]:justify-start">
              <a
                href={linkHref}
                className="pointer-events-auto inline-flex min-h-11 translate-y-1 items-center gap-1.5 rounded-md border border-(--color-border) bg-(--color-bg) px-4 text-sm text-(--color-fg) opacity-0 outline-none transition-[opacity,translate] duration-(--motion-dur-base) ease-(--motion-ease-out) focus-visible:ring-2 focus-visible:ring-(--color-accent) group-hover/logos:translate-y-0 group-hover/logos:opacity-100 group-focus-within/logos:translate-y-0 group-focus-within/logos:opacity-100 motion-reduce:translate-none motion-reduce:transition-none [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100"
              >
                {linkLabel}
                {linkIcon && (
                  <span aria-hidden="true" className="flex rtl:-scale-x-100">
                    {linkIcon}
                  </span>
                )}
              </a>
            </div>
          )}
        </div>
      </LogosSection>
    )
  },
)
SocialProofLogosHover.displayName = 'SocialProofLogosHover'

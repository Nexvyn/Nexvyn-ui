'use client'

import { forwardRef, useId, type CSSProperties } from 'react'
import {
  LOGOS_DESCRIPTION,
  LOGOS_TITLE,
  LogoMark,
  LogosHeader,
  LogosSection,
  SOCIAL_PROOF_LOGOS,
  type LogosBlockProps,
  type SocialProofLogo,
} from '@/components/blocks/social-proof/logos'
import { cn } from '@/lib/utils'

export interface SocialProofLogosMarqueeProps extends LogosBlockProps {
  duration?: number
}

// Unlayered on purpose: it must beat Tailwind's layered utilities for play state and reduced motion.
const MARQUEE_CSS = `
@keyframes nx-logo-marquee { to { translate: -50% 0; } }
@keyframes nx-logo-marquee-rtl { to { translate: 50% 0; } }
.nx-logo-marquee { animation: nx-logo-marquee var(--nx-logo-marquee-duration, 40s) linear infinite; }
[dir='rtl'] .nx-logo-marquee { animation-name: nx-logo-marquee-rtl; }
.nx-logo-marquee:dir(rtl) { animation-name: nx-logo-marquee-rtl; }
.nx-logo-marquee-root:focus-within .nx-logo-marquee { animation-play-state: paused; }
@media (hover: hover) { .nx-logo-marquee-root:hover .nx-logo-marquee { animation-play-state: paused; } }
@media (prefers-reduced-motion: reduce) { .nx-logo-marquee { animation: none; } }
`

function LogoRow({ logos, copy }: { logos: SocialProofLogo[]; copy?: boolean }) {
  return (
    <ul
      aria-hidden={copy || undefined}
      inert={copy || undefined}
      className={cn(
        'flex shrink-0 items-center gap-x-6 pe-6 sm:gap-x-10 sm:pe-10',
        'motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-4 motion-reduce:pe-0',
        copy && 'motion-reduce:hidden',
      )}
    >
      {logos.map((logo) => (
        <li key={logo.name} className="flex h-12">
          <LogoMark logo={logo} className="px-3" />
        </li>
      ))}
    </ul>
  )
}

export const SocialProofLogosMarquee = forwardRef<HTMLElement, SocialProofLogosMarqueeProps>(
  (
    {
      title = LOGOS_TITLE,
      description = LOGOS_DESCRIPTION,
      logos = SOCIAL_PROOF_LOGOS,
      duration = 40,
      ...props
    },
    ref,
  ) => {
    const headingId = useId()

    return (
      <LogosSection ref={ref} labelledBy={headingId} {...props}>
        <style href="nx-logo-marquee" precedence="default">
          {MARQUEE_CSS}
        </style>
        <LogosHeader id={headingId} title={title} description={description} />
        <div className="nx-logo-marquee-root overflow-hidden mask-x-from-85% motion-reduce:mask-none">
          <div
            className="nx-logo-marquee flex w-max motion-reduce:w-full"
            style={{ '--nx-logo-marquee-duration': `${duration}s` } as CSSProperties}
          >
            <LogoRow logos={logos} />
            <LogoRow logos={logos} copy />
          </div>
        </div>
      </LogosSection>
    )
  },
)
SocialProofLogosMarquee.displayName = 'SocialProofLogosMarquee'

'use client'

import { forwardRef, useEffect, useId, useRef, useState } from 'react'
import {
  LOGOS_DESCRIPTION,
  LOGOS_TITLE,
  LogoGrid,
  LogosHeader,
  LogosSection,
  SOCIAL_PROOF_LOGOS,
  type LogosBlockProps,
} from '@/components/blocks/social-proof/logos'
import { cn } from '@/lib/utils'

export interface SocialProofLogosRevealProps extends LogosBlockProps {
  threshold?: number
}

const MOTION =
  'transition-[opacity,translate,filter] duration-(--motion-dur-showcase) ease-(--motion-ease-out) motion-reduce:translate-none motion-reduce:opacity-100 motion-reduce:blur-none motion-reduce:transition-none'

export const SocialProofLogosReveal = forwardRef<HTMLElement, SocialProofLogosRevealProps>(
  (
    {
      title = LOGOS_TITLE,
      description = LOGOS_DESCRIPTION,
      logos = SOCIAL_PROOF_LOGOS,
      threshold = 0.25,
      ...props
    },
    ref,
  ) => {
    const headingId = useId()
    const gridRef = useRef<HTMLUListElement>(null)
    const [revealed, setRevealed] = useState(false)

    useEffect(() => {
      const node = gridRef.current
      if (!node) return
      const observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return
          setRevealed(true)
          observer.disconnect()
        },
        { threshold },
      )
      observer.observe(node)
      return () => observer.disconnect()
    }, [threshold])

    return (
      <LogosSection ref={ref} labelledBy={headingId} {...props}>
        <LogosHeader id={headingId} title={title} description={description} />
        <LogoGrid
          ref={gridRef}
          logos={logos}
          imageClassName={cn(
            MOTION,
            revealed ? 'translate-y-0 opacity-100 blur-none' : 'translate-y-2 opacity-0 blur-xs',
          )}
          imageStyle={(index) => ({
            transitionDelay: `calc(var(--motion-dur-instant) * ${index})`,
          })}
        />
      </LogosSection>
    )
  },
)
SocialProofLogosReveal.displayName = 'SocialProofLogosReveal'

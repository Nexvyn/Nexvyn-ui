'use client'

import { forwardRef, useId } from 'react'
import {
  LOGOS_DESCRIPTION,
  LOGOS_TITLE,
  LogoGrid,
  LogosHeader,
  LogosSection,
  SOCIAL_PROOF_LOGOS,
  type LogosBlockProps,
} from '@/components/blocks/social-proof/logos'

export type SocialProofLogosProps = LogosBlockProps

export const SocialProofLogos = forwardRef<HTMLElement, SocialProofLogosProps>(
  (
    { title = LOGOS_TITLE, description = LOGOS_DESCRIPTION, logos = SOCIAL_PROOF_LOGOS, ...props },
    ref,
  ) => {
    const headingId = useId()

    return (
      <LogosSection ref={ref} labelledBy={headingId} {...props}>
        <LogosHeader id={headingId} title={title} description={description} />
        <LogoGrid logos={logos} />
      </LogosSection>
    )
  },
)
SocialProofLogos.displayName = 'SocialProofLogos'

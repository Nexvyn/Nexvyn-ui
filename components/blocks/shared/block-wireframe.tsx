import type { ComponentType } from 'react'
import { cn } from '@/lib/utils'
import { BannerFilledBlueprint } from '@/components/diagrams/banner-filled-diagram'
import { BannerOutlineBlueprint } from '@/components/diagrams/banner-outline-diagram'
import { BannerTaggedBlueprint } from '@/components/diagrams/banner-tagged-diagram'
import { BannerNoticeBlueprint } from '@/components/diagrams/banner-notice-diagram'
import { BannerCookieBlueprint } from '@/components/diagrams/banner-cookie-diagram'
import { BannerSubscribeBlueprint } from '@/components/diagrams/banner-subscribe-diagram'
import { CtaCenteredBlueprint } from '@/components/diagrams/cta-centered-diagram'
import { CtaSplitBlueprint } from '@/components/diagrams/cta-split-diagram'
import { FooterSimpleBlueprint } from '@/components/diagrams/footer-simple-diagram'
import { FooterColumnsBlueprint } from '@/components/diagrams/footer-columns-diagram'
import { FooterCenteredBlueprint } from '@/components/diagrams/footer-centered-diagram'
import { FaqAccordionBlueprint } from '@/components/diagrams/faq-accordion-diagram'
import { FaqGroupedBlueprint } from '@/components/diagrams/faq-grouped-diagram'
import { FaqNumberedBlueprint } from '@/components/diagrams/faq-numbered-diagram'
import { FaqIconsBlueprint } from '@/components/diagrams/faq-icons-diagram'
import { FooterNewsletterBlueprint } from '@/components/diagrams/footer-newsletter-diagram'

const BLUEPRINTS: Record<string, ComponentType> = {
  banner: BannerFilledBlueprint,
  'banner-filled': BannerFilledBlueprint,
  'banner-outline': BannerOutlineBlueprint,
  'banner-tagged': BannerTaggedBlueprint,
  'banner-notice': BannerNoticeBlueprint,
  'banner-cookie': BannerCookieBlueprint,
  'banner-subscribe': BannerSubscribeBlueprint,
  cta: CtaCenteredBlueprint,
  'cta-centered': CtaCenteredBlueprint,
  'cta-split': CtaSplitBlueprint,
  footer: FooterSimpleBlueprint,
  'footer-simple': FooterSimpleBlueprint,
  'footer-columns': FooterColumnsBlueprint,
  'footer-centered': FooterCenteredBlueprint,
  faq: FaqAccordionBlueprint,
  'faq-accordion': FaqAccordionBlueprint,
  'faq-grouped': FaqGroupedBlueprint,
  'faq-numbered': FaqNumberedBlueprint,
  'faq-icons': FaqIconsBlueprint,
  'footer-newsletter': FooterNewsletterBlueprint,
}

export function BlockBlueprint({ id }: { id: string }) {
  const Blueprint = BLUEPRINTS[id]
  return Blueprint ? <Blueprint /> : null
}

export interface BlockWireframeProps {
  id: string
  className?: string
}

export function BlockWireframe({ id, className }: BlockWireframeProps) {
  const Blueprint = BLUEPRINTS[id]
  if (!Blueprint) return null

  return (
    <div
      className={cn('flex items-center justify-center [&>svg]:h-auto [&>svg]:w-full', className)}
    >
      <Blueprint />
    </div>
  )
}

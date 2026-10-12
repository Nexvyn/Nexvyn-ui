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
import { FooterLanguageBlueprint } from '@/components/diagrams/footer-language-diagram'
import { FooterWordmarkBlueprint } from '@/components/diagrams/footer-wordmark-diagram'
import { FooterSignatureBlueprint } from '@/components/diagrams/footer-signature-diagram'
import { LoginSocialBlueprint } from '@/components/diagrams/login-social-diagram'
import { LoginEmailBlueprint } from '@/components/diagrams/login-email-diagram'
import { LoginSplitBlueprint } from '@/components/diagrams/login-split-diagram'
import { LoginQuoteBlueprint } from '@/components/diagrams/login-quote-diagram'
import { SidebarWorkspaceBlueprint } from '@/components/diagrams/sidebar-workspace-diagram'
import { SidebarRailBlueprint } from '@/components/diagrams/sidebar-rail-diagram'
import { SidebarCollapsibleBlueprint } from '@/components/diagrams/sidebar-collapsible-diagram'
import { SocialProofLogosBlueprint } from '@/components/diagrams/social-proof-logos-diagram'

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
  'footer-language': FooterLanguageBlueprint,
  'footer-wordmark': FooterWordmarkBlueprint,
  'footer-signature': FooterSignatureBlueprint,
  login: LoginSocialBlueprint,
  'login-social': LoginSocialBlueprint,
  'login-email': LoginEmailBlueprint,
  'login-split': LoginSplitBlueprint,
  'login-quote': LoginQuoteBlueprint,
  sidebar: SidebarWorkspaceBlueprint,
  'sidebar-workspace': SidebarWorkspaceBlueprint,
  'sidebar-rail': SidebarRailBlueprint,
  'sidebar-collapsible': SidebarCollapsibleBlueprint,
  'social-proof': SocialProofLogosBlueprint,
  'social-proof-logos': SocialProofLogosBlueprint,
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

'use client'

import { useParams } from 'next/navigation'
import { BLOCKS } from '@/lib/components-registry'
import { BannerFilledDemo } from '@/components/blocks/banner/demos/banner-filled-demo'
import { BannerOutlineDemo } from '@/components/blocks/banner/demos/banner-outline-demo'
import { BannerTaggedDemo } from '@/components/blocks/banner/demos/banner-tagged-demo'
import { BannerNoticeDemo } from '@/components/blocks/banner/demos/banner-notice-demo'
import { BannerCookieDemo } from '@/components/blocks/banner/demos/banner-cookie-demo'
import { BannerSubscribeDemo } from '@/components/blocks/banner/demos/banner-subscribe-demo'
import { CtaCenteredDemo } from '@/components/blocks/cta/demos/cta-centered-demo'
import { CtaSplitDemo } from '@/components/blocks/cta/demos/cta-split-demo'
import { FooterSimpleDemo } from '@/components/blocks/footer/demos/footer-simple-demo'
import { FooterColumnsDemo } from '@/components/blocks/footer/demos/footer-columns-demo'
import { FooterCenteredDemo } from '@/components/blocks/footer/demos/footer-centered-demo'

function BlockDemo({ id }: { id: string }) {
  switch (id) {
    case 'banner-filled':
      return <BannerFilledDemo />
    case 'banner-outline':
      return <BannerOutlineDemo />
    case 'banner-tagged':
      return <BannerTaggedDemo />
    case 'banner-notice':
      return <BannerNoticeDemo />
    case 'banner-cookie':
      return <BannerCookieDemo />
    case 'banner-subscribe':
      return <BannerSubscribeDemo />
    case 'cta-centered':
      return <CtaCenteredDemo />
    case 'cta-split':
      return <CtaSplitDemo />
    case 'footer-simple':
      return <FooterSimpleDemo />
    case 'footer-columns':
      return <FooterColumnsDemo />
    case 'footer-centered':
      return <FooterCenteredDemo />
    default:
      return null
  }
}

export default function BlockPage() {
  const params = useParams()
  const group = typeof params.block === 'string' ? params.block : ''
  const variant = typeof params.variant === 'string' ? params.variant : null
  const id = variant ? `${group}-${variant}` : group
  const block = BLOCKS.find((item) => item.id === id)

  if (!block) {
    return (
      <div
        className="flex h-full items-center justify-center"
        style={{ color: 'var(--color-muted)' }}
      >
        Block not found
      </div>
    )
  }

  return (
    <div className="detail-preview-enter h-full w-full">
      <BlockDemo id={block.id} />
    </div>
  )
}

'use client'

import { FooterCentered } from '@/components/blocks/footer/footer-centered'
import { PagePrototype } from '@/components/blocks/shared/page-prototype'

export function FooterCenteredDemo() {
  return <PagePrototype footer={<FooterCentered />} />
}

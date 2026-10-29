'use client'

import { BannerTagged } from '@/components/blocks/banner/banner-tagged'
import { TopBannerDemo } from '@/components/blocks/banner/demos/demo-shell'

export function BannerTaggedDemo() {
  return <TopBannerDemo render={(control) => <BannerTagged {...control} />} />
}

'use client'

import { BannerFilled } from '@/components/blocks/banner/banner-filled'
import { TopBannerDemo } from '@/components/blocks/banner/demos/demo-shell'

export function BannerFilledDemo() {
  return <TopBannerDemo render={(control) => <BannerFilled {...control} />} />
}

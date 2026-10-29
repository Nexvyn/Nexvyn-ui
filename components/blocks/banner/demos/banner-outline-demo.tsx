'use client'

import { BannerOutline } from '@/components/blocks/banner/banner-outline'
import { TopBannerDemo } from '@/components/blocks/banner/demos/demo-shell'

export function BannerOutlineDemo() {
  return <TopBannerDemo render={(control) => <BannerOutline {...control} />} />
}

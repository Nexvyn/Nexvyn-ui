'use client'

import { useState } from 'react'
import { BannerCookie } from '@/components/blocks/banner/banner-cookie'
import { ResetButton } from '@/components/blocks/banner/demos/demo-shell'
import { PagePrototype } from '@/components/blocks/shared/page-prototype'

export function BannerCookieDemo() {
  const [open, setOpen] = useState(true)

  return (
    <div className="relative h-full w-full">
      <PagePrototype overlay={<BannerCookie open={open} onOpenChange={setOpen} />} />
      <ResetButton show={!open} label="Show cookie banner again" onReset={() => setOpen(true)} />
    </div>
  )
}

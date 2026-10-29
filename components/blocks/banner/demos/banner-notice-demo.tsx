'use client'

import { useState } from 'react'
import { BannerNotice } from '@/components/blocks/banner/banner-notice'
import { ResetButton } from '@/components/blocks/banner/demos/demo-shell'
import { PagePrototype } from '@/components/blocks/shared/page-prototype'

export function BannerNoticeDemo() {
  const [infoOpen, setInfoOpen] = useState(true)
  const [errorOpen, setErrorOpen] = useState(true)

  return (
    <div className="relative h-full w-full">
      <PagePrototype
        top={
          <>
            <BannerNotice tone="info" open={infoOpen} onOpenChange={setInfoOpen} />
            <BannerNotice tone="error" open={errorOpen} onOpenChange={setErrorOpen} />
          </>
        }
      />
      <ResetButton
        show={!infoOpen || !errorOpen}
        label="Show banners again"
        onReset={() => {
          setInfoOpen(true)
          setErrorOpen(true)
        }}
      />
    </div>
  )
}

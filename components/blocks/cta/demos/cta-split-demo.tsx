'use client'

import { CtaSplit } from '@/components/blocks/cta/cta-split'
import { PagePrototype } from '@/components/blocks/shared/page-prototype'

export function CtaSplitDemo() {
  return (
    <div className="relative h-full w-full">
      <PagePrototype
        bottom={
          <CtaSplit
            imageSrc="/blocks/cta-phone-light.jpg"
            imageDarkSrc="/blocks/cta-phone-dark.jpg"
            imageAlt="The Nexvyn UI components page on a phone"
          />
        }
      />
    </div>
  )
}

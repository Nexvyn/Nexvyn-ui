'use client'

import { LoginSplit } from '@/components/blocks/login/login-split'
import { PagePrototype } from '@/components/blocks/shared/page-prototype'

export function LoginSplitDemo() {
  return (
    <PagePrototype
      address="acme.app/login"
      page={<LoginSplit imageSrc="/blocks/login/login-sky.jpg" />}
    />
  )
}

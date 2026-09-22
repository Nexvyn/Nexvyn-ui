'use client'

import { LoginEmail } from '@/components/blocks/login/login-email'
import { PagePrototype } from '@/components/blocks/shared/page-prototype'

export function LoginEmailDemo() {
  return <PagePrototype address="acme.app/login" page={<LoginEmail />} />
}

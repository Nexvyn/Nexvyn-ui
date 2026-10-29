'use client'

import { LoginSocial } from '@/components/blocks/login/login-social'
import { PagePrototype } from '@/components/blocks/shared/page-prototype'

export function LoginSocialDemo() {
  return <PagePrototype address="acme.app/login" page={<LoginSocial />} />
}

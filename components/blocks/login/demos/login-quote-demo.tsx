'use client'

import { LoginQuote } from '@/components/blocks/login/login-quote'
import { PagePrototype } from '@/components/blocks/shared/page-prototype'

export function LoginQuoteDemo() {
  return (
    <PagePrototype
      address="acme.app/login"
      page={<LoginQuote imageSrc="/blocks/login/login-wall.jpg" />}
    />
  )
}

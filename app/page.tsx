import { pageMetadata } from '@/lib/seo'
import HomePage from './home-page'

export const metadata = pageMetadata({ path: '/' })

export default function Page() {
  return <HomePage />
}

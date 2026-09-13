import type { Metadata } from 'next'
import { COMPONENTS } from '@/lib/components-registry'
import { pageMetadata } from '@/lib/seo'
import ComponentPage from './component-page'

export const dynamicParams = false

export function generateStaticParams() {
  return COMPONENTS.map((item) => ({ component: item.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ component: string }>
}): Promise<Metadata> {
  const { component } = await params
  const item = COMPONENTS.find((entry) => entry.id === component)
  if (!item) return {}

  return pageMetadata({
    title: `${item.name} Component`,
    description:
      item.description ??
      `${item.name} — an accessible React component built with TypeScript and Tailwind CSS.`,
    path: `/components/${item.id}`,
  })
}

export default function Page() {
  return <ComponentPage />
}

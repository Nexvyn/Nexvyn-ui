import type { Metadata } from 'next'
import { BLOCKS } from '@/lib/components-registry'
import { pageMetadata } from '@/lib/seo'
import BlockPage from '../block-page'

export const dynamicParams = false

export function generateStaticParams() {
  return BLOCKS.filter((item) => item.parent).map((item) => ({
    block: item.parent as string,
    variant: item.id.slice((item.parent as string).length + 1),
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ block: string; variant: string }>
}): Promise<Metadata> {
  const { block, variant } = await params
  const item = BLOCKS.find((entry) => entry.id === `${block}-${variant}`)
  const group = BLOCKS.find((entry) => entry.id === block)
  if (!item || !group) return {}

  return pageMetadata({
    title: `${group.name} ${item.name} Block`,
    description: item.description ?? `${group.name} ${item.name}, a React block.`,
    path: item.href ?? `/blocks/${block}/${variant}`,
  })
}

export default function Page() {
  return <BlockPage />
}

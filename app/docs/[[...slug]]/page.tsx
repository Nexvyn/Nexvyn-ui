import Link from "next/link"
import { notFound } from "next/navigation"
import { mdxComponents } from "@/mdx-components"
import { ChevronLeft, ChevronRight, Copy, Check } from "lucide-react"
import { findNeighbour } from "fumadocs-core/page-tree"
import { createStaticOGMetadata } from "@/lib/metadata"
import { source } from "@/lib/source"
import { absoluteUrl } from "@/lib/utils"
import { Button } from "@/components/ui/core/button"
// import { BookmarkButton } from "@/components/ui/bookmark-button";
import { ViewOptions } from "@/components/docs/page-actions"
import { ClientTOC } from "@/components/docs/client-toc"
import { CopyPageButton } from "@/components/docs/copy-page-button"

export const revalidate = false
export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params
  const page = source.getPage(params.slug)

  if (!page) {
    notFound()
  }

  const doc = page.data

  if (!doc.title || !doc.description) {
    notFound()
  }

  return {
    ...createStaticOGMetadata(doc.title, doc.description),
    openGraph: {
      ...createStaticOGMetadata(doc.title, doc.description).openGraph,
      type: "article",
      url: absoluteUrl(page.url),
    },
    twitter: {
      ...createStaticOGMetadata(doc.title, doc.description).twitter,
      creator: "@nexvyn-ui",
    },
  }
}

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) {
    notFound()
  }

  const doc = page.data
  const MDX = doc.body
  const neighbours = await findNeighbour(source.pageTree, page.url)

  const owner = "Nexvyn"
  const repo = "nexvyn-ui"

  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col gap-4 border-b pb-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight">{doc.title}</h1>

          </div>
          {/* Navigation arrows */}
          <div className="flex shrink-0 items-center gap-1 pt-1">
            {neighbours.previous && (
              <Button variant="ghost" size="icon" className="size-8" asChild>
                <Link href={neighbours.previous.url}>
                  <ChevronLeft className="size-4" />
                  <span className="sr-only">Previous</span>
                </Link>
              </Button>
            )}
            {neighbours.next && (
              <Button variant="ghost" size="icon" className="size-8" asChild>
                <Link href={neighbours.next.url}>
                  <ChevronRight className="size-4" />
                  <span className="sr-only">Next</span>
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Actions bar */}
        <div className="flex items-center justify-between gap-2">
          {doc.description ? (
            <p className="text-muted-foreground text-lg text-balance">{doc.description}</p>
          ) : (
            <div />
          )}
          <ViewOptions
            markdownUrl={`/llms.mdx${page.url.replace("/docs", "")}`}
            githubUrl={`https://github.com/${owner}/${repo}/blob/main/content/docs/${page.path}`}
          />
          {/* <BookmarkButton
            className="ml-auto"
            title={doc.title || "Documentation"}
            href={page.url}
          /> */}
        </div>
      </div>

      {/* MDX Content with prose styling */}
      <div id="docs-content" className="prose prose-neutral dark:prose-invert max-w-none py-8">
        <MDX components={mdxComponents} />
      </div>

      {/* Previous/Next Navigation */}
      <div className="flex items-center justify-between gap-4 border-t py-8">
        {neighbours.previous ? (
          <Link
            href={neighbours.previous.url}
            className="hover:bg-muted/50 flex max-w-[45%] flex-col gap-1 rounded-lg border p-3 transition-colors"
          >
            <span className="text-muted-foreground flex items-center gap-1 text-sm">
              <ChevronLeft className="size-4" />
              Previous
            </span>
            <span className="truncate font-medium">{neighbours.previous.name}</span>
          </Link>
        ) : (
          <div />
        )}
        {neighbours.next ? (
          <Link
            href={neighbours.next.url}
            className="hover:bg-muted/50 ml-auto flex max-w-[45%] flex-col gap-1 rounded-lg border p-3 text-right transition-colors"
          >
            <span className="text-muted-foreground flex items-center justify-end gap-1 text-sm">
              Next
              <ChevronRight className="size-4" />
            </span>
            <span className="truncate font-medium">{neighbours.next.name}</span>
          </Link>
        ) : (
          <div />
        )}
      </div>

      {/* Right-side TOC - sticky position within content area */}
      <div className="absolute top-0 right-0 hidden h-full w-48 xl:block">
        <div className="sticky top-24 h-[calc(100vh-120px)]">
          <ClientTOC toc={page.data.toc} />
        </div>
      </div>
    </>
  )
}

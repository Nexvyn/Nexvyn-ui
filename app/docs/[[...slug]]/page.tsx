import { getPageImage, source } from "@/lib/source";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/mdx-components";
import type { Metadata } from "next";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { LLMCopyButton, ViewOptions } from "@/components/page-actions";
import { CustomTOC } from "@/components/custom-toc";

const owner = "Nexvyn";
const repo = "pixel-perfect";

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <div className="flex flex-row gap-8">
      <div className="flex-1 min-w-0">
        <DocsPage
          toc={page.data.toc}
          full={page.data.full}
          tableOfContent={{ enabled: false }}
        >
          <DocsTitle>{page.data.title}</DocsTitle>
          <DocsDescription>{page.data.description}</DocsDescription>
          <div className="flex flex-row gap-2 items-center border-b pb-2">
            <LLMCopyButton markdownUrl={`${page.url}.mdx`} />
            <ViewOptions
              markdownUrl={`${page.url}.mdx`}
              githubUrl={`https://github.com/${owner}/${repo}/blob/dev/apps/docs/content/docs/${page.path}`}
            />
          </div>
          <DocsBody>
            <MDX
              components={getMDXComponents({
                // this allows you to link to other pages with relative file paths
                a: createRelativeLink(source, page),
              })}
            />
          </DocsBody>
        </DocsPage>
      </div>
      {/* Custom TOC on the right */}
      <div className="hidden xl:block w-56 shrink-0">
        <CustomTOC toc={page.data.toc} />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<"/docs/[[...slug]]">
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}

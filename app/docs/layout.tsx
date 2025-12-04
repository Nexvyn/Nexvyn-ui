import { source } from "@/lib/source"
import { DocsLayout } from "fumadocs-ui/layouts/docs"
import { docsConfig } from "@/app/config/docs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Footer } from "../(home)/components/footer"
import { Navbar } from "../(home)/components/navbar"
import { DocsSidebarNav } from "@/components/sidebar-nav"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full">
      <Navbar />
      <div className="pt-16">
        <div className="items-start lg:grid lg:grid-cols-[340px_minmax(0,1fr)]">
          <aside className="sticky top-16 pb-4 z-30 hidden h-[calc(100vh-6rem)] w-full shrink-0 lg:block pt-4 pl-4">
            <div className="rounded-2xl bg-background/80 backdrop-blur-sm h-full border-border border shadow-sm">
              <ScrollArea className="h-full">
                <DocsSidebarNav items={docsConfig} />
              </ScrollArea>
            </div>
          </aside>

          <DocsLayout
            tree={source.pageTree}
            nav={{ enabled: false }}
            sidebar={{ enabled: false }}
          >
            <div className="p-4">{children}</div>
          </DocsLayout>
        </div>
      </div>
      <Footer />
    </div>
  )
}
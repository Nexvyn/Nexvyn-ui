import { docsConfig } from "@/app/config/docs"
import { Footer } from "../(app)/components/footer"
import { DocsNavbar } from "@/components/ui/our/docs/docs-navbar"
import { CollapsibleSidebar } from "@/components/ui/our/docs/collapsible-sidebar"

function CornerDecorations() {
  return (
    <>
      {/* <span className="border-primary absolute -left-px -top-px block size-2 rounded-tl-full border-l-2 border-t-2" />
      <span className="border-primary absolute -right-px -top-px block size-2 rounded-tr-full border-r-2 border-t-2" />
      <span className="border-primary absolute -bottom-px -left-px block size-2 rounded-bl-full border-b-2 border-l-2" />
      <span className="border-primary absolute -bottom-px -right-px block size-2 rounded-br-full border-b-2 border-r-2" /> */}
    </>
  )
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col gap-2 p-2 dark:bg-[#181818]">
      {/* Sticky Navbar with shrinking animation - solid background */}
      <div className="sticky top-2 z-50">
        <DocsNavbar />
      </div>

      {/* Main content card with rounded corners and dashed border */}
      <section className="bg-background relative min-h-[calc(100vh-80px)] w-full rounded-3xl border border-dashed">
        <CornerDecorations />

        <div className="flex">
          {/* Left Sidebar - Sticky with independent scroll and scroll masks */}
          <div className="sticky top-[72px] hidden h-[calc(100vh-88px)] shrink-0 self-start lg:block">
            <CollapsibleSidebar items={docsConfig} />
          </div>

          {/* Main content area with right TOC */}
          <div className="relative flex min-w-0 flex-1">
            {/* Page content */}
            <main className="min-w-0 flex-1">
              <div className="min-h-[calc(100vh-80px)] w-full">
                <div className="flex justify-center p-4">
                  <div className="docs-content w-full max-w-4xl">{children}</div>
                </div>
              </div>
            </main>

            {/* Right TOC spacer - actual TOC is rendered in page.tsx with sticky positioning */}
            <div className="hidden w-48 shrink-0 xl:block" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

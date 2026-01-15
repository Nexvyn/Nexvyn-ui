import { docsConfig } from "@/app/config/docs"
import { Footer } from "../(app)/Home/footer"
import { DocsNavbar } from "@/components/docs/docs-navbar"
import { DocsLayoutClient } from "./docs-layout-client"

// function CornerDecorations() {
//   return (
//     <>
//       <span className="border-primary absolute -left-px -top-px block size-2 rounded-tl-full border-l-2 border-t-2" />
//       <span className="border-primary absolute -right-px -top-px block size-2 rounded-tr-full border-r-2 border-t-2" />
//       <span className="border-primary absolute -bottom-px -left-px block size-2 rounded-bl-full border-b-2 border-l-2" />
//       <span className="border-primary absolute -bottom-px -right-px block size-2 rounded-br-full border-b-2 border-r-2" />
//     </>
//   )
// }
// implement this after release of the library

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col gap-2 p-2 dark:bg-[#181818]">
      {/* Sticky Navbar with shrinking animation - solid background */}
      <div className="sticky top-2 z-50">
        <DocsNavbar />
      </div>

      {/* Main content card with rounded corners and dashed border */}
      <section className="bg-background relative min-h-[calc(100vh-80px)] w-full rounded-3xl border border-dashed">
        {/* <CornerDecorations /> */}
        <DocsLayoutClient items={docsConfig}>
          {children}
        </DocsLayoutClient>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  )
}

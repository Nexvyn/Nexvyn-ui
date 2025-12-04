import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { docsConfig } from "@/app/config/docs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Footer } from "../(home)/components/footer";
import { Navbar } from "../(home)/components/navbar";
import { DocsSidebarNav } from "@/components/sidebar-nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full p-4">
      <Navbar />
      <div className="">
        <div className="items-start lg:grid lg:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="sticky top-0 z-30 hidden h-screen w-full  lg:block py-4  ">
            <div className="backdrop-blur-sm h-full">
              <span className="border-primary absolute -left-px -top-px block size-2 border-l-2 border-t-2 "></span>
              <span className="border-primary absolute -right-px -top-px block size-2 border-r-2 border-t-2 "></span>
              <span className="border-primary absolute -bottom-px -left-px block size-2 border-b-2 border-l-2"></span>
              <span className="border-primary absolute -bottom-px -right-px block size-2 border-b-2 border-r-2"></span>
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
            {children}
          </DocsLayout>
        </div>
      </div>
      <Footer />
    </div>
  );
}

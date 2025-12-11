import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { docsConfig } from "@/app/config/docs";
import { Footer } from "../(home)/components/footer";
import { Navbar } from "../(home)/components/navbar";
import { CollapsibleSidebar } from "@/components/collapsible-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full p-4">
      <Navbar />
      {/* Main card container with gradient background */}
      <div
        className="relative grain mt-4 py-4 "
        style={{
          backgroundImage: "url()",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-background/60 dark:bg-background/60" />

        <div className="flex items-start">
          {/* Collapsible Sidebar with Ctrl+B toggle */}
          <CollapsibleSidebar items={docsConfig} />

          {/* Main content area */}
          <div className="flex-1 min-w-0">
            <DocsLayout
              tree={source.pageTree}
              nav={{ enabled: false }}
              sidebar={{ enabled: false }}
            >
              {children}
            </DocsLayout>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <Footer />
      </div>
    </div>
  );
}

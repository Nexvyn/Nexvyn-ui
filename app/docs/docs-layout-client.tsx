"use client"

import { useState } from "react"
import { CollapsibleSidebar } from "@/components/docs/collapsible-sidebar"
import { GitHubStarPrompt } from "@/components/docs/github-star-prompt"
import { cn } from "@/lib/utils"
import type { SidebarNavItem } from "@/components/docs/sidebar-nav"

interface DocsLayoutClientProps {
    children: React.ReactNode
    items: SidebarNavItem[]
}

export function DocsLayoutClient({ children, items }: DocsLayoutClientProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    return (
        <div className="flex">
            {/* Left Sidebar - Sticky with independent scroll and scroll masks */}
            <div className="sticky top-[72px] hidden h-[calc(100vh-88px)] shrink-0 self-start lg:block">
                <CollapsibleSidebar
                    items={items}
                    open={isSidebarOpen}
                    onToggle={() => setIsSidebarOpen(prev => !prev)}
                />
            </div>

            {/* Main content area with right TOC */}
            <div className="relative flex  min-w-0 flex-1">
                {/* Page content */}
                <main className={cn("min-w-0 flex-1 transition-all duration-200", !isSidebarOpen && "xl:pl-48")}>
                    <div className="min-h-[calc(100vh-80px)] w-full">
                        <div className="flex justify-center  p-4">
                            <div className="docs-content  w-full max-w-4xl">{children}</div>
                        </div>
                    </div>
                </main>

                {/* Counterbalance Spacer - Matches Sidebar Width */}
                <div
                    className={cn(
                        "hidden shrink-0 lg:block transition-all duration-200 ease-out",
                        isSidebarOpen ? "lg:w-[260px] xl:w-[68px]" : "w-12"
                    )}
                />

                {/* Right TOC spacer - actual TOC is rendered in page.tsx with sticky positioning */}
                <div className="hidden w-48 shrink-0 xl:block" />
            </div>
            <GitHubStarPrompt />
        </div >
    )
}

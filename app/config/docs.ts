import type { SidebarNavItem } from "@/components/sidebar-nav"

export const docsConfig: SidebarNavItem[] = [
    {
        title: "Getting Started",
        items: [
            { title: "Introduction", href: "/docs" },
            { title: "Installation", href: "/docs/getting-started/installation" },
            { title: "Quick Start", href: "/docs/getting-started/quick-start" },
        ],
    },
    {
        title: "Components",
        items: [
            { title: "Button", href: "/docs/components/button" },
            { title: "Card", href: "/docs/components/card" },
            { title: "Input", href: "/docs/components/input" },
        ],
    },
    {
        title: "Resources",
        items: [
            { title: "Sponsors", href: "/docs/sponsors" },
        ],
    },
]

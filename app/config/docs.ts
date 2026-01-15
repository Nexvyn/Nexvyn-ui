import { SidebarNavItem } from "@/components/docs/sidebar-nav"

export const docsConfig: SidebarNavItem[] = [
  {
    title: "Getting Started",
    items: [{ title: "Introduction", href: "/docs", iconName: "book-open" }],
  },
  {
    title: "Components",
    items: [
      { title: "Overview", href: "/docs/components", iconName: "layout-grid" },
      { title: "Button", href: "/docs/components/button", iconName: "square" },
      { title: "Cards", href: "/docs/components/cards", iconName: "layout-grid" },
      { title: "Parallax", href: "/docs/components/parallax", iconName: "layers" },
      { title: "Mouse Follower", href: "/docs/components/mouse-follower", iconName: "mouse" },
      { title: "Morphing Text", href: "/docs/components/morphing-text", iconName: "text" },
      { title: "Spinning Text", href: "/docs/components/spinning-text", iconName: "text" },
    ],
  },
  {
    title: "Utilities",
    items: [{ title: "Utilities", href: "/docs/utilities/utilities", iconName: "wrench" }],
  },
]

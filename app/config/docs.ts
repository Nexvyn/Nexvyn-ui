import { SidebarNavItem } from "@/components/ui/our/docs/sidebar-nav"

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
      { title: "Card", href: "/docs/components/card", iconName: "credit-card" },
      { title: "Cards", href: "/docs/components/cards", iconName: "layout-grid" },
      { title: "Input", href: "/docs/components/input", iconName: "text-cursor-input" },
      { title: "Parallax", href: "/docs/components/parallax", iconName: "layers" },
    ],
  },
  {
    title: "Utilities",
    items: [{ title: "Utilities", href: "/docs/utilities/utilities", iconName: "wrench" }],
  },
]

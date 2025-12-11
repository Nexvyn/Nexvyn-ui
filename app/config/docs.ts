import type { SidebarNavItem } from "@/components/sidebar-nav";

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
      { title: "Card", href: "/docs/components/cards" },
      { title: "Parallax", href: "/docs/components/parallax" },
      { title: "Inertia Cards", href: "/docs/components/inertia" },
    ],
  },
  {
    title: "Resources",
    items: [{ title: "Sponsors", href: "/docs/sponsors" }],
  },
];

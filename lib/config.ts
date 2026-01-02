export const siteConfig = {
  name: "Nexvyn UI",
  url: "https://ui.nexvyn.dev",
  description:
    "A modern, lightweight, and copy-paste React UI library for building stunning documentation and landing pages.",
  links: {
    github: "https://github.com/Nexvyn/nexvyn-ui",
    twitter: "https://twitter.com/nexvyn",
    discord: "https://discord.gg/nexvyn",
  },
  navItems: [
    { title: "Docs", href: "/docs" },
    { title: "Icons", href: "/icons" },
    { title: "Sponsors", href: "/sponsors" },
  ],
} as const

export type SiteConfig = typeof siteConfig

import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ui.nexvyn.com"

  // Static pages
  const staticPages = ["", "/docs", "/icons", "/sponsors", "/logo-preview"]

  // Docs pages - add your doc slugs here
  const docPages = [
    "/docs/introduction",
    "/docs/installation",
    "/docs/components/button",
    "/docs/components/input",
    "/docs/components/card",
    "/docs/utilities",
  ]

  const allPages = [...staticPages, ...docPages]

  return allPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : route.startsWith("/docs") ? 0.8 : 0.6,
  }))
}

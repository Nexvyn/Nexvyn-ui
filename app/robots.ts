import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://ui.nexvyn.com"

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/playground/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', '@number-flow/react'],
  },
  async headers() {
    return [
      {
        source: '/r/:path*.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/:dir(images|assets|thumbnails|videos)/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, stale-while-revalidate=2592000',
          },
        ],
      },
      {
        source:
          '/:icon(favicon.svg|apple-touch-icon.png|icon-192.png|icon-512.png|site.webmanifest)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
      {
        source: '/:all*(svg|png|jpg|jpeg|gif|webp)',
        has: [
          {
            type: 'query',
            key: 'v',
          },
        ],
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:image(opengraph-image.png|twitter-image.png)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=31536000, stale-while-revalidate=604800',
          },
        ],
      },
    ]
  },
}

export default nextConfig

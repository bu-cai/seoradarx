import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.seoradarx.com'
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/zh/', '/en/', '/zh/results/', '/en/results/'],
        disallow: ['/api/'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}

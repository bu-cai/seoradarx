import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://seoauditpro.com'
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/zh/', '/en/'],
        disallow: ['/api/', '/zh/results/', '/en/results/'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}

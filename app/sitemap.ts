import { MetadataRoute } from 'next'
import { getSortedPosts } from '@/lib/blog-posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.seoradarx.com'
  const now = new Date()
  const posts = getSortedPosts()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${base}/zh`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: { languages: { en: `${base}/en`, zh: `${base}/zh` } },
    },
    {
      url: `${base}/en`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: { languages: { en: `${base}/en`, zh: `${base}/zh` } },
    },
    // Blog index pages
    {
      url: `${base}/zh/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: { languages: { en: `${base}/en/blog`, zh: `${base}/zh/blog` } },
    },
    {
      url: `${base}/en/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: { languages: { en: `${base}/en/blog`, zh: `${base}/zh/blog` } },
    },
    // Pricing pages
    {
      url: `${base}/zh/pricing`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: { languages: { en: `${base}/en/pricing`, zh: `${base}/zh/pricing` } },
    },
    {
      url: `${base}/en/pricing`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: { languages: { en: `${base}/en/pricing`, zh: `${base}/zh/pricing` } },
    },
    // White-label landing pages
    {
      url: `${base}/zh/white-label-seo-audit`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: { languages: { en: `${base}/en/white-label-seo-audit`, zh: `${base}/zh/white-label-seo-audit` } },
    },
    {
      url: `${base}/en/white-label-seo-audit`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: { languages: { en: `${base}/en/white-label-seo-audit`, zh: `${base}/zh/white-label-seo-audit` } },
    },
    // Agency landing pages
    {
      url: `${base}/zh/seo-audit-agencies`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: { languages: { en: `${base}/en/seo-audit-agencies`, zh: `${base}/zh/seo-audit-agencies` } },
    },
    {
      url: `${base}/en/seo-audit-agencies`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: { languages: { en: `${base}/en/seo-audit-agencies`, zh: `${base}/zh/seo-audit-agencies` } },
    },
    // Hreflang checker landing pages
    {
      url: `${base}/zh/hreflang-checker`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: { languages: { en: `${base}/en/hreflang-checker`, zh: `${base}/zh/hreflang-checker` } },
    },
    {
      url: `${base}/en/hreflang-checker`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: { languages: { en: `${base}/en/hreflang-checker`, zh: `${base}/zh/hreflang-checker` } },
    },
    {
      url: `${base}/zh/privacy`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${base}/en/privacy`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${base}/zh/terms`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${base}/en/terms`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ]

  // Blog post pages (en + zh per post)
  const blogPages: MetadataRoute.Sitemap = posts.flatMap((post) => [
    {
      url: `${base}/en/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: {
        languages: {
          en: `${base}/en/blog/${post.slug}`,
          zh: `${base}/zh/blog/${post.slug}`,
        },
      },
    },
    {
      url: `${base}/zh/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: {
        languages: {
          en: `${base}/en/blog/${post.slug}`,
          zh: `${base}/zh/blog/${post.slug}`,
        },
      },
    },
  ])

  return [...staticPages, ...blogPages]
}

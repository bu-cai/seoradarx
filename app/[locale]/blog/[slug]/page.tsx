import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, getSortedPosts } from '@/lib/blog-posts'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.seoradarx.com'

const CATEGORY_LABELS = {
  'tool-review': { en: 'Tool Review', zh: '工具评测' },
  'seo-guide': { en: 'SEO Guide', zh: 'SEO指南' },
  'geo-seo': { en: 'GEO / AI SEO', zh: 'GEO / AI SEO' },
} as const

export async function generateStaticParams() {
  const posts = getSortedPosts()
  const locales = ['en', 'zh']
  return locales.flatMap((locale) =>
    posts.map((post) => ({ locale, slug: post.slug }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string }
}): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  const zh = params.locale === 'zh'
  const data = zh ? post.zh : post.en

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    authors: [{ name: 'SEO Radar X Team' }],
    openGraph: {
      type: 'article',
      title: data.title,
      description: data.description,
      url: `${BASE_URL}/${params.locale}/blog/${params.slug}`,
      siteName: 'SEO Radar X',
      publishedTime: post.date,
    },
    alternates: {
      canonical: `${BASE_URL}/${params.locale}/blog/${params.slug}`,
      languages: {
        'zh-CN': `${BASE_URL}/zh/blog/${params.slug}`,
        'en-US': `${BASE_URL}/en/blog/${params.slug}`,
        'x-default': `${BASE_URL}/en/blog/${params.slug}`,
      },
    },
  }
}

// ─── Content helpers ──────────────────────────────────────────────────────────

/**
 * Process raw HTML content before rendering:
 * 1. Make CTA hrefs locale-aware (/en → /locale, /zh → /locale)
 * 2. Add target=_blank + rel to external links
 * 3. Wrap <table> in an overflow-x:auto container for mobile
 */
function processContent(html: string, locale: string): string {
  return (
    html
      // Locale-aware CTA links (hardcoded /en or /zh in content)
      .replace(/href="\/en"/g, `href="/${locale}"`)
      .replace(/href="\/zh"/g, `href="/${locale}"`)
      // External links → open in new tab safely
      .replace(
        /<a\s+(href="https?:\/\/(?!www\.seoradarx\.com)[^"]*")/g,
        '<a target="_blank" rel="noopener noreferrer" $1'
      )
      // Mobile-safe tables
      .replace(/<table/g, '<div class="overflow-x-auto -mx-1 my-4"><table')
      .replace(/<\/table>/g, '</table></div>')
  )
}

/**
 * Extract FAQ Q&A pairs from HTML content.
 * Looks for H3 tags that follow a "Frequently Asked Questions" / "常见问题" H2.
 */
function extractFAQs(html: string): { q: string; a: string }[] {
  // Detect if there's an FAQ section
  if (
    !html.includes('Frequently Asked Questions') &&
    !html.includes('常见问题')
  ) {
    return []
  }

  const faqs: { q: string; a: string }[] = []

  // Split on H2 to isolate the FAQ section
  const faqSectionMatch = html.match(
    /<h2>(?:Frequently Asked Questions|常见问题)<\/h2>([\s\S]*?)(?=<h2>|$)/
  )
  if (!faqSectionMatch) return []

  const section = faqSectionMatch[1]

  // Extract each H3 (question) + next P (answer)
  const questionRegex = /<h3>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/g
  let match: RegExpExecArray | null
  while ((match = questionRegex.exec(section)) !== null) {
    const q = match[1].replace(/<[^>]+>/g, '').trim()
    const a = match[2].replace(/<[^>]+>/g, '').trim()
    if (q && a) faqs.push({ q, a })
  }

  return faqs
}

// ─────────────────────────────────────────────────────────────────────────────

export default function BlogPost({
  params,
}: {
  params: { locale: string; slug: string }
}) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const zh = params.locale === 'zh'
  const data = zh ? post.zh : post.en
  const categoryLabel = CATEGORY_LABELS[post.category][zh ? 'zh' : 'en']
  const dateStr = new Date(post.date).toLocaleDateString(
    zh ? 'zh-CN' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )

  // Related posts (exclude current)
  const related = getSortedPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2)

  // Process HTML content
  const processedContent = processContent(data.content, params.locale)

  // Extract FAQ pairs for FAQPage schema
  const faqs = extractFAQs(data.content)

  // ── JSON-LD schemas ───────────────────────────────────────────────────────
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title,
    description: data.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: 'SEO Radar X',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'SEO Radar X',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/favicon.ico`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/${params.locale}/blog/${params.slug}`,
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: zh ? '首页' : 'Home',
        item: `${BASE_URL}/${params.locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: zh ? '博客' : 'Blog',
        item: `${BASE_URL}/${params.locale}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: data.title,
        item: `${BASE_URL}/${params.locale}/blog/${params.slug}`,
      },
    ],
  }

  const faqSchema =
    faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map(({ q, a }) => ({
            '@type': 'Question',
            name: q,
            acceptedAnswer: { '@type': 'Answer', text: a },
          })),
        }
      : null

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary, #080e1a)' }}>

      {/* ── JSON-LD schemas ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* ── Nav ── */}
      <nav
        className="border-b border-[#1e3a5f]/40 px-6 py-4 flex items-center justify-between sticky top-0 z-10"
        style={{ background: 'rgba(8,14,26,0.95)', backdropFilter: 'blur(8px)' }}
      >
        <Link href={`/${params.locale}`} className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            S
          </div>
          <span className="font-bold text-[#e2e8f0]">SEO Radar X</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href={`/${params.locale}/blog`}
            className="text-sm text-[#64748b] hover:text-[#94a3b8] transition-colors"
          >
            {zh ? '← 博客' : '← Blog'}
          </Link>
          <Link
            href={zh ? `/en/blog/${params.slug}` : `/zh/blog/${params.slug}`}
            className="text-sm text-[#64748b] hover:text-[#94a3b8] transition-colors"
          >
            {zh ? 'English' : '中文'}
          </Link>
        </div>
      </nav>

      {/* ── Article ── */}
      <article className="max-w-2xl mx-auto px-6 pt-12 pb-16">

        {/* Breadcrumb (visual) */}
        <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-xs text-[#4a5568] mb-6">
          <Link href={`/${params.locale}`} className="hover:text-[#64748b] transition-colors">
            {zh ? '首页' : 'Home'}
          </Link>
          <span>/</span>
          <Link href={`/${params.locale}/blog`} className="hover:text-[#64748b] transition-colors">
            {zh ? '博客' : 'Blog'}
          </Link>
          <span>/</span>
          <span className="text-[#64748b] truncate max-w-[200px]">{categoryLabel}</span>
        </nav>

        {/* Meta chips */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-950/60 text-blue-400 border border-blue-800/40">
            {categoryLabel}
          </span>
          <span className="text-xs text-[#4a5568]">{dateStr}</span>
          <span className="text-xs text-[#4a5568]">·</span>
          <span className="text-xs text-[#4a5568]">
            {zh ? `${post.readTime} 分钟阅读` : `${post.readTime} min read`}
          </span>
          <span className="text-xs text-[#4a5568]">·</span>
          <span className="text-xs text-[#4a5568]">SEO Radar X Team</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-black text-[#e2e8f0] leading-tight mb-5">
          {data.title}
        </h1>

        {/* Lead */}
        <p className="text-base text-[#94a3b8] leading-relaxed mb-8 border-l-4 border-blue-600/50 pl-4">
          {data.description}
        </p>

        <div className="border-t border-[#1e3a5f]/40 mb-8" />

        {/* Article body */}
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: processedContent }}
        />

        <div className="border-t border-[#1e3a5f]/40 mt-12 mb-8" />

        {/* Free Audit CTA */}
        <div className="rounded-2xl border border-blue-700/40 bg-blue-950/20 p-7 text-center">
          <div className="text-3xl mb-3">🔍</div>
          <h3 className="text-lg font-bold text-[#e2e8f0] mb-2">
            {zh ? '免费检测你的独立站SEO' : 'Audit Your Store for Free'}
          </h3>
          <p className="text-sm text-[#64748b] mb-5 max-w-sm mx-auto">
            {zh
              ? '30秒完成，覆盖30项GEO+SEO指标，包含hreflang、Schema、Core Web Vitals。无需注册。'
              : '30 seconds. 30 checks covering hreflang, Schema, GEO tags, Core Web Vitals & more. No sign-up.'}
          </p>
          <Link
            href={`/${params.locale}`}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-7 py-3 font-bold text-sm transition-all shadow-lg shadow-blue-900/30"
          >
            {zh ? '立即免费检测 →' : 'Run Free Audit →'}
          </Link>
        </div>
      </article>

      {/* ── Related posts ── */}
      {related.length > 0 && (
        <div className="max-w-2xl mx-auto px-6 pb-16">
          <h2 className="text-sm font-bold text-[#64748b] uppercase tracking-wider mb-5">
            {zh ? '相关文章' : 'Related Articles'}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {related.map((rp) => {
              const rd = zh ? rp.zh : rp.en
              return (
                <Link
                  key={rp.slug}
                  href={`/${params.locale}/blog/${rp.slug}`}
                  className="group rounded-xl border border-[#1e3a5f]/50 hover:border-blue-600/50 bg-[#0c1322] hover:bg-[#0f1729] transition-all p-5"
                >
                  <span className="text-xs text-blue-400 font-semibold">
                    {CATEGORY_LABELS[rp.category][zh ? 'zh' : 'en']}
                  </span>
                  <h3 className="text-sm font-bold text-[#e2e8f0] mt-1.5 leading-snug group-hover:text-white transition-colors line-clamp-2">
                    {rd.title}
                  </h3>
                  <p className="text-xs text-blue-400 mt-3 font-semibold">
                    {zh ? '阅读 →' : 'Read →'}
                  </p>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

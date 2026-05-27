import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, getSortedPosts } from '@/lib/blog-posts'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.seoradarx.com'

const CATEGORY_LABELS = {
  'tool-review': { en: 'Tool Review', zh: '工具评测' },
  'seo-guide':   { en: 'SEO Guide',   zh: 'SEO指南'  },
  'geo-seo':     { en: 'GEO / AI SEO', zh: 'GEO / AI SEO' },
} as const

// ─── Static params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const posts = getSortedPosts()
  return ['en', 'zh'].flatMap((locale) =>
    posts.map((post) => ({ locale, slug: post.slug }))
  )
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

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
        'zh-CN':    `${BASE_URL}/zh/blog/${params.slug}`,
        'en-US':    `${BASE_URL}/en/blog/${params.slug}`,
        'x-default': `${BASE_URL}/en/blog/${params.slug}`,
      },
    },
  }
}

// ─── Content helpers ──────────────────────────────────────────────────────────

/** Make CTA links locale-aware, fix external links, wrap tables */
function processContent(html: string, locale: string): string {
  return html
    .replace(/href="\/en"/g, `href="/${locale}"`)
    .replace(/href="\/zh"/g, `href="/${locale}"`)
    .replace(
      /<a\s+(href="https?:\/\/(?!www\.seoradarx\.com)[^"]*")/g,
      '<a target="_blank" rel="noopener noreferrer" $1'
    )
    .replace(/<table/g, '<div class="overflow-x-auto -mx-1 my-4"><table')
    .replace(/<\/table>/g, '</table></div>')
    // Add id anchors to H2 headings for TOC links
    .replace(/<h2>([\s\S]*?)<\/h2>/g, (_match, text: string) => {
      const id = text
        .replace(/<[^>]+>/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9一-龥]+/g, '-')
        .replace(/^-|-$/g, '')
      return `<h2 id="${id}">${text}</h2>`
    })
}

/** Extract {id, text} pairs from H2 headings for the TOC */
function extractTOC(html: string): { id: string; text: string }[] {
  const toc: { id: string; text: string }[] = []
  const re = /<h2>([\s\S]*?)<\/h2>/g
  let m: RegExpExecArray | null
  while ((m = re.exec(html)) !== null) {
    const text = m[1].replace(/<[^>]+>/g, '').trim()
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9一-龥]+/g, '-')
      .replace(/^-|-$/g, '')
    if (text) toc.push({ id, text })
  }
  return toc
}

/** Extract FAQ Q&A pairs that follow an FAQ H2 heading */
function extractFAQs(html: string): { q: string; a: string }[] {
  if (!html.includes('Frequently Asked Questions') && !html.includes('常见问题')) return []
  const sectionMatch = html.match(
    /<h2>(?:Frequently Asked Questions|常见问题)<\/h2>([\s\S]*?)(?=<h2>|$)/
  )
  if (!sectionMatch) return []
  const faqs: { q: string; a: string }[] = []
  const re = /<h3>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/g
  let m: RegExpExecArray | null
  while ((m = re.exec(sectionMatch[1])) !== null) {
    const q = m[1].replace(/<[^>]+>/g, '').trim()
    const a = m[2].replace(/<[^>]+>/g, '').trim()
    if (q && a) faqs.push({ q, a })
  }
  return faqs
}

// ─── Page ─────────────────────────────────────────────────────────────────────

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

  // Related: same category first, then fill with other posts (max 3)
  const allOthers = getSortedPosts().filter((p) => p.slug !== post.slug)
  const sameCategory = allOthers.filter((p) => p.category === post.category)
  const otherCategory = allOthers.filter((p) => p.category !== post.category)
  const related = [...sameCategory, ...otherCategory].slice(0, 3)
  const processedContent = processContent(data.content, params.locale)
  const toc = extractTOC(data.content)
  const faqs = extractFAQs(data.content)

  // Share URLs
  const postUrl = `${BASE_URL}/${params.locale}/blog/${params.slug}`
  const twitterShare = `https://twitter.com/intent/tweet?text=${encodeURIComponent(data.title)}&url=${encodeURIComponent(postUrl)}`
  const linkedinShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`

  // ── JSON-LD ──────────────────────────────────────────────────────────────

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
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/favicon.ico` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: zh ? '首页' : 'Home', item: `${BASE_URL}/${params.locale}` },
      { '@type': 'ListItem', position: 2, name: zh ? '博客' : 'Blog', item: `${BASE_URL}/${params.locale}/blog` },
      { '@type': 'ListItem', position: 3, name: data.title, item: postUrl },
    ],
  }

  const faqSchema = faqs.length > 0
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

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      {/* ── Nav ── */}
      <nav
        className="border-b border-[#1e3a5f]/40 px-6 py-4 flex items-center justify-between sticky top-0 z-10"
        style={{ background: 'rgba(8,14,26,0.95)', backdropFilter: 'blur(8px)' }}
      >
        <Link href={`/${params.locale}`} className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">S</div>
          <span className="font-bold text-[#e2e8f0]">SEO Radar X</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href={`/${params.locale}/pricing`} className="hidden sm:inline text-sm text-[#64748b] hover:text-[#94a3b8] transition-colors">
            {zh ? '价格' : 'Pricing'}
          </Link>
          <Link href={`/${params.locale}/blog`} className="text-sm text-[#64748b] hover:text-[#94a3b8] transition-colors">
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

      {/* ── Layout: article + TOC sidebar ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-4 flex gap-10 items-start">

        {/* ── Article ── */}
        <article className="min-w-0 flex-1 max-w-2xl mx-auto lg:mx-0">

          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-xs text-[#4a5568] mb-6">
            <Link href={`/${params.locale}`} className="hover:text-[#64748b] transition-colors">{zh ? '首页' : 'Home'}</Link>
            <span>/</span>
            <Link href={`/${params.locale}/blog`} className="hover:text-[#64748b] transition-colors">{zh ? '博客' : 'Blog'}</Link>
            <span>/</span>
            <span className="text-[#64748b] truncate max-w-[180px]">{categoryLabel}</span>
          </nav>

          {/* Meta chips */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-950/60 text-blue-400 border border-blue-800/40">
              {categoryLabel}
            </span>
            <span className="text-xs text-[#4a5568]">{dateStr}</span>
            <span className="text-xs text-[#4a5568]">·</span>
            <span className="text-xs text-[#4a5568]">{zh ? `${post.readTime} 分钟阅读` : `${post.readTime} min read`}</span>
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

          {/* Mobile TOC (visible only on mobile) */}
          {toc.length > 2 && (
            <details className="lg:hidden mb-8 bg-[#0c1322] border border-[#1e3a5f]/50 rounded-xl overflow-hidden">
              <summary className="px-5 py-3.5 text-sm font-semibold text-[#94a3b8] cursor-pointer select-none list-none flex items-center justify-between hover:bg-[#0f1729] transition-colors">
                <span>📋 {zh ? '目录' : 'Table of Contents'}</span>
                <span className="text-[#4a5568] text-lg">▾</span>
              </summary>
              <nav className="px-5 pb-4 pt-1 space-y-1.5">
                {toc.map(({ id, text }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="block text-sm text-[#64748b] hover:text-blue-400 transition-colors py-0.5"
                  >
                    {text}
                  </a>
                ))}
              </nav>
            </details>
          )}

          <div className="border-t border-[#1e3a5f]/40 mb-8" />

          {/* Article body */}
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: processedContent }} />

          <div className="border-t border-[#1e3a5f]/40 mt-12 mb-8" />

          {/* ── Social Share ── */}
          <div className="flex items-center gap-3 mb-10">
            <span className="text-xs text-[#4a5568] font-medium">
              {zh ? '分享这篇文章：' : 'Share this article:'}
            </span>
            <a
              href={twitterShare}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold text-[#94a3b8] hover:text-white bg-[#0c1322] hover:bg-[#162035] border border-[#1e3a5f] rounded-lg px-3 py-2 transition-all"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
              </svg>
              Twitter / X
            </a>
            <a
              href={linkedinShare}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold text-[#94a3b8] hover:text-white bg-[#0c1322] hover:bg-[#162035] border border-[#1e3a5f] rounded-lg px-3 py-2 transition-all"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          </div>

          {/* ── Author Bio ── */}
          <div className="rounded-2xl border border-[#1e3a5f]/60 bg-[#0c1322] p-6 mb-10 flex gap-4 items-start">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-lg flex-shrink-0">
              S
            </div>
            <div>
              <div className="text-sm font-bold text-[#e2e8f0] mb-1">SEO Radar X Team</div>
              <div className="text-xs text-blue-400 mb-2">
                {zh ? 'GEO + SEO 专家团队 · 跨境电商增长顾问' : 'GEO + SEO Specialists · Cross-Border E-Commerce Growth'}
              </div>
              <p className="text-xs text-[#64748b] leading-relaxed">
                {zh
                  ? '我们的团队专注于帮助Shopify和WordPress跨境独立站卖家提升在Google和AI搜索引擎（Perplexity、ChatGPT、Copilot）中的可见性。已分析数千个独立站的GEO和SEO问题。'
                  : 'Our team specializes in helping Shopify and WordPress cross-border stores improve visibility in Google and AI search engines (Perplexity, ChatGPT, Copilot). We\'ve analyzed thousands of stores for GEO and SEO issues.'}
              </p>
            </div>
          </div>

          {/* ── Free Audit CTA ── */}
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

        {/* ── Desktop TOC Sidebar ── */}
        {toc.length > 2 && (
          <aside className="hidden lg:block w-56 xl:w-64 flex-shrink-0 sticky top-20 self-start">
            <div className="bg-[#0c1322] border border-[#1e3a5f]/50 rounded-xl p-5">
              <p className="text-xs font-bold text-[#64748b] uppercase tracking-wider mb-3">
                {zh ? '目录' : 'Contents'}
              </p>
              <nav className="space-y-1.5">
                {toc.map(({ id, text }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="block text-xs text-[#64748b] hover:text-blue-400 transition-colors py-0.5 leading-snug"
                  >
                    {text}
                  </a>
                ))}
              </nav>
              <div className="mt-5 pt-4 border-t border-[#1e3a5f]/40">
                <Link
                  href={`/${params.locale}`}
                  className="block text-center text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg px-3 py-2.5 transition-all"
                >
                  {zh ? '免费检测 →' : 'Free Audit →'}
                </Link>
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* ── Related posts ── */}
      {related.length > 0 && (
        <div className="max-w-4xl mx-auto px-6 pb-8">
          <h2 className="text-sm font-bold text-[#64748b] uppercase tracking-wider mb-5">
            {zh ? '相关文章' : 'Related Articles'}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                  <p className="text-xs text-blue-400 mt-3 font-semibold">{zh ? '阅读 →' : 'Read →'}</p>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* ── Related Tools & Landing Pages ── */}
      <div className="max-w-4xl mx-auto px-6 pb-16">
        <h2 className="text-sm font-bold text-[#64748b] uppercase tracking-wider mb-5">
          {zh ? '相关工具与功能' : 'Related Tools & Features'}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {(zh ? [
            { href: `/${params.locale}/rank-tracker`, icon: '📈', title: '关键词排名追踪', desc: '免费追踪SEO历史得分变化' },
            { href: `/${params.locale}/white-label-seo-audit`, icon: '🏷️', title: '白标SEO审计', desc: '代理机构专用品牌化报告' },
            { href: `/${params.locale}/seo-audit-agencies`, icon: '🏢', title: '代理机构SEO工具', desc: '帮助客户发现并修复问题' },
            { href: `/${params.locale}/hreflang-checker`, icon: '🌐', title: 'Hreflang检测', desc: '验证多语言国际SEO配置' },
          ] : [
            { href: `/${params.locale}/rank-tracker`, icon: '📈', title: 'Rank Tracker', desc: 'Free SEO score history tracking' },
            { href: `/${params.locale}/white-label-seo-audit`, icon: '🏷️', title: 'White Label Audits', desc: 'Branded reports for agencies' },
            { href: `/${params.locale}/seo-audit-agencies`, icon: '🏢', title: 'Agency SEO Tool', desc: 'Help clients find & fix issues' },
            { href: `/${params.locale}/hreflang-checker`, icon: '🌐', title: 'Hreflang Checker', desc: 'Validate multilingual SEO setup' },
          ]).map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group rounded-xl border border-[#1e3a5f]/50 hover:border-blue-600/40 bg-[#0c1322] hover:bg-[#0f1729] transition-all p-4"
            >
              <div className="text-xl mb-2">{tool.icon}</div>
              <div className="text-xs font-bold text-[#e2e8f0] group-hover:text-white mb-1 transition-colors">{tool.title}</div>
              <div className="text-[11px] text-[#4a5568] leading-snug">{tool.desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.seoradarx.com'

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const zh = params.locale === 'zh'
  return {
    title: zh
      ? 'Hreflang 检测工具 – 免费检查国际SEO标签 | SEO Radar X'
      : 'Hreflang Checker – Free Tool to Audit International SEO Tags | SEO Radar X',
    description: zh
      ? '免费检测你网站的 hreflang 标签是否正确。自动发现缺失的 x-default、错误的语言代码和不对称的标签对，帮助你修复国际SEO问题。'
      : 'Free hreflang checker that detects missing x-default, wrong locale codes, asymmetric tag pairs & more. Run a full international SEO audit in 30 seconds.',
    keywords: zh
      ? ['hreflang检测', 'hreflang工具', '国际SEO检查', 'hreflang验证', 'x-default检测', '多语言SEO']
      : ['hreflang checker', 'hreflang validator', 'hreflang tool', 'international SEO checker', 'x-default checker', 'multilingual SEO audit'],
    alternates: {
      canonical: `${BASE_URL}/${params.locale}/hreflang-checker`,
      languages: {
        'zh-CN':    `${BASE_URL}/zh/hreflang-checker`,
        'en-US':    `${BASE_URL}/en/hreflang-checker`,
        'x-default': `${BASE_URL}/en/hreflang-checker`,
      },
    },
    openGraph: {
      title: zh
        ? 'Hreflang 检测工具 – 免费检查国际SEO标签'
        : 'Hreflang Checker – Free International SEO Audit',
      description: zh
        ? '免费检测 hreflang 标签，发现国际SEO问题，30秒出结果。'
        : 'Detect hreflang issues, missing x-default, wrong locale codes. Results in 30 seconds.',
      url: `${BASE_URL}/${params.locale}/hreflang-checker`,
      siteName: 'SEO Radar X',
      type: 'website',
    },
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HreflangCheckerPage({
  params,
}: {
  params: { locale: string }
}) {
  const zh = params.locale === 'zh'

  // ── FAQ data ──────────────────────────────────────────────────────────────
  const faqs = zh
    ? [
        {
          q: '什么是 hreflang 标签？',
          a: 'Hreflang 是一种 HTML 属性，用于告诉 Google 某个页面针对哪种语言/地区。它帮助搜索引擎向正确的用户展示正确的语言版本，避免出现重复内容问题。',
        },
        {
          q: '为什么 hreflang 对独立站很重要？',
          a: '如果你的 Shopify 或 WordPress 独立站服务多个语言市场（如中英文），hreflang 设置错误会导致 Google 向英语用户展示中文页面，或反之。这会严重损害转化率和 SEO 排名。',
        },
        {
          q: '什么是 x-default hreflang？',
          a: 'x-default 是一个特殊的 hreflang 值，用于指定当用户的语言/地区与任何现有的 hreflang 值都不匹配时，应该展示哪个页面版本。例如：<link rel="alternate" hreflang="x-default" href="https://example.com/en/" />',
        },
        {
          q: '常见的 hreflang 错误有哪些？',
          a: '最常见的错误包括：缺少 x-default 标签、语言代码格式错误（如用 "cn" 而不是 "zh-CN"）、标签不对称（A 指向 B 但 B 没有指回 A）、指向不存在或重定向的 URL。',
        },
        {
          q: '如何修复 hreflang 错误？',
          a: '使用 SEO Radar X 免费检测工具，30秒内找到所有 hreflang 问题并获得修复建议。对于 Shopify，可以在 theme.liquid 中添加正确的 hreflang 标签；对于 WordPress，可以使用 Yoast SEO 或 Polylang 等插件。',
        },
      ]
    : [
        {
          q: 'What is an hreflang tag?',
          a: 'Hreflang is an HTML attribute that tells Google which language and region a page targets. It helps search engines serve the correct language version to the right users and prevents duplicate content issues across international versions.',
        },
        {
          q: 'Why does hreflang matter for international stores?',
          a: 'If your Shopify or WordPress store targets multiple language markets (e.g., English and Chinese), incorrect hreflang setup causes Google to show the wrong language to users — destroying conversion rates and SEO rankings.',
        },
        {
          q: 'What is x-default in hreflang?',
          a: 'x-default is a special hreflang value that specifies which page version to show when no other hreflang value matches the user\'s language/region. Example: <link rel="alternate" hreflang="x-default" href="https://example.com/en/" />',
        },
        {
          q: 'What are the most common hreflang errors?',
          a: 'The most common mistakes include: missing x-default tag, wrong locale code format (e.g., "cn" instead of "zh-CN"), asymmetric tag pairs (page A points to B but B doesn\'t point back to A), and pointing to non-existent or redirected URLs.',
        },
        {
          q: 'How do I fix hreflang errors?',
          a: 'Use the SEO Radar X free audit tool to detect all hreflang issues in 30 seconds. For Shopify, add hreflang tags in theme.liquid. For WordPress, use plugins like Yoast SEO or Polylang that handle hreflang automatically.',
        },
      ]

  // ── JSON-LD schemas ───────────────────────────────────────────────────────
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: zh ? '首页' : 'Home', item: `${BASE_URL}/${params.locale}` },
      { '@type': 'ListItem', position: 2, name: zh ? 'Hreflang 检测' : 'Hreflang Checker', item: `${BASE_URL}/${params.locale}/hreflang-checker` },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: zh ? 'SEO Radar X Hreflang 检测工具' : 'SEO Radar X Hreflang Checker',
    applicationCategory: 'WebApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: zh
      ? '免费检测 hreflang 标签错误，帮助独立站修复国际SEO问题。'
      : 'Free hreflang checker that detects missing x-default, wrong locale codes, and asymmetric tag pairs.',
    url: `${BASE_URL}/${params.locale}/hreflang-checker`,
  }

  // ── Common errors list ────────────────────────────────────────────────────
  const errorChecks = zh
    ? [
        { icon: '❌', title: '缺少 x-default 标签', desc: '没有为匹配不到语言的用户指定默认页面版本，Google 不知道该展示哪个页面。' },
        { icon: '⚠️', title: '语言代码格式错误', desc: '使用了 "cn" 或 "zh" 而不是标准的 "zh-CN"，导致 Google 忽略该标签。' },
        { icon: '🔄', title: '标签不对称', desc: '页面 A 指向页面 B，但页面 B 没有指回页面 A，造成 hreflang 失效。' },
        { icon: '🔗', title: '指向失效 URL', desc: 'Hreflang 标签指向 404 页面或重定向 URL，Google 会忽略这些无效标签。' },
        { icon: '📄', title: '自引用缺失', desc: '每个页面必须包含指向自己的 hreflang 标签，否则整个 hreflang 组无效。' },
        { icon: '🌐', title: 'URL 不一致', desc: '混用 http/https 或 www/non-www，造成 Google 将其视为不同页面。' },
      ]
    : [
        { icon: '❌', title: 'Missing x-default tag', desc: 'No fallback page specified for users whose language matches nothing — Google doesn\'t know which version to show.' },
        { icon: '⚠️', title: 'Wrong locale code format', desc: 'Using "cn" or "zh" instead of the correct "zh-CN" causes Google to ignore the tag entirely.' },
        { icon: '🔄', title: 'Asymmetric tag pairs', desc: 'Page A links to page B, but page B doesn\'t link back to page A — the entire hreflang group becomes invalid.' },
        { icon: '🔗', title: 'Pointing to broken URLs', desc: 'Hreflang tags pointing to 404s or redirected URLs are ignored by Google, breaking your international targeting.' },
        { icon: '📄', title: 'Missing self-referential tag', desc: 'Every page must include an hreflang tag pointing to itself — missing this invalidates the whole hreflang group.' },
        { icon: '🌐', title: 'Inconsistent URL formats', desc: 'Mixing http/https or www/non-www makes Google treat them as different pages, splitting your ranking signals.' },
      ]

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary, #080e1a)' }}>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />

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
          <Link href={`/${params.locale}/blog`} className="hidden sm:inline text-sm text-[#64748b] hover:text-[#94a3b8] transition-colors">
            {zh ? '博客' : 'Blog'}
          </Link>
          <Link
            href={zh ? `/en/hreflang-checker` : `/zh/hreflang-checker`}
            className="text-sm text-[#64748b] hover:text-[#94a3b8] transition-colors"
          >
            {zh ? 'English' : '中文'}
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* ── Breadcrumb ── */}
        <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-xs text-[#4a5568] mt-8 mb-6">
          <Link href={`/${params.locale}`} className="hover:text-[#64748b] transition-colors">{zh ? '首页' : 'Home'}</Link>
          <span>/</span>
          <span className="text-[#64748b]">{zh ? 'Hreflang 检测工具' : 'Hreflang Checker'}</span>
        </nav>

        {/* ── Hero ── */}
        <section className="text-center pt-4 pb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-950/60 text-blue-400 border border-blue-800/40 mb-6">
            🌐 {zh ? '国际SEO工具' : 'International SEO Tool'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#e2e8f0] leading-tight mb-4">
            {zh ? 'Hreflang 检测工具' : 'Hreflang Checker'}
            <br />
            <span className="text-blue-400">{zh ? '免费 · 30秒 · 即时结果' : 'Free · 30 Seconds · Instant Results'}</span>
          </h1>
          <p className="text-base text-[#94a3b8] max-w-xl mx-auto mb-8 leading-relaxed">
            {zh
              ? '自动检测你网站的 hreflang 标签错误。发现缺失的 x-default、错误的语言代码、不对称标签对等 6 类国际SEO问题，获得修复建议。'
              : 'Automatically audit your hreflang implementation. Detect missing x-default tags, wrong locale codes, asymmetric pairs, and 6 other critical international SEO issues.'}
          </p>
          <Link
            href={`/${params.locale}`}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-8 py-4 font-bold text-base transition-all shadow-lg shadow-blue-900/40"
          >
            {zh ? '🔍 免费检测我的网站 →' : '🔍 Check My Site for Free →'}
          </Link>
          <p className="text-xs text-[#4a5568] mt-3">
            {zh ? '无需注册 · 支持 Shopify / WordPress / 任意网站' : 'No sign-up · Works with Shopify, WordPress & any site'}
          </p>
        </section>

        {/* ── What we check ── */}
        <section className="mb-14">
          <h2 className="text-xl font-black text-[#e2e8f0] mb-2">
            {zh ? '我们检测哪些 Hreflang 问题？' : 'What Hreflang Issues Do We Check?'}
          </h2>
          <p className="text-sm text-[#64748b] mb-7">
            {zh
              ? 'SEO Radar X 免费工具扫描你网站的 hreflang 实现，检测以下 6 类常见错误：'
              : 'The SEO Radar X free tool scans your hreflang implementation and checks for these 6 critical error types:'}
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {errorChecks.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="rounded-xl border border-[#1e3a5f]/50 bg-[#0c1322] p-5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{icon}</span>
                  <span className="text-sm font-bold text-[#e2e8f0]">{title}</span>
                </div>
                <p className="text-xs text-[#64748b] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── How hreflang works ── */}
        <section className="mb-14">
          <h2 className="text-xl font-black text-[#e2e8f0] mb-4">
            {zh ? 'Hreflang 标签是如何工作的？' : 'How Do Hreflang Tags Work?'}
          </h2>
          <div className="prose-dark">
            <p className="text-sm text-[#94a3b8] leading-relaxed mb-4">
              {zh
                ? 'Hreflang 标签是放在 HTML <head> 中的 <link> 元素，用于告诉 Google 同一页面的不同语言/地区版本之间的关系。每个 hreflang 标签包含两个关键属性：'
                : 'Hreflang tags are <link> elements placed in the HTML <head> that tell Google the relationship between different language/region versions of the same page. Each hreflang tag contains two key attributes:'}
            </p>
            <div className="bg-[#0c1322] border border-[#1e3a5f]/60 rounded-xl p-5 mb-5 font-mono text-xs text-[#94a3b8] overflow-x-auto">
              <div className="text-[#4a5568] mb-2">{zh ? '<!-- 英文版页面的 hreflang 标签示例 -->' : '<!-- hreflang tags on your English page -->'}</div>
              <div className="text-green-400">&lt;link rel=&quot;alternate&quot; hreflang=&quot;en-US&quot; href=&quot;https://example.com/en/&quot; /&gt;</div>
              <div className="text-green-400">&lt;link rel=&quot;alternate&quot; hreflang=&quot;zh-CN&quot; href=&quot;https://example.com/zh/&quot; /&gt;</div>
              <div className="text-blue-400">&lt;link rel=&quot;alternate&quot; hreflang=&quot;x-default&quot; href=&quot;https://example.com/en/&quot; /&gt;</div>
            </div>
            <p className="text-sm text-[#94a3b8] leading-relaxed">
              {zh
                ? '关键规则：标签必须是"对称的"——每个被引用的页面也必须回指你的页面。这意味着如果你的英文页面指向中文页面，中文页面也必须包含指向英文页面的 hreflang 标签。'
                : 'The critical rule: hreflang tags must be reciprocal — every referenced page must also point back to your page. This means if your English page references your Chinese page, the Chinese page must also contain hreflang tags pointing back to the English page.'}
            </p>
          </div>
        </section>

        {/* ── Shopify / WordPress specifics ── */}
        <section className="mb-14">
          <h2 className="text-xl font-black text-[#e2e8f0] mb-6">
            {zh ? 'Shopify 和 WordPress 的 Hreflang 实施指南' : 'Hreflang for Shopify & WordPress Stores'}
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="rounded-xl border border-[#1e3a5f]/50 bg-[#0c1322] p-6">
              <div className="text-2xl mb-3">🛍️</div>
              <h3 className="text-sm font-bold text-[#e2e8f0] mb-2">Shopify</h3>
              <ul className="space-y-2">
                {(zh ? [
                  '在 theme.liquid 的 <head> 中添加 hreflang 标签',
                  '使用 Shopify Markets 功能时，平台会自动生成部分标签',
                  '仍需手动检查 x-default 是否正确配置',
                  '注意：Shopify 的语言路径通常是 /zh-CN/ 而非 /zh/',
                ] : [
                  'Add hreflang tags in theme.liquid inside the <head> section',
                  'Shopify Markets auto-generates some hreflang tags',
                  'Still manually check that x-default is correctly set',
                  'Note: Shopify language paths are typically /zh-CN/ not /zh/',
                ]).map((item) => (
                  <li key={item} className="flex gap-2 text-xs text-[#64748b]">
                    <span className="text-blue-400 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-[#1e3a5f]/50 bg-[#0c1322] p-6">
              <div className="text-2xl mb-3">🌐</div>
              <h3 className="text-sm font-bold text-[#e2e8f0] mb-2">WordPress</h3>
              <ul className="space-y-2">
                {(zh ? [
                  '使用 Yoast SEO 或 Rank Math 自动处理 hreflang',
                  'WPML 插件提供完整的多语言 + hreflang 支持',
                  'Polylang 插件是更轻量的多语言方案',
                  '安装插件后仍需检测：插件配置错误很常见',
                ] : [
                  'Use Yoast SEO or Rank Math to auto-handle hreflang',
                  'WPML plugin provides full multilingual + hreflang support',
                  'Polylang is a lighter multilingual alternative',
                  'Still audit after setup — plugin misconfiguration is common',
                ]).map((item) => (
                  <li key={item} className="flex gap-2 text-xs text-[#64748b]">
                    <span className="text-blue-400 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section className="rounded-2xl border border-blue-700/40 bg-blue-950/20 p-8 text-center mb-14">
          <div className="text-4xl mb-4">🔍</div>
          <h2 className="text-xl font-black text-[#e2e8f0] mb-3">
            {zh ? '立即检测你的 Hreflang 设置' : 'Audit Your Hreflang Setup Now'}
          </h2>
          <p className="text-sm text-[#64748b] mb-6 max-w-md mx-auto leading-relaxed">
            {zh
              ? 'SEO Radar X 30项检测中包含完整的 hreflang 分析，覆盖 x-default、语言代码、标签对称性等问题，30秒出报告。'
              : 'SEO Radar X runs 30 checks including full hreflang analysis — x-default, locale codes, reciprocal pairs & more. Results in 30 seconds.'}
          </p>
          <Link
            href={`/${params.locale}`}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-8 py-4 font-bold text-base transition-all shadow-lg shadow-blue-900/30"
          >
            {zh ? '免费检测 →' : 'Run Free Hreflang Audit →'}
          </Link>
          <div className="flex items-center justify-center gap-6 mt-5">
            {(zh ? ['✓ 完全免费', '✓ 无需注册', '✓ 30秒出结果'] : ['✓ Completely free', '✓ No sign-up', '✓ Results in 30s']).map((t) => (
              <span key={t} className="text-xs text-[#4a5568]">{t}</span>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="mb-16">
          <h2 className="text-xl font-black text-[#e2e8f0] mb-7">
            {zh ? '常见问题' : 'Frequently Asked Questions'}
          </h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-[#1e3a5f]/50 bg-[#0c1322] p-5">
                <h3 className="text-sm font-bold text-[#e2e8f0] mb-2">{q}</h3>
                <p className="text-xs text-[#64748b] leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-[#1e3a5f]/30 py-8 text-center">
        <p className="text-xs text-[#4a5568]">
          © 2025 SEO Radar X ·{' '}
          <Link href={`/${params.locale}/privacy`} className="hover:text-[#64748b]">
            {zh ? '隐私政策' : 'Privacy'}
          </Link>{' '}
          ·{' '}
          <Link href={`/${params.locale}/terms`} className="hover:text-[#64748b]">
            {zh ? '服务条款' : 'Terms'}
          </Link>
        </p>
      </footer>
    </div>
  )
}

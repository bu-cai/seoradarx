import type { Metadata } from 'next'
import Link from 'next/link'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.seoradarx.com'

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const zh = params.locale === 'zh'
  return {
    title: zh
      ? '白标SEO审计工具 — 代理机构专用，按需计费 | SEO Radar X'
      : 'White Label SEO Audit Tool for Agencies — $9.99/Report, No Monthly Fee | SEO Radar X',
    description: zh
      ? '专为SEO代理机构打造的白标SEO审计工具。30项检测，30秒出结果，$9.99获取完整双语PDF报告。无月费，无需客户注册，覆盖hreflang、GEO、Core Web Vitals。代理机构每份报告利润达$290+。'
      : 'White label SEO audit tool for agencies. 30 checks in 30 seconds, $9.99 per full PDF report — no monthly subscription, no client logins. Covers hreflang, GEO, Core Web Vitals. Agencies earn $290+ margin per report.',
    keywords: zh
      ? ['白标seo审计', '代理机构seo工具', '白标seo工具', 'seo审计白标', 'seo报告工具代理机构', '可定制seo报告', '白标seo分析工具', '代理机构seo报告']
      : ['white label seo audit tool', 'white label seo tools', 'white label seo reports', 'white label seo report', 'white label seo analysis tool', 'seo audit tool for agencies', 'seo audit tool white label', 'agency seo audit tool'],
    alternates: {
      canonical: `${BASE_URL}/${params.locale}/white-label-seo-audit`,
      languages: {
        'zh-CN':     `${BASE_URL}/zh/white-label-seo-audit`,
        'en-US':     `${BASE_URL}/en/white-label-seo-audit`,
        'x-default': `${BASE_URL}/en/white-label-seo-audit`,
      },
    },
    openGraph: {
      title: zh ? '白标SEO审计工具 — 代理机构专用，按报告计费' : 'White Label SEO Audit Tool for Agencies — Pay Per Report',
      description: zh
        ? '30项检测，双语PDF报告，$9.99/份——专为服务跨境电商客户的SEO代理机构设计。'
        : '30 checks, bilingual PDF, $9.99/report — designed for agencies serving cross-border e-commerce clients.',
      url: `${BASE_URL}/${params.locale}/white-label-seo-audit`,
      siteName: 'SEO Radar X',
      type: 'website',
    },
  }
}

export default function WhiteLabelPage({ params }: { params: { locale: string } }) {
  const zh = params.locale === 'zh'

  // ── 30 checks breakdown ──────────────────────────────────────────────
  const checkCategories = zh ? [
    {
      icon: '⚙️', title: '技术SEO（10项）',
      items: ['Meta标题 & 描述', 'H1/H2层级结构', 'robots.txt验证', 'XML Sitemap', 'HTTPS安全', 'Canonical标签', '404错误检测', '页面速度评分', '结构化数据(Schema)', '移动端适配']
    },
    {
      icon: '🌐', title: 'GEO & 国际SEO（8项）',
      items: ['hreflang标签完整性', 'x-default配置', 'geo.region元标签', '多语言canonical', 'Open Graph语言', 'Content-Language头部', '货币/地区信号', 'AI搜索引用可读性']
    },
    {
      icon: '⚡', title: 'Core Web Vitals（6项）',
      items: ['LCP（最大内容绘制）', 'INP（交互响应时间）', 'CLS（布局偏移）', 'FCP（首次内容绘制）', 'TTFB（首字节时间）', 'JavaScript执行时间']
    },
    {
      icon: '🛍️', title: '平台专项（6项）',
      items: ['Shopify主题SEO配置', 'WP Yoast/RankMath检测', '图片ALT标签', '内链结构', '重复内容检测', '博客/产品页优化信号']
    },
  ] : [
    {
      icon: '⚙️', title: 'Technical SEO (10 checks)',
      items: ['Meta title & description', 'H1/H2 hierarchy', 'robots.txt validation', 'XML Sitemap', 'HTTPS & security', 'Canonical tags', '404 error detection', 'Page speed score', 'Schema structured data', 'Mobile friendliness']
    },
    {
      icon: '🌐', title: 'GEO & International SEO (8 checks)',
      items: ['Hreflang tag completeness', 'x-default configuration', 'geo.region meta tag', 'Multi-language canonical', 'Open Graph language', 'Content-Language header', 'Currency/region signals', 'AI search citation readability']
    },
    {
      icon: '⚡', title: 'Core Web Vitals (6 checks)',
      items: ['LCP (Largest Contentful Paint)', 'INP (Interaction to Next Paint)', 'CLS (Cumulative Layout Shift)', 'FCP (First Contentful Paint)', 'TTFB (Time to First Byte)', 'JavaScript execution time']
    },
    {
      icon: '🛍️', title: 'Platform-Specific (6 checks)',
      items: ['Shopify theme SEO config', 'WP Yoast/RankMath detection', 'Image ALT tags', 'Internal link structure', 'Duplicate content signals', 'Blog/product page optimization']
    },
  ]

  // ── Competitor comparison ─────────────────────────────────────────────
  const competitors = zh ? [
    { name: 'SEO Radar X', price: '$9.99/份报告', monthly: '无月费', hreflang: '✅ 完整', geo: '✅ 是', bilingual: '✅ 中英双语', shopify: '✅ 专项建议', signup: '✅ 无需', highlight: true },
    { name: 'Agency Analytics', price: '$49+/月', monthly: '$149-599/月', hreflang: '⚠️ 基础', geo: '❌ 否', bilingual: '❌ 仅英文', shopify: '⚠️ 部分', signup: '❌ 需要', highlight: false },
    { name: 'SE Ranking', price: '$44+/月', monthly: '$44-272/月', hreflang: '⚠️ 基础', geo: '❌ 否', bilingual: '❌ 仅英文', shopify: '⚠️ 部分', signup: '❌ 需要', highlight: false },
    { name: 'WooRank', price: '$89+/月', monthly: '$89-199/月', hreflang: '⚠️ 部分', geo: '❌ 否', bilingual: '❌ 仅英文', shopify: '❌ 否', signup: '❌ 需要', highlight: false },
    { name: 'Semrush', price: '$119+/月', monthly: '$119-449/月', hreflang: '✅ 是', geo: '❌ 否', bilingual: '❌ 仅英文', shopify: '⚠️ 有限', signup: '❌ 需要', highlight: false },
  ] : [
    { name: 'SEO Radar X', price: '$9.99/report', monthly: 'No monthly fee', hreflang: '✅ Full', geo: '✅ Yes', bilingual: '✅ EN + ZH', shopify: '✅ Specific tips', signup: '✅ None needed', highlight: true },
    { name: 'Agency Analytics', price: '$49+/mo', monthly: '$149–599/mo', hreflang: '⚠️ Basic', geo: '❌ No', bilingual: '❌ English only', shopify: '⚠️ Partial', signup: '❌ Required', highlight: false },
    { name: 'SE Ranking', price: '$44+/mo', monthly: '$44–272/mo', hreflang: '⚠️ Basic', geo: '❌ No', bilingual: '❌ English only', shopify: '⚠️ Partial', signup: '❌ Required', highlight: false },
    { name: 'WooRank', price: '$89+/mo', monthly: '$89–199/mo', hreflang: '⚠️ Partial', geo: '❌ No', bilingual: '❌ English only', shopify: '❌ No', signup: '❌ Required', highlight: false },
    { name: 'Semrush', price: '$119+/mo', monthly: '$119–449/mo', hreflang: '✅ Yes', geo: '❌ No', bilingual: '❌ English only', shopify: '⚠️ Limited', signup: '❌ Required', highlight: false },
  ]

  // ── Use cases ─────────────────────────────────────────────────────────
  const useCases = zh ? [
    {
      persona: '自由SEO顾问',
      icon: '👤',
      problem: '客户问"我的网站SEO怎么样"，你需要一个快速专业的答案',
      solution: '30秒内生成完整评分报告，当场演示。需要深度分析时$9.99购买PDF交付——比任何月订阅都划算。',
      roi: '成本 $9.99 → 顾问费 $150-300',
    },
    {
      persona: 'Shopify / 跨境代理机构',
      icon: '🌐',
      problem: '客户卖全球市场，hreflang配错、geo.region缺失，通用工具检测不出来',
      solution: 'SEO Radar X的国际SEO检测是专门为跨境卖家设计的。hreflang完整性、x-default、geo.region——一次检测全覆盖。',
      roi: '发现$5000+的排名问题，收取$500咨询费',
    },
    {
      persona: '品牌方/电商运营',
      icon: '📊',
      problem: '需要每月向管理层汇报SEO进展，但不想购买昂贵的月订阅工具',
      solution: '每月$9.99生成完整PDF报告，作为月度SEO健康度汇报材料——专业、全面、成本极低。',
      roi: '省去$99-299/月的工具订阅费',
    },
    {
      persona: '内容/增长团队',
      icon: '🚀',
      problem: '新页面上线后需要快速验证SEO配置是否正确',
      solution: '页面发布后立刻运行免费审计，30秒内知道有无技术问题。发现问题立即修复，不等GSC数据（GSC延迟3-7天）。',
      roi: '提前发现问题，避免排名损失',
    },
  ] : [
    {
      persona: 'Freelance SEO Consultant',
      icon: '👤',
      problem: 'Client asks "how\'s my site doing for SEO?" and you need a fast, professional answer',
      solution: 'Generate a full score report in 30 seconds to demo on the spot. When deep analysis is needed, $9.99 for the PDF — cheaper than any subscription.',
      roi: 'Cost $9.99 → consulting fee $150–300',
    },
    {
      persona: 'Cross-Border / Shopify Agency',
      icon: '🌐',
      problem: 'Clients sell globally but hreflang is misconfigured, geo.region is missing — generic tools miss these',
      solution: "SEO Radar X's international SEO checks are built for cross-border stores. Hreflang completeness, x-default, geo.region — covered in one audit.",
      roi: 'Find $5,000+ in ranking issues, charge $500 for the fix',
    },
    {
      persona: 'Brand / E-Commerce Operator',
      icon: '📊',
      problem: 'Need to report SEO progress monthly to leadership but don\'t want expensive subscriptions',
      solution: 'Generate a full PDF report for $9.99/month as your SEO health report — professional, comprehensive, minimal cost.',
      roi: 'Save $99–299/month on tool subscriptions',
    },
    {
      persona: 'Content / Growth Team',
      icon: '🚀',
      problem: 'New pages go live and you need to quickly verify SEO configuration is correct',
      solution: 'Run a free audit immediately after publishing. Know in 30 seconds if there are technical issues — don\'t wait 3–7 days for GSC data.',
      roi: 'Catch issues early, prevent ranking losses',
    },
  ]

  // ── Features ──────────────────────────────────────────────────────────
  const features = zh ? [
    { icon: '📄', title: '专业双语PDF报告', desc: '完整的30项检测结果，格式专业，可直接交付客户。中英双语输出，一份报告服务两个市场。包含评分、问题分类、优先修复清单。' },
    { icon: '🌐', title: 'GEO + 国际SEO（独家）', desc: '专为跨境卖家设计：hreflang完整性验证、geo.region元标签检测、x-default配置——覆盖通用工具忽略的维度。' },
    { icon: '⚡', title: '30秒出结果', desc: '无需等待漫长爬取。30秒内完成30项检测，当场向客户演示，体现专业性。' },
    { icon: '🛍️', title: 'Shopify/WP专项建议', desc: '给出具体修复代码和操作步骤——不是"优化你的元标签"这种废话建议，是实际可执行的代码片段。' },
    { icon: '💰', title: '无月费，按报告计费', desc: '竞品收取$44-599/月订阅费。SEO Radar X只需$9.99/份报告——适合项目制收费的代理机构和顾问。' },
    { icon: '🔒', title: '客户无需注册', desc: '输入URL即可。客户不需要创建账号，减少使用门槛，提升客户体验。' },
  ] : [
    { icon: '📄', title: 'Professional Bilingual PDF Reports', desc: 'Full 30-check results in a deliverable format. English + Chinese output, serving two markets with one report. Includes score breakdown, issue categories, and a priority fix checklist.' },
    { icon: '🌐', title: 'GEO + International SEO (Exclusive)', desc: 'Built for cross-border stores: hreflang completeness, geo.region meta tags, x-default config — dimensions that generic tools ignore entirely.' },
    { icon: '⚡', title: 'Results in 30 Seconds', desc: 'No waiting for lengthy crawls. 30 checks in 30 seconds — demo it live to your client to show immediate value.' },
    { icon: '🛍️', title: 'Shopify & WP-Specific Fix Guidance', desc: 'Actual code snippets and step-by-step instructions — not "optimize your meta tags" platitudes. Real, actionable fixes for real platforms.' },
    { icon: '💰', title: 'No Monthly Fee — Pay Per Report', desc: 'Competitors charge $44–599/month. SEO Radar X is $9.99/report — perfect for project-based agencies and freelance consultants.' },
    { icon: '🔒', title: 'No Client Account Required', desc: 'Enter URL and go. No client registration needed — reduces friction and improves client onboarding experience.' },
  ]

  // ── How it works ──────────────────────────────────────────────────────
  const steps = zh ? [
    { n: '1', title: '输入客户URL', desc: '在首页输入客户的域名，选择目标语言。无需登录，无需绑定信用卡。' },
    { n: '2', title: '30秒获取在线报告', desc: '完整评分报告即时呈现，涵盖5个维度、30项检测。可以直接在客户面前演示，体现专业能力。' },
    { n: '3', title: '购买PDF深度报告（可选）', desc: '$9.99获取完整PDF，包含每项检测的详细说明、修复代码片段和优先修复清单。' },
    { n: '4', title: '交付 & 转化为服务收入', desc: '将PDF直接发送给客户，或以此为基础提供SEO咨询服务。$9.99成本，$300-500顾问费，利润超过97%。' },
  ] : [
    { n: '1', title: 'Enter your client\'s URL', desc: 'Input the domain on our homepage, select the target language. No login, no credit card needed.' },
    { n: '2', title: 'Get the instant report in 30s', desc: 'Full score report across 5 categories and 30 checks — demo it live to clients to show immediate value.' },
    { n: '3', title: 'Purchase the PDF report (optional)', desc: '$9.99 for the full PDF with detailed explanations, fix code snippets, and a priority checklist for every check.' },
    { n: '4', title: 'Deliver & convert to revenue', desc: 'Send the PDF to clients or use it to scope your consulting work. $9.99 cost, $300–500 consulting fee — 97%+ margin.' },
  ]

  // ── FAQs (expanded) ───────────────────────────────────────────────────
  const faqs = zh ? [
    {
      q: '什么是白标SEO审计工具？',
      a: '白标SEO审计工具是指代理机构可以使用并以自己品牌交付结果的SEO检测软件。SEO Radar X提供可下载的专业PDF报告，代理机构可以将其作为自己服务的一部分分享给客户。与需要昂贵月订阅的传统工具不同，SEO Radar X按报告计费（$9.99/份），非常适合项目制收费的代理机构。'
    },
    {
      q: 'SEO Radar X的白标SEO报告包含哪些内容？',
      a: '完整PDF报告包含：（1）总体SEO评分（0-100分）；（2）5个维度的分项评分：技术SEO、Core Web Vitals、内容优化、GEO信号、平台专项；（3）30项检测的详细说明和当前状态；（4）优先修复清单（按影响程度排序）；（5）针对Shopify或WordPress的具体修复代码和操作步骤；（6）中英双语版本。'
    },
    {
      q: '和Agency Analytics、SE Ranking相比有什么优势？',
      a: 'SEO Radar X的核心优势是：（1）无月费——按报告付费，适合项目制代理机构；（2）GEO/国际SEO检测——hreflang、geo.region、x-default是Agency Analytics和SE Ranking覆盖不全的；（3）中英双语报告——为跨境电商市场独家支持；（4）Shopify和WordPress专项建议——给出真正可执行的平台专属代码。缺点是目前不支持批量审计（API开发中）。'
    },
    {
      q: '可以将报告以我自己的品牌发送给客户吗？',
      a: '目前PDF报告显示SEO Radar X品牌。完整白标品牌定制功能（含代理机构Logo、自定义报告封面）正在开发中，将作为代理机构专属套餐推出。如需提前获取，请发邮件至 support@seoradarx.com 加入等待名单。'
    },
    {
      q: '支持批量审计吗？每个月能审计多少个网站？',
      a: '免费版每天可进行10次审计。PDF报告按次购买，没有使用上限——审计多少网站完全取决于你的业务需求。批量审计API（支持一次性提交多个URL）正在开发中。'
    },
    {
      q: '客户需要注册账号或安装任何东西吗？',
      a: '完全不需要。只需输入网站URL即可开始审计，客户无需注册账号、无需安装插件。审计结果即时呈现，适合直接在客户面前演示。'
    },
    {
      q: '检测速度有多快？准确性如何？',
      a: 'SEO Radar X通常在30秒内完成全部30项检测。检测数据来自实时网页抓取和Lighthouse API，覆盖的Core Web Vitals数据与Google PageSpeed Insights保持一致。hreflang和Schema检测经过专门验证，准确率极高。'
    },
    {
      q: '适合哪些类型的代理机构？',
      a: 'SEO Radar X特别适合：（1）服务Shopify/WordPress独立站的跨境电商SEO代理机构；（2）为中英文双语市场提供服务的SEO顾问；（3）需要快速为潜在客户演示SEO问题的销售型代理机构；（4）项目制收费（而非月订阅制）的自由SEO顾问。'
    },
  ] : [
    {
      q: 'What is a white label SEO audit tool?',
      a: 'A white label SEO audit tool is SEO auditing software that agencies can use and deliver under their own brand. SEO Radar X provides professional downloadable PDF reports that agencies share with clients as part of their service delivery. Unlike traditional tools requiring expensive monthly subscriptions, SEO Radar X charges per report ($9.99) — ideal for project-based agencies.'
    },
    {
      q: 'What does an SEO Radar X white label SEO report include?',
      a: 'The full PDF report includes: (1) Overall SEO score (0–100); (2) Sub-scores across 5 categories: Technical SEO, Core Web Vitals, Content, GEO Signals, Platform-Specific; (3) Detailed status for all 30 checks; (4) Priority fix checklist ranked by impact; (5) Platform-specific fix code snippets for Shopify or WordPress; (6) Full bilingual English + Chinese output.'
    },
    {
      q: 'How does SEO Radar X compare to Agency Analytics or SE Ranking?',
      a: "Key advantages: (1) No monthly fee — pay per report, ideal for project-based agencies; (2) GEO/international SEO checks — hreflang, geo.region, x-default that Agency Analytics and SE Ranking don't fully cover; (3) Bilingual EN+ZH reports — exclusive for cross-border e-commerce; (4) Shopify and WordPress-specific fix guidance with actual code. Current limitation: no bulk audit API yet (in development)."
    },
    {
      q: 'Can I send reports under my own agency branding?',
      a: 'Currently PDF reports carry the SEO Radar X brand. Full white label customization (agency logo, custom report cover) is in development as part of an agency-specific plan. To join the early access list, email support@seoradarx.com.'
    },
    {
      q: 'Does it support bulk audits? How many sites can I audit per month?',
      a: 'The free version allows 10 audits per day. PDF reports are purchased per audit with no monthly cap — audit as many sites as your business requires. A bulk audit API (submit multiple URLs at once) is in development.'
    },
    {
      q: 'Do clients need to register or install anything?',
      a: 'Nothing required. Just enter the website URL to start the audit — no client registration, no plugin installation. Results appear instantly, making it perfect to demo live in front of clients.'
    },
    {
      q: 'How fast is it, and how accurate are the results?',
      a: 'SEO Radar X typically completes all 30 checks in under 30 seconds. Data comes from real-time page crawling and the Lighthouse API — Core Web Vitals metrics align with Google PageSpeed Insights. Hreflang and Schema checks are purpose-built and highly accurate.'
    },
    {
      q: 'What types of agencies is SEO Radar X best for?',
      a: 'SEO Radar X is especially well-suited for: (1) Cross-border e-commerce SEO agencies serving Shopify/WordPress stores; (2) SEO consultants serving bilingual EN/ZH markets; (3) Sales-focused agencies that need to quickly demo SEO issues to prospects; (4) Project-based freelance consultants who don\'t want monthly subscriptions.'
    },
  ]

  // ── Schemas ──────────────────────────────────────────────────────────
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: zh ? '首页' : 'Home', item: `${BASE_URL}/${params.locale}` },
      { '@type': 'ListItem', position: 2, name: zh ? '白标SEO审计工具' : 'White Label SEO Audit Tool', item: `${BASE_URL}/${params.locale}/white-label-seo-audit` },
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

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: zh ? 'SEO Radar X 白标SEO审计工具' : 'SEO Radar X White Label SEO Audit Tool',
    description: zh
      ? '专为代理机构和SEO顾问设计的白标SEO审计工具。30项检测涵盖技术SEO、GEO、Core Web Vitals，中英双语PDF报告，$9.99/份，无月费。'
      : 'White label SEO audit tool for agencies and consultants. 30 checks covering technical SEO, GEO, Core Web Vitals. Bilingual EN+ZH PDF reports at $9.99/report, no monthly fee.',
    url: `${BASE_URL}/${params.locale}/white-label-seo-audit`,
    brand: { '@type': 'Brand', name: 'SEO Radar X' },
    offers: [
      { '@type': 'Offer', name: 'Free Audit', price: '0', priceCurrency: 'USD', description: 'Free online audit — no signup' },
      { '@type': 'Offer', name: 'Full PDF Report', price: '9.99', priceCurrency: 'USD', description: 'Full bilingual PDF report per audit' },
    ],
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '127', bestRating: '5' },
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary, #080e1a)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />

      {/* Nav */}
      <nav
        className="border-b border-[#1e3a5f]/40 px-6 py-4 flex items-center justify-between sticky top-0 z-10"
        style={{ background: 'rgba(8,14,26,0.95)', backdropFilter: 'blur(8px)' }}
      >
        <Link href={`/${params.locale}`} className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">S</div>
          <span className="font-bold text-[#e2e8f0]">SEO Radar X</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href={`/${params.locale}/pricing`} className="hidden sm:inline text-sm text-[#64748b] hover:text-[#94a3b8] transition-colors">{zh ? '价格' : 'Pricing'}</Link>
          <Link href={`/${params.locale}/blog`} className="hidden sm:inline text-sm text-[#64748b] hover:text-[#94a3b8] transition-colors">{zh ? '博客' : 'Blog'}</Link>
          <Link href={`/${params.locale}/seo-audit-agencies`} className="hidden sm:inline text-sm text-[#64748b] hover:text-[#94a3b8] transition-colors">{zh ? '代理机构' : 'Agencies'}</Link>
          <Link href={zh ? `/en/white-label-seo-audit` : `/zh/white-label-seo-audit`} className="text-sm text-[#64748b] hover:text-[#94a3b8] transition-colors">
            {zh ? 'English' : '中文'}
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-xs text-[#4a5568] mt-8 mb-6">
          <Link href={`/${params.locale}`} className="hover:text-[#64748b] transition-colors">{zh ? '首页' : 'Home'}</Link>
          <span>/</span>
          <span className="text-[#64748b]">{zh ? '白标SEO审计工具' : 'White Label SEO Audit'}</span>
        </nav>

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section className="text-center pt-4 pb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-purple-950/60 text-purple-400 border border-purple-800/40 mb-6">
            🏢 {zh ? '代理机构 & SEO顾问专用' : 'For SEO Agencies & Consultants'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#e2e8f0] leading-tight mb-4">
            {zh
              ? <>白标SEO审计工具<br /><span className="text-blue-400">按报告计费，无月费</span></>
              : <>White Label SEO Audit Tool<br /><span className="text-blue-400">$9.99/Report — No Monthly Fee</span></>
            }
          </h1>
          <p className="text-base text-[#94a3b8] max-w-2xl mx-auto mb-6 leading-relaxed">
            {zh
              ? '专为服务Shopify和WordPress跨境客户的SEO代理机构设计。30项检测，30秒出结果，中英双语PDF报告。无需月订阅——只为你真正使用的报告付费。'
              : 'Built for SEO agencies and consultants serving Shopify and WordPress cross-border clients. 30 checks in 30 seconds, bilingual PDF reports. No monthly subscription — only pay for reports you actually deliver.'}
          </p>

          {/* Stats bar */}
          <div className="flex flex-wrap justify-center gap-6 text-sm mb-8">
            {(zh
              ? [['30项', '专业检测'], ['30秒', '出结果'], ['$9.99', '完整PDF报告'], ['$0', '免费版无需注册']]
              : [['30', 'Pro Checks'], ['30s', 'Results'], ['$9.99', 'Full PDF Report'], ['$0', 'Free — No Signup']]
            ).map(([val, label]) => (
              <div key={label} className="text-center">
                <div className="text-xl font-black text-blue-400">{val}</div>
                <div className="text-xs text-[#64748b]">{label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
            <Link
              href={`/${params.locale}`}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-7 py-3.5 font-bold text-sm transition-all shadow-lg shadow-blue-900/40"
            >
              {zh ? '🔍 免费试用一次审计 →' : '🔍 Try a Free Audit Now →'}
            </Link>
            <a
              href="mailto:support@seoradarx.com?subject=Agency Plan Inquiry"
              className="inline-flex items-center gap-2 border border-[#1e3a5f] hover:border-blue-600/50 text-[#94a3b8] hover:text-white rounded-xl px-7 py-3.5 font-bold text-sm transition-all"
            >
              {zh ? '✉️ 咨询代理机构方案' : '✉️ Ask About Agency Plan'}
            </a>
          </div>
          <p className="text-xs text-[#4a5568]">
            {zh ? '无需注册 · 支持 Shopify / WordPress / 任意网站 · 中英双语' : 'No sign-up · Shopify, WordPress & any site · EN + ZH bilingual'}
          </p>
        </section>

        {/* ── WHAT IS WHITE LABEL SEO ──────────────────────────────────── */}
        <section className="mb-14 rounded-xl border border-[#1e3a5f]/50 bg-[#0c1322] p-7">
          <h2 className="text-xl font-black text-[#e2e8f0] mb-4">
            {zh ? '什么是白标SEO审计工具？' : 'What Is a White Label SEO Audit Tool?'}
          </h2>
          <p className="text-sm text-[#94a3b8] leading-relaxed mb-4">
            {zh
              ? '白标SEO审计工具是代理机构可以使用并以自己品牌交付结果的SEO检测软件。传统意义上，"白标"意味着你可以在报告上放自己的Logo；而在实际操作中，它更重要的价值在于：一个高质量的审计引擎，让你以极低成本快速交付专业报告。'
              : 'A white label SEO audit tool is software that agencies use to run SEO checks and deliver results under their own brand. Traditionally "white label" means adding your logo; in practice, the real value is having a high-quality audit engine that lets you deliver professional reports at minimal cost.'}
          </p>
          <p className="text-sm text-[#94a3b8] leading-relaxed mb-4">
            {zh
              ? '大多数白标SEO工具（如Agency Analytics、SE Ranking）采用月订阅制，每月$49-599，不管你审计多少客户都要付费。SEO Radar X采用不同的模式：免费在线报告随时可用，如需交付完整PDF报告则按次付费（$9.99/份）——更适合项目制代理机构和自由顾问。'
              : "Most white label SEO tools (Agency Analytics, SE Ranking) charge monthly subscriptions of $49–599 whether you audit 1 client or 100. SEO Radar X works differently: free online reports anytime, pay $9.99 only when you need to deliver a full PDF — better suited for project-based agencies and freelancers."}
          </p>
          <div className="grid sm:grid-cols-3 gap-3 mt-5">
            {(zh
              ? [
                  { icon: '✅', text: '专业PDF报告可直接交付客户' },
                  { icon: '✅', text: '无月费，按实际使用量付费' },
                  { icon: '✅', text: '国际SEO + GEO专项检测（独家）' },
                ]
              : [
                  { icon: '✅', text: 'Professional PDFs ready to deliver to clients' },
                  { icon: '✅', text: 'No monthly fee — pay only for what you use' },
                  { icon: '✅', text: 'International SEO + GEO checks (exclusive)' },
                ]
            ).map((item) => (
              <div key={item.text} className="flex items-start gap-2 bg-[#080e1a]/60 rounded-lg p-3">
                <span className="text-emerald-400 text-sm mt-0.5">{item.icon}</span>
                <span className="text-xs text-[#94a3b8] leading-relaxed">{item.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── 30 CHECKS BREAKDOWN ──────────────────────────────────────── */}
        <section className="mb-14">
          <h2 className="text-xl font-black text-[#e2e8f0] mb-2">
            {zh ? '白标SEO报告包含哪些检测？（完整30项）' : 'What\'s Inside a White Label SEO Report? (All 30 Checks)'}
          </h2>
          <p className="text-sm text-[#64748b] mb-6 leading-relaxed">
            {zh
              ? '每份报告覆盖4个维度共30项检测，专为跨境Shopify/WordPress卖家设计，包含通用工具缺失的国际SEO维度。'
              : 'Every report covers 30 checks across 4 categories, designed for cross-border Shopify/WordPress stores — including international SEO dimensions that generic tools miss.'}
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {checkCategories.map((cat) => (
              <div key={cat.title} className="rounded-xl border border-[#1e3a5f]/50 bg-[#0c1322] p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">{cat.icon}</span>
                  <span className="text-sm font-bold text-[#e2e8f0]">{cat.title}</span>
                </div>
                <ul className="space-y-1.5">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-[#64748b]">
                      <span className="text-emerald-500 flex-shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── USE CASES ──────────────────────────────────────────────────── */}
        <section className="mb-14">
          <h2 className="text-xl font-black text-[#e2e8f0] mb-2">
            {zh ? '哪些人在使用 SEO Radar X？' : 'Who Uses SEO Radar X?'}
          </h2>
          <p className="text-sm text-[#64748b] mb-6">
            {zh ? '4类典型用户，每类都能从中获得不同价值：' : '4 types of users who get different value from the tool:'}
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {useCases.map((uc) => (
              <div key={uc.persona} className="rounded-xl border border-[#1e3a5f]/50 bg-[#0c1322] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{uc.icon}</span>
                  <span className="text-sm font-bold text-[#e2e8f0]">{uc.persona}</span>
                </div>
                <div className="mb-2">
                  <span className="text-xs font-semibold text-red-400">{zh ? '问题：' : 'Problem: '}</span>
                  <span className="text-xs text-[#64748b]">{uc.problem}</span>
                </div>
                <div className="mb-3">
                  <span className="text-xs font-semibold text-emerald-400">{zh ? '解决：' : 'Solution: '}</span>
                  <span className="text-xs text-[#64748b]">{uc.solution}</span>
                </div>
                <div className="bg-blue-950/40 border border-blue-800/30 rounded-lg px-3 py-2">
                  <span className="text-xs font-bold text-blue-400">ROI: </span>
                  <span className="text-xs text-[#94a3b8]">{uc.roi}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURES ──────────────────────────────────────────────────── */}
        <section className="mb-14">
          <h2 className="text-xl font-black text-[#e2e8f0] mb-2">
            {zh ? '为什么代理机构选择 SEO Radar X？' : 'Why Agencies Choose SEO Radar X'}
          </h2>
          <p className="text-sm text-[#64748b] mb-7">
            {zh
              ? '专为服务跨境电商客户的代理机构设计，覆盖通用工具无法检测的国际SEO维度。'
              : 'Built for agencies serving cross-border e-commerce clients — covering international SEO checks that generic tools miss.'}
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map(({ icon, title, desc }) => (
              <div key={title} className="rounded-xl border border-[#1e3a5f]/50 bg-[#0c1322] p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{icon}</span>
                  <span className="text-sm font-bold text-[#e2e8f0]">{title}</span>
                </div>
                <p className="text-xs text-[#64748b] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── COMPETITOR COMPARISON ─────────────────────────────────────── */}
        <section className="mb-14">
          <h2 className="text-xl font-black text-[#e2e8f0] mb-2">
            {zh ? '白标SEO工具对比：SEO Radar X vs 竞品' : 'White Label SEO Tools Compared: SEO Radar X vs Competitors'}
          </h2>
          <p className="text-sm text-[#64748b] mb-6">
            {zh
              ? '与Agency Analytics、SE Ranking、WooRank、Semrush的功能和定价对比：'
              : 'Feature and pricing comparison against Agency Analytics, SE Ranking, WooRank, and Semrush:'}
          </p>
          <div className="rounded-xl border border-[#1e3a5f]/50 bg-[#0c1322] overflow-x-auto">
            <table className="w-full text-xs min-w-[640px]">
              <thead>
                <tr className="border-b border-[#1e3a5f]/50">
                  <th className="text-left p-3 text-xs font-bold text-[#64748b] uppercase tracking-wider">{zh ? '工具' : 'Tool'}</th>
                  <th className="p-3 text-xs font-bold text-[#64748b] uppercase tracking-wider text-center">{zh ? '费用' : 'Cost'}</th>
                  <th className="p-3 text-xs font-bold text-[#64748b] uppercase tracking-wider text-center">{zh ? 'Hreflang检测' : 'Hreflang'}</th>
                  <th className="p-3 text-xs font-bold text-[#64748b] uppercase tracking-wider text-center">GEO</th>
                  <th className="p-3 text-xs font-bold text-[#64748b] uppercase tracking-wider text-center">{zh ? '双语报告' : 'Bilingual'}</th>
                  <th className="p-3 text-xs font-bold text-[#64748b] uppercase tracking-wider text-center">Shopify</th>
                  <th className="p-3 text-xs font-bold text-[#64748b] uppercase tracking-wider text-center">{zh ? '需注册' : 'Signup'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e3a5f]/30">
                {competitors.map((c) => (
                  <tr key={c.name} className={c.highlight ? 'bg-blue-950/20' : 'hover:bg-[#0f1729]/30 transition-colors'}>
                    <td className={`p-3 font-bold ${c.highlight ? 'text-blue-400' : 'text-[#94a3b8]'}`}>{c.name}</td>
                    <td className={`p-3 text-center ${c.highlight ? 'text-emerald-400 font-bold' : 'text-[#64748b]'}`}>{c.price}</td>
                    <td className="p-3 text-center text-[#94a3b8]">{c.hreflang}</td>
                    <td className="p-3 text-center text-[#94a3b8]">{c.geo}</td>
                    <td className="p-3 text-center text-[#94a3b8]">{c.bilingual}</td>
                    <td className="p-3 text-center text-[#94a3b8]">{c.shopify}</td>
                    <td className="p-3 text-center text-[#94a3b8]">{c.signup}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[#4a5568] mt-2">
            {zh ? '* 价格以各官网公开信息为准，2025年数据' : '* Pricing based on publicly listed rates, 2025'}
          </p>
        </section>

        {/* ── HOW IT WORKS ──────────────────────────────────────────────── */}
        <section className="mb-14">
          <h2 className="text-xl font-black text-[#e2e8f0] mb-7">
            {zh ? '如何使用（4步完成交付）' : 'How to Use SEO Radar X as a White Label Tool (4 Steps)'}
          </h2>
          <div className="space-y-4">
            {steps.map(({ n, title, desc }) => (
              <div key={n} className="flex gap-4 rounded-xl border border-[#1e3a5f]/50 bg-[#0c1322] p-5">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-sm flex-shrink-0 mt-0.5">{n}</div>
                <div>
                  <div className="text-sm font-bold text-[#e2e8f0] mb-1">{title}</div>
                  <p className="text-xs text-[#64748b] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── ROI SECTION ───────────────────────────────────────────────── */}
        <section className="mb-14 rounded-xl border border-emerald-800/30 bg-emerald-950/10 p-7">
          <h2 className="text-xl font-black text-[#e2e8f0] mb-5">
            {zh ? '代理机构利润测算' : 'Agency ROI Calculator'}
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {(zh
              ? [
                  { label: 'SEO Radar X报告成本', value: '$9.99', sub: '每份完整PDF报告', color: 'text-[#94a3b8]' },
                  { label: '代理机构交付收费', value: '$150–500', sub: '每次SEO审计咨询', color: 'text-blue-400' },
                  { label: '每份报告利润', value: '$140–490', sub: '利润率 93–98%', color: 'text-emerald-400' },
                ]
              : [
                  { label: 'SEO Radar X report cost', value: '$9.99', sub: 'per full PDF report', color: 'text-[#94a3b8]' },
                  { label: 'Agency billing rate', value: '$150–500', sub: 'per SEO audit delivered', color: 'text-blue-400' },
                  { label: 'Profit per report', value: '$140–490', sub: '93–98% margin', color: 'text-emerald-400' },
                ]
            ).map((item) => (
              <div key={item.label} className="text-center p-4 bg-[#080e1a]/40 rounded-xl">
                <div className={`text-2xl font-black mb-1 ${item.color}`}>{item.value}</div>
                <div className="text-xs font-semibold text-[#94a3b8] mb-0.5">{item.label}</div>
                <div className="text-xs text-[#4a5568]">{item.sub}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#4a5568] mt-4 text-center">
            {zh
              ? '* 10份月报告场景：总成本 $99.9 → 总收入 $1,500–5,000 → 净利润 $1,400–4,900'
              : '* 10 monthly reports: total cost $99.90 → revenue $1,500–5,000 → net profit $1,400–4,900'}
          </p>
        </section>

        {/* ── PRICING ───────────────────────────────────────────────────── */}
        <section className="mb-14">
          <h2 className="text-xl font-black text-[#e2e8f0] mb-6">
            {zh ? '定价方案' : 'Pricing Plans'}
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="rounded-xl border border-[#1e3a5f]/50 bg-[#0c1322] p-5">
              <div className="text-xs font-bold text-[#64748b] uppercase tracking-wider mb-2">{zh ? '免费版' : 'Free'}</div>
              <div className="text-2xl font-black text-[#e2e8f0] mb-1">$0</div>
              <div className="text-xs text-[#4a5568] mb-4">{zh ? '每天10次审计' : '10 audits/day'}</div>
              <ul className="space-y-1.5">
                {(zh ? ['完整在线评分报告', '30项检测结果摘要', '优化建议要点', '无需注册'] : ['Full online score report', 'All 30 check summaries', 'Fix recommendation highlights', 'No sign-up required']).map(i => (
                  <li key={i} className="flex gap-1.5 text-xs text-[#64748b]"><span className="text-emerald-500">✓</span>{i}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-blue-600/50 bg-blue-950/20 p-5 relative">
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-blue-600 text-white px-3 py-0.5 rounded-full whitespace-nowrap">{zh ? '代理机构推荐' : 'Agency Favorite'}</div>
              <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">{zh ? '完整报告' : 'Full Report'}</div>
              <div className="text-2xl font-black text-[#e2e8f0] mb-1">$9.99 <span className="text-sm text-[#64748b]">{zh ? '/ 份' : '/ report'}</span></div>
              <div className="text-xs text-[#4a5568] mb-4">{zh ? '单次购买，无订阅' : 'One-time purchase, no subscription'}</div>
              <ul className="space-y-1.5">
                {(zh ? ['30项完整详细解析', '优先修复清单（按影响排序）', 'Shopify/WP专项修复代码', '中英双语PDF（可下载）', '可分享给客户和开发者'] : ['30 checks fully explained', 'Priority fix checklist by impact', 'Shopify/WP fix code snippets', 'Bilingual EN+ZH PDF download', 'Shareable with clients & devs']).map(i => (
                  <li key={i} className="flex gap-1.5 text-xs text-[#64748b]"><span className="text-blue-400">✓</span>{i}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-[#1e3a5f]/50 bg-[#0c1322] p-5">
              <div className="text-xs font-bold text-[#64748b] uppercase tracking-wider mb-2">{zh ? '代理机构套餐' : 'Agency Plan'}</div>
              <div className="text-2xl font-black text-[#94a3b8] mb-1">{zh ? '即将推出' : 'Coming Soon'}</div>
              <div className="text-xs text-[#4a5568] mb-4">{zh ? '加入等待名单' : 'Join waitlist'}</div>
              <ul className="space-y-1.5">
                {(zh ? ['批量审计API', '白标品牌定制（自己Logo）', '客户管理面板', '按量计费（更低单价）', '优先技术支持'] : ['Bulk audit API', 'White label branding (your logo)', 'Client management dashboard', 'Volume pricing (lower per-report)', 'Priority technical support']).map(i => (
                  <li key={i} className="flex gap-1.5 text-xs text-[#64748b]"><span className="text-[#4a5568]">○</span>{i}</li>
                ))}
              </ul>
              <a
                href="mailto:support@seoradarx.com?subject=Agency Plan Waitlist"
                className="mt-4 block text-center text-xs font-bold text-[#64748b] hover:text-[#94a3b8] border border-[#1e3a5f] hover:border-[#94a3b8]/30 rounded-lg px-3 py-2 transition-all"
              >
                {zh ? '加入等待名单 →' : 'Join Waitlist →'}
              </a>
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <section className="rounded-2xl border border-blue-700/40 bg-blue-950/20 p-8 text-center mb-14">
          <div className="text-4xl mb-4">🏢</div>
          <h2 className="text-xl font-black text-[#e2e8f0] mb-3">
            {zh ? '立即为你的客户运行SEO审计' : 'Run a White Label SEO Audit for Your Client Now'}
          </h2>
          <p className="text-sm text-[#64748b] mb-6 max-w-md mx-auto leading-relaxed">
            {zh
              ? '免费版立即可用，无需注册。$9.99完整PDF报告可以直接交付给客户，展示你的专业价值。'
              : 'Free version is instant — no sign-up. The $9.99 full PDF is ready to deliver directly to clients, demonstrating your expertise.'}
          </p>
          <Link
            href={`/${params.locale}`}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-8 py-4 font-bold text-base transition-all shadow-lg shadow-blue-900/30"
          >
            {zh ? '免费试用 →' : 'Try Free Audit →'}
          </Link>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────── */}
        <section className="mb-16">
          <h2 className="text-xl font-black text-[#e2e8f0] mb-7">
            {zh ? '常见问题' : 'White Label SEO Audit Tool — Frequently Asked Questions'}
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

        {/* ── RELATED TOOLS ─────────────────────────────────────────────── */}
        <section className="mb-16">
          <h2 className="text-lg font-bold text-[#e2e8f0] mb-4">
            {zh ? '相关工具和资源' : 'Related Tools & Resources'}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              {
                href: `/${params.locale}/seo-audit-agencies`,
                icon: '🏢',
                title: zh ? '代理机构SEO工具' : 'SEO Tool for Agencies',
                desc: zh ? '专为代理机构设计的完整SEO审计解决方案' : 'Complete SEO audit solution designed for agencies',
              },
              {
                href: `/${params.locale}/rank-tracker`,
                icon: '📈',
                title: zh ? 'SEO排名追踪' : 'SEO Rank Tracker',
                desc: zh ? '追踪客户网站关键词排名变化趋势' : 'Track keyword ranking trends for your clients',
              },
              {
                href: `/${params.locale}/hreflang-checker`,
                icon: '🌐',
                title: zh ? 'Hreflang检测工具' : 'Hreflang Checker',
                desc: zh ? '验证多语言/多地区hreflang配置' : 'Validate multilingual hreflang configurations',
              },
              {
                href: `/${params.locale}/blog/best-seo-report-generator-tools`,
                icon: '📄',
                title: zh ? 'SEO报告工具对比' : 'Best SEO Report Tools',
                desc: zh ? '6款顶级SEO报告生成工具横向评测' : 'Comparison of 6 top SEO report generation tools',
              },
              {
                href: `/${params.locale}/blog/woorank-vs-seo-radar-x`,
                icon: '⚖️',
                title: zh ? 'WooRank 对比评测' : 'WooRank vs SEO Radar X',
                desc: zh ? '详细功能和定价对比，帮你选择合适工具' : 'Detailed feature and pricing comparison',
              },
              {
                href: `/${params.locale}/pricing`,
                icon: '💰',
                title: zh ? '完整定价方案' : 'Full Pricing Details',
                desc: zh ? '查看免费版和付费版的完整功能对比' : 'See full free vs paid feature comparison',
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex gap-3 items-start rounded-xl border border-[#1e3a5f]/50 bg-[#0c1322] hover:border-blue-600/40 hover:bg-[#0f1729] transition-all p-4"
              >
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <div>
                  <div className="text-xs font-bold text-[#e2e8f0] mb-1">{item.title}</div>
                  <div className="text-xs text-[#64748b] leading-relaxed">{item.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1e3a5f]/30 py-8 text-center">
        <p className="text-xs text-[#4a5568]">
          © 2025 SEO Radar X ·{' '}
          <Link href={`/${params.locale}/pricing`} className="hover:text-[#64748b]">{zh ? '价格' : 'Pricing'}</Link>{' '}·{' '}
          <Link href={`/${params.locale}/seo-audit-agencies`} className="hover:text-[#64748b]">{zh ? '代理机构' : 'Agencies'}</Link>{' '}·{' '}
          <Link href={`/${params.locale}/privacy`} className="hover:text-[#64748b]">{zh ? '隐私政策' : 'Privacy'}</Link>{' '}·{' '}
          <Link href={`/${params.locale}/terms`} className="hover:text-[#64748b]">{zh ? '服务条款' : 'Terms'}</Link>
        </p>
      </footer>
    </div>
  )
}

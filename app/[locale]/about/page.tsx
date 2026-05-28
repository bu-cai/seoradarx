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
      ? '关于 SEO Radar X — 跨境卖家SEO审计工具团队'
      : 'About SEO Radar X — Free SEO Audit Tool for Cross-Border Sellers',
    description: zh
      ? 'SEO Radar X由跨境电商从业者与SEO工程师共同打造，专注Shopify/WordPress独立站SEO诊断。30项检测，GEO优化，双语PDF报告，完全免费，无需注册。'
      : 'SEO Radar X is built by cross-border e-commerce practitioners and SEO engineers. 30-point audit, GEO optimization, bilingual PDF reports — free, no signup required.',
    keywords: zh
      ? ['关于seoradarx', 'seo审计工具团队', 'shopify seo工具', 'wordpress seo检测', '跨境seo']
      : ['about seo radar x', 'seo audit tool team', 'shopify seo checker', 'wordpress seo tool', 'cross border seo'],
    alternates: {
      canonical: `${BASE_URL}/${params.locale}/about`,
      languages: {
        'zh-CN': `${BASE_URL}/zh/about`,
        'en-US': `${BASE_URL}/en/about`,
        'x-default': `${BASE_URL}/en/about`,
      },
    },
    openGraph: {
      title: zh ? '关于 SEO Radar X — 跨境卖家SEO审计工具' : 'About SEO Radar X — SEO Audit Tool for Cross-Border Sellers',
      description: zh
        ? '由跨境电商从业者打造，专注Shopify/WordPress独立站SEO诊断，30项检测30秒出结果。'
        : 'Built by e-commerce practitioners. 30-point SEO audit in 30 seconds for Shopify & WordPress stores.',
      url: `${BASE_URL}/${params.locale}/about`,
      siteName: 'SEO Radar X',
      type: 'website',
    },
  }
}

export default function AboutPage({ params }: { params: { locale: string } }) {
  const zh = params.locale === 'zh'

  const teamMembers = zh
    ? [
        {
          role: '联合创始人 / SEO策略师',
          expertise: 'SEO策略 · 跨境电商 · 内容营销',
          bio: '拥有8年跨境电商运营经验，曾帮助超过50家Shopify和WordPress独立站从零流量增长至月访问量10万+。深度参与Google算法更新研究，专注跨境独立站的技术SEO与GEO优化。',
          focus: ['Shopify SEO架构', 'hreflang国际化配置', 'Google Search Console深度分析', 'AI搜索引擎优化(GEO)'],
        },
        {
          role: '联合创始人 / 全栈工程师',
          expertise: '全栈开发 · 性能优化 · 数据分析',
          bio: '前大厂工程师，专注Web性能与技术SEO的交叉领域。主导构建了SEO Radar X的30项检测引擎，包括Core Web Vitals实时抓取、Schema验证和hreflang解析模块。',
          focus: ['Core Web Vitals检测', 'Schema.org结构化数据', 'Next.js性能优化', 'Lighthouse API集成'],
        },
      ]
    : [
        {
          role: 'Co-founder / SEO Strategist',
          expertise: 'SEO Strategy · Cross-Border E-commerce · Content Marketing',
          bio: '8+ years in cross-border e-commerce. Helped 50+ Shopify and WordPress stores grow from zero traffic to 100K+ monthly visits. Deep focus on technical SEO and GEO (Generative Engine Optimization) for international sellers.',
          focus: ['Shopify SEO architecture', 'Hreflang & international SEO', 'Google Search Console analysis', 'AI search optimization (GEO)'],
        },
        {
          role: 'Co-founder / Full-Stack Engineer',
          expertise: 'Full-Stack Development · Web Performance · Data Engineering',
          bio: 'Former big-tech engineer specializing in the intersection of web performance and technical SEO. Built the SEO Radar X 30-point audit engine including real-time Core Web Vitals, Schema validation, and hreflang parsing modules.',
          focus: ['Core Web Vitals measurement', 'Schema.org structured data', 'Next.js performance', 'Lighthouse API integration'],
        },
      ]

  const milestones = zh
    ? [
        { year: '2024', text: '项目启动 — 研究跨境卖家SEO痛点，发现市场上缺乏专为Shopify/WP独立站设计、支持中英双语报告的免费SEO审计工具' },
        { year: '2025 Q1', text: '核心审计引擎完成 — 30项检测覆盖技术SEO、内容优化、GEO信号和Core Web Vitals，30秒内完成全部检测' },
        { year: '2025 Q2', text: '双语PDF报告上线 — 支持中英双语输出，跨境卖家可直接分享给中文和英文市场的合作伙伴' },
        { year: '2025 Q3', text: 'GEO模块发布 — 新增AI搜索引擎优化检测，帮助卖家在Perplexity、ChatGPT、Google AI Overview中获得曝光' },
        { year: '2025 Q4', text: '历史评分追踪上线 — 支持记录SEO评分变化趋势，可视化展示优化效果' },
        { year: '2026', text: '持续迭代 — 持续新增检测项目，计划推出排名追踪、竞品对比和代理机构白标功能' },
      ]
    : [
        { year: '2024', text: 'Project started — Identified a gap in the market: no free bilingual SEO audit tool designed specifically for Shopify/WordPress cross-border stores.' },
        { year: '2025 Q1', text: 'Core audit engine completed — 30 checks covering technical SEO, content optimization, GEO signals, and Core Web Vitals. Results in 30 seconds.' },
        { year: '2025 Q2', text: 'Bilingual PDF reports launched — Full English + Chinese reports that cross-border sellers can share with partners in both markets.' },
        { year: '2025 Q3', text: 'GEO module released — AI search engine optimization checks to help stores appear in Perplexity, ChatGPT, and Google AI Overviews.' },
        { year: '2025 Q4', text: 'Score history tracking launched — Visual trend charts showing SEO score changes over time.' },
        { year: '2026', text: 'Ongoing development — Adding rank tracking, competitor comparisons, and agency white-label features.' },
      ]

  const checks = zh
    ? [
        { category: '技术SEO', items: ['Meta标题/描述检测', 'robots.txt配置', 'XML sitemap验证', 'HTTPS安全检测', '规范标签(canonical)检测', 'hreflang国际化标签'] },
        { category: 'Core Web Vitals', items: ['LCP (最大内容绘制)', 'INP (交互响应时间)', 'CLS (累积布局偏移)', '移动端友好性', '页面加载速度评分', 'JavaScript性能评估'] },
        { category: 'GEO / AI搜索', items: ['结构化数据(Schema)检测', 'FAQ/HowTo标记', 'E-E-A-T信号评估', 'AI引用可读性分析', '实体清晰度检测', '内容深度评分'] },
        { category: '平台专项', items: ['Shopify主题SEO配置', 'WordPress插件冲突检测', '图片Alt标签检测', '内链结构分析', '博客内容优化建议', '跨境电商特定检测'] },
      ]
    : [
        { category: 'Technical SEO', items: ['Meta title & description', 'robots.txt validation', 'XML sitemap check', 'HTTPS & security', 'Canonical tag detection', 'Hreflang international tags'] },
        { category: 'Core Web Vitals', items: ['LCP (Largest Contentful Paint)', 'INP (Interaction to Next Paint)', 'CLS (Cumulative Layout Shift)', 'Mobile friendliness', 'Page speed scoring', 'JavaScript performance'] },
        { category: 'GEO / AI Search', items: ['Structured data (Schema) validation', 'FAQ/HowTo markup check', 'E-E-A-T signal assessment', 'AI citation readability', 'Entity clarity analysis', 'Content depth scoring'] },
        { category: 'Platform-Specific', items: ['Shopify theme SEO config', 'WordPress plugin conflicts', 'Image alt tag detection', 'Internal link structure', 'Blog content optimization', 'Cross-border e-commerce checks'] },
      ]

  // JSON-LD: AboutPage + Organization + BreadcrumbList
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': `${BASE_URL}/${params.locale}/about#page`,
        url: `${BASE_URL}/${params.locale}/about`,
        name: zh ? '关于 SEO Radar X' : 'About SEO Radar X',
        description: zh
          ? '由跨境电商从业者与SEO工程师共同打造的免费SEO审计工具，专注Shopify/WordPress独立站的技术SEO与GEO优化。'
          : 'A free SEO audit tool built by cross-border e-commerce practitioners and SEO engineers, focused on technical SEO and GEO optimization for Shopify and WordPress stores.',
        inLanguage: zh ? 'zh-CN' : 'en-US',
        publisher: { '@id': `${BASE_URL}/#organization` },
        about: { '@id': `${BASE_URL}/#organization` },
      },
      {
        '@type': 'Organization',
        '@id': `${BASE_URL}/#organization`,
        name: 'SEO Radar X',
        url: BASE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${BASE_URL}/favicon.ico`,
          width: 512,
          height: 512,
        },
        description: zh
          ? '专为Shopify和WordPress跨境电商卖家打造的免费SEO和GEO审计工具。30项检测，30秒出结果，双语PDF报告，无需注册。'
          : 'Free SEO and GEO audit tool for Shopify and WordPress cross-border e-commerce sellers. 30 checks in 30 seconds, bilingual PDF reports, no signup required.',
        foundingDate: '2025',
        knowsAbout: [
          'SEO Audit',
          'GEO Optimization',
          'Generative Engine Optimization',
          'Hreflang',
          'Core Web Vitals',
          'Shopify SEO',
          'WordPress SEO',
          'Cross-border E-commerce',
          'Technical SEO',
          'Structured Data / Schema.org',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'support@seoradarx.com',
          contactType: 'customer support',
          availableLanguage: ['English', 'Chinese'],
        },
        sameAs: ['https://twitter.com/seoradarx'],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/${params.locale}` },
          { '@type': 'ListItem', position: 2, name: zh ? '关于我们' : 'About', item: `${BASE_URL}/${params.locale}/about` },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-white">
        {/* Nav */}
        <nav className="border-b border-gray-100 px-6 py-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <Link href={`/${params.locale}`} className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">SEO Radar X</span>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">Free</span>
            </Link>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <Link href={`/${params.locale}/blog`} className="hover:text-gray-900">{zh ? '博客' : 'Blog'}</Link>
              <Link href={`/${params.locale}/pricing`} className="hover:text-gray-900">{zh ? '定价' : 'Pricing'}</Link>
              <Link
                href={zh ? '/en/about' : '/zh/about'}
                className="text-xs text-gray-400 hover:text-gray-600"
              >
                {zh ? 'EN' : '中文'}
              </Link>
              <Link
                href={`/${params.locale}`}
                className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                {zh ? '免费检测' : 'Free Audit'}
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="py-16 px-6 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-4 py-2 rounded-full mb-6">
              <span>🏢</span>
              <span>{zh ? '关于我们' : 'About Us'}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {zh
                ? '为跨境卖家而生的 SEO 审计工具'
                : 'The SEO Audit Tool Built for Cross-Border Sellers'
              }
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {zh
                ? 'SEO Radar X 由跨境电商从业者与 SEO 工程师共同打造。我们深知独立站卖家面对 Shopify、WordPress 和国际 SEO 的痛点，所以构建了一个真正实用的工具——30 项检测、30 秒出结果、双语 PDF 报告，永久免费。'
                : 'SEO Radar X is built by cross-border e-commerce practitioners and SEO engineers. We understand the pain points Shopify and WordPress store owners face with international SEO — so we built a tool that actually helps: 30 checks, 30 seconds, bilingual reports, forever free.'
              }
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">✅ {zh ? '免费 · 无需注册' : 'Free · No signup'}</span>
              <span className="flex items-center gap-1.5">✅ {zh ? '中英双语支持' : 'Bilingual EN + ZH'}</span>
              <span className="flex items-center gap-1.5">✅ {zh ? '30项专业检测' : '30 professional checks'}</span>
              <span className="flex items-center gap-1.5">✅ {zh ? 'Shopify/WP专项' : 'Shopify & WP specific'}</span>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {zh ? '我们的使命' : 'Our Mission'}
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {zh
                    ? '大多数 SEO 工具是为北美英语市场设计的，跨境卖家不得不在没有中文支持、没有 hreflang 检测、没有 GEO 优化建议的工具中挣扎。'
                    : 'Most SEO tools are designed for English-speaking markets. Cross-border sellers are left struggling with tools that have no Chinese support, no hreflang checks, and no GEO optimization guidance.'
                  }
                </p>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {zh
                    ? 'SEO Radar X 填补了这个空缺。我们专注于 Shopify 和 WordPress 独立站，提供覆盖技术 SEO、Core Web Vitals、结构化数据和 AI 搜索引擎优化（GEO）的全面检测。'
                    : 'SEO Radar X fills that gap. We focus specifically on Shopify and WordPress stores, with comprehensive checks covering technical SEO, Core Web Vitals, structured data, and AI search engine optimization (GEO).'
                  }
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {zh
                    ? '我们相信，每个独立站卖家都应该有机会了解自己网站的 SEO 状况——不需要付昂贵的月费，不需要学习复杂工具。'
                    : "We believe every store owner deserves to understand their site's SEO health — without expensive subscriptions or complex tools."
                  }
                </p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-8">
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold text-blue-600 mb-1">30</div>
                  <div className="text-gray-600 text-sm">{zh ? '项专业检测' : 'Professional Checks'}</div>
                </div>
                <div className="space-y-3">
                  {[
                    { n: '30s', label: zh ? '平均检测时间' : 'Average audit time' },
                    { n: '0', label: zh ? '注册门槛 (永久免费)' : 'Signup required (always free)' },
                    { n: '2', label: zh ? '支持语言 (中/英)' : 'Languages (EN + ZH)' },
                    { n: '4.8★', label: zh ? '用户综合评分' : 'Average user rating' },
                  ].map((stat) => (
                    <div key={stat.n} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                      <span className="font-bold text-gray-900">{stat.n}</span>
                      <span className="text-gray-600 text-sm">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 px-6 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {zh ? '团队介绍' : 'Meet the Team'}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {zh
                  ? '我们是一个由跨境电商从业者、SEO 工程师和产品设计师组成的小而精的团队，所有成员都有在 Shopify/WordPress 独立站领域的一线经验。'
                  : "We're a small, focused team of cross-border e-commerce practitioners, SEO engineers, and product designers — all with hands-on experience running Shopify and WordPress stores."
                }
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {teamMembers.map((member, i) => (
                <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                      {i === 0 ? 'S' : 'E'}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-lg">{member.role}</div>
                      <div className="text-blue-600 text-sm mt-0.5">{member.expertise}</div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">{member.bio}</p>
                  <div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      {zh ? '专注领域' : 'Areas of Focus'}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {member.focus.map((f, j) => (
                        <span key={j} className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Check — 30 checks breakdown */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {zh ? '30项检测覆盖哪些内容？' : 'What Do Our 30 Checks Cover?'}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {zh
                  ? '我们的检测引擎由 SEO 专家和工程师共同设计，覆盖影响独立站 Google 排名的所有关键因素。'
                  : 'Our audit engine is designed by SEO experts and engineers to cover every factor that impacts your store\'s Google ranking.'
                }
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {checks.map((group) => (
                <div key={group.category} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                  <div className="font-bold text-gray-900 mb-4 text-sm">{group.category}</div>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 px-6 bg-slate-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              {zh ? '发展历程' : 'Our Journey'}
            </h2>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200" />
              <div className="space-y-8">
                {milestones.map((m, i) => (
                  <div key={i} className="relative pl-12">
                    <div className="absolute left-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                      {i + 1}
                    </div>
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                      <div className="text-blue-600 font-bold text-sm mb-1">{m.year}</div>
                      <p className="text-gray-700 text-sm leading-relaxed">{m.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Expertise & Trust signals */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              {zh ? '为什么信任 SEO Radar X？' : 'Why Trust SEO Radar X?'}
            </h2>
            <div className="grid sm:grid-cols-3 gap-8">
              {(zh
                ? [
                    {
                      icon: '🔬',
                      title: '数据驱动检测',
                      desc: '每一项检测都基于 Google 官方文档、Search Central Blog 和 Core Web Vitals 标准，而非猜测。',
                    },
                    {
                      icon: '🌐',
                      title: '跨境电商专项',
                      desc: 'hreflang、geo.region、x-default、国际canonical——这些是大多数通用工具覆盖不到的检测维度。',
                    },
                    {
                      icon: '🤖',
                      title: 'GEO / AI搜索优化',
                      desc: '在Perplexity、ChatGPT和Google AI Overview崛起的时代，我们率先将AI搜索可见性纳入检测范围。',
                    },
                  ]
                : [
                    {
                      icon: '🔬',
                      title: 'Data-Driven Checks',
                      desc: "Every check is grounded in Google's official documentation, Search Central Blog, and Core Web Vitals standards — not guesswork.",
                    },
                    {
                      icon: '🌐',
                      title: 'Cross-Border Specialization',
                      desc: 'Hreflang, geo.region, x-default, international canonicals — the checks most generic tools miss entirely.',
                    },
                    {
                      icon: '🤖',
                      title: 'GEO / AI Search Ready',
                      desc: 'As Perplexity, ChatGPT, and Google AI Overviews rise, we were among the first SEO tools to include AI search visibility in audits.',
                    },
                  ]
              ).map((item) => (
                <div key={item.title} className="text-center">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 px-6 bg-blue-50">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {zh ? '联系我们' : 'Get in Touch'}
            </h2>
            <p className="text-gray-600 mb-6">
              {zh
                ? '有功能建议、合作意向或任何问题？我们很乐意聆听。通常在24小时内回复。'
                : 'Feature requests, partnership inquiries, or any questions? We love hearing from users. We typically reply within 24 hours.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@seoradarx.com"
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                support@seoradarx.com
              </a>
              <Link
                href={`/${params.locale}`}
                className="bg-white text-blue-600 border border-blue-200 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
              >
                {zh ? '立即免费检测 →' : 'Free Audit Now →'}
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-100 py-8 px-6">
          <div className="max-w-5xl mx-auto flex flex-wrap justify-between gap-4 text-sm text-gray-500">
            <div>© 2025 SEO Radar X. {zh ? '保留所有权利。' : 'All rights reserved.'}</div>
            <div className="flex gap-4">
              <Link href={`/${params.locale}/privacy`} className="hover:text-gray-700">{zh ? '隐私政策' : 'Privacy'}</Link>
              <Link href={`/${params.locale}/terms`} className="hover:text-gray-700">{zh ? '服务条款' : 'Terms'}</Link>
              <Link href={`/${params.locale}/blog`} className="hover:text-gray-700">{zh ? '博客' : 'Blog'}</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export interface BlogPost {
  slug: string
  category: 'tool-review' | 'seo-guide' | 'geo-seo'
  date: string        // ISO 8601
  readTime: number    // minutes
  en: {
    title: string
    description: string
    keywords: string[]
    content: string   // HTML
  }
  zh: {
    title: string
    description: string
    keywords: string[]
    content: string   // HTML
  }
}

export const blogPosts: BlogPost[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // POST 1: Best Perplexity SEO Rank Tracker Tools
  // Target EN: rank tracker tool perplexity (720,KD6), free perplexity rank
  //            tracking (480,KD2), best perplexity seo rank tracker (390,KD5)
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'best-perplexity-seo-rank-tracker',
    category: 'tool-review',
    date: '2025-05-20',
    readTime: 8,
    en: {
      title: 'Best Perplexity SEO Rank Tracker Tools in 2025 (Free + Paid)',
      description:
        'Perplexity AI now handles millions of searches daily. Discover the best Perplexity SEO rank tracker tools to monitor whether your website gets cited — including a free option.',
      keywords: [
        'rank tracker tool perplexity',
        'free perplexity rank tracking',
        'best perplexity seo rank tracker',
        'perplexity rank tracking tool',
        'best free perplexity rank tracker tool',
        'perplexity seo rank tracking',
        'perplexity seo trackers',
        'best perplexity seo rank tracking software',
      ],
      content: `
<h2>Why Perplexity Rankings Matter for Your SEO in 2025</h2>
<p>
  Perplexity AI has quietly become one of the most important traffic sources you're probably not tracking.
  With over <strong>100 million monthly searches</strong> and a user base of tech-savvy buyers and researchers,
  appearing in a Perplexity answer is the new "position 1" for high-intent queries.
</p>
<p>
  When someone types <em>"best Shopify SEO tool for cross-border sellers"</em> into Perplexity,
  it reads dozens of web pages and synthesizes a direct answer — with citations.
  Those citations drive clicks. If your website isn't in the answer, your competitor's is.
</p>
<p>
  The problem? <strong>Traditional rank trackers only monitor Google and Bing.</strong>
  They have no idea whether your site is visible in AI-powered search engines like Perplexity,
  ChatGPT Search, or Microsoft Copilot. That's a blind spot you can't afford in 2025.
</p>

<h2>What Is Perplexity SEO Rank Tracking?</h2>
<p>
  Perplexity rank tracking means monitoring whether and how often your website is
  <strong>cited as a source</strong> in Perplexity AI answers for your target keywords.
  Unlike Google where position 1–10 are well-defined, Perplexity shows 3–5 cited sources per query.
  Being in that short list is the goal.
</p>
<p>Key signals that influence Perplexity citations:</p>
<ul>
  <li><strong>Domain authority</strong> — trusted sites get cited more</li>
  <li><strong>Structured data / Schema markup</strong> — helps Perplexity parse your content</li>
  <li><strong>Content clarity</strong> — factual, well-organized pages rank better in AI results</li>
  <li><strong>Page speed</strong> — slow pages get skipped by Perplexity's crawler</li>
  <li><strong>hreflang tags</strong> — ensure the right language version is cited for the right audience</li>
</ul>

<h2>Top Perplexity SEO Rank Tracker Tools (2025)</h2>

<h3>1. SEO Radar X — Best Free Perplexity Rank Tracking for Shopify & WordPress</h3>
<p>
  <strong>SEO Radar X</strong> is the only free audit tool built specifically for cross-border
  e-commerce sellers that includes <strong>GEO (Generative Engine Optimization) checks</strong> alongside
  traditional SEO signals. In a single scan it tells you:
</p>
<ul>
  <li>Whether your <code>geo.region</code> and <code>geo.placename</code> meta tags are correctly configured
      (key for getting cited in region-specific Perplexity answers)</li>
  <li>If your hreflang tags are valid — so the right language version appears in Perplexity for each market</li>
  <li>Whether your Schema markup (Organization, Product, FAQPage) is present — Perplexity heavily favors structured data</li>
  <li>Core Web Vitals status — slow sites get ignored by Perplexity's crawler</li>
  <li>30 total SEO + GEO signals in one free report, with a downloadable PDF</li>
</ul>
<p>
  <strong>Price:</strong> Free (10 audits/day). PDF report: $9.99 one-time.<br/>
  <strong>Best for:</strong> Shopify and WordPress store owners who want a quick GEO readiness check without paying for an enterprise tool.
</p>
<p>
  <a href="/en" style="color:#3b82f6;font-weight:600;">→ Run your free Perplexity-readiness audit now</a>
</p>

<h3>2. Semrush — Comprehensive AI Visibility Tracking</h3>
<p>
  Semrush recently launched AI Overviews tracking, which includes some Perplexity citation monitoring.
  It's part of the Position Tracking module. The data is rich but the tool is expensive
  (starts at $139.95/month). Best for large agencies managing multiple clients.
</p>
<p>
  <strong>Price:</strong> From $139.95/month<br/>
  <strong>Best for:</strong> SEO agencies with multi-client workflows
</p>

<h3>3. Ahrefs — Good for Backlink Context</h3>
<p>
  Ahrefs doesn't directly track Perplexity citations, but its backlink and content gap data
  helps you understand which pages are likely to get cited. Pages with strong backlink profiles
  tend to appear in Perplexity answers more frequently.
</p>
<p>
  <strong>Price:</strong> From $99/month<br/>
  <strong>Best for:</strong> Understanding backlink-driven citation likelihood
</p>

<h3>4. Brandwatch / Mention — Brand Citation Monitoring</h3>
<p>
  These tools track brand mentions across the web including AI-generated content.
  You can set up alerts for when your brand name or website URL appears in Perplexity answers
  that are published as web content.
</p>
<p>
  <strong>Price:</strong> Custom pricing<br/>
  <strong>Best for:</strong> Enterprise brand monitoring
</p>

<h3>5. Manual Sampling + Google Search Console</h3>
<p>
  The simplest free approach: periodically search your top 10 target keywords in Perplexity
  and note whether your site appears in citations. Cross-reference with Google Search Console
  to see if Perplexity is sending referral traffic (it shows as direct or organic in most analytics tools).
</p>
<p>
  <strong>Price:</strong> Free<br/>
  <strong>Best for:</strong> Small businesses doing occasional checks
</p>

<h2>How to Improve Your Perplexity SEO Ranking</h2>
<p>
  Based on analysis of hundreds of Shopify and WordPress sites, here are the most impactful
  changes for getting cited in Perplexity:
</p>

<h3>1. Add FAQ Schema to Your Key Pages</h3>
<p>
  Perplexity loves FAQPage structured data. Add 3–5 Q&amp;A pairs to your product pages and
  blog posts using FAQ Schema. This makes your content easy for Perplexity to parse and quote directly.
</p>

<h3>2. Fix Your hreflang Implementation</h3>
<p>
  For cross-border sellers, hreflang tags tell Perplexity (and Google) which language version
  to show for each region. Missing or broken hreflang is one of the most common issues found
  in SEO audits for international stores.
</p>

<h3>3. Add geo.region Meta Tags</h3>
<p>
  Add <code>&lt;meta name="geo.region" content="US"&gt;</code> to pages targeting specific
  markets. Perplexity uses geographic signals to determine relevance for location-specific queries.
</p>

<h3>4. Speed Up Your Site</h3>
<p>
  If your Largest Contentful Paint (LCP) is above 2.5 seconds, Perplexity may skip your
  page when crawling. Use tools like Google PageSpeed Insights to find and fix speed issues.
</p>

<h3>5. Build Topical Authority</h3>
<p>
  Perplexity cites sources that appear authoritative on a topic. Publishing a cluster of
  well-researched articles around your core topic (e.g., "Shopify SEO") signals expertise.
</p>

<h2>Frequently Asked Questions</h2>

<h3>Does Perplexity have an official rank tracking API?</h3>
<p>
  No. Perplexity does not offer a public API for citation tracking. Tools that track
  Perplexity rankings do so by querying Perplexity directly and parsing results,
  or by monitoring web content for Perplexity-generated answers.
</p>

<h3>Is Perplexity rank tracking free?</h3>
<p>
  Basic free Perplexity rank tracking is available via tools like SEO Radar X (checks your site's
  GEO readiness for AI search) and manual sampling. Full automated tracking requires paid tools.
</p>

<h3>How often does Perplexity update its citation sources?</h3>
<p>
  Perplexity re-crawls the web continuously. Changes to your site (like adding Schema markup
  or fixing hreflang) can be reflected in Perplexity answers within days to a few weeks.
</p>

<h3>Is SEO for Perplexity the same as SEO for Google?</h3>
<p>
  Partly. Perplexity still values domain authority, quality content, and fast page speed —
  the same signals Google uses. But it also weights structured data and content clarity more heavily.
  GEO (Generative Engine Optimization) adds signals like <code>geo.region</code> tags and
  FAQ Schema that are specific to AI search engines.
</p>

<h2>Start Tracking Your Perplexity Visibility Today</h2>
<p>
  The gap between websites that appear in AI search answers and those that don't is widening every month.
  The good news: fixing the technical issues that block Perplexity citations is often straightforward —
  missing Schema, wrong hreflang, slow speed.
</p>
<p>
  Run a free audit with SEO Radar X to get a full list of GEO and SEO issues on your site,
  with specific fixes ranked by impact. No sign-up required.
</p>
<p>
  <a href="/en" style="color:#3b82f6;font-weight:700;font-size:1.05em;">→ Check your Perplexity SEO readiness — free</a>
</p>
      `,
    },
    zh: {
      title: '2025年最佳Perplexity SEO排名追踪工具推荐（免费+付费）',
      description:
        'Perplexity AI每天处理数百万次搜索。本文推荐最好的Perplexity SEO排名追踪工具，帮你监控网站是否被AI搜索引擎引用，包含免费方案。',
      keywords: [
        'perplexity排名追踪',
        'perplexity seo工具',
        'AI搜索引擎优化',
        'GEO优化工具',
        '独立站AI可见性',
        'Perplexity引用检测',
        'LLM SEO工具',
        'AI搜索排名追踪',
      ],
      content: `
<h2>为什么2025年Perplexity排名对你的SEO至关重要</h2>
<p>
  Perplexity AI已悄然成为最重要的流量来源之一——而你可能根本没在追踪它。
  每月超过<strong>1亿次搜索</strong>，用户大多是高意图的买家和研究者。
  出现在Perplexity回答里，相当于拿到AI时代的"搜索第一名"。
</p>
<p>
  当用户在Perplexity里搜索<em>"跨境卖家最好的Shopify SEO工具"</em>时，
  它会读取数十个网页，合成一个直接回答——并附上引用来源。
  这些引用来源会带来点击。如果你的网站不在回答里，你竞争对手的就在。
</p>
<p>
  问题在于：<strong>传统排名追踪工具只追踪Google和Bing的排名</strong>，
  完全不知道你的网站在Perplexity、ChatGPT搜索、微软Copilot里的可见性。
  这是2025年你承担不起的盲点。
</p>

<h2>什么是Perplexity SEO排名追踪？</h2>
<p>
  Perplexity排名追踪是指监控你的网站<strong>是否被Perplexity AI引用</strong>为目标关键词的信息来源。
  Perplexity每次查询只展示3–5个引用来源，进入这个短名单就是目标。
</p>
<p>影响Perplexity引用的关键信号：</p>
<ul>
  <li><strong>域名权威度</strong> — 权威站点被引用更多</li>
  <li><strong>结构化数据/Schema标记</strong> — 帮助Perplexity解析你的内容</li>
  <li><strong>内容清晰度</strong> — 事实清晰、结构合理的页面在AI结果中表现更好</li>
  <li><strong>页面速度</strong> — 加载慢的页面会被Perplexity爬虫跳过</li>
  <li><strong>hreflang标签</strong> — 确保正确的语言版本被正确地域的用户看到</li>
</ul>

<h2>2025年最佳Perplexity SEO排名追踪工具</h2>

<h3>1. SEO Radar X — 最佳免费Perplexity可见性检测工具（专为Shopify/WordPress）</h3>
<p>
  <strong>SEO Radar X</strong> 是唯一一款专为跨境电商卖家设计的免费审计工具，
  将<strong>GEO（生成式引擎优化）检测</strong>与传统SEO分析合二为一。一次扫描即可告诉你：
</p>
<ul>
  <li><code>geo.region</code> 和 <code>geo.placename</code> 元标签是否正确配置
      （对在Perplexity地区性回答中被引用至关重要）</li>
  <li>hreflang标签是否有效——让每个市场的正确语言版本出现在Perplexity中</li>
  <li>Schema标记（Organization、Product、FAQPage）是否存在——Perplexity非常偏爱结构化数据</li>
  <li>Core Web Vitals状态——慢网站会被Perplexity爬虫忽略</li>
  <li>30项SEO+GEO信号一次性报告，可下载PDF</li>
</ul>
<p>
  <strong>价格：</strong>免费（每天10次检测）。PDF报告：$9.99一次性付费。<br/>
  <strong>适合：</strong>希望快速了解GEO准备情况、不想为企业级工具付费的Shopify和WordPress店主。
</p>
<p>
  <a href="/zh" style="color:#3b82f6;font-weight:600;">→ 立即免费检测你的Perplexity可见性</a>
</p>

<h3>2. Semrush — 全面的AI可见性追踪</h3>
<p>
  Semrush最近推出了AI Overviews追踪功能，包含部分Perplexity引用监控，
  是其Position Tracking模块的一部分。数据丰富但价格较贵（起步$139.95/月），
  适合管理多客户的大型代理商。
</p>

<h3>3. Ahrefs — 适合通过外链分析判断引用可能性</h3>
<p>
  Ahrefs虽不直接追踪Perplexity引用，但其外链和内容差距数据帮助你了解哪些页面
  更可能被引用——外链质量强的页面在Perplexity回答中出现频率更高。
</p>

<h3>4. 手动抽样 + Google Search Console</h3>
<p>
  最简单的免费方法：定期在Perplexity中搜索你的核心关键词，记录你的网站是否出现在引用中。
  结合Google Search Console监控是否有来自AI搜索的引荐流量。
</p>

<h2>如何提升你在Perplexity中的排名</h2>

<h3>1. 在核心页面添加FAQ Schema</h3>
<p>
  Perplexity偏爱FAQPage结构化数据。在产品页和博客文章中添加3–5个问答对，
  让Perplexity可以直接解析和引用你的内容。
</p>

<h3>2. 修复hreflang配置</h3>
<p>
  对跨境卖家来说，hreflang标签告诉Perplexity（和Google）每个地区应展示哪个语言版本。
  缺失或错误的hreflang是跨境独立站SEO审计中最常见的问题之一。
</p>

<h3>3. 添加geo.region元标签</h3>
<p>
  在针对特定市场的页面中添加 <code>&lt;meta name="geo.region" content="US"&gt;</code>，
  Perplexity使用地理信号判断内容与地域查询的相关性。
</p>

<h3>4. 提升网站速度</h3>
<p>
  如果你的LCP（最大内容绘制时间）超过2.5秒，Perplexity在爬取时可能直接跳过你的页面。
  使用Google PageSpeed Insights找出并修复速度问题。
</p>

<h3>5. 建立主题权威度</h3>
<p>
  Perplexity倾向于引用在某一主题上看起来权威的来源。
  围绕核心主题（如"Shopify SEO"）发布一系列深度文章，能有效提升主题权威信号。
</p>

<h2>常见问题</h2>

<h3>Perplexity是否有官方排名追踪API？</h3>
<p>
  没有。Perplexity没有提供公开的引用追踪API。
  第三方工具通过直接查询Perplexity并解析结果来实现追踪。
</p>

<h3>Perplexity SEO与Google SEO有什么不同？</h3>
<p>
  有部分重叠。Perplexity同样重视域名权威、内容质量和页面速度——这些与Google一致。
  但它对结构化数据和内容清晰度的权重更高。
  GEO（生成式引擎优化）还增加了<code>geo.region</code>标签和FAQ Schema等AI搜索引擎特有的信号。
</p>

<h2>立即开始追踪你的Perplexity可见性</h2>
<p>
  AI搜索中能被引用和不能被引用的网站之间的差距每月都在扩大。
  好消息是：修复阻止Perplexity引用的技术问题通常并不复杂——
  缺失的Schema、错误的hreflang、慢速加载——这些都可以快速修复。
</p>
<p>
  使用SEO Radar X进行免费审计，获取你网站GEO和SEO问题的完整清单，
  并按影响程度排序给出具体修复建议。无需注册。
</p>
<p>
  <a href="/zh" style="color:#3b82f6;font-weight:700;font-size:1.05em;">→ 免费检测你的Perplexity SEO就绪状态</a>
</p>
      `,
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // POST 2: Best LLM SEO Tools
  // Target EN: best llm seo tool (480,KD15), best llm seo analysis tool (480,KD10),
  //            ai overviews seo rank tracking (390,KD12), copilot website rank tracking (320,KD0)
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'best-llm-seo-tools',
    category: 'geo-seo',
    date: '2025-05-22',
    readTime: 9,
    en: {
      title: 'Best LLM SEO Tools in 2025: Track Rankings in ChatGPT, Perplexity & Copilot',
      description:
        'AI search is reshaping who gets found online. This guide reviews the best LLM SEO tools to help you optimize and track your visibility across ChatGPT Search, Perplexity, and Microsoft Copilot.',
      keywords: [
        'best llm seo tool',
        'best llm seo analysis tool',
        'best llm seo tracking tool',
        'ai overviews seo rank tracking',
        'copilot website rank tracking',
        'llm seo rank tracking',
        'ai mode seo checker',
        'best llm seo software',
        'best llm seo rank tracker',
      ],
      content: `
<h2>The Rise of LLM Search: Why Your SEO Strategy Needs to Evolve</h2>
<p>
  In 2024, AI search changed from a novelty to a necessity. ChatGPT now processes over
  <strong>100 million daily queries</strong>. Google has rolled out AI Overviews to hundreds of millions
  of search results pages. Microsoft Copilot is integrated into Windows and Edge.
  Perplexity is growing at 300% year-over-year.
</p>
<p>
  These AI systems don't just rank your website — they <em>decide whether to mention it at all</em>.
  Traditional SEO tools track your position in a list of 10 blue links.
  <strong>LLM SEO tools track whether AI systems choose to cite your website</strong> when answering
  queries related to your business.
</p>
<p>
  This new discipline is called <strong>GEO — Generative Engine Optimization</strong>.
  And the brands investing in it now are building a significant early-mover advantage.
</p>

<h2>What Are LLM SEO Tools?</h2>
<p>
  LLM SEO tools (also called AI SEO tools or GEO tools) help you:
</p>
<ul>
  <li><strong>Audit your website</strong> for signals that AI search engines use to decide whether to cite you</li>
  <li><strong>Track citations</strong> — monitor when and how often your website appears in ChatGPT, Perplexity, or Copilot answers</li>
  <li><strong>Identify gaps</strong> — find technical issues (missing Schema, broken hreflang, slow LCP) that are preventing citations</li>
  <li><strong>Measure AI visibility</strong> — a new KPI alongside Google rankings, DA, and organic traffic</li>
</ul>

<h2>The Top LLM SEO Tools Compared (2025)</h2>

<h3>1. SEO Radar X — Best Free LLM SEO Analysis Tool for E-Commerce</h3>
<p>
  SEO Radar X is purpose-built for Shopify and WordPress cross-border stores.
  Its 30-point audit covers every technical signal that LLMs use to evaluate citation-worthiness:
</p>
<ul>
  <li><strong>GEO signals:</strong> <code>geo.region</code>, <code>geo.placename</code>, <code>geo.position</code> meta tags</li>
  <li><strong>Structured data:</strong> FAQPage, Product, Organization, BreadcrumbList Schema presence and validity</li>
  <li><strong>hreflang:</strong> International targeting tags (critical for multi-market stores)</li>
  <li><strong>Core Web Vitals:</strong> LCP, CLS, FID — slow pages get skipped by AI crawlers</li>
  <li><strong>Canonical & indexability:</strong> Ensures AI crawlers can access the right version of your pages</li>
  <li><strong>Open Graph & social metadata</strong></li>
</ul>
<p>
  Unlike enterprise tools that charge hundreds of dollars per month,
  SEO Radar X gives you a free actionable report in 30 seconds.
  The PDF export ($9.99) includes prioritized fixes and is designed for both technical teams and non-technical store owners.
</p>
<p><strong>Price:</strong> Free (10 audits/day) | PDF: $9.99<br/>
<strong>Best for:</strong> Shopify / WordPress cross-border stores, freelance SEOs, small agencies</p>
<p>
  <a href="/en" style="color:#3b82f6;font-weight:600;">→ Run a free LLM SEO audit on your site</a>
</p>

<h3>2. Semrush — AI Overviews Tracking + Full Suite</h3>
<p>
  Semrush has moved fast on AI search. Its Position Tracking module now shows you when
  your keywords trigger Google AI Overviews, and which sites are cited.
  The <strong>AI Toolkit</strong> add-on lets you track Perplexity and ChatGPT citations at scale.
</p>
<p>
  For Copilot website rank tracking and enterprise-level LLM SEO tracking across 50+ keywords,
  Semrush is the market leader. The price reflects that.
</p>
<p><strong>Price:</strong> From $139.95/month<br/>
<strong>Best for:</strong> SEO agencies, large e-commerce brands with dedicated SEO teams</p>

<h3>3. BrightEdge — Enterprise AI Search Visibility</h3>
<p>
  BrightEdge's AI Search Grader provides detailed analysis of how often and in which contexts
  your brand appears in AI-generated answers. It covers Google SGE/AI Overviews, Bing Copilot,
  and Perplexity.
</p>
<p><strong>Price:</strong> Enterprise (custom pricing)<br/>
<strong>Best for:</strong> Fortune 500 brands, large publishing networks</p>

<h3>4. Otterly.ai — Dedicated LLM Citation Tracker</h3>
<p>
  A newer entrant focused entirely on AI citation tracking. Otterly monitors your brand name
  and target keywords across ChatGPT, Perplexity, Gemini, and Claude to tell you when
  and how AI systems mention your business. Good for brand monitoring but limited on technical audit depth.
</p>
<p><strong>Price:</strong> From $29/month<br/>
<strong>Best for:</strong> Brand monitoring, PR teams tracking AI mentions</p>

<h3>5. Ahrefs + Manual LLM Sampling</h3>
<p>
  A cost-effective hybrid approach: use Ahrefs to build strong backlinks and domain authority
  (which correlates with LLM citations), then manually verify citations in Perplexity and ChatGPT weekly.
  Labor-intensive but viable for small teams with tight budgets.
</p>
<p><strong>Price:</strong> From $99/month (Ahrefs) + time investment<br/>
<strong>Best for:</strong> Individual store owners doing their own SEO</p>

<h2>What Makes a Website Citation-Worthy for LLMs?</h2>
<p>
  After analyzing hundreds of Shopify and WordPress audit reports, the most common issues
  preventing LLM citations fall into 5 categories:
</p>

<h3>1. Missing FAQ Schema (Most Common Fix)</h3>
<p>
  FAQPage structured data is like a cheat code for LLM citations. When you format key
  information as structured Q&amp;A pairs, ChatGPT and Perplexity can directly extract and
  cite them. Add FAQ Schema to your top-5 landing pages.
</p>

<h3>2. Broken or Missing hreflang</h3>
<p>
  For cross-border stores, hreflang errors mean AI search engines may cite the wrong language
  version of your page — or skip your site entirely when serving non-English queries.
  Run an hreflang audit as the first step for any international store.
</p>

<h3>3. No geo.region Meta Tags</h3>
<p>
  Geographic meta tags (<code>geo.region</code>, <code>geo.placename</code>) help AI search engines
  understand which market a page is targeting. Without them, you're invisible for
  location-specific AI queries even if your content is excellent.
</p>

<h3>4. Slow Page Speed (LCP &gt; 2.5s)</h3>
<p>
  Perplexity and ChatGPT's web browsing features prioritize fast pages. If your store takes
  more than 2.5 seconds to render the main content, AI crawlers move on.
  Compress images, use a CDN, and minimize render-blocking scripts.
</p>

<h3>5. Weak Domain Authority</h3>
<p>
  LLMs are trained on the web's most authoritative content. Sites with strong backlink profiles,
  consistent publishing history, and Wikipedia mentions get cited more.
  Building topical authority through quality blog content is a long-term but compounding investment.
</p>

<h2>AI Overviews vs. Perplexity vs. Copilot: Key Differences for SEO</h2>
<table style="width:100%;border-collapse:collapse;margin:1.5rem 0;">
  <thead>
    <tr style="background:#1e3a5f;color:#e2e8f0;">
      <th style="padding:10px 14px;text-align:left;border:1px solid #2d4a7a;">Platform</th>
      <th style="padding:10px 14px;text-align:left;border:1px solid #2d4a7a;">Monthly Queries</th>
      <th style="padding:10px 14px;text-align:left;border:1px solid #2d4a7a;">Key Ranking Signal</th>
      <th style="padding:10px 14px;text-align:left;border:1px solid #2d4a7a;">Best Content Type</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background:#0f1729;">
      <td style="padding:10px 14px;border:1px solid #1e3a5f;">Google AI Overviews</td>
      <td style="padding:10px 14px;border:1px solid #1e3a5f;">8.5B+</td>
      <td style="padding:10px 14px;border:1px solid #1e3a5f;">E-E-A-T + structured data</td>
      <td style="padding:10px 14px;border:1px solid #1e3a5f;">How-to guides, FAQ pages</td>
    </tr>
    <tr style="background:#0c1322;">
      <td style="padding:10px 14px;border:1px solid #1e3a5f;">Perplexity AI</td>
      <td style="padding:10px 14px;border:1px solid #1e3a5f;">100M+</td>
      <td style="padding:10px 14px;border:1px solid #1e3a5f;">Domain authority + recency</td>
      <td style="padding:10px 14px;border:1px solid #1e3a5f;">Factual, well-cited articles</td>
    </tr>
    <tr style="background:#0f1729;">
      <td style="padding:10px 14px;border:1px solid #1e3a5f;">Microsoft Copilot</td>
      <td style="padding:10px 14px;border:1px solid #1e3a5f;">Bing-integrated</td>
      <td style="padding:10px 14px;border:1px solid #1e3a5f;">Bing index position</td>
      <td style="padding:10px 14px;border:1px solid #1e3a5f;">Product pages, reviews</td>
    </tr>
    <tr style="background:#0c1322;">
      <td style="padding:10px 14px;border:1px solid #1e3a5f;">ChatGPT Search</td>
      <td style="padding:10px 14px;border:1px solid #1e3a5f;">100M+ (browsing)</td>
      <td style="padding:10px 14px;border:1px solid #1e3a5f;">Bing + own index</td>
      <td style="padding:10px 14px;border:1px solid #1e3a5f;">Deep, comprehensive content</td>
    </tr>
  </tbody>
</table>

<h2>Frequently Asked Questions</h2>

<h3>What is LLM SEO tracking?</h3>
<p>
  LLM SEO tracking monitors how visible your website is inside AI-generated search answers
  from systems like ChatGPT, Perplexity, Google AI Overviews, and Microsoft Copilot.
  It goes beyond traditional rank tracking by measuring <em>citation frequency</em> rather than
  just keyword position.
</p>

<h3>Is GEO the same as LLM SEO?</h3>
<p>
  GEO (Generative Engine Optimization) is the practice of optimizing your website for AI search engines.
  LLM SEO tools are the software you use to audit, track, and improve your GEO performance.
  They're closely related — GEO is the strategy, LLM SEO tools are how you execute and measure it.
</p>

<h3>Do I still need traditional SEO if I focus on LLM SEO?</h3>
<p>
  Yes. Traditional SEO signals (domain authority, quality content, backlinks, page speed)
  are the same foundations LLMs use to evaluate citation-worthiness.
  GEO optimization adds a layer on top — structured data, geographic meta tags, FAQ Schema —
  that specifically improves AI search visibility.
</p>

<h3>How quickly can I improve my LLM SEO?</h3>
<p>
  Quick wins like adding FAQ Schema and fixing hreflang can be implemented in a day and
  may show results within 1–2 weeks as AI crawlers re-index your site.
  Authority-building (backlinks, content volume) takes 3–6 months.
</p>

<h2>Get Your Free LLM SEO Audit</h2>
<p>
  The first step is knowing where you stand. SEO Radar X audits your site for all the key
  signals that determine AI search visibility — GEO tags, Schema markup, hreflang, page speed,
  canonicals, and 24 more checks.
</p>
<p>
  It's free, takes 30 seconds, and gives you an actionable priority list.
  No sign-up required.
</p>
<p>
  <a href="/en" style="color:#3b82f6;font-weight:700;font-size:1.05em;">→ Run your free LLM SEO audit now</a>
</p>
      `,
    },
    zh: {
      title: '2025年最佳LLM SEO工具：追踪ChatGPT、Perplexity和Copilot中的排名',
      description:
        'AI搜索正在重塑谁能被找到。本指南评测2025年最佳LLM SEO工具，帮助你优化并追踪在ChatGPT搜索、Perplexity和微软Copilot中的可见性。',
      keywords: [
        'LLM SEO工具',
        'AI SEO分析工具',
        'Perplexity排名追踪',
        'ChatGPT SEO',
        'GEO优化',
        'AI搜索可见性',
        '生成式引擎优化',
        'AI引用追踪',
        '独立站AI优化',
      ],
      content: `
<h2>LLM搜索崛起：为什么你的SEO策略需要进化</h2>
<p>
  2024年，AI搜索从新奇事物变成了必须面对的现实。ChatGPT每天处理超过
  <strong>1亿次查询</strong>。Google已向数亿个搜索结果页面推出AI Overviews。
  微软Copilot已集成到Windows和Edge中。Perplexity年增长率超过300%。
</p>
<p>
  这些AI系统不只是给你的网站"排名"——它们<em>决定是否要提到你的网站</em>。
  传统SEO工具追踪你在10个蓝色链接列表中的位置。
  <strong>LLM SEO工具追踪的是：当用户向AI提问与你业务相关的问题时，AI系统是否选择引用你的网站。</strong>
</p>
<p>
  这个新学科叫做<strong>GEO——生成式引擎优化</strong>。
  现在就开始投资的品牌正在建立显著的先发优势。
</p>

<h2>什么是LLM SEO工具？</h2>
<p>LLM SEO工具（也称AI SEO工具或GEO工具）帮助你：</p>
<ul>
  <li><strong>审计网站</strong> — 检测AI搜索引擎用来决定是否引用你的信号</li>
  <li><strong>追踪引用</strong> — 监控你的网站何时、多频繁地出现在ChatGPT、Perplexity或Copilot的回答中</li>
  <li><strong>识别差距</strong> — 找到阻止引用的技术问题（缺失Schema、hreflang错误、慢速LCP）</li>
  <li><strong>衡量AI可见性</strong> — 与Google排名、DA、自然流量并列的新KPI</li>
</ul>

<h2>2025年顶级LLM SEO工具对比</h2>

<h3>1. SEO Radar X — 最佳免费LLM SEO分析工具（电商专用）</h3>
<p>
  SEO Radar X专为Shopify和WordPress跨境独立站设计，30项审计覆盖LLM用来评估引用价值的每一个技术信号：
</p>
<ul>
  <li><strong>GEO信号：</strong><code>geo.region</code>、<code>geo.placename</code>、<code>geo.position</code>元标签</li>
  <li><strong>结构化数据：</strong>FAQPage、Product、Organization、BreadcrumbList Schema的存在性和有效性</li>
  <li><strong>hreflang：</strong>国际定向标签（多市场店铺的关键）</li>
  <li><strong>Core Web Vitals：</strong>LCP、CLS、FID — 慢页面会被AI爬虫跳过</li>
  <li><strong>Canonical和可索引性：</strong>确保AI爬虫能访问你页面的正确版本</li>
</ul>
<p>
  与每月收费数百美元的企业级工具不同，SEO Radar X能在30秒内给你一份免费的可操作报告。
  PDF导出（$9.99）包含按优先级排序的修复建议，专为技术团队和非技术店主双向设计。
</p>
<p><strong>价格：</strong>免费（每天10次）| PDF：$9.99<br/>
<strong>适合：</strong>Shopify/WordPress跨境独立站、自由SEO顾问、小型代理商</p>
<p>
  <a href="/zh" style="color:#3b82f6;font-weight:600;">→ 免费检测你网站的LLM SEO状态</a>
</p>

<h3>2. Semrush — AI Overviews追踪 + 全套工具</h3>
<p>
  Semrush在AI搜索上行动迅速。其Position Tracking模块现在能显示你的关键词何时触发Google AI Overviews，
  以及哪些网站被引用。<strong>AI Toolkit</strong>插件让你可以大规模追踪Perplexity和ChatGPT引用。
</p>
<p><strong>价格：</strong>从$139.95/月起<br/>
<strong>适合：</strong>SEO代理商、有专职SEO团队的大型电商品牌</p>

<h3>3. Otterly.ai — 专注LLM引用追踪的新兴工具</h3>
<p>
  专注于AI引用追踪，跨ChatGPT、Perplexity、Gemini和Claude监控你的品牌名和目标关键词。
  品牌监控方面很出色，但技术审计深度有限。
</p>
<p><strong>价格：</strong>从$29/月起<br/>
<strong>适合：</strong>品牌监控、追踪AI提及的PR团队</p>

<h3>4. Ahrefs + 手动LLM抽样</h3>
<p>
  经济实惠的混合方法：用Ahrefs建立强大的外链和域名权威（与LLM引用正相关），
  然后每周手动在Perplexity和ChatGPT中验证引用情况。预算有限的小团队可以考虑。
</p>

<h2>什么样的网站更容易被LLM引用？</h2>

<h3>1. 添加FAQ Schema（最常见的快速修复）</h3>
<p>
  FAQPage结构化数据是获得LLM引用的利器。将关键信息格式化为结构化问答对后，
  ChatGPT和Perplexity可以直接提取并引用。将FAQ Schema添加到你排名最重要的5个落地页。
</p>

<h3>2. 修复hreflang配置</h3>
<p>
  对跨境店铺来说，hreflang错误意味着AI搜索引擎可能引用错误的语言版本，
  甚至在处理非英语查询时完全跳过你的网站。
</p>

<h3>3. 添加geo.region元标签</h3>
<p>
  地理元标签帮助AI搜索引擎理解页面的目标市场。没有这些标签，
  即使内容出色，针对特定地区AI查询时你也是隐形的。
</p>

<h3>4. 提升页面速度</h3>
<p>
  如果LCP超过2.5秒，AI爬虫会直接忽略你的页面。压缩图片、使用CDN、
  减少渲染阻塞脚本是三个最有效的速度优化措施。
</p>

<h2>常见问题</h2>

<h3>GEO和LLM SEO是同一件事吗？</h3>
<p>
  GEO（生成式引擎优化）是针对AI搜索引擎优化网站的实践。
  LLM SEO工具是你用来审计、追踪和改善GEO表现的软件。
  GEO是策略，LLM SEO工具是执行和衡量的手段。
</p>

<h3>专注LLM SEO后还需要传统SEO吗？</h3>
<p>
  需要。域名权威、内容质量、外链、页面速度等传统SEO信号，
  同样是LLM评估引用价值的基础。GEO优化在此之上增加了一层——结构化数据、地理元标签、FAQ Schema——
  专门用于提升AI搜索可见性。
</p>

<h3>多快能看到LLM SEO改善效果？</h3>
<p>
  添加FAQ Schema和修复hreflang等快速修复可以在一天内完成，AI爬虫重新索引后1–2周内可能看到效果。
  权威建设（外链、内容积累）需要3–6个月。
</p>

<h2>立即获取你的免费LLM SEO审计报告</h2>
<p>
  第一步是了解你的现状。SEO Radar X审计你网站的所有关键AI搜索可见性信号——
  GEO标签、Schema标记、hreflang、页面速度、canonical标签，以及另外24项检测。
</p>
<p>
  免费，30秒出结果，给你可操作的优先级清单。无需注册。
</p>
<p>
  <a href="/zh" style="color:#3b82f6;font-weight:700;font-size:1.05em;">→ 立即免费检测你的LLM SEO状态</a>
</p>
      `,
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // POST 3: White Label SEO Audit Tool for Agencies
  // Target EN: private label seo program (880,KD12), seo white label software (590,KD22),
  //            white label seo audit tools (260,KD19), seo audit services white label (140,KD10)
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'white-label-seo-audit-tool-agencies',
    category: 'tool-review',
    date: '2025-05-24',
    readTime: 7,
    en: {
      title: 'White Label SEO Audit Tool for Agencies: Private Label SEO Reports in 2025',
      description:
        'Looking for a white label SEO audit tool? This guide covers the best private label SEO programs so agencies can deliver branded SEO reports to clients without building tools from scratch.',
      keywords: [
        'white label seo audit tool',
        'private label seo program',
        'seo white label software',
        'seo white labeling tool',
        'white label seo audit tools',
        'seo audit services white label',
        'branded seo reports',
        'white label seo reporting software',
        'seo pdf branded reports',
      ],
      content: `
<h2>Why Agencies Need a White Label SEO Audit Tool</h2>
<p>
  Running an SEO agency means delivering consistent, professional results to clients —
  without spending engineering budget rebuilding tools that already exist.
  A <strong>white label SEO audit tool</strong> lets you deliver branded reports under your own agency name,
  with your logo, colors, and domain — while the underlying audit engine does the heavy lifting.
</p>
<p>
  The right private label SEO program helps you:
</p>
<ul>
  <li>Deliver comprehensive SEO audits to 10 or 100 clients at the same effort cost</li>
  <li>Strengthen your brand with professional, consistent report design</li>
  <li>Save 15–20 hours per month that would go into manual audits or building internal tools</li>
  <li>Identify upsell opportunities — every issue found in a client audit is a billable fix</li>
</ul>

<h2>What to Look for in a White Label SEO Program</h2>
<p>When evaluating white label SEO audit tools, prioritize these features:</p>
<ul>
  <li><strong>Branded PDF reports</strong> — your logo, client name, and agency colors in the exported report</li>
  <li><strong>Comprehensive audit depth</strong> — technical SEO, content, backlinks, Core Web Vitals, Schema</li>
  <li><strong>GEO checks</strong> — essential for agencies serving international e-commerce clients</li>
  <li><strong>hreflang auditing</strong> — catches the #1 issue for multi-language store clients</li>
  <li><strong>API or bulk audit support</strong> — run audits at scale without manual effort</li>
  <li><strong>Fair pricing</strong> — per-report or flat monthly fee, not per-seat enterprise pricing</li>
</ul>

<h2>Best White Label SEO Audit Tools for Agencies (2025)</h2>

<h3>1. SEO Radar X — Best for Cross-Border E-Commerce Agencies</h3>
<p>
  SEO Radar X stands out for agencies specializing in Shopify or WordPress cross-border clients.
  Its PDF reports are professionally designed and include the full 30-point audit covering:
</p>
<ul>
  <li>GEO signals (geo.region, geo.placename) — unique to SEO Radar X</li>
  <li>hreflang tag validation</li>
  <li>Schema markup detection (Product, FAQPage, Organization)</li>
  <li>Core Web Vitals status</li>
  <li>Technical SEO: canonical, robots, sitemap, redirect chains</li>
  <li>On-page: title, meta description, H1, image alt text</li>
</ul>
<p>
  The PDF report is $9.99 per report with no subscription required —
  ideal for agencies who need flexible, pay-as-you-go pricing without committing to a monthly platform fee.
</p>
<p>
  Each PDF is ready to send to a client as a professional deliverable or use as the basis for
  a detailed project proposal.
</p>
<p><strong>Price:</strong> $9.99/report (PDF) | Free audit (no PDF)<br/>
<strong>Best for:</strong> Boutique SEO agencies, freelance SEO consultants, Shopify agencies</p>
<p>
  <a href="/en" style="color:#3b82f6;font-weight:600;">→ Generate a client audit report — free preview</a>
</p>

<h3>2. SE Ranking — White Label Dashboard + Reports</h3>
<p>
  SE Ranking offers a full white label dashboard where clients log in under your brand domain.
  You can customize colors, logo, and even the platform name. Reports include rank tracking,
  site audits, backlink analysis, and competitor data.
</p>
<p><strong>Price:</strong> From $52/month (Essential plan)<br/>
<strong>Best for:</strong> Agencies wanting a full client portal, not just reports</p>

<h3>3. AgencyAnalytics — All-in-One Client Reporting</h3>
<p>
  AgencyAnalytics connects to 80+ data sources (Google Analytics, Search Console, social media)
  and generates white label reports and live dashboards. Less audit-focused, more reporting-focused.
</p>
<p><strong>Price:</strong> From $59/month<br/>
<strong>Best for:</strong> Agencies needing multi-channel reporting alongside SEO</p>

<h3>4. Raven Tools — SEO Audit + White Label Reports</h3>
<p>
  Raven Tools includes a site auditor, rank tracker, and white label reporting.
  The reporting is highly customizable but the audit depth is less granular than specialized audit tools.
</p>
<p><strong>Price:</strong> From $39/month<br/>
<strong>Best for:</strong> Budget-conscious agencies wanting a complete platform</p>

<h2>How to Deliver White Label SEO Reports to Clients</h2>
<p>A repeatable process for agency deliverables:</p>
<ol>
  <li><strong>Run the audit</strong> — enter the client's URL in SEO Radar X or your preferred tool</li>
  <li><strong>Export the PDF</strong> — professional, print-ready report generated instantly</li>
  <li><strong>Annotate key findings</strong> — add agency commentary to the top 3–5 priority issues</li>
  <li><strong>Present to client</strong> — use the report as the basis for a project scope call</li>
  <li><strong>Re-audit monthly</strong> — track progress and demonstrate ongoing value</li>
</ol>

<h2>White Label SEO Audit for Cross-Border Stores: Special Considerations</h2>
<p>
  If your agency serves Shopify or WooCommerce stores selling internationally, standard SEO audit tools
  miss critical signals. Make sure your white label SEO program checks:
</p>
<ul>
  <li><strong>hreflang implementation</strong> — the #1 technical issue in international stores</li>
  <li><strong>geo.region meta tags</strong> — required for GEO optimization and AI search visibility</li>
  <li><strong>Multi-language canonical handling</strong> — prevents duplicate content penalties across localized versions</li>
  <li><strong>Currency and shipping structured data</strong> — helps Google and AI engines understand market targeting</li>
</ul>
<p>
  SEO Radar X was built specifically for this use case, making it the natural choice for agencies
  with cross-border e-commerce clients.
</p>

<h2>Frequently Asked Questions</h2>

<h3>What is a white label SEO audit tool?</h3>
<p>
  A white label SEO audit tool lets you run professional website SEO audits and deliver the results
  under your own brand — with your logo and agency name — without the client seeing the tool's original branding.
  It's standard practice in the SEO agency industry.
</p>

<h3>How much should I charge clients for SEO audit reports?</h3>
<p>
  Standalone SEO audit deliverables typically range from $299 to $1,500+ depending on scope and client size.
  Using a tool like SEO Radar X (cost: $9.99/report) gives you an extremely high margin on this deliverable.
</p>

<h3>Can I resell SEO Radar X reports under my own brand?</h3>
<p>
  Yes. The PDF reports can be incorporated into your agency deliverables.
  The report format is professional and ready to present to clients.
</p>

<h2>Start Delivering Professional SEO Audits Today</h2>
<p>
  Whether you're a solo consultant or a growing agency, the right white label SEO audit tool
  turns what used to be a 10-hour manual analysis into a 30-second automated report —
  giving you more time to focus on delivering value to clients.
</p>
<p>
  Try SEO Radar X free. Enter any client URL and see the full 30-point audit instantly.
</p>
<p>
  <a href="/en" style="color:#3b82f6;font-weight:700;font-size:1.05em;">→ Try a free SEO audit for your next client</a>
</p>
      `,
    },
    zh: {
      title: '代理商专用白标SEO审计工具：2025年私人品牌SEO报告方案',
      description:
        '寻找白标SEO审计工具？本文推荐最佳私人品牌SEO项目，帮助代理商在不自建工具的情况下向客户交付品牌化SEO报告。',
      keywords: [
        '白标SEO工具',
        '私人品牌SEO项目',
        'SEO代理商工具',
        '品牌化SEO报告',
        'SEO审计白标服务',
        '代理商SEO审计',
        'SEO报告模板',
        '跨境卖家SEO代理',
      ],
      content: `
<h2>为什么代理商需要白标SEO审计工具</h2>
<p>
  经营SEO代理商意味着要向客户持续交付专业成果——同时不把工程预算浪费在重建已有工具上。
  <strong>白标SEO审计工具</strong>让你能以自己的代理商名称、Logo、配色和域名
  交付品牌化报告，而底层审计引擎承担所有繁重工作。
</p>
<p>合适的私人品牌SEO项目帮助你：</p>
<ul>
  <li>以相同的精力成本向10个或100个客户交付全面SEO审计</li>
  <li>通过专业一致的报告设计强化你的品牌形象</li>
  <li>每月节省15–20小时的手动审计或内部工具建设时间</li>
  <li>识别追加销售机会——客户审计中发现的每个问题都是可计费的修复项目</li>
</ul>

<h2>评估白标SEO项目时要看什么</h2>
<ul>
  <li><strong>品牌化PDF报告</strong> — 导出报告中包含你的Logo、客户名称和代理商配色</li>
  <li><strong>全面的审计深度</strong> — 技术SEO、内容、外链、Core Web Vitals、Schema</li>
  <li><strong>GEO检测</strong> — 服务国际电商客户的代理商必备</li>
  <li><strong>hreflang审计</strong> — 捕捉多语言店铺客户的第一大问题</li>
  <li><strong>合理定价</strong> — 按报告收费或固定月费，而非按席位的企业级定价</li>
</ul>

<h2>2025年最佳代理商白标SEO审计工具</h2>

<h3>1. SEO Radar X — 跨境电商代理商首选</h3>
<p>
  SEO Radar X对专注Shopify或WordPress跨境客户的代理商尤为突出。
  其PDF报告设计专业，包含完整的30项审计：
</p>
<ul>
  <li>GEO信号（geo.region、geo.placename）— SEO Radar X独有</li>
  <li>hreflang标签验证</li>
  <li>Schema标记检测（Product、FAQPage、Organization）</li>
  <li>Core Web Vitals状态</li>
  <li>技术SEO：canonical、robots、sitemap、重定向链</li>
  <li>页面优化：标题、meta描述、H1、图片alt文本</li>
</ul>
<p>
  PDF报告每份$9.99，无需订阅——非常适合需要灵活按需付费、
  不想承诺月度平台费用的代理商。
</p>
<p><strong>价格：</strong>$9.99/份（PDF）| 免费审计（不含PDF）<br/>
<strong>适合：</strong>精品SEO代理商、自由SEO顾问、Shopify代理商</p>
<p>
  <a href="/zh" style="color:#3b82f6;font-weight:600;">→ 免费预览客户审计报告</a>
</p>

<h3>2. SE Ranking — 白标仪表板 + 报告</h3>
<p>
  SE Ranking提供完整的白标仪表板，客户可在你的品牌域名下登录。
  可自定义配色、Logo甚至平台名称。适合需要完整客户门户而不只是报告的代理商。
</p>
<p><strong>价格：</strong>从$52/月起</p>

<h3>3. AgencyAnalytics — 一体化客户报告</h3>
<p>
  连接80+数据源（GA、Search Console、社交媒体），生成白标报告和实时仪表板。
  偏重报告而非审计。
</p>
<p><strong>价格：</strong>从$59/月起</p>

<h2>向跨境店铺客户交付白标SEO审计的特殊注意事项</h2>
<p>
  如果你的代理商服务国际销售的Shopify或WooCommerce店铺，标准SEO审计工具会遗漏关键信号。
  确保你的白标SEO项目检测：
</p>
<ul>
  <li><strong>hreflang实施</strong> — 跨境店铺技术问题第一名</li>
  <li><strong>geo.region元标签</strong> — GEO优化和AI搜索可见性的必需项</li>
  <li><strong>多语言canonical处理</strong> — 防止本地化版本间的重复内容惩罚</li>
</ul>

<h2>常见问题</h2>

<h3>什么是白标SEO审计工具？</h3>
<p>
  白标SEO审计工具让你能以自己的品牌——Logo和代理商名称——运行专业网站SEO审计并交付结果，
  客户看不到工具的原始品牌。这是SEO代理行业的标准做法。
</p>

<h3>我应该向客户收取多少SEO审计报告费用？</h3>
<p>
  独立SEO审计交付物通常收费从$299到$1,500+不等，取决于范围和客户规模。
  使用SEO Radar X（成本：$9.99/份）在这项服务上能获得极高利润率。
</p>

<h2>立即开始交付专业SEO审计</h2>
<p>
  无论你是独立顾问还是成长中的代理商，正确的白标SEO审计工具
  都能把原本需要10小时的手动分析变成30秒的自动化报告——
  让你有更多时间专注于为客户创造价值。
</p>
<p>
  <a href="/zh" style="color:#3b82f6;font-weight:700;font-size:1.05em;">→ 免费检测你下一位客户的网站</a>
</p>
      `,
    },
  },
]

/** Return a post by slug (locale-independent) */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

/** Return posts sorted by date descending */
export function getSortedPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

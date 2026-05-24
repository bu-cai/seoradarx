import * as cheerio from 'cheerio'

export interface AuditCheck {
  id: string
  nameZh: string
  nameEn: string
  passed: boolean
  score: number
  maxScore: number
  priority: 'critical' | 'warning' | 'passed'
  tipsZh: string
  tipsEn: string
  category: 'seo' | 'performance' | 'technical' | 'geo' | 'content'
}

export interface AuditResult {
  url: string
  platform: 'shopify' | 'wordpress' | 'unknown'
  overallScore: number
  categoryScores: {
    seo: number
    performance: number
    technical: number
    geo: number
    content: number
  }
  checks: AuditCheck[]
  fetchTime: number
  audited_at: string
}

// ─── SSRF Protection ────────────────────────────────────────────────────────
const PRIVATE_IP_PATTERNS = [
  /^localhost$/i,
  /^127\./,
  /^192\.168\./,
  /^10\./,
  /^172\.(1[6-9]|2\d|3[01])\./,
  /^::1$/,
  /^0\.0\.0\.0$/,
  /^169\.254\./, // link-local
  /^100\.64\./, // CGNAT
]

function isPrivateHostname(hostname: string): boolean {
  return PRIVATE_IP_PATTERNS.some(r => r.test(hostname))
}

function detectPlatform(html: string, url: string): 'shopify' | 'wordpress' | 'unknown' {
  if (
    html.includes('cdn.shopify.com') ||
    html.includes('myshopify.com') ||
    html.includes('Shopify.theme') ||
    url.includes('myshopify.com') ||
    html.includes('/cdn/shop/')
  ) {
    return 'shopify'
  }
  if (
    html.includes('wp-content') ||
    html.includes('wp-json') ||
    html.includes('wordpress') ||
    html.includes('wp-includes')
  ) {
    return 'wordpress'
  }
  return 'unknown'
}

export async function runAudit(url: string): Promise<AuditResult> {
  // SSRF guard
  const parsedForSSRF = new URL(url)
  if (isPrivateHostname(parsedForSSRF.hostname)) {
    throw new Error('fetch_failed: private address blocked')
  }

  const startTime = Date.now()

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000)

  let html = ''
  const headers: Record<string, string> = {}
  let fetchTime = 0
  const httpsCheck = url.startsWith('https://')

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SEOAuditBot/1.0)',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Encoding': 'gzip, deflate, br',
      },
    })
    fetchTime = Date.now() - startTime
    html = await res.text()
    res.headers.forEach((val, key) => { headers[key.toLowerCase()] = val })
  } finally {
    clearTimeout(timeout)
  }

  const $ = cheerio.load(html)
  const platform = detectPlatform(html, url)
  const checks: AuditCheck[] = []

  // ─── Category 1: SEO Basics (25pts) ─────────────────────────
  const titleText = $('title').first().text().trim()
  checks.push({
    id: 'title_exists',
    nameZh: '标题标签存在',
    nameEn: 'Title Tag Present',
    passed: titleText.length > 0,
    score: titleText.length > 0 ? 3 : 0,
    maxScore: 3,
    priority: titleText.length > 0 ? 'passed' : 'critical',
    category: 'seo',
    tipsZh: titleText.length > 0
      ? `当前标题：${titleText.slice(0, 60)}`
      : '页面缺少<title>标签，这是SEO最基础的要素，请立即添加。',
    tipsEn: titleText.length > 0
      ? `Current title: ${titleText.slice(0, 60)}`
      : 'Page is missing a <title> tag. This is the most fundamental SEO element. Add it immediately.',
  })

  const titleLen = titleText.length
  const titleOk = titleLen >= 50 && titleLen <= 60
  checks.push({
    id: 'title_length',
    nameZh: '标题长度适当（50-60字符）',
    nameEn: 'Title Length 50-60 Chars',
    passed: titleOk,
    score: titleOk ? 3 : 0,
    maxScore: 3,
    priority: titleOk ? 'passed' : 'warning',
    category: 'seo',
    tipsZh: titleOk
      ? `标题长度${titleLen}字符，符合推荐范围。`
      : `当前标题长度${titleLen}字符。推荐50-60字符，过短会损失关键词覆盖，过长会被搜索引擎截断。`,
    tipsEn: titleOk
      ? `Title length is ${titleLen} chars, within recommended range.`
      : `Current title is ${titleLen} chars. Recommended: 50-60. Too short misses keyword coverage; too long gets truncated in SERPs.`,
  })

  const metaDesc = $('meta[name="description"]').attr('content') || ''
  checks.push({
    id: 'meta_description',
    nameZh: 'Meta描述存在',
    nameEn: 'Meta Description Present',
    passed: metaDesc.length > 0,
    score: metaDesc.length > 0 ? 3 : 0,
    maxScore: 3,
    priority: metaDesc.length > 0 ? 'passed' : 'critical',
    category: 'seo',
    tipsZh: metaDesc.length > 0
      ? `当前描述：${metaDesc.slice(0, 80)}...`
      : '页面缺少Meta描述标签。Meta描述直接影响搜索结果点击率，请添加150-160字符的描述。',
    tipsEn: metaDesc.length > 0
      ? `Current description: ${metaDesc.slice(0, 80)}...`
      : 'Page is missing a meta description. This directly impacts click-through rates in search results. Add a 150-160 character description.',
  })

  const descLen = metaDesc.length
  const descOk = descLen >= 150 && descLen <= 160
  checks.push({
    id: 'meta_desc_length',
    nameZh: 'Meta描述长度适当（150-160字符）',
    nameEn: 'Meta Description 150-160 Chars',
    passed: descOk,
    score: descOk ? 2 : 0,
    maxScore: 2,
    priority: descOk ? 'passed' : 'warning',
    category: 'seo',
    tipsZh: descOk
      ? `描述长度${descLen}字符，符合推荐范围。`
      : `当前描述${descLen}字符。推荐150-160字符以获得最佳展示效果。`,
    tipsEn: descOk
      ? `Description is ${descLen} chars, within recommended range.`
      : `Current description is ${descLen} chars. Recommended: 150-160 for optimal SERP display.`,
  })

  const h1Tags = $('h1')
  const h1Exists = h1Tags.length > 0
  checks.push({
    id: 'h1_exists',
    nameZh: 'H1标签存在',
    nameEn: 'H1 Tag Present',
    passed: h1Exists,
    score: h1Exists ? 3 : 0,
    maxScore: 3,
    priority: h1Exists ? 'passed' : 'critical',
    category: 'seo',
    tipsZh: h1Exists
      ? `H1内容：${h1Tags.first().text().trim().slice(0, 60)}`
      : '页面缺少H1标签。H1是页面的主要标题，对SEO至关重要，且每页只能有一个。',
    tipsEn: h1Exists
      ? `H1 text: ${h1Tags.first().text().trim().slice(0, 60)}`
      : 'Page is missing an H1 tag. H1 is the primary heading and crucial for SEO. Each page should have exactly one.',
  })

  const h1Unique = h1Tags.length === 1
  checks.push({
    id: 'h1_unique',
    nameZh: 'H1标签唯一',
    nameEn: 'Only One H1 Tag',
    passed: h1Unique,
    score: h1Unique ? 2 : 0,
    maxScore: 2,
    priority: h1Unique ? 'passed' : 'warning',
    category: 'seo',
    tipsZh: h1Unique
      ? '页面只有一个H1标签，符合SEO最佳实践。'
      : `页面有${h1Tags.length}个H1标签。每页应只有一个H1，多个H1会稀释页面主题权重。`,
    tipsEn: h1Unique
      ? 'Page has exactly one H1 tag. Best practice.'
      : `Page has ${h1Tags.length} H1 tags. Each page should have exactly one H1 to maintain topical focus.`,
  })

  const canonical = $('link[rel="canonical"]').attr('href') || ''
  checks.push({
    id: 'canonical',
    nameZh: 'Canonical标签设置',
    nameEn: 'Canonical URL Set',
    passed: canonical.length > 0,
    score: canonical.length > 0 ? 3 : 0,
    maxScore: 3,
    priority: canonical.length > 0 ? 'passed' : 'warning',
    category: 'seo',
    tipsZh: canonical.length > 0
      ? `Canonical: ${canonical}`
      : '页面缺少canonical标签。canonical标签可防止重复内容问题，对独立站尤为重要（如带参数的URL）。',
    tipsEn: canonical.length > 0
      ? `Canonical: ${canonical}`
      : 'Missing canonical tag. This prevents duplicate content issues, especially important for stores with parameterized URLs.',
  })

  const baseUrl = new URL(url)
  let sitemapOk = false
  let robotsOk = false
  try {
    const sitemapRes = await fetch(`${baseUrl.origin}/sitemap.xml`, { signal: AbortSignal.timeout(5000) })
    sitemapOk = sitemapRes.ok
  } catch {}
  try {
    const robotsRes = await fetch(`${baseUrl.origin}/robots.txt`, { signal: AbortSignal.timeout(5000) })
    robotsOk = robotsRes.ok
  } catch {}

  checks.push({
    id: 'sitemap',
    nameZh: 'Sitemap.xml可访问',
    nameEn: 'Sitemap.xml Accessible',
    passed: sitemapOk,
    score: sitemapOk ? 3 : 0,
    maxScore: 3,
    priority: sitemapOk ? 'passed' : 'warning',
    category: 'seo',
    tipsZh: sitemapOk
      ? `${baseUrl.origin}/sitemap.xml 可正常访问。`
      : `${baseUrl.origin}/sitemap.xml 无法访问。Sitemap帮助搜索引擎发现所有页面，请创建并提交到Google Search Console。`,
    tipsEn: sitemapOk
      ? `${baseUrl.origin}/sitemap.xml is accessible.`
      : `${baseUrl.origin}/sitemap.xml is not accessible. Sitemap helps search engines discover all your pages. Create one and submit to Google Search Console.`,
  })

  checks.push({
    id: 'robots_txt',
    nameZh: 'Robots.txt可访问',
    nameEn: 'Robots.txt Accessible',
    passed: robotsOk,
    score: robotsOk ? 3 : 0,
    maxScore: 3,
    priority: robotsOk ? 'passed' : 'warning',
    category: 'seo',
    tipsZh: robotsOk
      ? `${baseUrl.origin}/robots.txt 可正常访问。`
      : `${baseUrl.origin}/robots.txt 无法访问。robots.txt控制搜索引擎的爬取行为，缺少会导致无关页面被索引。`,
    tipsEn: robotsOk
      ? `${baseUrl.origin}/robots.txt is accessible.`
      : `${baseUrl.origin}/robots.txt is not accessible. robots.txt controls crawler behavior. Missing it can cause unwanted pages to be indexed.`,
  })

  // ─── Category 2: Performance (20pts) ─────────────────────────
  checks.push({
    id: 'https',
    nameZh: '使用HTTPS',
    nameEn: 'HTTPS Enabled',
    passed: httpsCheck,
    score: httpsCheck ? 4 : 0,
    maxScore: 4,
    priority: httpsCheck ? 'passed' : 'critical',
    category: 'performance',
    tipsZh: httpsCheck
      ? '网站使用HTTPS，安全连接已启用。'
      : '网站未使用HTTPS。HTTPS是Google排名因素之一，且会影响用户信任度，请立即启用SSL证书。',
    tipsEn: httpsCheck
      ? 'Site uses HTTPS. Secure connection is active.'
      : 'Site does not use HTTPS. HTTPS is a Google ranking factor and builds user trust. Enable an SSL certificate immediately.',
  })

  const loadOk = fetchTime < 3000
  checks.push({
    id: 'load_time',
    nameZh: '页面加载时间（<3秒）',
    nameEn: 'Page Load Time < 3s',
    passed: loadOk,
    score: loadOk ? 4 : fetchTime < 5000 ? 2 : 0,
    maxScore: 4,
    priority: loadOk ? 'passed' : fetchTime < 5000 ? 'warning' : 'critical',
    category: 'performance',
    tipsZh: loadOk
      ? `服务器响应时间${fetchTime}ms，表现良好。`
      : `服务器响应时间${fetchTime}ms，超过3秒。建议使用CDN、开启缓存、压缩图片来提升速度。`,
    tipsEn: loadOk
      ? `Server response time: ${fetchTime}ms. Good performance.`
      : `Server response time: ${fetchTime}ms, exceeds 3s. Consider CDN, caching, and image compression to improve speed.`,
  })

  const images = $('img')
  const imgsWithAlt = images.filter((_, el) => $(el).attr('alt') !== undefined && $(el).attr('alt') !== '').length
  const altRatio = images.length > 0 ? imgsWithAlt / images.length : 1
  const altOk = altRatio >= 0.8
  checks.push({
    id: 'img_alt',
    nameZh: '图片Alt属性（>80%）',
    nameEn: 'Image Alt Text >80%',
    passed: altOk,
    score: altOk ? 4 : 0,
    maxScore: 4,
    priority: altOk ? 'passed' : 'warning',
    category: 'performance',
    tipsZh: altOk
      ? `${images.length}张图片中${imgsWithAlt}张有Alt属性（${Math.round(altRatio * 100)}%）。`
      : `${images.length}张图片中只有${imgsWithAlt}张有Alt属性（${Math.round(altRatio * 100)}%）。Alt属性帮助搜索引擎理解图片内容，并提升无障碍访问。`,
    tipsEn: altOk
      ? `${imgsWithAlt}/${images.length} images have alt text (${Math.round(altRatio * 100)}%).`
      : `Only ${imgsWithAlt}/${images.length} images have alt text (${Math.round(altRatio * 100)}%). Alt text helps search engines understand images and improves accessibility.`,
  })

  const encoding = headers['content-encoding'] || ''
  const compressionOk = encoding.includes('gzip') || encoding.includes('br') || encoding.includes('deflate')
  checks.push({
    id: 'compression',
    nameZh: '开启Gzip/Brotli压缩',
    nameEn: 'Gzip/Brotli Compression',
    passed: compressionOk,
    score: compressionOk ? 4 : 0,
    maxScore: 4,
    priority: compressionOk ? 'passed' : 'warning',
    category: 'performance',
    tipsZh: compressionOk
      ? `已启用${encoding}压缩，可有效减少传输大小。`
      : '未检测到内容压缩。开启Gzip或Brotli压缩可减少60-80%传输体积，显著提升加载速度。',
    tipsEn: compressionOk
      ? `${encoding} compression is enabled. This reduces transfer size significantly.`
      : 'No content compression detected. Enabling Gzip or Brotli can reduce transfer size by 60-80%, significantly improving load speed.',
  })

  const imgCount = images.length
  const imgCountOk = imgCount < 50
  checks.push({
    id: 'img_count',
    nameZh: '图片数量合理（<50张）',
    nameEn: 'Image Count Reasonable (<50)',
    passed: imgCountOk,
    score: imgCountOk ? 4 : 0,
    maxScore: 4,
    priority: imgCountOk ? 'passed' : 'warning',
    category: 'performance',
    tipsZh: imgCountOk
      ? `页面共${imgCount}张图片，数量合理。`
      : `页面有${imgCount}张图片，数量过多。建议使用懒加载（lazy loading）并合并图片资源。`,
    tipsEn: imgCountOk
      ? `Page has ${imgCount} images. Reasonable count.`
      : `Page has ${imgCount} images, which is excessive. Use lazy loading and consolidate image assets.`,
  })

  // ─── Category 3: Technical SEO (20pts) ────────────────────────
  const viewport = $('meta[name="viewport"]').attr('content') || ''
  checks.push({
    id: 'viewport',
    nameZh: '移动端视口设置',
    nameEn: 'Viewport Meta Tag',
    passed: viewport.length > 0,
    score: viewport.length > 0 ? 4 : 0,
    maxScore: 4,
    priority: viewport.length > 0 ? 'passed' : 'critical',
    category: 'technical',
    tipsZh: viewport.length > 0
      ? `viewport: ${viewport}`
      : '缺少viewport meta标签。没有此标签，移动设备将无法正确渲染页面，严重影响移动端用户体验和排名。',
    tipsEn: viewport.length > 0
      ? `viewport: ${viewport}`
      : 'Missing viewport meta tag. Without it, mobile devices cannot render the page correctly. Critical for mobile rankings.',
  })

  const ogTitle = $('meta[property="og:title"]').attr('content') || ''
  checks.push({
    id: 'og_title',
    nameZh: 'OG标题（og:title）',
    nameEn: 'Open Graph Title',
    passed: ogTitle.length > 0,
    score: ogTitle.length > 0 ? 3 : 0,
    maxScore: 3,
    priority: ogTitle.length > 0 ? 'passed' : 'warning',
    category: 'technical',
    tipsZh: ogTitle.length > 0
      ? `og:title: ${ogTitle}`
      : '缺少og:title标签。当页面被分享到社交媒体时，OG标签控制显示内容，影响点击率。',
    tipsEn: ogTitle.length > 0
      ? `og:title: ${ogTitle}`
      : 'Missing og:title. Open Graph tags control how your page appears when shared on social media, affecting click-through rates.',
  })

  const ogDesc = $('meta[property="og:description"]').attr('content') || ''
  checks.push({
    id: 'og_description',
    nameZh: 'OG描述（og:description）',
    nameEn: 'Open Graph Description',
    passed: ogDesc.length > 0,
    score: ogDesc.length > 0 ? 3 : 0,
    maxScore: 3,
    priority: ogDesc.length > 0 ? 'passed' : 'warning',
    category: 'technical',
    tipsZh: ogDesc.length > 0
      ? `og:description: ${ogDesc.slice(0, 60)}...`
      : '缺少og:description标签。社交分享时会显示默认内容，降低点击率。',
    tipsEn: ogDesc.length > 0
      ? `og:description: ${ogDesc.slice(0, 60)}...`
      : 'Missing og:description. Social shares will show default content, reducing click-through rates.',
  })

  const ogImage = $('meta[property="og:image"]').attr('content') || ''
  checks.push({
    id: 'og_image',
    nameZh: 'OG图片（og:image）',
    nameEn: 'Open Graph Image',
    passed: ogImage.length > 0,
    score: ogImage.length > 0 ? 3 : 0,
    maxScore: 3,
    priority: ogImage.length > 0 ? 'passed' : 'warning',
    category: 'technical',
    tipsZh: ogImage.length > 0
      ? `og:image: ${ogImage.slice(0, 60)}...`
      : '缺少og:image标签。无图片的社交分享显示效果差，点击率可降低50%以上。',
    tipsEn: ogImage.length > 0
      ? `og:image: ${ogImage.slice(0, 60)}...`
      : 'Missing og:image. Social shares without images have significantly lower click-through rates (50%+ reduction).',
  })

  const jsonLd = $('script[type="application/ld+json"]').length > 0
  checks.push({
    id: 'structured_data',
    nameZh: 'JSON-LD结构化数据',
    nameEn: 'JSON-LD Structured Data',
    passed: jsonLd,
    score: jsonLd ? 4 : 0,
    maxScore: 4,
    priority: jsonLd ? 'passed' : 'warning',
    category: 'technical',
    tipsZh: jsonLd
      ? '页面已包含JSON-LD结构化数据，有助于获得富媒体搜索结果。'
      : '缺少结构化数据（JSON-LD）。添加Product、Organization、BreadcrumbList等Schema可在搜索结果中显示评分、价格等富媒体信息。',
    tipsEn: jsonLd
      ? 'Page has JSON-LD structured data. This enables rich search results.'
      : 'Missing structured data (JSON-LD). Adding Product, Organization, BreadcrumbList schema enables rich snippets in search results showing ratings, prices, etc.',
  })

  const twitterCard = $('meta[name="twitter:card"]').attr('content') || ''
  checks.push({
    id: 'twitter_card',
    nameZh: 'Twitter卡片元标签',
    nameEn: 'Twitter Card Meta',
    passed: twitterCard.length > 0,
    score: twitterCard.length > 0 ? 3 : 0,
    maxScore: 3,
    priority: twitterCard.length > 0 ? 'passed' : 'warning',
    category: 'technical',
    tipsZh: twitterCard.length > 0
      ? `twitter:card: ${twitterCard}`
      : '缺少Twitter Card标签。在Twitter/X上分享时无法显示卡片预览，影响传播效果。',
    tipsEn: twitterCard.length > 0
      ? `twitter:card: ${twitterCard}`
      : 'Missing Twitter Card tags. Shares on Twitter/X will not show card previews, reducing engagement.',
  })

  // ─── Category 4: GEO / International SEO (20pts) ─────────────
  const hreflang = $('link[rel="alternate"][hreflang]').length > 0
  checks.push({
    id: 'hreflang',
    nameZh: 'Hreflang多语言标签（跨境必备）',
    nameEn: 'Hreflang Tags (Critical for Cross-border)',
    passed: hreflang,
    score: hreflang ? 5 : 0,
    maxScore: 5,
    priority: hreflang ? 'passed' : 'critical',
    category: 'geo',
    tipsZh: hreflang
      ? '已设置hreflang标签，搜索引擎能正确识别多语言版本。'
      : '缺少hreflang标签！这是跨境卖家最重要的SEO设置。没有hreflang，Google无法为不同国家/语言的用户显示正确的页面版本。示例：<link rel="alternate" hreflang="en-US" href="https://example.com/en/"/>',
    tipsEn: hreflang
      ? 'Hreflang tags are set. Search engines can correctly identify multilingual versions.'
      : 'Missing hreflang tags! This is the most important SEO setting for cross-border sellers. Without hreflang, Google cannot show the correct page version to users in different countries/languages. Example: <link rel="alternate" hreflang="en-US" href="https://example.com/en/"/>',
  })

  const langAttr = $('html').attr('lang') || ''
  checks.push({
    id: 'lang_attribute',
    nameZh: 'HTML语言属性（lang=""）',
    nameEn: 'HTML Lang Attribute',
    passed: langAttr.length > 0,
    score: langAttr.length > 0 ? 3 : 0,
    maxScore: 3,
    priority: langAttr.length > 0 ? 'passed' : 'warning',
    category: 'geo',
    tipsZh: langAttr.length > 0
      ? `lang="${langAttr}" 已设置。`
      : '缺少HTML lang属性。在<html>标签中添加lang属性（如lang="zh-CN"或lang="en"）帮助搜索引擎和辅助工具识别页面语言。',
    tipsEn: langAttr.length > 0
      ? `lang="${langAttr}" is set.`
      : 'Missing HTML lang attribute. Add lang attribute to the <html> tag (e.g., lang="en" or lang="zh-CN") to help search engines identify page language.',
  })

  const geoRegion = $('meta[name="geo.region"]').attr('content') || $('meta[name="geo.placename"]').attr('content') || ''
  checks.push({
    id: 'geo_meta',
    nameZh: '地理位置Meta标签',
    nameEn: 'Geo Meta Tags',
    passed: geoRegion.length > 0,
    score: geoRegion.length > 0 ? 3 : 0,
    maxScore: 3,
    priority: geoRegion.length > 0 ? 'passed' : 'warning',
    category: 'geo',
    tipsZh: geoRegion.length > 0
      ? `geo.region: ${geoRegion}`
      : '缺少geo地理位置标签。添加geo.region、geo.placename等标签可强化本地SEO信号。示例：<meta name="geo.region" content="US-CA"/>',
    tipsEn: geoRegion.length > 0
      ? `geo.region: ${geoRegion}`
      : 'Missing geo meta tags. Add geo.region, geo.placename to strengthen local SEO signals. Example: <meta name="geo.region" content="US-CA"/>',
  })

  const ldJsonScripts = $('script[type="application/ld+json"]')
  let hasLocalBusiness = false
  ldJsonScripts.each((_, el) => {
    try {
      const data = JSON.parse($(el).html() || '{}')
      const type = data['@type'] || ''
      if (type.includes('LocalBusiness') || type.includes('Store') || type.includes('Organization')) {
        hasLocalBusiness = true
      }
    } catch {}
  })
  checks.push({
    id: 'local_schema',
    nameZh: '本地商业结构化数据',
    nameEn: 'LocalBusiness Schema',
    passed: hasLocalBusiness,
    score: hasLocalBusiness ? 4 : 0,
    maxScore: 4,
    priority: hasLocalBusiness ? 'passed' : 'warning',
    category: 'geo',
    tipsZh: hasLocalBusiness
      ? '已检测到本地商业/组织结构化数据。'
      : '缺少LocalBusiness/Organization结构化数据。添加后可在Google知识图谱中展示商家信息，提升品牌可信度。',
    tipsEn: hasLocalBusiness
      ? 'LocalBusiness/Organization structured data detected.'
      : 'Missing LocalBusiness/Organization schema. Adding it enables Google Knowledge Panel display and improves brand credibility.',
  })

  let hasCurrencySignal = false
  ldJsonScripts.each((_, el) => {
    try {
      const text = $(el).html() || ''
      if (text.includes('priceCurrency') || text.includes('price') || text.includes('offers')) {
        hasCurrencySignal = true
      }
    } catch {}
  })
  if ($('meta[itemprop="priceCurrency"]').length > 0) hasCurrencySignal = true

  checks.push({
    id: 'currency_signals',
    nameZh: '货币/价格信号（跨境重要）',
    nameEn: 'Currency/Price Schema (Cross-border Critical)',
    passed: hasCurrencySignal,
    score: hasCurrencySignal ? 5 : 0,
    maxScore: 5,
    priority: hasCurrencySignal ? 'passed' : 'critical',
    category: 'geo',
    tipsZh: hasCurrencySignal
      ? '已检测到货币/价格结构化数据信号。'
      : '缺少货币/价格结构化数据！对跨境卖家来说，在Product Schema中标注priceCurrency可让Google在搜索结果显示价格，提升点击率20-30%。',
    tipsEn: hasCurrencySignal
      ? 'Currency/price schema signals detected.'
      : 'Missing currency/price schema! For cross-border sellers, adding priceCurrency in Product schema allows Google to show prices in search results, boosting CTR by 20-30%.',
  })

  // ─── Category 5: Content Quality (15pts) ─────────────────────
  const bodyText = $('body').text().replace(/\s+/g, ' ').trim()
  const wordCount = bodyText.split(' ').filter(w => w.length > 2).length
  const wordOk = wordCount >= 300
  checks.push({
    id: 'word_count',
    nameZh: '首页内容丰富（>300词）',
    nameEn: 'Homepage Content >300 Words',
    passed: wordOk,
    score: wordOk ? 3 : 0,
    maxScore: 3,
    priority: wordOk ? 'passed' : 'warning',
    category: 'content',
    tipsZh: wordOk
      ? `页面约有${wordCount}个词，内容丰富。`
      : `页面仅有约${wordCount}个词。搜索引擎偏好内容丰富的页面，建议首页至少300词，最好500词以上。`,
    tipsEn: wordOk
      ? `Page has approximately ${wordCount} words. Good content density.`
      : `Page has only ~${wordCount} words. Search engines prefer content-rich pages. Aim for at least 300 words, ideally 500+ on the homepage.`,
  })

  const h2Tags = $('h2').length
  const h3Tags = $('h3').length
  const headingOk = h1Tags.length === 1 && h2Tags > 0
  checks.push({
    id: 'heading_hierarchy',
    nameZh: '标题层级结构（H1>H2>H3）',
    nameEn: 'Heading Hierarchy (H1>H2>H3)',
    passed: headingOk,
    score: headingOk ? 3 : 0,
    maxScore: 3,
    priority: headingOk ? 'passed' : 'warning',
    category: 'content',
    tipsZh: headingOk
      ? `标题层级：H1(${h1Tags.length}) H2(${h2Tags}) H3(${h3Tags})，结构合理。`
      : `当前：H1(${h1Tags.length}) H2(${h2Tags}) H3(${h3Tags})。良好的标题层级帮助搜索引擎理解内容结构，确保H2标签存在。`,
    tipsEn: headingOk
      ? `Heading structure: H1(${h1Tags.length}) H2(${h2Tags}) H3(${h3Tags}). Good structure.`
      : `Current: H1(${h1Tags.length}) H2(${h2Tags}) H3(${h3Tags}). Good heading hierarchy helps search engines understand content structure. Ensure H2 tags are present.`,
  })

  const allLinks = $('a[href]')
  const internalLinks = allLinks.filter((_, el) => {
    const href = $(el).attr('href') || ''
    return href.startsWith('/') || href.includes(baseUrl.hostname)
  }).length
  const internalOk = internalLinks >= 5
  checks.push({
    id: 'internal_links',
    nameZh: '内部链接数量（>5个）',
    nameEn: 'Internal Links >5',
    passed: internalOk,
    score: internalOk ? 3 : 0,
    maxScore: 3,
    priority: internalOk ? 'passed' : 'warning',
    category: 'content',
    tipsZh: internalOk
      ? `页面有${internalLinks}个内部链接，内部链接结构良好。`
      : `页面只有${internalLinks}个内部链接。增加内部链接可帮助搜索引擎爬取更多页面，并传递页面权重。`,
    tipsEn: internalOk
      ? `Page has ${internalLinks} internal links. Good internal link structure.`
      : `Page has only ${internalLinks} internal links. Adding more internal links helps search engines crawl more pages and distributes page authority.`,
  })

  const titleWords = titleText.toLowerCase().split(/\s+/).filter(w => w.length > 3)
  let keywordMatches = 0
  titleWords.forEach(word => {
    if (bodyText.toLowerCase().includes(word)) keywordMatches++
  })
  const keywordOk = titleWords.length === 0 || keywordMatches / titleWords.length >= 0.5
  checks.push({
    id: 'keyword_density',
    nameZh: '关键词密度适当',
    nameEn: 'Keyword Density Reasonable',
    passed: keywordOk,
    score: keywordOk ? 3 : 0,
    maxScore: 3,
    priority: keywordOk ? 'passed' : 'warning',
    category: 'content',
    tipsZh: keywordOk
      ? '页面内容与标题关键词相关性良好。'
      : '页面内容与标题关键词相关性不足。确保正文内容包含标题中的核心关键词。',
    tipsEn: keywordOk
      ? 'Page content is well-aligned with title keywords.'
      : 'Page content has low relevance to title keywords. Ensure body content includes core keywords from the title.',
  })

  const lastModified = headers['last-modified'] || ''
  const hasFreshness = lastModified.length > 0
  checks.push({
    id: 'content_freshness',
    nameZh: '内容新鲜度信号',
    nameEn: 'Content Freshness Signal',
    passed: hasFreshness,
    score: hasFreshness ? 3 : 0,
    maxScore: 3,
    priority: hasFreshness ? 'passed' : 'warning',
    category: 'content',
    tipsZh: hasFreshness
      ? `Last-Modified: ${lastModified}`
      : '服务器未返回Last-Modified头信息。定期更新内容并配置正确的HTTP缓存头有助于搜索引擎判断内容新鲜度。',
    tipsEn: hasFreshness
      ? `Last-Modified: ${lastModified}`
      : 'Server does not return Last-Modified headers. Regular content updates and proper HTTP cache headers help search engines evaluate content freshness.',
  })

  // ─── Calculate Scores ────────────────────────────────────────
  const catChecks = (cat: string) => checks.filter(c => c.category === cat)
  const catScore = (cat: string) => catChecks(cat).reduce((sum, c) => sum + c.score, 0)

  const categoryScores = {
    seo: catScore('seo'),
    performance: catScore('performance'),
    technical: catScore('technical'),
    geo: catScore('geo'),
    content: catScore('content'),
  }

  const overallScore = Object.values(categoryScores).reduce((a, b) => a + b, 0)

  // Set priority correctly
  checks.forEach(c => {
    if (!c.passed) {
      if (c.maxScore >= 4) c.priority = 'critical'
      else c.priority = 'warning'
    } else {
      c.priority = 'passed'
    }
  })

  return {
    url,
    platform,
    overallScore,
    categoryScores,
    checks,
    fetchTime,
    audited_at: new Date().toISOString(),
  }
}

import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import type { AuditCheck } from './auditor'

const styles = StyleSheet.create({
  page: { padding: 40, backgroundColor: '#ffffff', fontFamily: 'Helvetica' },
  coverPage: { padding: 40, backgroundColor: '#080b14', color: '#f0f4ff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 8, color: '#f0f4ff' },
  subtitle: { fontSize: 14, color: '#94a3b8', marginBottom: 24 },
  sectionHeader: { fontSize: 16, fontWeight: 'bold', color: '#3b82f6', marginBottom: 12, marginTop: 20 },
  row: { flexDirection: 'row', marginBottom: 8, alignItems: 'center' },
  label: { fontSize: 10, color: '#64748b', width: 120 },
  value: { fontSize: 10, color: '#1e293b', flex: 1 },
  scoreBox: { backgroundColor: '#0f1729', padding: 20, borderRadius: 8, marginBottom: 16, alignItems: 'center' },
  scoreNumber: { fontSize: 64, fontWeight: 'bold', color: '#3b82f6' },
  scoreLabel: { fontSize: 14, color: '#94a3b8', marginTop: 4 },
  categoryRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 8, marginBottom: 4, backgroundColor: '#f8fafc', borderRadius: 4 },
  checkItem: { flexDirection: 'row', padding: 8, marginBottom: 6, borderRadius: 4 },
  checkPassed: { backgroundColor: '#f0fdf4' },
  checkFailed: { backgroundColor: '#fef2f2' },
  checkWarning: { backgroundColor: '#fffbeb' },
  checkName: { fontSize: 10, fontWeight: 'bold', flex: 1 },
  checkTip: { fontSize: 9, color: '#64748b', marginTop: 3, lineHeight: 1.4 },
  badge: { fontSize: 8, padding: '2 6', borderRadius: 10, marginLeft: 8 },
  badgePassed: { backgroundColor: '#dcfce7', color: '#166534' },
  badgeFailed: { backgroundColor: '#fee2e2', color: '#991b1b' },
  badgeWarning: { backgroundColor: '#fef9c3', color: '#854d0e' },
  tipBox: { backgroundColor: '#eff6ff', padding: 12, borderRadius: 6, marginBottom: 8 },
  tipText: { fontSize: 9, color: '#1e40af', lineHeight: 1.5 },
  footer: { position: 'absolute', bottom: 30, left: 40, right: 40, flexDirection: 'row', justifyContent: 'space-between' },
  footerText: { fontSize: 8, color: '#94a3b8' },
  divider: { borderBottomWidth: 1, borderBottomColor: '#e2e8f0', marginVertical: 12 },
  platformBox: { backgroundColor: '#eff6ff', padding: 16, borderRadius: 8, marginBottom: 12 },
  platformTitle: { fontSize: 13, fontWeight: 'bold', color: '#1e40af', marginBottom: 8 },
  platformItem: { fontSize: 9, color: '#334155', marginBottom: 6, lineHeight: 1.4 },
})

function scoreColor(score: number) {
  if (score >= 90) return '#10b981'
  if (score >= 75) return '#3b82f6'
  if (score >= 50) return '#f59e0b'
  return '#ef4444'
}

function scoreLabel(score: number, lang: 'zh' | 'en') {
  if (lang === 'zh') {
    if (score >= 90) return '优秀'
    if (score >= 75) return '表现良好'
    if (score >= 50) return '有待提升'
    return '急需优化'
  }
  if (score >= 90) return 'Excellent'
  if (score >= 75) return 'Good'
  if (score >= 50) return 'Needs Work'
  return 'Poor'
}

const SHOPIFY_TIPS = {
  zh: [
    '在主题liquid文件中添加自定义meta description，避免使用系统默认描述',
    '使用Shopify URL重定向功能管理301跳转，迁移旧产品页时必须操作',
    '在产品页添加Review/Product结构化数据Schema，可在搜索结果展示星级评分',
    '启用Shopify的自动sitemap.xml生成，并在Google Search Console中提交',
    '优化图片文件名（英文关键词+连字符），上传前重命名如：mens-running-shoes-size10.jpg',
    '在Shopify主题设置中开启懒加载（Lazy Loading）减少首屏加载时间',
    '使用Shopify的标准化URL结构，避免在产品URL中使用集合路径前缀',
    '在液态主题文件中添加hreflang标签支持多语言市场',
    '利用Shopify Analytics监控哪些页面有最高的跳出率并优先优化',
    '在Shopify博客发布高质量内容，吸引外链并提升域名权重',
  ],
  en: [
    'Add custom meta descriptions in theme liquid files — avoid default system descriptions',
    'Use Shopify URL redirects for 301 management when migrating old product pages',
    'Add Review/Product structured data schema to product pages to show star ratings in SERPs',
    'Enable Shopify\'s automatic sitemap.xml generation and submit it to Google Search Console',
    'Optimize image filenames with English keywords and hyphens before uploading (e.g., mens-running-shoes.jpg)',
    'Enable lazy loading in Shopify theme settings to reduce initial load time',
    'Use Shopify\'s canonical URL structure — avoid collection path prefixes in product URLs',
    'Add hreflang tags in liquid theme files to support multilingual markets',
    'Use Shopify Analytics to identify high-bounce pages and prioritize their optimization',
    'Publish high-quality content on your Shopify blog to attract backlinks and boost domain authority',
  ],
}

const WORDPRESS_TIPS = {
  zh: [
    '安装Yoast SEO或Rank Math插件，提供全面的on-page SEO控制',
    '设置固定链接结构为/%postname%/，避免使用带数字的URL结构',
    '使用WP Rocket或W3 Total Cache提升速度，开启页面缓存和资源压缩',
    '在functions.php中添加hreflang标签函数或使用WPML插件管理多语言',
    '定期更新WordPress核心、主题和插件，确保安全和性能',
    '安装Imagify或ShortPixel插件自动压缩图片，减少页面大小',
    '使用Cloudflare或AWS CloudFront CDN加速全球访问',
    '开启WordPress的XML Sitemap功能并提交到各搜索引擎',
    '添加Schema Pro或类似插件实现Product、Review等结构化数据',
    '安装Broken Link Checker插件定期检查和修复死链',
  ],
  en: [
    'Install Yoast SEO or Rank Math plugin for comprehensive on-page SEO control',
    'Set permalink structure to /%postname%/ — avoid numeric URL structures',
    'Use WP Rocket or W3 Total Cache for speed — enable page caching and asset compression',
    'Add hreflang functions in functions.php or use WPML plugin for multilingual management',
    'Regularly update WordPress core, themes, and plugins for security and performance',
    'Install Imagify or ShortPixel for automatic image compression and size reduction',
    'Use Cloudflare or AWS CloudFront CDN for global access acceleration',
    'Enable WordPress XML Sitemap and submit to all major search engines',
    'Add Schema Pro or similar plugin for Product, Review, and other structured data',
    'Install Broken Link Checker to regularly audit and fix dead links',
  ],
}

const GEO_TIPS = {
  zh: [
    'hreflang实施指南：为每种语言/地区添加<link rel="alternate" hreflang="en-US" href="..."/>标签',
    '在Google Search Console的"旧版国际化定位"中设置目标国家/地区',
    '使用本地CDN节点（如Cloudflare）减少目标市场的延迟',
    '在产品页面的Schema中包含priceCurrency字段，标注接受的货币类型',
    '为不同市场创建独立的子域名（en.store.com）或子目录（store.com/en/）',
    '在Google Merchant Center中设置目标国家和货币，实现购物广告本地化',
    '添加多货币切换功能，展示用户本地货币价格（可使用实时汇率API）',
    '本地化页面不仅仅是翻译文字，还需要本地化日期格式、电话格式、地址格式',
  ],
  en: [
    'Hreflang implementation: Add <link rel="alternate" hreflang="en-US" href="..."/> for each language/region',
    'Set target country in Google Search Console under "Legacy International Targeting"',
    'Use local CDN nodes (e.g., Cloudflare) to reduce latency for target markets',
    'Include priceCurrency field in product page Schema to specify accepted currencies',
    'Create separate subdomains (en.store.com) or subdirectories (store.com/en/) for different markets',
    'Configure target countries and currencies in Google Merchant Center for localized Shopping Ads',
    'Add multi-currency switching to show local currency prices (use real-time exchange rate API)',
    'Localization goes beyond text translation — localize date formats, phone formats, and address formats',
  ],
}

interface PDFProps {
  audit: { id: string; url: string; platform: string; score: number; createdAt: Date }
  checks: AuditCheck[]
  categoryScores: Record<string, number>
  lang: 'zh' | 'en'
}

export function createPDFDocument({ audit, checks, categoryScores, lang }: PDFProps) {
  const catMax = { seo: 25, performance: 20, technical: 20, geo: 20, content: 15 }
  const catNames = lang === 'zh'
    ? { seo: 'SEO基础', performance: '性能速度', technical: '技术指标', geo: 'GEO本地化', content: '内容质量' }
    : { seo: 'SEO Basics', performance: 'Performance', technical: 'Technical', geo: 'GEO / Local SEO', content: 'Content Quality' }

  const critical = checks.filter(c => !c.passed && c.priority === 'critical')
  const warnings = checks.filter(c => !c.passed && c.priority === 'warning')
  const passed = checks.filter(c => c.passed)

  const platformTips = audit.platform === 'shopify' ? SHOPIFY_TIPS : WORDPRESS_TIPS
  const platformTitle = lang === 'zh'
    ? (audit.platform === 'shopify' ? 'Shopify专项优化建议' : audit.platform === 'wordpress' ? 'WordPress专项优化建议' : '独立站优化建议')
    : (audit.platform === 'shopify' ? 'Shopify-Specific SEO Tips' : audit.platform === 'wordpress' ? 'WordPress-Specific SEO Tips' : 'Store SEO Tips')

  const categories = ['seo', 'performance', 'technical', 'geo', 'content'] as const

  return function PDFDocument() {
    return React.createElement(Document, null,
      // Cover Page
      React.createElement(Page, { size: 'A4', style: styles.coverPage },
        React.createElement(View, { style: { flex: 1, justifyContent: 'center' } },
          React.createElement(Text, { style: { fontSize: 12, color: '#94a3b8', marginBottom: 32 } },
            'SEO Radar X'
          ),
          React.createElement(Text, { style: styles.title },
            lang === 'zh' ? 'SEO审计报告' : 'SEO Audit Report'
          ),
          React.createElement(Text, { style: { fontSize: 14, color: '#94a3b8', marginBottom: 8 } },
            lang === 'zh' ? 'SEO Audit Report' : 'SEO审计报告'
          ),
          React.createElement(View, { style: { marginTop: 40, marginBottom: 40 } },
            React.createElement(View, { style: { alignItems: 'center', marginBottom: 24 } },
              React.createElement(Text, { style: { fontSize: 80, fontWeight: 'bold', color: scoreColor(audit.score) } },
                String(audit.score)
              ),
              React.createElement(Text, { style: { fontSize: 16, color: '#94a3b8', marginTop: 4 } },
                '/100 — ' + scoreLabel(audit.score, lang)
              ),
            ),
            React.createElement(View, { style: { borderTopWidth: 1, borderTopColor: '#1e3a5f', paddingTop: 20 } },
              React.createElement(Text, { style: { fontSize: 11, color: '#94a3b8', marginBottom: 8 } },
                (lang === 'zh' ? '网站 / Site: ' : 'Site: ') + audit.url
              ),
              React.createElement(Text, { style: { fontSize: 11, color: '#94a3b8', marginBottom: 8 } },
                (lang === 'zh' ? '平台 / Platform: ' : 'Platform: ') + audit.platform
              ),
              React.createElement(Text, { style: { fontSize: 11, color: '#94a3b8' } },
                (lang === 'zh' ? '检测日期 / Date: ' : 'Date: ') + new Date(audit.createdAt).toLocaleDateString()
              ),
            ),
          ),
        ),
        React.createElement(View, { style: styles.footer },
          React.createElement(Text, { style: styles.footerText }, 'SEO Radar X'),
          React.createElement(Text, { style: styles.footerText }, '© ' + new Date().getFullYear()),
        ),
      ),

      // Executive Summary
      React.createElement(Page, { size: 'A4', style: styles.page },
        React.createElement(Text, { style: styles.sectionHeader },
          lang === 'zh' ? '执行摘要 / Executive Summary' : 'Executive Summary'
        ),
        React.createElement(View, { style: { flexDirection: 'row', marginBottom: 16 } },
          React.createElement(View, { style: { flex: 1, marginRight: 8, backgroundColor: '#fef2f2', padding: 12, borderRadius: 6 } },
            React.createElement(Text, { style: { fontSize: 24, fontWeight: 'bold', color: '#ef4444' } }, String(critical.length)),
            React.createElement(Text, { style: { fontSize: 10, color: '#64748b' } }, lang === 'zh' ? '严重问题' : 'Critical Issues'),
          ),
          React.createElement(View, { style: { flex: 1, marginRight: 8, backgroundColor: '#fffbeb', padding: 12, borderRadius: 6 } },
            React.createElement(Text, { style: { fontSize: 24, fontWeight: 'bold', color: '#f59e0b' } }, String(warnings.length)),
            React.createElement(Text, { style: { fontSize: 10, color: '#64748b' } }, lang === 'zh' ? '警告项' : 'Warnings'),
          ),
          React.createElement(View, { style: { flex: 1, backgroundColor: '#f0fdf4', padding: 12, borderRadius: 6 } },
            React.createElement(Text, { style: { fontSize: 24, fontWeight: 'bold', color: '#10b981' } }, String(passed.length)),
            React.createElement(Text, { style: { fontSize: 10, color: '#64748b' } }, lang === 'zh' ? '通过项' : 'Passed'),
          ),
        ),
        React.createElement(Text, { style: { ...styles.sectionHeader, fontSize: 13 } },
          lang === 'zh' ? '各维度评分' : 'Category Scores'
        ),
        ...categories.map(cat =>
          React.createElement(View, { key: cat, style: styles.categoryRow },
            React.createElement(Text, { style: { fontSize: 10, flex: 1, color: '#334155' } },
              catNames[cat]
            ),
            React.createElement(Text, { style: { fontSize: 10, color: scoreColor(Math.round((categoryScores[cat] / catMax[cat]) * 100)), fontWeight: 'bold' } },
              `${categoryScores[cat]}/${catMax[cat]}`
            ),
          )
        ),
        React.createElement(View, { style: styles.divider }),
        React.createElement(Text, { style: { ...styles.sectionHeader, fontSize: 13 } },
          lang === 'zh' ? '最需优先修复的问题' : 'Top Issues to Fix'
        ),
        ...critical.slice(0, 3).map((c, i) =>
          React.createElement(View, { key: c.id, style: { marginBottom: 8 } },
            React.createElement(Text, { style: { fontSize: 10, fontWeight: 'bold', color: '#ef4444' } },
              `${i + 1}. ${lang === 'zh' ? c.nameZh : c.nameEn}`
            ),
            React.createElement(Text, { style: { fontSize: 9, color: '#64748b', marginTop: 2 } },
              lang === 'zh' ? c.tipsZh : c.tipsEn
            ),
          )
        ),
        React.createElement(View, { style: styles.footer },
          React.createElement(Text, { style: styles.footerText }, lang === 'zh' ? '执行摘要' : 'Executive Summary'),
          React.createElement(Text, { style: styles.footerText }, '2 / 10'),
        ),
      ),

      // Category Detail Pages
      ...categories.map((cat, pageIdx) => {
        const catChecks = checks.filter(c => c.category === cat)
        return React.createElement(Page, { key: cat, size: 'A4', style: styles.page },
          React.createElement(Text, { style: styles.sectionHeader },
            `${catNames[cat]} — ${categoryScores[cat]}/${catMax[cat]}`
          ),
          ...catChecks.map(c =>
            React.createElement(View, {
              key: c.id,
              style: [styles.checkItem, c.passed ? styles.checkPassed : c.priority === 'critical' ? styles.checkFailed : styles.checkWarning]
            },
              React.createElement(View, { style: { flex: 1 } },
                React.createElement(View, { style: { flexDirection: 'row', alignItems: 'center' } },
                  React.createElement(Text, { style: { fontSize: 10 } }, c.passed ? '✓' : c.priority === 'critical' ? '✗' : '⚠'),
                  React.createElement(Text, { style: { ...styles.checkName, marginLeft: 4 } },
                    `${lang === 'zh' ? c.nameZh : c.nameEn} (${c.score}/${c.maxScore})`
                  ),
                ),
                React.createElement(Text, { style: styles.checkTip },
                  lang === 'zh' ? c.tipsZh : c.tipsEn
                ),
              ),
            )
          ),
          React.createElement(View, { style: styles.footer },
            React.createElement(Text, { style: styles.footerText }, catNames[cat]),
            React.createElement(Text, { style: styles.footerText }, `${pageIdx + 3} / 10`),
          ),
        )
      }),

      // Platform Tips
      React.createElement(Page, { size: 'A4', style: styles.page },
        React.createElement(Text, { style: styles.sectionHeader }, platformTitle),
        React.createElement(View, { style: styles.platformBox },
          ...(platformTips[lang]).map((tip, i) =>
            React.createElement(Text, { key: i, style: styles.platformItem },
              `${i + 1}. ${tip}`
            )
          )
        ),
        React.createElement(View, { style: styles.footer },
          React.createElement(Text, { style: styles.footerText }, platformTitle),
          React.createElement(Text, { style: styles.footerText }, '8 / 10'),
        ),
      ),

      // GEO Tips
      React.createElement(Page, { size: 'A4', style: styles.page },
        React.createElement(Text, { style: styles.sectionHeader },
          lang === 'zh' ? '跨境卖家GEO优化指南' : 'Cross-border GEO Optimization Guide'
        ),
        React.createElement(View, { style: styles.platformBox },
          ...(GEO_TIPS[lang]).map((tip, i) =>
            React.createElement(Text, { key: i, style: styles.platformItem },
              `${i + 1}. ${tip}`
            )
          )
        ),
        React.createElement(View, { style: styles.footer },
          React.createElement(Text, { style: styles.footerText }, lang === 'zh' ? 'GEO优化指南' : 'GEO Guide'),
          React.createElement(Text, { style: styles.footerText }, '9 / 10'),
        ),
      ),

      // Appendix
      React.createElement(Page, { size: 'A4', style: styles.page },
        React.createElement(Text, { style: styles.sectionHeader },
          lang === 'zh' ? '附录：SEO术语对照表' : 'Appendix: SEO Glossary'
        ),
        React.createElement(View, null,
          ...[
            ['搜索引擎优化', 'SEO (Search Engine Optimization)'],
            ['标题标签', 'Title Tag'],
            ['元描述', 'Meta Description'],
            ['多语言标签', 'Hreflang Tags'],
            ['结构化数据', 'Structured Data / Schema Markup'],
            ['规范链接', 'Canonical URL'],
            ['网站地图', 'Sitemap'],
            ['反向链接', 'Backlinks'],
            ['点击率', 'CTR (Click-Through Rate)'],
            ['地理定向SEO', 'GEO / Local SEO'],
          ].map(([zh, en], i) =>
            React.createElement(View, { key: i, style: { flexDirection: 'row', padding: '4 0', borderBottomWidth: 1, borderBottomColor: '#f1f5f9' } },
              React.createElement(Text, { style: { fontSize: 10, flex: 1, color: '#334155' } }, zh),
              React.createElement(Text, { style: { fontSize: 10, flex: 1, color: '#64748b' } }, en),
            )
          )
        ),
        React.createElement(View, { style: styles.footer },
          React.createElement(Text, { style: styles.footerText }, 'Powered by SEO Radar X'),
          React.createElement(Text, { style: styles.footerText }, '10 / 10'),
        ),
      ),
    )
  }
}

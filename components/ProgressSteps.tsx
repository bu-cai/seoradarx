'use client'

interface Props {
  step: number
  locale: string
}

const steps = {
  zh: [
    '正在获取页面数据...',
    '检测SEO基础指标...',
    '分析性能数据...',
    '扫描技术配置...',
    '检测GEO本地化...',
    '评估内容质量...',
    '生成评分报告...',
  ],
  en: [
    'Fetching page data...',
    'Checking SEO basics...',
    'Analyzing performance...',
    'Scanning technical setup...',
    'Checking GEO signals...',
    'Evaluating content quality...',
    'Generating report...',
  ],
}

// Educational tips shown during each step — "等你等的值" 设计
const tips = {
  zh: [
    '💡 68% 的 Shopify 独立站缺少正确的 meta description，这直接影响谷歌搜索的点击率',
    '💡 正确的 H1 标签能让谷歌更快理解您的页面主题，是最容易修复且效果显著的优化项',
    '💡 页面加载每慢 1 秒，转化率下降约 7%，速度是 SEO 和销售的双重关键',
    '💡 只有 28% 的跨境独立站正确配置了 hreflang 标签，这是国际化 SEO 最容易失分的地方',
    '💡 在产品页添加 geo.region 地理定向标签，可帮助谷歌识别您的目标市场，提升海外排名',
    '💡 超过 300 词的产品页面比短页面获得约 3 倍以上的自然搜索流量',
    '💡 正在根据您的平台类型（Shopify / WordPress）生成个性化优化建议...',
  ],
  en: [
    '💡 68% of Shopify stores are missing proper meta descriptions — a quick fix that boosts click-through rates',
    '💡 A correct H1 tag helps Google understand your page topic faster. Easy to fix, big impact.',
    '💡 Every 1-second delay in page load reduces conversions by ~7%. Speed matters for both SEO and sales.',
    '💡 Only 28% of cross-border stores have correct hreflang tags — the #1 missed GEO signal',
    '💡 Adding geo.region meta tags tells Google exactly which country to show your store in',
    '💡 Product pages with 300+ words get ~3x more organic traffic than short pages',
    '💡 Generating personalized recommendations based on your platform (Shopify / WordPress)...',
  ],
}

export default function ProgressSteps({ step, locale }: Props) {
  const msgs = steps[locale as 'zh' | 'en'] || steps.zh
  const tipList = tips[locale as 'zh' | 'en'] || tips.zh
  const pct = Math.round((step / msgs.length) * 100)
  const currentTip = tipList[Math.min(step, tipList.length - 1)]
  const currentMsg = msgs[Math.min(step, msgs.length - 1)]

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Progress bar */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-[#94a3b8]">{currentMsg}</span>
        <span className="text-sm font-mono text-blue-400">{pct}%</span>
      </div>
      <div className="h-2 bg-[#1e3a5f] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Step dots */}
      <div className="flex gap-1.5 mt-3 mb-5 justify-center">
        {msgs.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 min-w-5 rounded-full transition-all duration-300 ${
              i < step ? 'bg-blue-500' : i === step ? 'bg-blue-400 animate-pulse' : 'bg-[#1e3a5f]'
            }`}
          />
        ))}
      </div>

      {/* Educational tip card */}
      <div className="bg-blue-950/30 border border-blue-800/30 rounded-xl px-5 py-4 transition-all duration-500">
        <p className="text-sm text-blue-200 leading-relaxed">{currentTip}</p>
      </div>
    </div>
  )
}

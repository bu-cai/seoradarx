'use client'
import { useState } from 'react'

interface Props {
  step: number
  locale: string
  auditId?: string // available after audit completes, for email send
}

const steps = {
  zh: ['正在获取页面数据...', '检测SEO基础指标...', '分析性能数据...', '扫描技术配置...', '检测GEO本地化...', '评估内容质量...', '生成评分报告...'],
  en: ['Fetching page data...', 'Checking SEO basics...', 'Analyzing performance...', 'Scanning technical setup...', 'Checking GEO signals...', 'Evaluating content quality...', 'Generating report...'],
}

// Data-driven tips — builds credibility while waiting
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
  const zh = locale === 'zh'
  const msgs = steps[zh ? 'zh' : 'en']
  const tipList = tips[zh ? 'zh' : 'en']
  const pct = Math.round((step / msgs.length) * 100)
  const currentTip = tipList[Math.min(step, tipList.length - 1)]
  const currentMsg = msgs[Math.min(step, msgs.length - 1)]

  // Email capture during wait — shown after step 2 (user committed, highest intent moment)
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [emailDismissed, setEmailDismissed] = useState(false)
  const showEmailCapture = step >= 2 && !emailSent && !emailDismissed

  async function handleEmailCapture(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    // Store email in localStorage for post-audit send
    localStorage.setItem('pendingReportEmail', email.trim())
    setEmailSent(true)
  }

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
          <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
            i < step ? 'bg-blue-500' : i === step ? 'bg-blue-400 animate-pulse' : 'bg-[#1e3a5f]'
          }`} />
        ))}
      </div>

      {/* Email capture — highest intent moment */}
      {showEmailCapture ? (
        <div className="bg-[#0f1729] border border-blue-800/40 rounded-xl px-5 py-4 mb-3 animate-fade-up">
          <p className="text-sm text-[#f0f4ff] font-medium mb-1">
            📧 {zh ? '把报告发到您的邮箱？' : 'Send the report to your inbox?'}
          </p>
          <p className="text-xs text-[#64748b] mb-3">
            {zh ? '方便随时查看，或直接转发给您的开发者' : 'Easy to review later or forward to your developer'}
          </p>
          <form onSubmit={handleEmailCapture} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={zh ? 'your@email.com' : 'your@email.com'}
              className="flex-1 bg-[#162035] border border-[#1e3a5f] rounded-lg px-3 py-2 text-xs text-[#f0f4ff] placeholder-[#4a5568] focus:outline-none focus:border-blue-500 min-w-0"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-3 py-2 text-xs font-semibold whitespace-nowrap transition-colors"
            >
              {zh ? '发送' : 'Send'}
            </button>
          </form>
          <button
            onClick={() => setEmailDismissed(true)}
            className="mt-2 text-[10px] text-[#4a5568] hover:text-[#64748b] w-full text-center"
          >
            {zh ? '稍后再说' : 'Skip for now'}
          </button>
        </div>
      ) : emailSent ? (
        <div className="bg-emerald-950/30 border border-emerald-800/30 rounded-xl px-5 py-3 mb-3 text-center">
          <p className="text-sm text-emerald-400">✓ {zh ? '好的！报告生成后会发到您的邮箱' : 'Got it! Report will be sent when ready'}</p>
        </div>
      ) : null}

      {/* Educational tip card */}
      <div className="bg-blue-950/30 border border-blue-800/30 rounded-xl px-5 py-4 transition-all duration-500">
        <p className="text-sm text-blue-200 leading-relaxed">{currentTip}</p>
      </div>
    </div>
  )
}

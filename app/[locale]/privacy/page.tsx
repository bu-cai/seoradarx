import type { Metadata } from 'next'
import Link from 'next/link'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const zh = params.locale === 'zh'
  return {
    title: zh ? '隐私政策' : 'Privacy Policy',
    description: zh
      ? 'SEO审计专家的隐私政策 — 了解我们如何收集、使用和保护您的数据。'
      : 'Privacy Policy for SEO Audit Pro — how we collect, use, and protect your data.',
    robots: { index: false, follow: false },
  }
}

export default function PrivacyPage({ params }: { params: { locale: string } }) {
  const zh = params.locale === 'zh'
  const locale = params.locale

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-[#1e3a5f]">
        <Link href={`/${locale}`} className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">S</div>
          <div>
            <div className="font-bold text-[#f0f4ff] text-sm leading-none group-hover:text-blue-400 transition-colors">
              {zh ? 'SEO审计专家' : 'SEO Audit Pro'}
            </div>
            <div className="text-xs text-[#94a3b8] mt-0.5">{zh ? '跨境独立站优化工具' : 'Cross-border Store Optimizer'}</div>
          </div>
        </Link>
        <LanguageSwitcher />
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-[#f0f4ff] mb-2">
          {zh ? '隐私政策' : 'Privacy Policy'}
        </h1>
        <p className="text-sm text-[#64748b] mb-10">
          {zh ? '最后更新：2025年1月' : 'Last updated: January 2025'}
        </p>

        <div className="space-y-8 text-[#94a3b8] text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-[#f0f4ff] mb-3">
              {zh ? '1. 信息收集' : '1. Information We Collect'}
            </h2>
            <p>
              {zh
                ? '当您使用SEO审计专家时，我们会收集您提交的网站URL、您的IP地址（仅用于每日访问频率限制）、以及基本的访问日志数据。我们不收集任何个人身份信息，无需注册，也不追踪您的浏览行为。'
                : 'When you use SEO Audit Pro, we collect the website URL you submit, your IP address (used only for daily rate limiting), and basic access logs. We do not collect personally identifiable information, require no registration, and do not track your browsing behavior.'}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#f0f4ff] mb-3">
              {zh ? '2. 信息使用' : '2. How We Use Information'}
            </h2>
            <p>
              {zh
                ? '您提交的URL仅用于执行SEO检测分析。IP地址用于实施每日3次的免费使用限制，24小时后自动重置。审计结果会在我们的数据库中缓存24小时，以避免对同一网站重复检测。我们绝不会将您的信息出售给第三方。'
                : 'Submitted URLs are used solely to perform SEO analysis. IP addresses are used to enforce the daily 3-audit free limit and reset after 24 hours. Audit results are cached in our database for 24 hours to avoid duplicate analysis. We never sell your information to third parties.'}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#f0f4ff] mb-3">
              {zh ? '3. 付款信息' : '3. Payment Information'}
            </h2>
            <p>
              {zh
                ? '如果您购买PDF报告，支付流程由Stripe完整处理。我们不存储您的信用卡号或任何支付信息。Stripe符合PCI DSS安全标准，请查阅Stripe的隐私政策了解详情。'
                : 'If you purchase a PDF report, payments are processed entirely by Stripe. We never store credit card numbers or any payment information. Stripe is PCI-DSS compliant — see Stripe\'s Privacy Policy for details.'}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#f0f4ff] mb-3">
              {zh ? '4. Cookies' : '4. Cookies'}
            </h2>
            <p>
              {zh
                ? '本站仅使用功能性必要Cookie，不使用任何追踪Cookie或广告Cookie。我们不接入Google Analytics或其他第三方分析服务。'
                : 'We use only functionally necessary cookies. No tracking cookies or advertising cookies are used. We do not integrate Google Analytics or other third-party analytics services.'}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#f0f4ff] mb-3">
              {zh ? '5. 数据安全' : '5. Data Security'}
            </h2>
            <p>
              {zh
                ? '所有数据传输均通过HTTPS加密。我们采取合理的技术措施保护您的数据，但请注意互联网传输不存在绝对的安全保障。'
                : 'All data transmission is encrypted via HTTPS. We take reasonable technical measures to protect your data, but note that no internet transmission is absolutely secure.'}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#f0f4ff] mb-3">
              {zh ? '6. 您的权利' : '6. Your Rights'}
            </h2>
            <p>
              {zh
                ? '由于我们不收集个人身份信息，数据删除请求通常不适用。如果您希望删除与您IP地址相关的检测记录，请发送邮件至 support@seoauditpro.com，我们将在7个工作日内处理。'
                : 'Since we do not collect personally identifiable information, most data deletion requests are not applicable. If you wish to delete audit records associated with your IP address, email support@seoauditpro.com and we will process it within 7 business days.'}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#f0f4ff] mb-3">
              {zh ? '7. 联系我们' : '7. Contact'}
            </h2>
            <p>
              {zh
                ? '如有任何隐私相关问题，请通过以下方式联系我们：'
                : 'For any privacy-related questions, please contact us at:'}
            </p>
            <a
              href="mailto:support@seoauditpro.com"
              className="text-blue-400 hover:text-blue-300 transition-colors mt-2 inline-block"
            >
              support@seoauditpro.com
            </a>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-[#1e3a5f]">
          <Link
            href={`/${locale}`}
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            ← {zh ? '返回首页' : 'Back to Home'}
          </Link>
        </div>
      </div>

      <footer className="border-t border-[#1e3a5f] px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-[#64748b]">
            <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">S</div>
            SEO Audit Pro · {new Date().getFullYear()}
          </div>
          <div className="flex gap-6">
            <Link href={`/${locale}/privacy`} className="text-xs text-blue-400">
              {zh ? '隐私政策' : 'Privacy Policy'}
            </Link>
            <Link href={`/${locale}/terms`} className="text-xs text-[#64748b] hover:text-[#94a3b8] transition-colors">
              {zh ? '服务条款' : 'Terms of Service'}
            </Link>
            <a href="mailto:support@seoauditpro.com" className="text-xs text-[#64748b] hover:text-[#94a3b8] transition-colors">
              {zh ? '联系我们' : 'Contact Us'}
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

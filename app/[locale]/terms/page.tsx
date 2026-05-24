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
    title: zh ? '服务条款' : 'Terms of Service',
    description: zh
      ? 'SEO审计专家服务条款 — 使用本服务前请阅读以下条款。'
      : 'Terms of Service for SEO Audit Pro — please read before using our service.',
    robots: { index: false, follow: false },
  }
}

export default function TermsPage({ params }: { params: { locale: string } }) {
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
          {zh ? '服务条款' : 'Terms of Service'}
        </h1>
        <p className="text-sm text-[#64748b] mb-10">
          {zh ? '最后更新：2025年1月' : 'Last updated: January 2025'}
        </p>

        <div className="space-y-8 text-[#94a3b8] text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-[#f0f4ff] mb-3">
              {zh ? '1. 服务说明' : '1. Service Description'}
            </h2>
            <p>
              {zh
                ? 'SEO审计专家（seoradarx.com）提供基于网络的SEO检测与分析服务，适用于Shopify、WordPress等独立站平台。免费版每日可检测3次，付费版提供完整PDF报告下载服务。'
                : 'SEO Audit Pro (seoradarx.com) provides web-based SEO analysis services for Shopify, WordPress, and other e-commerce platforms. The free tier allows 3 audits per day; the paid tier includes downloadable PDF reports.'}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#f0f4ff] mb-3">
              {zh ? '2. 使用条件' : '2. Acceptable Use'}
            </h2>
            <p className="mb-3">
              {zh
                ? '使用本服务时，您同意：'
                : 'By using this service, you agree to:'}
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#94a3b8]">
              <li>{zh ? '仅对您拥有或有权检测的网站进行审计' : 'Only audit websites you own or have permission to analyze'}</li>
              <li>{zh ? '不得使用自动化工具绕过访问频率限制' : 'Not use automated tools to circumvent rate limits'}</li>
              <li>{zh ? '不得将本服务用于任何非法或有害目的' : 'Not use the service for any illegal or harmful purposes'}</li>
              <li>{zh ? '不得尝试攻击、干扰或破坏本服务的正常运行' : 'Not attempt to attack, interfere with, or disrupt the service'}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#f0f4ff] mb-3">
              {zh ? '3. 免责声明' : '3. Disclaimer of Warranties'}
            </h2>
            <p>
              {zh
                ? '本服务按"现状"提供，不作任何明示或默示的保证。SEO审计结果仅供参考，实际SEO效果受多种因素影响，我们不保证检测结果的完整性、准确性或对您网站排名的影响。'
                : 'This service is provided "as is" without any express or implied warranties. SEO audit results are for reference only. Actual SEO outcomes are affected by many factors; we make no guarantees regarding the completeness, accuracy, or impact on your site\'s rankings.'}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#f0f4ff] mb-3">
              {zh ? '4. 责任限制' : '4. Limitation of Liability'}
            </h2>
            <p>
              {zh
                ? '在法律允许的最大范围内，SEO审计专家及其团队对因使用或无法使用本服务而导致的任何直接、间接、附带或后果性损害不承担责任，包括但不限于业务损失、收入损失或数据丢失。'
                : 'To the maximum extent permitted by law, SEO Audit Pro and its team shall not be liable for any direct, indirect, incidental, or consequential damages arising from use or inability to use the service, including but not limited to loss of business, revenue, or data.'}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#f0f4ff] mb-3">
              {zh ? '5. 付款与退款' : '5. Payments & Refunds'}
            </h2>
            <p>
              {zh
                ? 'PDF报告购买（¥68/次或$9.99/次）为一次性付款，支付成功后立即提供下载。如PDF生成失败，我们将全额退款。由于数字内容的特殊性，非技术原因导致的退款请求将不予受理。如有争议，请联系 support@seoradarx.com。'
                : 'PDF report purchases (¥68 or $9.99 per report) are one-time payments with immediate download access after payment. If PDF generation fails, a full refund will be issued. Due to the nature of digital content, refund requests for non-technical reasons will not be accepted. For disputes, contact support@seoradarx.com.'}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#f0f4ff] mb-3">
              {zh ? '6. 知识产权' : '6. Intellectual Property'}
            </h2>
            <p>
              {zh
                ? '本服务的所有内容、代码、设计和品牌标识均属于SEO审计专家所有。您可以将生成的审计报告用于个人或商业用途，但不得转售或将报告作为独立产品进行分发。'
                : 'All content, code, design, and branding of this service belongs to SEO Audit Pro. You may use generated audit reports for personal or commercial purposes, but may not resell or distribute them as standalone products.'}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#f0f4ff] mb-3">
              {zh ? '7. 条款变更' : '7. Changes to Terms'}
            </h2>
            <p>
              {zh
                ? '我们保留随时修改本条款的权利。重大变更将通过本页面更新"最后更新"日期进行通知。继续使用本服务即表示您接受更新后的条款。'
                : 'We reserve the right to modify these terms at any time. Material changes will be communicated by updating the "Last updated" date on this page. Continued use of the service constitutes acceptance of the updated terms.'}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#f0f4ff] mb-3">
              {zh ? '8. 联系我们' : '8. Contact'}
            </h2>
            <p className="mb-2">
              {zh
                ? '如有任何服务相关问题，请联系：'
                : 'For any service-related questions, please contact:'}
            </p>
            <a
              href="mailto:support@seoradarx.com"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              support@seoradarx.com
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
            <Link href={`/${locale}/privacy`} className="text-xs text-[#64748b] hover:text-[#94a3b8] transition-colors">
              {zh ? '隐私政策' : 'Privacy Policy'}
            </Link>
            <Link href={`/${locale}/terms`} className="text-xs text-blue-400">
              {zh ? '服务条款' : 'Terms of Service'}
            </Link>
            <a href="mailto:support@seoradarx.com" className="text-xs text-[#64748b] hover:text-[#94a3b8] transition-colors">
              {zh ? '联系我们' : 'Contact Us'}
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

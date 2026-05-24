import nodemailer from 'nodemailer'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://seoauditpro.com'

function getTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })
}

function scoreColor(score: number) {
  if (score >= 90) return '#10b981'
  if (score >= 75) return '#3b82f6'
  if (score >= 50) return '#f59e0b'
  return '#ef4444'
}

function scoreGrade(score: number, zh: boolean) {
  if (score >= 90) return zh ? '优秀' : 'Excellent'
  if (score >= 75) return zh ? '表现良好' : 'Good'
  if (score >= 50) return zh ? '有待提升' : 'Needs Work'
  return zh ? '急需优化' : 'Poor'
}

interface AuditCheck {
  id: string
  nameZh: string
  nameEn: string
  passed: boolean
  priority: string
  tipsZh?: string
  tipsEn?: string
}

interface SendReportOptions {
  to: string
  locale: string
  auditId: string
  url: string
  score: number
  checks: AuditCheck[]
  categoryScores: Record<string, number>
}

export async function sendReportEmail(opts: SendReportOptions) {
  const { to, locale, auditId, url, score, checks, categoryScores } = opts
  const zh = locale === 'zh'

  const criticals = checks.filter(c => !c.passed && c.priority === 'critical')
  const warnings  = checks.filter(c => !c.passed && c.priority === 'warning')
  const topIssues = [...criticals, ...warnings].slice(0, 3)
  const passedCount = checks.filter(c => c.passed).length

  const reportUrl = `${BASE_URL}/${locale}/results/${auditId}`
  const color = scoreColor(score)
  const grade = scoreGrade(score, zh)

  // Category rows
  const catLabels: Record<string, { zh: string; en: string }> = {
    seo:         { zh: 'SEO基础', en: 'SEO Basics' },
    performance: { zh: '性能速度', en: 'Performance' },
    technical:   { zh: '技术指标', en: 'Technical' },
    geo:         { zh: 'GEO本地化', en: 'GEO / Intl' },
    content:     { zh: '内容质量', en: 'Content' },
  }
  const catMax: Record<string, number> = { seo: 25, performance: 20, technical: 20, geo: 20, content: 15 }

  const catRows = Object.entries(categoryScores).map(([cat, val]) => {
    const pct = Math.round((val / (catMax[cat] || 20)) * 100)
    const barColor = pct >= 70 ? '#10b981' : pct >= 40 ? '#f59e0b' : '#ef4444'
    const label = catLabels[cat]?.[zh ? 'zh' : 'en'] || cat
    return `
      <tr>
        <td style="padding:4px 0;color:#64748b;font-size:12px;width:90px;">${label}</td>
        <td style="padding:4px 8px;">
          <div style="background:#e2e8f0;border-radius:4px;height:8px;overflow:hidden;">
            <div style="background:${barColor};width:${pct}%;height:8px;border-radius:4px;"></div>
          </div>
        </td>
        <td style="padding:4px 0;color:#1e293b;font-size:12px;font-weight:600;width:50px;text-align:right;">
          ${val}/${catMax[cat] || 20}${zh ? '分' : 'pts'}
        </td>
      </tr>`
  }).join('')

  // Top issues
  const issueRows = topIssues.map((issue, i) => {
    const isCritical = issue.priority === 'critical'
    const badge = isCritical
      ? `<span style="background:#fef2f2;color:#ef4444;font-size:11px;padding:2px 8px;border-radius:12px;font-weight:600;">${zh ? '严重' : 'Critical'}</span>`
      : `<span style="background:#fffbeb;color:#d97706;font-size:11px;padding:2px 8px;border-radius:12px;font-weight:600;">${zh ? '警告' : 'Warning'}</span>`
    const name = zh ? issue.nameZh : issue.nameEn
    const tip  = zh ? issue.tipsZh : issue.tipsEn
    return `
      <div style="margin-bottom:12px;padding:14px;background:#f8fafc;border-left:3px solid ${isCritical ? '#ef4444' : '#f59e0b'};border-radius:0 8px 8px 0;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
          <span style="color:#94a3b8;font-size:13px;font-weight:700;">${i + 1}</span>
          ${badge}
          <span style="font-size:13px;font-weight:600;color:#1e293b;">${name}</span>
        </div>
        ${tip ? `<p style="margin:0;font-size:12px;color:#64748b;line-height:1.5;">💡 ${tip}</p>` : ''}
      </div>`
  }).join('')

  const subject = zh
    ? `您的独立站SEO报告：${url} 评分 ${score}/100`
    : `Your SEO Audit Report: ${url} — Score ${score}/100`

  const html = `
<!DOCTYPE html>
<html lang="${zh ? 'zh-CN' : 'en'}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<div style="max-width:600px;margin:32px auto;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

  <!-- Header -->
  <div style="background:#080b14;padding:20px 28px;display:flex;align-items:center;gap:12px;">
    <div style="width:32px;height:32px;background:#2563eb;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;color:white;font-weight:900;font-size:16px;text-align:center;line-height:32px;">S</div>
    <span style="color:#f0f4ff;font-weight:700;font-size:16px;">${zh ? 'SEO审计专家' : 'SEO Audit Pro'}</span>
  </div>

  <!-- Score Hero -->
  <div style="background:#ffffff;padding:32px 28px;text-align:center;border-bottom:1px solid #e2e8f0;">
    <p style="margin:0 0 4px;font-size:13px;color:#94a3b8;">${zh ? '检测网站' : 'Audited Site'}</p>
    <p style="margin:0 0 24px;font-size:14px;color:#475569;font-weight:600;word-break:break-all;">${url}</p>
    <div style="display:inline-block;width:110px;height:110px;border-radius:50%;border:6px solid ${color};line-height:98px;text-align:center;margin-bottom:12px;">
      <span style="font-size:40px;font-weight:900;color:${color};">${score}</span>
    </div>
    <p style="margin:0;font-size:15px;color:#64748b;">${zh ? '综合评分' : 'Overall Score'} · <strong style="color:${color};">${grade}</strong></p>
    <div style="display:flex;justify-content:center;gap:24px;margin-top:20px;">
      <div style="text-align:center;">
        <div style="font-size:22px;font-weight:800;color:#ef4444;">${criticals.length}</div>
        <div style="font-size:11px;color:#94a3b8;">${zh ? '严重问题' : 'Critical'}</div>
      </div>
      <div style="text-align:center;">
        <div style="font-size:22px;font-weight:800;color:#f59e0b;">${warnings.length}</div>
        <div style="font-size:11px;color:#94a3b8;">${zh ? '警告' : 'Warnings'}</div>
      </div>
      <div style="text-align:center;">
        <div style="font-size:22px;font-weight:800;color:#10b981;">${passedCount}</div>
        <div style="font-size:11px;color:#94a3b8;">${zh ? '通过' : 'Passed'}</div>
      </div>
    </div>
  </div>

  <!-- Category Scores -->
  <div style="background:#ffffff;padding:24px 28px;border-bottom:1px solid #e2e8f0;">
    <h3 style="margin:0 0 16px;font-size:15px;color:#1e293b;">${zh ? '各维度评分' : 'Category Breakdown'}</h3>
    <table style="width:100%;border-collapse:collapse;">
      <tbody>${catRows}</tbody>
    </table>
  </div>

  <!-- Top Issues -->
  <div style="background:#ffffff;padding:24px 28px;border-bottom:1px solid #e2e8f0;">
    <h3 style="margin:0 0 16px;font-size:15px;color:#1e293b;">⚡ ${zh ? '最需要立即修复的问题' : 'Top Issues to Fix First'}</h3>
    ${issueRows || `<p style="color:#94a3b8;font-size:13px;">${zh ? '恭喜！没有发现严重问题。' : 'Great! No critical issues found.'}</p>`}
  </div>

  <!-- CTA -->
  <div style="background:#ffffff;padding:28px;text-align:center;">
    <a href="${reportUrl}" style="display:inline-block;background:#2563eb;color:#ffffff;padding:14px 36px;border-radius:10px;font-weight:700;font-size:15px;text-decoration:none;letter-spacing:0.3px;">
      ${zh ? '查看完整报告 →' : 'View Full Report →'}
    </a>
    <p style="margin:16px 0 0;font-size:12px;color:#94a3b8;">
      ${zh ? '此链接24小时内有效 · 免费由 SEO审计专家 生成' : 'Link valid for 24 hours · Free report by SEO Audit Pro'}
    </p>
  </div>

  <!-- Footer -->
  <div style="background:#f8fafc;padding:16px 28px;text-align:center;">
    <p style="margin:0;font-size:11px;color:#94a3b8;">
      ${zh
        ? `© ${new Date().getFullYear()} SEO审计专家 · <a href="${BASE_URL}/zh" style="color:#94a3b8;">seoauditpro.com</a>`
        : `© ${new Date().getFullYear()} SEO Audit Pro · <a href="${BASE_URL}/en" style="color:#94a3b8;">seoauditpro.com</a>`}
    </p>
  </div>

</div>
</body>
</html>`

  const transporter = getTransporter()
  await transporter.sendMail({
    from: `"${zh ? 'SEO审计专家' : 'SEO Audit Pro'}" <${process.env.GMAIL_USER}>`,
    to,
    bcc: process.env.NOTIFY_EMAIL,
    subject,
    html,
  })
}

// Simple owner notification when someone subscribes
export async function sendOwnerNotification(email: string, url: string, score: number) {
  const transporter = getTransporter()
  await transporter.sendMail({
    from: `"SEO审计专家 系统" <${process.env.GMAIL_USER}>`,
    to: process.env.NOTIFY_EMAIL,
    subject: `📬 新邮件订阅：${email}`,
    text: `新用户订阅了邮件报告\n\n邮箱：${email}\n检测网站：${url}\n评分：${score}/100\n时间：${new Date().toLocaleString('zh-CN')}`,
  })
}

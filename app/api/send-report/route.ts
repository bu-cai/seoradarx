import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: NextRequest) {
  try {
    const { auditId, email, locale } = await req.json()

    if (!auditId || !email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'invalid_params' }, { status: 400 })
    }

    // Fetch audit
    const audit = await prisma.audit.findUnique({ where: { id: auditId } })
    if (!audit) {
      return NextResponse.json({ error: 'not_found' }, { status: 404 })
    }

    // Prevent duplicate sends for same email+audit
    const existing = await prisma.emailLead.findFirst({
      where: { auditId, email },
    })
    if (existing?.sent) {
      return NextResponse.json({ ok: true, duplicate: true })
    }

    // Parse audit data
    const checks = JSON.parse(audit.results)
    const categoryScores = JSON.parse(audit.categoryScores)

    // Send email (imported lazily to keep it server-only)
    const { sendReportEmail } = await import('@/lib/email')
    await sendReportEmail({
      to: email,
      locale: locale || audit.locale || 'zh',
      auditId: audit.id,
      url: audit.url,
      score: audit.score,
      checks,
      categoryScores,
    })

    // Save lead to DB
    if (existing) {
      await prisma.emailLead.update({
        where: { id: existing.id },
        data: { sent: true },
      })
    } else {
      await prisma.emailLead.create({
        data: {
          email,
          auditId,
          locale: locale || audit.locale || 'zh',
          sent: true,
        },
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[send-report]', err)
    return NextResponse.json({ error: 'send_failed' }, { status: 500 })
  }
}

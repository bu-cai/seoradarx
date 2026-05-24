import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const lang = req.nextUrl.searchParams.get('lang') || 'zh'
  const sessionId = req.nextUrl.searchParams.get('session_id')

  const audit = await prisma.audit.findUnique({ where: { id: params.id } })
  if (!audit) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  // Allow access if paid or if valid session_id matches
  if (!audit.paid && !sessionId) {
    return NextResponse.json({ error: 'Payment required' }, { status: 403 })
  }

  // Verify session if provided
  if (sessionId && !audit.paid) {
    try {
      const { stripe } = await import('@/lib/stripe')
      const session = await stripe.checkout.sessions.retrieve(sessionId)
      if (session.payment_status === 'paid' && session.metadata?.auditId === params.id) {
        await prisma.audit.update({ where: { id: params.id }, data: { paid: true, stripeSessionId: sessionId } })
      } else {
        return NextResponse.json({ error: 'Payment required' }, { status: 403 })
      }
    } catch {
      return NextResponse.json({ error: 'Payment verification failed' }, { status: 403 })
    }
  }

  const checks = JSON.parse(audit.results)
  const categoryScores = JSON.parse(audit.categoryScores)

  // Dynamically import react-pdf to avoid SSR issues
  const { renderToBuffer } = await import('@react-pdf/renderer')
  const { createElement } = await import('react')
  const { createPDFDocument } = await import('@/lib/pdf-generator')

  const doc = createPDFDocument({ audit, checks, categoryScores, lang: lang as 'zh' | 'en' })
  const buffer = await renderToBuffer(createElement(doc))

  return new NextResponse(buffer as unknown as BodyInit, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="seo-audit-${params.id}-${lang}.pdf"`,
    },
  })
}

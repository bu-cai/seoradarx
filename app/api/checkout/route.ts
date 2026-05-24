import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const { auditId, locale = 'zh' } = await req.json()

    const audit = await prisma.audit.findUnique({ where: { id: auditId } })
    if (!audit) return NextResponse.json({ error: 'Audit not found' }, { status: 404 })
    if (audit.paid) return NextResponse.json({ error: 'Already paid' }, { status: 400 })

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3007'

    const session = await stripe.checkout.sessions.create({
      automatic_payment_methods: { enabled: true },
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: 999,
            product_data: {
              name: locale === 'zh'
                ? 'SEO审计完整报告 / Full SEO Audit Report'
                : 'Full SEO Audit Report',
              description: locale === 'zh'
                ? '30项SEO检测逐一解析、优先修复清单、中英双语PDF报告'
                : '30 SEO checks explained, priority fix list, bilingual PDF (Chinese + English)',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/${locale}/results/${auditId}?session_id={CHECKOUT_SESSION_ID}&paid=1`,
      cancel_url: `${baseUrl}/${locale}/results/${auditId}`,
      metadata: { auditId, locale },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature') || ''

  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET || '')
  } catch (err) {
    console.error('Webhook signature error:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as { metadata?: { auditId?: string }; id: string }
    const auditId = session.metadata?.auditId
    if (auditId) {
      await prisma.audit.update({
        where: { id: auditId },
        data: { paid: true, stripeSessionId: session.id },
      })
    }
  }

  return NextResponse.json({ received: true })
}

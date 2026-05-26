import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import ResultsClient from './ResultsClient'

// Audit result pages are private/dynamic — exclude from Google index
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default async function ResultsPage({
  params,
  searchParams,
}: {
  params: { locale: string; id: string }
  searchParams: { session_id?: string; paid?: string }
}) {
  const audit = await prisma.audit.findUnique({ where: { id: params.id } })
  if (!audit) notFound()

  // Verify Stripe session if provided
  if (searchParams.session_id && !audit.paid) {
    try {
      const { stripe } = await import('@/lib/stripe')
      const session = await stripe.checkout.sessions.retrieve(searchParams.session_id)
      if (session.payment_status === 'paid' && session.metadata?.auditId === params.id) {
        await prisma.audit.update({
          where: { id: params.id },
          data: { paid: true, stripeSessionId: searchParams.session_id },
        })
        audit.paid = true
      }
    } catch {}
  }

  const freshAudit = await prisma.audit.findUnique({ where: { id: params.id } })
  if (!freshAudit) notFound()

  return (
    <ResultsClient
      audit={{
        id: freshAudit.id,
        url: freshAudit.url,
        platform: freshAudit.platform,
        score: freshAudit.score,
        categoryScores: JSON.parse(freshAudit.categoryScores),
        checks: JSON.parse(freshAudit.results),
        paid: freshAudit.paid,
        createdAt: freshAudit.createdAt.toISOString(),
        locale: freshAudit.locale,
      }}
      locale={params.locale}
    />
  )
}

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const audit = await prisma.audit.findUnique({ where: { id: params.id } })
  if (!audit) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json({
    id: audit.id,
    url: audit.url,
    platform: audit.platform,
    score: audit.score,
    categoryScores: JSON.parse(audit.categoryScores),
    results: JSON.parse(audit.results),
    paid: audit.paid,
    locale: audit.locale,
    createdAt: audit.createdAt,
  })
}

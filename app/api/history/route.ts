import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url')
  if (!url) return NextResponse.json({ error: 'missing url' }, { status: 400 })

  // Normalise: ensure absolute URL
  let normalized: string
  try {
    normalized = new URL(url.startsWith('http') ? url : `https://${url}`).href
  } catch {
    return NextResponse.json({ error: 'invalid url' }, { status: 400 })
  }

  const records = await prisma.audit.findMany({
    where: { url: normalized },
    orderBy: { createdAt: 'asc' },
    take: 20,
    select: {
      id: true,
      score: true,
      categoryScores: true,
      createdAt: true,
    },
  })

  const history = records.map((r) => ({
    id: r.id,
    score: r.score,
    categoryScores: JSON.parse(r.categoryScores) as Record<string, number>,
    createdAt: r.createdAt.toISOString(),
  }))

  return NextResponse.json({ history })
}

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/auth-helpers'

export async function GET(request: Request) {
  try {
    await requireAdmin()

    const { searchParams } = new URL(request.url)
    const scope = searchParams.get('scope')
    const level = searchParams.get('level')
    const limit = parseInt(searchParams.get('limit') || '100')

    const where: any = {}
    if (scope && scope !== 'all') {
      where.scope = scope
    }
    if (level && level !== 'all') {
      where.level = level
    }

    const logs = await prisma.logEntry.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: limit
    })

    const stats = await prisma.logEntry.groupBy({
      by: ['scope', 'level'],
      _count: true
    })

    return NextResponse.json({ logs, stats })
  } catch (error: any) {
    if (error.message === 'NEXT_REDIRECT') {
      throw error
    }
    return NextResponse.json(
      { error: 'Loglar yüklenirken hata oluştu' },
      { status: 500 }
    )
  }
}

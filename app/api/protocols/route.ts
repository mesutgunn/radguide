import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireAuth } from '@/lib/auth-helpers'

export async function GET(request: Request) {
  try {
    await requireAuth()

    const { searchParams } = new URL(request.url)
    const modality = searchParams.get('modality')

    const where: any = {
      isPublished: true
    }

    if (modality && modality !== 'all') {
      where.modality = modality
    }

    const protocols = await prisma.protocol.findMany({
      where,
      select: {
        id: true,
        modality: true,
        title: true,
        bodyMarkdown: true,
        tags: true,
        updatedAt: true,
      },
      orderBy: {
        updatedAt: 'desc'
      }
    })

    return NextResponse.json({ protocols })
  } catch (error: any) {
    if (error.message === 'NEXT_REDIRECT') {
      throw error
    }
    return NextResponse.json(
      { error: 'Protokoller yüklenirken hata oluştu' },
      { status: 500 }
    )
  }
}

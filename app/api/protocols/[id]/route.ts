import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireAuth } from '@/lib/auth-helpers'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await requireAuth()

    const protocol = await prisma.protocol.findFirst({
      where: {
        id: params.id,
        isPublished: true
      },
      select: {
        id: true,
        modality: true,
        title: true,
        bodyMarkdown: true,
        tags: true,
        createdAt: true,
      }
    })

    if (!protocol) {
      return NextResponse.json(
        { error: 'Protokol bulunamadı' },
        { status: 404 }
      )
    }

    return NextResponse.json(protocol)
  } catch (error: any) {
    if (error.message === 'NEXT_REDIRECT') {
      throw error
    }
    return NextResponse.json(
      { error: 'Protokol yüklenirken hata oluştu' },
      { status: 500 }
    )
  }
}

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/auth-helpers'

// GET - Tüm protokolleri listele
export async function GET(request: Request) {
  try {
    const session = await requireAdmin()
    const { searchParams } = new URL(request.url)
    const modality = searchParams.get('modality')

    const where: any = {}
    if (modality && modality !== 'all') {
      where.modality = modality
    }

    const protocols = await prisma.protocol.findMany({
      where,
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
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

// POST - Yeni protokol oluştur
export async function POST(request: Request) {
  try {
    const session = await requireAdmin()

    const body = await request.json()
    const { modality, title, bodyMarkdown, tags, isPublished } = body

    if (!modality || !title || !bodyMarkdown) {
      return NextResponse.json(
        { error: 'Modalite, başlık ve içerik gereklidir' },
        { status: 400 }
      )
    }

    if (!['XR', 'MR', 'CT', 'US', 'NM'].includes(modality)) {
      return NextResponse.json(
        { error: 'Geçersiz modalite' },
        { status: 400 }
      )
    }

    const protocol = await prisma.protocol.create({
      data: {
        modality,
        title,
        bodyMarkdown,
        tags: tags || '',
        isPublished: isPublished || false,
        createdBy: session.user.id,
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      }
    })

    await prisma.logEntry.create({
      data: {
        userId: session.user.id,
        actorRole: session.user.role,
        scope: 'admin',
        action: 'protocol_created',
        level: 'info',
        payloadJson: { protocolId: protocol.id, modality, title }
      }
    })

    return NextResponse.json({ protocol }, { status: 201 })
  } catch (error: any) {
    if (error.message === 'NEXT_REDIRECT') {
      throw error
    }
    return NextResponse.json(
      { error: 'Protokol oluşturulurken hata oluştu' },
      { status: 500 }
    )
  }
}

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/auth-helpers'

// GET - Protokol detayı getir
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin()
    const { id } = await params

    const protocol = await prisma.protocol.findUnique({
      where: { id },
      select: {
        id: true,
        modality: true,
        title: true,
        bodyMarkdown: true,
        tags: true,
        isPublished: true,
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

// PATCH - Protokol güncelle
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAdmin()
    const { id } = await params

    const body = await request.json()
    const { modality, title, bodyMarkdown, tags, isPublished } = body

    const updateData: any = {}
    if (modality) updateData.modality = modality
    if (title) updateData.title = title
    if (bodyMarkdown !== undefined) updateData.bodyMarkdown = bodyMarkdown
    if (tags !== undefined) updateData.tags = tags
    if (isPublished !== undefined) updateData.isPublished = isPublished

    const protocol = await prisma.protocol.update({
      where: { id },
      data: updateData,
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
        action: 'protocol_updated',
        level: 'info',
        payloadJson: { protocolId: protocol.id, updates: Object.keys(updateData) }
      }
    })

    return NextResponse.json({ protocol })
  } catch (error: any) {
    if (error.message === 'NEXT_REDIRECT') {
      throw error
    }
    return NextResponse.json(
      { error: 'Protokol güncellenirken hata oluştu' },
      { status: 500 }
    )
  }
}

// DELETE - Protokol sil
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAdmin()
    const { id } = await params

    await prisma.protocol.delete({
      where: { id }
    })

    await prisma.logEntry.create({
      data: {
        userId: session.user.id,
        actorRole: session.user.role,
        scope: 'admin',
        action: 'protocol_deleted',
        level: 'warn',
        payloadJson: { protocolId: id }
      }
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    if (error.message === 'NEXT_REDIRECT') {
      throw error
    }
    return NextResponse.json(
      { error: 'Protokol silinirken hata oluştu' },
      { status: 500 }
    )
  }
}

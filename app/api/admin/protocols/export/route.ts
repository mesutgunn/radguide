import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/auth-helpers'
import * as XLSX from 'xlsx'

export async function GET(request: Request) {
  try {
    await requireAdmin()

    const { searchParams } = new URL(request.url)
    const modality = searchParams.get('modality')

    const where: any = {}
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
        isPublished: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        modality: 'asc'
      }
    })

    // Excel formatına dönüştür
    const data = protocols.map(p => ({
      'ID': p.id,
      'Modalite': p.modality,
      'Başlık': p.title,
      'İçerik': p.bodyMarkdown,
      'Etiketler': p.tags,
      'Yayınlandı': p.isPublished ? 'Evet' : 'Hayır',
      'Oluşturulma': new Date(p.createdAt).toLocaleDateString('tr-TR'),
      'Güncellenme': new Date(p.updatedAt).toLocaleDateString('tr-TR'),
    }))

    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Protokoller')

    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' })

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename=protokoller_${new Date().toISOString().split('T')[0]}.xlsx`
      }
    })
  } catch (error: any) {
    if (error.message === 'NEXT_REDIRECT') {
      throw error
    }
    return NextResponse.json(
      { error: 'Export işlemi başarısız' },
      { status: 500 }
    )
  }
}

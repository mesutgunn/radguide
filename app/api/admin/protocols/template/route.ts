import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth-helpers'
import * as XLSX from 'xlsx'
import { PROTOCOL_TEMPLATES, getExampleData, getTemplateName } from '@/lib/protocol-templates'

export async function GET(request: Request) {
  try {
    await requireAdmin()

    const { searchParams } = new URL(request.url)
    const modality = searchParams.get('modality') || 'XR'

    if (!PROTOCOL_TEMPLATES[modality as keyof typeof PROTOCOL_TEMPLATES]) {
      return NextResponse.json(
        { error: 'Geçersiz modalite' },
        { status: 400 }
      )
    }

    const exampleData = getExampleData(modality)
    const templateName = getTemplateName(modality)

    // Excel oluştur
    const worksheet = XLSX.utils.json_to_sheet(exampleData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, templateName)

    // Kolon genişliklerini ayarla
    const columns = Object.keys(exampleData[0] || {})
    worksheet['!cols'] = columns.map(() => ({ wch: 20 }))

    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' })

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename=${modality}_protokol_sablonu.xlsx`
      }
    })
  } catch (error: any) {
    if (error.message === 'NEXT_REDIRECT') {
      throw error
    }
    return NextResponse.json(
      { error: 'Şablon oluşturulamadı' },
      { status: 500 }
    )
  }
}

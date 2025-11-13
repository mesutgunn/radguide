import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/auth-helpers'
import * as XLSX from 'xlsx'
import { getRequiredFields } from '@/lib/protocol-templates'
import { Modality } from '@prisma/client'

export async function POST(request: Request) {
  try {
    const session = await requireAdmin()

    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const modalityValue = formData.get('modality') as string | null

    if (!file) {
      return NextResponse.json(
        { error: 'Dosya yüklenmedi' },
        { status: 400 }
      )
    }

    const validModalities: Modality[] = ['XR', 'MR', 'CT', 'US', 'NM']

    if (!modalityValue || !validModalities.includes(modalityValue as Modality)) {
      return NextResponse.json(
        { error: 'Geçerli bir modalite seçilmedi' },
        { status: 400 }
      )
    }

    // Buradan sonra TypeScript açısından modality artık Modality enum’u
    const modality = modalityValue as Modality

    const buffer = await file.arrayBuffer()
    const workbook = XLSX.read(buffer)
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]
    const data = XLSX.utils.sheet_to_json(worksheet)

    const requiredFields = getRequiredFields(modality)
    let imported = 0
    let errors: string[] = []

    for (const row of data as any[]) {
      try {
        // Modalite bazlı veri çekme
        let title = ''
        let bodyMarkdown = ''
        
        // Her modalite için farklı alan isimleri
        if (modality === 'XR') {
          const baslik = row['Başlık'] || row['Baslik'] || ''
          const kategori = row['Kategori'] || ''
          const aciklama = row['Açıklama'] || row['Aciklama'] || ''
          
          if (!baslik || !kategori) {
            errors.push(`Satır atlandı: Başlık veya Kategori eksik`)
            continue
          }
          
          title = baslik
          
          // Tüm alanları markdown formatında birleştir
          bodyMarkdown = `# ${title}\n\n`
          bodyMarkdown += `**Kategori:** ${kategori}\n\n`
          if (aciklama) bodyMarkdown += `**Açıklama:** ${aciklama}\n\n`
          
          if (row['Amaç']) bodyMarkdown += `**Amaç:** ${row['Amaç']}\n\n`
          if (row['Endikasyonlar']) bodyMarkdown += `**Endikasyonlar:** ${row['Endikasyonlar']}\n\n`
          if (row['Hasta Hazırlığı']) bodyMarkdown += `**Hasta Hazırlığı:** ${row['Hasta Hazırlığı']}\n\n`
          if (row['Pozisyonlama']) bodyMarkdown += `**Pozisyonlama:** ${row['Pozisyonlama']}\n\n`
          if (row['Işınlama']) bodyMarkdown += `**Işınlama:** ${row['Işınlama']}\n\n`
          if (row['Nefes Tutma']) bodyMarkdown += `**Nefes Tutma:** ${row['Nefes Tutma']}\n\n`
          
          bodyMarkdown += `## Teknik Parametreler\n\n`
          if (row['kVp']) bodyMarkdown += `- **kVp:** ${row['kVp']}\n`
          if (row['mAs']) bodyMarkdown += `- **mAs:** ${row['mAs']}\n`
          if (row['Mesafe']) bodyMarkdown += `- **Mesafe:** ${row['Mesafe']}\n`
          
          bodyMarkdown += `\n## Kalite Kontrol\n\n`
          if (row['Artefakt Kontrolü']) bodyMarkdown += `**Artefakt Kontrolü:** ${row['Artefakt Kontrolü']}\n\n`
          if (row['Radyasyon Güvenliği']) bodyMarkdown += `**Radyasyon Güvenliği:** ${row['Radyasyon Güvenliği']}\n\n`
          if (row['Sık Hatalar']) bodyMarkdown += `**Sık Hatalar:** ${row['Sık Hatalar']}\n\n`
          
          bodyMarkdown += `## Değerlendirme\n\n`
          if (row['Değerlendirme']) bodyMarkdown += `${row['Değerlendirme']}\n\n`
          if (row['Notlar']) bodyMarkdown += `**Notlar:** ${row['Notlar']}\n`
          
        } else if (modality === 'CT') {
          title = row['Protokol Adı'] || row['Protokol Adi'] || ''
          const bolge = row['İnceleme Bölgesi'] || row['Inceleme Bolgesi'] || ''
          
          if (!title) {
            errors.push(`Satır atlandı: Protokol Adı eksik`)
            continue
          }
          
          bodyMarkdown = `# ${title}\n\n`
          if (bolge) bodyMarkdown += `**İnceleme Bölgesi:** ${bolge}\n\n`
          
          if (row['Endikasyon']) bodyMarkdown += `**Endikasyon:** ${row['Endikasyon']}\n`
          if (row['Hasta Pozisyonu']) bodyMarkdown += `**Hasta Pozisyonu:** ${row['Hasta Pozisyonu']}\n`
          if (row['kV']) bodyMarkdown += `**kV:** ${row['kV']}\n`
          if (row['mAs']) bodyMarkdown += `**mAs:** ${row['mAs']}\n`
          if (row['Pitch']) bodyMarkdown += `**Pitch:** ${row['Pitch']}\n`
          if (row['Kesit Kalınlığı']) bodyMarkdown += `**Kesit Kalınlığı:** ${row['Kesit Kalınlığı']}\n`
          if (row['Kontrast']) bodyMarkdown += `**Kontrast:** ${row['Kontrast']}\n`
          if (row['Özel Notlar']) bodyMarkdown += `**Özel Notlar:** ${row['Özel Notlar']}\n`
          
        } else if (modality === 'MR') {
          title = row['Protokol Adı'] || row['Protokol Adi'] || ''
          const bolge = row['İnceleme Bölgesi'] || row['Inceleme Bolgesi'] || ''
          
          if (!title) {
            errors.push(`Satır atlandı: Protokol Adı eksik`)
            continue
          }
          
          bodyMarkdown = `# ${title}\n\n`
          if (bolge) bodyMarkdown += `**İnceleme Bölgesi:** ${bolge}\n\n`
          
          if (row['Sekans Tipi']) bodyMarkdown += `**Sekans Tipi:** ${row['Sekans Tipi']}\n`
          if (row['Düzlem']) bodyMarkdown += `**Düzlem:** ${row['Düzlem']}\n`
          if (row['TR']) bodyMarkdown += `**TR:** ${row['TR']}\n`
          if (row['TE']) bodyMarkdown += `**TE:** ${row['TE']}\n`
          if (row['FOV']) bodyMarkdown += `**FOV:** ${row['FOV']}\n`
          if (row['Slice Thickness']) bodyMarkdown += `**Slice Thickness:** ${row['Slice Thickness']}\n`
          if (row['Kontrast']) bodyMarkdown += `**Kontrast:** ${row['Kontrast']}\n`
          if (row['Notlar']) bodyMarkdown += `**Notlar:** ${row['Notlar']}\n`
          
        } else if (modality === 'NM') {
          title = row['İnceleme Tipi'] || row['Inceleme Tipi'] || ''
          
          if (!title) {
            errors.push(`Satır atlandı: İnceleme Tipi eksik`)
            continue
          }
          
          bodyMarkdown = `# ${title}\n\n`
          
          if (row['Radyofarmasötik']) bodyMarkdown += `**Radyofarmasötik:** ${row['Radyofarmasötik']}\n`
          if (row['Aktivite (mCi)']) bodyMarkdown += `**Aktivite:** ${row['Aktivite (mCi)']} mCi\n`
          if (row['Uygulama Yolu']) bodyMarkdown += `**Uygulama Yolu:** ${row['Uygulama Yolu']}\n`
          if (row['Bekleme Süresi']) bodyMarkdown += `**Bekleme Süresi:** ${row['Bekleme Süresi']}\n`
          if (row['Dedektör']) bodyMarkdown += `**Dedektör:** ${row['Dedektör']}\n`
          if (row['Güvenlik Önlemleri']) bodyMarkdown += `**Güvenlik Önlemleri:** ${row['Güvenlik Önlemleri']}\n`
          if (row['Notlar']) bodyMarkdown += `**Notlar:** ${row['Notlar']}\n`
          
        } else if (modality === 'US') {
          title = row['Protokol Adı'] || row['Protokol Adi'] || ''
          const bolge = row['İnceleme Bölgesi'] || row['Inceleme Bolgesi'] || ''
          
          if (!title) {
            errors.push(`Satır atlandı: Protokol Adı eksik`)
            continue
          }
          
          bodyMarkdown = `# ${title}\n\n`
          if (bolge) bodyMarkdown += `**İnceleme Bölgesi:** ${bolge}\n\n`
          
          if (row['Prob Tipi']) bodyMarkdown += `**Prob Tipi:** ${row['Prob Tipi']}\n`
          if (row['Frekans']) bodyMarkdown += `**Frekans:** ${row['Frekans']}\n`
          if (row['Hasta Hazırlığı']) bodyMarkdown += `**Hasta Hazırlığı:** ${row['Hasta Hazırlığı']}\n`
          if (row['Doppler']) bodyMarkdown += `**Doppler:** ${row['Doppler']}\n`
          if (row['Değerlendirme']) bodyMarkdown += `**Değerlendirme:** ${row['Değerlendirme']}\n`
          if (row['Notlar']) bodyMarkdown += `**Notlar:** ${row['Notlar']}\n`
        }

        if (!title || !bodyMarkdown) {
          errors.push(`Satır atlandı: Gerekli alanlar eksik`)
          continue
        }

        await prisma.protocol.create({
          data: {
            modality, // Artık Modality enum
            title,
            bodyMarkdown,
            tags: row['Kategori'] || row['Bölge'] || '',
            isPublished: true,
            createdBy: session.user.id,
          }
        })

        imported++
      } catch (err: any) {
        errors.push(`Hata: ${err.message}`)
      }
    }

    await prisma.logEntry.create({
      data: {
        userId: session.user.id,
        actorRole: session.user.role,
        scope: 'admin',
        action: 'protocols_imported',
        level: 'info',
        payloadJson: { imported, errors: errors.length }
      }
    })

    return NextResponse.json({
      success: true,
      imported,
      errors: errors.length > 0 ? errors : undefined
    })
  } catch (error: any) {
    if (error.message === 'NEXT_REDIRECT') {
      throw error
    }
    return NextResponse.json(
      { error: 'Import işlemi başarısız' },
      { status: 500 }
    )
  }
}

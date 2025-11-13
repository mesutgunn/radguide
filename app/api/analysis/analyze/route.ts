import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    console.log('Analyze API called')
    
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Giriş yapmanız gerekiyor' }, { status: 401 })
    }

    const body = await request.json()
    const { analysisId, imageUrl } = body

    console.log('Analysis ID:', analysisId, 'Image URL:', imageUrl)

    // Webhook URL'i al
    const setting = await prisma.siteSetting.findUnique({
      where: { key: 'analysis_webhook_url' }
    })

    const webhookUrl = setting?.valueJson as string
    console.log('Webhook URL:', webhookUrl)

    if (!webhookUrl) {
      return NextResponse.json(
        { error: 'Webhook URL tanımlanmamış. Lütfen admin ile iletişime geçin.' },
        { status: 400 }
      )
    }

    // Analiz durumunu güncelle
    await prisma.analysisJob.update({
      where: { id: analysisId },
      data: { status: 'processing' }
    })

    // Analysis job'ı al (protokol bilgisi ile birlikte)
    const analysisJob = await prisma.analysisJob.findUnique({ 
      where: { id: analysisId },
      include: {
        protocol: true
      }
    })

    // Görüntüyü base64'e çevir
    const fs = require('fs')
    const path = require('path')
    const imagePath = path.join(process.cwd(), 'public', imageUrl)
    
    let imageBase64 = ''
    try {
      const imageBuffer = fs.readFileSync(imagePath)
      imageBase64 = imageBuffer.toString('base64')
      console.log('Image converted to base64, length:', imageBase64.length)
    } catch (error) {
      console.error('Error reading image file:', error)
      return NextResponse.json(
        { error: 'Görüntü dosyası okunamadı' },
        { status: 500 }
      )
    }

    // Webhook'a istek gönder
    const callbackUrl = `${process.env.NEXTAUTH_URL}/api/analysis/callback`
    
    const webhookPayload: any = {
      imageBase64,
      modality: analysisJob?.modality,
      userId: session.user.id,
      analysisId,
      callbackUrl
    }

    // Protokol seçildiyse islemAdi ekle
    if (analysisJob?.protocol) {
      webhookPayload.islemAdi = analysisJob.protocol.title
    }

    console.log('Sending to webhook:', {
      modality: analysisJob?.modality,
      islemAdi: webhookPayload.islemAdi,
      userId: session.user.id,
      analysisId,
      callbackUrl,
      imageBase64Length: imageBase64.length
    })

    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(webhookPayload)
    })

    console.log('Webhook response status:', webhookResponse.status)

    if (!webhookResponse.ok) {
      const errorText = await webhookResponse.text()
      console.error('Webhook error response:', errorText)
      
      await prisma.analysisJob.update({
        where: { id: analysisId },
        data: {
          status: 'error',
          errorMsg: `Webhook error: ${webhookResponse.status} - ${errorText}`
        }
      })

      return NextResponse.json(
        { error: `Analiz servisi yanıt vermedi: ${webhookResponse.status}` },
        { status: 500 }
      )
    }

    const webhookData = await webhookResponse.json()
    console.log('Webhook response data:', webhookData)

    // Eğer webhook "message" döndüysa (asenkron), kullanıcıya bilgi ver
    if (webhookData.message && !webhookData.result) {
      await prisma.analysisJob.update({
        where: { id: analysisId },
        data: { status: 'processing' }
      })

      return NextResponse.json({
        result: 'PROCESSING',
        message: 'Analiz başlatıldı. Sonuç hazır olduğunda bildirim alacaksınız.',
        analysisId: analysisId
      })
    }

    // Yanıt formatını kontrol et ve normalize et
    let result = null
    let score = null
    let feedback = null
    let parsedData: any = null

    // Beklenen format: { result, score, feedback }
    if (webhookData.result) {
      result = webhookData.result
      score = webhookData.score
      feedback = webhookData.feedback
    }
    // Alternatif: Workflow başlatıldı mesajı
    else if (webhookData.message) {
      result = 'FAILED'
      feedback = 'Analiz başlatıldı ancak sonuç henüz hazır değil. Webhook asenkron çalışıyor olabilir.'
    }
    // Alternatif: Array formatı - nested response parse et
    else if (Array.isArray(webhookData)) {
      try {
        // İç içe array'leri düzleştir
        const flatData = webhookData.flat()
        const messageObj = flatData.find((item: any) => item.type === 'message')
        
        if (messageObj && messageObj.content) {
          const textContent = messageObj.content.find((c: any) => c.type === 'output_text')
          
          if (textContent && textContent.text) {
            let jsonText = textContent.text
            
            console.log('Raw webhook text (first 500 chars):', jsonText.substring(0, 500))
            console.log('Raw webhook text (last 500 chars):', jsonText.substring(jsonText.length - 500))
            
            // Markdown code block'ları temizle (```json ... ``` veya ``` ... ```)
            jsonText = jsonText.replace(/```json\s*/g, '').replace(/```\s*/g, '')
            
            // Başındaki ve sonundaki boşlukları temizle
            jsonText = jsonText.trim()
            
            // Eğer JSON tamamlanmamışsa, tamamlamaya çalış
            if (!jsonText.endsWith('}') && !jsonText.endsWith(']')) {
              console.log('JSON incomplete, last char:', jsonText[jsonText.length - 1])
              
              // Son tamamlanmamış issue'yu kaldır
              const lastCompleteIssueIndex = jsonText.lastIndexOf('}')
              if (lastCompleteIssueIndex > 0) {
                jsonText = jsonText.substring(0, lastCompleteIssueIndex + 1)
                
                // Issues array'ini kapat
                if (!jsonText.includes(']')) {
                  jsonText += '\n  ]\n}'
                } else if (!jsonText.endsWith('}')) {
                  jsonText += '\n}'
                }
              }
              
              console.log('Fixed JSON (last 200 chars):', jsonText.substring(jsonText.length - 200))
            }
            
            console.log('Cleaned JSON (first 500 chars):', jsonText.substring(0, 500))
            
            // JSON string'i parse et
            parsedData = JSON.parse(jsonText)
            
            // Issues varsa başarısız, yoksa başarılı
            if (parsedData.issues && parsedData.issues.length > 0) {
              result = 'FAILED'
              
              // Issues'ları formatla
              const issuesList = parsedData.issues.map((issue: any, index: number) => {
                return `${index + 1}. ${issue.issue_type?.toUpperCase() || 'BİLİNMEYEN'}\n` +
                       `   Açıklama: ${issue.description || 'N/A'}\n` +
                       `   Neden: ${issue.cause || 'N/A'}\n` +
                       `   Düzeltme: ${issue.remediation_step || 'N/A'}\n` +
                       `   Önem: ${issue.severity === 'high' ? 'Yüksek' : issue.severity === 'medium' ? 'Orta' : 'Düşük'}`
              }).join('\n\n')
              
              const warningNote = messageObj?.status === 'incomplete' 
                ? '\n\n⚠️ Not: Webhook yanıtı tamamlanmadan kesildi. Bazı sorunlar eksik olabilir.' 
                : ''
              
              feedback = `İşlem: ${parsedData.islemAdi || 'Bilinmiyor'}\n\nTespit Edilen Sorunlar:\n\n${issuesList}${warningNote}`
              
              // Severity'lere göre skor hesapla
              const severityScores = { high: 0.3, medium: 0.6, low: 0.8 }
              const avgScore = parsedData.issues.reduce((acc: number, issue: any) => {
                return acc + (severityScores[issue.severity as keyof typeof severityScores] || 0.5)
              }, 0) / parsedData.issues.length
              score = avgScore
            } else {
              result = 'SUCCESS'
              feedback = `İşlem: ${parsedData.islemAdi || 'Bilinmiyor'}\n\nGörüntü kalitesi mükemmel! Herhangi bir sorun tespit edilmedi.`
              score = 1.0
            }
          }
        }
        
        // Parse edilemezse
        if (!result) {
          // Status incomplete ise özel mesaj
          if (messageObj?.status === 'incomplete') {
            result = 'FAILED'
            feedback = 'Analiz tamamlanmadı. Webhook yanıtı henüz hazır değil. Lütfen birkaç saniye bekleyip tekrar deneyin.'
          } else {
            result = 'FAILED'
            feedback = 'Analiz tamamlanmadı. Webhook henüz işlemi bitirmedi.'
          }
        }
      } catch (parseError: any) {
        console.error('Parse error:', parseError)
        
        // Parse hatası detayını göster
        result = 'FAILED'
        if (parseError.message === 'JSON incomplete') {
          feedback = 'Webhook yanıtı henüz tamamlanmadı. Lütfen birkaç saniye bekleyip tekrar deneyin veya webhook\'unuzu senkron yanıt verecek şekilde yapılandırın.'
        } else if (parseError.message.includes('Unterminated string')) {
          feedback = 'Webhook yanıtı tamamlanmadı (JSON kesik). Webhook\'unuz yanıtı tam olarak döndürene kadar bekleyin veya asenkron callback kullanın.'
        } else if (parseError.message.includes('Unexpected token') || parseError.message.includes('Expected double-quoted')) {
          feedback = 'Webhook yanıtı geçersiz JSON formatında. Lütfen webhook\'unuzun geçerli JSON döndürdüğünden emin olun (tırnak işaretleri, virgüller vb.).'
        } else {
          feedback = `Webhook yanıtı parse edilemedi: ${parseError.message}`
        }
      }
    }
    // Bilinmeyen format
    else {
      result = 'FAILED'
      feedback = 'Webhook beklenmeyen bir yanıt formatı döndürdü.'
    }

    // Sonucu kaydet
    await prisma.analysisJob.update({
      where: { id: analysisId },
      data: {
        status: 'done',
        result: result as any,
        score: score,
        feedback: feedback,
        outputJson: webhookData
      }
    })

    await prisma.logEntry.create({
      data: {
        userId: session.user.id,
        actorRole: session.user.role,
        scope: 'analysis',
        action: 'analysis_completed',
        level: 'info',
        payloadJson: { analysisId, result }
      }
    })

    // Frontend'e normalize edilmiş yanıtı gönder
    return NextResponse.json({
      result,
      score,
      feedback
    })
  } catch (error: any) {
    console.error('Analysis error:', error)
    
    // Hata durumunu kaydet
    try {
      const body = await request.json().catch(() => ({}))
      if (body.analysisId) {
        await prisma.analysisJob.update({
          where: { id: body.analysisId },
          data: {
            status: 'error',
            errorMsg: error.message
          }
        }).catch(() => {})
      }
    } catch (e) {
      console.error('Error saving error state:', e)
    }

    return NextResponse.json(
      { error: error.message || 'Analiz sırasında hata oluştu' },
      { status: 500 }
    )
  }
}

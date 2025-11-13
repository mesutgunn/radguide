import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/auth-helpers'

export async function POST() {
  try {
    await requireAdmin()

    const setting = await prisma.siteSetting.findUnique({
      where: { key: 'analysis_webhook_url' }
    })

    const webhookUrl = setting?.valueJson as string

    if (!webhookUrl) {
      return NextResponse.json(
        { error: 'Webhook URL tanımlanmamış' },
        { status: 400 }
      )
    }

    // Test isteği gönder (küçük test base64 görüntüsü)
    const testImageBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        test: true,
        imageBase64: testImageBase64,
        modality: 'XR',
        userId: 'test_user',
        analysisId: 'test_analysis'
      })
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `Webhook yanıt vermedi: ${response.status}` },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    if (error.message === 'NEXT_REDIRECT') {
      throw error
    }
    return NextResponse.json(
      { error: error.message || 'Test başarısız' },
      { status: 500 }
    )
  }
}

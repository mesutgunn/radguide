import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

// Webhook'tan asenkron sonuç almak için callback endpoint
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { analysisId, result, score, feedback } = body

    console.log('Callback received:', { analysisId, result, score })

    if (!analysisId) {
      return NextResponse.json({ error: 'analysisId gerekli' }, { status: 400 })
    }

    // Analysis job'ı güncelle
    const analysisJob = await prisma.analysisJob.findUnique({
      where: { id: analysisId }
    })

    if (!analysisJob) {
      return NextResponse.json({ error: 'Analysis job bulunamadı' }, { status: 404 })
    }

    await prisma.analysisJob.update({
      where: { id: analysisId },
      data: {
        status: 'done',
        result: result || 'FAILED',
        score: score ?? null,
        feedback: feedback || 'Sonuç alınamadı',
        outputJson: body
      }
    })

    await prisma.logEntry.create({
      data: {
        userId: analysisJob.userId,
        actorRole: null, // 'SYSTEM' yerine null: UserRole | null tipine uyumlu
        scope: 'analysis',
        action: 'callback_received',
        level: 'info',
        payloadJson: { analysisId, result }
      }
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Callback error:', error)
    return NextResponse.json(
      { error: error.message || 'Callback işlenemedi' },
      { status: 500 }
    )
  }
}

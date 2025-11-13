import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/auth-helpers'

// GET - Ayarları getir
export async function GET() {
  try {
    await requireAdmin()

    const setting = await prisma.siteSetting.findUnique({
      where: { key: 'analysis_webhook_url' }
    })

    return NextResponse.json({
      analysisWebhookUrl: setting?.valueJson as string || ''
    })
  } catch (error: any) {
    if (error.message === 'NEXT_REDIRECT') {
      throw error
    }
    return NextResponse.json(
      { error: 'Ayarlar yüklenemedi' },
      { status: 500 }
    )
  }
}

// POST - Ayarları kaydet
export async function POST(request: Request) {
  try {
    const session = await requireAdmin()
    const body = await request.json()
    const { analysisWebhookUrl } = body

    await prisma.siteSetting.upsert({
      where: { key: 'analysis_webhook_url' },
      create: {
        key: 'analysis_webhook_url',
        valueJson: analysisWebhookUrl
      },
      update: {
        valueJson: analysisWebhookUrl
      }
    })

    await prisma.logEntry.create({
      data: {
        userId: session.user.id,
        actorRole: session.user.role,
        scope: 'admin',
        action: 'settings_updated',
        level: 'info',
        payloadJson: { key: 'analysis_webhook_url' }
      }
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    if (error.message === 'NEXT_REDIRECT') {
      throw error
    }
    return NextResponse.json(
      { error: 'Ayarlar kaydedilemedi' },
      { status: 500 }
    )
  }
}

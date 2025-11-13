import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

// Next.js 15+ için route config
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    console.log('Upload API called')
    
    const session = await auth()
    console.log('Session:', session?.user?.email)
    
    if (!session) {
      return NextResponse.json({ error: 'Giriş yapmanız gerekiyor' }, { status: 401 })
    }

    const formData = await request.formData()
    const image = formData.get('image') as File
    const modality = formData.get('modality') as string
    const protocolId = formData.get('protocolId') as string | null

    console.log('Image:', image?.name, 'Modality:', modality, 'Protocol:', protocolId)

    if (!image) {
      return NextResponse.json({ error: 'Görüntü bulunamadı' }, { status: 400 })
    }

    if (!modality) {
      return NextResponse.json({ error: 'Modalite seçilmedi' }, { status: 400 })
    }

    // Dosyayı kaydet
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadDir = join(process.cwd(), 'public', 'uploads', 'analysis')
    await mkdir(uploadDir, { recursive: true })

    const filename = `${Date.now()}-${image.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
    const filepath = join(uploadDir, filename)
    await writeFile(filepath, buffer)

    const imageUrl = `/uploads/analysis/${filename}`
    console.log('Image saved:', imageUrl)

    // Database'e kaydet
    const analysisJob = await prisma.analysisJob.create({
      data: {
        userId: session.user.id,
        modality: modality as any,
        protocolId: protocolId || undefined,
        imageUrl,
        status: 'queued'
      }
    })

    console.log('Analysis job created:', analysisJob.id)

    await prisma.logEntry.create({
      data: {
        userId: session.user.id,
        actorRole: session.user.role,
        scope: 'analysis',
        action: 'image_uploaded',
        level: 'info',
        payloadJson: { analysisId: analysisJob.id, modality }
      }
    })

    return NextResponse.json({
      analysisId: analysisJob.id,
      imageUrl
    })
  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: error.message || 'Görüntü yüklenemedi' },
      { status: 500 }
    )
  }
}

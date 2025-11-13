import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const analysisJob = await prisma.analysisJob.findUnique({
      where: { id }
    })

    if (!analysisJob) {
      return NextResponse.json({ error: 'Analysis job not found' }, { status: 404 })
    }

    // Sadece kendi analiz işlerini görebilir
    if (analysisJob.userId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json({
      status: analysisJob.status,
      result: analysisJob.result,
      score: analysisJob.score,
      feedback: analysisJob.feedback,
      errorMsg: analysisJob.errorMsg
    })
  } catch (error: any) {
    console.error('Status check error:', error)
    return NextResponse.json(
      { error: 'Status kontrolü başarısız' },
      { status: 500 }
    )
  }
}

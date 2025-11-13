import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/auth-helpers'
import bcrypt from 'bcryptjs'

// GET - Tüm kullanıcıları listele
export async function GET() {
  try {
    await requireAdmin()

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            protocols: true,
            analysisJobs: true,
            reportRecords: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ users })
  } catch (error: any) {
    if (error.message === 'NEXT_REDIRECT') {
      throw error
    }
    return NextResponse.json(
      { error: 'Kullanıcılar yüklenirken hata oluştu' },
      { status: 500 }
    )
  }
}

// POST - Yeni kullanıcı oluştur
export async function POST(request: Request) {
  try {
    await requireAdmin()

    const body = await request.json()
    const { name, email, password, role } = body

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: 'Tüm alanlar gereklidir' },
        { status: 400 }
      )
    }

    if (!['TEKNIKER', 'RAPORTOR', 'ADMIN'].includes(role)) {
      return NextResponse.json(
        { error: 'Geçersiz rol' },
        { status: 400 }
      )
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Bu email adresi zaten kullanılıyor' },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      }
    })

    await prisma.logEntry.create({
      data: {
        scope: 'admin',
        action: 'user_created',
        level: 'info',
        payloadJson: { userId: user.id, email: user.email, role: user.role }
      }
    })

    return NextResponse.json({ user }, { status: 201 })
  } catch (error: any) {
    if (error.message === 'NEXT_REDIRECT') {
      throw error
    }
    return NextResponse.json(
      { error: 'Kullanıcı oluşturulurken hata oluştu' },
      { status: 500 }
    )
  }
}

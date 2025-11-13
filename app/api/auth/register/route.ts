import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { logger } from '@/lib/logger'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password, role } = body

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: 'Tüm alanlar gereklidir' },
        { status: 400 }
      )
    }

    if (!['TEKNIKER', 'RAPORTOR'].includes(role)) {
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

    // Log the registration
    await prisma.logEntry.create({
      data: {
        userId: user.id,
        actorRole: user.role,
        scope: 'auth',
        action: 'user_registered',
        level: 'info',
        payloadJson: { email: user.email, role: user.role }
      }
    })

    logger.info({ userId: user.id, email: user.email }, 'New user registered')

    return NextResponse.json(
      { 
        message: 'Kayıt başarılı',
        user 
      },
      { status: 201 }
    )
  } catch (error) {
    logger.error({ error }, 'Registration error')
    return NextResponse.json(
      { error: 'Kayıt sırasında bir hata oluştu' },
      { status: 500 }
    )
  }
}

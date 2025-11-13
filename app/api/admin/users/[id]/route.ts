import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/auth-helpers'
import bcrypt from 'bcryptjs'

// PATCH - Kullanıcı güncelle
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin()

    const body = await request.json()
    const { name, email, role, password } = body

    const updateData: any = {}
    if (name) updateData.name = name
    if (email) updateData.email = email
    if (role && ['TEKNIKER', 'RAPORTOR', 'ADMIN'].includes(role)) {
      updateData.role = role
    }
    if (password) {
      updateData.password = await bcrypt.hash(password, 10)
    }

    const user = await prisma.user.update({
      where: { id: params.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        updatedAt: true,
      }
    })

    await prisma.logEntry.create({
      data: {
        scope: 'admin',
        action: 'user_updated',
        level: 'info',
        payloadJson: { userId: user.id, updates: Object.keys(updateData) }
      }
    })

    return NextResponse.json({ user })
  } catch (error: any) {
    if (error.message === 'NEXT_REDIRECT') {
      throw error
    }
    return NextResponse.json(
      { error: 'Kullanıcı güncellenirken hata oluştu' },
      { status: 500 }
    )
  }
}

// DELETE - Kullanıcı sil
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin()

    await prisma.user.delete({
      where: { id: params.id }
    })

    await prisma.logEntry.create({
      data: {
        scope: 'admin',
        action: 'user_deleted',
        level: 'warn',
        payloadJson: { userId: params.id }
      }
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    if (error.message === 'NEXT_REDIRECT') {
      throw error
    }
    return NextResponse.json(
      { error: 'Kullanıcı silinirken hata oluştu' },
      { status: 500 }
    )
  }
}

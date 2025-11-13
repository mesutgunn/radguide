import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Admin kullanıcı
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@radguide.com' },
    update: {},
    create: {
      email: 'admin@radguide.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
    },
  })
  console.log('✅ Admin kullanıcı oluşturuldu:', admin.email)

  // Tekniker kullanıcı
  const teknikerPassword = await bcrypt.hash('tekniker123', 10)
  const tekniker = await prisma.user.upsert({
    where: { email: 'tekniker@radguide.com' },
    update: {},
    create: {
      email: 'tekniker@radguide.com',
      name: 'Test Tekniker',
      password: teknikerPassword,
      role: 'TEKNIKER',
    },
  })
  console.log('✅ Tekniker kullanıcı oluşturuldu:', tekniker.email)

  // Raportör kullanıcı
  const roportorPassword = await bcrypt.hash('raportor123', 10)
  const raportor = await prisma.user.upsert({
    where: { email: 'raportor@radguide.com' },
    update: {},
    create: {
      email: 'raportor@radguide.com',
      name: 'Test Raportör',
      password: roportorPassword,
      role: 'RAPORTOR',
    },
  })
  console.log('✅ Raportör kullanıcı oluşturuldu:', raportor.email)

  console.log('\n🎉 Seed tamamlandı!')
  console.log('\n📝 Test Kullanıcıları:')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('👤 Admin:')
  console.log('   Email: admin@radguide.com')
  console.log('   Şifre: admin123')
  console.log('\n👤 Tekniker:')
  console.log('   Email: tekniker@radguide.com')
  console.log('   Şifre: tekniker123')
  console.log('\n👤 Raportör:')
  console.log('   Email: raportor@radguide.com')
  console.log('   Şifre: raportor123')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
}

main()
  .catch((e) => {
    console.error('❌ Seed hatası:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

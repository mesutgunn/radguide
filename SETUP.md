# RadGuide - Hızlı Kurulum Rehberi

## 🚀 Hızlı Başlangıç

### Ön Gereksinimler

- Node.js 18+ 
- PostgreSQL 14+
- npm veya yarn

### 1. Veritabanı Kurulumu

PostgreSQL'de yeni bir veritabanı oluşturun:

```sql
CREATE DATABASE radguide;
CREATE USER radguide_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE radguide TO radguide_user;
```

### 2. Ortam Değişkenleri

`.env` dosyasını oluşturun:

```bash
cp env.example .env
```

Aşağıdaki değişkenleri düzenleyin:

```env
# Database
DATABASE_URL="postgresql://radguide_user:your_password@localhost:5432/radguide"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="$(openssl rand -base64 32)"

# Diğer ayarlar varsayılan olarak bırakılabilir
```

### 3. Bağımlılıkları Yükle

```bash
npm install
```

### 4. Veritabanını Hazırla

```bash
# Prisma Client oluştur
npx prisma generate

# Migration'ları çalıştır
npx prisma migrate dev --name init

# Veritabanını görüntüle (opsiyonel)
npx prisma studio
```

### 5. Geliştirme Sunucusunu Başlat

```bash
npm run dev
```

Tarayıcınızda http://localhost:3000 adresini açın.

## 📝 İlk Kullanıcı Oluşturma

1. http://localhost:3000/register adresine gidin
2. Formu doldurun:
   - Ad Soyad
   - E-posta
   - Şifre (min 6 karakter)
   - Rol seçimi (Tekniker veya Raportör)
3. "Kayıt Ol" butonuna tıklayın
4. Login sayfasına yönlendirileceksiniz
5. Giriş yapın ve dashboard'a erişin

## 🔧 Geliştirme Komutları

```bash
# Geliştirme sunucusu
npm run dev

# Production build
npm run build

# Production sunucusu
npm start

# Linting
npm run lint

# Prisma Studio (DB GUI)
npx prisma studio

# Migration oluştur
npx prisma migrate dev --name migration_name

# Veritabanını sıfırla (DİKKAT: Tüm veriyi siler!)
npx prisma migrate reset
```

## 🗄️ Veritabanı Seed (Opsiyonel)

Test verileri eklemek için `prisma/seed.ts` dosyası oluşturun:

```typescript
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
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

  console.log({ admin, tekniker })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

`package.json`'a ekleyin:

```json
{
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  }
}
```

Seed'i çalıştırın:

```bash
npx prisma db seed
```

## 🐛 Sorun Giderme

### Prisma Client hatası

```bash
npx prisma generate
```

### Migration hataları

```bash
npx prisma migrate reset
npx prisma migrate dev
```

### Port zaten kullanımda

```bash
# 3000 portunu kullanan process'i bul
lsof -ti:3000

# Process'i sonlandır
kill -9 $(lsof -ti:3000)
```

### TypeScript hataları

```bash
# node_modules'u temizle
rm -rf node_modules package-lock.json
npm install
```

## 📚 Sonraki Adımlar

1. ✅ Temel kurulum tamamlandı
2. 🔄 Tekniker modüllerini geliştirin (`/dashboard/protocols`, `/dashboard/analysis`)
3. 🔄 Raportör modülünü geliştirin (`/dashboard/reporter`)
4. 🔄 Admin panelini tamamlayın (`/admin/*`)
5. 🔄 API endpoint'lerini ekleyin
6. 🔄 File upload entegrasyonu
7. 🔄 Speech-to-text entegrasyonu
8. 🔄 Test yazın

## 💡 Faydalı Linkler

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [NextAuth.js Docs](https://next-auth.js.org)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)

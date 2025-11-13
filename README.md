# RadGuide - Dijital Radyoloji Rehberiniz

RadGuide, radyoloji tekniker ve raportörleri için geliştirilmiş, rol bazlı bir web uygulamasıdır. Çekim protokolleri, AI destekli görüntü analizi ve rapor yazımı araçlarını tek platformda sunar.

## 🚀 Özellikler

### Tekniker Modülü
- ✅ Çekim protokollerine erişim (XR, MR, CT, US, NM)
- ✅ AI destekli görüntü analizi
- ✅ Kalite değerlendirme araçları

### Raportör Modülü
- ✅ Ses kaydı ile rapor oluşturma
- ✅ Otomatik transkripsiyon (Whisper/Deepgram)
- ✅ Rapor doğrulama ve kalite kontrolü

### Admin Paneli
- ✅ Kullanıcı yönetimi
- ✅ Protokol CRUD işlemleri
- ✅ Webhook yapılandırması
- ✅ Sistem logları ve raporlama

## 🛠️ Teknoloji Yığını

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Authentication:** NextAuth.js v5
- **Database:** PostgreSQL + Prisma ORM
- **Form Validation:** React Hook Form + Zod
- **Logging:** Pino
- **Icons:** Lucide React + Material Symbols

## 📦 Kurulum

### 1. Bağımlılıkları Yükleyin

```bash
npm install
```

### 2. Ortam Değişkenlerini Ayarlayın

`.env` dosyasını oluşturun (env.example'dan kopyalayın):

```bash
cp env.example .env
```

Gerekli değişkenleri düzenleyin:

```env
DATABASE_URL=postgresql://user:pass@localhost:5432/radguide
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

### 3. Veritabanını Hazırlayın

```bash
# Prisma client oluştur
npx prisma generate

# Veritabanı migration'larını çalıştır
npx prisma migrate dev --name init

# (Opsiyonel) Seed data ekle
npx prisma db seed
```

### 4. Geliştirme Sunucusunu Başlatın

```bash
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## 📁 Proje Yapısı

```
radguide/
├── app/
│   ├── (auth)/              # Auth sayfaları (login, register)
│   ├── (public)/            # Public sayfalar (landing)
│   ├── dashboard/           # Rol bazlı dashboard
│   ├── admin/               # Admin paneli
│   └── api/                 # API routes
├── components/
│   ├── landing/             # Landing page componentleri
│   └── ui/                  # Reusable UI componentleri
├── lib/
│   ├── auth.ts              # NextAuth yapılandırması
│   ├── db.ts                # Prisma client
│   ├── logger.ts            # Pino logger
│   └── utils.ts             # Utility fonksiyonlar
├── prisma/
│   └── schema.prisma        # Database şeması
└── types/                   # TypeScript type definitions
```

## 🔐 Roller ve İzinler

### TEKNIKER
- Çekim protokollerine erişim
- Görüntü analizi yapma
- Kendi loglarını görüntüleme

### RAPORTOR
- Ses kaydı ile rapor oluşturma
- Rapor doğrulama
- Kendi loglarını görüntüleme

### ADMIN
- Tüm kullanıcı yetkilerine ek olarak:
- Kullanıcı yönetimi
- Protokol CRUD
- Webhook yönetimi
- Tüm sistem loglarına erişim

## 🗄️ Veritabanı Modelleri

- **User:** Kullanıcı bilgileri ve rol tanımları
- **Protocol:** Çekim protokolleri (modalite bazlı)
- **AnalysisJob:** Görüntü analizi işleri
- **ReportRecord:** Rapor kayıtları
- **LogEntry:** Sistem ve kullanıcı logları
- **WebhookConfig:** Webhook yapılandırmaları
- **SiteSetting:** Site ayarları

## 🧪 Test

```bash
npm run test
```

## 📝 API Endpoints

### Auth
- `POST /api/auth/register` - Yeni kullanıcı kaydı
- `POST /api/auth/[...nextauth]` - NextAuth endpoints

### Protocols (Yakında)
- `GET /api/protocols` - Protokol listesi
- `POST /api/protocols` - Yeni protokol
- `PATCH /api/protocols/:id` - Protokol güncelle
- `DELETE /api/protocols/:id` - Protokol sil

### Analysis (Yakında)
- `POST /api/analysis/jobs` - Yeni analiz işi
- `GET /api/analysis/jobs/:id` - Analiz sonucu

### Reporter (Yakında)
- `POST /api/reporter/transcribe` - Ses transkripsiyon
- `POST /api/reporter/validate` - Rapor doğrulama

## 🚧 Geliştirme Durumu

✅ **Tamamlanan:**
- Proje iskeleti ve temel yapı
- Landing page
- Authentication sistemi (login/register)
- Rol bazlı yetkilendirme
- Veritabanı şeması
- Dashboard temel yapısı

🔄 **Devam Eden:**
- Tekniker modülleri (Protokoller, Analiz)
- Raportör modülü
- Admin paneli

⏳ **Planlanan:**
- API endpoints
- File upload (UploadThing/S3)
- Speech-to-text entegrasyonu
- Webhook sistemi
- Unit ve integration testler

## 📄 Lisans

Bu proje özel bir projedir.

## 👥 Katkıda Bulunanlar

RadGuide ekibi tarafından geliştirilmektedir.

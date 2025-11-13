# 🚀 RadGuide - Hızlı Başlangıç

## Proje Başarıyla Oluşturuldu! ✅

RadGuide web uygulamanız hazır. Aşağıdaki adımları takip ederek projeyi çalıştırabilirsiniz.

## 📍 Şu Anda Neredeyiz?

✅ **Tamamlanan:**
- Next.js 14 projesi kuruldu
- Landing page entegre edildi
- Login/Register sayfaları hazır
- Dashboard temel yapısı oluşturuldu
- Veritabanı şeması hazır
- Authentication sistemi çalışıyor

## 🎯 İlk Adımlar

### 1. PostgreSQL Veritabanı Oluşturun

```bash
# PostgreSQL'e bağlanın
psql -U postgres

# Veritabanı oluşturun
CREATE DATABASE radguide;
CREATE USER radguide_user WITH PASSWORD 'radguide123';
GRANT ALL PRIVILEGES ON DATABASE radguide TO radguide_user;
\q
```

### 2. .env Dosyasını Düzenleyin

`.env` dosyası zaten oluşturuldu. Aşağıdaki değerleri güncelleyin:

```env
DATABASE_URL="postgresql://radguide_user:radguide123@localhost:5432/radguide"
NEXTAUTH_SECRET="$(openssl rand -base64 32 kullanarak üretin)"
```

### 3. Veritabanını Başlatın

```bash
# Prisma client oluştur
npm run db:generate

# Migration'ları çalıştır
npm run db:migrate

# Veritabanını görüntüle (opsiyonel)
npm run db:studio
```

### 4. Sunucuyu Başlatın

```bash
npm run dev
```

Tarayıcınızda http://localhost:3000 adresini açın.

## 🎨 Sayfalar

- **/** - Landing page (public)
- **/login** - Giriş sayfası
- **/register** - Kayıt sayfası
- **/dashboard** - Ana dashboard (protected)

## 👤 İlk Kullanıcı

1. http://localhost:3000/register adresine gidin
2. Formu doldurun:
   - **Ad Soyad:** Test Kullanıcı
   - **E-posta:** test@radguide.com
   - **Şifre:** test123
   - **Rol:** Tekniker veya Raportör seçin
3. "Kayıt Ol" butonuna tıklayın
4. Login sayfasına yönlendirileceksiniz
5. Giriş yapın ve dashboard'a erişin

## 📂 Proje Yapısı

```
radguide/
├── app/
│   ├── (auth)/login          → Login sayfası
│   ├── (auth)/register       → Register sayfası
│   ├── dashboard             → Dashboard (rol bazlı)
│   ├── api/auth              → Auth API endpoints
│   └── page.tsx              → Landing page
├── components/landing/       → Landing page componentleri
├── lib/                      → Utilities (auth, db, logger)
├── prisma/schema.prisma      → Database schema
└── types/                    → TypeScript definitions
```

## 🔑 Roller

### TEKNIKER
- Çekim protokollerine erişim
- Görüntü analizi

### RAPORTOR
- Rapor yazımı
- Ses kaydı

### ADMIN
- Kullanıcı yönetimi
- Sistem ayarları

## 🛠️ Faydalı Komutlar

```bash
# Geliştirme sunucusu
npm run dev

# Production build
npm run build

# Veritabanı yönetimi
npm run db:generate    # Prisma client oluştur
npm run db:migrate     # Migration çalıştır
npm run db:studio      # Database GUI
npm run db:push        # Schema push (dev)
npm run db:reset       # Veritabanını sıfırla

# Linting
npm run lint
```

## 📝 Sonraki Adımlar

### Kısa Vadeli
1. ✅ Temel yapı tamamlandı
2. 🔄 Tekniker modüllerini geliştirin:
   - `/dashboard/protocols` - Protokol listesi
   - `/dashboard/analysis` - Görüntü analizi
3. 🔄 Raportör modülünü geliştirin:
   - `/dashboard/reporter` - Rapor yazımı
4. 🔄 Admin panelini tamamlayın:
   - `/admin/users` - Kullanıcı yönetimi
   - `/admin/protocols` - Protokol CRUD

### Orta Vadeli
- File upload sistemi (UploadThing/S3)
- Speech-to-text entegrasyonu
- Webhook sistemi
- Email notifications

### Uzun Vadeli
- Unit ve integration testler
- Performance optimization
- Analytics dashboard
- Mobile responsive iyileştirmeler

## 📚 Dokümantasyon

- **README.md** - Genel proje bilgileri
- **SETUP.md** - Detaylı kurulum rehberi
- **PROJECT_SUMMARY.md** - Proje özeti ve durum
- **QUICKSTART.md** - Bu dosya

## 🐛 Sorun mu Yaşıyorsunuz?

### Veritabanı bağlantı hatası
```bash
# .env dosyasındaki DATABASE_URL'i kontrol edin
# PostgreSQL'in çalıştığından emin olun
```

### Port zaten kullanımda
```bash
# 3000 portunu kullanan process'i sonlandırın
lsof -ti:3000 | xargs kill -9
```

### Prisma hatası
```bash
# Prisma client'ı yeniden oluşturun
npm run db:generate
```

## ✨ Özellikler

- ✅ Modern, responsive tasarım
- ✅ Dark mode
- ✅ Rol bazlı yetkilendirme
- ✅ Güvenli authentication
- ✅ Type-safe (TypeScript)
- ✅ Database migrations
- ✅ Logging sistemi

## 🎉 Başarılar!

RadGuide projeniz hazır. İyi çalışmalar!

---

**Not:** Herhangi bir sorunla karşılaşırsanız, dokümantasyon dosyalarına bakın veya issue açın.

# 🔐 Test Kullanıcıları

Veritabanında aşağıdaki test kullanıcıları oluşturulmuştur:

## 👤 Admin Kullanıcı
- **Email:** admin@radguide.com
- **Şifre:** admin123
- **Rol:** ADMIN
- **Yetkiler:** Tüm modüllere erişim + admin paneli

## 👤 Tekniker Kullanıcı
- **Email:** tekniker@radguide.com
- **Şifre:** tekniker123
- **Rol:** TEKNIKER
- **Yetkiler:** Protokoller + Görüntü Analizi

## 👤 Raportör Kullanıcı
- **Email:** raportor@radguide.com
- **Şifre:** raportor123
- **Rol:** RAPORTOR
- **Yetkiler:** Rapor Yazımı + Ses Kaydı

---

## 🚀 Kullanım

1. http://localhost:3000/login adresine gidin
2. Yukarıdaki kullanıcı bilgilerinden birini kullanın
3. Dashboard'a yönlendirileceksiniz

## 🔄 Yeni Kullanıcı Kaydetme

1. http://localhost:3000/register adresine gidin
2. Formu doldurun
3. Rol seçin (Tekniker veya Raportör)
4. "Kayıt Ol" butonuna tıklayın
5. Login sayfasına yönlendirileceksiniz

## 🗄️ Veritabanı

- **Tip:** SQLite
- **Dosya:** `prisma/dev.db`
- **Yönetim:** `npm run db:studio` komutu ile Prisma Studio'yu açabilirsiniz

## 🔧 Seed Tekrar Çalıştırma

```bash
npm run db:seed
```

Bu komut mevcut kullanıcıları güncelleyecek veya yoksa oluşturacaktır (upsert).

# 🔐 RadGuide Admin Rehberi

## Admin Paneli Özellikleri

### 1. Kullanıcı Yönetimi (`/admin/users`)

**Özellikler:**
- ✅ Tüm kullanıcıları listeleme
- ✅ Yeni kullanıcı oluşturma
- ✅ Kullanıcı düzenleme (ad, email, rol, şifre)
- ✅ Kullanıcı silme
- ✅ Rol bazlı filtreleme

**Roller:**
- **ADMIN:** Tüm yetkilere sahip
- **TEKNIKER:** Protokoller + Görüntü Analizi
- **RAPORTOR:** Rapor Yazımı + Ses Kaydı

### 2. Protokol Yönetimi (`/admin/protocols`)

**Özellikler:**
- ✅ Protokol oluşturma, düzenleme, silme
- ✅ Modalite bazlı filtreleme (XR, CT, MR, NM, US)
- ✅ Yayınlama/Taslak durumu
- ✅ Excel ile toplu import/export
- ✅ Markdown destekli içerik editörü

**Modaliteler:**
- **XR:** Röntgen 🩻
- **CT:** Bilgisayarlı Tomografi 🔬
- **MR:** Manyetik Rezonans 🧲
- **NM:** Nükleer Tıp ☢️
- **US:** Ultrason 📡

### 3. Log Görüntüleme (`/admin/logs`)

**Özellikler:**
- ✅ Tüm sistem loglarını görüntüleme
- ✅ Kapsam bazlı filtreleme (auth, admin, analysis, reporter, webhook)
- ✅ Seviye bazlı filtreleme (info, warn, error)
- ✅ Kullanıcı bazlı izleme
- ✅ Zaman damgası ile sıralama

**Log Kapsamları:**
- **auth:** Giriş/Kayıt işlemleri
- **admin:** Admin panel işlemleri
- **analysis:** Görüntü analizi işlemleri
- **reporter:** Rapor yazımı işlemleri
- **webhook:** Webhook çağrıları

## Excel Import/Export

### Export İşlemi

1. `/admin/protocols` sayfasına gidin
2. İstediğiniz modaliteyi filtreleyin (veya "Tümü" seçin)
3. "📤 Dışa Aktar" butonuna tıklayın
4. Excel dosyası otomatik indirilecek

**Dosya Formatı:**
- ID, Modalite, Başlık, İçerik, Etiketler, Yayınlandı, Oluşturulma, Güncellenme

### Import İşlemi

1. `/admin/protocols` sayfasına gidin
2. "📥 İçe Aktar" butonuna tıklayın
3. Excel dosyasını seçin
4. Sistem otomatik olarak protokolleri içe aktaracak

**Excel Şablonu:**
| Modalite | Başlık | İçerik | Etiketler | Yayınlandı |
|----------|--------|--------|-----------|------------|
| XR | Akciğer Grafisi | Detaylı protokol... | akciğer,toraks | Evet |
| CT | Beyin BT | Protokol içeriği... | beyin,nöro | Hayır |

**Geçerli Modalite Değerleri:**
- XR, CT, MR, NM, US

## Kullanıcı Arayüzü

### Tekniker/Raportör Protokol Görüntüleme (`/dashboard/protocols`)

**Özellikler:**
- ✅ Sadece yayınlanmış protokolleri görüntüleme
- ✅ Modalite bazlı filtreleme
- ✅ Arama fonksiyonu
- ✅ Detaylı protokol görüntüleme (modal)
- ✅ Responsive tasarım

**Kullanım:**
1. Dashboard'dan "Protokoller" kartına tıklayın
2. İstediğiniz modaliteyi seçin
3. Protokol kartına tıklayarak detayları görün

## API Endpoints

### Admin Endpoints (Sadece ADMIN)

```bash
# Kullanıcı Yönetimi
GET    /api/admin/users
POST   /api/admin/users
PATCH  /api/admin/users/[id]
DELETE /api/admin/users/[id]

# Protokol Yönetimi
GET    /api/admin/protocols
POST   /api/admin/protocols
PATCH  /api/admin/protocols/[id]
DELETE /api/admin/protocols/[id]

# Excel İşlemleri
GET    /api/admin/protocols/export?modality=XR
POST   /api/admin/protocols/import

# Log Görüntüleme
GET    /api/admin/logs?scope=auth&level=error
```

### Kullanıcı Endpoints (Tüm Roller)

```bash
# Protokol Görüntüleme
GET    /api/protocols?modality=XR
GET    /api/protocols/[id]
```

## Güvenlik

- ✅ Tüm admin endpoint'leri `requireAdmin()` ile korunuyor
- ✅ Kullanıcı endpoint'leri `requireAuth()` ile korunuyor
- ✅ Middleware ile route koruması
- ✅ Tüm işlemler loglanıyor
- ✅ Şifreler bcrypt ile hash'leniyor

## Test Senaryoları

### 1. Kullanıcı Oluşturma
```
1. Admin olarak giriş yap
2. /admin/users sayfasına git
3. "+ Yeni Kullanıcı" butonuna tıkla
4. Formu doldur ve kaydet
5. Kullanıcı listesinde görünmeli
```

### 2. Protokol Ekleme
```
1. Admin olarak giriş yap
2. /admin/protocols sayfasına git
3. "+ Yeni Protokol" butonuna tıkla
4. Modalite seç (örn: XR)
5. Başlık ve içerik gir
6. "Yayınla" işaretle
7. Kaydet
```

### 3. Excel Import
```
1. Excel şablonunu hazırla
2. /admin/protocols sayfasına git
3. "📥 İçe Aktar" butonuna tıkla
4. Dosyayı seç
5. Başarı mesajını kontrol et
```

### 4. Protokol Görüntüleme (Kullanıcı)
```
1. Tekniker olarak giriş yap
2. Dashboard'dan "Protokoller" kartına tıkla
3. Modalite seç (örn: Röntgen)
4. Protokol kartına tıkla
5. Detayları görüntüle
```

## Sorun Giderme

### "Yetkisiz Erişim" Hatası
- Admin hesabıyla giriş yaptığınızdan emin olun
- Session'ınızı kontrol edin (çıkış yapıp tekrar giriş)

### Excel Import Başarısız
- Modalite değerlerinin doğru olduğundan emin olun (XR, CT, MR, NM, US)
- Başlık ve İçerik alanlarının dolu olduğunu kontrol edin
- Excel dosyasının .xlsx formatında olduğunu kontrol edin

### Protokoller Görünmüyor
- Protokollerin "Yayınlandı" olarak işaretlendiğinden emin olun
- Doğru modalite filtresini seçtiğinizi kontrol edin

## İpuçları

1. **Toplu İşlemler:** Excel ile birden fazla protokol eklemek için import kullanın
2. **Yedekleme:** Düzenli olarak protokolleri export edin
3. **Log İzleme:** Şüpheli aktiviteler için logları düzenli kontrol edin
4. **Rol Yönetimi:** Kullanıcılara en az yetki prensibini uygulayın
5. **Test Kullanıcıları:** Production'da test kullanıcılarını silin

## Gelecek Özellikler

- [ ] Protokol versiyonlama
- [ ] Protokol onay sistemi
- [ ] Toplu kullanıcı import
- [ ] Gelişmiş log analizi
- [ ] Email bildirimleri
- [ ] Protokol şablonları

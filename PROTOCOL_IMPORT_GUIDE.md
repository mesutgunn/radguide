# 📋 Protokol İçe Aktarma Rehberi

## 🎯 Genel Bakış

RadGuide, her modalite için özel Excel şablonları kullanarak protokol içe aktarma işlemini destekler. Her modalite (Röntgen, BT, MR, Nükleer Tıp, Ultrason) için farklı alan yapıları vardır.

## 📝 Modalite Bazlı Şablonlar

### 1. Röntgen (XR) Şablonu

**Gerekli Alanlar:**
- Bölge (zorunlu)
- Kategori (zorunlu)
- Açıklama (zorunlu)

**Tüm Alanlar:**
| Alan Adı | Açıklama | Örnek |
|----------|----------|-------|
| Bölge | Çekim bölgesi | Göğüs, Abdomen, Ekstremite |
| Kategori | Çekim pozisyonu | PA, AP, Lateral, Oblik |
| Açıklama | Detaylı açıklama | Akciğer grafisi PA pozisyon |
| Amp | Tüp voltajı | 125 |
| İndikatörler | Endikasyonlar | Solunum sıkıntısı, öksürük |
| İnsan İsareti | Hasta pozisyonu | Ayakta, Yatar |
| Pozisyonlama | Detaylı pozisyon | Hasta ayakta, göğüs kasete yapışık |
| Işınlama | Merkezi ışın | T7 seviyesi |
| Merkezleme | Merkezleme noktası | Orta hat, skapula dışı |
| Kıp | Tüp akımı | 10 |
| mAs | Milliamper-saniye | 3-5 |
| Mesafe | Odak-film mesafesi | 180 cm |
| Artefakt Kontrolü | Artefakt önlemleri | Metal, takı çıkarılır |
| Radyasyon Güvenliği | Koruma önlemleri | Gonad koruma |
| İlk Hazırlık | Hasta hazırlığı | Üst giysi çıkarılır |
| Değerlendirme | Değerlendirme kriterleri | Akciğer alanları, kalp gölgesi |
| Notlar | Ek notlar | Derin inspiryumda çekim |

**Örnek Satır:**
```
Bölge: Göğüs
Kategori: PA
Açıklama: Akciğer grafisi PA pozisyon
Amp: 125
İndikatörler: Solunum sıkıntısı, öksürük
...
```

### 2. BT (CT) Şablonu

**Gerekli Alanlar:**
- İnceleme Bölgesi
- Protokol Adı

**Tüm Alanlar:**
| Alan Adı | Açıklama | Örnek |
|----------|----------|-------|
| İnceleme Bölgesi | Tarama bölgesi | Beyin, Toraks, Abdomen |
| Protokol Adı | Protokol ismi | Beyin BT (Kontrastsız) |
| Endikasyon | Endikasyonlar | Travma, akut nörolojik bulgular |
| Hasta Pozisyonu | Pozisyon | Supin, baş önce |
| Tarama Yönü | Tarama yönü | Kaudokranial |
| kV | Tüp voltajı | 120 |
| mAs | Tüp akımı | 300-350 |
| Pitch | Pitch değeri | 0.8 |
| Kollimasyonu | Kollimator | 64x0.6 |
| Kesit Kalınlığı | Kesit kalınlığı | 5 mm |
| Rekonstrüksiyon | Rekonstrüksiyon | 0.625 mm |
| Kontrast | Kontrast kullanımı | Evet/Hayır |
| Kontrast Miktarı | Kontrast dozu | 100 ml |
| Enjeksiyon Hızı | Enjeksiyon hızı | 3 ml/sn |
| Gecikme Süresi | Gecikme | 70 sn |
| Faz Sayısı | Faz sayısı | 1, 2, 3 |
| Özel Notlar | Ek bilgiler | Kemik ve yumuşak doku penceresi |

### 3. MR Şablonu

**Gerekli Alanlar:**
- İnceleme Bölgesi
- Protokol Adı
- Sekans Tipi

**Tüm Alanlar:**
| Alan Adı | Açıklama | Örnek |
|----------|----------|-------|
| İnceleme Bölgesi | İnceleme bölgesi | Beyin, Omurga, Eklem |
| Protokol Adı | Protokol ismi | Rutin Beyin MR |
| Endikasyon | Endikasyonlar | Nörolojik semptomlar |
| Hasta Pozisyonu | Pozisyon | Supin, baş önce |
| Koil | Kullanılan koil | Head coil, Body coil |
| Sekans Tipi | Sekans | T1, T2, FLAIR, DWI |
| Düzlem | Görüntüleme düzlemi | Aksiyel, Sagital, Koronal |
| TR | Tekrar zamanı | 2000 |
| TE | Eko zamanı | 20 |
| Flip Angle | Flip açısı | 90 |
| FOV | Görüş alanı | 24 cm |
| Slice Thickness | Kesit kalınlığı | 5 mm |
| Matrix | Matris boyutu | 256x256 |
| NEX | Ortalama sayısı | 2 |
| Kontrast | Kontrast kullanımı | Opsiyonel |
| Kontrast Dozu | Kontrast dozu | 0.1 mmol/kg |
| Özel Teknikler | Özel teknikler | DWI, SWI, MRA |
| Notlar | Ek notlar | Hareket artefaktına dikkat |

### 4. Nükleer Tıp (NM) Şablonu

**Gerekli Alanlar:**
- İnceleme Tipi
- Radyofarmasötik
- Aktivite (mCi)

**Tüm Alanlar:**
| Alan Adı | Açıklama | Örnek |
|----------|----------|-------|
| İnceleme Tipi | İnceleme türü | Kemik Sintigrafisi, Tiroid |
| Radyofarmasötik | Kullanılan RF | Tc-99m MDP, I-131 |
| Aktivite (mCi) | Aktivite miktarı | 20-25 |
| Uygulama Yolu | Uygulama şekli | İntravenöz, Oral |
| Hasta Hazırlığı | Hazırlık | Bol su içme, Açlık |
| Bekleme Süresi | Bekleme süresi | 2-4 saat |
| Görüntüleme Pozisyonu | Pozisyon | Supin, Prone |
| Dedektör | Dedektör tipi | Dual head, Single head |
| Kollimatör | Kollimatör | LEHR, MEGP |
| Matris | Matris | 256x256 |
| Zoom | Zoom faktörü | 1.0 |
| Görüntü Sayısı | Görüntü sayısı | Tüm vücut, 64 projeksiyon |
| Süre/Görüntü | Süre | 15 cm/dk, 30 sn/görüntü |
| Enerji Penceresi | Enerji | 140 keV ±10% |
| Özel Protokoller | Özel teknikler | SPECT, SPECT/CT |
| Güvenlik Önlemleri | Güvenlik | Radyasyon güvenliği |
| Notlar | Ek notlar | Mesane boşaltma |

### 5. Ultrason (US) Şablonu

**Gerekli Alanlar:**
- İnceleme Bölgesi
- Protokol Adı

**Tüm Alanlar:**
| Alan Adı | Açıklama | Örnek |
|----------|----------|-------|
| İnceleme Bölgesi | İnceleme bölgesi | Abdomen, Pelvis, Vasküler |
| Protokol Adı | Protokol ismi | Üst Abdomen USG |
| Endikasyon | Endikasyonlar | Karın ağrısı, sarılık |
| Hasta Pozisyonu | Pozisyon | Supin, Lateral |
| Prob Tipi | Prob | Konveks, Lineer, Sektör |
| Frekans | Frekans aralığı | 3-5 MHz, 7-12 MHz |
| Preset | Cihaz preset | Abdomen, Vasküler |
| Derinlik | Görüntüleme derinliği | 15-20 cm |
| Gain | Kazanç | Düşük, Orta, Yüksek |
| Focus | Odak noktası | Yüzeyel, Orta, Derin |
| Görüntüleme Düzlemi | Düzlem | Transvers, Longitudinal |
| Doppler | Doppler kullanımı | Color, Power, Spektral |
| Hasta Hazırlığı | Hazırlık | 6-8 saat açlık, Dolu mesane |
| Özel Teknikler | Teknikler | Derin inspiryum, Valsalva |
| Ölçümler | Yapılacak ölçümler | Organ boyutları, Akım hızları |
| Değerlendirme | Değerlendirme | Karaciğer, safra kesesi |
| Notlar | Ek notlar | Gaz artefaktına dikkat |

## 🚀 Kullanım Adımları

### Adım 1: Şablon İndirme
1. `/admin/protocols` sayfasına gidin
2. İstediğiniz modaliteyi seçin (örn: Röntgen)
3. "📋 Şablon İndir" butonuna tıklayın
4. Excel dosyası otomatik indirilecek

### Adım 2: Excel Dosyasını Doldurma
1. İndirilen şablonu açın
2. Örnek satırı referans alarak yeni satırlar ekleyin
3. **Gerekli alanları mutlaka doldurun**
4. Türkçe karakterlere dikkat edin (ı, ş, ğ, ü, ö, ç)
5. Dosyayı kaydedin

### Adım 3: İçe Aktarma
1. `/admin/protocols` sayfasına gidin
2. **Aynı modaliteyi seçin** (önemli!)
3. "📥 İçe Aktar" butonuna tıklayın
4. Doldurduğunuz Excel dosyasını seçin
5. Başarı mesajını bekleyin

## ⚠️ Önemli Notlar

### Modalite Seçimi
- İçe aktarma yapmadan önce **mutlaka** doğru modaliteyi seçin
- "Tümü" seçiliyken içe aktarma yapılamaz
- Şablon indirme ve içe aktarma aynı modalite için yapılmalı

### Alan İsimleri
- Excel'deki kolon başlıkları **tam olarak** şablondaki gibi olmalı
- Türkçe karakterler önemli (İ ≠ I, ı ≠ i)
- Büyük/küçük harf duyarlı değil

### Veri Formatı
- Sayısal değerler: 125, 3-5, 20-25
- Evet/Hayır: "Evet", "Hayır", "Opsiyonel"
- Çoklu değerler: Virgülle ayırın

### Hata Durumları
- Gerekli alanlar boş bırakılırsa satır atlanır
- Hatalı satırlar raporlanır
- Başarılı satırlar içe aktarılır

## 📊 Örnek Kullanım Senaryosu

### Senaryo: 50 Röntgen Protokolü İçe Aktarma

1. **Hazırlık**
   ```
   - Protokol Yönetimi sayfasına git
   - "Röntgen" sekmesini seç
   - "📋 Şablon İndir" butonuna tıkla
   ```

2. **Excel Doldurma**
   ```
   - Şablonu aç
   - Örnek satırı kopyala
   - 50 farklı protokol için satırları doldur
   - Kaydet
   ```

3. **İçe Aktarma**
   ```
   - "Röntgen" sekmesinin seçili olduğundan emin ol
   - "📥 İçe Aktar" butonuna tıkla
   - Dosyayı seç
   - Sonucu bekle: "50 protokol içe aktarıldı"
   ```

4. **Kontrol**
   ```
   - Protokol listesinde yeni protokolleri gör
   - Detaylarını kontrol et
   - Gerekirse düzenle
   ```

## 🔍 Sorun Giderme

### "Modalite seçilmedi" Hatası
**Çözüm:** Önce bir modalite sekmesine tıklayın (Röntgen, BT, vb.)

### "Gerekli alanlar eksik" Hatası
**Çözüm:** Şablondaki zorunlu alanları kontrol edin ve doldurun

### Türkçe Karakter Sorunu
**Çözüm:** Excel dosyasını UTF-8 formatında kaydedin

### Bazı Satırlar İçe Aktarılmadı
**Çözüm:** Hata mesajlarını okuyun, eksik alanları tamamlayın

## 💡 İpuçları

1. **Küçük Başlayın:** İlk denemede 2-3 satır ile test edin
2. **Şablonu Değiştirmeyin:** Kolon başlıklarını değiştirmeyin
3. **Yedek Alın:** Mevcut protokolleri export edin
4. **Toplu İşlem:** Aynı anda 100+ protokol ekleyebilirsiniz
5. **Düzenli Güncelleme:** Protokolleri düzenli olarak güncelleyin

## 📞 Destek

Sorun yaşarsanız:
- Hata mesajlarını kaydedin
- Örnek Excel dosyasını kontrol edin
- Admin loglarını inceleyin (`/admin/logs`)

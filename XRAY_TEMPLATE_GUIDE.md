# 🩻 Röntgen Protokol Şablonu Rehberi

## 📋 Şablon Başlıkları

Röntgen protokol şablonu aşağıdaki 17 başlıktan oluşur:

### Zorunlu Alanlar ⭐
1. **Başlık** - Protokol başlığı (örn: "Akciğer Grafisi PA")
2. **Kategori** - Bölge kategorisi (örn: "Göğüs", "Abdomen", "Ekstremite")
3. **Açıklama** - Kısa açıklama

### Opsiyonel Alanlar
4. **Amaç** - Çekimin amacı
5. **Endikasyonlar** - Hangi durumlarda yapılır
6. **Hasta Hazırlığı** - Hasta hazırlık adımları
7. **Pozisyonlama** - Hasta pozisyonu detayları
8. **Işınlama** - Merkezi ışın yönlendirmesi
9. **Nefes Tutma** - Nefes tutma talimatları
10. **kVp** - Tüp voltajı (kilovolt peak)
11. **mAs** - Milliamper-saniye
12. **Mesafe** - Odak-film mesafesi
13. **Artefakt Kontrolü** - Artefakt önleme yöntemleri
14. **Radyasyon Güvenliği** - Güvenlik önlemleri
15. **Sık Hatalar** - Sık yapılan hatalar
16. **Değerlendirme** - Değerlendirme kriterleri
17. **Notlar** - Ek notlar

## 📊 Örnek Veri

### Örnek 1: Akciğer Grafisi PA

| Alan | Değer |
|------|-------|
| **Başlık** | Akciğer Grafisi PA |
| **Kategori** | Göğüs |
| **Açıklama** | Posterior-anterior akciğer grafisi |
| **Amaç** | Akciğer parankimi, kalp ve mediastinal yapıların değerlendirilmesi |
| **Endikasyonlar** | Solunum sıkıntısı, öksürük, göğüs ağrısı, pnömoni şüphesi |
| **Hasta Hazırlığı** | Üst giysi, takı ve metal objeler çıkarılır |
| **Pozisyonlama** | Hasta ayakta, göğüs ön yüzü kasete yapışık, eller belde, skapulalar öne alınır |
| **Işınlama** | Merkezi ışın T7 seviyesine, orta hatta dik olarak yönlendirilir |
| **Nefes Tutma** | Derin inspiryumda nefes tutulur |
| **kVp** | 125 |
| **mAs** | 3-5 |
| **Mesafe** | 180 cm |
| **Artefakt Kontrolü** | Metal, takı, saç tokası, bariyer, protez çıkarılır. Skapulalar akciğer alanı dışına alınır |
| **Radyasyon Güvenliği** | Gonad koruma kullanılır. Kollimasyonu akciğer alanı ile sınırlandırılır |
| **Sık Hatalar** | Rotasyon, skapula süperpozisyonu, yetersiz inspiryum, hareket bulanıklığı |
| **Değerlendirme** | Her iki akciğer alanı, kostofrenık sinüsler, kalp gölgesi, mediastinum, kemik yapılar |
| **Notlar** | Çekim sırasında hastanın hareket etmemesi önemlidir |

### Örnek 2: Abdomen Direkt Grafi

| Alan | Değer |
|------|-------|
| **Başlık** | Abdomen Direkt Grafi AP |
| **Kategori** | Abdomen |
| **Açıklama** | Ayakta anterior-posterior abdomen grafisi |
| **Amaç** | Batın içi organların, bağırsak gazlarının ve olası patolojilerin değerlendirilmesi |
| **Endikasyonlar** | Karın ağrısı, şişkinlik, ileus şüphesi, perforasyon |
| **Hasta Hazırlığı** | Kemer, metal objeler çıkarılır |
| **Pozisyonlama** | Hasta ayakta, sırtı kasete dönük, eller yanlarda |
| **Işınlama** | Merkezi ışın umbilikus seviyesine, orta hatta |
| **Nefes Tutma** | Ekspiryumda nefes tutulur |
| **kVp** | 80 |
| **mAs** | 10-15 |
| **Mesafe** | 100 cm |
| **Artefakt Kontrolü** | Kemer, düğme, metal objeler çıkarılır |
| **Radyasyon Güvenliği** | Gonad koruma, kollimasyonu abdomen alanı ile sınırlandırılır |
| **Sık Hatalar** | Yetersiz alan, rotasyon, hareket artefaktı |
| **Değerlendirme** | Bağırsak gaz dağılımı, hava-sıvı seviyeleri, organ konturları, kemik yapılar |
| **Notlar** | Serbest hava değerlendirmesi için ayakta çekim tercih edilir |

## 🚀 Kullanım Adımları

### 1. Şablon İndirme
```
1. /admin/protocols sayfasına git
2. "Röntgen" sekmesini seç
3. "📋 Şablon İndir" butonuna tıkla
4. XR_protokol_sablonu.xlsx indirilir
```

### 2. Excel Doldurma
```
1. İndirilen dosyayı aç
2. Örnek satırları incele
3. Yeni satırlar ekle
4. Zorunlu alanları mutlaka doldur:
   - Başlık
   - Kategori
   - Açıklama
5. Diğer alanları ihtiyaca göre doldur
6. Kaydet
```

### 3. İçe Aktarma
```
1. "Röntgen" sekmesinin seçili olduğundan emin ol
2. "📥 İçe Aktar" butonuna tıkla
3. Doldurduğun Excel'i seç
4. Başarı mesajını bekle
```

## 📝 Alan Açıklamaları

### Başlık
- Protokolün kısa ve açıklayıcı adı
- Örnek: "Akciğer Grafisi PA", "El Grafisi AP"

### Kategori
- Anatomik bölge veya sistem
- Örnekler: Göğüs, Abdomen, Ekstremite, Omurga, Kafatası

### Açıklama
- Protokolün detaylı açıklaması
- Hangi pozisyon ve teknik kullanıldığı

### Amaç
- Çekimin klinik amacı
- Hangi yapıların değerlendirileceği

### Endikasyonlar
- Hangi klinik durumlarda yapılır
- Semptomlar ve şüpheler
- Virgülle ayırarak yazın

### Hasta Hazırlığı
- Çekim öncesi yapılması gerekenler
- Çıkarılması gereken objeler
- Özel hazırlık gereksinimleri

### Pozisyonlama
- Hastanın pozisyonu (ayakta, yatar, yan)
- Vücut kısımlarının konumu
- Kaset ile ilişkisi

### Işınlama
- Merkezi ışının yönü
- Anatomik referans noktası
- Açı bilgisi (varsa)

### Nefes Tutma
- İnspiryum / Ekspiryum
- Nefes tutma süresi
- Özel talimatlar

### kVp (Kilovolt Peak)
- Tüp voltajı
- Sayısal değer (örn: 125, 80)
- Bölgeye göre değişir

### mAs (Milliamper-Saniye)
- Tüp akımı ve süre çarpımı
- Sayısal değer veya aralık (örn: 3-5, 10-15)
- Hasta boyutuna göre ayarlanabilir

### Mesafe
- Odak-film mesafesi
- cm cinsinden (örn: 180 cm, 100 cm)
- Standart mesafeler kullanın

### Artefakt Kontrolü
- Artefakt oluşturan faktörler
- Önleme yöntemleri
- Çıkarılması gereken objeler

### Radyasyon Güvenliği
- Koruma yöntemleri
- Gonad koruma
- Kollimasyonu
- ALARA prensibi

### Sık Hatalar
- Teknik hatalar
- Pozisyonlama hataları
- Kalite sorunları
- Virgülle ayırarak yazın

### Değerlendirme
- Değerlendirilecek anatomik yapılar
- Kalite kriterleri
- Görülmesi gereken alanlar

### Notlar
- Ek bilgiler
- Özel durumlar
- Hatırlatmalar

## 💡 İpuçları

### Veri Girişi
- Türkçe karakterlere dikkat edin (ı, ş, ğ, ü, ö, ç)
- Tutarlı terimler kullanın
- Kısaltmalar yerine tam isimler tercih edin

### Teknik Parametreler
- kVp ve mAs değerleri için aralık verebilirsiniz (örn: 3-5)
- Hasta boyutuna göre değişkenlik belirtin
- Standart değerleri kullanın

### Kategoriler
Yaygın kategoriler:
- Göğüs (Akciğer, Mediasten)
- Abdomen (Batın, Pelvis)
- Ekstremite (El, Ayak, Kol, Bacak)
- Omurga (Servikal, Torakal, Lomber)
- Kafatası (Kranium, Sinüs)
- Özel (Mamografi, Dental)

### Pozisyonlar
Yaygın pozisyonlar:
- PA (Posterior-Anterior)
- AP (Anterior-Posterior)
- Lateral (Yan)
- Oblik (Eğik)
- Aksiyel (Eksenel)

## ⚠️ Dikkat Edilmesi Gerekenler

### Zorunlu Alanlar
- Başlık, Kategori ve Açıklama mutlaka doldurulmalı
- Bu alanlar boş bırakılırsa satır atlanır

### Veri Formatı
- Sayısal değerler: Rakam veya aralık (125, 3-5)
- Metin alanlar: Serbest metin
- Çoklu değerler: Virgülle ayırın

### Excel Formatı
- Kolon başlıklarını değiştirmeyin
- Satır ekleyerek devam edin
- .xlsx veya .xls formatında kaydedin

## 🔍 Örnek Protokol Listesi

Yaygın röntgen protokolleri:

**Göğüs:**
- Akciğer Grafisi PA
- Akciğer Grafisi Lateral
- Akciğer Grafisi AP (Yatar)

**Abdomen:**
- Abdomen Direkt Grafi AP
- Abdomen Direkt Grafi Lateral

**Ekstremite:**
- El Grafisi PA
- El Grafisi Oblik
- Ayak Grafisi AP
- Ayak Grafisi Lateral

**Omurga:**
- Servikal Omurga AP
- Servikal Omurga Lateral
- Lomber Omurga AP
- Lomber Omurga Lateral

## 📞 Destek

Sorun yaşarsanız:
1. Örnek verileri kontrol edin
2. Zorunlu alanların dolu olduğundan emin olun
3. Türkçe karakterlerin doğru olduğunu kontrol edin
4. Admin loglarını inceleyin (`/admin/logs`)

---

**Güncelleme:** 10 Kasım 2025
**Versiyon:** 2.1.0

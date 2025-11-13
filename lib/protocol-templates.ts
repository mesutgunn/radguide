// Modalite bazlı Excel şablon yapıları

export const PROTOCOL_TEMPLATES = {
  XR: {
    name: 'Röntgen Protokolü',
    columns: [
      'Başlık',
      'Kategori',
      'Açıklama',
      'Amaç',
      'Endikasyonlar',
      'Hasta Hazırlığı',
      'Pozisyonlama',
      'Işınlama',
      'Nefes Tutma',
      'kVp',
      'mAs',
      'Mesafe',
      'Artefakt Kontrolü',
      'Radyasyon Güvenliği',
      'Sık Hatalar',
      'Değerlendirme',
      'Notlar'
    ],
    requiredFields: ['Başlık', 'Kategori', 'Açıklama'],
    exampleData: [
      {
        'Başlık': 'Akciğer Grafisi PA',
        'Kategori': 'Göğüs',
        'Açıklama': 'Posterior-anterior akciğer grafisi',
        'Amaç': 'Akciğer parankimi, kalp ve mediastinal yapıların değerlendirilmesi',
        'Endikasyonlar': 'Solunum sıkıntısı, öksürük, göğüs ağrısı, pnömoni şüphesi',
        'Hasta Hazırlığı': 'Üst giysi, takı ve metal objeler çıkarılır',
        'Pozisyonlama': 'Hasta ayakta, göğüs ön yüzü kasete yapışık, eller belde, skapulalar öne alınır',
        'Işınlama': 'Merkezi ışın T7 seviyesine, orta hatta dik olarak yönlendirilir',
        'Nefes Tutma': 'Derin inspiryumda nefes tutulur',
        'kVp': '125',
        'mAs': '3-5',
        'Mesafe': '180 cm',
        'Artefakt Kontrolü': 'Metal, takı, saç tokası, bariyer, protez çıkarılır. Skapulalar akciğer alanı dışına alınır',
        'Radyasyon Güvenliği': 'Gonad koruma kullanılır. Kollimasyonu akciğer alanı ile sınırlandırılır',
        'Sık Hatalar': 'Rotasyon, skapula süperpozisyonu, yetersiz inspiryum, hareket bulanıklığı',
        'Değerlendirme': 'Her iki akciğer alanı, kostofrenık sinüsler, kalp gölgesi, mediastinum, kemik yapılar',
        'Notlar': 'Çekim sırasında hastanın hareket etmemesi önemlidir'
      },
      {
        'Başlık': 'Abdomen Direkt Grafi AP',
        'Kategori': 'Abdomen',
        'Açıklama': 'Ayakta anterior-posterior abdomen grafisi',
        'Amaç': 'Batın içi organların, bağırsak gazlarının ve olası patolojilerin değerlendirilmesi',
        'Endikasyonlar': 'Karın ağrısı, şişkinlik, ileus şüphesi, perforasyon',
        'Hasta Hazırlığı': 'Kemer, metal objeler çıkarılır',
        'Pozisyonlama': 'Hasta ayakta, sırtı kasete dönük, eller yanlarda',
        'Işınlama': 'Merkezi ışın umbilikus seviyesine, orta hatta',
        'Nefes Tutma': 'Ekspiryumda nefes tutulur',
        'kVp': '80',
        'mAs': '10-15',
        'Mesafe': '100 cm',
        'Artefakt Kontrolü': 'Kemer, düğme, metal objeler çıkarılır',
        'Radyasyon Güvenliği': 'Gonad koruma, kollimasyonu abdomen alanı ile sınırlandırılır',
        'Sık Hatalar': 'Yetersiz alan, rotasyon, hareket artefaktı',
        'Değerlendirme': 'Bağırsak gaz dağılımı, hava-sıvı seviyeleri, organ konturları, kemik yapılar',
        'Notlar': 'Serbest hava değerlendirmesi için ayakta çekim tercih edilir'
      }
    ]
  },
  
  CT: {
    name: 'BT Protokolü',
    columns: [
      'İnceleme Bölgesi',
      'Protokol Adı',
      'Endikasyon',
      'Hasta Pozisyonu',
      'Tarama Yönü',
      'kV',
      'mAs',
      'Pitch',
      'Kollimasyonu',
      'Kesit Kalınlığı',
      'Rekonstrüksiyon',
      'Kontrast',
      'Kontrast Miktarı',
      'Enjeksiyon Hızı',
      'Gecikme Süresi',
      'Faz Sayısı',
      'Özel Notlar'
    ],
    requiredFields: ['İnceleme Bölgesi', 'Protokol Adı'],
    exampleData: [
      {
        'İnceleme Bölgesi': 'Beyin',
        'Protokol Adı': 'Beyin BT (Kontrastsız)',
        'Endikasyon': 'Travma, akut nörolojik bulgular',
        'Hasta Pozisyonu': 'Supin, baş önce',
        'Tarama Yönü': 'Kaudokranial',
        'kV': '120',
        'mAs': '300-350',
        'Pitch': '0.8',
        'Kollimasyonu': '64x0.6',
        'Kesit Kalınlığı': '5 mm',
        'Rekonstrüksiyon': '0.625 mm',
        'Kontrast': 'Hayır',
        'Kontrast Miktarı': '-',
        'Enjeksiyon Hızı': '-',
        'Gecikme Süresi': '-',
        'Faz Sayısı': '1',
        'Özel Notlar': 'Kemik ve yumuşak doku penceresi'
      }
    ]
  },
  
  MR: {
    name: 'MR Protokolü',
    columns: [
      'İnceleme Bölgesi',
      'Protokol Adı',
      'Endikasyon',
      'Hasta Pozisyonu',
      'Koil',
      'Sekans Tipi',
      'Düzlem',
      'TR',
      'TE',
      'Flip Angle',
      'FOV',
      'Slice Thickness',
      'Matrix',
      'NEX',
      'Kontrast',
      'Kontrast Dozu',
      'Özel Teknikler',
      'Notlar'
    ],
    requiredFields: ['İnceleme Bölgesi', 'Protokol Adı', 'Sekans Tipi'],
    exampleData: [
      {
        'İnceleme Bölgesi': 'Beyin',
        'Protokol Adı': 'Rutin Beyin MR',
        'Endikasyon': 'Nörolojik semptomlar',
        'Hasta Pozisyonu': 'Supin, baş önce',
        'Koil': 'Head coil',
        'Sekans Tipi': 'T1 FLAIR',
        'Düzlem': 'Aksiyel',
        'TR': '2000',
        'TE': '20',
        'Flip Angle': '90',
        'FOV': '24 cm',
        'Slice Thickness': '5 mm',
        'Matrix': '256x256',
        'NEX': '2',
        'Kontrast': 'Opsiyonel',
        'Kontrast Dozu': '0.1 mmol/kg',
        'Özel Teknikler': 'DWI, SWI',
        'Notlar': 'Hareket artefaktına dikkat'
      }
    ]
  },
  
  NM: {
    name: 'Nükleer Tıp Protokolü',
    columns: [
      'İnceleme Tipi',
      'Radyofarmasötik',
      'Aktivite (mCi)',
      'Uygulama Yolu',
      'Hasta Hazırlığı',
      'Bekleme Süresi',
      'Görüntüleme Pozisyonu',
      'Dedektör',
      'Kollimatör',
      'Matris',
      'Zoom',
      'Görüntü Sayısı',
      'Süre/Görüntü',
      'Enerji Penceresi',
      'Özel Protokoller',
      'Güvenlik Önlemleri',
      'Notlar'
    ],
    requiredFields: ['İnceleme Tipi', 'Radyofarmasötik', 'Aktivite (mCi)'],
    exampleData: [
      {
        'İnceleme Tipi': 'Kemik Sintigrafisi',
        'Radyofarmasötik': 'Tc-99m MDP',
        'Aktivite (mCi)': '20-25',
        'Uygulama Yolu': 'İntravenöz',
        'Hasta Hazırlığı': 'Bol su içme',
        'Bekleme Süresi': '2-4 saat',
        'Görüntüleme Pozisyonu': 'Supin',
        'Dedektör': 'Dual head',
        'Kollimatör': 'LEHR',
        'Matris': '256x256',
        'Zoom': '1.0',
        'Görüntü Sayısı': 'Tüm vücut',
        'Süre/Görüntü': '15 cm/dk',
        'Enerji Penceresi': '140 keV ±10%',
        'Özel Protokoller': 'SPECT opsiyonel',
        'Güvenlik Önlemleri': 'Radyasyon güvenliği',
        'Notlar': 'Mesane boşaltma'
      }
    ]
  },
  
  US: {
    name: 'Ultrason Protokolü',
    columns: [
      'İnceleme Bölgesi',
      'Protokol Adı',
      'Endikasyon',
      'Hasta Pozisyonu',
      'Prob Tipi',
      'Frekans',
      'Preset',
      'Derinlik',
      'Gain',
      'Focus',
      'Görüntüleme Düzlemi',
      'Doppler',
      'Hasta Hazırlığı',
      'Özel Teknikler',
      'Ölçümler',
      'Değerlendirme',
      'Notlar'
    ],
    requiredFields: ['İnceleme Bölgesi', 'Protokol Adı'],
    exampleData: [
      {
        'İnceleme Bölgesi': 'Abdomen',
        'Protokol Adı': 'Üst Abdomen USG',
        'Endikasyon': 'Karın ağrısı, sarılık',
        'Hasta Pozisyonu': 'Supin',
        'Prob Tipi': 'Konveks',
        'Frekans': '3-5 MHz',
        'Preset': 'Abdomen',
        'Derinlik': '15-20 cm',
        'Gain': 'Orta',
        'Focus': 'Orta-derin',
        'Görüntüleme Düzlemi': 'Transvers, longitudinal',
        'Doppler': 'Color Doppler',
        'Hasta Hazırlığı': '6-8 saat açlık',
        'Özel Teknikler': 'Derin inspiryum',
        'Ölçümler': 'Organ boyutları',
        'Değerlendirme': 'Karaciğer, safra kesesi, dalak, böbrekler',
        'Notlar': 'Gaz artefaktına dikkat'
      }
    ]
  }
}

export function getTemplateColumns(modality: string) {
  return PROTOCOL_TEMPLATES[modality as keyof typeof PROTOCOL_TEMPLATES]?.columns || []
}

export function getRequiredFields(modality: string) {
  return PROTOCOL_TEMPLATES[modality as keyof typeof PROTOCOL_TEMPLATES]?.requiredFields || []
}

export function getExampleData(modality: string) {
  return PROTOCOL_TEMPLATES[modality as keyof typeof PROTOCOL_TEMPLATES]?.exampleData || []
}

export function getTemplateName(modality: string) {
  return PROTOCOL_TEMPLATES[modality as keyof typeof PROTOCOL_TEMPLATES]?.name || 'Protokol'
}

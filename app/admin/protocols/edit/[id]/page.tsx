'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import Breadcrumb from '@/components/layout/Breadcrumb'

const MODALITIES = [
  { value: 'XR', label: 'Röntgen (XR)' },
  { value: 'CT', label: 'BT (CT)' },
  { value: 'MR', label: 'MR' },
  { value: 'NM', label: 'Nükleer Tıp (NM)' },
  { value: 'US', label: 'Ultrason (US)' },
]

export default function EditProtocolPage() {
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    modality: 'XR',
    title: '',
    bodyMarkdown: '',
    tags: '',
    isPublished: false
  })

  const [xrayFields, setXrayFields] = useState({
    baslik: '',
    kategori: '',
    aciklama: '',
    amac: '',
    endikasyonlar: '',
    hastaHazırlığı: '',
    pozisyonlama: '',
    isinlama: '',
    nefesTutma: '',
    kVp: '',
    mAs: '',
    mesafe: '',
    artefaktKontrolu: '',
    radyasyonGuvenligi: '',
    sikHatalar: '',
    degerlendirme: '',
    notlar: ''
  })

  useEffect(() => {
    fetchProtocol()
  }, [params.id])

  const fetchProtocol = async () => {
    try {
      const res = await fetch(`/api/admin/protocols/${params.id}`)
      if (res.ok) {
        const data = await res.json()
        console.log('Fetched protocol:', data) // Debug için
        
        setFormData({
          modality: data.modality,
          title: data.title,
          bodyMarkdown: data.bodyMarkdown,
          tags: data.tags,
          isPublished: data.isPublished
        })
        
        // Röntgen ise markdown'dan alanları parse et
        if (data.modality === 'XR') {
          console.log('Parsing XR markdown:', data.bodyMarkdown) // Debug için
          const parsed = parseMarkdownToXrayFields(data.bodyMarkdown)
          console.log('Parsed fields:', parsed) // Debug için
          setXrayFields(parsed)
        }
      } else {
        const errorData = await res.json().catch(() => ({}))
        console.error('API error:', res.status, errorData)
        alert(`Protokol yüklenemedi: ${errorData.error || 'Bilinmeyen hata'}`)
      }
    } catch (error) {
      console.error('Protokol yüklenemedi:', error)
      alert('Protokol yüklenirken bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const parseMarkdownToXrayFields = (markdown: string) => {
    const fields: any = {
      baslik: '',
      kategori: '',
      aciklama: '',
      amac: '',
      endikasyonlar: '',
      hastaHazırlığı: '',
      pozisyonlama: '',
      isinlama: '',
      nefesTutma: '',
      kVp: '',
      mAs: '',
      mesafe: '',
      artefaktKontrolu: '',
      radyasyonGuvenligi: '',
      sikHatalar: '',
      degerlendirme: '',
      notlar: ''
    }

    // Başlık
    const baslikMatch = markdown.match(/^#\s+(.+)$/m)
    if (baslikMatch) fields.baslik = baslikMatch[1].trim()

    // Kategori
    const kategoriMatch = markdown.match(/\*\*Kategori:\*\*\s*(.+?)(?:\n|$)/)
    if (kategoriMatch) fields.kategori = kategoriMatch[1].trim()

    // Açıklama
    const aciklamaMatch = markdown.match(/\*\*Açıklama:\*\*\s*([\s\S]+?)(?:\n\n|\*\*|$)/)
    if (aciklamaMatch) fields.aciklama = aciklamaMatch[1].trim()

    // Amaç
    const amacMatch = markdown.match(/\*\*Amaç:\*\*\s*([\s\S]+?)(?:\n\n|\*\*|$)/)
    if (amacMatch) fields.amac = amacMatch[1].trim()

    // Endikasyonlar
    const endikasyonlarMatch = markdown.match(/\*\*Endikasyonlar:\*\*\s*([\s\S]+?)(?:\n\n|\*\*|$)/)
    if (endikasyonlarMatch) fields.endikasyonlar = endikasyonlarMatch[1].trim()

    // Hasta Hazırlığı
    const hastaHazirligiMatch = markdown.match(/\*\*Hasta Hazırlığı:\*\*\s*([\s\S]+?)(?:\n\n|\*\*|$)/)
    if (hastaHazirligiMatch) fields.hastaHazırlığı = hastaHazirligiMatch[1].trim()

    // Pozisyonlama
    const pozisyonlamaMatch = markdown.match(/\*\*Pozisyonlama:\*\*\s*([\s\S]+?)(?:\n\n|\*\*|$)/)
    if (pozisyonlamaMatch) fields.pozisyonlama = pozisyonlamaMatch[1].trim()

    // Işınlama
    const isinlamaMatch = markdown.match(/\*\*Işınlama:\*\*\s*([\s\S]+?)(?:\n\n|\*\*|$)/)
    if (isinlamaMatch) fields.isinlama = isinlamaMatch[1].trim()

    // Nefes Tutma
    const nefesTutmaMatch = markdown.match(/\*\*Nefes Tutma:\*\*\s*([\s\S]+?)(?:\n\n|\*\*|##|$)/)
    if (nefesTutmaMatch) fields.nefesTutma = nefesTutmaMatch[1].trim()

    // kVp
    const kVpMatch = markdown.match(/\*\*kVp:\*\*\s*(.+?)(?:\n|$)/)
    if (kVpMatch) fields.kVp = kVpMatch[1].trim()

    // mAs
    const mAsMatch = markdown.match(/\*\*mAs:\*\*\s*(.+?)(?:\n|$)/)
    if (mAsMatch) fields.mAs = mAsMatch[1].trim()

    // Mesafe
    const mesafeMatch = markdown.match(/\*\*Mesafe:\*\*\s*(.+?)(?:\n|$)/)
    if (mesafeMatch) fields.mesafe = mesafeMatch[1].trim()

    // Artefakt Kontrolü
    const artefaktMatch = markdown.match(/\*\*Artefakt Kontrolü:\*\*\s*([\s\S]+?)(?:\n\n|\*\*|$)/)
    if (artefaktMatch) fields.artefaktKontrolu = artefaktMatch[1].trim()

    // Radyasyon Güvenliği
    const radyasyonMatch = markdown.match(/\*\*Radyasyon Güvenliği:\*\*\s*([\s\S]+?)(?:\n\n|\*\*|$)/)
    if (radyasyonMatch) fields.radyasyonGuvenligi = radyasyonMatch[1].trim()

    // Sık Hatalar
    const sikHatalarMatch = markdown.match(/\*\*Sık Hatalar:\*\*\s*([\s\S]+?)(?:\n\n|##|$)/)
    if (sikHatalarMatch) fields.sikHatalar = sikHatalarMatch[1].trim()

    // Değerlendirme
    const degerlendirmeMatch = markdown.match(/##\s*Değerlendirme\s*\n\n([\s\S]+?)(?:\n\n\*\*|$)/)
    if (degerlendirmeMatch) fields.degerlendirme = degerlendirmeMatch[1].trim()

    // Notlar
    const notlarMatch = markdown.match(/\*\*Notlar:\*\*\s*([\s\S]+?)$/)
    if (notlarMatch) fields.notlar = notlarMatch[1].trim()

    return fields
  }

  const buildMarkdownFromXrayFields = () => {
    let markdown = `# ${xrayFields.baslik}\n\n`
    markdown += `**Kategori:** ${xrayFields.kategori}\n\n`
    if (xrayFields.aciklama) markdown += `**Açıklama:** ${xrayFields.aciklama}\n\n`
    if (xrayFields.amac) markdown += `**Amaç:** ${xrayFields.amac}\n\n`
    if (xrayFields.endikasyonlar) markdown += `**Endikasyonlar:** ${xrayFields.endikasyonlar}\n\n`
    if (xrayFields.hastaHazırlığı) markdown += `**Hasta Hazırlığı:** ${xrayFields.hastaHazırlığı}\n\n`
    if (xrayFields.pozisyonlama) markdown += `**Pozisyonlama:** ${xrayFields.pozisyonlama}\n\n`
    if (xrayFields.isinlama) markdown += `**Işınlama:** ${xrayFields.isinlama}\n\n`
    if (xrayFields.nefesTutma) markdown += `**Nefes Tutma:** ${xrayFields.nefesTutma}\n\n`
    
    markdown += `## Teknik Parametreler\n\n`
    if (xrayFields.kVp) markdown += `- **kVp:** ${xrayFields.kVp}\n`
    if (xrayFields.mAs) markdown += `- **mAs:** ${xrayFields.mAs}\n`
    if (xrayFields.mesafe) markdown += `- **Mesafe:** ${xrayFields.mesafe}\n`
    
    markdown += `\n## Kalite Kontrol\n\n`
    if (xrayFields.artefaktKontrolu) markdown += `**Artefakt Kontrolü:** ${xrayFields.artefaktKontrolu}\n\n`
    if (xrayFields.radyasyonGuvenligi) markdown += `**Radyasyon Güvenliği:** ${xrayFields.radyasyonGuvenligi}\n\n`
    if (xrayFields.sikHatalar) markdown += `**Sık Hatalar:** ${xrayFields.sikHatalar}\n\n`
    
    markdown += `## Değerlendirme\n\n`
    if (xrayFields.degerlendirme) markdown += `${xrayFields.degerlendirme}\n\n`
    if (xrayFields.notlar) markdown += `**Notlar:** ${xrayFields.notlar}\n`
    
    return markdown
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    let submitData = { ...formData }
    if (formData.modality === 'XR' && xrayFields.baslik) {
      submitData.title = xrayFields.baslik
      submitData.bodyMarkdown = buildMarkdownFromXrayFields()
      submitData.tags = xrayFields.kategori
    }

    const res = await fetch(`/api/admin/protocols/${params.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submitData)
    })

    if (res.ok) {
      router.push('/admin/protocols')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background-dark">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-white text-xl">Yükleniyor...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background-dark">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb 
          items={[
            { label: 'Anasayfa', href: '/dashboard' },
            { label: 'Protokol Yönetimi', href: '/admin/protocols' },
            { label: 'Düzenle' }
          ]}
        />
        
        <div className="mt-6">
          <h1 className="text-3xl font-bold text-white mb-8">Protokol Düzenle</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-white/80 mb-2">Modalite</label>
                <select 
                  value={formData.modality} 
                  onChange={(e) => setFormData({ ...formData, modality: e.target.value })} 
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                  disabled
                >
                  {MODALITIES.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                </select>
              </div>

              {formData.modality === 'XR' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-white/80 mb-2">Başlık *</label>
                    <input type="text" value={xrayFields.baslik} onChange={(e) => setXrayFields({ ...xrayFields, baslik: e.target.value })} required className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Kategori *</label>
                    <input type="text" value={xrayFields.kategori} onChange={(e) => setXrayFields({ ...xrayFields, kategori: e.target.value })} required className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white" placeholder="Göğüs, Abdomen, vb." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Açıklama</label>
                    <input type="text" value={xrayFields.aciklama} onChange={(e) => setXrayFields({ ...xrayFields, aciklama: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-white/80 mb-2">Amaç</label>
                    <textarea value={xrayFields.amac} onChange={(e) => setXrayFields({ ...xrayFields, amac: e.target.value })} rows={2} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-white/80 mb-2">Endikasyonlar</label>
                    <textarea value={xrayFields.endikasyonlar} onChange={(e) => setXrayFields({ ...xrayFields, endikasyonlar: e.target.value })} rows={2} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-white/80 mb-2">Hasta Hazırlığı</label>
                    <textarea value={xrayFields.hastaHazırlığı} onChange={(e) => setXrayFields({ ...xrayFields, hastaHazırlığı: e.target.value })} rows={2} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-white/80 mb-2">Pozisyonlama</label>
                    <textarea value={xrayFields.pozisyonlama} onChange={(e) => setXrayFields({ ...xrayFields, pozisyonlama: e.target.value })} rows={2} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Işınlama</label>
                    <input type="text" value={xrayFields.isinlama} onChange={(e) => setXrayFields({ ...xrayFields, isinlama: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Nefes Tutma</label>
                    <input type="text" value={xrayFields.nefesTutma} onChange={(e) => setXrayFields({ ...xrayFields, nefesTutma: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">kVp</label>
                    <input type="text" value={xrayFields.kVp} onChange={(e) => setXrayFields({ ...xrayFields, kVp: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white" placeholder="125" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">mAs</label>
                    <input type="text" value={xrayFields.mAs} onChange={(e) => setXrayFields({ ...xrayFields, mAs: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white" placeholder="3-5" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Mesafe</label>
                    <input type="text" value={xrayFields.mesafe} onChange={(e) => setXrayFields({ ...xrayFields, mesafe: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white" placeholder="180 cm" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-white/80 mb-2">Artefakt Kontrolü</label>
                    <textarea value={xrayFields.artefaktKontrolu} onChange={(e) => setXrayFields({ ...xrayFields, artefaktKontrolu: e.target.value })} rows={2} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-white/80 mb-2">Radyasyon Güvenliği</label>
                    <textarea value={xrayFields.radyasyonGuvenligi} onChange={(e) => setXrayFields({ ...xrayFields, radyasyonGuvenligi: e.target.value })} rows={2} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-white/80 mb-2">Sık Hatalar</label>
                    <textarea value={xrayFields.sikHatalar} onChange={(e) => setXrayFields({ ...xrayFields, sikHatalar: e.target.value })} rows={2} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-white/80 mb-2">Değerlendirme</label>
                    <textarea value={xrayFields.degerlendirme} onChange={(e) => setXrayFields({ ...xrayFields, degerlendirme: e.target.value })} rows={2} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-white/80 mb-2">Notlar</label>
                    <textarea value={xrayFields.notlar} onChange={(e) => setXrayFields({ ...xrayFields, notlar: e.target.value })} rows={2} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white" />
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-white/80 mb-2">Başlık</label>
                    <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-white/80 mb-2">İçerik (Markdown)</label>
                    <textarea value={formData.bodyMarkdown} onChange={(e) => setFormData({ ...formData, bodyMarkdown: e.target.value })} required rows={15} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-mono text-sm" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-white/80 mb-2">Etiketler</label>
                    <input type="text" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white" />
                  </div>
                </>
              )}

              <div className="flex items-center gap-2 mt-6">
                <input type="checkbox" checked={formData.isPublished} onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })} className="w-4 h-4" />
                <label className="text-white/80">Yayınla</label>
              </div>
            </div>

            <div className="flex gap-4">
              <button type="submit" className="flex-1 py-3 bg-primary text-background-dark font-bold rounded-lg hover:bg-primary/90">
                Güncelle
              </button>
              <button type="button" onClick={() => router.back()} className="flex-1 py-3 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20">
                İptal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

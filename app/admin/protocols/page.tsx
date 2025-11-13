'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import Breadcrumb from '@/components/layout/Breadcrumb'

const MODALITIES = [
  { value: 'XR', label: 'Röntgen (XR)' },
  { value: 'CT', label: 'BT (CT)' },
  { value: 'MR', label: 'MR' },
  { value: 'NM', label: 'Nükleer Tıp (NM)' },
  { value: 'US', label: 'Ultrason (US)' },
]

type Protocol = {
  id: string
  modality: string
  title: string
  bodyMarkdown: string
  tags: string
  isPublished: boolean
  creator: { name: string | null }
}

export default function ProtocolsAdminPage() {
  const router = useRouter()
  const [protocols, setProtocols] = useState<Protocol[]>([])
  const [filteredModality, setFilteredModality] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingProtocol, setEditingProtocol] = useState<Protocol | null>(null)
  const [formData, setFormData] = useState({
    modality: 'XR',
    title: '',
    bodyMarkdown: '',
    tags: '',
    isPublished: false
  })

  // Röntgen için ayrı alanlar
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
    fetchProtocols()
  }, [filteredModality])

  const fetchProtocols = async () => {
    const res = await fetch(`/api/admin/protocols?modality=${filteredModality}`)
    if (res.ok) {
      const data = await res.json()
      setProtocols(data.protocols)
    }
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
    
    // Röntgen için ayrı alanlardan markdown oluştur
    let submitData = { ...formData }
    if (formData.modality === 'XR' && xrayFields.baslik) {
      submitData.title = xrayFields.baslik
      submitData.bodyMarkdown = buildMarkdownFromXrayFields()
      submitData.tags = xrayFields.kategori
    }
    
    const url = editingProtocol
      ? `/api/admin/protocols/${editingProtocol.id}`
      : '/api/admin/protocols'

    const res = await fetch(url, {
      method: editingProtocol ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submitData)
    })

    if (res.ok) {
      setShowModal(false)
      setEditingProtocol(null)
      setFormData({ modality: 'XR', title: '', bodyMarkdown: '', tags: '', isPublished: false })
      setXrayFields({
        baslik: '', kategori: '', aciklama: '', amac: '', endikasyonlar: '',
        hastaHazırlığı: '', pozisyonlama: '', isinlama: '', nefesTutma: '',
        kVp: '', mAs: '', mesafe: '', artefaktKontrolu: '', radyasyonGuvenligi: '',
        sikHatalar: '', degerlendirme: '', notlar: ''
      })
      fetchProtocols()
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

    const lines = markdown.split('\n')
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      // Başlık
      if (line.startsWith('# ')) {
        fields.baslik = line.replace('# ', '')
      }
      // Kategori
      else if (line.includes('**Kategori:**')) {
        fields.kategori = line.replace('**Kategori:**', '').trim()
      }
      // Açıklama
      else if (line.includes('**Açıklama:**')) {
        fields.aciklama = line.replace('**Açıklama:**', '').trim()
      }
      // Amaç
      else if (line.includes('**Amaç:**')) {
        fields.amac = line.replace('**Amaç:**', '').trim()
      }
      // Endikasyonlar
      else if (line.includes('**Endikasyonlar:**')) {
        fields.endikasyonlar = line.replace('**Endikasyonlar:**', '').trim()
      }
      // Hasta Hazırlığı
      else if (line.includes('**Hasta Hazırlığı:**')) {
        fields.hastaHazırlığı = line.replace('**Hasta Hazırlığı:**', '').trim()
      }
      // Pozisyonlama
      else if (line.includes('**Pozisyonlama:**')) {
        fields.pozisyonlama = line.replace('**Pozisyonlama:**', '').trim()
      }
      // Işınlama
      else if (line.includes('**Işınlama:**')) {
        fields.isinlama = line.replace('**Işınlama:**', '').trim()
      }
      // Nefes Tutma
      else if (line.includes('**Nefes Tutma:**')) {
        fields.nefesTutma = line.replace('**Nefes Tutma:**', '').trim()
      }
      // kVp
      else if (line.includes('**kVp:**')) {
        fields.kVp = line.replace('- **kVp:**', '').replace('**kVp:**', '').trim()
      }
      // mAs
      else if (line.includes('**mAs:**')) {
        fields.mAs = line.replace('- **mAs:**', '').replace('**mAs:**', '').trim()
      }
      // Mesafe
      else if (line.includes('**Mesafe:**')) {
        fields.mesafe = line.replace('- **Mesafe:**', '').replace('**Mesafe:**', '').trim()
      }
      // Artefakt Kontrolü
      else if (line.includes('**Artefakt Kontrolü:**')) {
        fields.artefaktKontrolu = line.replace('**Artefakt Kontrolü:**', '').trim()
      }
      // Radyasyon Güvenliği
      else if (line.includes('**Radyasyon Güvenliği:**')) {
        fields.radyasyonGuvenligi = line.replace('**Radyasyon Güvenliği:**', '').trim()
      }
      // Sık Hatalar
      else if (line.includes('**Sık Hatalar:**')) {
        fields.sikHatalar = line.replace('**Sık Hatalar:**', '').trim()
      }
      // Notlar
      else if (line.includes('**Notlar:**')) {
        fields.notlar = line.replace('**Notlar:**', '').trim()
      }
      // Değerlendirme (section'dan sonraki içerik)
      else if (line === '## Değerlendirme') {
        let degerlendirme = ''
        for (let j = i + 1; j < lines.length; j++) {
          if (lines[j].startsWith('##') || lines[j].includes('**Notlar:**')) break
          if (lines[j].trim() && !lines[j].includes('**')) {
            degerlendirme += lines[j].trim() + ' '
          }
        }
        fields.degerlendirme = degerlendirme.trim()
      }
    }

    return fields
  }

  const handleEdit = (protocol: Protocol) => {
    setEditingProtocol(protocol)
    setFormData({
      modality: protocol.modality,
      title: protocol.title,
      bodyMarkdown: protocol.bodyMarkdown,
      tags: protocol.tags,
      isPublished: protocol.isPublished
    })
    
    // Röntgen ise markdown'dan alanları parse et
    if (protocol.modality === 'XR') {
      const parsed = parseMarkdownToXrayFields(protocol.bodyMarkdown)
      setXrayFields(parsed)
    }
    
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bu protokolü silmek istediğinizden emin misiniz?')) return
    const res = await fetch(`/api/admin/protocols/${id}`, { method: 'DELETE' })
    if (res.ok) fetchProtocols()
  }

  const handleExport = async () => {
    window.open(`/api/admin/protocols/export?modality=${filteredModality}`, '_blank')
  }

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (filteredModality === 'all') {
      alert('Lütfen önce bir modalite seçin (Röntgen, BT, MR, Nükleer Tıp veya Ultrason)')
      e.target.value = ''
      return
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('modality', filteredModality)

    const res = await fetch('/api/admin/protocols/import', {
      method: 'POST',
      body: formData
    })

    if (res.ok) {
      const data = await res.json()
      alert(`${data.imported} protokol içe aktarıldı${data.errors ? `\n${data.errors.length} hata` : ''}`)
      fetchProtocols()
    } else {
      const data = await res.json()
      alert(data.error || 'Import başarısız')
    }
    
    e.target.value = ''
  }

  const handleDownloadTemplate = () => {
    if (filteredModality === 'all') {
      alert('Lütfen önce bir modalite seçin')
      return
    }
    window.open(`/api/admin/protocols/template?modality=${filteredModality}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-background-dark">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb 
          items={[
            { label: 'Anasayfa', href: '/dashboard' },
            { label: 'Admin', href: '/dashboard' },
            { label: 'Protokol Yönetimi' }
          ]}
        />
        <div className="flex justify-between items-center mb-8 mt-6">
          <h1 className="text-3xl font-bold text-white">Protokol Yönetimi</h1>
          <div className="flex gap-2">
            <button onClick={handleDownloadTemplate} className="px-4 py-2 bg-purple-500/20 text-purple-400 font-bold rounded-lg hover:bg-purple-500/30">
              📋 Şablon İndir
            </button>
            <label className="px-4 py-2 bg-blue-500/20 text-blue-400 font-bold rounded-lg hover:bg-blue-500/30 cursor-pointer">
              📥 İçe Aktar
              <input type="file" accept=".xlsx,.xls" onChange={handleImport} className="hidden" />
            </label>
            <button onClick={handleExport} className="px-4 py-2 bg-green-500/20 text-green-400 font-bold rounded-lg hover:bg-green-500/30">
              📤 Dışa Aktar
            </button>
            <button onClick={() => { setEditingProtocol(null); setShowModal(true) }} className="px-4 py-2 bg-primary text-background-dark font-bold rounded-lg hover:bg-primary/90">
              + Yeni Protokol
            </button>
          </div>
        </div>

        <div className="mb-6 flex gap-2">
          <button onClick={() => setFilteredModality('all')} className={`px-4 py-2 rounded-lg ${filteredModality === 'all' ? 'bg-primary text-background-dark' : 'bg-white/10 text-white'}`}>
            Tümü ({protocols.length})
          </button>
          {MODALITIES.map(m => (
            <button key={m.value} onClick={() => setFilteredModality(m.value)} className={`px-4 py-2 rounded-lg ${filteredModality === m.value ? 'bg-primary text-background-dark' : 'bg-white/10 text-white'}`}>
              {m.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {protocols.map(protocol => (
            <div key={protocol.id} className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="flex justify-between items-start mb-3">
                <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-bold rounded">
                  {MODALITIES.find(m => m.value === protocol.modality)?.label}
                </span>
                <span className={`px-2 py-1 text-xs rounded ${protocol.isPublished ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                  {protocol.isPublished ? 'Yayında' : 'Taslak'}
                </span>
              </div>
              <h3 className="text-white font-bold mb-2">{protocol.title}</h3>
              <p className="text-white/60 text-sm mb-4 line-clamp-3">{protocol.bodyMarkdown.substring(0, 100)}...</p>
              <div className="flex gap-2">
                <button onClick={() => router.push(`/admin/protocols/edit/${protocol.id}`)} className="flex-1 px-3 py-1 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30">
                  Düzenle
                </button>
                <button onClick={() => handleDelete(protocol.id)} className="flex-1 px-3 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30">
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-background-dark border border-white/10 rounded-xl p-6 w-full max-w-4xl my-8">
              <h2 className="text-xl font-bold text-white mb-4">{editingProtocol ? 'Protokol Düzenle' : 'Yeni Protokol'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Modalite</label>
                  <select value={formData.modality} onChange={(e) => setFormData({ ...formData, modality: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white">
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
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Başlık</label>
                      <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">İçerik (Markdown)</label>
                      <textarea value={formData.bodyMarkdown} onChange={(e) => setFormData({ ...formData, bodyMarkdown: e.target.value })} required rows={10} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-mono text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Etiketler (virgülle ayırın)</label>
                      <input type="text" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white" />
                    </div>
                  </>
                )}

                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={formData.isPublished} onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })} className="w-4 h-4" />
                  <label className="text-white/80">Yayınla</label>
                </div>
                <div className="flex gap-2 pt-4">
                  <button type="submit" className="flex-1 py-2 bg-primary text-background-dark font-bold rounded-lg hover:bg-primary/90">
                    {editingProtocol ? 'Güncelle' : 'Oluştur'}
                  </button>
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20">
                    İptal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

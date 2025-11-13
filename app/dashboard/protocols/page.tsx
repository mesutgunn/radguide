'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import Breadcrumb from '@/components/layout/Breadcrumb'

interface Protocol {
  id: string
  modality: string
  title: string
  bodyMarkdown: string
  tags: string
  isPublished: boolean
  createdAt: string
}

const MODALITY_NAMES: Record<string, string> = {
  XR: 'Röntgen',
  CT: 'BT',
  MR: 'MR',
  NM: 'Nükleer Tıp',
  US: 'Ultrason'
}

const MODALITY_ICONS: Record<string, string> = {
  XR: '🩻',
  CT: '🔬',
  MR: '🧲',
  NM: '☢️',
  US: '📡'
}

const MODALITIES = [
  { value: 'XR', label: 'Röntgen', icon: '🩻' },
  { value: 'CT', label: 'BT', icon: '🔬' },
  { value: 'MR', label: 'MR', icon: '🧲' },
  { value: 'NM', label: 'Nükleer Tıp', icon: '☢️' },
  { value: 'US', label: 'Ultrason', icon: '📡' }
]

export default function ProtocolsPage() {
  const router = useRouter()
  const [protocols, setProtocols] = useState<Protocol[]>([])
  const [filteredModality, setFilteredModality] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchProtocols()
  }, [filteredModality])

  const fetchProtocols = async () => {
    const res = await fetch(`/api/protocols?modality=${filteredModality}`)
    if (res.ok) {
      const data = await res.json()
      setProtocols(data.protocols)
    }
  }

  const filteredProtocols = protocols.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.bodyMarkdown.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background-dark">
      <Header />
      
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <main className="flex flex-col gap-6 mt-8">
            <Breadcrumb 
              items={[
                { label: 'Anasayfa', href: '/dashboard' },
                { label: 'Protokoller' }
              ]}
            />

            <div className="px-4">
              <h1 className="text-3xl font-bold text-white mb-8">Çekim Protokolleri</h1>

              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Protokol ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                <button
                  onClick={() => setFilteredModality('all')}
                  className={`p-4 rounded-lg text-center transition-colors ${
                    filteredModality === 'all'
                      ? 'bg-primary text-background-dark'
                      : 'bg-white/5 text-white hover:bg-white/10'
                  }`}
                >
                  <div className="text-2xl mb-2">📋</div>
                  <div className="font-bold text-sm">Tümü</div>
                  <div className="text-xs opacity-60">{protocols.length}</div>
                </button>
                {MODALITIES.map(m => (
                  <button
                    key={m.value}
                    onClick={() => setFilteredModality(m.value)}
                    className={`p-4 rounded-lg text-center transition-colors ${
                      filteredModality === m.value
                        ? 'bg-primary text-background-dark'
                        : 'bg-white/5 text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="text-2xl mb-2">{m.icon}</div>
                    <div className="font-bold text-sm">{m.label}</div>
                    <div className="text-xs opacity-60">
                      {protocols.filter(p => p.modality === m.value).length}
                    </div>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProtocols.map(protocol => {
                  // Markdown'dan temiz açıklama çıkar
                  const getCleanDescription = (markdown: string) => {
                    // Amaç veya Açıklama alanını bul
                    const amacMatch = markdown.match(/\*\*Amaç:\*\*\s*([\s\S]+?)(?:\n\n|\*\*|$)/)
                    if (amacMatch) return amacMatch[1].trim()
                    
                    const aciklamaMatch = markdown.match(/\*\*Açıklama:\*\*\s*([\s\S]+?)(?:\n\n|\*\*|$)/)
                    if (aciklamaMatch) return aciklamaMatch[1].trim()
                    
                    // Endikasyonlar
                    const endikasyonMatch = markdown.match(/\*\*Endikasyonlar:\*\*\s*([\s\S]+?)(?:\n\n|\*\*|$)/)
                    if (endikasyonMatch) return endikasyonMatch[1].trim()
                    
                    // Hiçbiri yoksa ilk paragrafı al (başlık ve kategori hariç)
                    const lines = markdown.split('\n').filter(line => 
                      !line.startsWith('#') && 
                      !line.includes('**Kategori:**') &&
                      line.trim().length > 20
                    )
                    return lines[0]?.trim() || 'Protokol detaylarını görmek için tıklayın'
                  }

                  return (
                    <div
                      key={protocol.id}
                      onClick={() => router.push(`/dashboard/protocols/${protocol.id}`)}
                      className="bg-white/5 border border-white/10 rounded-xl p-6 cursor-pointer hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">
                          {MODALITIES.find(m => m.value === protocol.modality)?.icon}
                        </span>
                        <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-bold rounded">
                          {MODALITIES.find(m => m.value === protocol.modality)?.label}
                        </span>
                      </div>
                      <h3 className="text-white font-bold mb-2">{protocol.title}</h3>
                      <p className="text-white/60 text-sm line-clamp-3">
                        {getCleanDescription(protocol.bodyMarkdown)}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

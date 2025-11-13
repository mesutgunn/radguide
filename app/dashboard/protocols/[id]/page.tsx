'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
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

export default function ProtocolDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [protocol, setProtocol] = useState<Protocol | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProtocol()
  }, [params.id])

  const fetchProtocol = async () => {
    try {
      const res = await fetch(`/api/protocols/${params.id}`)
      if (res.ok) {
        const data = await res.json()
        setProtocol(data.protocol || data)
      } else {
        console.error('Protokol bulunamadı:', res.status)
      }
    } catch (error) {
      console.error('Protokol yüklenemedi:', error)
    } finally {
      setLoading(false)
    }
  }

  const parseProtocolContent = (markdown: string) => {
    const sections: Record<string, string> = {}
    const lines = markdown.split('\n')
    let currentSection = 'main'
    let currentContent = ''

    for (const line of lines) {
      if (line.startsWith('## ')) {
        if (currentContent) {
          sections[currentSection] = currentContent.trim()
        }
        currentSection = line.replace('## ', '').trim()
        currentContent = ''
      } else if (line.startsWith('**') && line.includes(':**')) {
        const match = line.match(/\*\*(.+?):\*\*\s*(.+)/)
        if (match) {
          sections[match[1]] = match[2]
        }
      } else {
        currentContent += line + '\n'
      }
    }

    if (currentContent) {
      sections[currentSection] = currentContent.trim()
    }

    return sections
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

  if (!protocol) {
    return (
      <div className="min-h-screen bg-background-dark">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-white text-xl">Protokol bulunamadı</div>
        </div>
      </div>
    )
  }

  const sections = parseProtocolContent(protocol.bodyMarkdown)
  const modalityName = MODALITY_NAMES[protocol.modality] || protocol.modality

  return (
    <div className="min-h-screen bg-background-dark">
      <div className="layout-container flex flex-col">
        <Header />
        
        <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <main className="flex flex-col gap-6 mt-8">
              {/* Breadcrumbs */}
              <Breadcrumb 
                items={[
                  { label: 'Anasayfa', href: '/dashboard' },
                  { label: 'Protokoller', href: '/dashboard/protocols' },
                  { label: modalityName, href: `/dashboard/protocols?modality=${protocol.modality}` },
                  { label: protocol.title }
                ]}
              />

              {/* Page Heading */}
              <div className="flex flex-wrap justify-between items-start gap-4 px-4">
                <div className="flex min-w-72 flex-col gap-3">
                  <div className="flex items-center gap-4">
                    <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                      {protocol.title}
                    </h1>
                    <span className="inline-flex items-center rounded-full bg-primary/20 px-3 py-1 text-sm font-medium text-primary">
                      {MODALITY_ICONS[protocol.modality]} {modalityName}
                    </span>
                  </div>
                  {sections['Kategori'] && (
                    <p className="text-white/70 text-base font-normal leading-normal max-w-2xl">
                      {sections['Kategori']} kategorisinde yer alan bu protokol.
                    </p>
                  )}
                </div>
              </div>

              {/* Toolbar */}
              <div className="flex justify-between gap-2 px-4 py-3 border-y border-white/10">
                <div className="flex gap-2">
                  <button 
                    onClick={() => window.print()}
                    className="p-2 text-white/70 hover:text-white transition-colors"
                  >
                    <span className="material-symbols-outlined">print</span>
                  </button>
                  <button 
                    onClick={() => router.back()}
                    className="flex items-center gap-2 px-4 py-2 text-white/70 hover:text-white transition-colors"
                  >
                    <span className="material-symbols-outlined">arrow_back</span>
                    <span className="text-sm font-medium">Geri</span>
                  </button>
                </div>
              </div>

              {/* Protocol Content */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 py-5">
                <div className="md:col-span-2 flex flex-col gap-8">
                  {/* Genel Bakış */}
                  {(sections['Açıklama'] || sections['Amaç'] || sections['Endikasyonlar']) && (
                    <section>
                      <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5 border-b border-white/10 mb-4">
                        Genel Bakış
                      </h2>
                      <div className="flex flex-col gap-4 text-white/80">
                        {sections['Açıklama'] && (
                          <>
                            <h3 className="font-bold text-white">Açıklama</h3>
                            <p>{sections['Açıklama']}</p>
                          </>
                        )}
                        {sections['Amaç'] && (
                          <>
                            <h3 className="font-bold text-white mt-2">Amaç</h3>
                            <p>{sections['Amaç']}</p>
                          </>
                        )}
                        {sections['Endikasyonlar'] && (
                          <>
                            <h3 className="font-bold text-white mt-2">Endikasyonlar</h3>
                            <p className="whitespace-pre-line">{sections['Endikasyonlar']}</p>
                          </>
                        )}
                      </div>
                    </section>
                  )}

                  {/* Uygulama */}
                  {(sections['Hasta Hazırlığı'] || sections['Pozisyonlama'] || sections['Işınlama'] || sections['Nefes Tutma']) && (
                    <section>
                      <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5 border-b border-white/10 mb-4">
                        Uygulama
                      </h2>
                      <div className="flex flex-col gap-4 text-white/80">
                        {sections['Hasta Hazırlığı'] && (
                          <>
                            <h3 className="font-bold text-white">Hasta Hazırlığı</h3>
                            <p>{sections['Hasta Hazırlığı']}</p>
                          </>
                        )}
                        {sections['Pozisyonlama'] && (
                          <>
                            <h3 className="font-bold text-white mt-2">Pozisyonlama</h3>
                            <p>{sections['Pozisyonlama']}</p>
                          </>
                        )}
                        {sections['Işınlama'] && (
                          <>
                            <h3 className="font-bold text-white mt-2">Işınlama</h3>
                            <p>{sections['Işınlama']}</p>
                          </>
                        )}
                        {sections['Nefes Tutma'] && (
                          <>
                            <h3 className="font-bold text-white mt-2">Nefes Tutma</h3>
                            <p>{sections['Nefes Tutma']}</p>
                          </>
                        )}
                      </div>
                    </section>
                  )}

                  {/* Kalite ve Güvenlik */}
                  {(sections['Radyasyon Güvenliği'] || sections['Artefakt Kontrolü'] || sections['Sık Hatalar']) && (
                    <section>
                      <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5 border-b border-white/10 mb-4">
                        Kalite ve Güvenlik
                      </h2>
                      <div className="flex flex-col gap-4">
                        {sections['Radyasyon Güvenliği'] && (
                          <div className="bg-yellow-500/10 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                            <h3 className="font-bold text-yellow-300">Radyasyon Güvenliği</h3>
                            <p className="text-yellow-200/80 mt-1">{sections['Radyasyon Güvenliği']}</p>
                          </div>
                        )}
                        {sections['Artefakt Kontrolü'] && (
                          <>
                            <h3 className="font-bold text-white mt-2">Artefakt Kontrolü</h3>
                            <p className="text-white/80">{sections['Artefakt Kontrolü']}</p>
                          </>
                        )}
                        {sections['Sık Hatalar'] && (
                          <>
                            <h3 className="font-bold text-white mt-2">Sık Hatalar</h3>
                            <p className="text-white/80 whitespace-pre-line">{sections['Sık Hatalar']}</p>
                          </>
                        )}
                      </div>
                    </section>
                  )}
                </div>

                {/* Sidebar */}
                <aside className="md:col-span-1">
                  <div className="sticky top-8 bg-white/5 rounded-xl p-6">
                    {/* Teknik Parametreler */}
                    {(sections['kVp'] || sections['mAs'] || sections['Mesafe'] || sections['Nefes Tutma']) && (
                      <>
                        <h3 className="text-white text-lg font-bold border-b border-white/10 pb-3 mb-4">
                          Teknik Parametreler
                        </h3>
                        <div className="space-y-4">
                          {sections['kVp'] && (
                            <div className="flex justify-between items-center">
                              <span className="text-white/70 text-sm">kVp</span>
                              <span className="text-white font-semibold">{sections['kVp']}</span>
                            </div>
                          )}
                          {sections['mAs'] && (
                            <div className="flex justify-between items-center">
                              <span className="text-white/70 text-sm">mAs</span>
                              <span className="text-white font-semibold">{sections['mAs']}</span>
                            </div>
                          )}
                          {sections['Mesafe'] && (
                            <div className="flex justify-between items-center">
                              <span className="text-white/70 text-sm">Mesafe</span>
                              <span className="text-white font-semibold">{sections['Mesafe']}</span>
                            </div>
                          )}
                        </div>
                      </>
                    )}

                    {/* Değerlendirme */}
                    {sections['Değerlendirme'] && (
                      <>
                        <h3 className="text-white text-lg font-bold border-b border-white/10 pb-3 mb-4 mt-8">
                          Değerlendirme
                        </h3>
                        <p className="text-white/80 text-sm whitespace-pre-line">
                          {sections['Değerlendirme']}
                        </p>
                      </>
                    )}

                    {/* Notlar */}
                    {sections['Notlar'] && (
                      <div className="bg-primary/10 border border-primary/30 text-primary p-4 rounded-lg mt-8">
                        <h4 className="font-bold">Notlar</h4>
                        <p className="text-sm mt-1 opacity-90">{sections['Notlar']}</p>
                      </div>
                    )}
                  </div>
                </aside>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

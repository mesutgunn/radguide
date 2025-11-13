'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import Breadcrumb from '@/components/layout/Breadcrumb'
import Image from 'next/image'

const MODALITIES = [
  { value: 'XR', label: 'Röntgen (XR)', icon: '🩻' },
  { value: 'CT', label: 'BT (CT)', icon: '🔬' },
  { value: 'MR', label: 'MR', icon: '🧲' },
]

export default function AnalysisPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedModality, setSelectedModality] = useState('XR')
  const [selectedProtocol, setSelectedProtocol] = useState<string>('')
  const [protocols, setProtocols] = useState<any[]>([])
  const [loadingProtocols, setLoadingProtocols] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<any>(null)

  // Modalite değiştiğinde protokolleri yükle
  useEffect(() => {
    fetchProtocols()
  }, [selectedModality])

  const fetchProtocols = async () => {
    setLoadingProtocols(true)
    try {
      const res = await fetch(`/api/protocols?modality=${selectedModality}`)
      if (res.ok) {
        const data = await res.json()
        setProtocols(data.protocols || [])
      }
    } catch (error) {
      console.error('Protokoller yüklenemedi:', error)
    } finally {
      setLoadingProtocols(false)
    }
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      setPreviewUrl(URL.createObjectURL(file))
      setResult(null)
    }
  }

  const handleCameraCapture = () => {
    fileInputRef.current?.click()
  }

  const handleUploadAndAnalyze = async () => {
    if (!selectedImage) return

    setUploading(true)
    setAnalyzing(true)

    try {
      // 1. Görüntüyü yükle
      const formData = new FormData()
      formData.append('image', selectedImage)
      formData.append('modality', selectedModality)
      if (selectedProtocol) {
        formData.append('protocolId', selectedProtocol)
      }

      const uploadRes = await fetch('/api/analysis/upload', {
        method: 'POST',
        body: formData
      })

      if (!uploadRes.ok) {
        const errorData = await uploadRes.json().catch(() => ({}))
        console.error('Upload error:', uploadRes.status, errorData)
        throw new Error(errorData.error || 'Görüntü yüklenemedi')
      }

      const uploadData = await uploadRes.json()
      console.log('Upload success:', uploadData)
      setUploading(false)

      // 2. Analiz başlat
      const analyzeRes = await fetch('/api/analysis/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          analysisId: uploadData.analysisId,
          imageUrl: uploadData.imageUrl
        })
      })

      if (!analyzeRes.ok) {
        throw new Error('Analiz başlatılamadı')
      }

      let analyzeData = await analyzeRes.json()
      
      // Eğer analiz hala işleniyorsa, polling başlat
      if (analyzeData.result === 'PROCESSING') {
        setResult({
          result: 'PROCESSING',
          feedback: 'Analiz devam ediyor... Lütfen bekleyin.'
        })
        
        // Her 3 saniyede bir sonucu kontrol et
        const pollInterval = setInterval(async () => {
          try {
            const statusRes = await fetch(`/api/analysis/status/${uploadData.analysisId}`)
            if (statusRes.ok) {
              const statusData = await statusRes.json()
              
              if (statusData.status === 'done') {
                clearInterval(pollInterval)
                setResult({
                  result: statusData.result,
                  score: statusData.score,
                  feedback: statusData.feedback
                })
                setAnalyzing(false)
              } else if (statusData.status === 'error') {
                clearInterval(pollInterval)
                setResult({
                  result: 'FAILED',
                  feedback: statusData.errorMsg || 'Analiz sırasında hata oluştu'
                })
                setAnalyzing(false)
              }
            }
          } catch (error) {
            console.error('Polling error:', error)
          }
        }, 3000)
        
        // 60 saniye sonra timeout
        setTimeout(() => {
          clearInterval(pollInterval)
          if (analyzing) {
            setResult({
              result: 'FAILED',
              feedback: 'Analiz zaman aşımına uğradı. Lütfen tekrar deneyin.'
            })
            setAnalyzing(false)
          }
        }, 60000)
      } else {
        setResult(analyzeData)
      }

    } catch (error: any) {
      console.error('Hata:', error)
      alert(error.message || 'Bir hata oluştu')
      setAnalyzing(false)
    } finally {
      setUploading(false)
    }
  }

  const handleReset = () => {
    setSelectedImage(null)
    setPreviewUrl(null)
    setResult(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="min-h-screen bg-background-dark">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb 
          items={[
            { label: 'Anasayfa', href: '/dashboard' },
            { label: 'Görüntü Analizi' }
          ]}
        />
        
        <div className="mt-6">
          <h1 className="text-3xl font-bold text-white mb-8">AI Destekli Görüntü Analizi</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sol Panel - Görüntü Yükleme */}
            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Modalite Seçimi</h2>
                <div className="grid grid-cols-3 gap-3">
                  {MODALITIES.map(m => (
                    <button
                      key={m.value}
                      onClick={() => {
                        setSelectedModality(m.value)
                        setSelectedProtocol('')
                      }}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedModality === m.value
                          ? 'bg-primary/20 border-primary text-white'
                          : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                      }`}
                    >
                      <div className="text-2xl mb-1">{m.icon}</div>
                      <div className="text-xs font-medium">{m.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">
                  Protokol Seçimi <span className="text-sm font-normal text-white/60">(Opsiyonel)</span>
                </h2>
                {loadingProtocols ? (
                  <div className="text-white/60 text-center py-4">Yükleniyor...</div>
                ) : protocols.length > 0 ? (
                  <select
                    value={selectedProtocol}
                    onChange={(e) => setSelectedProtocol(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Protokol seçilmedi</option>
                    {protocols.map(p => (
                      <option key={p.id} value={p.id} className="bg-background-dark">
                        {p.title}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="text-white/60 text-center py-4">
                    Bu modalite için yayınlanmış protokol bulunamadı
                  </div>
                )}
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Görüntü Yükleme</h2>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImageSelect}
                  className="hidden"
                />

                {!previewUrl ? (
                  <div className="space-y-3">
                    <button
                      onClick={handleCameraCapture}
                      className="w-full py-4 bg-primary/20 border-2 border-primary text-white font-bold rounded-lg hover:bg-primary/30 flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined">photo_camera</span>
                      Fotoğraf Çek
                    </button>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-4 bg-white/10 border-2 border-white/20 text-white font-bold rounded-lg hover:bg-white/20 flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined">upload</span>
                      Dosya Yükle
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative aspect-video bg-black/50 rounded-lg overflow-hidden">
                      <Image
                        src={previewUrl}
                        alt="Preview"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={handleUploadAndAnalyze}
                        disabled={uploading || analyzing}
                        className="flex-1 py-3 bg-primary text-background-dark font-bold rounded-lg hover:bg-primary/90 disabled:opacity-50"
                      >
                        {uploading ? 'Yükleniyor...' : analyzing ? 'Analiz Ediliyor...' : 'Analiz Et'}
                      </button>
                      <button
                        onClick={handleReset}
                        disabled={uploading || analyzing}
                        className="px-6 py-3 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 disabled:opacity-50"
                      >
                        Sıfırla
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sağ Panel - Sonuçlar */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Analiz Sonucu</h2>
              
              {!result ? (
                <div className="flex flex-col items-center justify-center h-96 text-white/40">
                  <span className="material-symbols-outlined text-6xl mb-4">analytics</span>
                  <p>Görüntü yükleyip analiz edin</p>
                </div>
              ) : result.result === 'PROCESSING' ? (
                <div className="flex flex-col items-center justify-center h-96">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mb-4"></div>
                  <p className="text-white text-lg font-semibold">Analiz Devam Ediyor...</p>
                  <p className="text-white/60 text-sm mt-2">Lütfen bekleyin, sonuç hazırlanıyor</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Sonuç Durumu */}
                  <div className={`p-6 rounded-lg border-2 ${
                    result.result === 'SUCCESS'
                      ? 'bg-green-500/20 border-green-500'
                      : 'bg-red-500/20 border-red-500'
                  }`}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`material-symbols-outlined text-4xl ${
                        result.result === 'SUCCESS' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {result.result === 'SUCCESS' ? 'check_circle' : 'cancel'}
                      </span>
                      <div>
                        <h3 className={`text-2xl font-bold ${
                          result.result === 'SUCCESS' ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {result.result === 'SUCCESS' ? 'Başarılı' : 'Hatalı'}
                        </h3>
                        {result.score !== undefined && (
                          <p className="text-white/80">Skor: {(result.score * 100).toFixed(0)}%</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Geri Bildirim */}
                  {result.feedback && (
                    <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                      <h4 className="text-lg font-bold text-white mb-3">
                        {result.result === 'SUCCESS' ? 'Değerlendirme' : 'Düzeltme Önerileri'}
                      </h4>
                      <p className="text-white/80 whitespace-pre-wrap">{result.feedback}</p>
                    </div>
                  )}

                  {/* Yeni Analiz */}
                  <button
                    onClick={handleReset}
                    className="w-full py-3 bg-primary text-background-dark font-bold rounded-lg hover:bg-primary/90"
                  >
                    Yeni Analiz Yap
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

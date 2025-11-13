'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/layout/Header'
import Breadcrumb from '@/components/layout/Breadcrumb'

export default function AdminSettingsPage() {
  const [webhookUrl, setWebhookUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings')
      if (res.ok) {
        const data = await res.json()
        setWebhookUrl(data.analysisWebhookUrl || '')
      }
    } catch (error) {
      console.error('Ayarlar yüklenemedi:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ analysisWebhookUrl: webhookUrl })
      })

      if (res.ok) {
        alert('Ayarlar kaydedildi!')
      } else {
        alert('Ayarlar kaydedilemedi')
      }
    } catch (error) {
      console.error('Kayıt hatası:', error)
      alert('Bir hata oluştu')
    } finally {
      setSaving(false)
    }
  }

  const testWebhook = async () => {
    if (!webhookUrl) {
      alert('Önce webhook URL\'i kaydedin')
      return
    }

    try {
      const res = await fetch('/api/admin/settings/test-webhook', {
        method: 'POST'
      })

      if (res.ok) {
        alert('Test isteği gönderildi! Webhook endpoint\'inizi kontrol edin.')
      } else {
        const data = await res.json()
        alert(`Test başarısız: ${data.error}`)
      }
    } catch (error) {
      console.error('Test hatası:', error)
      alert('Test isteği gönderilemedi')
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
            { label: 'Ayarlar' }
          ]}
        />
        
        <div className="mt-6">
          <h1 className="text-3xl font-bold text-white mb-8">Sistem Ayarları</h1>
          
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 max-w-3xl">
            <h2 className="text-xl font-bold text-white mb-6">Görüntü Analizi Webhook</h2>
            
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Webhook URL
                </label>
                <input
                  type="url"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://your-api.com/analyze"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <p className="mt-2 text-sm text-white/60">
                  Kullanıcıların yüklediği görüntüler bu URL'e POST isteği ile gönderilecek
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="text-sm font-bold text-white mb-2">📤 Webhook'a Gönderilen İstek:</h3>
                <pre className="text-xs text-white/70 overflow-x-auto">
{`POST {webhook_url}
Content-Type: application/json

{
  "imageBase64": "iVBORw0KGgoAAAANSUhEUgAA...",
  "modality": "XR",
  "islemAdi": "PA Akciğer Grafisi",
  "userId": "user_id",
  "analysisId": "analysis_id",
  "callbackUrl": "https://your-domain.com/api/analysis/callback"
}`}
                </pre>
                <p className="mt-2 text-xs text-white/60">
                  * Görüntü base64 formatında gönderilir<br/>
                  * islemAdi: Kullanıcının seçtiği protokol (opsiyonel)<br/>
                  * callbackUrl: Analiz bitince sonucu göndereceğiniz URL
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="text-sm font-bold text-white mb-2">📥 Webhook Callback URL (Asenkron İşlemler İçin):</h3>
                <div className="bg-black/30 rounded px-3 py-2 mb-2">
                  <code className="text-xs text-primary">
                    {typeof window !== 'undefined' ? window.location.origin : ''}/api/analysis/callback
                  </code>
                </div>
                <p className="text-xs text-white/60 mb-2">
                  Eğer webhook'unuz asenkron çalışıyorsa, analiz tamamlandığında bu URL'e POST isteği gönderin:
                </p>
                <pre className="text-xs text-white/70 overflow-x-auto">
{`POST /api/analysis/callback
Content-Type: application/json

{
  "analysisId": "analysis_id",
  "result": "SUCCESS" | "FAILED",
  "score": 0.95,
  "feedback": "Görüntü kalitesi mükemmel..."
}`}
                </pre>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="text-sm font-bold text-white mb-2">Beklenen Yanıt Formatı:</h3>
                <pre className="text-xs text-white/70 overflow-x-auto">
{`{
  "result": "SUCCESS" | "FAILED",
  "score": 0.95,
  "feedback": "Görüntü kalitesi mükemmel..."
}

veya hata durumunda:

{
  "result": "FAILED",
  "score": 0.45,
  "feedback": "Pozisyonlama hatalı. Hasta..."
}`}
                </pre>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-3 bg-primary text-background-dark font-bold rounded-lg hover:bg-primary/90 disabled:opacity-50"
                >
                  {saving ? 'Kaydediliyor...' : 'Kaydet'}
                </button>
                <button
                  type="button"
                  onClick={testWebhook}
                  className="flex-1 py-3 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20"
                >
                  Test Et
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

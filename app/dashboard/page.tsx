import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { signOut } from '@/lib/auth'
import Header from '@/components/layout/Header'

export default async function DashboardPage() {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  const { user } = session

  return (
    <div className="min-h-screen bg-background-dark">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Hoş Geldiniz, {user.name}
          </h1>
          <p className="text-white/60">
            Rol: <span className="text-primary font-medium">
              {user.role === 'TEKNIKER' ? 'Radyoloji Teknikeri' : 
               user.role === 'RAPORTOR' ? 'Radyoloji Raportörü' : 'Admin'}
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {user.role !== 'ADMIN' && (
            <Link 
              href="/dashboard/protocols"
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <span className="material-symbols-outlined text-primary text-3xl">checklist</span>
                </div>
                <h2 className="text-xl font-bold text-white">Protokoller</h2>
              </div>
              <p className="text-white/70">
                Çekim protokollerine erişin ve inceleyin
              </p>
            </Link>
          )}

          {user.role === 'TEKNIKER' && (
            <Link 
              href="/dashboard/analysis"
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <span className="material-symbols-outlined text-primary text-3xl">neurology</span>
                </div>
                <h2 className="text-xl font-bold text-white">Görüntü Analizi</h2>
              </div>
              <p className="text-white/70">
                AI destekli görüntü analizi yapın
              </p>
            </Link>
          )}

          {user.role === 'RAPORTOR' && (
            <Link 
              href="/dashboard/reporter"
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <span className="material-symbols-outlined text-primary text-3xl">mic</span>
                </div>
                <h2 className="text-xl font-bold text-white">Rapor Yazımı</h2>
              </div>
              <p className="text-white/70">
                Ses kaydı ile rapor oluşturun
              </p>
            </Link>
          )}

          {user.role === 'ADMIN' && (
            <>
              <Link 
                href="/admin/users"
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/20 rounded-lg">
                    <span className="material-symbols-outlined text-primary text-3xl">group</span>
                  </div>
                  <h2 className="text-xl font-bold text-white">Kullanıcılar</h2>
                </div>
                <p className="text-white/70">
                  Kullanıcı yönetimi ve rol ataması
                </p>
              </Link>

              <Link 
                href="/admin/protocols"
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/20 rounded-lg">
                    <span className="material-symbols-outlined text-primary text-3xl">description</span>
                  </div>
                  <h2 className="text-xl font-bold text-white">Protokol Yönetimi</h2>
                </div>
                <p className="text-white/70">
                  Protokol CRUD + Excel import/export
                </p>
              </Link>

              <Link 
                href="/admin/logs"
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/20 rounded-lg">
                    <span className="material-symbols-outlined text-primary text-3xl">analytics</span>
                  </div>
                  <h2 className="text-xl font-bold text-white">Sistem Logları</h2>
                </div>
                <p className="text-white/70">
                  Tüm sistem aktivitelerini izleyin
                </p>
              </Link>

              <Link 
                href="/admin/settings"
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/20 rounded-lg">
                    <span className="material-symbols-outlined text-primary text-3xl">settings</span>
                  </div>
                  <h2 className="text-xl font-bold text-white">Ayarlar</h2>
                </div>
                <p className="text-white/70">
                  Webhook ve sistem ayarları
                </p>
              </Link>
            </>
          )}

          <Link 
            href="/dashboard/logs"
            className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/20 rounded-lg">
                <span className="material-symbols-outlined text-primary text-3xl">history</span>
              </div>
              <h2 className="text-xl font-bold text-white">Loglar</h2>
            </div>
            <p className="text-white/70">
              Aktivite geçmişinizi görüntüleyin
            </p>
          </Link>
        </div>

        <div className="mt-8">
          <form action={async () => {
            'use server'
            const { signOut } = await import('@/lib/auth')
            await signOut()
          }}>
            <button 
              type="submit"
              className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
            >
              Çıkış Yap
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

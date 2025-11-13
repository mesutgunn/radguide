import Link from 'next/link'

export function Hero() {
  return (
    <div className="@container py-10 md:py-20">
      <div className="@[480px]:p-4">
        <div 
          className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center text-center justify-center px-4 py-10 @[480px]:px-10" 
          style={{
            backgroundImage: "linear-gradient(rgba(16, 34, 32, 0.8) 0%, rgba(16, 34, 32, 0.95) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCkzTw7_ViX60ZRS8KEu-KP8gob7FEcve0X4RmAmsdLN5hZPx4nqA1-nGqoWYawRVs3Q7SjLrTEPCzASbXK6dTq3t2who9J1YHB0Hl2JENKEZxrSnKmI1cIZF196yaAHWMxPPMVpxNrIoe-HS_q3aC_59hEaBpvBs7dny7RzR_o0MvuvXv5xVTyERXUAumd2VqSArNo1pMVroag4K2gn6jvaRsNo9rXYt-uJMo_z2xztqlOnCXPSXtolEuym0OB4iNzigBF4TmY2PaO')"
          }}
        >
          <div className="flex flex-col gap-4 max-w-3xl">
            <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
              RadGuide ile Radyoloji Rehberiniz Artık Dijitalde
            </h1>
            <h2 className="text-white/80 text-base font-normal leading-normal @[480px]:text-lg @[480px]:font-normal @[480px]:leading-normal">
              Çekim protokolleri, görüntü analizleri ve yapay zekâ destekli değerlendirme araçları tek platformda.
            </h2>
          </div>
          <div className="flex-wrap gap-3 flex">
            <Link 
              href="/register"
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-primary text-background-dark text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]"
            >
              <span className="truncate">Ücretsiz Dene</span>
            </Link>
            <a 
              href="#features"
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-white/10 text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]"
            >
              <span className="truncate">Daha Fazla Bilgi Al</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

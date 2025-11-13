import Link from 'next/link'

export function Header() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-white/10 px-0 sm:px-10 py-3">
      <div className="flex items-center gap-4 text-white">
        <div className="size-4 text-primary">
          <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path 
              clipRule="evenodd" 
              d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" 
              fill="currentColor" 
              fillRule="evenodd"
            />
          </svg>
        </div>
        <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">RadGuide</h2>
      </div>
      <div className="hidden md:flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          <a className="text-white/80 hover:text-white transition-colors text-sm font-medium leading-normal" href="#features">
            Özellikler
          </a>
          <a className="text-white/80 hover:text-white transition-colors text-sm font-medium leading-normal" href="#how-it-works">
            Nasıl Çalışır
          </a>
          <a className="text-white/80 hover:text-white transition-colors text-sm font-medium leading-normal" href="#testimonials">
            Yorumlar
          </a>
        </div>
        <div className="flex gap-2">
          <Link 
            href="/login"
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-background-dark text-sm font-bold leading-normal tracking-[0.015em]"
          >
            <span className="truncate">Giriş Yap</span>
          </Link>
          <Link 
            href="/register"
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-white/10 text-white text-sm font-bold leading-normal tracking-[0.015em]"
          >
            <span className="truncate">Kayıt Ol</span>
          </Link>
        </div>
      </div>
    </header>
  )
}

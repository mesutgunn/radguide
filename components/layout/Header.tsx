'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'

export default function Header() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const isActive = (path: string) => pathname === path

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-white/10 px-4 sm:px-6 md:px-10 py-3">
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-4 text-white hover:opacity-80 transition-opacity">
          <div className="size-6 text-primary">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd"></path>
            </svg>
          </div>
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">RadGuide</h2>
        </Link>
        
        <nav className="hidden md:flex items-center gap-9">
          <Link 
            href="/dashboard" 
            className={`text-sm font-medium leading-normal transition-colors ${
              isActive('/dashboard') ? 'text-primary' : 'text-white/80 hover:text-white'
            }`}
          >
            Dashboard
          </Link>
          {session?.user.role !== 'ADMIN' && (
            <Link 
              href="/dashboard/protocols" 
              className={`text-sm font-medium leading-normal transition-colors ${
                isActive('/dashboard/protocols') ? 'text-primary' : 'text-white/80 hover:text-white'
              }`}
            >
              Protokoller
            </Link>
          )}
          {session?.user.role === 'ADMIN' && (
            <>
              <Link 
                href="/admin/users" 
                className={`text-sm font-medium leading-normal transition-colors ${
                  pathname.startsWith('/admin/users') ? 'text-primary' : 'text-white/80 hover:text-white'
                }`}
              >
                Kullanıcılar
              </Link>
              <Link 
                href="/admin/protocols" 
                className={`text-sm font-medium leading-normal transition-colors ${
                  pathname.startsWith('/admin/protocols') ? 'text-primary' : 'text-white/80 hover:text-white'
                }`}
              >
                Protokol Yönetimi
              </Link>
              <Link 
                href="/admin/settings" 
                className={`text-sm font-medium leading-normal transition-colors ${
                  pathname.startsWith('/admin/settings') ? 'text-primary' : 'text-white/80 hover:text-white'
                }`}
              >
                Ayarlar
              </Link>
            </>
          )}
        </nav>
      </div>

      <div className="flex flex-1 justify-end gap-4 md:gap-8 items-center">
        {session ? (
          <>
            <span className="hidden sm:block text-white/70 text-sm">
              {session.user.name}
            </span>
            <button 
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="hidden md:flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-white/10 hover:bg-white/20 text-white text-sm font-bold leading-normal tracking-[0.015em] transition-colors"
            >
              <span className="truncate">Çıkış Yap</span>
            </button>
          </>
        ) : (
          <Link 
            href="/login"
            className="hidden md:flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-background-dark text-sm font-bold leading-normal tracking-[0.015em]"
          >
            <span className="truncate">Giriş Yap</span>
          </Link>
        )}
      </div>
    </header>
  )
}

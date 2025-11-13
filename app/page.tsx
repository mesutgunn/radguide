import { Header } from '@/components/landing/Header'
import { Hero } from '@/components/landing/Hero'
import { Stats } from '@/components/landing/Stats'
import { Features } from '@/components/landing/Features'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { Testimonials } from '@/components/landing/Testimonials'
import { CTA } from '@/components/landing/CTA'
import { Footer } from '@/components/landing/Footer'

export default function Home() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1 px-4 sm:px-10">
            <Header />
            <Hero />
            <Stats />
            <Features />
            <HowItWorks />
            <div className="py-16 px-4 text-center">
              <h1 className="text-white tracking-light text-[32px] font-bold leading-tight sm:text-4xl max-w-2xl mx-auto">
                Akıllı Değerlendirme Araçları
              </h1>
              <p className="text-white/80 text-base font-normal leading-normal max-w-2xl mx-auto mt-4">
                RadGuide gelişmiş AI modülleriyle çekimlerinizi analiz eder, kaliteyi artırır ve karar verme süreçlerinizi destekler.
              </p>
            </div>
            <Testimonials />
            <CTA />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}

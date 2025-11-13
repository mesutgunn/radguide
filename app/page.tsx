import { Header } from '@/components/landing/Header'
import { Hero } from '@/components/landing/Hero'
import { Stats } from '@/components/landing/Stats'
import { Features } from '@/components/landing/Features'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { Testimonials } from '@/components/landing/Testimonials'
import { CTA } from '@/components/landing/CTA'
import { Footer } from '@/components/landing/Footer'
import { FadeInSection } from '@/components/ui/FadeInSection'

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="flex h-full w-full flex-col">
        <div className="flex flex-1 justify-center py-5">
          <div className="flex flex-col max-w-[960px] w-full px-4 sm:px-10 space-y-16">
            
            <FadeInSection delay={0.0}>
              <Header />
            </FadeInSection>

            <FadeInSection delay={0.1}>
              <Hero />
            </FadeInSection>

            <FadeInSection delay={0.15}>
              <Stats />
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <Features />
            </FadeInSection>

            <FadeInSection delay={0.25}>
              <HowItWorks />
            </FadeInSection>

            <FadeInSection delay={0.3}>
              <section className="py-16 px-4 text-center">
                <h1 className="text-white text-[32px] font-bold leading-tight tracking-tight sm:text-4xl max-w-2xl mx-auto">
                  Akıllı Değerlendirme Araçları
                </h1>
                <p className="text-white/80 text-base leading-normal max-w-2xl mx-auto mt-4">
                  RadGuide gelişmiş AI modülleriyle çekimlerinizi analiz eder, kaliteyi artırır ve karar verme süreçlerinizi destekler.
                </p>
              </section>
            </FadeInSection>

            <FadeInSection delay={0.35}>
              <Testimonials />
            </FadeInSection>

            <FadeInSection delay={0.4}>
              <CTA />
            </FadeInSection>

            <FadeInSection delay={0.45}>
              <Footer />
            </FadeInSection>

          </div>
        </div>
      </div>
    </div>
  )
}

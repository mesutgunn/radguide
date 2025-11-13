import Image from 'next/image'

export function Testimonials() {
  const testimonials = [
    {
      quote: 'RadGuide ile çekim protokollerini artık çok daha hızlı kontrol ediyorum. Bu, iş akışımı inanılmaz derecede hızlandırdı.',
      name: 'Ayşe Yılmaz',
      role: 'Radyoloji Teknikeri',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYh6PxOAwpnuaIMETy5mLdHwS_9Hvt0Vy8AtyHoeTRrWN29oThChyW91mZdOJ3_FLTpQaneQ-UGSeonfROdkhB1LW25NkTWyi6Lfb7r52dsdF3mOiZJ8poPX3WfLX2qEJ0iN-WhGZ2b_-u0YwjkTU_HCiM3_5nPvrMTTwvkSqFplgV_yt0zXJzRF-mzsox7UzqC0PLJPklrev0Y5x7DrCzqrTB78rFHnxx_zLW8G1qlsxaIR24pYTWO4roeYuYaFNVKC1FsUx25z0C'
    },
    {
      quote: 'AI analizi sayesinde eğitimlerde büyük kolaylık sağladı. Yeni başlayan teknikerler için harika bir öğrenme aracı.',
      name: 'Dr. Mehmet Kaya',
      role: 'Radyoloji Uzmanı',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALBN8ZwJ0g8HuUfdUVthkb-x4NX0XtkFdJNUFIkpBKnj-h2qVEIlCy1kaBSr499EQjSY3Cf4fsCxqAiDXfSA0kTa2Y9e27uIs4VEAEwBsC90GJnJD0hLUtIhQyb95QzvPYJepbTgw39pQ_csgrem3Ag2Tm3RThufO0KUkm4j6RlknvQpRC46bhAgm2Qy3AjB7AfD8V9fBTXAzjN5j7P4Hdcv1gO97eVj4wek7A1BzcjYkEL0FIEetxUagDjeYeAR3G6yRHy0HNiPh1'
    },
    {
      quote: 'Görsel kalite değerlendirmeleri artık standart hale geldi. Çekim kalitemizi objektif verilerle takip edebiliyoruz.',
      name: 'Can Öztürk',
      role: 'Klinik Yöneticisi',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDumjsOfqqJTkxuVn6Ie1jyJGeoEKh8y4AK9t3kydzeRDIaddCU0VcgjDiEZu5k3ZbHKTyhc1EudSBo6CmPM370HPAbxgp2eeg-tCaOhhtNj1Rxhy6n-0HbESd6KNIQFo0XUsTBqJBCQTBeHrx9q77vWEaLzIii73jgUxDWAh5XRzcZdJNwXonBE51DAkz_djPHeutLhnzF4dQ4ZYB_WPNacs4KWAXnVsUSNJ6XteIyJeT96G-_gXKiWl6bJ8JjHETldbwB08h7EnuV'
    }
  ]

  return (
    <div id="testimonials" className="flex flex-col gap-10 px-4 py-16 @container">
      <div className="text-center flex flex-col items-center gap-4">
        <h2 className="text-white text-[28px] font-bold leading-tight tracking-[-0.015em] sm:text-4xl">
          Kullanıcılarımız Ne Diyor?
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="flex flex-col gap-4 rounded-lg border border-white/10 bg-white/5 p-6">
            <p className="text-white/90 font-medium">{testimonial.quote}</p>
            <div className="flex items-center gap-3 mt-auto">
              <Image 
                className="size-10 rounded-full object-cover" 
                src={testimonial.image}
                alt={testimonial.name}
                width={40}
                height={40}
              />
              <div>
                <p className="text-white font-bold text-sm">{testimonial.name}</p>
                <p className="text-white/60 text-xs">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

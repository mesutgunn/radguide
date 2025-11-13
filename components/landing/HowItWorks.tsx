export function HowItWorks() {
  const steps = [
    {
      icon: 'upload_file',
      title: '1. Görüntüyü Yükle',
      description: 'Analiz etmek istediğiniz radyolojik görüntüyü platforma güvenli bir şekilde yükleyin.'
    },
    {
      icon: 'smart_toy',
      title: '2. AI ile Değerlendir',
      description: 'Gelişmiş yapay zekâ algoritmalarımız görüntüyü saniyeler içinde analiz etsin.'
    },
    {
      icon: 'summarize',
      title: '3. Sonuçları Al',
      description: 'Detaylı rapor, potansiyel bulgular ve kalite önerilerini anında görüntüleyin.'
    }
  ]

  return (
    <div id="how-it-works" className="flex flex-col gap-10 px-4 py-16 @container">
      <div className="text-center flex flex-col items-center gap-4">
        <h2 className="text-white text-[28px] font-bold leading-tight tracking-[-0.015em] sm:text-4xl">
          Nasıl Çalışır?
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start relative">
        {/* Connecting lines */}
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-px -translate-y-1/2 mt-[-32px]">
          <svg className="text-white/10" height="2" width="100%">
            <line stroke="currentColor" strokeDasharray="4 4" strokeWidth="2" x1="0" x2="100%" y1="1" y2="1" />
          </svg>
        </div>
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center relative z-10">
            <div className="flex items-center justify-center size-16 rounded-full border-2 border-primary bg-primary/20 text-primary mb-4">
              <span className="material-symbols-outlined text-3xl">{step.icon}</span>
            </div>
            <h3 className="text-white text-lg font-bold leading-tight mb-2">{step.title}</h3>
            <p className="text-white/70 text-sm font-normal leading-normal">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

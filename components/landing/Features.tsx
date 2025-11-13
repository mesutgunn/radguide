export function Features() {
  const features = [
    {
      icon: 'checklist',
      title: 'Çekim Protokolleri',
      description: 'En güncel ve standartlaştırılmış çekim protokollerine anında erişin.'
    },
    {
      icon: 'neurology',
      title: 'AI Görüntü Analizi',
      description: 'Yapay zeka ile görüntülerinizi saniyeler içinde analiz edin ve anormallikleri tespit edin.'
    },
    {
      icon: 'school',
      title: 'Kalite Değerlendirme ve Eğitim',
      description: 'Eğitim modülleri ve kalite kontrol araçları ile ekibinizin yetkinliğini artırın.'
    }
  ]

  return (
    <div id="features" className="flex flex-col gap-10 px-4 py-16 @container">
      <div className="text-center flex flex-col items-center gap-4">
        <h2 className="text-white text-[28px] font-bold leading-tight tracking-[-0.015em] sm:text-4xl">
          Tek Platformda Tüm Radyoloji Rehberleri
        </h2>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 p-0">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-1 gap-3 rounded-lg border border-white/10 bg-white/5 p-6 flex-col">
            <div className="text-primary">
              <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>
                {feature.icon}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-white text-lg font-bold leading-tight">{feature.title}</h3>
              <p className="text-white/70 text-sm font-normal leading-normal">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

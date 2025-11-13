export function Stats() {
  return (
    <div className="flex flex-wrap gap-4 p-4">
      <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-white/10 bg-white/5">
        <p className="text-white/80 text-base font-medium leading-normal">Kullanıcı</p>
        <p className="text-white tracking-light text-2xl font-bold leading-tight">10.000+</p>
      </div>
      <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-white/10 bg-white/5">
        <p className="text-white/80 text-base font-medium leading-normal">Protokol</p>
        <p className="text-white tracking-light text-2xl font-bold leading-tight">500+</p>
      </div>
      <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-white/10 bg-white/5">
        <p className="text-white/80 text-base font-medium leading-normal">Analiz</p>
        <p className="text-white tracking-light text-2xl font-bold leading-tight">AI Destekli</p>
      </div>
    </div>
  )
}

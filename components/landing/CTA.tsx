import Link from 'next/link'

export function CTA() {
  return (
    <div className="py-16 px-4 @container">
      <div 
        className="rounded-xl flex flex-col gap-6 items-center justify-center text-center p-10 bg-cover bg-center" 
        style={{
          backgroundImage: "linear-gradient(45deg, rgba(19, 236, 218, 0.1) 0%, rgba(16, 34, 32, 0.9) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuDhp21HFoBfOl4lIqsi3tTtz-A-F_-K5__8KWghbWVpaihbrynVNdkDs0DI3GhGf66rjuNI35np-0GjEprBW2afNhpR-MRTz5AIrFunlqxA5bKxVRoX0H6BySvDZZahKnUHS5D_vuMb8RyigDhcGrzSb_qDAfDHJm0UdZoQ4KVBycTT-utJvTZOCtWkKTd8LPO0dp0LLIBodOMoqC7W-QpMAHn4xpGe6FDcAW1VETJg-b-0OAb-WUKpMuP4H6HFCe-n_3sYsqAMEh1k')"
        }}
      >
        <h2 className="text-white text-3xl sm:text-4xl font-bold max-w-xl">
          RadGuide'ı Ücretsiz Denemeye Başla
        </h2>
        <Link 
          href="/register"
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-background-dark text-base font-bold leading-normal tracking-[0.015em]"
        >
          <span className="truncate">Hemen Başla</span>
        </Link>
      </div>
    </div>
  )
}

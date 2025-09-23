export function BannerSection() {
  return (
    <section className="bg-primary text-primary-foreground py-4 border-b pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm md:text-base font-medium">
            🎉 <span className="font-bold">특별 이벤트:</span> 12월 프로포즈 패키지 20% 할인!
            <span className="ml-2 font-semibold hover:underline cursor-pointer text-accent-foreground">
              지금 상담받기 →
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}

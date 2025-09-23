import { BannerSection } from "@/components/banner-section"
import { HeroSection } from "@/components/hero-section"
import { FeaturedSection } from "@/components/featured-section"
import { ContactSection } from "@/components/contact-section"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <BannerSection />
      <HeroSection />
      <FeaturedSection />
      <ContactSection />
    </main>
  )
}

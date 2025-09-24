'use client'
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import Link from 'next/link'

export function HeroSection() {
  // ContactSection 이동 함수
  const handleContactScroll = () => {
    const el = document.getElementById("contact-section")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video/Image Placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-primary/20 via-background to-accent/20" />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1
            className="hero-text font-bold text-foreground mb-8 text-balance"
            style={{ letterSpacing: "0.02em", lineHeight: "1.2" }}
          >
            완벽한 순간을 위한
            <br />
            <span className="text-accent">특별한 프로포즈</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty leading-relaxed">
            서울에서 가장 로맨틱하고 감동적인 프로포즈를 만들어드립니다. <br />
            당신만의 이야기로 세상에 단 하나뿐인 순간을 선사하세요.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button
              size="lg"
              className="text-lg px-8 py-6 cursor-pointer"
              type="button"
              onClick={handleContactScroll}
            >
              상담 문의하기
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link href="/services">
              <Button
                variant="default"
                size="lg"
                className="text-lg px-8 py-6 cursor-pointer transition-colors bg-primary text-primary-foreground hover:bg-primary/80"
              >
                프로포즈 보기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}

import Link from "next/link"
import { Phone, MessageCircle, Instagram, Mail, MapPin, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">김은아 프로포즈 플래너</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              서울에서 가장 특별한 프로포즈를 만들어드립니다. 당신만의 완벽한 순간을 위해 맞춤형 기획부터 실행까지
              함께합니다.
            </p>
            {/* <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>남양주시ㅣ</span>
            </div> */}
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">빠른 메뉴</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                소개
              </Link>
              <Link href="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                프로포즈
              </Link>
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                블로그
              </Link>
              <Link href="/announcements" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                공지사항
              </Link>
              <Link href="/consultation" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                상담신청
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">연락처</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:010-5849-0776" className="text-muted-foreground hover:text-primary transition-colors">
                  010-5849-0776
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-primary" />
                <span>평일 10:00 - 19:00</span>
              </div>
            </div>
          </div>

          {/* Social & Consultation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">상담 채널</h3>
            <div className="space-y-3">
              <a
                href="https://open.kakao.com/o/your-kakao-link"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-yellow-600 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span>카카오톡 상담</span>
              </a>
              <a
                href="https://instagram.com/euna.planner"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-pink-600 transition-colors"
              >
                <Instagram className="h-4 w-4" />
                <span>인스타그램 DM</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">© 2025 김은아 프로포즈 플래너. All rights reserved.</div>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              개인정보처리방침
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
              이용약관
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

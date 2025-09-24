// 1. Dialog 관련 컴포넌트를 import 합니다.
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button" // DialogFooter의 닫기 버튼용
import Link from "next/link"
import { Phone, MessageCircle, Instagram, Mail, MapPin, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        {/* ... (상단 그리드 부분은 기존 코드와 동일) ... */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">김은아 프로포즈 플래너</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              서울에서 가장 특별한 프로포즈를 만들어드립니다. 당신만의 완벽한 순간을 위해 맞춤형 기획부터 실행까지 함께합니다.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">빠른 메뉴</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">소개</Link>
              <Link href="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">프로포즈</Link>
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">블로그</Link>
              <Link href="/announcements" className="text-sm text-muted-foreground hover:text-primary transition-colors">공지사항</Link>
              <Link href="/consultation" className="text-sm text-muted-foreground hover:text-primary transition-colors">상담신청</Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">연락처</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:010-5849-0776" className="text-muted-foreground hover:text-primary transition-colors">010-5849-0776</a>
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
              <a href="https://open.kakao.com/o/your-kakao-link" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-yellow-600 transition-colors">
                <MessageCircle className="h-4 w-4" />
                <span>카카오톡 상담</span>
              </a>
              <a href="https://instagram.com/euna.planner" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-pink-600 transition-colors">
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

            {/* 2. 기존 Link를 Dialog 컴포넌트로 교체 */}
            {/* 개인정보처리방침 Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-muted-foreground hover:text-primary transition-colors">개인정보처리방침</button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl mb-4">개인정보처리방침</DialogTitle>
                  <DialogDescription className="text-left space-y-4 text-muted-foreground">
                    <p className="text-sm">
                      김은아 프로포즈 플래너(이하 '서비스')는 개인정보 보호법에 따라 이용자의 개인정보 및 권익을 보호하고 개인정보와 관련한 이용자의 고충을 원활하게 처리할 수 있도록 다음과 같은 처리방침을 두고 있습니다.
                    </p>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">제1조 (개인정보의 처리 목적)</h3>
                      <p className="text-sm">서비스는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.<br />- 서비스 제공: 상담, 견적 문의, 예약, 프로포즈 기획 및 실행 등 서비스 제공과 관련된 목적으로 개인정보를 처리합니다.</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">제2조 (처리하는 개인정보의 항목)</h3>
                      <p className="text-sm">서비스는 다음의 개인정보 항목을 처리하고 있습니다.<br />- 필수항목: 이름, 연락처, 이메일 주소</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">제3조 (개인정보의 처리 및 보유 기간)</h3>
                      <p className="text-sm">서비스는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.<br />- 보유 근거: 원활한 서비스 제공 및 고객 관리<br />- 보유 기간: 상담 종료 후 1년 (단, 관계 법령 위반에 따른 수사·조사 등이 진행 중인 경우에는 해당 수사·조사 종료 시까지)</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">제4조 (개인정보처리방침의 변경)</h3>
                      <p className="text-sm">이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.</p>
                      <p className="text-sm mt-2"><strong>시행일자: 2025년 9월 24일</strong></p>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

           

          </div>
        </div>
      </div>
    </footer>
  )
}
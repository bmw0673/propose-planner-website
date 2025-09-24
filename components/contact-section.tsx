"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, MessageCircle, Instagram, Send } from "lucide-react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function ContactSection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title font-bold text-foreground mb-6">특별한 순간을 함께 만들어보세요</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            당신의 이야기를 들려주세요. 완벽한 프로포즈를 위한 첫 걸음을 함께 시작하겠습니다.
          </p>
          <div className="mt-8">
            <Link href="/consultation">
              <Button
                size="lg"
                className="text-lg px-8 py-6 cursor-pointer"
                type="button"
              >
                상담신청 이동
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* 전화상담 카드 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-bold text-foreground mb-3 text-xl">전화 상담</h3>
              <p className="text-muted-foreground mb-4">
                평일 10:00 - 19:00
                <br />
                주말 및 공휴일 예약 상담 가능
              </p>
              <p className="font-medium text-foreground mb-4">010-5849-0776</p>
              <Button className="w-full bg-accent hover:bg-accent/90 cursor-pointer" onClick={() => window.open("tel:010-5849-0776")}>
                전화걸기
              </Button>
            </CardContent>
          </Card>

          {/* 카카오톡 상담 카드 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="font-bold text-foreground mb-3 text-xl">카카오톡 상담</h3>
              <p className="text-muted-foreground mb-4">
                실시간 채팅 상담
                <br />
                빠른 답변 가능
              </p>
              <p className="font-medium text-foreground mb-4">@eunaplanner</p>
              <Button
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-yellow-900 cursor-pointer"
                onClick={() => window.open("https://pf.kakao.com/_프로포즈플래너", "_blank")}
              >
                카톡 상담
              </Button>
            </CardContent>
          </Card>

          {/* 인스타그램 상담 카드 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Instagram className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-foreground mb-3 text-xl">인스타그램 DM</h3>
              <p className="text-muted-foreground mb-4">
                포트폴리오 확인 및 상담
                <br />
                실제 사례 사진 제공
              </p>
              <p className="font-medium text-foreground mb-4">@euna.planner</p>
              <Button
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white cursor-pointer"
                onClick={() => window.open("https://instagram.com/euna.planner", "_blank")}
              >
                인스타 DM
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

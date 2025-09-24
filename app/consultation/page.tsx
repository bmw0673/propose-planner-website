"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, Search, ArrowRight, PenTool, Lock, Eye } from "lucide-react"

export default function ConsultationPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Mock data for consultation posts
  const consultations = [
    {
      id: 1,
      title: "한강에서 프로포즈 상담 요청",
      eventType: "야외 프로포즈",
      author: "김**",
      date: "2024.03.15",
      isPrivate: true,
      hasPassword: true,
      views: 12,
    },
    {
      id: 2,
      title: "레스토랑 프로포즈 기획 문의",
      eventType: "실내 프로포즈",
      author: "이**",
      date: "2024.03.14",
      isPrivate: false,
      hasPassword: false,
      views: 8,
    },
    {
      id: 3,
      title: "해변 선셋 프로포즈 상담",
      eventType: "야외 프로포즈",
      author: "박**",
      date: "2024.03.13",
      isPrivate: true,
      hasPassword: true,
      views: 15,
    },
    {
      id: 4,
      title: "호텔 루프탑 프로포즈 문의",
      eventType: "실내 프로포즈",
      author: "최**",
      date: "2024.03.12",
      isPrivate: true,
      hasPassword: true,
      views: 6,
    },
    {
      id: 5,
      title: "공원 피크닉 프로포즈 상담",
      eventType: "야외 프로포즈",
      author: "정**",
      date: "2024.03.11",
      isPrivate: false,
      hasPassword: false,
      views: 20,
    },
    {
      id: 6,
      title: "카페 프로포즈 기획 문의",
      eventType: "실내 프로포즈",
      author: "강**",
      date: "2024.03.10",
      isPrivate: true,
      hasPassword: true,
      views: 9,
    },
    {
      id: 7,
      title: "놀이공원 프로포즈 상담",
      eventType: "테마 프로포즈",
      author: "윤**",
      date: "2024.03.09",
      isPrivate: false,
      hasPassword: false,
      views: 18,
    },
    {
      id: 8,
      title: "집에서 서프라이즈 프로포즈",
      eventType: "홈 프로포즈",
      author: "조**",
      date: "2024.03.08",
      isPrivate: true,
      hasPassword: true,
      views: 11,
    },
  ]

  const totalPages = Math.ceil(consultations.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentConsultations = consultations.slice(startIndex, startIndex + itemsPerPage)

  const eventTypes = ["전체", "야외 프로포즈", "실내 프로포즈", "테마 프로포즈", "홈 프로포즈"]

  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="section-title font-bold text-foreground mb-6">상담신청</h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            프로포즈 상담을 신청하고 다른 분들의 상담 내용도 확인해보세요.
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="상담 내용 검색..." className="pl-10 pr-4 py-3" />
          </div>

          {/* Write Button */}
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
            <Link href="/consultation/write">
              <PenTool className="mr-2 h-5 w-5" />
              상담신청 작성하기
            </Link>
          </Button>
        </div>
      </section>

      {/* Event Type Filter */}
      <section className="py-8 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {eventTypes.map((type, index) => (
              <Button key={index} variant={index === 0 ? "default" : "outline"} size="sm" className="rounded-full">
                {type}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">상담신청 목록</h2>
            <p className="text-muted-foreground">총 {consultations.length}개의 상담신청이 있습니다.</p>
          </div>

          <div className="space-y-4">
            {currentConsultations.map((consultation) => (
              <Card key={consultation.id} className="hover:shadow-md transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Badge variant="secondary" className="text-xs">
                        {consultation.eventType}
                      </Badge>
                      {consultation.hasPassword && (
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Lock className="h-3 w-3" />
                          <span>비밀글</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{consultation.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{consultation.views}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">{consultation.title}</h3>
                      <p className="text-sm text-muted-foreground">작성자: {consultation.author}</p>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/consultation/${consultation.id}`}>
                        상세보기 <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center space-x-2 mt-12">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              이전
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className="min-w-[40px]"
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              다음
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

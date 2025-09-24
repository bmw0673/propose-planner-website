"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Calendar, Eye, Lock, Phone, Clock, User, MessageSquare } from "lucide-react"

interface ConsultationData {
  id: number
  title: string
  eventType: string
  author: string
  phone: string
  date: string
  views: number
  hasPassword: boolean
  content: string
  phoneAvailable: boolean
  unavailableHours?: string
}

export default function ConsultationDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  // Mock consultation data
  const consultationData: ConsultationData = {
    id: Number(params.id),
    title: "한강에서 프로포즈 상담 요청",
    eventType: "야외 프로포즈",
    author: "김민수",
    phone: "010-1234-5678",
    date: "2024.03.15",
    views: 12,
    hasPassword: true,
    content: `안녕하세요. 다음 달 여자친구에게 프로포즈를 계획하고 있습니다.

장소: 한강공원 (반포 무지개다리 근처)
시간: 저녁 7시경 (일몰 시간)
예산: 200-300만원
인원: 2명 (저와 여자친구)

특별한 요청사항:
1. 꽃다발과 반지 준비
2. 사진/영상 촬영 서비스
3. 간단한 세팅 (캔들, 장미꽃잎 등)
4. 날씨가 안 좋을 경우 대안 장소

여자친구가 한강을 정말 좋아해서 이곳에서 프로포즈를 하고 싶습니다. 
로맨틱하면서도 자연스러운 분위기를 원합니다.

상세한 상담을 받고 싶습니다. 연락 주세요!`,
    phoneAvailable: true,
    unavailableHours: "평일 오전 9시-오후 6시 (업무시간)",
  }

  useEffect(() => {
    // Check if user is admin (mock check)
    const adminStatus = localStorage.getItem("isAdmin") === "true"
    setIsAdmin(adminStatus)

    // If admin or no password required, show content immediately
    if (adminStatus || !consultationData.hasPassword) {
      setIsAuthenticated(true)
    }

    setIsLoading(false)
  }, [])

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Mock password validation
    if (password === "1234") {
      setIsAuthenticated(true)
      // Increment view count
      console.log("[v0] Password verified, showing consultation content")
    } else {
      setError("비밀번호가 올바르지 않습니다.")
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">로딩 중...</div>
        </div>
      </main>
    )
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen pt-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link href="/consultation">
              <ArrowLeft className="mr-2 h-4 w-4" />
              목록으로 돌아가기
            </Link>
          </Button>

          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-muted-foreground" />
              </div>
              <CardTitle>비밀글 확인</CardTitle>
              <p className="text-muted-foreground">이 글을 보려면 비밀번호를 입력해주세요.</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">비밀번호</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {error && <p className="text-sm text-destructive">{error}</p>}
                </div>
                <Button type="submit" className="w-full">
                  확인
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/consultation">
              <ArrowLeft className="mr-2 h-4 w-4" />
              목록으로 돌아가기
            </Link>
          </Button>

          {isAdmin && (
            <div className="mb-4">
              <Badge variant="destructive" className="text-xs">
                관리자 모드
              </Badge>
            </div>
          )}
        </div>

        {/* Consultation Detail */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <Badge variant="secondary">{consultationData.eventType}</Badge>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{consultationData.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>{consultationData.views}</span>
                </div>
                {consultationData.hasPassword && (
                  <div className="flex items-center space-x-1">
                    <Lock className="h-3 w-3" />
                    <span>비밀글</span>
                  </div>
                )}
              </div>
            </div>
            <CardTitle className="text-2xl">{consultationData.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Author Info */}
            <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">작성자: {isAdmin ? consultationData.author : "김**"}</p>
                {isAdmin && <p className="text-sm text-muted-foreground">연락처: {consultationData.phone}</p>}
              </div>
            </div>

            <Separator />

            {/* Content */}
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                상담 내용
              </h3>
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-foreground leading-relaxed">
                  {consultationData.content}
                </pre>
              </div>
            </div>

            <Separator />

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center">
                <Phone className="mr-2 h-5 w-5" />
                연락 정보
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">전화 상담</h4>
                  <p className="text-sm text-muted-foreground">{consultationData.phoneAvailable ? "가능" : "불가능"}</p>
                </div>

                {consultationData.phoneAvailable && consultationData.unavailableHours && (
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      통화 불가 시간
                    </h4>
                    <p className="text-sm text-muted-foreground">{consultationData.unavailableHours}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Admin Actions */}
            {isAdmin && (
              <>
                <Separator />
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    수정
                  </Button>
                  <Button variant="destructive" size="sm">
                    삭제
                  </Button>
                  <Button size="sm">답변하기</Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

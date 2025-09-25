"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase-client"
import Link from "next/link"

// UI 컴포넌트 import
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
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
  answer?: string | null
}

export default function ConsultationDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  // draftAnswer: 모달 입력 중 임시 값, savedAnswer: 실제 등록된 값
  const [draftAnswer, setDraftAnswer] = useState<string>("")
  const [savedAnswer, setSavedAnswer] = useState<string | null>(null)
  const [showAnswerModal, setShowAnswerModal] = useState(false)

  const [consultationData, setConsultationData] = useState<ConsultationData | null>(null)

  useEffect(() => {
    const fetchDetail = async () => {
      const res = await fetch(`/api/consultations?id=${params.id}`)
      const data = await res.json()
      setConsultationData({
        id: 0,
        title: data.title,
        eventType: data.eventType || '상담',
        author: data.author || '익명',
        phone: data.phone || '',
        date: data.date,
        views: data.views || 0,
        hasPassword: !!data.hasPassword,
        content: data.content,
        phoneAvailable: true,
        unavailableHours: undefined,
        answer: savedAnswer ?? data.answer ?? null,
      })
    }

    fetchDetail()

    // Check if user is admin (Supabase session check)
    const checkAdminStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      const isAdminUser = !!session
      setIsAdmin(isAdminUser)

      // If admin or no password required, show content immediately
      if (isAdminUser || (consultationData && !consultationData.hasPassword)) {
        setIsAuthenticated(true)
      }

      setIsLoading(false)
    }

    checkAdminStatus()
  }, [])

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Mock password validation
    if (password === "1234") {
      setIsAuthenticated(true)
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

  if (!isAuthenticated || !consultationData) {
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
            <CardTitle className="text-2xl">{consultationData ? consultationData.title : ""}</CardTitle>
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

            {/* 답변 영역: shadcn/ui Dialog 컴포넌트로 수정된 부분 */}
            {consultationData.answer ? (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="font-semibold text-green-700 mb-2">답변</div>
                <div className="text-green-900 whitespace-pre-line">{consultationData.answer}</div>
              </div>
            ) : isAdmin ? (
              <>
                <Dialog open={showAnswerModal} onOpenChange={setShowAnswerModal}>

                  <DialogContent
                    className="sm:max-w-[425px]"
                    aria-describedby="answer-desc"
                    onInteractOutside={(e) => e.preventDefault()}
                    onEscapeKeyDown={(e) => e.preventDefault()}
                    onOpenAutoFocus={(e) => e.preventDefault()}
                  >
                    <DialogHeader>
                      <DialogTitle>답변 작성</DialogTitle>
                      {/* 접근성 설명 */}
                      <DialogDescription id="answer-desc">
                        관리자 답변을 입력하고 등록 버튼을 눌러 저장하세요. Enter는 줄바꿈, Ctrl+Enter는 등록 단축키로 사용할 수 있습니다.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <Textarea
                        placeholder="답변 내용을 입력하세요."
                        className="min-h-[120px] resize-none"
                        value={draftAnswer}
                        onChange={(e) => setDraftAnswer(e.target.value)}
                        autoFocus
                      />
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="secondary" onClick={() => { setShowAnswerModal(false); setDraftAnswer("") }}>
                        취소
                      </Button>
                      <Button
                        type="button"
                        onClick={async () => {
                          await fetch('/api/consultations', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: params.id, answer: draftAnswer }) })
                          setSavedAnswer(draftAnswer)
                          setShowAnswerModal(false);
                          setDraftAnswer("")
                        }}
                        disabled={!draftAnswer || draftAnswer.trim() === ""}
                      >
                        등록
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </>
            ) : (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-center">
                답변 대기중입니다.
              </div>
            )}

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
                  <Button size="sm" onClick={() => setShowAnswerModal(true)}>답변하기</Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
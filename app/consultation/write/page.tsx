"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Send } from "lucide-react"
import Link from "next/link"

export default function ConsultationWritePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    eventType: "",
    title: "",
    content: "",
    phoneAvailable: false,
    unavailableHours: "",
  })

  const eventTypes = [
    "야외 프로포즈",
    "실내 프로포즈",
    "테마 프로포즈",
    "홈 프로포즈",
    "해변 프로포즈",
    "산/자연 프로포즈",
    "레스토랑 프로포즈",
    "호텔 프로포즈",
    "기타",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validation
    if (
      !formData.name ||
      !formData.phone ||
      !formData.password ||
      !formData.eventType ||
      !formData.title ||
      !formData.content
    ) {
      alert("필수 항목을 모두 입력해주세요.")
      setIsSubmitting(false)
      return
    }

    // Mock submission - in real app, this would be an API call
    try {
      console.log("[v0] Submitting consultation:", formData)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      alert("상담신청이 성공적으로 등록되었습니다!")
      router.push("/consultation")
    } catch (error) {
      console.error("[v0] Error submitting consultation:", error)
      alert("상담신청 등록 중 오류가 발생했습니다. 다시 시도해주세요.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
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
          <h1 className="text-3xl font-bold text-foreground mb-2">상담신청 작성</h1>
          <p className="text-muted-foreground">
            프로포즈 상담을 위한 정보를 입력해주세요. 모든 정보는 안전하게 보호됩니다.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>상담신청서</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">이름 *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="실명을 입력해주세요"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">연락처 *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="010-0000-0000"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">비밀번호 *</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="상담글 조회 시 사용할 비밀번호 (4자리 이상)"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  minLength={4}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  비밀번호는 상담글 조회 시 사용됩니다. 안전한 비밀번호를 설정해주세요.
                </p>
              </div>

              {/* Event Type */}
              <div className="space-y-2">
                <Label htmlFor="eventType">프로포즈 유형 *</Label>
                <Select value={formData.eventType} onValueChange={(value) => handleInputChange("eventType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="원하시는 프로포즈 유형을 선택해주세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">제목 *</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="상담 제목을 입력해주세요"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label htmlFor="content">문의내용 *</Label>
                <Textarea
                  id="content"
                  placeholder="프로포즈 계획, 예산, 희망 장소, 특별한 요청사항 등을 자세히 적어주세요."
                  value={formData.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                  rows={8}
                  required
                />
              </div>

              {/* Phone Availability */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="phoneAvailable"
                    checked={formData.phoneAvailable}
                    onCheckedChange={(checked) => handleInputChange("phoneAvailable", checked as boolean)}
                  />
                  <Label
                    htmlFor="phoneAvailable"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    전화 상담 가능
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground">체크하시면 전화로도 상담을 진행할 수 있습니다.</p>

                {formData.phoneAvailable && (
                  <div className="space-y-2">
                    <Label htmlFor="unavailableHours">전화 불가능한 시간대</Label>
                    <Textarea
                      id="unavailableHours"
                      placeholder="예: 평일 오전 9시-오후 6시 (업무시간), 주말 오후 2시-4시"
                      value={formData.unavailableHours}
                      onChange={(e) => handleInputChange("unavailableHours", e.target.value)}
                      rows={3}
                    />
                    <p className="text-sm text-muted-foreground">
                      전화를 받기 어려운 시간대를 알려주시면 피해서 연락드리겠습니다.
                    </p>
                  </div>
                )}
              </div>

              {/* Privacy Notice */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">개인정보 처리 안내</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 수집된 개인정보는 상담 목적으로만 사용됩니다.</li>
                  <li>• 상담 완료 후 1년간 보관 후 자동 삭제됩니다.</li>
                  <li>• 제3자에게 개인정보를 제공하지 않습니다.</li>
                  <li>• 언제든지 개인정보 삭제를 요청하실 수 있습니다.</li>
                </ul>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" asChild>
                  <Link href="/consultation">취소</Link>
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "등록 중..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      상담신청 등록
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

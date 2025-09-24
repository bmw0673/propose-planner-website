"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Mock admin credentials - in real app, this would be server-side authentication
    if (formData.email === "admin@planner.com" && formData.password === "admin123") {
      // Set admin status in localStorage
      localStorage.setItem("isAdmin", "true")
      localStorage.setItem("adminEmail", formData.email)

      console.log("[v0] Admin login successful")

      // Redirect to consultation page or previous page
      const returnUrl = new URLSearchParams(window.location.search).get("returnUrl")
      router.push(returnUrl || "/consultation")
    } else {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.")
    }

    setIsLoading(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">관리자 로그인</CardTitle>
          <CardDescription>김은아 플래너 관리자 계정으로 로그인하세요</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@planner.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                required
              />
            </div>

            {error && <div className="text-sm text-destructive text-center">{error}</div>}

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? "로그인 중..." : "로그인"}
            </Button>

            {/* <div className="text-center text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
              <p className="font-medium mb-1">데모 계정</p>
              <p>이메일: admin@planner.com</p>
              <p>비밀번호: admin123</p>
            </div> */}

            <div className="text-center text-sm text-muted-foreground">
              <Link href="/" className="text-primary hover:underline">
                홈으로 돌아가기
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

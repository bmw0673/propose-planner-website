"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase-client"

interface AdminHeaderProps {
  onTabChange: (tab: "consultation" | "notice" | "blog") => void
  activeTab: "consultation" | "notice" | "blog"
}

export default function AdminHeader({ onTabChange, activeTab }: AdminHeaderProps) {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      // Supabase 클라이언트에서 직접 로그아웃 (세션 자동 삭제)
      await supabase.auth.signOut()
      router.push('/login')
    } catch (error) {
      console.error('Logout failed:', error)
      setIsLoggingOut(false)
    }
  }

  return (
      <div className="flex w-full max-w-2xl justify-between items-center mb-8">
      <div className="flex space-x-4">
        <button
          className={`px-4 py-2 rounded ${activeTab === "consultation" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
          onClick={() => onTabChange("consultation")}
        >
          상담신청 관리
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === "notice" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
          onClick={() => onTabChange("notice")}
        >
          공지사항 관리
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === "blog" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
          onClick={() => onTabChange("blog")}
        >
          블로그 관리
        </button>
      </div>
      <button
        className="px-4 py-2 rounded bg-destructive text-destructive-foreground hover:bg-destructive/80 transition disabled:opacity-50"
        onClick={handleLogout}
        disabled={isLoggingOut}
      >
        {isLoggingOut ? "로그아웃 중..." : "로그아웃"}
      </button>
    </div>
  )
}

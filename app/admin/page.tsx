"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminDashboard from "./components/admin-dashboard"
import { supabase } from '@/lib/supabase-client'

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        router.replace('/login?returnUrl=/admin')
      }
    }

    checkSession()
  }, [router])

  return (
    <div className="min-h-screen flex flex-col items-center py-10 bg-background pt-20">
      <h1 className="text-3xl font-bold mb-8">관리자 대시보드</h1>
      <AdminDashboard />
    </div>
  )
}

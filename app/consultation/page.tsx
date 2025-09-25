"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, Search, ArrowRight, PenTool, Lock, Eye } from "lucide-react"
import LoadingSpinner from "@/components/loading-spinner"

export default function ConsultationPage() {
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [items, setItems] = useState<any[]>([])
  const loaderRef = useRef<HTMLDivElement | null>(null)

  const fetchPage = async (p: number) => {
    const res = await fetch(`/api/consultations?page=${p}&limit=10`)
    const data = await res.json()
    setItems((prev) => {
      const seen = new Set(prev.map((i) => String(i.id)))
      const incoming = (data.consultations as any[]).filter((i) => !seen.has(String(i.id)))
      const merged = [...prev, ...incoming]
      return Array.from(new Map(merged.map(m => [String(m.id), m])).values())
    })
    setTotal(data.total)
  }

  useEffect(() => { fetchPage(1) }, [])

  useEffect(() => {
    if (!loaderRef.current) return
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const next = page + 1
        const maxPage = Math.ceil(total / 10)
        if (total === 0 || next <= maxPage) {
          setPage(next)
          fetchPage(next)
        }
      }
    })
    io.observe(loaderRef.current)
    return () => io.disconnect()
  }, [loaderRef.current, page, total])

  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="section-title font-bold text-foreground mb-6">상담신청</h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            성공적인 프로포즈의 첫 걸음, 맞춤 상담을 신청하세요
          </p>

          {/* Write Button */}
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
            <Link href="/consultation/write">
              <PenTool className="mr-2 h-5 w-5" />
              상담신청 작성하기
            </Link>
          </Button>
        </div>
      </section>

      {/* Count Section (blog와 동일한 레이아웃) */}
      <section className="py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h2 className="text-xl font-bold">전체 상담</h2>
          <span className="text-sm text-muted-foreground">{items.length === 0 ? <LoadingSpinner size={16} /> : <>총 {total.toLocaleString()}개</>}</span>
        </div>
      </section>

      {/* Consultation List */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8" />

          <div className="space-y-4">
            {items.length === 0 && (
              <div className="flex justify-center py-10"><LoadingSpinner size={40} /></div>
            )}
            {Array.from(new Map(items.map(c => [String(c.id), c])).values()).map((consultation) => (
              <Card key={String(consultation.id)} className="hover:shadow-md transition-shadow duration-300">
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

          {/* Infinite sentinel */}
          <div ref={loaderRef} className="h-1" />
        </div>
      </section>
    </main>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Pin } from "lucide-react"
import Link from "next/link"
import LoadingSpinner from "@/components/loading-spinner"

type Ann = { id: string; title: string; excerpt: string; image: string | null; pinned?: boolean; date: string }

export default function AnnouncementsPage() {
  const [items, setItems] = useState<Ann[]>([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const loaderRef = useRef<HTMLDivElement | null>(null)

  const fetchPage = async (p: number) => {
    if (isLoading) return
    setIsLoading(true)
    const res = await fetch(`/api/announcements?page=${p}&limit=10`)
    const data = await res.json()
    setItems((prev) => {
      const seen = new Set(prev.map((i) => i.id))
      const next: Ann[] = [...prev]
      for (const it of (data.announcements as Ann[])) {
        if (!seen.has(it.id)) next.push(it)
      }
      return next
    })
    setTotal(data.total)
    setIsLoading(false)
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
      <section className="py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="section-title font-bold text-foreground mb-6">공지사항</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            최신 소식과 중요한 안내를 확인해 주세요.
          </p>
        </div>
      </section>

      {/* Count Section (blog와 동일한 레이아웃) */}
      <section className="py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h2 className="text-xl font-bold">전체 공지</h2>
          <span className="text-sm text-muted-foreground">{isLoading && items.length === 0 ? <LoadingSpinner size={16} /> : <>총 {total.toLocaleString()}개</>}</span>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {isLoading && items.length === 0 && (
              <div className="flex justify-center py-10"><LoadingSpinner size={40} /></div>
            )}
            {items.map((a) => (
              <Link key={a.id} href={`/announcements/${a.id}`} className="block">
                <Card className="hover:shadow-md transition-shadow">
                  <div className="flex items-stretch gap-4 p-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                        <Calendar className="h-3 w-3" />
                        <span>{a.date}</span>
                        {a.pinned && <span className="ml-2 inline-block rounded bg-yellow-100 text-yellow-800 px-2 py-0.5 text-[10px]">고정</span>}
                      </div>
                      <CardTitle className="text-base font-bold line-clamp-2">{a.title}</CardTitle>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{a.excerpt}</p>
                    </div>
                    <div className="w-24 h-24 shrink-0 rounded-md overflow-hidden border">
                      <img src={a.image || "/placeholder.svg"} alt={a.title} className="w-full h-full object-cover" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
            <div ref={loaderRef} className="h-1" />
          </div>
        </div>
      </section>
    </main>
  )
}

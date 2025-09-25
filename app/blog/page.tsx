"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight } from "lucide-react"
import LoadingSpinner from "@/components/loading-spinner"

type BlogPost = {
  id: string
  title: string
  excerpt: string
  date: string
  image: string
  pinned?: boolean
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const loaderRef = useRef<HTMLDivElement | null>(null)

  const fetchPosts = async (nextPage: number) => {
    if (isLoading) return
    setIsLoading(true)
    const res = await fetch(`/api/blog?page=${nextPage}&limit=12`)
    const data = await res.json()
    setPosts(prev => {
      const seen = new Set(prev.map((p) => p.id))
      const incoming = (data.posts as BlogPost[]).filter((it) => !seen.has(String(it.id)))
      const merged: BlogPost[] = [...prev, ...incoming.map(p => ({ ...p, id: String(p.id) }))]
      // 추가 안전장치: 최종 렌더 전에 한 번 더 중복 제거
      const uniq = Array.from(new Map(merged.map(m => [m.id, m])).values())
      return uniq
    })
    setTotal(data.total)
    setIsLoading(false)
  }

  useEffect(() => { fetchPosts(1) }, [])

  useEffect(() => {
    if (!loaderRef.current) return
    const observer = new IntersectionObserver((entries) => {
      const first = entries[0]
      if (first.isIntersecting) {
        const next = page + 1
        const maxPage = Math.ceil(total / 12)
        if (total === 0 || next <= maxPage) {
          setPage(next)
          fetchPosts(next)
        }
      }
    })
    observer.observe(loaderRef.current)
    return () => observer.disconnect()
  }, [loaderRef.current, page, total])

  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="section-title font-bold text-foreground mb-6">프로포즈 블로그</h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            완벽한 프로포즈를 위한 유용한 정보와 아이디어, 그리고 실제 성공 사례들을 공유합니다.
          </p>
        </div>
      </section>

      {/* 상단 정보 */}
      <section className="py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h2 className="text-xl font-bold">전체 포스트</h2>
          <span className="text-sm text-muted-foreground">{isLoading && posts.length === 0 ? <LoadingSpinner size={16} /> : <>총 {total.toLocaleString()}개</>}</span>
        </div>
      </section>

      {/* 세로 카드 리스트 */}
      <section className="py-8 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {isLoading && posts.length === 0 && (
              <div className="flex justify-center py-10"><LoadingSpinner size={40} /></div>
            )}
            {Array.from(new Map(posts.map(p => [p.id, p])).values()).map((post) => (
              <Link key={String(post.id)} href={`/blog/${post.id}`} className="block">
                <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-stretch gap-4 p-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                        <Calendar className="h-3 w-3" />
                        <span>{post.date}</span>
                        {post.pinned && <span className="ml-2 inline-block rounded bg-yellow-100 text-yellow-800 px-2 py-0.5 text-[10px]">고정</span>}
                      </div>
                      <h3 className="text-base font-bold text-foreground mb-1 line-clamp-2">{post.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                    {/* 썸네일: 오른쪽 정사각형 */}
                    <div className="w-24 h-24 shrink-0 rounded-md overflow-hidden border">
                      <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
            {/* 인피니트 스크롤 센티넬 */}
            <div ref={loaderRef} className="h-1" />
          </div>
        </div>
      </section>
    </main>
  )
}

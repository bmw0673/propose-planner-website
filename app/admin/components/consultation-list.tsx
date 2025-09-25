"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type Item = { id: string; name: string; question: string; createdAt: string }

export default function ConsultationList() {
  const router = useRouter()
  const [items, setItems] = useState<Item[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setIsLoading(true)
      const res = await fetch('/api/consultations?unanswered=true')
      const data = await res.json()
      setItems(data.consultations || [])
      setIsLoading(false)
    }
    load()
  }, [])

  if (isLoading) return <div className="p-4 text-center text-muted-foreground">불러오는 중...</div>
  if (items.length === 0) return <div className="p-4 text-center text-muted-foreground">미답변 상담신청이 없습니다.</div>

  return (
    <div className="space-y-4">
      {items.map((c) => (
        <div key={c.id} className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2 bg-muted/50">
          <div>
            <div className="font-semibold">{c.name}</div>
            <div className="text-sm text-muted-foreground">{c.question}</div>
            <div className="text-xs text-muted-foreground">{c.createdAt}</div>
          </div>
          <button
            className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/80 transition"
            onClick={() => router.push(`/consultation/${c.id}`)}
          >
            답변 처리
          </button>
        </div>
      ))}
    </div>
  )
}

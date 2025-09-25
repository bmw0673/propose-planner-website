"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

interface Consultation {
  id: number
  name: string
  question: string
  createdAt: string
  answer: string | null
}

const mockConsultations: Consultation[] = [
  { id: 1, name: "홍길동", question: "웨딩 상담 신청합니다.", createdAt: "2024-06-01", answer: null },
  { id: 2, name: "김영희", question: "예식장 추천 부탁드려요.", createdAt: "2024-06-02", answer: null },
]

export default function ConsultationList() {
  const router = useRouter()
  const [consultations] = useState(mockConsultations)

  // 미답변만 필터링
  const unanswered = consultations.filter((c) => !c.answer)

  if (unanswered.length === 0) {
    return <div className="p-4 text-center text-muted-foreground">미답변 상담신청이 없습니다.</div>
  }

  return (
    <div className="space-y-4">
      {unanswered.map((c) => (
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

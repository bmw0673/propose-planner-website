"use client"

import { useState } from "react"
import NoticeEditor from "./notice-editor"

interface Notice {
  id: number
  title: string
  content: string
  createdAt: string
}

const mockNotices: Notice[] = [
  { id: 1, title: "6월 공지", content: "6월 이벤트 안내입니다.", createdAt: "2024-06-01" },
  { id: 2, title: "5월 공지", content: "5월 휴무 안내입니다.", createdAt: "2024-05-01" },
]

export default function NoticeManager() {
  const [notices, setNotices] = useState<Notice[]>(mockNotices)
  const [editing, setEditing] = useState<Notice | null>(null)
  const [isWriting, setIsWriting] = useState(false)

  const handleSave = (title: string, content: string) => {
    if (editing) {
      setNotices((prev) => prev.map((n) => n.id === editing.id ? { ...n, title, content } : n))
      setEditing(null)
    } else {
      setNotices((prev) => [
        { id: Date.now(), title, content, createdAt: new Date().toISOString().slice(0, 10) },
        ...prev,
      ])
    }
    setIsWriting(false)
  }

  const handleDelete = (id: number) => {
    setNotices((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">공지사항 관리</h2>
        <button
          className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/80 transition"
          onClick={() => { setIsWriting(true); setEditing(null) }}
        >
          새 공지 작성
        </button>
      </div>
      {(isWriting || editing) ? (
        <NoticeEditor
          initialTitle={editing?.title}
          initialContent={editing?.content}
          onSave={handleSave}
        />
      ) : null}
      <div className="space-y-4">
        {notices.length === 0 ? (
          <div className="text-center text-muted-foreground">등록된 공지사항이 없습니다.</div>
        ) : (
          notices.map((notice) => (
            <div key={notice.id} className="border rounded-lg p-4 bg-muted/50">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold">{notice.title}</div>
                  <div className="text-xs text-muted-foreground">{notice.createdAt}</div>
                </div>
                <div className="space-x-2">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => { setEditing(notice); setIsWriting(false) }}
                  >
                    수정
                  </button>
                  <button
                    className="text-destructive hover:underline"
                    onClick={() => handleDelete(notice.id)}
                  >
                    삭제
                  </button>
                </div>
              </div>
              <div className="mt-2 prose max-w-none" dangerouslySetInnerHTML={{ __html: notice.content }} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

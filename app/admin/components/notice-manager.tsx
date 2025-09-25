"use client"

import { useEffect, useState } from "react"
import NoticeEditor from "./notice-editor"

type Notice = { id: string; title: string; content: string; excerpt?: string; image?: string | null; pinned?: boolean; createdAt: string }

export default function NoticeManager() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [editing, setEditing] = useState<Notice | null>(null)
  const [isWriting, setIsWriting] = useState(false)

  const load = async () => {
    const res = await fetch(`/api/announcements?page=1&limit=50`)
    const data = await res.json()
    setNotices(
      (data.announcements || []).map((a: any) => ({ id: a.id, title: a.title, content: a.excerpt || '', createdAt: a.date, pinned: a.pinned }))
    )
  }

  useEffect(() => { load() }, [])

  const handleSave = async (title: string, content: string) => {
    if (editing) {
      await fetch('/api/announcements', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editing.id, title, content, excerpt: content.slice(0,120) }) })
      setEditing(null)
    } else {
      await fetch('/api/announcements', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title, content, excerpt: content.slice(0,120) }) })
    }
    setIsWriting(false)
    await load()
  }

  const handleDelete = async (id: string) => {
    await fetch(`/api/announcements?id=${id}`, { method: 'DELETE' })
    await load()
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
                  <div className="text-xs text-muted-foreground">{notice.createdAt}{notice.pinned ? ' · 고정' : ''}</div>
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

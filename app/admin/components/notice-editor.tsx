"use client"

import { useState } from "react"
import { uploadPublicImage } from "@/lib/supabase-upload"
import dynamic from "next/dynamic"

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })
import "react-quill/dist/quill.snow.css"

interface NoticeEditorProps {
  initialTitle?: string
  initialContent?: string
  onSave: (title: string, content: string) => void
}

export default function NoticeEditor({ initialTitle = "", initialContent = "", onSave }: NoticeEditorProps) {
  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent)
  const [uploading, setUploading] = useState(false)
  const [thumb, setThumb] = useState<string | null>(null)

  const handleThumbChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await uploadPublicImage(file, 'announcement-thumbs')
      setThumb(url)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <input
        className="w-full border rounded px-3 py-2 text-base"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <ReactQuill value={content} onChange={setContent} theme="snow" className="bg-white" />
      <div className="flex items-center gap-2">
        <input type="file" accept="image/*" onChange={handleThumbChange} />
        {uploading && <span className="text-xs text-muted-foreground">업로드 중...</span>}
        {thumb && <span className="text-xs text-muted-foreground">썸네일 설정됨</span>}
      </div>
      <button
        className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/80 transition"
        onClick={() => onSave(title, content)}
      >
        저장
      </button>
    </div>
  )
}

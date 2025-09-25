"use client"

import { useState } from "react"
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

  return (
    <div className="space-y-4">
      <input
        className="w-full border rounded px-3 py-2 text-base"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <ReactQuill value={content} onChange={setContent} theme="snow" className="bg-white" />
      <button
        className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/80 transition"
        onClick={() => onSave(title, content)}
      >
        저장
      </button>
    </div>
  )
}

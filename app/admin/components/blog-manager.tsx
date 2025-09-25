"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { uploadPublicImage } from "@/lib/supabase-upload"

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })
import "react-quill/dist/quill.snow.css"

type Post = { id: string; title: string; excerpt: string; image?: string | null; pinned?: boolean; date: string }

export default function BlogManager() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isWriting, setIsWriting] = useState(false)
  const [editing, setEditing] = useState<Post | null>(null)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [thumb, setThumb] = useState<string | null>(null)
  const [pinned, setPinned] = useState(false)
  const [published, setPublished] = useState(true)

  const load = async () => {
    const res = await fetch('/api/blog?page=1&limit=50')
    const data = await res.json()
    setPosts(data.posts || [])
  }
  useEffect(() => { load() }, [])

  const resetEditor = () => {
    setTitle("")
    setContent("")
    setThumb(null)
    setPinned(false)
    setPublished(true)
    setEditing(null)
    setIsWriting(false)
  }

  const handleSave = async () => {
    const payload = {
      id: editing?.id,
      title,
      content,
      excerpt: content.replace(/<[^>]+>/g, '').slice(0, 160),
      image: thumb,
      pinned,
      is_published: published,
    }
    if (editing) {
      await fetch('/api/blog', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    } else {
      await fetch('/api/blog', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    }
    await load(); resetEditor()
  }

  const handleDelete = async (id: string) => {
    await fetch(`/api/blog?id=${id}`, { method: 'DELETE' })
    await load()
  }

  const onThumbChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = await uploadPublicImage(file, 'blog-thumbs')
    setThumb(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">블로그 관리</h2>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded" onClick={() => setIsWriting(true)}>새 글 작성</button>
      </div>

      {(isWriting || editing) && (
        <div className="space-y-4 border rounded-lg p-4 bg-muted/50">
          <input className="w-full border rounded px-3 py-2" placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
          <ReactQuill value={content} onChange={setContent} theme="snow" className="bg-white" />
          <div className="flex items-center gap-2">
            <input type="file" accept="image/*" onChange={onThumbChange} />
            {thumb && <span className="text-xs text-muted-foreground">썸네일 설정됨</span>}
          </div>
          <div className="flex items-center gap-6 text-sm">
            <label className="flex items-center gap-2"><input type="checkbox" checked={pinned} onChange={(e)=>setPinned(e.target.checked)} /> 상단 고정</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={published} onChange={(e)=>setPublished(e.target.checked)} /> 공개</label>
          </div>
          <div className="flex gap-2 justify-end">
            <button className="px-4 py-2 rounded bg-muted" onClick={resetEditor}>취소</button>
            <button className="px-4 py-2 rounded bg-primary text-primary-foreground" onClick={handleSave}>저장</button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-center text-muted-foreground">등록된 블로그 글이 없습니다.</div>
        ) : posts.map((p) => (
          <div key={p.id} className="border rounded-lg p-4 flex items-center justify-between bg-muted/50">
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-16 h-16 overflow-hidden rounded border">
                <img src={p.image || '/placeholder.svg'} alt={p.title} className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0">
                <div className="text-xs text-muted-foreground">{p.date}{p.pinned ? ' · 고정' : ''}</div>
                <div className="font-semibold truncate max-w-[360px]">{p.title}</div>
                <div className="text-sm text-muted-foreground line-clamp-1">{p.excerpt}</div>
              </div>
            </div>
            <div className="shrink-0 space-x-2">
              <button className="text-blue-600 hover:underline" onClick={async () => {
                const res = await fetch(`/api/blog?id=${p.id}`)
                const d = await res.json()
                setEditing(p)
                setIsWriting(true)
                setTitle(d.title)
                setContent(d.content)
                setThumb(d.image || null)
                setPinned(!!d.pinned)
                setPublished(true)
              }}>수정</button>
              <button className="text-destructive hover:underline" onClick={() => handleDelete(p.id)}>삭제</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}



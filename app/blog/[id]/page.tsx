import Link from "next/link"
import { Calendar, ArrowLeft } from "lucide-react"
import { headers } from "next/headers"

async function getPost(id: string) {
  const hdrs = headers()
  const host = hdrs.get('host')
  const proto = hdrs.get('x-forwarded-proto') || 'http'
  const url = `${proto}://${host}/api/blog?id=${id}`
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) return null
  return res.json()
}

export default async function BlogDetailPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id)
  if (!post) {
    return (
      <main className="min-h-screen pt-16">
        <div className="max-w-3xl mx-auto px-4 py-12">포스트를 찾을 수 없습니다.</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen pt-16">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link href="/blog" className="inline-flex items-center text-sm text-muted-foreground mb-6">
          <ArrowLeft className="mr-1 h-4 w-4" /> 목록으로
        </Link>
        <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{post.date}</span>
        </div>
        <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
        <div className="rounded-lg overflow-hidden border mb-6">
          <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-64 object-cover" />
        </div>
        <p className="leading-relaxed text-foreground/90 whitespace-pre-wrap">{post.excerpt}\n\n(데모 콘텐츠) 본문 영역입니다. Supabase 연동 시 리치 텍스트/마크다운으로 대체하세요.</p>
      </div>
    </main>
  )
}



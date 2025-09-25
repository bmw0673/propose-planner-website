import { notFound } from "next/navigation"
import { headers } from "next/headers"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"

async function getAnnouncement(id: string) {
  const hdrs = headers()
  const host = hdrs.get('host')
  const proto = hdrs.get('x-forwarded-proto') || 'http'
  const url = `${proto}://${host}/api/announcements?id=${id}`
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) return null
  return res.json()
}

export default async function AnnouncementDetailPage({ params }: { params: { id: string } }) {
  const data = await getAnnouncement(params.id)
  if (!data) return notFound()

  return (
    <main className="min-h-screen pt-16">
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Calendar className="h-4 w-4" />
                <span>{data.date}</span>
                {data.pinned && <span className="ml-2 inline-block rounded bg-yellow-100 text-yellow-800 px-2 py-0.5 text-[10px]">고정</span>}
              </div>
              <CardTitle className="text-2xl font-bold text-foreground mb-2">{data.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg overflow-hidden border mb-6">
                <img src={data.image || "/placeholder.svg"} alt={data.title} className="w-full h-64 object-cover" />
              </div>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{data.content}</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}

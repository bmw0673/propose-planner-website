import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Pin } from "lucide-react"

// 임시 데이터 (실제 서비스에서는 API 또는 DB에서 fetch)
const announcements = [
  {
    id: 1,
    title: "2024년 봄 시즌 프로포즈 패키지 출시",
    content:
      "벚꽃이 만개하는 봄을 맞아 특별한 봄 시즌 프로포즈 패키지를 출시합니다. 여의도 한강공원, 석촌호수, 남산 등 서울의 대표적인 벚꽃 명소에서 진행되는 로맨틱한 프로포즈를 경험해보세요.",
    date: "2024.03.01",
    type: "신규 서비스",
    pinned: true,
  },
  // ... 나머지 공지 데이터 동일하게 복사 ...
]

interface AnnouncementDetailPageProps {
  params: { id: string }
}

export default function AnnouncementDetailPage({ params }: AnnouncementDetailPageProps) {
  const announcement = announcements.find((a) => String(a.id) === params.id)
  if (!announcement) return notFound()

  return (
    <main className="min-h-screen pt-16">
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3 mb-3">
                {announcement.pinned && <Pin className="h-4 w-4 text-accent" />}
                <Badge>{announcement.type}</Badge>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{announcement.date}</span>
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-foreground mb-2">{announcement.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{announcement.content}</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}

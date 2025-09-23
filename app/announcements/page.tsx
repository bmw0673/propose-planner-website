import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Pin } from "lucide-react"

export default function AnnouncementsPage() {
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
    {
      id: 2,
      title: "고객 만족도 조사 결과 발표",
      content:
        "2023년 한 해 동안 저희 서비스를 이용해주신 고객님들의 만족도 조사 결과를 발표합니다. 전체 만족도 98.5%라는 놀라운 결과를 얻었으며, 앞으로도 더욱 완벽한 서비스를 위해 노력하겠습니다.",
      date: "2024.02.15",
      type: "공지사항",
    },
    {
      id: 3,
      title: "설 연휴 운영 안내",
      content:
        "설 연휴 기간(2월 9일~12일) 동안의 운영 안내를 드립니다. 연휴 기간 중에는 전화 상담이 제한되며, 이메일 문의는 연휴 후 순차적으로 답변드리겠습니다. 응급 상황 시에는 카카오톡 채널을 이용해주세요.",
      date: "2024.02.05",
      type: "운영 안내",
    },
    {
      id: 4,
      title: "프리미엄 패키지 가격 조정 안내",
      content:
        "2024년 3월 1일부터 일부 프리미엄 패키지의 가격이 조정됩니다. 인플레이션과 파트너사 비용 상승으로 인한 불가피한 조치임을 양해 부탁드립니다. 기존 예약 고객님들은 기존 가격이 적용됩니다.",
      date: "2024.01.20",
      type: "가격 안내",
    },
    {
      id: 5,
      title: "겨울 시즌 특별 이벤트 종료",
      content:
        "지난 12월부터 진행된 겨울 시즌 특별 이벤트가 성황리에 종료되었습니다. 많은 관심과 참여를 보여주신 고객님들께 감사드리며, 곧 봄 시즌 이벤트로 찾아뵙겠습니다.",
      date: "2024.01.15",
      type: "이벤트",
    },
    {
      id: 6,
      title: "새로운 파트너사 추가",
      content:
        "더욱 다양하고 완벽한 서비스 제공을 위해 새로운 파트너사들과 협력을 시작합니다. 프리미엄 플로리스트, 전문 사진작가, 고급 레스토랑 등과의 파트너십을 통해 한층 업그레이드된 서비스를 경험하실 수 있습니다.",
      date: "2024.01.10",
      type: "파트너십",
    },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "신규 서비스":
        return "bg-green-100 text-green-800"
      case "공지사항":
        return "bg-blue-100 text-blue-800"
      case "운영 안내":
        return "bg-yellow-100 text-yellow-800"
      case "가격 안내":
        return "bg-red-100 text-red-800"
      case "이벤트":
        return "bg-purple-100 text-purple-800"
      case "파트너십":
        return "bg-indigo-100 text-indigo-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="section-title font-bold text-foreground mb-6">공지사항</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            OOO 플래너의 최신 소식과 중요한 안내사항을 확인하세요.
          </p>
        </div>
      </section>

      {/* Announcements */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {announcements.map((announcement) => (
              <Card key={announcement.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        {announcement.pinned && <Pin className="h-4 w-4 text-accent" />}
                        <Badge className={getTypeColor(announcement.type)}>{announcement.type}</Badge>
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{announcement.date}</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl font-bold text-foreground">{announcement.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{announcement.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground">더 이상 공지사항이 없습니다.</p>
          </div>
        </div>
      </section>
    </main>
  )
}

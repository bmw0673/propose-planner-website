import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star } from "lucide-react"

// 임시 데이터 (실제 서비스에서는 API 또는 DB에서 fetch)
const services = [
  {
    id: 1,
    title: "호텔 프로포즈 패키지",
    price: "300만원부터",
    duration: "2-3시간",
    participants: "2-10명",
    rating: 4.9,
    image: "/luxury-hotel-proposal-setup.jpg",
    description: "서울 최고급 호텔에서 진행되는 프리미엄 프로포즈 패키지입니다.",
    features: [
      "5성급 호텔 스위트룸 예약",
      "전문 플로리스트 꽃 장식",
      "프라이빗 디너 세팅",
      "전문 사진작가 촬영",
      "기념품 제작",
    ],
    popular: true,
  },
  // ... 나머지 서비스 데이터 동일하게 복사 ...
]

interface ServiceDetailPageProps {
  params: { id: string }
}

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const service = services.find((s) => String(s.id) === params.id)
  if (!service) return notFound()

  return (
    <main className="min-h-screen pt-16">
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden">
            <div className="relative">
              <img
                src={service.image || "/placeholder.svg"}
                alt={service.title}
                className="w-full h-72 object-cover"
              />
              {service.popular && (
                <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">인기</Badge>
              )}
              <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">{service.rating}</span>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{service.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{service.participants}</span>
                </div>
                <div className="text-lg font-bold text-accent">{service.price}</div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 leading-relaxed">{service.description}</p>
              <div className="space-y-2 mb-6">
                <h4 className="font-medium text-foreground">포함 서비스:</h4>
                <ul className="space-y-1">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-center">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}

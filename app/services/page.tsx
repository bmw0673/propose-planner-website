import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star, ArrowRight } from "lucide-react"

export default function ServicesPage() {
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
    {
      id: 2,
      title: "야외 로맨틱 프로포즈",
      price: "200만원부터",
      duration: "1-2시간",
      participants: "2-6명",
      rating: 4.8,
      image: "/outdoor-romantic-proposal-sunset.jpg",
      description: "한강공원, 남산타워 등 서울의 아름다운 야외 공간에서의 프로포즈입니다.",
      features: [
        "로케이션 섭외 및 허가",
        "날씨 대비 플랜 B",
        "조명 및 음향 설치",
        "드론 촬영 (옵션)",
        "이동 차량 제공",
      ],
    },
    {
      id: 3,
      title: "서프라이즈 홈 프로포즈",
      price: "150만원부터",
      duration: "3-4시간",
      participants: "2-4명",
      rating: 4.7,
      image: "/home-surprise-proposal-decoration.jpg",
      description: "집이나 의미 있는 장소에서 진행하는 아늑하고 개인적인 프로포즈입니다.",
      features: [
        "공간 데코레이션",
        "맞춤형 영상 제작",
        "가족/친구 서프라이즈 연출",
        "홈 셰프 서비스",
        "추억 전시 구성",
      ],
    },
    {
      id: 4,
      title: "테마파크 프로포즈",
      price: "250만원부터",
      duration: "하루 종일",
      participants: "2-8명",
      rating: 4.6,
      image: "/theme-park-proposal-fireworks.jpg",
      description: "롯데월드, 에버랜드 등에서 진행하는 동화 같은 프로포즈입니다.",
      features: [
        "파크 내 특별 공간 예약",
        "캐릭터 등장 연출",
        "불꽃놀이 타이밍 조율",
        "기념품 맞춤 제작",
        "VIP 투어 서비스",
      ],
    },
    {
      id: 5,
      title: "문화공간 프로포즈",
      price: "180만원부터",
      duration: "2-3시간",
      participants: "2-6명",
      rating: 4.8,
      image: "/museum-gallery-proposal-art.jpg",
      description: "미술관, 박물관, 콘서트홀 등 문화공간에서의 세련된 프로포즈입니다.",
      features: ["문화공간 대관", "아티스트 협업", "클래식 연주 (옵션)", "전시 연계 기획", "문화적 의미 부여"],
    },
    {
      id: 6,
      title: "여행지 프로포즈",
      price: "500만원부터",
      duration: "2-3일",
      participants: "2명",
      rating: 4.9,
      image: "/travel-destination-proposal-beach-sunset.jpg",
      description: "제주도, 부산 등 국내 여행지나 해외에서 진행하는 프로포즈입니다.",
      features: ["여행 일정 기획", "현지 파트너 협력", "숙박 및 교통 예약", "현지 촬영팀", "기념 여행 앨범"],
    },
  ]

  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="section-title font-bold text-foreground mb-6">프로포즈 서비스</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            당신의 이야기와 꿈을 현실로 만들어드리는 다양한 프로포즈 패키지를 준비했습니다. 각 패키지는 완전 맞춤형으로
            조정 가능합니다.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service) => (
              <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="w-full h-64 object-cover"
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
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <div className="text-right">
                      <div className="text-lg font-bold text-accent">{service.price}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{service.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{service.participants}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{service.description}</p>

                  <div className="space-y-2 mb-6">
                    <h4 className="font-medium text-foreground">포함 서비스:</h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-center">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex space-x-3">
                    <Button className="flex-1">
                      상담 문의
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="outline">자세히 보기</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">원하는 패키지가 없으신가요?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            모든 프로포즈는 100% 맞춤형으로 기획됩니다. 당신만의 특별한 아이디어를 들려주세요.
          </p>
          <Button size="lg" className="text-lg px-8 py-6">
            맞춤 상담 받기
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </main>
  )
}

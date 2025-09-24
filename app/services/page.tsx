import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
// 👇 Info 아이콘을 추가로 import 합니다.
import { Clock, FileText, ArrowRight, Info } from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
  const services = [
    {
      id: 1,
      title: "영화관 프로포즈 패키지",
      duration: "15~20분",
      image: "/80431233441914189_1822713256.jpg",
      description: "오직 두 분만을 위한 영화관 전체 대관 프로포즈입니다.",
      href: "https://smartstore.naver.com/1566266/products/11106349954",
      popular: true,
    },
    {
      id: 2,
      title: "롯데월드타워 123F 프로포즈",
      duration: "1-2시간",
      image: "/110526258964377809_529172600.jpg",
      href: "https://smartstore.naver.com/1566266/products/10021688360",
      description: "롯데월드타워 123층, 서울스카이에서의 특별한 프로포즈입니다.",
    },
    {
      id: 3,
      title: "전시장 이벤트 프로포즈",
      duration: "30~60분",
      image: "/4838943748061728_1848007784.jpg",
      href: "https://smartstore.naver.com/1566266/products/11162716407",
      description: "갤러리나 전시회 공간을 활용한 프라이빗하고 감성적인 이벤트입니다.",
    },
    {
      id: 4,
      title: "한강요트 프로포즈 패키지",
      duration: "20~30분",
      image: "/109550563435196634_641323583.jpg",
      href: "https://smartstore.naver.com/1566266/products/9976387728",
      description: "둘만의 프라이빗 크루즈에서 즐기는 로맨틱한 프로포즈입니다.",
    }
  ]

  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="section-title font-bold text-foreground mb-6">프로포즈</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            당신의 이야기와 꿈을 현실로 만들어드리는 다양한 프로포즈 패키지를 준비했습니다.<br /> 각 패키지는 맞춤형으로
            조정 가능합니다.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* 👇 요청하신 안내 문구를 여기에 추가했습니다. */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full bg-secondary text-secondary-foreground py-2 px-4 text-sm">
              <Info className="h-5 w-5 mr-2" />
              <p>아래 프로포즈 상품클릭시 '서울요트'의 네이버 스마트스토어로 연결됩니다.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
                <div className="relative">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="w-full aspect-square object-cover"
                  />
                  {service.popular && (
                    <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">인기</Badge>
                  )}
                </div>

                <CardHeader className="flex-grow">
                  <CardTitle className="text-xl mb-3">{service.title}</CardTitle>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span>{service.duration}</span>
                    </div>
                    <div className="flex items-start">
                      <FileText className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{service.description}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="flex space-x-3">
                    <Button className="flex-1 cursor-pointer">
                      상담 문의
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                    {/* 👇 '자세히 보기' 버튼의 Link를 수정했습니다. */}
                    <Link href={service.href} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button variant="outline" className="w-full cursor-pointer">자세히 보기</Button>
                    </Link>

                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
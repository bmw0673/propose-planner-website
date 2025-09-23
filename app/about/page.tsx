import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Award, Users, Clock } from "lucide-react"

export default function AboutPage() {
  const achievements = [
    { icon: Heart, label: "성공한 프로포즈", value: "100+" },
    { icon: Award, label: "전문 경력", value: "5년" },
    { icon: Users, label: "만족한 커플", value: "200+" },
    { icon: Clock, label: "평균 준비기간", value: "2주" },
  ]

  const values = [
    {
      title: "진정성",
      description: "각 커플의 고유한 이야기와 감정을 진심으로 이해하고 반영합니다.",
    },
    {
      title: "완벽함",
      description: "작은 디테일까지 놓치지 않는 완벽한 기획과 실행을 추구합니다.",
    },
    {
      title: "신뢰성",
      description: "약속한 것은 반드시 지키며, 투명하고 정직한 소통을 합니다.",
    },
  ]

  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="section-title font-bold text-foreground mb-6">안녕하세요, 김은아 플래너입니다</h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            저는 사랑하는 두 사람의 특별한 순간을 만들어가는 일에 깊은 보람과 책임감을 느끼는 프로포즈 전문
            플래너입니다.
          </p>
          <div className="w-32 h-32 bg-muted rounded-full mx-auto mb-8" />
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-foreground mb-8">최고의 순간을 경험한 사람이 최고의 순간을 만듭니다.</h2>

            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
               호텔리어로서는 섬세한 디테일을, 놀이동산 공연 감독으로서는 상상을 현실로 만드는 기획력을 익혔습니다.<br />
               늘 사람들에게 잊지 못할 '순간'을 선물하는 것이 저의 일이었습니다.
              </p>

              <p>
                그러던 어느 날, 남편에게 받은 프로포즈는 제 인생의 방향을 바꾸는 최고의 순간이 되었습니다.<br />
                제가 느낀 벅찬 행복을 다른 분들께도 온전히 선물하고 싶다는 새로운 사명이 생긴 것입니다.
              </p>

              <p>
                이후 수많은 커플들의 프로포즈를 도우며 쌓은 노하우를 더 체계적으로 나누고자 이 웹사이트를 열었습니다.<br />
                호텔의 디테일, 공연의 연출력, 그리고 사랑의 감동을 직접 경험한 사람으로서<br />
                두 분의 이야기가 가장 빛나는 순간을 디자인해 드리겠습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">함께한 성과</h2>

          <div className="grid md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <achievement.icon className="h-8 w-8 text-accent" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">{achievement.value}</div>
                  <div className="text-sm text-muted-foreground">{achievement.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">나의 가치관</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-8 text-center">
                <CardContent>
                  <h3 className="text-xl font-bold text-foreground mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Affiliation Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            소속
          </h2>

          <Card className="p-8 md:p-10">
            <div className="space-y-8">
              {/* 수정된 부분: md:text-lg 클래스를 제거하여 원래 글자 크기로 복원 */}
              <p className="text-muted-foreground leading-relaxed text-left">
                저는 현재{' '}
                <a
                  href="https://smartstore.naver.com/1566266"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-foreground hover:underline transition-colors"
                >
                  서울요트
                </a>{' '}
                소속 프로포즈 디렉터로 활동하며, 최고의 순간을 만들어드리고 있습니다.
              </p>
              <p className="text-muted-foreground leading-relaxed text-left">
                서울요트는 단순한 요트 업체가 아닌, 프로포즈 전문가 집단입니다. 이벤트
                기획부터 실행까지 책임지는{' '}
                <strong className="font-semibold text-foreground">'사랑 그리기' 팀</strong>이
                상주하여, 요트 위에서의 모든 순간이 드라마처럼 펼쳐지도록 완벽하게
                연출합니다.
              </p>
              <p className="text-muted-foreground leading-relaxed text-left">
                또한, 플라워 디자인 스튜디오{' '}
                <strong className="font-semibold text-foreground">
                  '플라워썸(Flowersome)'
                </strong>
                을 직접 운영하는 것이 가장 큰 강점입니다. 이를 통해 고객이 꿈꾸는
                분위기와 스타일에 맞춰 가장 신선하고 아름다운 꽃으로 공간을 디자인할
                수 있으며, 세상에 단 하나뿐인 부케 제작도 가능합니다. 이 모든
                전문가들이 오직 두 분의 프로포즈를 위해 함께하기에, 차원이 다른 감동과
                만족을 선사할 것을 약속드립니다.
              </p>
            </div>
          </Card>
        </div>
      </section>
    </main>
  )
}

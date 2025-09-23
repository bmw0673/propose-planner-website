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
          <h1 className="section-title font-bold text-foreground mb-6">안녕하세요, OOO 플래너입니다</h1>
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
            <h2 className="text-3xl font-bold text-foreground mb-8">나의 이야기</h2>

            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                5년 전, 친구의 프로포즈를 도와주면서 시작된 이 일은 이제 제 인생의 가장 소중한 사명이 되었습니다. 그
                순간 두 사람의 눈에서 흘러내린 감동의 눈물을 보며, 저는 이 일이 단순한 이벤트 기획이 아닌 '사랑의 역사를
                만드는 일'임을 깨달았습니다.
              </p>

              <p>
                지금까지 100여 쌍의 커플과 함께 특별한 순간을 만들어왔습니다. 각각의 프로포즈는 모두 달랐지만, 공통점이
                있었습니다. 바로 '진심'이었습니다. 진심으로 사랑하는 마음, 진심으로 행복하게 해주고 싶은 마음, 그리고 그
                진심을 완벽하게 전달하고 싶은 마음 말입니다.
              </p>

              <p>
                저는 단순히 화려한 이벤트를 만드는 것이 아닙니다. 두 사람만의 특별한 이야기를 찾아내고, 그 이야기가 가장
                아름답게 표현될 수 있는 순간을 디자인합니다. 때로는 소박하지만 깊은 감동을, 때로는 웅장하고 드라마틱한
                순간을 만들어내며 각 커플에게 가장 완벽한 프로포즈를 선사합니다.
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
                <CardContent className="pt-6">
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8">소속 및 자격</h2>

          <Card className="p-8">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  <Badge variant="secondary">한국이벤트기획협회 정회원</Badge>
                  <Badge variant="secondary">웨딩플래너 자격증</Badge>
                  <Badge variant="secondary">이벤트기획사 2급</Badge>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  현재 서울 강남구에 위치한 프리미엄 이벤트 기획사 '로맨틱 모먼츠'의 수석 플래너로 활동하고 있으며, 개인
                  브랜드 'OOO 플래너'를 통해 더욱 세심하고 개인화된 프로포즈 서비스를 제공하고 있습니다.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}

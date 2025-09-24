import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Star, Users } from "lucide-react"
import Link from 'next/link';

export function FeaturedSection() {
  const features = [
    {
      icon: Heart,
      title: "맞춤형 기획",
      description: "커플의 특별한 이야기와 취향을 반영한 완전 맞춤형 프로포즈를 기획합니다.",
    },
    {
      icon: Star,
      title: "프리미엄 서비스",
      description: "최고급 장소부터 세심한 디테일까지, 완벽한 순간을 위한 프리미엄 서비스를 제공합니다.",
    },
    {
      icon: Users,
      title: "전문 팀",
      description: "5년 이상의 경험을 가진 전문 플래너와 파트너들이 함께합니다.",
    },
  ]

  const recentPosts = [
    {
      title: "서울 최고의 프로포즈 장소 TOP 10",
      excerpt: "로맨틱한 분위기와 특별함을 동시에 만족시키는 서울의 프로포즈 명소들을 소개합니다.",
      date: "2024.03.15",
    },
    {
      title: "계절별 프로포즈 아이디어",
      excerpt: "봄, 여름, 가을, 겨울 각 계절의 매력을 살린 프로포즈 아이디어를 제안합니다.",
      date: "2024.03.10",
    },
    {
      title: "프로포즈 준비 체크리스트",
      excerpt: "완벽한 프로포즈를 위해 놓치지 말아야 할 준비사항들을 정리했습니다.",
      date: "2024.03.05",
    },
  ]

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Features */}
        <div className="text-center mb-16">
          <h2 className="section-title font-bold text-foreground mb-6">왜 김은아 플래너를 선택해야 할까요?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            수많은 커플들의 특별한 순간을 만들어온 경험과 노하우로 당신만의 완벽한 프로포즈를 선사합니다.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {features.map((feature, index) => (
            <Card key={index} className="text-center p-8 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Blog Posts */}
        <div className="text-center mb-12">
          <h2 className="section-title font-bold text-foreground mb-6">최신 블로그 포스트</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            프로포즈 준비에 도움이 되는 유용한 정보와 아이디어를 공유합니다.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {recentPosts.map((post, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="text-sm text-accent font-medium mb-2">{post.date}</div>
                <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-2">{post.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                <Button variant="ghost" size="sm" className="p-0 h-auto cursor-pointer">
                  더 읽기 <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/blog">
            <Button
              size="lg"
              className="text-lg px-8 py-6 cursor-pointer"
              type="button"
            >
              모든 블로그 포스트 보기
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

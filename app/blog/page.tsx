import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, Search, ArrowRight } from "lucide-react"

export default function BlogPage() {
  const categories = ["전체", "프로포즈 팁", "장소 추천", "계절별 아이디어", "준비 가이드", "성공 사례"]

  const posts = [
    {
      id: 1,
      title: "서울 최고의 프로포즈 장소 TOP 10",
      excerpt:
        "로맨틱한 분위기와 특별함을 동시에 만족시키는 서울의 프로포즈 명소들을 소개합니다. 각 장소별 특징과 예약 방법, 주의사항까지 상세히 안내드립니다.",
      category: "장소 추천",
      date: "2024.03.15",
      readTime: "5분",
      image: "/seoul-romantic-proposal-locations.jpg",
      featured: true,
    },
    {
      id: 2,
      title: "계절별 프로포즈 아이디어 - 봄편",
      excerpt:
        "벚꽃이 만개하는 봄, 가장 로맨틱한 계절에 어울리는 프로포즈 아이디어를 제안합니다. 꽃과 함께하는 특별한 순간을 만들어보세요.",
      category: "계절별 아이디어",
      date: "2024.03.10",
      readTime: "4분",
      image: "/spring-cherry-blossom-proposal.jpg",
    },
    {
      id: 3,
      title: "프로포즈 준비 체크리스트",
      excerpt:
        "완벽한 프로포즈를 위해 놓치지 말아야 할 준비사항들을 정리했습니다. 3개월 전부터 당일까지의 상세한 체크리스트를 제공합니다.",
      category: "준비 가이드",
      date: "2024.03.05",
      readTime: "7분",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      title: "예산별 프로포즈 기획하기",
      excerpt:
        "100만원부터 1000만원까지, 예산에 따른 프로포즈 기획 방법을 알려드립니다. 적은 예산으로도 감동적인 프로포즈가 가능합니다.",
      category: "준비 가이드",
      date: "2024.02.28",
      readTime: "6분",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 5,
      title: "성공 사례: 한강에서의 서프라이즈 프로포즈",
      excerpt:
        "실제 고객의 한강 프로포즈 성공 사례를 공유합니다. 기획부터 실행까지의 전 과정과 고객의 생생한 후기를 만나보세요.",
      category: "성공 사례",
      date: "2024.02.20",
      readTime: "8분",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 6,
      title: "프로포즈 반지 선택 가이드",
      excerpt:
        "프로포즈의 핵심인 반지 선택에 대한 모든 것을 알려드립니다. 다이아몬드 4C부터 사이즈 측정까지 완벽 가이드입니다.",
      category: "프로포즈 팁",
      date: "2024.02.15",
      readTime: "10분",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="section-title font-bold text-foreground mb-6">프로포즈 블로그</h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            완벽한 프로포즈를 위한 유용한 정보와 아이디어, 그리고 실제 성공 사례들을 공유합니다.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">추천 포스트</h2>
            <p className="text-muted-foreground">가장 인기 있는 블로그 포스트를 확인해보세요.</p>
          </div>

          {posts
            .filter((post) => post.featured)
            .map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <CardHeader>
                      <div className="flex items-center space-x-4 mb-2">
                        <Badge variant="secondary">{post.category}</Badge>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-3">{post.title}</h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-6 leading-relaxed">{post.excerpt}</p>
                      <Button>
                        자세히 읽기
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </section>

      {/* All Posts */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">모든 포스트</h2>
            <p className="text-muted-foreground">프로포즈 준비에 도움이 되는 다양한 정보들을 확인해보세요.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts
              .filter((post) => !post.featured)
              .map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-48 object-cover" />
                  <CardHeader>
                    <div className="flex items-center space-x-4 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {post.category}
                      </Badge>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">{post.title}</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 text-sm line-clamp-3 leading-relaxed">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="p-0 h-auto">
                        읽기 <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              더 많은 포스트 보기
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Header } from "@/components/header"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "OOO 프로포즈 플래너 - 특별한 순간을 위한 완벽한 기획",
  description:
    "서울에서 가장 특별한 프로포즈를 만들어드립니다. 맞춤형 프로포즈 기획부터 실행까지, 당신만의 완벽한 순간을 위해.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          {children}
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}

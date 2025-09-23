"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const schema = z.object({
  email: z.string().email({ message: "이메일 형식이 올바르지 않습니다." }),
  password: z.string().min(6, { message: "비밀번호는 6자 이상이어야 합니다." }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["confirmPassword"]
})

type RegisterForm = z.infer<typeof schema>

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegisterForm>({
    resolver: zodResolver(schema)
  })

  const onSubmit = async (data: RegisterForm) => {
    // TODO: 실제 회원가입 처리
    alert(JSON.stringify(data))
  }

  return (
    <main className="min-h-screen flex items-center justify-center pt-16">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>회원가입</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Input
                type="email"
                placeholder="이메일"
                {...register("email")}
                autoComplete="email"
                disabled={isSubmitting}
              />
              {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <Input
                type="password"
                placeholder="비밀번호"
                {...register("password")}
                autoComplete="new-password"
                disabled={isSubmitting}
              />
              {errors.password && <p className="text-destructive text-sm mt-1">{errors.password.message}</p>}
            </div>
            <div>
              <Input
                type="password"
                placeholder="비밀번호 확인"
                {...register("confirmPassword")}
                autoComplete="new-password"
                disabled={isSubmitting}
              />
              {errors.confirmPassword && <p className="text-destructive text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              회원가입
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}

import { LoginForm } from "@/components/login-form"

export default function SignUpPage() {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-10">
      </div>
      <div className="flex w-full max-w-sm flex-col gap-6 z-10">
        <LoginForm/>
      </div>
    </div>
  )
}

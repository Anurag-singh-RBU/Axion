import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { SignUpForm } from "../../../components/signup-form";

export function ButtonDefault() {
  return <Button>  Button</Button>
}


export default function SignUpCard() {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-10">
      </div>
      <div className="flex w-full max-w-sm flex-col gap-6 z-10">
        <a href="/sign-in">
      <Button className="flex w-22 items-center gap-3 px-5 py-2 rounded-full bg-white shadow-sm hover:bg-white hover:text-gray-800">
      <span className="flex items-center justify-center w-4 h-4 bg-gray-400 rounded-full">
  <ChevronLeft className="w-10 h-10 text-white" />
</span>
  <span className="text-gray-800 font-FT font-semibold uppercase tracking-wide">
    BACK
  </span>
</Button>
</a>
        <SignUpForm/>
      </div>
    </div>
  )
}

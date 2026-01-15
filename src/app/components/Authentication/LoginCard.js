import { LoginForm } from "@/components/login-form";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export function ButtonDefault() {
  return <Button>Button</Button>;
}

export default function LoginPage() {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 overflow-hidden">
      <div className="absolute inset-0 z-10"></div>
      <div className="flex max-w-sm flex-col gap-3 z-10">
        <div>
          <Button className="flex w-22 items-center gap-2 py-2 rounded-full bg-white shadow-xs hover:bg-white hover:text-gray-800 cursor-pointer">
            <span className="flex items-center justify-center w-4 h-4 bg-gray-400 rounded-full">
              <ChevronLeft className="w-10 h-10 text-white"/>
            </span>
            <Link href="/" passHref>
              <span className="text-gray-800 font-FT font-semibold uppercase tracking-wide">
                BACK
              </span>
            </Link>
          </Button>
        </div>
        <LoginForm/>
      </div>
    </div>
  );
}

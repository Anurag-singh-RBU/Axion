import SignUpCard from '../../components/Authentication/SignUpCard'
import { getCurrent } from "@/app/(auth)/actions";
import { redirect } from "next/navigation";

export default async function SignUpPage() {

  return (
    <div>
      <SignUpCard/>
    </div>
  )
}
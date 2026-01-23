import SignUpCard from '../../components/Authentication/SignUpCard'
import { getCurrent } from "@/app/(auth)/actions";
import { redirect } from "next/navigation";

export default async function SignUpPage() {

  const user = await getCurrent();

  if(!user) redirect("/sign-in");

  return (
    <div>
      <SignUpCard/>
    </div>
  )
}
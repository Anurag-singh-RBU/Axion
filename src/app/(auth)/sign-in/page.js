import React from 'react'
import LoginPage from '../../components/Authentication/LoginCard'
import { getCurrent } from "@/app/(auth)/actions";
import { redirect } from "next/navigation";

const SignInPage = async () => {

  const user = await getCurrent();

  if(user) redirect("/dashboard");

  return (
    <div>
      <LoginPage></LoginPage>
    </div>
  )
}

export default SignInPage
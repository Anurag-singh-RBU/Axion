"use client"

import Landing from "./components/landing/Landing";
import { useCurrent } from "@/hooks/use-current";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

  const { data , isLoading } = useCurrent();
  const router = useRouter();

  useEffect(() => {

    if(isLoading) return;

    if(!data){

      router.push("/sign-in");

    };

  } , [data , isLoading , router]);

  return (
    <section>

      <Landing/>

    </section>
  );
}

"use client"

import Landing from "./components/landing/Landing";
import { useCurrent } from "@/hooks/use-current";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import CubeLoader from "../components/cube-loader";

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

      {isLoading ? (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, background: "white" }}>
          <CubeLoader></CubeLoader>
        </div>
      ) : (
        <Landing/>
      )}

    </section>
  );
}

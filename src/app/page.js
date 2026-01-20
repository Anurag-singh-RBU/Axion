"use client"

import Landing from "./components/landing/Landing";
import { useCurrent } from "@/hooks/use-current";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import CubeLoader from "../components/cube-loader";
import { useLogout } from "../hooks/use-logout";
import { UserBtn } from "../components/userBtn";

export default function Home() {

  const { mutate } = useLogout();
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
      // <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", padding: "1rem" }}>
      //   <button onClick={() => mutate()} className="bg-zinc-900 text-white px-5 py-2 rounded-lg border-none cursor-pointer text-base">
      //     Logout
      //   </button>
      //   <Landing/>
      // </div>
      <UserBtn></UserBtn>
      )}

    </section>
  );
}

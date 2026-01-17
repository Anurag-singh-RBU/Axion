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

      {isLoading ? (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, background: "rgba(255,255,255,0.8)" }}>
          <div className="loader" aria-label="Loading"/>
          <style>
            {`.loader { border: 4px solid #e0e0e0; border-top: 4px solid #0070f3; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; } @keyframes spin { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);}}`}
          </style>
        </div>
      ) : (
        <Landing/>
      )}

    </section>
  );
}

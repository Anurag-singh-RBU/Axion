// "use client";

// import { useEffect } from "react";
// import { useSound } from "@/hooks/use-sound";
// import { click004Sound } from "../lib/click-004";

// export default function SoundProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const play = useSound(click004Sound);

//   useEffect(() => {
//     const handleClick = () => {
//       if (typeof play === "function") {
//         play();
//       }
//     };

//     document.addEventListener("click", handleClick);

//     return () => {
//       document.removeEventListener("click", handleClick);
//     };
//   }, [play]);

//   return <>{children}</>;
// }
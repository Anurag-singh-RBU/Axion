
import Link from "next/link";
import { Package, Zap, CheckCircle, Cpu, Bot, Feather } from "lucide-react";
import AnimatedGenerateButton from "../../../components/FreeNos"

const Hero = () => {
  const features = [
    { icon: Package, label: 'Free and\nopen-source' },
    { icon: Zap, label: 'Easy\nto use' },
    { icon: CheckCircle, label: 'Production\nready' },
    { icon: Cpu, label: 'Hybrid\nengine' },
    { icon: Bot, label: 'Robot\nfriendly' },
    { icon: Feather, label: 'Tiny\nfootprint' },
  ];

  return (
    <div className="landing-content font-FT">
      <div className="landing-gradient-blur" aria-hidden="true"/>

      <div className="hero-main-content sm:-mt-100 -mt-35 overflow-x-hidden ">
        <div className="hero-tag-fade">

          <Link href="/tools" className="hero-new-badge-container max-w-full">
            <AnimatedGenerateButton
              labelIdle="Free and Open Source"
              labelActive="Building"
              highlightHueDeg={5000}/>
          </Link>
        </div>

        <h1 className="landing-title sm:tracking-normal! tracking-normal!">
          <span className="hero-text-animate mb-2">Tasks Operations</span>
          <br/>
          <span className="hero-text-animate hero-text-animate-delay whitespace-nowrap">
            For Dedicated Developers
          </span>
        </h1>

        <p className="landing-subtitle hero-text-animate hero-subtitle-delay font-HG">
          Powerful project management platform that helps your teams work truly stand out
        </p>

        <div className="hero-button-delay flex gap-4 opacity-100 z-10">
            <button className="block [font-family:var(--font-geist-sans)] px-4 py-2 text-center bg-brand-blue rounded-lg text-sm font-medium text-white [text-shadow:0px_1px_1px_rgba(0,0,0,0.16)] shadow-[0px_1px_4px_-1px_rgba(30,31,37,0.38)] bg-[#5227FF] hover:bg-[#196ae3] cursor-pointer transition-background duration-150 ease-in-out">
              Get Started
            </button>
            <button className="justify-center gap-2 whitespace-nowrap disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 has-[>svg]:px-3 flex items-center cursor-pointer [font-family:var(--font-geist-sans)] gap-x-1.5 rounded-lg py-2 text-sm font-medium hover:bg-gray-50 transition-colors duration-150 ease-in-out">
              Learn More
            </button>
        </div>
      </div>
    </div>
  );
};



export default Hero;
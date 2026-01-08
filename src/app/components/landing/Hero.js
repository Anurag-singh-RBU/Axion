import Link from "next/link";
import { ArrowRight, Package, Zap, CheckCircle, Cpu, Bot, Feather } from "lucide-react";
import { SparklesIcon } from "@/components/ui/sparkles";

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
            <span className="flex tracking-wider hero-new-badge font-HG justify-center items-center">
              Free <SparklesIcon size={16}></SparklesIcon>
            </span>

            <div className="hero-new-badge-text">
              <span>Open Source</span>
              <ArrowRight size={16}/>
            </div>
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

        {/* <div className="mt-8 hero-features-container w-full md:z-auto z-20">
          <div className="grid grid-cols-3 md:flex md:flex-wrap md:justify-center gap-8 lg:gap-12 py-8 px-6 bg-transparent rounded-3xl max-w-6xl mx-auto place-items-center md:place-items-stretch">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-105 w-24">
                  <div className="p-3 rounded-xl hover:scale-110 transition-transform flex-shrink-0">
                    <Icon size={28} strokeWidth={1.5} className="text-white" />
                  </div>
                  <p className="text-sm text-center font-medium whitespace-pre-line leading-tight">{feature.label}</p>
                </div>
              );
            })}
          </div>
        </div> */}
      </div>
    </div>
  );
};



export default Hero;
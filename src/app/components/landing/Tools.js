import React from "react";
import Link from "next/link";
import { ArrowRight, Palette, Shapes, Image } from "lucide-react";

const Tools = () => {
  const tools = [
    {
      title: "Background Studio",
      description:
        "Explore animated backgrounds. Customize effects, colors, and speed. Export as video, image, or code.",
      icon: <Palette className="w-6 h-6 text-[#C9BFFF]" />,
      href: "/tools/background-studio",
    },
    {
      title: "Shape Magic",
      description:
        "Create inner rounded corners between shapes of different sizes. Export as code or SVG.",
      icon: <Shapes className="w-6 h-6 text-[#C9BFFF]" />,
      href: "/tools/shape-magic",
    },
    {
      title: "Texture Lab",
      description:
        "Apply effects to your images. Add noise, dithering, halftone, ASCII art, and more.",
      icon: <Image className="w-6 h-6 text-[#C9BFFF]" />,
      href: "/tools/texture-lab",
    },
  ];

  return (
    <div className="w-full sm:-mt-40">
      <div className="w-full flex justify-center mb-10">
        <div className="text-center">
          <h2 className="text-[#C9BFFF] font-JBM text-5xl mb-4 font-bold tracking-normal z-20">
            Tools
          </h2>
          <p className="text-white sm:text-base text-sm font-JBM tracking-normal z-20">
            Free utilities to boost your workflow
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center sm:max-w-5xl sm:gap-12 gap-8 mx-auto z-20">

        {tools.map((tool, index) => (
          <div
            key={index}
            className="w-[300px] min-w-[300px] flex flex-col rounded-[16px] bg-[#0a0018] border border-[#C9BFFF]/20 p-6 z-20 hover:border-[#C9BFFF]/40 transition-all duration-300 font-FT"
            style={{
              background:
                "linear-gradient(180deg, rgba(82, 39, 255, 0.04), rgba(82, 39, 255, 0.01))",
            }}
          >
            <div className="w-12 h-12 rounded-lg bg-[#C9BFFF]/15 flex items-center justify-center mb-4">
              {tool.icon}
            </div>

            <div className="text-[#E9F8FF] flex flex-col gap-3 z-20 flex-1">
              <h2 className="eb-demo-title z-20">{tool.title}</h2>
              <p className="text-white text-sm leading-relaxed flex-1 opacity-70 tracking-widest z-20 text-justify">
                {tool.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tools;

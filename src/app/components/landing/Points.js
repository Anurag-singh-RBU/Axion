import { Layers, LayoutGrid, Filter, Flame } from "lucide-react";

export default function Points() {
  return (
    <section className="w-full bg-transparent md:-mt-30 mt-15 mx-auto sm:mb-40 md:mb-40 mb-20 font-FT">
      <div className="mx-auto sm:max-w-6xl px-8 sm:px-0">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Layers className="h-5 w-5 text-white"/>
              <h3 className="text-[14px] font-semibold text-white tracking-wider">
                Tailored workflows
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-zinc-400 font-HG">
              Track progress across custom issue flows for your team.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <LayoutGrid className="h-5 w-5 text-white"/>
              <h3 className="text-[14px] font-semibold text-white tracking-wider">Custom views</h3>
            </div>
            <p className="text-sm leading-relaxed text-zinc-400 font-HG">
              Switch between list and board. Group issues with swimlanes.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Filter className="h-5 w-5 text-white"/>
              <h3 className="text-[14px] font-semibold text-white tracking-wider">Filters</h3>
            </div>
            <p className="text-sm leading-relaxed text-zinc-400 font-HG">
              Refine issue lists down to what’s most relevant to you.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Flame className="h-5 w-5 text-white"/>
              <h3 className="text-[14px] font-semibold text-white tracking-wider">SLAs</h3>
            </div>
            <p className="text-sm leading-relaxed text-zinc-400 font-HG">
              Automatically apply deadlines to time sensitive tasks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

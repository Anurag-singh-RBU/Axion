"use client";

import { useState } from "react";

const Avatar = ({ name }) => {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex items-center gap-2">
      <div className="h-6 w-6 rounded-full bg-neutral-700 flex items-center justify-center text-[11px] text-neutral-200">
        {initials}
      </div>
      <span className="text-xs text-neutral-200">{name}</span>
    </div>
  );
};

const Chip = ({ text }) => {
  return (
    <span className="inline-flex items-center gap-2 font-HG rounded-md border border-neutral-800 bg-neutral-950 px-2.5 py-1 text-xs text-neutral-200">
      {text}
    </span>
  );
};

export default function Triage() {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-[360px]">
      <div className="relative w-[720px] rounded-xl border border-neutral-900 bg-neutral-950/70 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
        <div className="flex items-center gap-2 text-neutral-300">
          <span className="text-lg">✳</span>
          <span className="text-sm font-medium">Triage Intelligence</span>
        </div>

        <div className="mt-4 grid grid-cols-12 gap-4 font-HG">
          <div className="col-span-3 space-y-4 text-sm text-neutral-500">
            <div>Suggestions</div>
            <div>Duplicate of</div>
          </div>

          <div className="col-span-9 space-y-3 -ml-6">
            <div className="flex flex-wrap items-center gap-2">
              <Chip text="👤 Priya - Suggested Assignee"/>
              <Chip text={<><svg xmlns="http://www.w3.org/2000/svg" className="inline-block mb-[2px]" width="16" height="16" viewBox="0 0 20 20" fill="none"><rect x="5" y="2" width="10" height="16" rx="2" stroke="#9CA3AF" strokeWidth="1.3"/><rect x="8" y="15" width="4" height="1.5" rx="0.7" fill="#9CA3AF" /></svg>Mobile App Refractor</>} />
              {/* <Chip text="🔴 High Priority"/> */}
              <Chip text="🧩 Axion Service Management"/>
            </div>

            {open && (
              <div
                className="relative w-[500px] -ml-5 rounded-2xl! bg-neutral-950/95 p-5 shadow-lg backdrop-blur-xl border-[1.5px] border-solid"
                style={{
                  borderImage: 'linear-gradient(135deg, #60a5fa 0%, #6366f1 40%, #d946ef 100%) 1',
                  borderRadius: '20px',
                  borderWidth: '1.5px',
                  borderStyle: 'solid',
                  borderColor: 'transparent'
                }}>
                <Avatar name="Priya Sharma"/>

                <div className="mt-3">
                  <h3 className="text-xs font-semibold text-neutral-200 font-HG">
                    Why this assignee was suggested
                  </h3>

                  <p className="mt-2 text-xs text-justify text-neutral-400 leading-relaxed font-HG">
                    This user was the assignee on previous Axion issues related to{" "}
                    <span className="text-neutral-200">app startup performance</span> ,{" "}
                    <span className="text-neutral-200">cold launch lag</span> and{" "}
                    <span className="text-neutral-200">render blocking API calls</span>.
                    They recently resolved similar tickets in the same component area
                    and understand the Mobile App launch flow ownership.
                  </p>
                </div>

                <div className="mt-4">
                  <h4 className="text-xs font-JBM font-semibold text-neutral-200">
                    ALTERNATIVES
                  </h4>

                  <div className="mt-2 flex items-center gap-2 font-HG">
                    <button className="inline-flex items-center gap-2 rounded-md border border-neutral-700 bg-neutral-950 px-2 py-1 text-xs text-neutral-200 hover:bg-neutral-900">
                      <div className="h-5 w-5 rounded-full bg-neutral-700 flex items-center justify-center text-[11px] text-neutral-200">
                        Y
                      </div>
                      Yann
                    </button>

                    <button className="inline-flex items-center gap-2 rounded-md border border-neutral-700 bg-neutral-950 px-2 py-1 text-xs text-neutral-200 hover:bg-neutral-900">
                      <div className="h-5 w-5 rounded-full bg-neutral-700 flex items-center justify-center text-[10px] text-neutral-200">
                        E
                      </div>
                      Erin
                    </button>
                  </div>
                </div>

                <button className="mt-4 w-full rounded-lg bg-neutral-900 px-4 font-HG py-2.5 text-sm font-medium text-neutral-200 hover:bg-neutral-800">
                  ✓ Accept suggestion
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

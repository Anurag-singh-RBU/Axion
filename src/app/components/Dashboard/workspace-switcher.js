"use client"

import React, { useState } from "react";
import { useGetWorkspaces } from "@/Features/workspaces/api/use-get-workspace";
import { ChevronDown, Briefcase, Plus, Clock, Star } from "lucide-react";

const WorkspaceSwitcher = () => {
  const { data, isLoading } = useGetWorkspaces();
  const [isOpen, setIsOpen] = useState(true);

  const workspaces = data?.documents || [];
  const total = data?.total || 0;

  // For now: treat the first workspace as "current" and the last 3 as "recent"
  const current = workspaces[0];
  const recent = workspaces.slice(0, 3);

  return (
    <div className="px-3 py-3">
      {/* Header / Summary */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-[13px] font-HG uppercase tracking-[0.16em] text-gray-800 font-semibold">
            Workspaces
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm font-GS text-gray-900">
              {isLoading ? "Loading" : `${total} active`}
            </span>
            {total > 0 && (
              <span className="inline-flex justify-center items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-HG text-emerald-700 border border-emerald-100">
                <Star className="h-3 w-3 fill-emerald-400 text-emerald-600" />
                <span className="font-FT">All synced</span>
              </span>
            )}
          </div>
        </div>
        <button
          type="button"
          className="inline-flex items-center -mt-5 gap-1 rounded-md bg-black text-white px-2.5 py-1.5 text-[11px] font-HG tracking-wide shadow-sm hover:bg-gray-900 active:scale-[0.98] transition-transform"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>New</span>
        </button>
      </div>

      {/* Current workspace pill */}
      {current && (
        <>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="group flex w-full items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-2.5 text-left hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-sm">
                <Briefcase className="h-4 w-4"/>
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-GS text-gray-900 line-clamp-1 tracking-wide">
                  {current.name || "Untitled workspace"}
                </span>
                <span className="text-[11px] font-HG text-gray-500">
                  {current.key || "No key"} · Current
                </span>
              </div>
            </div>
            <ChevronDown
              className={`h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}/>
          </button>

          {/* Dropdown content */}
          {isOpen && (
            <>
              {/* Recent section */}
              {recent.length > 0 && (
                <div className="mt-3 rounded-lg border border-dashed border-gray-200 bg-white/60 px-2.5 py-2.5">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-gray-500" />
                      <span className="text-[11px] font-HG uppercase tracking-[0.14em] text-gray-500">
                        Recent
                      </span>
                    </div>
                    <span className="text-[10px] font-FT tracking-wider text-gray-500">
                      Last {recent.length} opened
                    </span>
                  </div>
                  <div className="space-y-1">
                    {recent.map((ws) => (
                      <button
                        key={ws.$id}
                        type="button"
                        className="flex w-full items-center justify-between rounded-md px-1.5 py-1.5 text-left text-[12px] hover:bg-gray-100 transition-colors group"
                      >
                        <div className="flex items-center gap-1.5 -ml-1.5">
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-sm bg-gray-900 text-[10px] font-HG tracking-wider text-white">
                            {(ws.name || "?").slice(0, 2).toUpperCase()}
                          </span>
                          <span className="font-HG text-gray-800 line-clamp-1">
                            {ws.name || "Untitled workspace"}
                          </span>
                        </div>
                        <span className="text-[10px] font-JBM tracking-wide text-gray-400 group-hover:text-gray-500">
                          {ws.key || "No key"}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Empty state */}
              {!isLoading && total === 0 && (
                <div className="mt-2 rounded-lg border border-dashed border-gray-200 bg-gray-50 px-2.5 py-2.5 text-[11px] text-gray-500 font-HG">
                  No workspaces yet. Create one to get started.
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default WorkspaceSwitcher;
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { DocPage, sidebarSections } from "./docs-data";

// ── Section Icons ─────────────────────────────────────────────────────────────
const sectionIcons: Record<string, React.ReactNode> = {
  "Getting Started": (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  "Core Concepts": (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  "Reference": (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  "Customization": (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
    </svg>
  ),
};

// ── Page Icons ────────────────────────────────────────────────────────────────
const pageIcons: Record<string, React.ReactNode> = {
  introduction: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  ),
  installation: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  "environment-variables": (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="m8 21 4-4 4 4M12 17v4" />
    </svg>
  ),
  "project-structure": (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  ),
  issues: (
    <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g fill="currentColor">
        <path d="M14.4249 16H3.57529C2.73549 16 1.98348 15.5659 1.56358 14.8389C1.14368 14.1114 1.14368 13.2432 1.56358 12.5161L6.98889 3.12012C7.40829 2.39302 8.16029 1.95898 9.00009 1.95898C9.83989 1.95898 10.5919 2.39312 11.0113 3.12012L16.4366 12.5161C16.8565 13.2441 16.8565 14.1124 16.4366 14.8394C16.0167 15.566 15.2647 16 14.4249 16Z" fill="currentColor" opacity="0.3" />
        <path d="M9.00012 10.75C8.58602 10.75 8.25012 10.4141 8.25012 10V6.5C8.25012 6.0859 8.58602 5.75 9.00012 5.75C9.41422 5.75 9.75012 6.0859 9.75012 6.5V10C9.75012 10.4141 9.41422 10.75 9.00012 10.75Z" fill="currentColor" />
        <path d="M9.00012 13.569C8.44812 13.569 8.00012 13.12 8.00012 12.569C8.00012 12.018 8.44812 11.569 9.00012 11.569C9.55212 11.569 10.0001 12.018 10.0001 12.569C10.0001 13.12 9.55212 13.569 9.00012 13.569Z" fill="currentColor" />
      </g>
    </svg>
  ),
  boards: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="18" rx="1" />
      <rect x="14" y="3" width="7" height="10" rx="1" />
      <rect x="14" y="17" width="7" height="4" rx="1" />
    </svg>
  ),
  sprints: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </svg>
  ),
  "database-schema": (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
    </svg>
  ),
  "api-reference": (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  theming: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  ),
  deployment: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  ),
};

const defaultIcon = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
  </svg>
);

type Props = {
  activePage: DocPage;
  onSelectPage: (page: DocPage) => void;
};

export function ModernDocsSidebar({ activePage, onSelectPage }: Props) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    Object.fromEntries(sidebarSections.map((s) => [s.label, true]))
  );

  const toggle = (label: string) =>
    setOpenSections((prev) => ({ ...prev, [label]: !prev[label] }));

  return (
    <aside className="hidden md:flex w-[240px] min-w-[240px] flex-col border-r border-border/40 pt-4 pb-8 overflow-y-auto sticky top-14 h-[calc(100vh-3.5rem)]">
      <div className="flex flex-col gap-1 px-3">
        {sidebarSections.map((section) => {
          const isOpen = openSections[section.label];
          const sectionHasActive = section.pages.some((p) => p.id === activePage.id);

          return (
            <div key={section.label}>
              {/* ── Section header ── */}
              <button
                onClick={() => toggle(section.label)}
                className={cn(
                  "w-full flex items-center gap-2.5 px-2 py-2 font-FT tracking-wide rounded-xl text-[13px] font-semibold transition-all mb-0.5 group",
                  sectionHasActive
                    ? "text-[#0052CC] dark:text-blue-300"
                    : "text-foreground dark:text-zinc-300 hover:bg-accent/50"
                )}
              >
                <span
                  className={cn(
                    "flex items-center justify-center w-6 h-6 rounded-lg shrink-0 transition-colors",
                    sectionHasActive
                      ? "bg-[#0052CC]/15 text-[#0052CC] dark:text-blue-300"
                      : "bg-muted text-muted-foreground dark:text-zinc-300 group-hover:bg-[#0052CC]/10 group-hover:text-[#0052CC] dark:group-hover:text-blue-300 dark:group-hover:bg-blue-900/40"
                  )}
                >
                  {sectionIcons[section.label] ?? defaultIcon}
                </span>

                <span className="flex-1 text-left">{section.label}</span>

                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className={cn(
                    "text-muted-foreground/60 shrink-0 transition-transform duration-200",
                    isOpen ? "rotate-180" : "rotate-0"
                  )}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {/* ── Section pages ── */}
              <div
                className={cn(
                  "overflow-hidden transition-all duration-200",
                  isOpen ? "max-h-[500px] opacity-100 mb-3" : "max-h-0 opacity-0"
                )}
              >
                {/* Left border line + indent */}
                <div className="ml-[18px] mt-1 pl-3 border-l-2 border-border/50 flex flex-col gap-0.5">
                  {section.pages.map((page) => {
                    const isActive = page.id === activePage.id;
                    return (
                      <button
                        key={page.id}
                        onClick={() => onSelectPage(page)}
                        className={cn(
                          "w-full text-left flex items-center gap-2.5 rounded-xl px-2 py-1.5 text-[13px] transition-all group",
                          isActive
                            ? "bg-[#0052CC]/10 text-[#0052CC] font-medium dark:text-blue-200 dark:bg-blue-900/40"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                        )}
                      >
                        <span
                          className={cn(
                            "flex items-center justify-center w-5 h-5 rounded-md shrink-0 transition-colors",
                            isActive
                              ? "bg-[#0052CC]/10 text-[#0052CC] dark:bg-blue-900/40 dark:text-blue-200"
                              : "text-muted-foreground dark:text-zinc-400 bg-muted/80 group-hover:text-foreground group-hover:bg-accent/50 dark:group-hover:text-blue-300"
                          )}
                        >
                          {pageIcons[page.id] ?? defaultIcon}
                        </span>

                        <span className="flex-1 truncate">{page.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
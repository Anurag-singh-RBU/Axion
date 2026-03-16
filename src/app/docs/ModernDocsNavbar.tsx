"use client";

import { useState, useRef, useEffect } from "react";
import { DocPage } from "./docs-data";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { UserBtn } from "@/components/userBtn";
import { Separator } from "@/components/ui/separator";

type Props = {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  allDocs: DocPage[];
  onSelectPage: (page: DocPage) => void;
};

export function ModernDocsNavbar({ searchQuery, setSearchQuery, allDocs, onSelectPage }: Props) {
  const [focused, setFocused] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const results = searchQuery.trim().length > 0
    ? allDocs.filter((page) => {
      const q = searchQuery.toLowerCase();
      return (
        page.title.toLowerCase().includes(q) ||
        page.description.toLowerCase().includes(q) ||
        page.category.toLowerCase().includes(q)
      );
    })
    : [];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setFocused(true);
      }
      if (e.key === "Escape") {
        setFocused(false);
        setSearchQuery("");
        inputRef.current?.blur();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [setSearchQuery]);

  const showDropdown = focused && searchQuery.trim().length > 0;

  // Close drawer on outside click or ESC
  useEffect(() => {
    if (!drawerOpen) return;
    const handler = (e) => {
      if (e.key === 'Escape') setDrawerOpen(false);
      if (e.target.closest && !e.target.closest('#mobile-drawer') && !e.target.closest('#mobile-hamburger')) {
        setDrawerOpen(false);
      }
    };
    document.addEventListener('keydown', handler);
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('keydown', handler);
      document.removeEventListener('mousedown', handler);
    };
  }, [drawerOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      {/* Desktop Navbar */}
      <div className="hidden sm:flex h-14 items-center px-4 gap-4">
        {/* Logo and Name */}
        <div className="flex items-center gap-2 mr-2 shrink-0">
          <div className="flex items-center justify-center w-7 h-7 rounded">
            <img src="/logo.png" alt="Axion Logo" className="h-6 w-6 object-cover"/>
          </div>
          <span className="font-bold text-md font-JBM">AXION</span>
        </div>
        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-0.5 text-sm">
          {[
            { label: "Home", active: false },
            { label: "Docs", active: true },
            { label: "Kanban Board", active: false },
            { label: "Dashboard", active: false },
          ].map(({ label, active }) => (
            <a
              key={label}
              href="#"
              className={cn(
                "px-3 py-1.5 rounded-md text-sm transition-colors",
                active
                  ? "text-foreground font-medium bg-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
            >
              {label}
            </a>
          ))}
        </nav>
        {/* Search */}
        <div className="ml-auto relative w-full max-w-xs lg:max-w-sm" ref={dropdownRef}>
          <div
            className={cn(
              "flex items-center gap-2 rounded-md border bg-background px-3 h-9 transition-all",
              focused
                ? "border-[#0052CC] ring-2 ring-[#0052CC]/20"
                : "border-input hover:border-input/80"
            )}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-muted-foreground shrink-0"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              ref={inputRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              placeholder="Search documentation"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground min-w-0"
            />
            {searchQuery ? (
              <button
                onClick={() => {
                  setSearchQuery("");
                  inputRef.current?.focus();
                }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            ) : (
              <KbdShortcut />
            )}
          </div>
          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1.5 rounded-lg border bg-popover shadow-xl overflow-hidden z-50">
              {results.length > 0 ? (
                <div className="py-1.5">
                  <p className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {results.length} result{results.length !== 1 ? "s" : ""}
                  </p>
                  {results.map((page) => (
                    <button
                      key={page.id}
                      onMouseDown={() => {
                        onSelectPage(page);
                        setFocused(false);
                      }}
                      className="w-full flex items-start gap-3 px-3 py-2.5 text-left hover:bg-accent transition-colors group"
                    >
                      <div className="mt-0.5 flex items-center justify-center w-6 h-6 rounded bg-[#0052CC]/10 text-[#0052CC] shrink-0">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground leading-snug">
                          <Highlight text={page.title} query={searchQuery} />
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5 truncate">
                          <span className="text-[#0052CC] font-medium">{page.category}</span>
                          {" · "}
                          <Highlight text={page.description} query={searchQuery} />
                        </p>
                      </div>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-muted-foreground mt-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-muted-foreground/30 mb-2"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                  <p className="text-sm font-medium text-foreground">No results found</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    No results for <span className="font-medium">&quot;{searchQuery}&quot;</span>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <ThemeSwitcher />
          <div className="mx-3 h-7 w-px bg-zinc-300 dark:bg-zinc-700 rounded-full" style={{ minWidth: 1 }} />
          <UserBtn />
        </div>
      </div>
      {/* Mobile Navbar */}
      <div className="flex sm:hidden h-14 items-center px-2 gap-2 w-full relative">
        {/* Left: Hamburger + Logo and Name */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Hamburger button */}
          <button
            id="mobile-hamburger"
            className="flex items-center justify-center w-9 h-9 rounded-md hover:bg-accent focus:outline-none"
            onClick={() => setDrawerOpen((v) => !v)}
            aria-label="Open menu"
            aria-expanded={drawerOpen}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </button>
          <div className="flex items-center justify-center w-8 h-8 rounded">
            <img src="/logo.png" alt="Axion Logo" className="h-7 w-7 object-cover"/>
          </div>
          <span className="font-bold text-base font-JBM">AXION</span>
        </div>
        {/* Right: ThemeSwitcher and UserBtn */}
        <div className="flex items-center gap-3 shrink-0 ml-auto px-2">
          <ThemeSwitcher/>
          <UserBtn/>
        </div>
        {drawerOpen && (
          <nav
            id="mobile-drawer"
            className="absolute left-0 top-full w-full bg-background border-b border-x border-border z-50 animate-dropdown flex justify-center"
            style={{ animation: 'dropdownOpen 0.18s cubic-bezier(.4,1.2,.6,1) both' }}>
            <div className="flex flex-col gap-1 py-2 w-full max-w-xs items-center">
              <a
                href="#"
                className="w-full text-center px-6 py-3 text-base font-medium text-foreground hover:bg-accent transition-colors"
                onClick={() => setDrawerOpen(false)}>Home</a>
              <a
                href="#"
                className="w-full text-center px-6 py-3 text-base font-medium text-foreground hover:bg-accent transition-colors"
                onClick={() => setDrawerOpen(false)}>Docs</a>
              <a
                href="#"
                className="w-full text-center px-6 py-3 text-base font-medium text-foreground hover:bg-accent transition-colors"
                onClick={() => setDrawerOpen(false)}>Kanban Board</a>
              <a
                href="#"
                className="w-full text-center px-6 py-3 text-base font-medium text-foreground hover:bg-accent transition-colors"
                onClick={() => setDrawerOpen(false)}>Dashboard</a>
            </div>
            <style>{`
              @keyframes dropdownOpen {
                from { opacity: 0; transform: translateY(-12px) scale(0.98); }
                to { opacity: 1; transform: translateY(0) scale(1); }
              }
              .animate-dropdown { animation: dropdownOpen 0.18s cubic-bezier(.4,1.2,.6,1) both; }
            `}</style>
          </nav>
        )}
      </div>
    </header>
  );
}

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const regex = new RegExp(
    `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi"
  );
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark
            key={i}
            className="bg-[#0052CC]/15 text-[#0052CC] rounded-sm font-medium not-italic"
          >
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

function KbdShortcut() {
  return (
    <kbd
      className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 font-mono text-[11px] text-muted-foreground select-none"
      title={'Command+K'}
      style={{ letterSpacing: '0.5px', fontWeight: 500 }}
    >
      <span className="inline-block bg-zinc-200 dark:bg-zinc-700 rounded px-1 py-0.5 text-xs font-bold mr-0.5" style={{ minWidth: 18, textAlign: 'center' }}>
        ⌘
      </span>
      <span className="inline-block bg-zinc-200 dark:bg-zinc-700 rounded px-1 py-0.5 text-xs font-bold" style={{ minWidth: 18, textAlign: 'center' }}>K</span>
    </kbd>
  );
}
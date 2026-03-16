"use client";

import { useState, useEffect } from "react";
import { DocPage, DocSection, allDocs } from "./docs-data";
import FileAlert from "../assets/icons/file-alert";
import TriangleWarning from "../assets/icons/triangle-warning";
import SquareWandSparkle from "../assets/icons/square-wand-sparkle";
import { cn } from "@/lib/utils";

// ── Inline Code ──────────────────────────────────────────────────────────────
function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-[13px] font-medium text-foreground border border-border/50">
      {children}
    </code>
  );
}

// ── Code Block ───────────────────────────────────────────────────────────────
function CodeBlock({ filename, language = "bash", content }: { filename?: string; language?: string; content: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="group relative my-4 rounded-lg border bg-muted/40 overflow-hidden">
      {filename && (
        <div className="flex items-center justify-between border-b border-border/50 px-4 py-2 bg-muted/60">
          <div className="flex items-center gap-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" />
            </svg>
            <span className="text-xs font-mono text-muted-foreground">{filename}</span>
          </div>
          <button
            onClick={() => { navigator.clipboard.writeText(content); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
            className="text-xs text-muted-foreground hover:text-foreground border border-border/60 rounded px-2 py-0.5 bg-background/60 transition-colors"
          >
            {copied ? "✓ Copied" : "Copy"}
          </button>
        </div>
      )}
      {!filename && (
        <button
          onClick={() => { navigator.clipboard.writeText(content); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
          className="absolute top-2.5 right-3 opacity-0 group-hover:opacity-100 text-xs text-muted-foreground hover:text-foreground border border-border/60 rounded px-2 py-0.5 bg-background/80 backdrop-blur transition-all z-10"
        >
          {copied ? "✓ Copied" : "Copy"}
        </button>
      )}
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code className={`language-${language} font-mono text-[13px]`}>{content}</code>
      </pre>
    </div>
  );
}

// ── Callout ──────────────────────────────────────────────────────────────────
function Callout({ type = "info", content }: { type?: "info" | "warning" | "tip"; content: string }) {
  const config = {
    info: {
      cls: "border-blue-200 bg-blue-50/60 dark:border-blue-900/40 dark:bg-blue-950/20",
      icon: <FileAlert fill="#0052CC" width={18} height={18} className="shrink-0 mt-0.5" />,
    },
    warning: {
      cls: "border-yellow-200 bg-yellow-50/60 dark:border-yellow-900/40 dark:bg-yellow-950/20",
      icon: <TriangleWarning fill="#D97706" width={18} height={18} className="shrink-0 mt-0.5" />,
    },
    tip: {
      cls: "border-green-200 bg-green-50/60 dark:border-green-900/40 dark:bg-green-950/20",
      icon: <SquareWandSparkle fill="#16A34A" width={18} height={18} className="shrink-0 mt-0.5" />,
    },
  };
  const { cls, icon } = config[type];
  return (
    <div className={cn("flex gap-3 rounded-lg border p-4 my-4 text-sm leading-relaxed", cls)}>
      <span className="hidden md:flex">{icon}</span>
      <span className="text-foreground/80" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

// ── Steps ────────────────────────────────────────────────────────────────────
function Steps({ steps }: { steps: { title: string; body: string; code?: string }[] }) {
  return (
    <div className="my-6 space-y-0">
      {steps.map((step, i) => (
        <div key={i} className="relative pl-10 pb-6 last:pb-0">
          <div className={cn("absolute left-3.5 top-7 w-px bg-border", i < steps.length - 1 ? "bottom-0" : "bottom-full")} />
          <div className="absolute left-0 top-0.5 flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background text-xs font-semibold text-muted-foreground z-10">
            {i + 1}
          </div>
          <p className="font-medium text-sm text-foreground mb-1">{step.title}</p>
          <p className="text-sm text-muted-foreground leading-relaxed text-justify">{step.body}</p>
          {step.code && <CodeBlock language="bash" content={step.code} />}
        </div>
      ))}
    </div>
  );
}

// ── Feature Grid ─────────────────────────────────────────────────────────────
function FeatureGrid({ items }: { items: { icon: string; title: string; description: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 my-6">
      {items.map((item) => (
        <div
          key={item.title}
          className="rounded-lg border border-border/50 bg-background p-4 transition-all hover:border-[#0052CC]/30 hover:bg-[#0052CC]/5 cursor-default"
        >
          <div className="flex items-center gap-2 mb-1.5 text-sm font-medium">
            <span>{item.icon}</span>
            {item.title}
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed text-justify">{item.description}</p>
        </div>
      ))}
    </div>
  );
}

// ── Table ────────────────────────────────────────────────────────────────────
function DocsTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="my-4 rounded-lg border border-border/50 overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/60 border-b border-border/50">
            {headers.map((h) => (
              <th key={h} className="text-left px-4 py-2.5 font-medium text-xs text-muted-foreground uppercase tracking-wide">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={cn("border-b border-border/30 last:border-0", i % 2 === 1 && "bg-muted/20")}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2.5 text-sm text-foreground/80 font-mono text-[13px]">
                  {j === 0 ? <span className="font-medium text-foreground font-sans">{cell}</span> : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Section Renderer ─────────────────────────────────────────────────────────
function renderSection(section: DocSection, idx: number) {
  switch (section.type) {
    case "paragraph":
      return (
        <p
          key={idx}
          className="text-sm text-muted-foreground leading-7 mb-4 text-justify"
          dangerouslySetInnerHTML={{ __html: section.content }}
        />
      );
    case "heading2":
      const id2 = section.content.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      // Hide the heading if it is immediately followed by a features section (key features heading)
      // and only show on md+ screens
      // This assumes renderSection is called in a map with access to the full sections array
      // So we need to patch the main DocsContent to pass sections and idx to renderSection
      // For now, we check if window is defined and hide by text match ("key features")
      if (section.content.trim().toLowerCase().includes("key features")) {
        return (
          <h2
            id={id2}
            key={idx}
            className="hidden md:block mt-10 mb-3 text-xl font-FT tracking-wide font-semibold text-foreground border-b border-border/40 pb-2 scroll-m-20 scroll-mt-20 text-justify"
          >
            {section.content}
          </h2>
        );
      }
      return (
        <h2
          id={id2}
          key={idx}
          className="mt-10 mb-3 text-xl font-FT tracking-wide font-semibold text-foreground border-b border-border/40 pb-2 scroll-m-20 scroll-mt-20 text-justify"
        >
          {section.content}
        </h2>
      );
    case "heading3":
      const id3 = section.content.toLowerCase().replace(/\\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      return (
        <h3 id={id3} key={idx} className="mt-6 mb-2 font-HG text-base font-semibold scroll-mt-20 text-justify">
          {section.content}
        </h3>
      );
    case "code":
      return <CodeBlock key={idx} filename={section.filename} language={section.language} content={section.content} />;
    case "callout":
      return <Callout key={idx} type={section.calloutType} content={section.content} />;
    case "steps":
      return <Steps key={idx} steps={section.steps} />;
    case "features":
      // Hide FeatureGrid (key features) on mobile
      return (
        <div className="hidden md:block">
          <FeatureGrid key={idx} items={section.items} />
        </div>
      );
    case "table":
      return <DocsTable key={idx} headers={section.headers} rows={section.rows} />;
    default:
      return null;
  }
}

// ── On This Page ─────────────────────────────────────────────────────────────
function OnThisPage({ page }: { page: DocPage }) {
  const headings = page.sections.filter((s) => s.type === "heading2" || s.type === "heading3") as { type: "heading2" | "heading3"; content: string }[];
  // Scrollspy logic
  const [activeId, setActiveId] = useState<string | null>(null);
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      console.log('scroll');
      let active = "";
      let bestScore = Infinity;
      headings.forEach(heading => {
        const id = heading.content.toLowerCase().replace(/\\s+/g, "-").replace(/[^a-z0-9-]/g, "");
        const el = document.getElementById(id);
        console.log(id, el);
        if (el) {
          const rect = el.getBoundingClientRect();
          const distance = Math.abs(rect.top);
          console.log(id, rect.top, rect.bottom);
          if (distance < bestScore && rect.top <= 100 && rect.bottom > 0) {
            bestScore = distance;
            active = id;
          }
        }
      });
      console.log('active:', active);
      setActiveId(active || (headings.length > 0 ? headings[0].content.toLowerCase().replace(/\\s+/g, "-").replace(/[^a-z0-9-]/g, "") : null));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);
  if (headings.length === 0) return null;
  return (
    <div className="hidden xl:flex flex-row items-stretch h-[calc(100vh-3.5rem)] sticky top-14">
      <div className="w-px bg-border/20 mx-2" />
      <aside className="w-45 min-w-45 flex-col py-8 pl-4 pr-4 overflow-y-auto">
        <div className="mb-2 text-[11px] font-semibold font-FT uppercase tracking-wider text-black">On This Page</div>
        <nav className="flex flex-col gap-0.5">
          {headings.map((h, i) => {
            const id = h.content.toLowerCase().replace(/\s+/g, "-");
            const isActive = activeId === id;
            return (
              <a
                key={i}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                }}
                className={
                  "text-[13px] py-1 pl-3 border-l-2 transition-all font-medium font-HG" +
                  (isActive
                    ? "border-primary text-primary bg-gray-50 dark:bg-gray-800/50"
                    : "border-transparent text-muted-foreground hover:text-primary hover:border-primary")
                }
              >
                {h.content}
              </a>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}

// ── Main Export ──────────────────────────────────────────────────────────────
export function DocsContent({ page }: { page: DocPage }) {
  const allPages = allDocs;
  const currentIdx = allPages.findIndex((p) => p.id === page.id);
  const prevPage = currentIdx > 0 ? allPages[currentIdx - 1] : null;
  const nextPage = currentIdx < allPages.length - 1 ? allPages[currentIdx + 1] : null;

  return (
    <div className="flex flex-1 min-w-0">
      <main className="flex-1 min-w-0 py-10 px-8 md:px-12">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
          <span>Docs</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-40">
            <path d="m9 18 6-6-6-6" />
          </svg>
          <span className="text-muted-foreground">{page.category}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-40">
            <path d="m9 18 6-6-6-6" />
          </svg>
          <span className="text-foreground font-medium">{page.title}</span>
        </nav>

        {/* Title */}
        <div className="mb-8 pb-8 border-b border-border/40">
          <h1 className="text-3xl font-smbold font-FT text-foreground mb-2 font-FT">{page.title}</h1>
          <p className="text-muted-foreground font-HG text-justify">{page.description}</p>
        </div>

        {/* Content */}
        {page.sections.map((section, idx) => renderSection(section, idx))}

        {/* Pagination */}
        <div className="mt-14 pt-6 border-t border-border/40 flex justify-between items-center gap-4">
          {prevPage ? (
            <button
              onClick={() => window.scrollTo(0, 0)}
              className="group flex flex-col items-start gap-0.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="text-xs text-muted-foreground/60 flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m15 18-6-6 6-6" />
                </svg>
                Previous
              </span>
              <span className="font-medium">{prevPage.title}</span>
            </button>
          ) : <div />}
          {nextPage ? (
            <button
              onClick={() => window.scrollTo(0, 0)}
              className="group flex flex-col items-end gap-0.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="text-xs text-muted-foreground/60 flex items-center gap-1">
                Next
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>
              <span className="font-medium">{nextPage.title}</span>
            </button>
          ) : <div />}
        </div>
      </main>

      <OnThisPage page={page} />
    </div>
  );
}
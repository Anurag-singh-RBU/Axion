"use client";

import { useState } from "react";
import { SidebarProvider } from "@/app/components/Dashboard/sidebar-context";
import { ModernDocsSidebar } from "./ModernDocsSidebar";
import { DocsContent } from "./DocsContent";
import { allDocs, DocPage } from "./docs-data";
import { ModernDocsNavbar } from "./ModernDocsNavbar";

export default function DocsPage() {
  const [activePage, setActivePage] = useState<DocPage>(allDocs[0]);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <ModernDocsNavbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          allDocs={allDocs}
          onSelectPage={setActivePage}/>
        <div className="flex flex-1 min-h-0">
          <ModernDocsSidebar activePage={activePage} onSelectPage={setActivePage}/>
          <DocsContent page={activePage}/>
        </div>
      </div>
    </SidebarProvider>
  );
}
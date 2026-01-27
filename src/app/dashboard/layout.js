"use client";

import { Sidebar } from "@/app/components/Dashboard/sidebar";
import Header from "@/app/components/Dashboard/header";
import { SidebarProvider, useSidebar } from "@/app/components/Dashboard/sidebar-context";
import ClickSpark from "../../components/ClickSpark";

function DashboardContent({ children }) {
    const { isCollapsed, isMobile } = useSidebar();
    
    return (
        <div className="min-h-screen">
            <ClickSpark sparkColor='rgb(59,130,246)' sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
            <div className="flex w-full h-full">
                {/* Desktop Sidebar - Fixed */}
                <div className={`fixed left-0 top-0 hidden lg:block h-full overflow-y-auto transition-all duration-300 z-40 ${
                    isCollapsed ? 'w-16' : 'w-[264px]'
                }`}>
                    <Sidebar/>
                </div>
                
                {/* Mobile Sidebar - Sheet (handled in Sidebar component) */}
                <div className="lg:hidden">
                    <Sidebar/>
                </div>
                
                {/* Main Content */}
                <div className={`w-full transition-all duration-300 ${
                    isMobile ? 'pl-0' : isCollapsed ? 'lg:pl-16' : 'lg:pl-[264px]'
                }`}>
                    <Header/>
                    <div className="mx-auto max-w-screen-2xl h-full">
                        <main className="h-full p-4 sm:p-6 flex flex-col">
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </ClickSpark>
        </div>
    );
}

export default function DashboardLayout({ children }) {
    return (
        <SidebarProvider>
            <DashboardContent>{children}</DashboardContent>
        </SidebarProvider>
    );
};
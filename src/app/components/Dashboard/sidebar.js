"use client";

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSidebar } from './sidebar-context'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'

const SidebarContent = () => {
  const { isCollapsed } = useSidebar();

  return (
    <div className={`h-full bg-white border-r border-gray-200 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-[264px]'
    }`}>
    </div>
  );
};

export const Sidebar = () => {
  const { isMobile, isMobileOpen, setIsMobileOpen } = useSidebar();

  useEffect(() => {

    if(!isMobile || !isMobileOpen) return;

    const updateOverlay = () => {

      const overlay = document.querySelector('[data-slot="sheet-overlay"]');
      if (overlay) {
        overlay.style.setProperty('top', '0px', 'important');
        overlay.style.setProperty('z-index', '0', 'important');
        overlay.style.setProperty('background-color', 'rgba(0, 0, 0, 0.3)', 'important');
      }
    };

    updateOverlay();
    const timeoutId = setTimeout(updateOverlay, 50);

    return () => {
      clearTimeout(timeoutId);
      const overlay = document.querySelector('[data-slot="sheet-overlay"]');
      if (overlay) {
        overlay.style.removeProperty('top');
        overlay.style.removeProperty('z-index');
        overlay.style.removeProperty('background-color');
      }
    };
  }, [isMobile, isMobileOpen]);

  if (isMobile) {
    return (
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetContent 
          side="left" 
          className="w-[240px] p-0 bg-white top-[54px]! bottom-0! h-[calc(100vh-3rem)]!">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation Menu</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );
  }

  return <SidebarContent/>;
}

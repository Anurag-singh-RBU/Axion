"use client";

import React, { useEffect } from 'react'
import { useSidebar } from './sidebar-context'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Home, CheckCircle, Settings, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {DottedSeparator} from "../../../components/Dotted-Seperator";
import { ListTodoIcon } from 'lucide-react';

const SidebarContent = () => {
  const { isCollapsed } = useSidebar();

  return (
    <div className={`h-full bg-white border-r border-gray-200 transition-all duration-300 ${
      isCollapsed ? 'w-[64px]' : 'w-[264px]'
    }`}>

    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-4 pt-3">
        <div className="bg-white rounded-full">
          <img src="/logo.png" alt="Axion Logo" className="h-7 w-7 object-cover rounded-md"/>
        </div>
        {!isCollapsed && (
          <Link href="/" className="text-black font-bold font-JBM text-xl">
            AXION
          </Link>
        )}
      </div>
      <DottedSeparator color="gray"/>
      {!isCollapsed && (
        <>
          <nav className="flex flex-col gap-1 px-2 mt-5 text-[15px] font-HG">
            <button className="flex items-center gap-3 w-full text-gray-700 hover:bg-gray-100 rounded-md px-2 py-2 font-medium transition">
              <Home className="w-5 h-5 text-black"/>
              <span className="font-HG mt-px">Home</span>
            </button>
            <button className="flex items-center gap-3 w-full text-gray-700 hover:bg-gray-100 rounded-md px-2 py-2 font-medium transition">
              <ListTodoIcon className="w-5 h-5 text-black"/>
              <span className="font-HG">My Tasks</span>
            </button>
            <button className="flex items-center gap-3 w-full text-gray-700 hover:bg-gray-100 rounded-md px-2 py-2 font-medium transition">
              <Settings className="w-5 h-5 text-black"/>
              <span className="font-HG">Settings</span>
            </button>
            <button className="flex items-center gap-3 w-full text-gray-700 hover:bg-gray-100 rounded-md px-2 py-2 font-medium transition -ml-px">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" stroke="#141B34" strokeWidth="1.5">
                  <path d="M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" />
                  <path d="M15 11C17.2091 11 19 9.20914 19 7C19 4.79086 17.2091 3 15 3" />
                  <path d="M11 14H7C4.23858 14 2 16.2386 2 19C2 20.1046 2.89543 21 4 21H14C15.1046 21 16 20.1046 16 19C16 16.2386 13.7614 14 11 14Z" />
                  <path d="M17 14C19.7614 14 22 16.2386 22 19C22 20.1046 21.1046 21 20 21H18.5" />
              </svg>
              <span className="font-HG mt-px">Members</span>
            </button>
          </nav>
        </>
      )}
    </div>
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
          className="w-[240px] p-0 bg-white top-[53px]! bottom-0! h-[calc(100vh-3rem)]!">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation Menu</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-3 px-4 pt-4 pb-2">
              <div className="bg-white rounded-full">
                <img src="/logo.png" alt="Axion Logo" className="h-7 w-7 object-cover"/>
              </div>
              <Link href="/" className="text-black font-bold font-JBM text-xl">
                AXION
              </Link>
            </div>
            <DottedSeparator color="gray"></DottedSeparator>
            <nav className="flex flex-col gap-1 px-2 mt-2 text-[15px] font-HG">
              <button className="flex items-center gap-3 w-full text-gray-700 hover:bg-gray-100 rounded-md px-2 py-2 font-medium transition">
                <Home className="w-5 h-5 text-black"/>
                <span className="font-HG mt-px">Home</span>
              </button>
              <button className="flex items-center gap-3 w-full text-gray-700 hover:bg-gray-100 rounded-md px-2 py-2 font-medium transition">
                <ListTodoIcon className="w-5 h-5 text-black"/>
                <span className="font-HG">My Tasks</span>
              </button>
              <button className="flex items-center gap-3 w-full text-gray-700 hover:bg-gray-100 rounded-md px-2 py-2 font-medium transition">
                <Settings className="w-5 h-5 text-black"/>
                <span className="font-HG">Settings</span>
              </button>
              <button className="flex items-center gap-3 w-full text-gray-700 hover:bg-gray-100 rounded-md px-2 py-2 font-medium transition -ml-px">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" stroke="#141B34" stroke-width="1.5">
                  <path d="M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" />
                  <path d="M15 11C17.2091 11 19 9.20914 19 7C19 4.79086 17.2091 3 15 3" />
                  <path d="M11 14H7C4.23858 14 2 16.2386 2 19C2 20.1046 2.89543 21 4 21H14C15.1046 21 16 20.1046 16 19C16 16.2386 13.7614 14 11 14Z" />
                  <path d="M17 14C19.7614 14 22 16.2386 22 19C22 20.1046 21.1046 21 20 21H18.5" />
              </svg>
                <span className="font-HG mt-px">Members</span>
              </button>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return <SidebarContent/>;
}

"use client";

import React from 'react';
import { Search, Bell, HelpCircle, Settings, Grid3x3, Plus, Sparkles, MoreHorizontal, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UserBtn } from '@/components/userBtn';
import { useSidebar } from './sidebar-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutGridIcon } from 'lucide-react';
import { GemIcon } from 'lucide-react';
import { ThemeSwitcher } from "@/components/theme-switcher";

const Header = () => {
    
    const { isCollapsed, toggleSidebar, isMobile, isMobileOpen } = useSidebar();

    const showOpenIcon = isMobile ? !isMobileOpen : isCollapsed;

    return (
        <header className="sticky z-40 top-0 w-full border-b border-gray-200 bg-white dark:bg-neutral-900 dark:border-gray-700">
        <div className="flex sm:h-12 h-13 items-center justify-between px-2 sm:px-4 gap-2 sm:gap-4">
            <div className="flex items-center min-w-0 sm:ml-0 -ml-2">
            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded hover:bg-gray-100"
                onClick={toggleSidebar}>
                {showOpenIcon ? (
                <PanelLeftOpen className="h-4 w-4 text-gray-600 dark:text-white"/>
                ) : (
                <PanelLeftClose className="h-4 w-4 text-gray-600 dark:text-white"/>
                )}
            </Button>
            
            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded hover:bg-gray-100 sm:ml-0 -ml-2">
                <LayoutGridIcon className="h-4 w-4 text-gray-600 dark:text-white"/>
            </Button>

            </div>

            <div className="flex-1 max-w-2xl sm:mx-4 md:mx-8 sm:ml-4 -ml-1">
            <div className="relative">
                <Search className="absolute sm:left-3 left-1.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search"
                  className="sm:pl-9 pl-7 w-full bg-white border-gray-300 dark:border-gray-700 rounded-sm text-sm h-8 min-h-0 placeholder:-pt-1 shadow-none font-HG tracking-wide -pt-px"/>
            </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 min-w-0">
            <div className="flex items-center gap-2">
                <Button
                    className="bg-[#1868DB] hover:bg-blue-700 cursor-pointer text-white rounded-sm h-8 gap-1 flex items-center justify-center text-sm"
                    onClick={() => window.location.href = "/workspaces/create"}>
                    <div className="flex gap-1 items-center justify-center w-full h-full">
                        <Plus className="h-4 w-4"/>
                        <span className="inline font-HG tracking-wide ml-1 -mt-px">Create</span>
                    </div>
                </Button>

                <Button 
                    variant="outline" 
                    className="hidden md:flex border-purple-500 dark:border-purple-700 dark:text-[#aa61d4] text-[#803FA5] hover:bg-purple-50 rounded-sm h-8 gap-1 items-center justify-center text-sm font-medium">
                    <GemIcon className="h-4 w-4"/>
                    <span className='font-HG tracking-wide -mt-px ml-1'>See plans</span>
                </Button>

                <button className="sm:flex hidden items-center gap-2 px-2 py-1.5 border border-gray-300 rounded-sm bg-white text-gray-800 hover:bg-gray-50 text-sm font-medium">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L3 7v10l9 5 9-5V7l-9-5Z" fill="#6366F1"/>
                        <path d="M12 7v10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M7 12h10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span className='font-HG tracking-wide -mt-px'>Ask Rovo</span>
                </button>
            </div>

            <div className="hidden md:flex items-center ml-2">
                <ThemeSwitcher/>
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded hover:bg-gray-100 md:hidden ml-1">
                        <div className='p-2 border border-gray-200 rounded-sm'>
                            <MoreHorizontal className="h-4 w-4 text-gray-600"/>
                        </div>
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem className="flex items-center gap-2">
                    <GemIcon className="h-4 w-4"/>
                    <span className='font-HG tracking-wide -mt-px'>See plans</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L3 7v10l9 5 9-5V7l-9-5Z" fill="#6366F1"/>
                        <path d="M12 7v10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M7 12h10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span className='font-HG tracking-wide -mt-px'>Ask Rovo</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem className="flex items-center gap-2">
                    <Bell className="h-4 w-4"/>
                    <span className='font-HG tracking-wide -mt-px'>Notifications</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4"/>
                    <span className='font-HG tracking-wide -mt-px'>Help</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                    <Settings className="h-4 w-4"/>
                    <span className='font-HG tracking-wide -mt-px'>Settings</span>
                </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <div className="ml-1 sm:ml-2">
                <UserBtn/>
            </div>
            </div>
        </div>
        </header>
    );
};

export default Header;
"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const SidebarContext = createContext(null);

export function SidebarProvider({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isMobile = useIsMobile();
  const prevIsMobileRef = useRef(isMobile);

  const toggleSidebar = () => {
    if (isMobile === undefined) {
      setIsMobileOpen(prev => !prev);
      return;
    }
    
    if (isMobile) {
      setIsMobileOpen(prev => !prev);
    } else {
      setIsCollapsed(prev => !prev);
    }
  };

  useEffect(() => {
    const prevIsMobile = prevIsMobileRef.current;
    prevIsMobileRef.current = isMobile;
    
    if (prevIsMobile === true && isMobile === false && isMobileOpen) {
      const timeoutId = setTimeout(() => {
        setIsMobileOpen(false);
      }, 0);
      
      return () => clearTimeout(timeoutId);
    }
  }, [isMobile, isMobileOpen]);

  return (
    <SidebarContext.Provider value={{ 
      isCollapsed, 
      toggleSidebar, 
      isMobile: isMobile ?? false, 
      isMobileOpen, 
      setIsMobileOpen 
    }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within SidebarProvider');
  }
  return context;
}

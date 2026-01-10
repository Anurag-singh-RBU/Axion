/* eslint-disable @next/next/no-img-element */
'use client';

import ElectricBorder from '@/Plasma/ElectricBorder'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);

  const [active, setActive] = useState('Home');
  const [animating, setAnimating] = useState(false);

  const items = ['Home', 'Docs', 'Dashboard', 'Kanban'];

  const handleClick = (item) => {
    setActive(item);
    setAnimating(true);
  };

  useEffect(() => {
    if (animating) {
      const timeout = setTimeout(() => setAnimating(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [animating]);

  return (
    <header className="sticky top-0 py-3 z-50 bg-transparent font-FT">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <div className="flex gap-3 justify-center items-center">
          <div className="bg-white rounded-full mb-2">
            <img src="/logo.png" alt="Axion Logo" className="h-8 w-8 object-cover rounded-md"/>
          </div>
          <Link href="/" className="text-white font-bold font-JBM text-xl">
            AXION
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-3">

        <div className="bg-neutral-950 rounded-[40px] px-6 py-3 inline-flex justify-center items-center gap-8 text-sm select-none cursor-pointer relative overflow-visible"
          style={{boxShadow: '0 1.5px 8px 0 #B19EEF33, 0 0px 0px 1.5px #B19EEF15'}}>
          <span className="pointer-events-none absolute inset-0 z-0 rounded-[40px] bg-linear-to-tr from-[#b19eef22] via-[#5227ff22] to-transparent blur-xl opacity-50 animate-pulse" />
        {items.map(item => (
        <div
          key={item}
          onClick={() => handleClick(item)}
          className={`relative pb-1 transition-colors duration-300 ${active === item ? 'text-white' : 'text-gray-300'}`}>
          {item}
          {active === item && (
            <span
              className="absolute bottom-0 left-1/2 bg-white rounded-full top-[20px]"
              style={{ width: animating ? '24px' : '6px', height: '6px', transform: 'translateX(-50%)', transition: 'width 0.3s ease' }}/>
          )}
        </div>
      ))}
        </div>

        <ElectricBorder example="button">
          <div>
            <p className='text-white px-6 py-2 font-JBM'>
              V1.0.0
            </p>
          </div>
        </ElectricBorder>
        </nav>

        <button onClick={() => setMenuOpen(v => !v)} className="md:hidden text-white text-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="lucide lucide-menu"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round">
            <line x1={4} y1={12} x2={20} y2={12}/>
            <line x1={4} y1={6} x2={20} y2={6}/>
            <line x1={4} y1={18} x2={20} y2={18}/>
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-[#271E37] bg-[#060010] px-6 py-4 flex flex-col gap-3">
          <Link href="/tools" onClick={() => setMenuOpen(false)} className="text-[#C9BFFF]">
            Tools
          </Link>
          <Link href="/get-started" onClick={() => setMenuOpen(false)} className="text-[#C9BFFF]">
            Docs
          </Link>
          <Link href="/favorites" onClick={() => setMenuOpen(false)} className="text-[#C9BFFF]">
            Favorites
          </Link>
          <a href="https://github.com" target="_blank" className="text-[#C9BFFF]">
            GitHub
          </a>
        </div>
      )}
    </header>
  );
}

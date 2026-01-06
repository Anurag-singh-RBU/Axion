'use client';

import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail, CircleCheck } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { label: 'Home', href: '/' },
      { label: 'Docs', href: '/docs' },
      { label: 'Showcase', href: '/showcase' },
      { label: 'Tools', href: '/tools' },
    ],
    Company: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
    Legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Settings', href: '/cookies' },
    ],
  };

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  return (
    <footer className="relative bg-[#060010] border-t border-[#B19EEF]/15 font-FT overflow-hidden mt-20">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-40 -right-40 w-[700px] h-[700px]rounded-full"/>
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"/>
        <div
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px]"/>
      </div>

      <div className="relative z-10">
        <div className="mx-auto max-w-5xl px-6 py-8 md:py-10">
          <div className="grid gap-16 md:grid-cols-2 items-start mb-16">
            <div className="space-y-3">
              <div className="flex gap-4 items-center">
                <div className="relative p-3 rounded-xl bg-linear-to-br from-[#5227FF] via-[#6B3EFF] to-[#B19EEF] shadow-lg shadow-[#5227FF]/30">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <rect x="3" y="3" width="26" height="26" rx="7" fill="#060010" />
                    <rect x="9.5" y="9.5" width="13" height="13" rx="3.5" fill="#B19EEF" />
                    <circle cx="16" cy="16" r="3.5" fill="#5227FF" />
                  </svg>
                </div>
                <div>
                  <span className="text-white font-bold text-2xl block leading-none font-JBM mb-1">Axion</span>
                  <span className="text-[#B19EEF] text-sm font-medium font-HG tracking-wide">Task Operations</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Link
                  href="#"
                  aria-label="GitHub"
                  className="w-11 h-11 rounded-lg bg-linear-to-br from-[#5227FF]/40 to-[#B19EEF]/40 border border-[#B19EEF]/50 flex items-center justify-center text-white transition-all duration-500 hover:from-[#5227FF]/60 hover:to-[#B19EEF]/50 hover:border-[#B19EEF]/80 hover:shadow-lg hover:shadow-[#5227FF]/40 hover:-translate-y-1">
                  <svg height="24" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="24" fill="white">
                    <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"/>
                </svg>
                </Link>
                <Link
                  href="#"
                  aria-label="Twitter"
                  className="w-11 h-11 rounded-lg bg-linear-to-br from-[#5227FF]/40 to-[#B19EEF]/40 border border-[#B19EEF]/50 flex items-center justify-center text-white transition-all duration-500 hover:from-[#5227FF]/60 hover:to-[#B19EEF]/50 hover:border-[#B19EEF]/80 hover:shadow-lg hover:shadow-[#5227FF]/40 hover:-translate-y-1">
                  <Twitter size={22}/>
                </Link>
                <Link
                  href="#"
                  aria-label="LinkedIn"
                  className="w-11 h-11 rounded-lg bg-linear-to-br from-[#5227FF]/40 to-[#B19EEF]/40 border border-[#B19EEF]/50 flex items-center justify-center text-white transition-all duration-500 hover:from-[#5227FF]/60 hover:to-[#B19EEF]/50 hover:border-[#B19EEF]/80 hover:shadow-lg hover:shadow-[#5227FF]/40 hover:-translate-y-1">
                  <Linkedin size={22}/>
                </Link>
                <Link
                  href="#"
                  aria-label="Email"
                  className="w-11 h-11 rounded-lg bg-linear-to-br from-[#5227FF]/40 to-[#B19EEF]/40 border border-[#B19EEF]/50 flex items-center justify-center text-white transition-all duration-500 hover:from-[#5227FF]/60 hover:to-[#B19EEF]/50 hover:border-[#B19EEF]/80 hover:shadow-lg hover:shadow-[#5227FF]/40 hover:-translate-y-1">
                  <Mail size={22}/>
                </Link>
              </div>
            </div>

            <div className="grid gap-12 md:grid-cols-3">
              {Object.entries(footerLinks).map(([section, links]) => (
                <div key={section} className="space-y-5">
                  <h4 className="text-white font-bold text-sm uppercase tracking-widest bg-gradient-to-r from-[#5227FF] via-[#B19EEF] to-[#5227FF] bg-clip-text text-transparent">
                    {section}
                  </h4>
                  <ul className="space-y-3.5">
                    {links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-[#B19EEF] text-sm font-HG transition-all duration-500 hover:text-white hover:pl-2 block">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="relative my-4 md:my-5">
            <div className="h-px bg-gradient-to-r from-transparent via-[#5227FF]/30 via-[#B19EEF]/20 to-transparent"/>
          </div>

          <div className="flex flex-col items-center justify-center text-center gap-0 py-1 leading-tight font-HG" style={{wordSpacing: "2px"}}>
            <p className="text-[#B19EEF]/80 text-sm font-medium">
              © {currentYear} <span className="text-white font-bold font-JBM">Axion</span>. All rights reserved.
            </p>
            <p className="text-[#B19EEF]/70 text-xs mt-1 font-HG tracking-wide">
              Crafted for developers who demand excellence
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

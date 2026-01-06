'use client';

import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

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
    <footer className="relative bg-[#060010] border-t border-[#B19EEF]/15 font-FT overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-40 -right-40 w-[700px] h-[700px] bg-gradient-to-br from-[#5227FF]/20 to-[#B19EEF]/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-[#B19EEF]/15 to-[#5227FF]/10 rounded-full blur-3xl"
          style={{ animationDelay: '2s', animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#5227FF]/5 rounded-full blur-3xl"
          style={{ animationDelay: '1s', animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
        />
      </div>

      <div className="relative z-10">
        {/* Main Content */}
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <div className="grid gap-16 md:grid-cols-2 items-start mb-16">
            {/* Brand Section */}
            <div className="space-y-6">
              <div className="flex gap-4 items-center">
                <div className="relative p-3 rounded-xl bg-gradient-to-br from-[#5227FF] via-[#6B3EFF] to-[#B19EEF] shadow-lg shadow-[#5227FF]/30">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <rect x="3" y="3" width="26" height="26" rx="7" fill="#060010" />
                    <rect x="9.5" y="9.5" width="13" height="13" rx="3.5" fill="#B19EEF" />
                    <circle cx="16" cy="16" r="3.5" fill="#5227FF" />
                  </svg>
                </div>
                <div>
                  <span className="text-white font-bold text-2xl block leading-none">Axion</span>
                  <span className="text-[#B19EEF]/60 text-sm font-medium">Task Operations</span>
                </div>
              </div>

              <p className="text-[#B19EEF]/70 text-base leading-relaxed max-w-sm">
                Powerful task operations platform that helps your teams work truly stand out. Built for dedicated developers.
              </p>

              <div className="flex gap-3 pt-2">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <Link
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#5227FF]/40 to-[#B19EEF]/40 border border-[#B19EEF]/50 flex items-center justify-center text-white transition-all duration-500 hover:from-[#5227FF]/60 hover:to-[#B19EEF]/50 hover:border-[#B19EEF]/80 hover:shadow-lg hover:shadow-[#5227FF]/40 hover:-translate-y-1"
                  >
                    <Icon size={22} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="grid gap-12 md:grid-cols-3">
              {Object.entries(footerLinks).map(([section, links]) => (
                <div key={section} className="space-y-5">
                  <h4 className="text-white font-bold text-xs uppercase tracking-widest bg-gradient-to-r from-[#5227FF] via-[#B19EEF] to-[#5227FF] bg-clip-text text-transparent">
                    {section}
                  </h4>
                  <ul className="space-y-3.5">
                    {links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-[#B19EEF]/70 text-sm font-medium transition-all duration-500 hover:text-white hover:pl-2 block"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="relative my-10 md:my-16">
            <div className="h-px bg-gradient-to-r from-transparent via-[#5227FF]/30 via-[#B19EEF]/20 to-transparent" />
          </div>

          {/* 🔽 Bottom Section (HEIGHT REDUCED ONLY) */}
          <div className="flex flex-col items-center justify-center text-center gap-0 py-1 leading-tight">
            <p className="text-[#B19EEF]/80 text-sm font-medium">
              © {currentYear} <span className="text-white font-bold">Axion</span>. All rights reserved.
            </p>
            <p className="text-[#B19EEF]/50 text-xs">
              Crafted for developers who demand excellence
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

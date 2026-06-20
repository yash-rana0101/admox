'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function HeroHeader() {
  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="w-full max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between relative z-50">
      {/* Logo */}
      <a href="#hero" className="flex items-center gap-2 group select-none">
        <svg
          className="w-6 h-6 text-brand-onyx group-hover:rotate-45 transition-transform duration-500 ease-out"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 8-pointed star/asterisk */}
          <path
            d="M50 10V90M10 50H90M21.72 21.72L78.28 78.28M21.72 78.28L78.28 21.72"
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
          />
        </svg>
        <span className="font-sora text-xl font-bold tracking-tight text-brand-onyx">
          Harmoniq
        </span>
      </a>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="font-sans text-[15px] font-medium text-brand-onyx/80 hover:text-brand-onyx transition-colors duration-200"
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* CTA Button */}
      <div>
        <a
          href="#contact"
          className="inline-flex items-center justify-center font-sans text-sm font-semibold text-white bg-brand-onyx hover:bg-brand-onyx/90 px-6 py-2.5 rounded-full transition-colors duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.05)] cursor-pointer select-none"
        >
          Book a demo
        </a>
      </div>
    </header>
  );
}

export default HeroHeader;

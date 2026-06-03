'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Work', href: '#work' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[92%] max-w-5xl rounded-full ${
          scrolled
            ? 'py-3 bg-brand-onyx/95 backdrop-blur-md border border-brand-teal/20 shadow-[0_8px_32px_rgba(37,105,81,0.15)]'
            : 'py-4 bg-brand-onyx border border-brand-teal/10 shadow-[0_4px_20px_rgba(37,105,81,0.08)]'
        }`}
      >
        <div className="px-6 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group select-none">
            <svg
              className="w-6.5 h-6.5 text-white transition-transform duration-500 group-hover:rotate-12"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Chevron A */}
              <path
                d="M50 15 L88 85 L70 85 L50 45 L30 85 L12 85 Z"
                fill="currentColor"
              />
              {/* Sparkle Star */}
              <path
                d="M50 63 L53 73 L63 76 L53 79 L50 89 L47 79 L37 76 L47 73 Z"
                fill="var(--color-brand-teal)"
              />
            </svg>
            <span className="font-sora text-base font-bold tracking-tight text-white">
              Admox<span className="text-brand-teal font-light">Media</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-space text-[12px] font-semibold tracking-wider uppercase text-white/80 hover:text-brand-teal transition-colors duration-300 relative py-1.5 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-teal transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button href="#contact" className="py-2 px-4 h-9 rounded-full">Start a Project →</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1.5 text-white hover:text-brand-teal transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Capsule */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 w-[92%] max-w-5xl z-40 bg-brand-onyx border border-brand-teal/20 rounded-3xl flex flex-col p-6 shadow-2xl md:hidden"
          >
            <div className="flex flex-col gap-4 items-center justify-center py-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-space text-[14px] font-semibold tracking-wider uppercase text-white/90 hover:text-brand-teal transition-colors duration-300 py-1.5"
                >
                  {link.name}
                </a>
              ))}
              <div className="w-full max-w-xs pt-4 border-t border-white/10 flex justify-center">
                <Button
                  href="#contact"
                  className="w-full text-center py-2.5"
                  onClick={() => setIsOpen(false)}
                >
                  Start a Project →
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

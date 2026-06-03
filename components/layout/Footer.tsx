'use client';

import React from 'react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    'Brand Films',
    'Video Editing',
    'Graphic Design',
    'Social Media',
    'AI Content',
    'AI Strategy',
  ];

  return (
    <footer className="bg-brand-onyx text-brand-linen py-16 px-6 md:px-12 border-t border-brand-teal/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Information */}
        <div className="md:col-span-2 space-y-6">
          <Link href="/" className="flex items-center gap-3 select-none">
            <svg
              className="w-7 h-7 text-brand-linen"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50 15 L88 85 L70 85 L50 45 L30 85 L12 85 Z"
                fill="currentColor"
              />
              <path
                d="M50 63 L53 73 L63 76 L53 79 L50 89 L47 79 L37 76 L47 73 Z"
                fill="var(--color-brand-teal)"
              />
            </svg>
            <span className="font-sora text-lg font-bold tracking-tight text-white">
              Admox<span className="text-brand-teal font-light">Media</span>
            </span>
          </Link>
          <p className="font-sora text-sm italic text-brand-linen/70 max-w-xs">
            "Your Brand. Our Vision."
          </p>
          <p className="font-sans text-sm text-brand-linen/60 max-w-sm">
            We combine human creativity with artificial intelligence to produce content that captures attention, builds trust, and accelerates growth.
          </p>
        </div>

        {/* Services Quick List */}
        <div>
          <h4 className="font-space text-[12px] font-bold uppercase tracking-wider text-brand-teal mb-4">
            Services
          </h4>
          <ul className="space-y-2">
            {services.map((service) => (
              <li key={service} className="font-space text-sm text-brand-linen/70 hover:text-white transition-colors duration-300">
                {service}
              </li>
            ))}
          </ul>
        </div>

        {/* Socials & Contact Info */}
        <div className="space-y-4">
          <h4 className="font-space text-[12px] font-bold uppercase tracking-wider text-brand-teal">
            Connect
          </h4>
          <div className="flex gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-space text-sm text-brand-linen/70 hover:text-brand-teal transition-colors duration-300"
            >
              Instagram
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-space text-sm text-brand-linen/70 hover:text-brand-teal transition-colors duration-300"
            >
              LinkedIn
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-space text-sm text-brand-linen/70 hover:text-brand-teal transition-colors duration-300"
            >
              YouTube
            </a>
          </div>
          <div className="pt-2">
            <span className="font-space text-[12px] block font-bold uppercase tracking-wider text-brand-teal mb-1">
              Inquiries
            </span>
            <a
              href="mailto:hello@admoxmedia.com"
              className="font-sans text-sm text-brand-linen/70 hover:text-white transition-colors duration-300"
            >
              hello@admoxmedia.com
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-brand-linen/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-space text-xs text-brand-linen/50">
          © {currentYear} Admox Media. All rights reserved.
        </p>
        <p className="font-space text-xs text-brand-linen/40">
          Crafted with WebGL & Framer Motion
        </p>
      </div>
    </footer>
  );
}

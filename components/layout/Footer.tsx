'use client';

import React from 'react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const pageLinks = [
    { label: 'All Products', href: '#services' },
    { label: 'Studio', href: '#about' },
    { label: 'Clients', href: '#work' },
    { label: 'Pricing', href: '#services' },
    { label: 'Blog', href: '#' },
  ];

  const socialLinks = [
    { label: 'Facebook', href: 'https://facebook.com' },
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'Twitter', href: 'https://twitter.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ];

  const registerLinks = [
    { label: 'Sign Up', href: '#contact' },
    { label: 'Login', href: '#' },
    { label: 'Forgot Password', href: '#' },
  ];

  return (
    <footer className="bg-[#121615] text-neutral-400 min-h-screen flex flex-col justify-between pt-32 pb-8 px-6 md:px-16 border-t border-brand-teal/10 relative overflow-hidden z-20">
      {/* Grid Container */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-12 relative z-10 my-auto">
        
        {/* Brand Information Column */}
        <div className="col-span-2 md:col-span-4 space-y-4">
          <p className="font-sans text-sm md:text-base text-neutral-300 leading-relaxed max-w-sm">
            We combine human creativity with artificial intelligence to engineer high-impact digital experiences.
          </p>
          <span className="block font-sans text-xs md:text-sm text-neutral-500 leading-relaxed max-w-xs pt-1">
            © copyright Admox {currentYear}. All rights reserved.
          </span>
        </div>

        {/* Pages Column */}
        <div className="col-span-1 md:col-span-2 space-y-4">
          <h4 className="font-sora text-sm font-bold text-white tracking-wider">
            Pages
          </h4>
          <ul className="space-y-2">
            {pageLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="font-sans text-sm text-neutral-400 hover:text-white transition-colors duration-250 block py-0.5"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials Column */}
        <div className="col-span-1 md:col-span-2 space-y-4">
          <h4 className="font-sora text-sm font-bold text-white tracking-wider">
            Socials
          </h4>
          <ul className="space-y-2">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-neutral-400 hover:text-white transition-colors duration-250 block py-0.5"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal Column */}
        <div className="col-span-1 md:col-span-2 space-y-4">
          <h4 className="font-sora text-sm font-bold text-white tracking-wider">
            Legal
          </h4>
          <ul className="space-y-2">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="font-sans text-sm text-neutral-400 hover:text-white transition-colors duration-250 block py-0.5"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Register Column
        <div className="col-span-1 md:col-span-2 space-y-4">
          <h4 className="font-sora text-sm font-bold text-white tracking-wider">
            Register
          </h4>
          <ul className="space-y-2">
            {registerLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="font-sans text-sm text-neutral-400 hover:text-white transition-colors duration-250 block py-0.5"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div> */}
      </div>

      {/* Huge Backdrop Watermark Logo Text */}
      <div className="w-full text-center mt-16 md:mt-24 select-none overflow-hidden leading-none font-sora font-black text-[#1b2321] hover:text-brand-teal hover:drop-shadow-[0_0_50px_rgba(37,105,81,0.6)] uppercase tracking-tighter text-[13vw] md:text-[17vw] transition-all duration-700 ease-out cursor-default">
        Admox
      </div>
    </footer>
  );
}

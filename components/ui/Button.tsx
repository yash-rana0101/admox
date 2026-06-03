'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  type = 'button',
  className = '',
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-space text-[13px] font-medium tracking-wider uppercase transition-colors duration-300 py-3 px-6 cursor-pointer border select-none focus:outline-none';
  
  const variants = {
    primary: 'bg-brand-teal border-brand-teal text-white hover:bg-transparent hover:text-brand-teal',
    secondary: 'bg-transparent border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white',
  };

  const buttonContent = (
    <motion.span
      className="flex items-center gap-2"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.span>
  );

  const fullClassName = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={fullClassName}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={fullClassName}
    >
      {buttonContent}
    </button>
  );
}

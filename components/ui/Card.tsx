'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function Card({
  children,
  className = '',
  delay = 0,
}: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: delay, ease: [0.25, 1, 0.5, 1] }}
      whileHover={{ 
        y: -6,
      }}
      className={`bg-white border border-brand-subtle/40 p-8 shadow-[0_4px_24px_rgba(37,105,81,0.06)] hover:border-brand-teal hover:shadow-[0_12px_30px_rgba(37,105,81,0.12)] transition duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
}

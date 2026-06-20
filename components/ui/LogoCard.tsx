'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface LogoCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function LogoCard({ children, className = '', style }: LogoCardProps) {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.12, 
        y: -4,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)"
      }}  
      whileTap={{ scale: 0.96 }}
      style={style}
      className={`w-14 h-14 md:w-16 md:h-16  flex items-center justify-center pointer-events-auto select-none ${className}`}
    >
      <div className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center">
        {children}
      </div>
    </motion.div>
  );
}

export default LogoCard;

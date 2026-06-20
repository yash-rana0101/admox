'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LogoCard } from '../../ui/LogoCard';

export function LogoArc() {
  const floatTransition = (delay: number) => ({
    animate: { y: [0, -8, 0] },
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut" as const,
      delay: delay
    }
  });

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {/* 1. Higgsfield (Leftmost, Outer) */}
      <motion.div
        {...floatTransition(0)}
        className="absolute left-[6%] top-[54%] -translate-x-1/2 -translate-y-1/2"
      >
        <LogoCard className="rotate-[-12deg]">
          {/* Higgsfield Custom SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
            <rect fill="#d1fe17" y="0" width="80" height="80" rx="16" ry="16" />
            <path fill="#131313" d="M64.28,39.6l-.05-.51c-.44-4.86-3.6-13.99-12.36-13.99-6.51,0-11.42,6.42-15.76,12.08-3.46,4.53-6.46,8.42-9.76,8.42-.88-.09-2.01-.53-2.7-1.52-.62-.9-.78-2.05-.46-3.43.51-2.19,3.41-4.21,6.48-6.37,1.68-1.15,3.41-2.37,4.61-3.54,3.46-3.34,5.21-5.75,5.21-9.64s-2.15-5.82-3.94-6.65c-3.6-1.66-8.88-.69-12.25,2.21-.51.46-1.01.9-1.48,1.31-3.39,3.01-5.67,5.06-10.91,3.5v6.31c6.94,3.06,12.78-2.78,14.99-5.48,1.71-1.77,3.51-2.81,4.84-2.81h.07c.6.02,1.11.25,1.48.67.6.69.83,1.5.71,2.39-.25,1.89-2.21,4.1-5.81,6.51-4.22,2.83-11.28,7.57-11.83,13.53-.42,4.28,1.8,8.56,5.26,10.22,8.07,3.82,12.99-2.76,18.2-9.71,3.99-5.36,7.77-10.45,13.03-10.45,4.73,0,6.48,3.91,6.48,6.37v.48l-.46.09c-11.46,2.03-17.72,12.75-17.72,17.7s4.2,9.18,9.37,9.18c6.04,0,13.52-5.15,14.72-19.65l.05-.53h4.78v-6.7h-4.8s0,0,0,0ZM58.03,47.03c-.92,8.68-5.37,12.73-8.07,12.73-1.22,0-2.93-1.01-2.93-2.9,0-2.12,3.16-8.54,10.27-10.45l.83-.21-.09.83h0Z" />
          </svg>
        </LogoCard>
      </motion.div>

      {/* 2. After Effects (Left-center) */}
      <motion.div
        {...floatTransition(0.5)}
        className="absolute left-[24%] top-[18%] -translate-x-1/2 -translate-y-1/2"
      >
        <LogoCard className="rotate-[-6deg]">
          {/* After Effects SVG */}
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect width="24" height="24" rx="5" fill="#031626" stroke="#1890FF" strokeWidth="0.75" />
            <text
              x="12"
              y="15.5"
              fill="#38BDF8"
              fontSize="10"
              fontWeight="bold"
              fontFamily="sans-serif"
              textAnchor="middle"
            >
              Ae
            </text>
          </svg>
        </LogoCard>
      </motion.div>

      {/* 3. Gemini (Center-top) */}
      <motion.div
        {...floatTransition(1)}
        className="absolute left-1/2 top-[2%] -translate-x-1/2 -translate-y-1/2"
      >
        <LogoCard className="rotate-[0deg]">
          {/* Gemini SVG */}
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path
              d="M12 2C12 7.5 7.5 12 2 12C7.5 12 12 16.5 12 22C12 16.5 16.5 12 22 12C16.5 12 12 7.5 12 2Z"
              fill="url(#gemini-arc-gradient)"
            />
            <defs>
              <linearGradient id="gemini-arc-gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                <stop offset="9%" stopColor="#4285F4" />
                <stop offset="45%" stopColor="#9B51E0" />
                <stop offset="83%" stopColor="#E9446A" />
                <stop offset="95%" stopColor="#F2994A" />
              </linearGradient>
            </defs>
          </svg>
        </LogoCard>
      </motion.div>

      {/* 4. Photoshop (Right-center) */}
      <motion.div
        {...floatTransition(0.7)}
        className="absolute left-[76%] top-[18%] -translate-x-1/2 -translate-y-1/2"
      >
        <LogoCard className="rotate-[6deg]">
          {/* Photoshop SVG */}
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect width="24" height="24" rx="5" fill="#011826" stroke="#00A3FF" strokeWidth="0.75" />
            <text
              x="12"
              y="15.5"
              fill="#00C2FF"
              fontSize="10"
              fontWeight="bold"
              fontFamily="sans-serif"
              textAnchor="middle"
            >
              Ps
            </text>
          </svg>
        </LogoCard>
      </motion.div>

      {/* 5. Premiere Pro (Rightmost, Outer) */}
      <motion.div
        {...floatTransition(0.2)}
        className="absolute left-[94%] top-[54%] -translate-x-1/2 -translate-y-1/2"
      >
        <LogoCard className="rotate-[12deg]">
          {/* Premiere Pro SVG */}
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect width="24" height="24" rx="5" fill="#1b122c" stroke="#9d50f7" strokeWidth="0.75" />
            <text
              x="12"
              y="15.5"
              fill="#e0a3ff"
              fontSize="10"
              fontWeight="bold"
              fontFamily="sans-serif"
              textAnchor="middle"
            >
              Pr
            </text>
          </svg>
        </LogoCard>
      </motion.div>
    </div>
  );
}

export default LogoArc;

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EntryScreenProps {
  onComplete: () => void;
  onStartEnter?: () => void;
}

export function EntryScreen({ onComplete, onStartEnter }: EntryScreenProps) {
  const [isExiting, setIsExiting] = useState(false);

  // Lock scroll on mount, unlock on unmount
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow || 'unset';
    };
  }, []);

  // Automatic seamless transition trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      if (onStartEnter) {
        onStartEnter();
      }
    }, 1200); // Display the unified logo for 1.2 seconds before starting reveal

    return () => clearTimeout(timer);
  }, [onStartEnter]);

  const panelVariants = {
    initial: { x: 0 },
    exitLeft: { 
      x: '-100%',
      transition: { duration: 1.4, ease: [0.85, 0, 0.15, 1] as [number, number, number, number] }
    },
    exitRight: { 
      x: '100%',
      transition: { duration: 1.4, ease: [0.85, 0, 0.15, 1] as [number, number, number, number] }
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] h-screen w-screen overflow-hidden flex select-none pointer-events-auto">
      {/* Background Ambient Glow (centered, fades out during exit) */}
      <AnimatePresence>
        {!isExiting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[600px] md:h-[600px] rounded-full bg-brand-teal/8 blur-[100px] md:blur-[140px] pointer-events-none z-10"
          />
        )}
      </AnimatePresence>

      {/* LEFT PANEL */}
      <motion.div
        variants={panelVariants}
        initial="initial"
        animate={isExiting ? 'exitLeft' : 'initial'}
        onAnimationComplete={(definition) => {
          if (definition === 'exitLeft') {
            onComplete();
          }
        }}
        className="absolute left-0 top-0 w-[calc(50vw+1.5px)] h-full bg-gradient-to-b from-brand-linen to-white overflow-hidden"
      >
        {/* Left half of the logo (Centered exactly at 50vw viewport width) */}
        <motion.div
          animate={isExiting ? { scale: 0.95, opacity: 0.6 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute left-[50vw] top-1/2 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] md:w-[850px] md:h-[850px] flex items-center justify-center pointer-events-none"
        >
          <img
            src="/logo-bgrm.png"
            alt="Admox Media"
            className="w-[400px] md:w-[720px] h-auto object-contain select-none pointer-events-none max-w-none"
          />
        </motion.div>
      </motion.div>

      {/* RIGHT PANEL */}
      <motion.div
        variants={panelVariants}
        initial="initial"
        animate={isExiting ? 'exitRight' : 'initial'}
        className="absolute right-0 top-0 w-[50vw] h-full bg-gradient-to-b from-brand-linen to-white overflow-hidden"
      >
        {/* Right half of the logo (Centered exactly at 50vw viewport width) */}
        <motion.div
          animate={isExiting ? { scale: 0.95, opacity: 0.6 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] md:w-[850px] md:h-[850px] flex items-center justify-center pointer-events-none"
        >
          <img
            src="/logo-bgrm.png"
            alt="Admox Media"
            className="w-[400px] md:w-[720px] h-auto object-contain select-none pointer-events-none max-w-none"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

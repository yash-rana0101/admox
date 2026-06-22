'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionProps } from 'framer-motion';

interface ParallaxScrollProps extends MotionProps {
  children: React.ReactNode;
  yOffset?: number; // The offset range in pixels, translates from yOffset to -yOffset
  className?: string;
  disabledOnMobile?: boolean;
}

export function ParallaxScroll({
  children,
  yOffset = -50,
  className = '',
  disabledOnMobile = true,
  ...props
}: ParallaxScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 25,
    mass: 0.1
  });

  const y = useTransform(smoothProgress, [0, 1], [yOffset, -yOffset]);

  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    if (disabledOnMobile && typeof window !== 'undefined') {
      const checkMobile = () => {
        setShouldAnimate(window.innerWidth >= 768);
      };
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, [disabledOnMobile]);

  return (
    <div ref={containerRef} className="w-full">
      <motion.div
        style={shouldAnimate ? { y } : undefined}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default ParallaxScroll;

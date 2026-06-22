"use client";

import React, { useRef, useEffect, useState } from 'react';
import { animate } from 'animejs';
import { cn } from '@/lib/utils';

interface AnimeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
  noDefaultPadding?: boolean;
}

export function AnimeCard({
  children,
  className,
  delay = 0,
  noDefaultPadding = false,
  ...props
}: AnimeCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const borderPathRef = useRef<SVGRectElement>(null);
  const [perimeter, setPerimeter] = useState(1200);

  useEffect(() => {
    if (!cardRef.current) return;
    const updatePerimeter = () => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (rect) {
        setPerimeter(2 * (rect.width + rect.height));
      }
    };
    updatePerimeter();
    window.addEventListener('resize', updatePerimeter);
    return () => window.removeEventListener('resize', updatePerimeter);
  }, []);

  // Entrance scroll reveal
  useEffect(() => {
    if (!cardRef.current) return;
    const card = cardRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(card, {
              opacity: [0, 1],
              translateY: [40, 0],
              scale: [0.97, 1],
              delay: delay * 1000, // delay is in seconds
              duration: 900,
              easing: 'easeOutBack',
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, [delay]);

  // Hover tracing animation
  const handleMouseEnter = () => {
    if (!borderPathRef.current) return;
    animate(borderPathRef.current, {
      strokeDashoffset: [perimeter, 0],
      duration: 800,
      easing: 'easeInOutQuad',
    });
    // Add micro-spring lift to card contents
    const contents = cardRef.current?.querySelector('.card-contents');
    if (contents) {
      animate(contents, {
        translateY: -4,
        scale: 1.01,
        duration: 400,
        easing: 'easeOutQuad',
      });
    }
  };

  const handleMouseLeave = () => {
    if (!borderPathRef.current) return;
    animate(borderPathRef.current, {
      strokeDashoffset: perimeter,
      duration: 600,
      easing: 'easeInOutQuad',
    });
    const contents = cardRef.current?.querySelector('.card-contents');
    if (contents) {
      animate(contents, {
        translateY: 0,
        scale: 1,
        duration: 400,
        easing: 'easeOutQuad',
      });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative rounded-lg overflow-hidden transition-shadow duration-300",
        noDefaultPadding
          ? "border border-brand-subtle/20 bg-white/5 text-white shadow-sm"
          : "bg-white border border-brand-subtle/40 p-8 shadow-[0_4px_24px_rgba(37,105,81,0.06)] hover:shadow-[0_12px_30px_rgba(37,105,81,0.12)]",
        className
      )}
      style={{ opacity: 0 }} // Starts invisible for scroll reveal
      {...props}
    >
      {/* Border light tracing overlay */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          ref={borderPathRef}
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx="8"
          fill="none"
          stroke="url(#anime-border-glow)"
          strokeWidth="2"
          strokeDasharray={perimeter}
          strokeDashoffset={perimeter}
        />
        <defs>
          <linearGradient id="anime-border-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#256951" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#256951" stopOpacity="1" />
            <stop offset="100%" stopColor="#D4E8CC" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>
      <div className="card-contents relative z-0 h-full w-full">
        {children}
      </div>
    </div>
  );
}

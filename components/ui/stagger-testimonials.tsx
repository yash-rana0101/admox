"use client"

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { testimonials, Testimonial } from './stagger-testimonials.data';
import { animate } from 'animejs';

interface TestimonialCardProps {
  position: number;
  testimonial: Testimonial;
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  position, 
  testimonial, 
  handleMove, 
  cardSize 
}) => {
  const isCenter = position === 0;
  const isMobileCard = cardSize < 320;
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Mathematically scale the cut corner size and diagonal line width
  const cutSize = isMobileCard ? 35 : 50;
  const diagonalLength = Math.sqrt(2 * cutSize * cutSize);

  useEffect(() => {
    if (!cardRef.current) return;
    const targetX = (cardSize / 1.5) * position;
    const targetY = isCenter ? -65 : position % 2 ? 15 : -15;
    const targetRotate = isCenter ? 0 : position % 2 ? 2.5 : -2.5;

    animate(cardRef.current, {
      translateX: targetX,
      translateY: targetY,
      rotate: targetRotate,
      duration: 650,
      easing: 'easeOutElastic(1, .85)',
    });
  }, [position, cardSize, isCenter]);

  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{
        width: cardSize,
        height: cardSize,
        zIndex: isCenter ? 10 : 0,
      }}
    >
      <div
        ref={cardRef}
        onClick={() => handleMove(position)}
        className={cn(
          "pointer-events-auto cursor-pointer border select-none h-full w-full transition-shadow duration-300",
          isCenter 
            ? "bg-brand-teal text-white border-brand-teal shadow-xl" 
            : "bg-white text-brand-onyx border-brand-subtle/40 hover:border-brand-teal/40 hover:shadow-lg",
          isMobileCard ? "p-5" : "p-8"
        )}
        style={{
          clipPath: `polygon(${cutSize}px 0%, calc(100% - ${cutSize}px) 0%, 100% ${cutSize}px, 100% 100%, calc(100% - ${cutSize}px) 100%, ${cutSize}px 100%, 0 100%, 0 0)`,
          boxShadow: isCenter ? "0px 8px 0px 4px var(--color-brand-subtle, #D4E8CC)" : "0px 0px 0px 0px transparent"
        }}
      >
        <span
          className={cn(
            "absolute block origin-top-right rotate-45",
            isCenter ? "bg-white/20" : "bg-brand-subtle/30"
          )}
          style={{
            right: -2,
            top: cutSize - 2,
            width: diagonalLength,
            height: 2
          }}
        />
        
        <div className={cn("relative inline-block", isMobileCard ? "mb-4" : "mb-6")}>
          <img
            src={testimonial.imgSrc}
            alt={`${testimonial.by.split(',')[0]}`}
            className={cn(
              "object-cover object-top border border-brand-subtle/20",
              isMobileCard ? "h-11 w-10" : "h-14 w-12"
            )}
            style={{
              boxShadow: "3px 3px 0px var(--color-brand-linen, #EEF7E8)"
            }}
          />
        </div>

        <h3 className={cn(
          "leading-relaxed font-sora font-medium tracking-tight",
          isMobileCard ? "text-[13px] sm:text-[14px]" : "text-base sm:text-[17px]",
          isCenter ? "text-white" : "text-brand-onyx/90"
        )}>
          "{testimonial.testimonial}"
        </h3>
        
        <p className={cn(
          "absolute left-8 right-8 font-space uppercase tracking-widest font-bold",
          isMobileCard ? "bottom-5 text-[9px]" : "bottom-8 text-[10px]",
          isCenter ? "text-brand-subtle" : "text-brand-teal"
        )}
        style={{
          left: isMobileCard ? "20px" : "32px",
          right: isMobileCard ? "20px" : "32px"
        }}>
          — {testimonial.by}
        </p>
      </div>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>([]);

  useEffect(() => {
    setTestimonialsList(testimonials);
  }, []);

  const handleMove = (steps: number) => {
    if (testimonialsList.length === 0) return;
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width >= 1200) {
        setCardSize(365); // Large Desktop
      } else if (width >= 768) {
        setCardSize(330); // Tablet / Small Desktop
      } else if (width >= 480) {
        setCardSize(290); // Mobile Landscape
      } else {
        // Small Mobile Portrait: scale card relative to screen width with side padding
        const dynamicWidth = Math.min(270, Math.max(240, width - 48));
        setCardSize(dynamicWidth);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  if (testimonialsList.length === 0) {
    return <div className="h-[600px] flex items-center justify-center text-brand-onyx/40">Loading testimonials...</div>;
  }

  return (
    <div className="relative w-full overflow-hidden bg-transparent py-4" style={{ height: 600 }}>
      {testimonialsList.map((testimonial, index) => {
        const position = testimonialsList.length % 2
          ? index - (testimonialsList.length + 1) / 2
          : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      
      {/* Navigation Controls */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-4">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-12 w-12 items-center justify-center transition-colors cursor-pointer",
            "bg-white border border-brand-subtle/50 text-brand-teal hover:bg-brand-teal hover:text-white hover:border-brand-teal",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-12 w-12 items-center justify-center transition-colors cursor-pointer",
            "bg-white border border-brand-subtle/50 text-brand-teal hover:bg-brand-teal hover:text-white hover:border-brand-teal",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

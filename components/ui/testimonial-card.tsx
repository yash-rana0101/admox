"use client";

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Testimonial } from './stagger-testimonials.data';
import { animate } from 'animejs';

interface TestimonialCardProps {
  position: number;
  testimonial: Testimonial;
  handleMove: (steps: number) => void;
  cardSize: number;
  dragOffset: number;
  isDragging: boolean;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  position, 
  testimonial, 
  handleMove, 
  cardSize,
  dragOffset,
  isDragging
}) => {
  const isCenter = position === 0;
  const isMobileCard = cardSize < 320;
  const cardRef = useRef<HTMLDivElement>(null);

  // Mathematically scale the cut corner size and radius
  const cutSize = isMobileCard ? 37 : 50;
  const r = 0.02; // Corner radius as fraction of card size (approx 15-18px for rounded edges)
  const c = cutSize / cardSize; // Cut corner size as fraction of card size

  const w = cardSize;
  const h = cardSize;
  const pxRadius = r * cardSize;
  const pxCut = cutSize;

  const clipPathId = `testimonial-clip-${testimonial.tempId}`;

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
      {/* SVG clipPath using objectBoundingBox ensures it scales/moves with the translated element */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <clipPath id={clipPathId} clipPathUnits="objectBoundingBox">
            <path
              d={`M ${r} 0 L ${1 - c - r} 0 Q ${1 - c} 0 ${1 - c + r * 0.707} ${r * 0.707} L ${1 - r * 0.707} ${c - r * 0.707} Q 1 ${c} 1 ${c + r} L 1 ${1 - r} Q 1 1 ${1 - r} 1 L ${r} 1 Q 0 1 0 ${1 - r} L 0 ${r} Q 0 0 ${r} 0 Z`}
            />
          </clipPath>
        </defs>
      </svg>

      <div
        ref={cardRef}
        className="w-full h-full pointer-events-auto"
        onClick={() => {
          if (dragOffset === 0) {
            handleMove(position);
          }
        }}
      >
        <div
          onDragStart={(e) => e.preventDefault()}
          className={cn(
            "cursor-pointer select-none h-full w-full transition-shadow duration-300 relative",
            isCenter 
              ? "bg-brand-teal text-white shadow-xl" 
              : "bg-white text-brand-onyx hover:shadow-lg",
            isMobileCard ? "p-5" : "p-8"
          )}
          style={{
            clipPath: `url(#${clipPathId})`,
            boxShadow: isCenter ? "0px 8px 0px 4px var(--color-brand-subtle, #D4E8CC)" : "0px 0px 0px 0px transparent",
            transform: `translateX(${dragOffset}px)`,
            transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
          }}
        >
          {/* Custom Rounded Border Overlay */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-20"
            viewBox={`0 0 ${w} ${h}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d={`M ${pxRadius} 0.5 L ${w - pxCut - pxRadius} 0.5 Q ${w - pxCut} 0.5 ${w - pxCut + pxRadius * 0.707} ${pxRadius * 0.707} L ${w - pxRadius * 0.707} ${pxCut - pxRadius * 0.707} Q ${w - 0.5} ${pxCut} ${w - 0.5} ${pxCut + pxRadius} L ${w - 0.5} ${h - pxRadius} Q ${w - 0.5} ${h - 0.5} ${w - pxRadius} ${h - 0.5} L ${pxRadius} ${h - 0.5} Q 0.5 ${h - 0.5} 0.5 ${h - pxRadius} L 0.5 ${pxRadius} Q 0.5 0.5 ${pxRadius} 0.5 Z`}
              stroke={isCenter ? "rgba(255,255,255,0.4)" : "rgba(37, 105, 81, 0.15)"}
              strokeWidth="1.5"
            />
          </svg>

          <div className={cn("relative inline-block", isMobileCard ? "mb-4" : "mb-6")}>
            <img
              src={testimonial.imgSrc}
              alt={`${testimonial.by.split(',')[0]}`}
              draggable="false"
              className={cn(
                "object-cover object-top border border-brand-subtle/20 rounded-lg",
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
    </div>
  );
};

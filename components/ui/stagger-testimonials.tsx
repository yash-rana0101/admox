"use client"

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { testimonials, Testimonial } from './stagger-testimonials.data';
import { TestimonialCard } from './testimonial-card';

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const dragStart = useRef<number | null>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    // Only support mouse left click or touches
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    dragStart.current = e.clientX;
    setDragOffset(0);
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragStart.current === null) return;
    const diff = e.clientX - dragStart.current;
    setDragOffset(diff);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragStart.current === null) return;
    
    e.currentTarget.releasePointerCapture(e.pointerId);

    const diff = dragOffset;
    const threshold = 50;

    if (diff > threshold) {
      handleMove(-1);
    } else if (diff < -threshold) {
      handleMove(1);
    }

    dragStart.current = null;
    setDragOffset(0);
    setIsDragging(false);
  };

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
    <div 
      className={cn(
        "relative w-full bg-transparent py-4 select-none touch-pan-y",
        isDragging ? "cursor-grabbing" : "cursor-grab"
      )} 
      style={{ height: 600 }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
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
            dragOffset={dragOffset}
            isDragging={isDragging}
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

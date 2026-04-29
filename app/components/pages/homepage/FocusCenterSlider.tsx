"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface FocusCenterSliderProps {
  children: React.ReactNode[];
  interval?: number;
  cardWidth?: number;
  gap?: number;
  className?: string;
}

export default function FocusCenterSlider({
  children,
  interval = 3200,
  cardWidth = 280,
  gap = 12,
  className = "",
}: FocusCenterSliderProps) {
  const count = children.length;

  // offset: 0 = clone of last, 1..count = real items, count+1 = clone of first
  const [offset, setOffset] = useState(1);
  const [animated, setAnimated] = useState(true);

  // real dot index (0-based)
  const realIndex = count > 0 ? ((offset - 1) % count + count) % count : 0;

  // extended array: [clone_last, ...real, clone_first]
  const extended = count > 0
    ? [children[count - 1], ...children, children[0]]
    : children;

  // auto-advance
  useEffect(() => {
    if (count === 0) return;
    const id = setInterval(() => {
      setAnimated(true);
      setOffset((prev) => prev + 1);
    }, interval);
    return () => clearInterval(id);
  }, [count, interval]);

  // after the CSS transition ends, silently snap if we landed on a clone
  const handleTransitionEnd = useCallback(() => {
    setOffset((prev) => {
      if (prev === 0) {
        setAnimated(false);
        return count;
      }
      if (prev === count + 1) {
        setAnimated(false);
        return 1;
      }
      return prev;
    });
  }, [count]);

  // re-enable animation one frame after a silent snap
  useEffect(() => {
    if (!animated) {
      const id = requestAnimationFrame(() => setAnimated(true));
      return () => cancelAnimationFrame(id);
    }
  }, [animated]);

  // compute translate relative to container center (handles container padding)
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [translatePx, setTranslatePx] = useState(0);

  const updateTranslate = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const step = cardWidth + gap;
    // Compute translate relative to container left: center of container minus half card width, then shift by offset*step
    const value = Math.round(rect.width / 2 - cardWidth / 2 - offset * step);
    setTranslatePx(value);
  }, [cardWidth, gap, offset]);

  useEffect(() => {
    updateTranslate();
    window.addEventListener("resize", updateTranslate);
    return () => window.removeEventListener("resize", updateTranslate);
  }, [updateTranslate]);

  return (
    <div ref={containerRef} className={`md:hidden relative ${className}`} style={{ overflow: "hidden" }}>
      <div
        onTransitionEnd={handleTransitionEnd}
        style={{
          display: "flex",
          gap,
          transition: animated ? "transform 0.5s cubic-bezier(0.4,0,0.2,1)" : "none",
          transform: `translateX(${translatePx}px)`,
        }}
      >
        {extended.map((child, idx) => {
          const isActive = idx === offset;
          return (
            <div
              key={idx}
              onClick={() => {
                if (!isActive) {
                  const diff = idx - offset;
                  if (Math.abs(diff) === 1) {
                    setAnimated(true);
                    setOffset(offset + diff);
                  }
                }
              }}
              style={{
                width: cardWidth,
                flexShrink: 0,
                borderRadius: 20,
                opacity: isActive ? 1 : 0.45,
                filter: isActive ? "none" : "blur(1.5px)",
                transform: isActive ? "scale(1)" : "scale(0.93)",
                boxShadow: isActive
                  ? "0 8px 32px rgba(107,70,255,0.18)"
                  : "0 2px 8px rgba(0,0,0,0.06)",
                transition: animated ? "all 0.45s cubic-bezier(0.4,0,0.2,1)" : "none",
                cursor: isActive ? "default" : "pointer",
              }}
            >
              {child}
            </div>
          );
        })}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2" style={{ marginTop: 20 }}>
        {children.map((_, idx) => (
          <button
            key={idx}
            onClick={() => { setAnimated(true); setOffset(idx + 1); }}
            style={{
              width: idx === realIndex ? 20 : 8,
              height: 8,
              borderRadius: 99,
              background: idx === realIndex ? "#7C3AED" : "#D1D5DB",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}


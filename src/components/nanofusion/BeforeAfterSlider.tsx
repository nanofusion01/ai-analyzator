import { useEffect, useRef, useState } from "react";

interface BeforeAfterSliderProps {
  imageUrl: string;
  afterImageUrl?: string;
  leftLabel?: string;
  rightLabel?: string;
  sliderColor?: string;
  initialPosition?: number;
}

export function BeforeAfterSlider({
  imageUrl,
  afterImageUrl,
  leftLabel = "DNES",
  rightLabel = "PO NANOFUSION",
  sliderColor = "#F5A623",
  initialPosition = 0.5,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(initialPosition);
  const [showHint, setShowHint] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(1, x / rect.width));
    setPosition(pct);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    handleMove(e.clientX);
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const onPointerUp = () => {
    isDragging.current = false;
  };

  const onTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    handleMove(e.touches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    handleMove(e.touches[0].clientX);
  };

  const onTouchEnd = () => {
    isDragging.current = false;
  };

  const pct = Math.round(position * 100);

  return (
    <div
      ref={containerRef}
      className="relative select-none cursor-ew-resize overflow-hidden"
      style={{ touchAction: "none" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Base image — PO NANOFUSION (cleaned / filtered) — visible on right side */}
      <img
        src={afterImageUrl || imageUrl}
        alt="Po ošetření"
        className="block w-full h-auto"
        style={afterImageUrl ? {} : { filter: "brightness(1.15) contrast(1.05) saturate(1.1) hue-rotate(-2deg)" }}
        draggable={false}
      />

      {/* Left overlay — DNES (original, dirty) — clipped from left to slider position */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ left: 0, width: `${pct}%` }}
      >
        <img
          src={imageUrl}
          alt="Před ošetřením"
          className="block h-full max-w-none object-cover"
          style={{
            width: containerRef.current ? containerRef.current.offsetWidth : "100%",
          }}
          draggable={false}
        />
      </div>

      {/* Labels */}
      <span
        className="absolute top-3 left-3 bg-black/50 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider"
        style={{ opacity: position > 0.15 ? 1 : 0, transition: "opacity 0.2s" }}
      >
        {leftLabel}
      </span>
      <span
        className="absolute top-3 right-3 bg-[var(--orange)]/90 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider"
        style={{ opacity: position < 0.85 ? 1 : 0, transition: "opacity 0.2s" }}
      >
        {rightLabel}
      </span>

      {/* Handle line */}
      <div
        className="absolute top-0 bottom-0"
        style={{ left: `${pct}%`, transform: "translateX(-50%)", width: 2, background: sliderColor }}
      />

      {/* Handle knob */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center"
        style={{ left: `${pct}%` }}
      >
        <div
          className="w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center"
          style={{ border: `2px solid ${sliderColor}` }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={sliderColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={sliderColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>

      {/* Mobile hint */}
      {showHint && (
        <div className="absolute bottom-1.5 left-0 right-0 text-center">
          <span className="text-[10px] text-[var(--muted-text)] bg-white/80 px-2 py-1 rounded-full">
            ← Táhněte pro porovnání →
          </span>
        </div>
      )}
    </div>
  );
}

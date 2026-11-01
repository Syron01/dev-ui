"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ImageCursorTrailProps {
  children?: React.ReactNode;
  images?: string[];
  maxImages?: number;
  distanceThreshold?: number;
  className?: string;
}

const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
];

interface TrailItem {
  id: number;
  x: number;
  y: number;
  image: string;
  rotation: number;
}

export function ImageCursorTrail({
  children,
  images = DEFAULT_IMAGES,
  maxImages = 6,
  distanceThreshold = 65,
  className,
}: ImageCursorTrailProps) {
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const imgIndexRef = useRef<number>(0);
  const idCounter = useRef<number>(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (!lastPos.current) {
      lastPos.current = { x, y };
      return;
    }

    const dist = Math.hypot(x - lastPos.current.x, y - lastPos.current.y);

    if (dist >= distanceThreshold) {
      lastPos.current = { x, y };
      const currentImage = images[imgIndexRef.current % images.length];
      imgIndexRef.current += 1;
      const rotation = (Math.random() - 0.5) * 28;

      const newItem: TrailItem = {
        id: ++idCounter.current,
        x,
        y,
        image: currentImage,
        rotation,
      };

      setTrail((prev) => [...prev.slice(-(maxImages - 1)), newItem]);
    }
  };

  const handleMouseLeave = () => {
    lastPos.current = null;
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative overflow-hidden w-full h-[380px] rounded-2xl bg-gradient-to-b from-[#141419] to-[#0c0c0e] border border-white/10 flex items-center justify-center cursor-crosshair select-none",
        className
      )}
    >
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Floating images */}
      <AnimatePresence>
        {trail.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.4, rotate: item.rotation, y: 15 }}
            animate={{ opacity: 1, scale: 1, rotate: item.rotation, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: -20, filter: "blur(6px)" }}
            transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.6 }}
            style={{
              position: "absolute",
              left: item.x - 70,
              top: item.y - 85,
              pointerEvents: "none",
            }}
            className="w-36 h-44 rounded-xl overflow-hidden shadow-2xl border border-white/20 z-20 bg-neutral-900"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image}
              alt="Cursor trail"
              className="w-full h-full object-cover pointer-events-none"
            />
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="relative z-10 pointer-events-none text-center px-4">
        {children ? (
          children
        ) : (
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Interactive Micro-Action
            </span>
            <h3 className="text-2xl md:text-3xl font-semibold mt-3 text-white tracking-tight">
              Move cursor across the canvas
            </h3>
            <p className="text-sm text-neutral-400 mt-1 max-w-sm mx-auto">
              Magnetic trail physics with dynamic tilt angles and inertia springs.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

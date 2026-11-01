"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RollingTextProps {
  text: string;
  className?: string;
  duration?: number;
}

export function RollingText({
  text = "INNOVATION",
  className,
  duration = 0.35,
}: RollingTextProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative inline-flex overflow-hidden cursor-pointer select-none font-bold text-2xl md:text-4xl tracking-tighter leading-none py-1",
        className
      )}
    >
      <div className="flex">
        {text.split("").map((char, index) => (
          <div key={index} className="relative overflow-hidden inline-block">
            {/* Top Char (Slides Up & Disappears) */}
            <motion.span
              initial={{ y: 0 }}
              animate={{ y: isHovered ? "-105%" : "0%" }}
              transition={{
                duration,
                ease: [0.33, 1, 0.68, 1],
                delay: index * 0.025,
              }}
              className="inline-block text-white"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>

            {/* Bottom Char (Slides Up from Bottom into View) */}
            <motion.span
              initial={{ y: "105%" }}
              animate={{ y: isHovered ? "0%" : "105%" }}
              transition={{
                duration,
                ease: [0.33, 1, 0.68, 1],
                delay: index * 0.025,
              }}
              className="absolute left-0 top-0 inline-block text-emerald-400 font-extrabold"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RollingButton({
  label = "Explore Registry",
  sublabel = "Ready to Ship",
  className,
}: {
  label?: string;
  sublabel?: string;
  className?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative h-12 px-6 rounded-full bg-white text-black font-medium text-sm overflow-hidden flex items-center justify-center shadow-lg transition-transform active:scale-95",
        className
      )}
    >
      <motion.div
        animate={{ y: isHovered ? "-100%" : "0%" }}
        transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
        className="h-full flex items-center justify-center font-semibold"
      >
        {label}
      </motion.div>
      <motion.div
        animate={{ y: isHovered ? "0%" : "100%" }}
        transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
        className="absolute inset-0 h-full flex items-center justify-center font-semibold bg-emerald-400 text-black"
      >
        {sublabel}
      </motion.div>
    </button>
  );
}

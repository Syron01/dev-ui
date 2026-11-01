"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

export function ApplePlayButton({ className }: { className?: string }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className={cn("flex flex-col items-center justify-center p-8 bg-neutral-950 rounded-2xl border border-neutral-800", className)}>
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsPlaying(!isPlaying)}
        className="relative size-20 rounded-full bg-white text-black flex items-center justify-center shadow-2xl shadow-white/20 transition-all duration-300 group"
      >
        <motion.div
          animate={{ rotate: isPlaying ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {isPlaying ? (
            <Pause className="size-8 fill-black" />
          ) : (
            <Play className="size-8 fill-black ml-1" />
          )}
        </motion.div>
        
        {/* Apple Ping Ring */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full border-2 border-white animate-ping opacity-30" />
        )}
      </motion.button>
      <span className="text-xs font-mono text-neutral-400 mt-4">
        {isPlaying ? "Playing Spatial Audio" : "Click to Play"}
      </span>
    </div>
  );
}

export function ThemeToggleButtons({ className }: { className?: string }) {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("dark");

  return (
    <div className={cn("flex items-center gap-2 p-2 bg-neutral-900 border border-neutral-800 rounded-full", className)}>
      {(["light", "dark", "system"] as const).map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          className={cn(
            "relative px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors duration-200",
            theme === t ? "text-black" : "text-neutral-400 hover:text-white"
          )}
        >
          {theme === t && (
            <motion.div
              layoutId="theme-active-pill"
              transition={{ type: "spring", stiffness: 450, damping: 32 }}
              className="absolute inset-0 bg-white rounded-full shadow-md"
            />
          )}
          <span className="relative z-10">{t}</span>
        </button>
      ))}
    </div>
  );
}

export function HoverMembersShowcase({ className }: { className?: string }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const members = [
    { name: "KHATAM", role: "Creative Director", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80" },
    { name: "ELENA", role: "Design Technologist", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80" },
    { name: "ZACK", role: "Shader Engineer", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=80" },
    { name: "MIRA", role: "Kinetics Lead", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=80" },
  ];

  return (
    <div className={cn("relative w-full py-12 px-6 flex flex-col items-center justify-center bg-black rounded-3xl border border-neutral-800 select-none overflow-hidden", className)}>
      <div className="flex flex-col items-center gap-4 z-10">
        {members.map((m, idx) => (
          <div
            key={m.name}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            className="group cursor-pointer py-1"
          >
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter text-neutral-600 hover:text-white transition-colors duration-300">
              {m.name}
            </h2>
          </div>
        ))}
      </div>

      {/* Floating Hover Avatar */}
      {hoveredIdx !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 2 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="pointer-events-none absolute z-20 w-44 h-56 rounded-2xl overflow-hidden border-2 border-white shadow-2xl bg-neutral-900"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={members[hoveredIdx].img}
            alt={members[hoveredIdx].name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black to-transparent">
            <p className="text-xs font-bold text-white">{members[hoveredIdx].name}</p>
            <p className="text-[10px] text-neutral-300">{members[hoveredIdx].role}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export function AnimatedCounterNumber({ className }: { className?: string }) {
  const [count, setCount] = useState(1284);

  return (
    <div className={cn("flex flex-col items-center gap-4 p-8 bg-neutral-950 rounded-2xl border border-neutral-800", className)}>
      <motion.div
        key={count}
        initial={{ y: -20, opacity: 0, filter: "blur(4px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="text-5xl font-mono font-black text-sky-400"
      >
        {count.toLocaleString()}
      </motion.div>
      <div className="flex gap-2">
        <button
          onClick={() => setCount((c) => c - 50)}
          className="px-4 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-mono"
        >
          - 50
        </button>
        <button
          onClick={() => setCount((c) => c + 100)}
          className="px-4 py-1.5 rounded-lg bg-white text-black font-bold text-xs font-mono"
        >
          + 100
        </button>
      </div>
    </div>
  );
}

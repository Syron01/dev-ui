"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ColorItem {
  id: string;
  title: string;
  category: string;
  year: string;
  color: string;
  accent: string;
  image: string;
}

const DEFAULT_ITEMS: ColorItem[] = [
  {
    id: "1",
    title: "Linear Redesign 2026",
    category: "Interface System",
    year: "2026",
    color: "#0f172a",
    accent: "#38bdf8",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "2",
    title: "Sora Neural Cinema",
    category: "Generative Media",
    year: "2026",
    color: "#2e1065",
    accent: "#c084fc",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "3",
    title: "Arc Fluid Architecture",
    category: "Spatial Browser",
    year: "2025",
    color: "#064e3b",
    accent: "#34d399",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "4",
    title: "Vercel Micro-Kernel",
    category: "Edge Compute",
    year: "2025",
    color: "#450a0a",
    accent: "#f87171",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "5",
    title: "Raycast Ambient Extensions",
    category: "Productivity",
    year: "2024",
    color: "#172554",
    accent: "#60a5fa",
    image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&auto=format&fit=crop&q=80",
  },
];

export function TikTikColorList({
  items = DEFAULT_ITEMS,
  className,
}: {
  items?: ColorItem[];
  className?: string;
}) {
  const [activeItem, setActiveItem] = useState<ColorItem | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn(
        "relative w-full rounded-2xl p-6 md:p-10 overflow-hidden transition-colors duration-700 ease-out border border-white/10 select-none",
        className
      )}
      style={{
        backgroundColor: activeItem ? activeItem.color : "#09090b",
      }}
    >
      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute -inset-px opacity-30 transition-opacity duration-500 blur-3xl"
        style={{
          background: activeItem
            ? `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${activeItem.accent}, transparent 70%)`
            : "none",
        }}
      />

      {/* Floating Image Preview Following Cursor */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 3,
              x: mousePos.x + 25,
              y: mousePos.y - 120,
            }}
            exit={{ opacity: 0, scale: 0.6, rotate: 10 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="pointer-events-none absolute top-0 left-0 z-30 hidden md:block w-56 h-36 rounded-xl overflow-hidden shadow-2xl border-2 border-white/20 bg-black/80"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeItem.image}
              alt={activeItem.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 divide-y divide-white/10">
        <div className="pb-4 flex justify-between items-center text-xs uppercase tracking-widest text-neutral-400 font-mono">
          <span>Project</span>
          <span className="hidden md:inline">Category</span>
          <span>Year</span>
        </div>

        {items.map((item) => {
          const isCurrent = activeItem?.id === item.id;
          return (
            <div
              key={item.id}
              onMouseEnter={() => setActiveItem(item)}
              onMouseLeave={() => setActiveItem(null)}
              className="group py-5 md:py-6 flex items-center justify-between cursor-pointer transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <span
                  className={cn(
                    "text-xs font-mono transition-colors duration-300",
                    isCurrent ? "text-white" : "text-neutral-500"
                  )}
                >
                  0{item.id}
                </span>
                <h4
                  className={cn(
                    "text-lg md:text-2xl font-medium tracking-tight transition-transform duration-300 group-hover:translate-x-2",
                    isCurrent ? "text-white font-semibold" : "text-neutral-300"
                  )}
                >
                  {item.title}
                </h4>
              </div>

              <div className="hidden md:block">
                <span
                  className={cn(
                    "text-sm transition-colors duration-300",
                    isCurrent ? "text-white/80" : "text-neutral-500"
                  )}
                >
                  {item.category}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "text-sm font-mono transition-colors duration-300",
                    isCurrent ? "text-white" : "text-neutral-500"
                  )}
                >
                  {item.year}
                </span>
                <div
                  className={cn(
                    "size-7 rounded-full flex items-center justify-center transition-all duration-300",
                    isCurrent
                      ? "bg-white text-black scale-110"
                      : "bg-white/5 text-neutral-500 group-hover:bg-white/10 group-hover:text-white"
                  )}
                >
                  <ArrowUpRight className="size-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

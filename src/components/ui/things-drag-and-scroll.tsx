"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CanvasItem {
  id: string;
  title: string;
  tag: string;
  image: string;
}

const DEFAULT_ITEMS: CanvasItem[] = [
  { id: "1", title: "Kinetic Fluidity", tag: "WebGL", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80" },
  { id: "2", title: "Rauno Progressive", tag: "Design", image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=600&auto=format&fit=crop&q=80" },
  { id: "3", title: "Spatial Glass", tag: "Shader", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80" },
  { id: "4", title: "Neural Geometry", tag: "Generative", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80" },
  { id: "5", title: "Dynamic Spring", tag: "Physics", image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&auto=format&fit=crop&q=80" },
  { id: "6", title: "Ambient Dark", tag: "Atmosphere", image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80" },
  { id: "7", title: "Hyper Horizon", tag: "Cyberpunk", image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80" },
  { id: "8", title: "Minimal Typo", tag: "Editorial", image: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=600&auto=format&fit=crop&q=80" },
];

export function ThingsDragAndScroll({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-[460px] rounded-2xl overflow-hidden bg-[#0c0c0e] border border-white/10 p-4 select-none cursor-grab active:cursor-grabbing",
        className
      )}
    >
      <div className="absolute top-4 left-6 z-10 pointer-events-none">
        <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          Momentum Physics
        </span>
        <h4 className="text-xl font-semibold text-white mt-1">Free Draggable Canvas Items</h4>
        <p className="text-xs text-neutral-400">Grab and throw cards with fluid inertia simulation.</p>
      </div>

      <motion.div
        drag
        dragConstraints={containerRef}
        dragElastic={0.2}
        className="w-[1200px] h-[900px] grid grid-cols-4 gap-6 p-16"
      >
        {DEFAULT_ITEMS.map((item, idx) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.05, zIndex: 20 }}
            whileTap={{ scale: 0.98 }}
            className="w-56 h-64 rounded-2xl bg-neutral-900 border border-white/10 overflow-hidden shadow-2xl p-3 flex flex-col justify-between group"
          >
            <div className="w-full h-40 rounded-xl overflow-hidden relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <span className="absolute top-2 right-2 text-[10px] font-mono uppercase bg-black/60 backdrop-blur-md text-white px-2 py-0.5 rounded-md">
                {item.tag}
              </span>
            </div>
            <div>
              <h5 className="text-sm font-semibold text-white tracking-tight">{item.title}</h5>
              <span className="text-[11px] text-neutral-500 font-mono">ID // 00{idx + 1}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

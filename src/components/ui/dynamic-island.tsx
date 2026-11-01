"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, PhoneOff, Music2, BatteryCharging, Sparkles, BellRing } from "lucide-react";
import { cn } from "@/lib/utils";

type IslandState = "compact" | "call" | "music" | "charging";

export function DynamicIsland({ className }: { className?: string }) {
  const [state, setState] = useState<IslandState>("compact");
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className={cn("w-full flex flex-col items-center justify-center py-8", className)}>
      {/* State Switcher Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {(["compact", "call", "music", "charging"] as IslandState[]).map((mode) => (
          <button
            key={mode}
            onClick={() => setState(mode)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-all capitalize",
              state === mode
                ? "bg-white text-black shadow-lg shadow-white/10"
                : "bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700"
            )}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* Island Stage */}
      <div className="relative h-32 flex items-center justify-center w-full">
        <motion.div
          layout
          transition={{
            type: "spring",
            stiffness: 450,
            damping: 32,
            mass: 0.8,
          }}
          className={cn(
            "bg-black border border-neutral-800 text-white shadow-2xl overflow-hidden cursor-pointer flex items-center justify-center",
            state === "compact" && "h-9 w-32 rounded-full px-3 py-1",
            state === "call" && "h-16 w-80 rounded-[28px] px-4 py-2",
            state === "music" && "h-20 w-84 rounded-[32px] px-5 py-3",
            state === "charging" && "h-14 w-72 rounded-[26px] px-4 py-2"
          )}
          onClick={() => {
            const nextStates: Record<IslandState, IslandState> = {
              compact: "music",
              music: "call",
              call: "charging",
              charging: "compact",
            };
            setState(nextStates[state]);
          }}
        >
          <AnimatePresence mode="wait">
            {state === "compact" && (
              <motion.div
                key="compact"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-between w-full"
              >
                <div className="size-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-medium text-neutral-400">AGY Active</span>
                <div className="size-3 rounded-full bg-amber-400/80" />
              </motion.div>
            )}

            {state === "call" && (
              <motion.div
                key="call"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-between w-full"
              >
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-neutral-800 flex items-center justify-center overflow-hidden border border-neutral-700">
                    <span className="text-sm font-semibold">JD</span>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-semibold">John Doe</span>
                    <span className="text-[10px] text-emerald-400 font-mono">01:42 • Connected</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setState("compact");
                    }}
                    className="size-8 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center transition"
                  >
                    <PhoneOff className="size-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {state === "music" && (
              <motion.div
                key="music"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-between w-full gap-3"
              >
                {/* Album Art */}
                <div className="size-12 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-md shrink-0">
                  <Music2 className="size-6 text-white" />
                </div>
                {/* Track Details */}
                <div className="flex flex-col flex-1 min-w-0 text-left">
                  <span className="text-xs font-semibold truncate">Starboy (Acoustic)</span>
                  <span className="text-[11px] text-neutral-400 truncate">The Weeknd</span>
                  {/* Fake Progress */}
                  <div className="w-full h-1 bg-neutral-800 rounded-full mt-1.5 overflow-hidden">
                    <div className="w-2/3 h-full bg-white rounded-full" />
                  </div>
                </div>
                {/* Audio Wave Bars */}
                <div className="flex items-end gap-0.5 h-5 shrink-0 px-1">
                  {[40, 90, 60, 100, 70, 30].map((h, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: isPlaying ? [`${h}%`, `${100 - h}%`, `${h}%`] : "20%" }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                      className="w-1 bg-emerald-400 rounded-full"
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {state === "charging" && (
              <motion.div
                key="charging"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-between w-full"
              >
                <div className="flex items-center gap-2">
                  <BatteryCharging className="size-5 text-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold">Fast Charging</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-emerald-400">89%</span>
                  <div className="w-10 h-2 bg-neutral-800 rounded-full overflow-hidden p-0.5">
                    <div className="w-[89%] h-full bg-emerald-400 rounded-full" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <p className="text-xs text-neutral-500 font-mono mt-2">
        Click island or pills to toggle fluid layout states
      </p>
    </div>
  );
}

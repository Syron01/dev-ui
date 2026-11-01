"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, Terminal, ExternalLink, Sparkles, Code2, Play, RefreshCw } from "lucide-react";
import { ComponentMeta } from "./ComponentCard";

// Real Interactive Components
import { ImageCursorTrail } from "@/components/ui/image-cursor-trail";
import { DynamicIsland } from "@/components/ui/dynamic-island";
import { TikTikColorList } from "@/components/ui/tiktik-color-list";
import { RollingText, RollingButton } from "@/components/ui/rolling-text";
import { CardStackScroll } from "@/components/ui/card-stack-scroll";
import { ThingsDragAndScroll } from "@/components/ui/things-drag-and-scroll";
import {
  ApplePlayButton,
  ThemeToggleButtons,
  HoverMembersShowcase,
  AnimatedCounterNumber,
} from "@/components/ui/extra-interactions";

interface ComponentModalProps {
  item: ComponentMeta | null;
  onClose: () => void;
  onCopyCli: (id: string, e: React.MouseEvent) => void;
  isCopied: boolean;
}

export function ComponentModal({
  item,
  onClose,
  onCopyCli,
  isCopied,
}: ComponentModalProps) {
  const [activeTab, setActiveTab] = useState<"interactive" | "video" | "code">("interactive");

  if (!item) return null;

  const cliCommand = `npx shadcn add @dev-ui/${item.id}`;

  // Map to interactive component if available
  const renderInteractiveComponent = () => {
    switch (item.id) {
      case "dev18":
        return <ImageCursorTrail />;
      case "dev2":
        return <DynamicIsland />;
      case "dev24":
        return <TikTikColorList />;
      case "dev27":
      case "dev58":
        return (
          <div className="flex flex-col items-center justify-center p-12 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-6">
            <RollingText text="HYPERFLUID" />
            <RollingButton label="Hover to Roll" sublabel="Smooth Springs" />
          </div>
        );
      case "dev16":
      case "dev17":
        return <CardStackScroll />;
      case "dev5":
        return <ThingsDragAndScroll />;
      case "dev3":
        return <ApplePlayButton />;
      case "dev4":
      case "dev26":
        return <ThemeToggleButtons />;
      case "dev6":
        return <HoverMembersShowcase />;
      case "dev37":
        return <AnimatedCounterNumber />;
      default:
        // Default interactive playground sandbox with video
        return (
          <div className="flex flex-col items-center justify-center space-y-6 py-6">
            <div className="relative w-full rounded-2xl overflow-hidden bg-black border border-neutral-800 aspect-video flex items-center justify-center shadow-2xl">
              <video
                src={item.video_url}
                autoPlay
                loop
                muted
                playsInline
                controls
                className="w-full h-full object-contain"
              />
            </div>
            <div className="w-full flex items-center justify-between p-4 rounded-xl bg-neutral-900 border border-neutral-800">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs text-neutral-300 font-mono">Live High-Res Video Sandbox</span>
              </div>
              <span className="text-xs font-mono text-neutral-500">60 FPS Motion</span>
            </div>
          </div>
        );
    }
  };

  const sampleSnippet = `// components/ui/${item.id}.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

export function ${item.name.replace(/[^a-zA-Z0-9]/g, "")}() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className="relative rounded-2xl p-6 bg-neutral-900 border border-neutral-800 text-white"
    >
      <h3 className="text-xl font-bold">${item.name}</h3>
      <p className="text-sm text-neutral-400 mt-2">${item.desc}</p>
    </motion.div>
  );
}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
          className="relative z-10 w-full max-w-4xl rounded-3xl bg-[#0c0c0e] border border-neutral-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-4 bg-neutral-950/80">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold uppercase text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-full border border-sky-500/20">
                {item.id}
              </span>
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">{item.name}</h2>
                <p className="text-xs text-neutral-400">{item.collection_name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Tab Selector */}
              <div className="flex bg-neutral-900 rounded-full p-1 border border-neutral-800">
                <button
                  onClick={() => setActiveTab("interactive")}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                    activeTab === "interactive"
                      ? "bg-white text-black font-semibold shadow-md"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  ⚡ Canlı Dene (Playground)
                </button>
                <button
                  onClick={() => setActiveTab("video")}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                    activeTab === "video"
                      ? "bg-white text-black font-semibold shadow-md"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  Video
                </button>
                <button
                  onClick={() => setActiveTab("code")}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                    activeTab === "code"
                      ? "bg-white text-black font-semibold shadow-md"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  Code
                </button>
              </div>

              <button
                onClick={onClose}
                className="size-8 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center transition border border-neutral-800"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {activeTab === "interactive" && (
              <div className="space-y-4">
                <div className="w-full">
                  {renderInteractiveComponent()}
                </div>
                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800/80">
                  <h4 className="text-sm font-semibold text-white">Bileşen Açıklaması</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed mt-1">{item.desc}</p>
                </div>
              </div>
            )}

            {activeTab === "video" && (
              <div className="space-y-4">
                <div className="relative w-full rounded-2xl overflow-hidden bg-black border border-neutral-800 aspect-video flex items-center justify-center shadow-inner">
                  <video
                    src={item.video_url}
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )}

            {activeTab === "code" && (
              <div className="space-y-4">
                <div className="relative rounded-2xl bg-black border border-neutral-800 p-5 font-mono text-xs overflow-x-auto text-emerald-400">
                  <pre>{sampleSnippet}</pre>
                </div>
              </div>
            )}
          </div>

          {/* Footer CLI Bar */}
          <div className="border-t border-neutral-800 px-6 py-4 bg-neutral-950 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-mono text-xs text-neutral-400 bg-neutral-900 px-4 py-2 rounded-xl border border-neutral-800 w-full sm:w-auto">
              <Terminal className="size-3.5 text-sky-400" />
              <span>{cliCommand}</span>
            </div>

            <button
              onClick={(e) => onCopyCli(item.id, e)}
              className="flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition shadow-lg w-full sm:w-auto"
            >
              {isCopied ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
              <span>{isCopied ? "Command Copied!" : "Copy Installation Command"}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

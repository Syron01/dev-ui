"use client";

import React, { useRef, useState, useEffect } from "react";
import { Copy, Check, Terminal, ExternalLink, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ComponentMeta {
  id: string;
  name: string;
  desc: string;
  tier: string;
  collection_name: string;
  theme?: string;
  tags?: string[];
  video_url: string;
  original_id: string;
}

interface ComponentCardProps {
  item: ComponentMeta;
  onOpenModal: (item: ComponentMeta) => void;
  onCopyCli: (id: string, e: React.MouseEvent) => void;
  isCopied: boolean;
}

export function ComponentCard({
  item,
  onOpenModal,
  onCopyCli,
  isCopied,
}: ComponentCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const isLight = item.theme === "light";

  // Try auto-playing video on mount (muted/loop) so user sees animation immediately
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().then(() => {
      setVideoLoaded(true);
    }).catch(() => {
      // Browser autoplay policy might require user interaction or hover
    });
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Keep playing or loop smoothly
  };

  return (
    <div
      onClick={() => onOpenModal(item)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-[26px] p-6 cursor-pointer transition-all duration-300 border h-[300px] select-none hover:scale-[1.01] hover:shadow-2xl hover:shadow-sky-500/10",
        isLight
          ? "bg-[#faf9f6] text-black border-neutral-200/80"
          : "bg-[#0c0c0e] text-white border-neutral-800/80 hover:border-neutral-700"
      )}
    >
      {/* Background Live Continuous Video Preview */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-[26px] bg-black">
        <video
          ref={videoRef}
          src={item.video_url}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          className={cn(
            "h-full w-full object-cover transition-all duration-500",
            videoLoaded ? "opacity-85 group-hover:opacity-100 group-hover:scale-105" : "opacity-0"
          )}
        />
        {/* Soft ambient tint so text is crisp */}
        <div
          className={cn(
            "absolute inset-0 pointer-events-none transition-opacity duration-300",
            isLight
              ? "bg-gradient-to-t from-white/90 via-white/30 to-white/70"
              : "bg-gradient-to-t from-black/90 via-black/40 to-black/70 group-hover:opacity-60"
          )}
        />
      </div>

      {/* Top Bar */}
      <div className="relative z-10 flex items-start justify-between w-full">
        <div className="flex flex-col">
          <span
            className={cn(
              "text-[10px] font-mono tracking-widest uppercase font-bold px-2 py-0.5 rounded-md inline-block w-fit backdrop-blur-md",
              isLight ? "bg-black/10 text-neutral-800" : "bg-white/10 text-neutral-300"
            )}
          >
            {item.id}
          </span>
          <h3
            className={cn(
              "text-lg font-bold tracking-tight mt-1 line-clamp-1 group-hover:text-sky-400 transition-colors drop-shadow-sm",
              isLight ? "text-neutral-900" : "text-white"
            )}
          >
            {item.name}
          </h3>
        </div>

        {/* Live Indicator Pill */}
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-mono text-emerald-400">
          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>LIVE</span>
        </div>
      </div>

      {/* Center Interactive Cue on Hover */}
      <div className="relative z-10 flex items-center justify-center my-auto">
        <div className="px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-xl">
          Click to Test & Inspect ⚡
        </div>
      </div>

      {/* Bottom Bar: Action & Tag */}
      <div className="relative z-10 flex items-center justify-between w-full pt-4">
        <span
          className={cn(
            "text-[11px] font-mono truncate max-w-[170px] drop-shadow-sm",
            isLight ? "text-neutral-600 font-semibold" : "text-neutral-400"
          )}
        >
          {item.collection_name}
        </span>

        <button
          onClick={(e) => onCopyCli(item.id, e)}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 border shadow-lg backdrop-blur-md",
            isCopied
              ? "bg-emerald-500 text-black border-emerald-400 font-semibold"
              : isLight
              ? "bg-black text-white hover:bg-neutral-800 border-black"
              : "bg-black/70 hover:bg-black text-neutral-200 border-white/20"
          )}
        >
          {isCopied ? <Check className="size-3" /> : <Copy className="size-3" />}
          <span>{isCopied ? "Copied" : "Copy CLI"}</span>
        </button>
      </div>
    </div>
  );
}

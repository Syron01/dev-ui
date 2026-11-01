"use client";

import React, { useRef, useState } from "react";
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
  const isLight = item.theme === "light";

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div
      onClick={() => onOpenModal(item)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-[26px] p-6 cursor-pointer transition-all duration-300 border h-[300px] select-none",
        isLight
          ? "bg-[#faf9f6] text-black border-neutral-200/80 hover:shadow-2xl hover:shadow-white/10"
          : "bg-[#0c0c0e] text-white border-neutral-800/80 hover:border-neutral-700"
      )}
    >
      {/* Background Hover Video */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-[26px]">
        <video
          ref={videoRef}
          src={item.video_url}
          muted
          loop
          playsInline
          preload="metadata"
          className={cn(
            "h-full w-full object-cover transition-opacity duration-500",
            isHovered ? "opacity-100 scale-105 transition-transform duration-700" : "opacity-0"
          )}
        />
        {/* Subtle hover gradient overlay */}
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-300 pointer-events-none",
            isHovered ? "opacity-40" : "opacity-0",
            isLight ? "bg-white/40" : "bg-black/50"
          )}
        />
      </div>

      {/* Top Bar of the Card */}
      <div className="relative z-10 flex items-start justify-between w-full">
        <div className="flex flex-col">
          <span
            className={cn(
              "text-[11px] font-mono tracking-wider uppercase font-semibold",
              isLight ? "text-neutral-500" : "text-neutral-400"
            )}
          >
            {item.id}
          </span>
          <h3
            className={cn(
              "text-lg font-bold tracking-tight mt-0.5 line-clamp-1 group-hover:text-sky-400 transition-colors",
              isLight ? "text-neutral-900" : "text-white"
            )}
          >
            {item.name}
          </h3>
        </div>

        {/* Info / Badge button */}
        <div className="flex items-center gap-1.5">
          <div
            className={cn(
              "size-7 rounded-full flex items-center justify-center text-[10px] font-mono uppercase transition-transform group-hover:scale-110",
              isLight
                ? "bg-black/5 text-neutral-800 border border-neutral-300"
                : "bg-white/10 text-neutral-300 border border-white/10"
            )}
          >
            <span className="font-bold">i</span>
          </div>
        </div>
      </div>

      {/* Center Hover Cue (Visible when not hovered) */}
      <div className="relative z-10 flex items-center justify-center my-auto transition-opacity duration-300">
        {!isHovered ? (
          <div
            className={cn(
              "size-10 rounded-full flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl",
              isLight ? "bg-black/80 text-white" : "bg-white/90 text-black"
            )}
          >
            <Play className="size-4 ml-0.5 fill-current" />
          </div>
        ) : null}
      </div>

      {/* Bottom Bar: Action & Tag */}
      <div className="relative z-10 flex items-center justify-between w-full pt-4">
        <span
          className={cn(
            "text-[11px] font-mono truncate max-w-[170px]",
            isLight ? "text-neutral-500" : "text-neutral-500"
          )}
        >
          {item.collection_name}
        </span>

        <button
          onClick={(e) => onCopyCli(item.id, e)}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 border shadow-sm",
            isCopied
              ? "bg-emerald-500 text-black border-emerald-400 font-semibold"
              : isLight
              ? "bg-black text-white hover:bg-neutral-800 border-black"
              : "bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 border-neutral-700/80 backdrop-blur-md"
          )}
        >
          {isCopied ? <Check className="size-3" /> : <Copy className="size-3" />}
          <span>{isCopied ? "Copied" : "Copy CLI"}</span>
        </button>
      </div>
    </div>
  );
}

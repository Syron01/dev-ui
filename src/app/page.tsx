"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Sparkles, Terminal, Layers, ArrowUpRight, Search, Star, ExternalLink, Code2 } from "lucide-react";
import { ImageCursorTrail } from "@/components/ui/image-cursor-trail";
import { DynamicIsland } from "@/components/ui/dynamic-island";
import { TikTikColorList } from "@/components/ui/tiktik-color-list";
import { RollingText, RollingButton } from "@/components/ui/rolling-text";
import { CardStackScroll } from "@/components/ui/card-stack-scroll";
import { ThingsDragAndScroll } from "@/components/ui/things-drag-and-scroll";
import confetti from "canvas-confetti";
import catalogData from "@/data/catalog.json";

interface RegistryMeta {
  id: string;
  name: string;
  desc: string;
  tier: string;
  collection_name: string;
  tags: string[];
}

function GithubIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  );
}

export default function HomePage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const componentsList = catalogData as RegistryMeta[];

  const categories = [
    "all",
    "Scroll Effects",
    "Minimal interactions",
    "Out of the box",
    "Crazy Hover",
    "Crazy Hero",
    "Carousals",
    "Web3 Unlocked",
    "Ai Input",
  ];

  const filteredComponents = componentsList.filter((comp) => {
    const matchesSearch =
      comp.name.toLowerCase().includes(search.toLowerCase()) ||
      comp.desc.toLowerCase().includes(search.toLowerCase()) ||
      comp.tags?.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory =
      selectedCategory === "all" || comp.collection_name === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleCopyCommand = (id: string) => {
    navigator.clipboard.writeText(`npx shadcn add @open-skiper/${id}`);
    setCopiedId(id);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#34d399", "#38bdf8", "#ffffff"],
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-white selection:bg-emerald-500 selection:text-black">
      {/* Top Banner */}
      <div className="w-full bg-gradient-to-r from-emerald-500/20 via-sky-500/20 to-purple-500/20 border-b border-white/10 px-4 py-2 text-center text-xs text-neutral-300 flex items-center justify-center gap-2">
        <Sparkles className="size-3.5 text-emerald-400" />
        <span>
          <strong>100% Free & Open Source Alternative:</strong> All 106 animations, zero paywalls.
        </span>
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="underline text-white font-medium hover:text-emerald-400"
        >
          Star on GitHub
        </a>
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/5 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-xl bg-gradient-to-tr from-emerald-400 to-sky-400 flex items-center justify-center text-black font-black text-sm shadow-lg shadow-emerald-500/20">
            S
          </div>
          <span className="font-bold tracking-tight text-lg">Skiper Open UI</span>
          <span className="text-[10px] font-mono uppercase bg-white/10 text-neutral-400 px-2 py-0.5 rounded-full">
            v1.0.0 OSS
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-6 text-sm text-neutral-400">
            <a href="#showcase" className="hover:text-white transition">Showcase</a>
            <a href="#catalog" className="hover:text-white transition">Full Catalog ({componentsList.length})</a>
            <a href="#installation" className="hover:text-white transition">CLI Setup</a>
          </div>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium border border-white/10 transition"
          >
            <GithubIcon className="size-3.5" />
            <span>GitHub</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-16 max-w-5xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
          <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
          The Un-Common Animated UI Kit
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tighter">
            Elevate interfaces with <br />
            <span className="bg-gradient-to-r from-emerald-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">
              Kinetic Spring Micro-Interactions
            </span>
          </h1>
          <p className="text-neutral-400 max-w-2xl mx-auto text-base md:text-lg pt-2">
            Why pay exorbitant lifetime fees for standard React animations? Built with Next.js, Framer Motion, and Tailwind CSS. Directly copyable, fully typed, and totally libre.
          </p>
        </div>

        {/* Hero Interactive Rolling Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <a href="#catalog">
            <RollingButton label="Browse 106 Components" sublabel="100% Free Forever" />
          </a>
          <button
            onClick={() => handleCopyCommand("init")}
            className="h-12 px-5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 font-mono text-xs flex items-center gap-2 transition"
          >
            <Terminal className="size-4 text-emerald-400" />
            <span>npx shadcn add @open-skiper/core</span>
            <Copy className="size-3.5 opacity-60 ml-1" />
          </button>
        </div>

        {/* Dynamic Island Hero Demo */}
        <div className="pt-6">
          <DynamicIsland />
        </div>
      </section>

      {/* Live Featured Demos Section */}
      <section id="showcase" className="px-6 py-20 max-w-6xl mx-auto space-y-24">
        {/* Demo 1: Image Cursor Trail */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">01 // Crazy Hover</span>
              <h2 className="text-2xl font-bold">Image Cursor Trail (skiper18)</h2>
            </div>
            <button
              onClick={() => handleCopyCommand("skiper18")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/10 hover:border-white/30 text-xs font-mono transition"
            >
              {copiedId === "skiper18" ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
              <span>{copiedId === "skiper18" ? "Copied CLI" : "Copy Component"}</span>
            </button>
          </div>
          <ImageCursorTrail />
        </div>

        {/* Demo 2: TikTik Color List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">02 // Out of the Box</span>
              <h2 className="text-2xl font-bold">TikTik Color Reactive Archive (skiper24)</h2>
            </div>
            <button
              onClick={() => handleCopyCommand("skiper24")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/10 hover:border-white/30 text-xs font-mono transition"
            >
              {copiedId === "skiper24" ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
              <span>{copiedId === "skiper24" ? "Copied CLI" : "Copy Component"}</span>
            </button>
          </div>
          <TikTikColorList />
        </div>

        {/* Demo 3: Things Drag and Scroll Canvas */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">03 // Momentum Physics</span>
              <h2 className="text-2xl font-bold">Infinite Draggable Physics Canvas (skiper5)</h2>
            </div>
            <button
              onClick={() => handleCopyCommand("skiper5")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/10 hover:border-white/30 text-xs font-mono transition"
            >
              {copiedId === "skiper5" ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
              <span>{copiedId === "skiper5" ? "Copied CLI" : "Copy Component"}</span>
            </button>
          </div>
          <ThingsDragAndScroll />
        </div>

        {/* Demo 4: Card Stack Scroll */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">04 // Scroll Effects</span>
              <h2 className="text-2xl font-bold">Sticky Card Stacking Engine (skiper16)</h2>
            </div>
            <button
              onClick={() => handleCopyCommand("skiper16")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/10 hover:border-white/30 text-xs font-mono transition"
            >
              {copiedId === "skiper16" ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
              <span>{copiedId === "skiper16" ? "Copied CLI" : "Copy Component"}</span>
            </button>
          </div>
          <CardStackScroll />
        </div>
      </section>

      {/* Catalog & Filter Explorer */}
      <section id="catalog" className="px-6 py-20 max-w-7xl mx-auto border-t border-white/10 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">Open Catalog</span>
            <h2 className="text-3xl font-extrabold tracking-tight mt-1">
              Explore All {componentsList.length} Components
            </h2>
            <p className="text-neutral-400 text-sm mt-1">
              Every single component indexed, analyzed, and ready for drop-in integration.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-3 size-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Search components or tags..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-neutral-900 border border-white/10 text-sm focus:outline-none focus:border-emerald-500 transition"
            />
          </div>
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all ${
                selectedCategory === cat
                  ? "bg-white text-black shadow-md"
                  : "bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800"
              }`}
            >
              {cat === "all" ? `All Components (${componentsList.length})` : cat}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
          {filteredComponents.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-[#0f0f13] border border-white/5 hover:border-white/20 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-mono text-neutral-500">{item.id}</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] uppercase font-mono">
                    Free / Libre
                  </span>
                </div>
                <h4 className="text-base font-semibold group-hover:text-emerald-400 transition-colors">
                  {item.name}
                </h4>
                <p className="text-xs text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] font-mono text-neutral-500">
                  {item.collection_name}
                </span>
                <button
                  onClick={() => handleCopyCommand(item.id)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-[11px] font-mono text-neutral-300 transition"
                >
                  {copiedId === item.id ? (
                    <Check className="size-3 text-emerald-400" />
                  ) : (
                    <Copy className="size-3" />
                  )}
                  <span>{copiedId === item.id ? "Copied" : "Copy Code"}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
        <div>
          <span>Skiper Open UI — An open-source contribution for the creative developer community.</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition">
            GitHub Repository
          </a>
          <a href="#showcase" className="hover:text-white transition">
            Interactive Demos
          </a>
        </div>
      </footer>
    </div>
  );
}

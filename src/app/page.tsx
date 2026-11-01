"use client";

import React, { useState, useMemo } from "react";
import { Search, Copy, Check, Terminal, Sparkles, Code2, ArrowUpRight } from "lucide-react";
import confetti from "canvas-confetti";
import catalogData from "@/data/catalog.json";
import { ComponentCard, ComponentMeta } from "@/components/ComponentCard";
import { ComponentModal } from "@/components/ComponentModal";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedComponent, setSelectedComponent] = useState<ComponentMeta | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const rawList = catalogData as ComponentMeta[];

  // Group components by collection
  const collections = useMemo(() => {
    const map = new Map<string, ComponentMeta[]>();
    for (const item of rawList) {
      const col = item.collection_name;
      if (!map.has(col)) {
        map.set(col, []);
      }
      map.get(col)!.push(item);
    }
    return map;
  }, [rawList]);

  // Available category tabs
  const categoryNames = useMemo(() => {
    return ["all", ...Array.from(collections.keys())];
  }, [collections]);

  // Filter logic
  const filteredCollections = useMemo(() => {
    const result: { name: string; items: ComponentMeta[] }[] = [];
    const q = search.toLowerCase().trim();

    collections.forEach((items, colName) => {
      if (selectedCategory !== "all" && selectedCategory !== colName) {
        return;
      }

      const matched = items.filter((item) => {
        if (!q) return true;
        return (
          item.name.toLowerCase().includes(q) ||
          item.id.toLowerCase().includes(q) ||
          item.desc.toLowerCase().includes(q) ||
          item.tags?.some((t) => t.toLowerCase().includes(q))
        );
      });

      if (matched.length > 0) {
        result.push({ name: colName, items: matched });
      }
    });

    return result;
  }, [collections, selectedCategory, search]);

  const handleCopyCli = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(`npx shadcn add @dev-ui/${id}`);
    setCopiedId(id);
    confetti({
      particleCount: 35,
      spread: 55,
      origin: { y: 0.8 },
      colors: ["#38bdf8", "#ffffff", "#818cf8"],
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white relative flex flex-col items-center selection:bg-white selection:text-black">
      {/* Floating Dynamic Top Pill Navbar */}
      <header className="fixed top-6 z-40 flex items-center justify-between px-6 py-2.5 rounded-full bg-[#111113]/90 border border-white/10 backdrop-blur-xl shadow-2xl w-[90%] max-w-xl">
        <div className="flex items-center gap-3">
          <div className="size-6 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-600 flex items-center justify-center shadow-md">
            <div className="size-2 rounded-full bg-white animate-pulse" />
          </div>
          <span className="font-bold text-sm tracking-widest text-white">DEV-UI</span>
        </div>

        <nav className="flex items-center gap-5 text-xs text-neutral-400 font-medium">
          <a href="#components" className="hover:text-white transition">Components</a>
          <a href="https://github.com/theayzek01" target="_blank" rel="noreferrer" className="hover:text-white transition">GitHub</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative w-full min-h-[92vh] flex flex-col items-center justify-center px-4 pt-24 text-center overflow-hidden">
        {/* Background Atmospheric Radial Mesh Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-gradient-to-tr from-sky-600/25 via-indigo-600/20 to-transparent blur-[140px] pointer-events-none -z-10 rounded-full" />

        <div className="space-y-6 max-w-4xl mx-auto flex flex-col items-center">
          <span className="text-xs uppercase tracking-[0.3em] text-neutral-400 font-mono font-medium">
            DEV UI'S
          </span>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight uppercase leading-[0.95] text-white">
            UN-COMMON <br />
            COMPONENTS
          </h1>

          <p className="text-sm md:text-base uppercase tracking-[0.25em] text-neutral-400 font-medium pt-2">
            FOR SHADCN/UI
          </p>

          {/* Quick Start & CLI Box */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-3">
            <div
              onClick={() => handleCopyCli("dev40")}
              className="group flex items-center gap-3 px-5 py-3 rounded-full bg-neutral-900/90 border border-neutral-800 text-xs font-mono text-neutral-300 hover:border-neutral-600 cursor-pointer transition shadow-lg backdrop-blur-md"
            >
              <span>npx shadcn add @dev-ui/dev40</span>
              <Copy className="size-3.5 text-neutral-500 group-hover:text-white transition" />
            </div>

            <a
              href="#components"
              className="px-6 py-3 rounded-full bg-sky-500 hover:bg-sky-400 text-black font-semibold text-xs transition shadow-lg shadow-sky-500/20 flex items-center gap-1.5"
            >
              <span>Explore Catalog</span>
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Components Catalog Section */}
      <section id="components" className="w-full max-w-7xl px-4 md:px-10 py-16 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
            106+ Outstanding components
          </h2>
          <p className="text-sm md:text-base text-neutral-400">
            No extra packages — just one file for each component, use directly with your fav ShadCN CLI.
          </p>
        </div>

        {/* Filter Pills & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-b border-neutral-900 pb-6">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categoryNames.slice(0, 8).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-white text-black shadow-lg"
                    : "bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800"
                }`}
              >
                {cat === "all" ? `All (${rawList.length})` : cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-2.5 size-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Search components..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-neutral-600 transition"
            />
          </div>
        </div>

        {/* Component Grids Grouped by Category */}
        <div className="space-y-16">
          {filteredCollections.map((group) => (
            <div key={group.name} className="space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
                <h3 className="text-xl font-bold tracking-tight text-neutral-200">
                  {group.name}
                </h3>
                <span className="text-xs font-mono text-neutral-500">
                  {group.items.length} items
                </span>
              </div>

              {/* Grid of Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.items.map((item) => (
                  <ComponentCard
                    key={item.id}
                    item={item}
                    onOpenModal={(comp) => setSelectedComponent(comp)}
                    onCopyCli={(id, e) => handleCopyCli(id, e)}
                    isCopied={copiedId === item.id}
                  />
                ))}
              </div>
            </div>
          ))}

          {filteredCollections.length === 0 && (
            <div className="text-center py-20 space-y-2">
              <p className="text-lg font-semibold text-neutral-400">
                No components found matching your query.
              </p>
              <p className="text-xs text-neutral-600 font-mono">
                Try searching another keyword or select "All".
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Component Detail Modal */}
      <ComponentModal
        item={selectedComponent}
        onClose={() => setSelectedComponent(null)}
        onCopyCli={(id, e) => handleCopyCli(id, e)}
        isCopied={copiedId === selectedComponent?.id}
      />

      {/* Footer */}
      <footer className="w-full border-t border-neutral-900 py-12 px-6 mt-20 text-center text-xs text-neutral-600">
        <p>DEV UI — Open Source Un-Common Animated UI Components. 100% Free Forever.</p>
      </footer>
    </div>
  );
}

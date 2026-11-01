"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, Terminal, ExternalLink, Sparkles, Code2 } from "lucide-react";
import { ComponentMeta } from "./ComponentCard";

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
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  if (!item) return null;

  const cliCommand = `npx shadcn add @dev-ui/${item.id}`;

  const sampleSnippet = `// components/ui/${item.id}.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

export function ${item.name.replace(/[^a-zA-Z0-9]/g, "")}() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="relative z-10 w-full max-w-4xl rounded-3xl bg-[#0c0c0e] border border-neutral-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold uppercase text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-full border border-sky-500/20">
                {item.id}
              </span>
              <div>
                <h2 className="text-lg font-bold text-white">{item.name}</h2>
                <p className="text-xs text-neutral-400">{item.collection_name}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Tab Selector */}
              <div className="flex bg-neutral-900 rounded-full p-1 border border-neutral-800 mr-2">
                <button
                  onClick={() => setActiveTab("preview")}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                    activeTab === "preview"
                      ? "bg-white text-black font-semibold"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  Preview
                </button>
                <button
                  onClick={() => setActiveTab("code")}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                    activeTab === "code"
                      ? "bg-white text-black font-semibold"
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

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {activeTab === "preview" ? (
              <div className="space-y-4">
                {/* Video Player */}
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

                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800/80 space-y-2">
                  <h4 className="text-sm font-semibold text-white">Component Description</h4>
                  <p className="text-sm text-neutral-300 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative rounded-2xl bg-black border border-neutral-800 p-4 font-mono text-xs overflow-x-auto text-emerald-400">
                  <pre>{sampleSnippet}</pre>
                </div>
              </div>
            )}
          </div>

          {/* Footer CLI Bar */}
          <div className="border-t border-neutral-800 px-6 py-4 bg-neutral-950/80 flex flex-col sm:flex-row items-center justify-between gap-3">
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

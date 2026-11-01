"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface StackCard {
  title: string;
  description: string;
  color: string;
  tag: string;
  image: string;
}

const DEFAULT_STACK_CARDS: StackCard[] = [
  {
    title: "Ultra Precision Springs",
    description: "Calculated with exact mass, damping, and stiffness ratios for that organic, tactile feel.",
    color: "from-blue-600 to-indigo-900",
    tag: "Physics Engine",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
  },
  {
    title: "Zero-Dependency Footprint",
    description: "No bloatware, no heavy native runtimes. Pure modern CSS variables and Tailwind utilities.",
    color: "from-emerald-600 to-teal-900",
    tag: "Architecture",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop&q=80",
  },
  {
    title: "Shadcn Compatible Registry",
    description: "Copy-paste or pull straight via CLI into your codebase with full TypeScript intellisense.",
    color: "from-amber-600 to-orange-950",
    tag: "Developer Experience",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
  },
  {
    title: "100% Free & Open Source",
    description: "Built for engineers and creators without paywalls or expensive lifetime subscriptions.",
    color: "from-purple-600 to-pink-950",
    tag: "Community",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
  },
];

export function CardStackScroll({
  cards = DEFAULT_STACK_CARDS,
  className,
}: {
  cards?: StackCard[];
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className={cn("relative py-12 flex flex-col items-center", className)}>
      <div className="w-full max-w-3xl space-y-8">
        {cards.map((card, i) => {
          return (
            <CardItem
              key={card.title}
              card={card}
              index={i}
              total={cards.length}
            />
          );
        })}
      </div>
    </div>
  );
}

function CardItem({
  card,
  index,
  total,
}: {
  card: StackCard;
  index: number;
  total: number;
}) {
  return (
    <div
      style={{
        top: `calc(120px + ${index * 32}px)`,
      }}
      className="sticky w-full rounded-3xl p-8 bg-[#131317] border border-white/10 shadow-2xl backdrop-blur-xl overflow-hidden group hover:border-white/20 transition-colors"
    >
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="flex-1 text-left space-y-3">
          <span className="text-xs uppercase font-mono tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            {card.tag}
          </span>
          <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            {card.title}
          </h3>
          <p className="text-sm md:text-base text-neutral-400 max-w-md">
            {card.description}
          </p>
        </div>

        <div className="w-full md:w-64 h-44 rounded-2xl overflow-hidden relative border border-white/10 shrink-0">
          <div className={cn("absolute inset-0 bg-gradient-to-tr opacity-40", card.color)} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </div>
  );
}

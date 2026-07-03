"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import type { HomeCategoryItem } from "@/lib/pages/home";

type CategoryGridProps = {
  categories: HomeCategoryItem[];
};

export default function CategoryGrid({ categories }: CategoryGridProps) {
  const defaultIndex = Math.min(1, Math.max(0, categories.length - 1));
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(defaultIndex);

  return (
    <section className="relative min-h-[400px] w-full overflow-hidden lg:h-[900px]">
      {/* Background images - stacked, visibility controlled by hover */}
      {categories.map((cat, index) => (
        <div
          key={cat.title}
          className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: hoveredIndex === index ? 1 : 0 }}
        >
          <Image
            src={cat.image}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 25vw"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      {/* Grid columns */}
      <div className="relative grid h-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat, index) => (
          <div
            key={cat.title}
            className="group relative flex min-h-[250px] flex-col items-center justify-between py-8 sm:min-h-[350px] sm:py-10 lg:min-h-0 lg:py-10"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(defaultIndex)}
          >
            {/* Vertical divider line - only on desktop */}
            {index > 0 && (
              <div className="absolute left-0 top-0 hidden h-full w-px bg-white/20 lg:block" />
            )}

            {/* Category title */}
            <p
              className="text-center text-lg font-medium tracking-[0.48px] text-white sm:text-xl lg:text-2xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {cat.title}
            </p>

            {/* Explore button */}
            <Link
              href={cat.href}
              className="flex items-center gap-2.5 rounded-[100px] border border-white bg-white/5 px-8 py-3 text-lg text-white transition-all duration-300 hover:bg-white/15 sm:px-12 sm:py-4 sm:text-xl"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <span>Explore</span>
              <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-white/50">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M3.33334 8H12.6667M12.6667 8L8.00001 3.33334M12.6667 8L8.00001 12.6667"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

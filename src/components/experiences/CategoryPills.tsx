"use client";

import type { ExperienceCategory } from "@/lib/pages/experiences";

type CategoryPillsProps = {
  categories: ExperienceCategory[];
  activeIndex: number;
};

function scrollToCategory(slug: string) {
  const target = document.getElementById(slug);
  if (!target) {
    return;
  }

  target.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.pushState(null, "", `#${slug}`);
}

export default function CategoryPills({
  categories,
  activeIndex,
}: CategoryPillsProps) {
  return (
    <div className="scrollbar-thin -mx-6 overflow-x-auto px-6 pb-3 md:mx-0 md:overflow-visible md:px-0 md:pb-0">
      <div className="flex w-max items-center gap-3 md:w-auto md:gap-6">
        {categories.map((category, index) => {
          const isActive = index === activeIndex;

          return (
            <a
              key={category.slug}
              href={`#${category.slug}`}
              onClick={(event) => {
                event.preventDefault();
                scrollToCategory(category.slug);
              }}
              className={`shrink-0 rounded-[100px] px-4 py-2 text-sm tracking-[0.4px] transition-all md:px-6 md:py-3 md:text-[20px] ${
                isActive
                  ? "border border-white bg-[rgba(255,255,255,0.04)] font-medium text-white"
                  : "font-normal text-white/80 hover:text-white"
              }`}
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {category.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}

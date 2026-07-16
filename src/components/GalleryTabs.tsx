"use client";

import { useState } from "react";
import Image from "next/image";

import type { GalleryCategoryData, GallerySet } from "@/lib/gallery";

function GalleryGrid({ set }: { set: GallerySet }) {
  const [row1, row2, row3] = set.rows;

  return (
    <div className="flex flex-col gap-3 md:gap-4">
      <div className="flex flex-col gap-3 md:flex-row md:gap-4">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[12px] md:aspect-[870/500] md:w-[65.5%] md:rounded-[20px]">
          <Image
            src={row1[0].src}
            alt={row1[0].alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 65vw"
          />
          <div className="absolute inset-0 bg-black/15" />
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[12px] md:aspect-[442/500] md:flex-1 md:rounded-[20px]">
          <Image
            src={row1[1].src}
            alt={row1[1].alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/15" />
        </div>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:gap-4">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[12px] md:aspect-[442/500] md:w-[33.3%] md:rounded-[20px]">
          <Image
            src={row2[0].src}
            alt={row2[0].alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/15" />
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[12px] md:aspect-[412/500] md:w-[31%] md:rounded-[20px]">
          <Image
            src={row2[1].src}
            alt={row2[1].alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 31vw"
          />
          <div className="absolute inset-0 bg-black/15" />
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[12px] md:aspect-[442/500] md:flex-1 md:rounded-[20px]">
          <Image
            src={row2[2].src}
            alt={row2[2].alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/15" />
        </div>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:gap-4">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[12px] md:aspect-[442/500] md:w-[33.3%] md:rounded-[20px]">
          <Image
            src={row3[0].src}
            alt={row3[0].alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/15" />
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[12px] md:aspect-[870/500] md:flex-1 md:rounded-[20px]">
          <Image
            src={row3[1].src}
            alt={row3[1].alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 65vw"
          />
          <div className="absolute inset-0 bg-black/15" />
        </div>
      </div>
    </div>
  );
}

type GalleryTabsProps = {
  categories: GalleryCategoryData[];
};

export default function GalleryTabs({ categories }: GalleryTabsProps) {
  const [activeTab, setActiveTab] = useState(categories[0]?.name ?? "");
  const activeCategory = categories.find((category) => category.name === activeTab);
  const set = activeCategory?.set;

  if (categories.length === 0) {
    return null;
  }

  return (
    <>
      <section className="bg-white px-4 pt-12 pb-0 md:px-10 md:pt-24 lg:px-14">
        <div className="scrollbar-thin flex h-12 items-center overflow-x-auto rounded-[100px] bg-[#f6f6f6] md:h-14 md:overflow-visible">
          {categories.map((category) => (
            <button
              key={category.slug}
              onClick={() => setActiveTab(category.name)}
              className={`flex h-full shrink-0 flex-1 items-center justify-center px-4 text-sm transition-colors duration-150 md:px-0 md:text-base ${
                category.name === activeTab
                  ? "rounded-[100px] bg-rust font-medium text-white"
                  : "font-normal text-ink hover:text-rust"
              } ${category.name !== categories[0]?.name && category.name !== activeTab ? "border-l border-[#e6e6e6]" : ""}`}
              style={{ fontFamily: "var(--font-body)" }}
            >
              {category.name}
            </button>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 pt-6 pb-16 md:px-10 md:pt-8 md:pb-32 lg:px-14">
        {set ? (
          <GalleryGrid key={activeCategory?.slug ?? activeTab} set={set} />
        ) : (
          <div className="flex flex-col gap-3 md:gap-4">
            {[1, 2, 3].map((row) => (
              <div key={row} className="flex flex-col gap-3 md:flex-row md:gap-4">
                <div className="aspect-[4/3] w-full rounded-[12px] bg-teal/10 md:aspect-[870/500] md:w-[65.5%] md:rounded-[20px]" />
                <div className="aspect-[4/3] w-full rounded-[12px] bg-teal/5 md:aspect-[442/500] md:flex-1 md:rounded-[20px]" />
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";

import ParallaxImages from "@/components/ParallaxImages";
import type { GalleryCategoryData, GallerySet } from "@/lib/gallery";

function GalleryTile({
  src,
  alt,
  sizes,
  className,
  revealIndex,
}: {
  src: string;
  alt: string;
  sizes: string;
  className: string;
  revealIndex: number;
}) {
  return (
    <div
      className={`group relative overflow-hidden ${className}`}
      style={{ animationDelay: `${revealIndex * 70}ms` }}
      data-gallery-tile
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        sizes={sizes}
        data-gallery-media
      />
      <div className="absolute inset-0 bg-black/15 transition-colors duration-500 group-hover:bg-black/30" />
    </div>
  );
}

function GalleryGrid({ set }: { set: GallerySet }) {
  const [row1, row2, row3] = set.rows;
  const [a, b] = row1;
  const [c, d, e] = row2;
  const [f, g] = row3;

  return (
    <ParallaxImages
      selector="[data-gallery-media]"
      range={6}
      className="gallery-grid-enter flex flex-col gap-3 md:gap-4"
    >
      <div className="flex flex-col gap-3 md:flex-row md:gap-4">
        <GalleryTile
          src={a.src}
          alt={a.alt}
          sizes="(max-width: 768px) 100vw, 65vw"
          className="aspect-[4/3] w-full rounded-[12px] md:aspect-[870/500] md:w-[65.5%] md:rounded-[20px]"
          revealIndex={0}
        />
        <GalleryTile
          src={b.src}
          alt={b.alt}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="aspect-[4/3] w-full rounded-[12px] md:aspect-[442/500] md:flex-1 md:rounded-[20px]"
          revealIndex={1}
        />
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:gap-4">
        <GalleryTile
          src={c.src}
          alt={c.alt}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="aspect-[4/3] w-full rounded-[12px] md:aspect-[442/500] md:w-[33.3%] md:rounded-[20px]"
          revealIndex={2}
        />
        <GalleryTile
          src={d.src}
          alt={d.alt}
          sizes="(max-width: 768px) 100vw, 31vw"
          className="aspect-[4/3] w-full rounded-[12px] md:aspect-[412/500] md:w-[31%] md:rounded-[20px]"
          revealIndex={3}
        />
        <GalleryTile
          src={e.src}
          alt={e.alt}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="aspect-[4/3] w-full rounded-[12px] md:aspect-[442/500] md:flex-1 md:rounded-[20px]"
          revealIndex={4}
        />
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:gap-4">
        <GalleryTile
          src={f.src}
          alt={f.alt}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="aspect-[4/3] w-full rounded-[12px] md:aspect-[442/500] md:w-[33.3%] md:rounded-[20px]"
          revealIndex={5}
        />
        <GalleryTile
          src={g.src}
          alt={g.alt}
          sizes="(max-width: 768px) 100vw, 65vw"
          className="aspect-[4/3] w-full rounded-[12px] md:aspect-[870/500] md:flex-1 md:rounded-[20px]"
          revealIndex={6}
        />
      </div>
    </ParallaxImages>
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

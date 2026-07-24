"use client";

import { gsap } from "gsap";
import { useRef, useState, type MouseEvent } from "react";
import Image from "next/image";

import GalleryLightbox from "@/components/GalleryLightbox";
import MagneticButton from "@/components/MagneticButton";
import ParallaxImages from "@/components/ParallaxImages";
import {
  flattenGallerySet,
  type GalleryCategoryData,
  type GalleryImage,
  type GallerySet,
} from "@/lib/gallery";

function GalleryTile({
  src,
  alt,
  sizes,
  className,
  revealIndex,
  onOpen,
}: {
  src: string;
  alt: string;
  sizes: string;
  className: string;
  revealIndex: number;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const quickRotateX = useRef<((value: number) => void) | null>(null);
  const quickRotateY = useRef<((value: number) => void) | null>(null);

  const handleMouseMove = (event: MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;

    gsap.set(el, { transformPerspective: 600 });
    quickRotateY.current ??= gsap.quickTo(el, "rotationY", { duration: 0.4, ease: "power3.out" });
    quickRotateX.current ??= gsap.quickTo(el, "rotationX", { duration: 0.4, ease: "power3.out" });

    quickRotateY.current(px * 10);
    quickRotateX.current(-py * 10);
  };

  const handleMouseLeave = () => {
    quickRotateX.current?.(0);
    quickRotateY.current?.(0);
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={onOpen}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label={`View ${alt} full-size`}
      className={`group relative block cursor-pointer overflow-hidden border-0 p-0 ${className}`}
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
    </button>
  );
}

// Row-size rhythm this repeats every 3 rows: [wide|narrow] → [thirds] →
// [narrow|wide] — mirrors the original fixed 7-image design across any count.
function GalleryRow({
  row,
  cyclePosition,
  startIndex,
  onOpen,
}: {
  row: GalleryImage[];
  cyclePosition: number;
  startIndex: number;
  onOpen: (index: number) => void;
}) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:gap-4">
      {row.map((image, i) => {
        const globalIndex = startIndex + i;
        const wideIsFirst = cyclePosition !== 2;
        const isWide = row.length === 2 && (i === 0) === wideIsFirst;

        return (
          <GalleryTile
            key={image.src}
            src={image.src}
            alt={image.alt}
            sizes={
              row.length <= 2
                ? "(max-width: 768px) 100vw, 60vw"
                : "(max-width: 768px) 100vw, 33vw"
            }
            className={`aspect-[4/3] w-full rounded-[12px] md:rounded-[20px] ${
              isWide ? "md:w-[65%]" : "md:flex-1"
            }`}
            revealIndex={globalIndex}
            onOpen={() => onOpen(globalIndex)}
          />
        );
      })}
    </div>
  );
}

function GalleryGrid({
  set,
  onOpen,
}: {
  set: GallerySet;
  onOpen: (index: number) => void;
}) {
  const startIndices = set.rows.reduce<number[]>((acc, row, rowIndex) => {
    const previous = rowIndex === 0 ? 0 : acc[rowIndex - 1] + set.rows[rowIndex - 1].length;
    acc.push(previous);
    return acc;
  }, []);

  return (
    <ParallaxImages
      selector="[data-gallery-media]"
      range={6}
      className="gallery-grid-enter flex flex-col gap-3 md:gap-4"
    >
      {set.rows.map((row, rowIndex) => (
        <GalleryRow
          key={startIndices[rowIndex]}
          row={row}
          cyclePosition={rowIndex % 3}
          startIndex={startIndices[rowIndex]}
          onOpen={onOpen}
        />
      ))}
    </ParallaxImages>
  );
}

type GalleryTabsProps = {
  categories: GalleryCategoryData[];
};

export default function GalleryTabs({ categories }: GalleryTabsProps) {
  const [activeTab, setActiveTab] = useState(categories[0]?.name ?? "");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const activeCategory = categories.find((category) => category.name === activeTab);
  const set = activeCategory?.set;
  const images = set ? flattenGallerySet(set) : [];

  if (categories.length === 0) {
    return null;
  }

  const handleTabClick = (categoryName: string) => {
    if (categoryName === activeTab) {
      return;
    }

    setLightboxIndex(null);

    const currentGrid =
      gridContainerRef.current?.querySelector<HTMLElement>(".gallery-grid-enter");

    if (!currentGrid || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActiveTab(categoryName);
      return;
    }

    gsap.to(currentGrid, {
      opacity: 0,
      y: 12,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => setActiveTab(categoryName),
    });
  };

  return (
    <>
      <section className="bg-white px-4 pt-12 pb-0 md:px-10 md:pt-24 lg:px-14">
        <div className="scrollbar-thin flex h-12 items-center overflow-x-auto rounded-[100px] bg-[#f6f6f6] md:h-14 md:overflow-visible">
          {categories.map((category) => (
            <MagneticButton
              key={category.slug}
              strength={0.15}
              onClick={() => handleTabClick(category.name)}
              className={`flex h-full shrink-0 flex-1 items-center justify-center px-4 text-sm transition-colors duration-150 md:px-0 md:text-base ${
                category.name === activeTab
                  ? "rounded-[100px] bg-rust font-medium text-white"
                  : "font-normal text-ink hover:text-rust"
              } ${category.name !== categories[0]?.name && category.name !== activeTab ? "border-l border-[#e6e6e6]" : ""}`}
              style={{ fontFamily: "var(--font-body)" }}
            >
              {category.name}
            </MagneticButton>
          ))}
        </div>
      </section>

      <section
        ref={gridContainerRef}
        className="bg-white px-4 pt-6 pb-16 md:px-10 md:pt-8 md:pb-32 lg:px-14"
      >
        {set ? (
          <>
            <p
              className="mb-4 text-sm text-subtext md:mb-6"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {images.length} photos
            </p>
            <GalleryGrid
              key={activeCategory?.slug ?? activeTab}
              set={set}
              onOpen={setLightboxIndex}
            />
          </>
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

      {lightboxIndex !== null ? (
        <GalleryLightbox
          images={images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      ) : null}
    </>
  );
}

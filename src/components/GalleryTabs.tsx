"use client";

import { useState } from "react";
import Image from "next/image";

type GalleryImage = { src: string; alt: string };
type GalleryRow = GalleryImage[];

interface GallerySet {
  rows: [GalleryRow, GalleryRow, GalleryRow];
}

const tabs = [
  "Events & Celebrations",
  "Pool",
  "Food & Nightlife",
  "Games",
  "Outdoor",
];

// Each set: 3 rows → [wide+narrow], [narrow+medium+narrow], [narrow+wide]
const gallerySets: Record<string, GallerySet> = {
  "Events & Celebrations": {
    rows: [
      [
        { src: "/assets/gallery/events/1.jpg", alt: "Stage performance" },
        { src: "/assets/gallery/events/2.jpg", alt: "Event guests" },
      ],
      [
        { src: "/assets/gallery/events/3.jpg", alt: "Family gathering" },
        { src: "/assets/gallery/events/4.jpg", alt: "Star decoration" },
        { src: "/assets/gallery/events/5.jpg", alt: "Event setup" },
      ],
      [
        { src: "/assets/gallery/events/6.jpg", alt: "Outdoor dining" },
        { src: "/assets/gallery/events/7.jpg", alt: "Camping at night" },
      ],
    ],
  },
  Pool: {
    rows: [
      [
        { src: "/assets/gallery/pool/1.jpg", alt: "Pool area overview" },
        { src: "/assets/gallery/pool/2.jpg", alt: "Covered seating" },
      ],
      [
        { src: "/assets/gallery/pool/3.jpg", alt: "Pool view" },
        { src: "/assets/gallery/pool/4.jpg", alt: "Poolside lounge" },
        { src: "/assets/gallery/pool/5.jpg", alt: "Green roof structure" },
      ],
      [
        { src: "/assets/gallery/pool/6.jpg", alt: "Pool and jacuzzi" },
        { src: "/assets/gallery/pool/7.jpg", alt: "Main building" },
      ],
    ],
  },
  "Food & Nightlife": {
    rows: [
      [
        { src: "/assets/gallery/food/1.jpg", alt: "Restaurant interior" },
        { src: "/assets/gallery/food/2.jpg", alt: "Bar seating" },
      ],
      [
        { src: "/assets/gallery/food/3.jpg", alt: "Drinks display" },
        { src: "/assets/gallery/food/4.jpg", alt: "Ambient lighting" },
        { src: "/assets/gallery/food/5.jpg", alt: "Wall mural" },
      ],
      [
        { src: "/assets/gallery/food/6.jpg", alt: "Grilled dishes" },
        { src: "/assets/gallery/food/7.jpg", alt: "Wine collection" },
      ],
    ],
  },
  Games: {
    rows: [
      [
        { src: "/assets/gallery/games/1.jpg", alt: "Game room" },
        { src: "/assets/gallery/games/2.jpg", alt: "Football field" },
      ],
      [
        { src: "/assets/gallery/games/3.jpg", alt: "Outdoor swings" },
        { src: "/assets/gallery/games/4.jpg", alt: "Soccer pitch" },
        { src: "/assets/gallery/games/5.jpg", alt: "Kids playground" },
      ],
      [
        { src: "/assets/gallery/games/6.jpg", alt: "Playground equipment" },
        { src: "/assets/gallery/games/7.jpg", alt: "Kids vehicles" },
      ],
    ],
  },
  Outdoor: {
    rows: [
      [
        { src: "/assets/gallery/outdoor/1.jpg", alt: "Main building exterior" },
        { src: "/assets/gallery/outdoor/2.jpg", alt: "Outdoor seating" },
      ],
      [
        { src: "/assets/gallery/outdoor/3.jpg", alt: "Colorful staircase" },
        { src: "/assets/gallery/outdoor/4.jpg", alt: "Garden walkway" },
        { src: "/assets/gallery/outdoor/5.jpg", alt: "Gazebo shelters" },
      ],
      [
        { src: "/assets/gallery/outdoor/6.jpg", alt: "Covered dining area" },
        { src: "/assets/gallery/outdoor/7.jpg", alt: "Restaurant terrace" },
      ],
    ],
  },
};

function GalleryGrid({ set }: { set: GallerySet }) {
  const [row1, row2, row3] = set.rows;
  return (
    <div className="flex flex-col gap-3 md:gap-4">
      {/* Row 1 — stacked on mobile, wide + narrow on desktop */}
      <div className="flex flex-col gap-3 md:flex-row md:gap-4">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[12px] md:aspect-[870/500] md:w-[65.5%] md:rounded-[20px]">
          <Image src={row1[0].src} alt={row1[0].alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 65vw" />
          <div className="absolute inset-0 bg-black/15" />
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[12px] md:aspect-[442/500] md:flex-1 md:rounded-[20px]">
          <Image src={row1[1].src} alt={row1[1].alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
          <div className="absolute inset-0 bg-black/15" />
        </div>
      </div>

      {/* Row 2 — stacked on mobile, three columns on desktop */}
      <div className="flex flex-col gap-3 md:flex-row md:gap-4">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[12px] md:aspect-[442/500] md:w-[33.3%] md:rounded-[20px]">
          <Image src={row2[0].src} alt={row2[0].alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
          <div className="absolute inset-0 bg-black/15" />
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[12px] md:aspect-[412/500] md:w-[31%] md:rounded-[20px]">
          <Image src={row2[1].src} alt={row2[1].alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 31vw" />
          <div className="absolute inset-0 bg-black/15" />
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[12px] md:aspect-[442/500] md:flex-1 md:rounded-[20px]">
          <Image src={row2[2].src} alt={row2[2].alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
          <div className="absolute inset-0 bg-black/15" />
        </div>
      </div>

      {/* Row 3 — stacked on mobile, narrow + wide on desktop */}
      <div className="flex flex-col gap-3 md:flex-row md:gap-4">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[12px] md:aspect-[442/500] md:w-[33.3%] md:rounded-[20px]">
          <Image src={row3[0].src} alt={row3[0].alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
          <div className="absolute inset-0 bg-black/15" />
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[12px] md:aspect-[870/500] md:flex-1 md:rounded-[20px]">
          <Image src={row3[1].src} alt={row3[1].alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 65vw" />
          <div className="absolute inset-0 bg-black/15" />
        </div>
      </div>
    </div>
  );
}

export default function GalleryTabs() {
  const [activeTab, setActiveTab] = useState("Events & Celebrations");
  const set = gallerySets[activeTab];

  return (
    <>
      {/* Segmented pill filter bar */}
      <section className="bg-white px-4 pt-12 pb-0 md:px-10 md:pt-24 lg:px-14">
        <div className="scrollbar-thin flex h-12 items-center overflow-x-auto rounded-[100px] bg-[#f6f6f6] md:h-14 md:overflow-visible">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex h-full shrink-0 flex-1 items-center justify-center px-4 text-sm transition-colors duration-150 md:px-0 md:text-base ${
                tab === activeTab
                  ? "rounded-[100px] bg-rust font-medium text-white"
                  : "font-normal text-ink hover:text-rust"
              } ${tab !== tabs[0] && tab !== activeTab ? "border-l border-[#e6e6e6]" : ""}`}
              style={{ fontFamily: "var(--font-body)" }}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery grid */}
      <section className="bg-white px-4 pt-6 pb-16 md:px-10 md:pt-8 md:pb-32 lg:px-14">
        {set ? (
          <GalleryGrid set={set} />
        ) : (
          /* Placeholder for tabs without images yet */
          <div className="flex flex-col gap-3 md:gap-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex flex-col gap-3 md:flex-row md:gap-4">
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

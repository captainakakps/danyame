"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

import ExploreMoreItemModal from "@/components/experiences/ExploreMoreItemModal";
import FadeUp from "@/components/FadeUp";
import type { ExperiencesPageData } from "@/lib/pages/experiences";

const PREVIEW_WIDTH = 356;
const PREVIEW_HEIGHT = 340;

type ExploreMoreSectionProps = {
  exploreMore: ExperiencesPageData["exploreMore"];
};

export default function ExploreMoreSection({
  exploreMore,
}: ExploreMoreSectionProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [previewTop, setPreviewTop] = useState(0);

  const updatePreviewPosition = useCallback((index: number) => {
    const row = rowRefs.current[index];
    const list = listRef.current;
    if (!row || !list) {
      return;
    }

    const centeredTop =
      row.offsetTop + row.offsetHeight / 2 - PREVIEW_HEIGHT / 2;
    const maxTop = Math.max(0, list.offsetHeight - PREVIEW_HEIGHT);

    setPreviewTop(Math.max(0, Math.min(centeredTop, maxTop)));
  }, []);

  const handleActivate = useCallback(
    (index: number) => {
      setActiveIndex(index);
      updatePreviewPosition(index);
    },
    [updatePreviewPosition],
  );

  const handleDeactivate = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const handleOpenModal = useCallback((index: number) => {
    setModalIndex(index);
    setActiveIndex(index);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalIndex(null);
  }, []);

  const activeItem =
    activeIndex !== null ? exploreMore.items[activeIndex] : null;
  const modalItem =
    modalIndex !== null ? exploreMore.items[modalIndex] : null;
  const isBottomRow =
    activeIndex !== null && activeIndex >= exploreMore.items.length - 2;
  const previewPadding = isBottomRow ? PREVIEW_HEIGHT / 2 : 0;

  return (
    <>
      <section
        className={`relative bg-white pb-10 pt-16 md:pt-20 lg:pb-14 lg:pt-[130px] ${
          activeIndex !== null ? "z-30" : "z-auto"
        }`}
        style={
          previewPadding > 0
            ? { paddingBottom: `calc(${previewPadding}px + 2.5rem)` }
            : undefined
        }
      >
        <div className="w-full px-6 md:px-10 lg:px-[72px]">
          <FadeUp className="pb-8 md:pb-10">
            <h2
              className="text-[32px] font-medium leading-none text-ink sm:text-[40px] md:text-[48px] lg:text-[56px]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {exploreMore.title}
            </h2>
            <p
              className="mt-4 max-w-[765px] text-sm leading-[1.5] text-subtext sm:text-base"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {exploreMore.intro}
            </p>
          </FadeUp>

          <div
            ref={listRef}
            className="relative overflow-visible border-t border-[#e2e5e6]"
            onMouseLeave={handleDeactivate}
          >
            {activeItem?.image ? (
              <div
                className="pointer-events-none absolute left-1/2 z-50 hidden overflow-hidden rounded-[20px] bg-[#e2e5e6] shadow-[0_24px_48px_rgba(0,0,0,0.18)] transition-[top,opacity,transform] duration-300 ease-out lg:block"
                style={{
                  top: previewTop,
                  width: PREVIEW_WIDTH,
                  height: PREVIEW_HEIGHT,
                  opacity: activeIndex !== null ? 1 : 0,
                  transform:
                    activeIndex !== null
                      ? "translateX(-50%) scale(1)"
                      : "translateX(-50%) scale(0.96)",
                }}
                aria-hidden
              >
                <Image
                  src={activeItem.image}
                  alt={activeItem.imageAlt}
                  width={PREVIEW_WIDTH}
                  height={PREVIEW_HEIGHT}
                  className="h-full w-full object-cover"
                  sizes={`${PREVIEW_WIDTH}px`}
                />
              </div>
            ) : null}

            <FadeUp selector="[data-explore-row]" y={24} stagger={0.06}>
              {exploreMore.items.map((item, index) => {
                const isLast = index === exploreMore.items.length - 1;
                const isActive = activeIndex === index;

                return (
                  <div
                    key={`${item.name}-${index}`}
                    ref={(element) => {
                      rowRefs.current[index] = element;
                    }}
                    data-explore-row
                    className={`relative border-[#e2e5e6] ${
                      isLast ? "border-b border-t" : "border-t"
                    }`}
                    onMouseEnter={() => handleActivate(index)}
                  >
                    <div
                      className="pointer-events-none absolute inset-0 z-10 origin-left bg-rust transition-transform duration-300 ease-out"
                      style={{ transform: isActive ? "scaleX(1)" : "scaleX(0)" }}
                      aria-hidden
                    />

                    <button
                      type="button"
                      className={`group relative flex w-full cursor-pointer flex-col gap-2 px-4 py-6 text-left transition-colors sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 sm:py-8 md:py-10 lg:px-8 ${
                        isActive ? "z-40" : "z-30"
                      }`}
                      onClick={() => handleOpenModal(index)}
                      onFocus={() => handleActivate(index)}
                      onBlur={(event) => {
                        if (
                          !event.currentTarget.contains(event.relatedTarget)
                        ) {
                          handleDeactivate();
                        }
                      }}
                    >
                      <span
                        className={`text-[20px] font-medium tracking-[0.02em] transition-colors sm:text-[22px] lg:text-[24px] lg:tracking-[0.72px] ${
                          isActive
                            ? "text-white"
                            : "text-ink group-hover:text-white"
                        }`}
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {item.name}
                      </span>
                      <span
                        className={`text-sm tracking-[0.03em] transition-colors sm:text-base sm:tracking-[0.48px] ${
                          isActive
                            ? "text-white"
                            : "text-subtext group-hover:text-white"
                        }`}
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {item.tagline}
                      </span>
                    </button>
                  </div>
                );
              })}
            </FadeUp>
          </div>
        </div>
      </section>

      {modalItem ? (
        <ExploreMoreItemModal item={modalItem} onClose={handleCloseModal} />
      ) : null}
    </>
  );
}

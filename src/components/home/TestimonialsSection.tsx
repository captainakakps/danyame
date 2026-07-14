"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import type { HomeTestimonial } from "@/lib/pages/home";

type TestimonialsSectionProps = {
  title: string;
  backgroundImage: string;
  items: HomeTestimonial[];
};

const CARD_WIDTH = 450;
const CARD_GAP = 32;
const CARD_STEP = CARD_WIDTH + CARD_GAP;

function TestimonialCard({ item }: { item: HomeTestimonial }) {
  const isDark = item.cardStyle === "dark";

  return (
    <article className="relative h-[520px] w-[min(calc(100vw-3rem),450px)] shrink-0 overflow-hidden rounded-[20px] lg:h-[630px] lg:w-[450px]">
      <Image
        src={item.image}
        alt={item.imageAlt}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, 450px"
      />
      <div className="absolute inset-0 flex items-end justify-end p-4 pt-8 sm:pl-[51px] sm:pt-8">
        <div
          className={`flex h-[min(369px,58%)] w-full max-w-[319px] flex-col justify-between rounded-[20px] p-4 lg:h-[369px] lg:w-[319px] ${
            isDark ? "bg-subtext text-white" : "bg-white text-ink"
          }`}
        >
          <div className="flex flex-col gap-4 leading-none">
            <p
              className="text-[20px] font-medium lg:text-[24px]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {item.name}
            </p>
            <p
              className="text-[14px] lg:text-[16px]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {item.role}
            </p>
          </div>
          <p
            className="text-[14px] leading-[1.5] lg:text-[16px]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {item.quote}
          </p>
        </div>
      </div>
    </article>
  );
}

function NavButton({
  direction,
  onClick,
  dimmed = false,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  dimmed?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous testimonial" : "Next testimonial"}
      className={`flex h-14 w-14 items-center justify-center rounded-[6px] bg-white p-2 text-ink transition-opacity ${
        dimmed ? "opacity-80 hover:opacity-100" : "opacity-100"
      }`}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d={direction === "prev" ? "M15 18L9 12L15 6" : "M9 18L15 12L9 6"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default function TestimonialsSection({
  title,
  backgroundImage,
  items,
}: TestimonialsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardStep, setCardStep] = useState(CARD_STEP);

  useEffect(() => {
    const updateStep = () => {
      const viewportCardWidth = Math.min(window.innerWidth - 48, CARD_WIDTH);
      setCardStep(viewportCardWidth + CARD_GAP);
    };

    updateStep();
    window.addEventListener("resize", updateStep);
    return () => window.removeEventListener("resize", updateStep);
  }, []);

  const total = items.length;

  const goToPrevious = useCallback(() => {
    setActiveIndex((current) => (current === 0 ? total - 1 : current - 1));
  }, [total]);

  const goToNext = useCallback(() => {
    setActiveIndex((current) => (current === total - 1 ? 0 : current + 1));
  }, [total]);

  useEffect(() => {
    if (activeIndex >= total) {
      setActiveIndex(0);
    }
  }, [activeIndex, total]);

  if (total === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="relative h-[min(900px,90vh)] min-h-[720px] w-full overflow-hidden lg:h-[1027px]">
      <Image
        src={backgroundImage}
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/20" />

      {/* Title — Figma: left 56px, top 130px */}
      <h2
        className="absolute left-6 top-16 z-10 max-w-[434px] text-[32px] font-medium leading-none text-white sm:left-10 sm:top-20 sm:text-[40px] lg:left-14 lg:top-[130px] lg:text-[56px]"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {title}
      </h2>

      {/* Carousel track — Figma: cards from x=419, y=267; gap 32px */}
      <div className="absolute inset-x-0 top-[200px] z-10 overflow-hidden sm:top-[220px] lg:top-[267px]">
        <div
          className="flex gap-8 transition-transform duration-500 ease-out will-change-transform"
          style={{
            paddingLeft: "max(1.5rem, calc((100vw - 1440px) / 2 + 419px))",
            transform: `translateX(-${activeIndex * cardStep}px)`,
          }}
        >
          {items.map((item, index) => (
            <TestimonialCard
              key={`${item.name}-${item.role}-${index}`}
              item={item}
            />
          ))}
        </div>
      </div>

      {/* Nav — Figma: left 56px, top 841px */}
      {total > 1 && (
        <div className="absolute bottom-16 left-6 z-10 flex gap-2 sm:left-10 lg:bottom-auto lg:left-14 lg:top-[841px]">
          <NavButton direction="prev" onClick={goToPrevious} dimmed />
          <NavButton direction="next" onClick={goToNext} />
        </div>
      )}
    </section>
  );
}

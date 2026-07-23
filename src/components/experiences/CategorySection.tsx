"use client";

import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import CategoryPills from "@/components/experiences/CategoryPills";
import type { ExperienceCategory } from "@/lib/pages/experiences";

gsap.registerPlugin(ScrollTrigger);

type CategorySectionProps = {
  category: ExperienceCategory;
  categories: ExperienceCategory[];
  index: number;
};

/**
 * Full-viewport category panel. On snap-in: title + description reveal,
 * pills fade, and the background runs a slow Ken Burns zoom while active.
 */
export default function CategorySection({
  category,
  categories,
  index,
}: CategorySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const image = section.querySelector<HTMLElement>("[data-category-img]");
    const pills = section.querySelector<HTMLElement>("[data-category-pills]");
    const title = section.querySelector<HTMLElement>("[data-category-title]");
    const body = section.querySelector<HTMLElement>("[data-category-body]");

    const context = gsap.context(() => {
      if (image) {
        gsap.set(image, { scale: 1 });
      }

      const entrance = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      });

      entrance
        .fromTo(
          pills,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.55 },
          0,
        )
        .fromTo(
          title,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.65 },
          0.08,
        )
        .fromTo(
          body,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.6 },
          0.2,
        );

      let kenBurns: gsap.core.Tween | null = null;

      ScrollTrigger.create({
        trigger: section,
        start: "top 70%",
        end: "bottom 30%",
        onEnter: () => {
          entrance.restart();
          if (image) {
            kenBurns?.kill();
            gsap.set(image, { scale: 1 });
            kenBurns = gsap.to(image, {
              scale: 1.06,
              duration: 8,
              ease: "none",
            });
          }
        },
        onEnterBack: () => {
          entrance.restart();
          if (image) {
            kenBurns?.kill();
            gsap.set(image, { scale: 1 });
            kenBurns = gsap.to(image, {
              scale: 1.06,
              duration: 8,
              ease: "none",
            });
          }
        },
        onLeave: () => {
          kenBurns?.pause();
        },
        onLeaveBack: () => {
          kenBurns?.pause();
        },
      });
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={category.slug}
      className="experience-category-section relative h-dvh min-h-[520px] w-full overflow-hidden text-white sm:min-h-[640px]"
    >
      <Image
        src={category.image}
        alt=""
        fill
        className="object-cover will-change-transform"
        sizes="100vw"
        data-category-img
      />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 flex h-full min-h-0 flex-col px-6 pb-10 pt-6 sm:px-10 sm:pb-12 sm:pt-10 lg:px-14 lg:pb-[max(7rem,12vh)] lg:pt-[64px]">
        <div data-category-pills>
          <CategoryPills categories={categories} activeIndex={index} />
        </div>

        <h2
          className="mt-[clamp(2.5rem,28vh,22rem)] text-[28px] font-medium leading-[1.1] sm:text-[32px] lg:text-[40px] lg:whitespace-nowrap"
          style={{ fontFamily: "var(--font-heading)" }}
          data-category-title
        >
          {category.title}
        </h2>

        <p
          className="mt-auto max-w-[587px] text-sm leading-[1.5] sm:text-base"
          style={{ fontFamily: "var(--font-body)" }}
          data-category-body
        >
          {category.description}
        </p>
      </div>
    </section>
  );
}

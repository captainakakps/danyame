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
    const counter = section.querySelector<HTMLElement>("[data-category-counter]");
    const focusOverlay = section.querySelector<HTMLElement>(
      "[data-category-focus-overlay]",
    );

    let cleanupPointer: (() => void) | undefined;

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

      if (counter) {
        entrance.fromTo(
          counter,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          0.3,
        );
      }

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

      // Focus vignette — dims the panel while it's scrolling in/out and
      // clears once it's centered, sharpening which section has attention.
      if (focusOverlay) {
        ScrollTrigger.create({
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            const focus = 1 - Math.abs(self.progress - 0.5) * 2;
            gsap.set(focusOverlay, { opacity: (1 - focus) * 0.35 });
          },
        });
      }

      // Cursor-reactive parallax on the background image, layered on top
      // of the Ken Burns zoom (separate transform properties, no conflict).
      if (image) {
        const quickX = gsap.quickTo(image, "x", {
          duration: 0.6,
          ease: "power3.out",
        });
        const quickY = gsap.quickTo(image, "y", {
          duration: 0.6,
          ease: "power3.out",
        });

        const handlePointerMove = (event: PointerEvent) => {
          if (window.innerWidth < 1024) {
            return;
          }

          const rect = section.getBoundingClientRect();
          const px = (event.clientX - rect.left) / rect.width - 0.5;
          const py = (event.clientY - rect.top) / rect.height - 0.5;

          quickX(px * 24);
          quickY(py * 16);
        };

        section.addEventListener("pointermove", handlePointerMove);
        cleanupPointer = () =>
          section.removeEventListener("pointermove", handlePointerMove);
      }
    }, section);

    return () => {
      cleanupPointer?.();
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
      <div
        className="pointer-events-none absolute inset-0 bg-black opacity-0"
        data-category-focus-overlay
        aria-hidden
      />

      <div className="relative z-10 flex h-full min-h-0 flex-col px-6 pb-10 pt-6 sm:px-10 sm:pb-12 sm:pt-10 lg:px-14 lg:pb-[max(7rem,12vh)] lg:pt-[64px]">
        <div className="flex items-start justify-between">
          <div data-category-pills>
            <CategoryPills categories={categories} activeIndex={index} />
          </div>
          <p
            className="hidden shrink-0 text-sm tracking-[0.2em] text-white/70 lg:block"
            style={{ fontFamily: "var(--font-body)" }}
            data-category-counter
          >
            {String(index + 1).padStart(2, "0")} / {String(categories.length).padStart(2, "0")}
          </p>
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

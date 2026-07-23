"use client";

import { gsap } from "gsap";
import { useEffect } from "react";

/**
 * Motion for the Experiences page (renders nothing):
 * - Hero entrance: image settles from a slight zoom, title rises in.
 * - Category snap-sections: title/description/pills slide in on each entry,
 *   background gets a slow Ken Burns zoom while the section is active
 *   (desktop only — cheap phones stutter compositing full-screen zooms).
 *
 * Targets are tagged in the server markup:
 * - [data-exp-hero-img] / [data-exp-hero-title]
 * - .experience-category-section containing [data-cat-bg],
 *   [data-cat-pills], [data-cat-title], [data-cat-desc]
 */
export default function ExperiencesFx() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const allowKenBurns = window.matchMedia("(min-width: 1024px)").matches;

    const context = gsap.context(() => {
      // ── Hero entrance ──
      const heroTimeline = gsap.timeline({
        defaults: { ease: "power3.out" },
      });
      heroTimeline
        .from(
          "[data-exp-hero-img]",
          {
            scale: 1.06,
            duration: 1.5,
            ease: "power2.out",
            clearProps: "transform",
          },
          0,
        )
        .from(
          "[data-exp-hero-title]",
          {
            opacity: 0,
            y: 48,
            duration: 0.8,
            clearProps: "opacity,transform",
          },
          0.2,
        );

      // ── Category section entrances + Ken Burns ──
      const sections = gsap.utils.toArray<HTMLElement>(
        ".experience-category-section",
      );
      const kenBurns = new Map<HTMLElement, gsap.core.Tween>();

      const playEntrance = (section: HTMLElement) => {
        const title = section.querySelector("[data-cat-title]");
        const desc = section.querySelector("[data-cat-desc]");
        const pills = section.querySelector("[data-cat-pills]");
        const bg = section.querySelector("[data-cat-bg]");

        const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
        if (title) {
          timeline.fromTo(
            title,
            { opacity: 0, y: 44 },
            { opacity: 1, y: 0, duration: 0.6 },
            0,
          );
        }
        if (desc) {
          timeline.fromTo(
            desc,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.6 },
            0.15,
          );
        }
        if (pills) {
          timeline.fromTo(
            pills,
            { opacity: 0 },
            { opacity: 1, duration: 0.5 },
            0.25,
          );
        }

        if (allowKenBurns && bg) {
          kenBurns.get(section)?.kill();
          kenBurns.set(
            section,
            gsap.fromTo(
              bg,
              { scale: 1 },
              { scale: 1.06, duration: 9, ease: "none" },
            ),
          );
        }
      };

      const resetSection = (section: HTMLElement) => {
        const targets = section.querySelectorAll(
          "[data-cat-title], [data-cat-desc], [data-cat-pills]",
        );
        gsap.set(targets, { opacity: 0 });

        const bg = section.querySelector("[data-cat-bg]");
        kenBurns.get(section)?.kill();
        kenBurns.delete(section);
        if (bg) {
          gsap.set(bg, { scale: 1 });
        }
      };

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const section = entry.target as HTMLElement;
            if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
              playEntrance(section);
            } else if (!entry.isIntersecting) {
              resetSection(section);
            }
          }
        },
        { threshold: [0, 0.35] },
      );

      sections.forEach((section) => observer.observe(section));

      return () => {
        observer.disconnect();
        kenBurns.forEach((tween) => tween.kill());
      };
    });

    return () => {
      context.revert();
    };
  }, []);

  return null;
}

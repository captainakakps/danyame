"use client";

import { gsap } from "gsap";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * Home hero entrance: slow image settle, staggered headline lines,
 * then subtext and decorations. Plays once on load; respects reduced motion.
 *
 * Targets are tagged in the server markup:
 * - [data-hero-img]   background image (scale 1.08 -> 1)
 * - [data-hero-line]  headline containers (fade + rise, staggered)
 * - [data-hero-sub]   tagline/subtext block (fade + rise)
 * - [data-hero-decor] decorative shapes (fade only — they carry rotations)
 */
export default function HeroAnimation({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let cleanupPointer: (() => void) | undefined;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      timeline
        .from(
          "[data-hero-img]",
          {
            scale: 1.08,
            duration: 1.6,
            ease: "power2.out",
            clearProps: "transform",
          },
          0,
        )
        .from(
          "[data-hero-line]",
          {
            opacity: 0,
            y: 56,
            duration: 0.8,
            stagger: 0.15,
            clearProps: "opacity,transform",
          },
          0.15,
        )
        .from(
          "[data-hero-sub]",
          {
            opacity: 0,
            y: 24,
            duration: 0.7,
            clearProps: "opacity,transform",
          },
          0.75,
        )
        .from(
          "[data-hero-decor]",
          {
            opacity: 0,
            duration: 0.7,
            stagger: 0.15,
            clearProps: "opacity",
          },
          0.5,
        );

      // Gentle perpetual drift on the decorative shapes — keeps the hero
      // feeling alive after the entrance settles. GSAP preserves the
      // class-based rotations when animating y only.
      gsap.to("[data-hero-decor]", {
        y: "+=12",
        duration: 3.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.4,
        stagger: { each: 0.6 },
      });

      // Cursor-reactive parallax on the decor — independent of the y drift
      // above, so the two combine into one transform without fighting.
      const decorEls = gsap.utils.toArray<HTMLElement>("[data-hero-decor]");
      const quickXs = decorEls.map((elm) =>
        gsap.quickTo(elm, "x", { duration: 0.6, ease: "power3.out" }),
      );

      const handlePointerMove = (event: PointerEvent) => {
        if (window.innerWidth < 1024) {
          return;
        }

        const relX = event.clientX / window.innerWidth - 0.5;

        quickXs.forEach((setX, index) => {
          const depth = 10 + index * 8;
          setX(relX * depth);
        });
      };

      window.addEventListener("pointermove", handlePointerMove);
      cleanupPointer = () => window.removeEventListener("pointermove", handlePointerMove);
    }, el);

    return () => {
      cleanupPointer?.();
      context.revert();
    };
  }, []);

  return <div ref={ref}>{children}</div>;
}

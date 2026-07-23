"use client";

import { gsap } from "gsap";
import { useEffect, useRef, type ReactNode } from "react";

type AboutHeroAnimationProps = {
  children: ReactNode;
};

/** Subtle About hero entrance: image settles, heading and copy rise in. */
export default function AboutHeroAnimation({ children }: AboutHeroAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      timeline
        .from(
          "[data-about-hero-img]",
          {
            scale: 1.06,
            duration: 1.6,
            ease: "power2.out",
            clearProps: "transform",
          },
          0,
        )
        .from(
          "[data-about-hero-title]",
          {
            opacity: 0,
            y: 56,
            duration: 0.85,
            clearProps: "opacity,transform",
          },
          0.2,
        )
        .from(
          "[data-about-hero-sub]",
          {
            opacity: 0,
            y: 24,
            duration: 0.7,
            clearProps: "opacity,transform",
          },
          0.55,
        );
    }, el);

    return () => {
      context.revert();
    };
  }, []);

  return <div ref={ref}>{children}</div>;
}


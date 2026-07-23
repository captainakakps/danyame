"use client";

import { gsap } from "gsap";
import { useEffect, useRef, type ReactNode } from "react";

type EventsHeroAnimationProps = {
  readonly children: ReactNode;
};

/** Calm entrance for Events hero: image settle, heading and copy rise in. */
export default function EventsHeroAnimation({
  children,
}: EventsHeroAnimationProps) {
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
          "[data-events-hero-img]",
          {
            scale: 1.06,
            duration: 1.6,
            ease: "power2.out",
            clearProps: "transform",
          },
          0,
        )
        .from(
          "[data-events-hero-title]",
          {
            opacity: 0,
            y: 52,
            duration: 0.85,
            clearProps: "opacity,transform",
          },
          0.2,
        )
        .from(
          "[data-events-hero-copy]",
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


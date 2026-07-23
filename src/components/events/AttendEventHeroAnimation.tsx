"use client";

import { gsap } from "gsap";
import { useEffect, useRef, type ReactNode } from "react";

type AttendEventHeroAnimationProps = {
  readonly children: ReactNode;
};

/** Featured event hero motion: poster settle, copy reveal, and date-card drift. */
export default function AttendEventHeroAnimation({
  children,
}: AttendEventHeroAnimationProps) {
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
          "[data-attend-hero-img]",
          {
            scale: 1.05,
            duration: 1.5,
            ease: "power2.out",
            clearProps: "transform",
          },
          0,
        )
        .from(
          "[data-attend-hero-kicker]",
          {
            opacity: 0,
            y: 18,
            duration: 0.55,
            clearProps: "opacity,transform",
          },
          0.2,
        )
        .from(
          "[data-attend-date-card]",
          {
            opacity: 0,
            y: 22,
            duration: 0.6,
            clearProps: "opacity,transform",
          },
          0.34,
        )
        .from(
          "[data-attend-hero-title]",
          {
            opacity: 0,
            y: 46,
            duration: 0.78,
            clearProps: "opacity,transform",
          },
          0.44,
        )
        .from(
          "[data-attend-hero-ctas]",
          {
            opacity: 0,
            y: 18,
            duration: 0.52,
            clearProps: "opacity,transform",
          },
          0.62,
        );

      gsap.to("[data-attend-date-card]", {
        y: "+=10",
        duration: 3.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, el);

    return () => {
      context.revert();
    };
  }, []);

  return <div ref={ref}>{children}</div>;
}


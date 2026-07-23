"use client";

import { gsap } from "gsap";
import { useEffect, useRef, type ReactNode } from "react";

type EventSingleAnimationProps = {
  readonly children: ReactNode;
};

/** Event detail entrance: poster first, then metadata/content and CTA. */
export default function EventSingleAnimation({
  children,
}: EventSingleAnimationProps) {
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
          "[data-event-poster]",
          {
            opacity: 0,
            y: 36,
            scale: 0.98,
            duration: 0.75,
            clearProps: "opacity,transform",
          },
          0,
        )
        .from(
          "[data-event-content]",
          {
            opacity: 0,
            y: 28,
            duration: 0.72,
            clearProps: "opacity,transform",
          },
          0.2,
        )
        .from(
          "[data-event-cta]",
          {
            opacity: 0,
            y: 14,
            duration: 0.5,
            clearProps: "opacity,transform",
          },
          0.42,
        );
    }, el);

    return () => {
      context.revert();
    };
  }, []);

  return <div ref={ref}>{children}</div>;
}


"use client";

import { gsap } from "gsap";
import { useEffect, useRef, type ReactNode } from "react";

type DecorDriftProps = {
  children: ReactNode;
  className?: string;
  selector?: string;
  "aria-hidden"?: boolean | "true" | "false";
};

/** Gentle perpetual float on decorative shapes. Respects reduced motion. */
export default function DecorDrift({
  children,
  className,
  selector = "[data-cta-decor]",
  "aria-hidden": ariaHidden,
}: DecorDriftProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const targets = el.querySelectorAll<HTMLElement>(selector);
    if (targets.length === 0) {
      return;
    }

    const context = gsap.context(() => {
      gsap.to(targets, {
        y: "+=12",
        duration: 3.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.6 },
      });
    }, el);

    return () => {
      context.revert();
    };
  }, [selector]);

  return (
    <div ref={ref} className={className} aria-hidden={ariaHidden}>
      {children}
    </div>
  );
}

"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, type ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

type ParallaxImagesProps = {
  children: ReactNode;
  className?: string;
  /** Elements to drift — typically `[data-gallery-item] img`. */
  selector: string;
  /** Total vertical travel as a percentage of the element height. */
  range?: number;
};

/**
 * Gentle scroll-scrubbed parallax. Images are slightly over-scaled so the
 * drift never exposes container edges. Respects reduced motion.
 */
export default function ParallaxImages({
  children,
  className,
  selector,
  range = 10,
}: ParallaxImagesProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const targets = Array.from(el.querySelectorAll<HTMLElement>(selector));
    if (targets.length === 0) {
      return;
    }

    const half = range / 2;
    const context = gsap.context(() => {
      targets.forEach((target) => {
        gsap.fromTo(
          target,
          { yPercent: -half, scale: 1 + range / 100 },
          {
            yPercent: half,
            scale: 1 + range / 100,
            ease: "none",
            scrollTrigger: {
              trigger: target.parentElement ?? target,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          },
        );
      });
    }, el);

    return () => {
      context.revert();
    };
  }, [selector, range]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

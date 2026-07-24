"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, type ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

type ScrubRevealProps = {
  children: ReactNode;
  className?: string;
  /** When set, animates matching descendants (staggered) instead of the wrapper itself. */
  selector?: string;
  y?: number;
  scale?: number;
  /** Scroll position (relative to viewport) where the reveal starts. */
  start?: string;
  /** Scroll position where the reveal finishes. */
  end?: string;
};

/**
 * Scroll-scrubbed reveal — progress is tied directly to scroll position
 * (not a one-shot trigger), so the section responds to the user's own
 * scroll instead of just firing once and settling.
 */
export default function ScrubReveal({
  children,
  className,
  selector,
  y = 48,
  scale = 0.96,
  start = "top 90%",
  end = "top 40%",
}: ScrubRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const targets = selector
      ? Array.from(el.querySelectorAll<HTMLElement>(selector))
      : [el];

    if (targets.length === 0) {
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y, scale },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "none",
          stagger: 0.08,
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub: 0.6,
          },
        },
      );
    }, el);

    return () => {
      context.revert();
    };
  }, [selector, y, scale, start, end]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

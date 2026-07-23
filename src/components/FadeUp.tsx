"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, type ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

type FadeUpProps = {
  children: ReactNode;
  className?: string;
  /**
   * When set, animates matching descendants (staggered) instead of the
   * wrapper itself. Use for blocks whose wrapper must stay transform-free
   * (e.g. contains absolutely-positioned children).
   */
  selector?: string;
  y?: number;
  delay?: number;
  stagger?: number;
  duration?: number;
};

/**
 * Subtle scroll-triggered fade-up. Plays once, respects reduced motion,
 * and clears inline styles afterwards so hover transitions keep working.
 */
export default function FadeUp({
  children,
  className,
  selector,
  y = 36,
  delay = 0,
  stagger = 0.12,
  duration = 0.7,
}: FadeUpProps) {
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
      gsap.from(targets, {
        opacity: 0,
        y,
        duration,
        delay,
        ease: "power3.out",
        stagger,
        clearProps: "opacity,transform",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });
    }, el);

    return () => {
      context.revert();
    };
  }, [selector, y, delay, stagger, duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

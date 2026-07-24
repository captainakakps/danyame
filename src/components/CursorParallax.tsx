"use client";

import { gsap } from "gsap";
import { useEffect, useRef, type ReactNode } from "react";

type CursorParallaxProps = {
  children: ReactNode;
  className?: string;
  /** CSS selector (scoped to this wrapper) for the element(s) to offset. */
  selector: string;
  /** Max px offset applied to matched elements. */
  range?: number;
};

/**
 * Cursor-reactive parallax — offsets the matched element(s) toward the
 * cursor within this wrapper. Layers on top of any scroll-driven transform
 * (e.g. ParallaxImages, Ken Burns) since it only touches x/y.
 */
export default function CursorParallax({
  children,
  className,
  selector,
  range = 16,
}: CursorParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const targets = gsap.utils.toArray<HTMLElement>(selector, el);
    if (targets.length === 0) {
      return;
    }

    const quickXs = targets.map((target) =>
      gsap.quickTo(target, "x", { duration: 0.6, ease: "power3.out" }),
    );
    const quickYs = targets.map((target) =>
      gsap.quickTo(target, "y", { duration: 0.6, ease: "power3.out" }),
    );

    const handlePointerMove = (event: PointerEvent) => {
      if (window.innerWidth < 1024) {
        return;
      }

      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;

      quickXs.forEach((setX) => setX(px * range));
      quickYs.forEach((setY) => setY(py * range));
    };

    el.addEventListener("pointermove", handlePointerMove);

    return () => {
      el.removeEventListener("pointermove", handlePointerMove);
    };
  }, [selector, range]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

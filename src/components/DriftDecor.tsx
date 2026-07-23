"use client";

import { gsap } from "gsap";
import { useEffect, useRef, type ReactNode } from "react";

type DriftDecorProps = {
  children: ReactNode;
  className?: string;
  /** Elements to drift; defaults to [data-decor] descendants. */
  selector?: string;
  "aria-hidden"?: boolean;
};

/** Gentle perpetual up/down drift for decorative shapes. */
export default function DriftDecor({
  children,
  className,
  selector = "[data-decor]",
  "aria-hidden": ariaHidden,
}: DriftDecorProps) {
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

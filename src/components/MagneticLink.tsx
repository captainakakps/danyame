"use client";

import Link from "next/link";
import { gsap } from "gsap";
import { useRef, type ComponentProps, type MouseEvent } from "react";

type MagneticLinkProps = ComponentProps<typeof Link> & {
  /** How strongly the button follows the cursor (0–1). */
  strength?: number;
};

/** CTA link that gently follows the cursor within its bounds, then eases back on leave. */
export default function MagneticLink({
  strength = 0.35,
  className,
  children,
  ...props
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const quickX = useRef<((value: number) => void) | null>(null);
  const quickY = useRef<((value: number) => void) | null>(null);

  const handleMouseMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const rect = el.getBoundingClientRect();
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);

    quickX.current ??= gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
    quickY.current ??= gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

    quickX.current(relX * strength);
    quickY.current(relY * strength);
  };

  const handleMouseLeave = () => {
    quickX.current?.(0);
    quickY.current?.(0);
  };

  return (
    <Link
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </Link>
  );
}

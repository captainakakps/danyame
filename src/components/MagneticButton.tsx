"use client";

import { gsap } from "gsap";
import { useRef, type ComponentProps, type MouseEvent } from "react";

type MagneticButtonProps = ComponentProps<"button"> & {
  /** How strongly the button follows the cursor (0–1). */
  strength?: number;
};

/** Button that gently follows the cursor within its bounds, then eases back on leave. */
export default function MagneticButton({
  strength = 0.3,
  className,
  children,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const quickX = useRef<((value: number) => void) | null>(null);
  const quickY = useRef<((value: number) => void) | null>(null);

  const handleMouseMove = (event: MouseEvent<HTMLButtonElement>) => {
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
    <button
      ref={ref}
      type="button"
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </button>
  );
}

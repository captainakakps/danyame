"use client";

import { gsap } from "gsap";
import { useRef, type ComponentPropsWithoutRef, type MouseEvent } from "react";

type TiltCardProps = ComponentPropsWithoutRef<"div"> & {
  /** Max rotation in degrees. */
  max?: number;
};

/** Non-interactive card that tilts in 3D toward the cursor (no navigation, unlike TiltLink). */
export default function TiltCard({ max = 6, className, children, ...props }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const quickRotateX = useRef<((value: number) => void) | null>(null);
  const quickRotateY = useRef<((value: number) => void) | null>(null);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;

    gsap.set(el, { transformPerspective: 700 });
    quickRotateY.current ??= gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power3.out" });
    quickRotateX.current ??= gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power3.out" });

    quickRotateY.current(px * max * 2);
    quickRotateX.current(-py * max * 2);
  };

  const handleMouseLeave = () => {
    quickRotateX.current?.(0);
    quickRotateY.current?.(0);
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
}

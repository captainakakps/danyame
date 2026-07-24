"use client";

import { useEffect, useState } from "react";

/** Bouncing scroll hint shown at the bottom of the hero, hides once the user scrolls. */
export default function ScrollCue() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center transition-opacity duration-300 lg:bottom-10 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden
    >
      <span className="scroll-cue flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/70 pt-2">
        <span className="scroll-cue-dot h-2 w-1 rounded-full bg-white/90" />
      </span>
    </div>
  );
}

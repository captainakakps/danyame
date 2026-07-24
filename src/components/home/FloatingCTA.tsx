"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const DISMISS_KEY = "danyame-floating-cta-dismissed";

type FloatingCTAProps = {
  href: string;
  label: string;
};

/** Soft conversion nudge that slides in once the visitor has scrolled 60% down the page. */
export default function FloatingCTA({ href, label }: FloatingCTAProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(
    () => typeof window !== "undefined" && window.sessionStorage.getItem(DISMISS_KEY) === "1",
  );

  useEffect(() => {
    if (dismissed) {
      return;
    }

    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const depth = docHeight > 0 ? window.scrollY / docHeight : 0;
      setVisible(depth > 0.6);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
    window.sessionStorage.setItem(DISMISS_KEY, "1");
  };

  if (dismissed) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 flex items-center gap-2 transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <Link
        href={href}
        className="flex h-[50px] items-center justify-center rounded-[100px] bg-rust px-6 text-[16px] font-medium text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-rust/90"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {label}
      </Link>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Dismiss"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink/80 text-white transition-colors hover:bg-ink"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

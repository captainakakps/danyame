"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#events", label: "Events" },
  { href: "#gallery", label: "Gallery" },
  { href: "#testimonials", label: "Reviews" },
];

/** Sticky jump-nav that slides in once the hero has scrolled past. */
export default function HomeSectionNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-[3px] z-30 flex justify-center gap-1 border-b border-black/5 bg-white/90 px-4 py-2 backdrop-blur transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
      aria-label="Section navigation"
    >
      {LINKS.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="rounded-full px-4 py-1.5 text-[13px] font-medium text-ink transition-colors hover:bg-rust/10 hover:text-rust"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}

"use client";

import { useEffect } from "react";

function scrollToCategoryFromHash() {
  const slug = window.location.hash.replace("#", "");
  if (!slug) {
    return;
  }

  const target = document.getElementById(slug);
  if (!target) {
    return;
  }

  target.scrollIntoView({ behavior: "auto", block: "start" });
}

export default function ExperiencesScrollSetup() {
  useEffect(() => {
    document.documentElement.classList.add("experiences-scroll-snap");

    const frame = window.requestAnimationFrame(scrollToCategoryFromHash);
    window.addEventListener("hashchange", scrollToCategoryFromHash);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", scrollToCategoryFromHash);
      document.documentElement.classList.remove("experiences-scroll-snap");
    };
  }, []);

  return null;
}

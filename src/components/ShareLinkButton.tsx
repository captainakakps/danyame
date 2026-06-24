"use client";

import { useState } from "react";

interface ShareLinkButtonProps {
  title: string;
  className?: string;
}

export default function ShareLinkButton({ title, className = "" }: ShareLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // User cancelled or share failed — fall through to copy
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className={`flex items-center gap-2 rounded-[100px] border border-white/30 bg-white/[0.01] px-4 py-2 text-white transition-colors duration-150 hover:bg-white/10 ${className}`}
      style={{ fontFamily: "var(--font-body)" }}
    >
      <span className="text-base font-bold">{copied ? "Link Copied" : "Share Link"}</span>
      <svg
        className="h-5 w-5 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden
      >
        <path d="M4 12v7a1 1 0 001 1h7M16 3h5v5M10 14L21 3" />
      </svg>
    </button>
  );
}

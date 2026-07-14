"use client";

import { useState, type FormEvent } from "react";

type NewsletterSignupProps = {
  variant?: "default" | "footer";
};

export default function NewsletterSignup({ variant = "default" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setStatus("submitting");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website }),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      setEmail("");
      setWebsite("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p
        className={`${variant === "footer" ? "text-[20px] leading-[1.2] text-white" : "text-sm text-white/80"}`}
        role="status"
        style={{ fontFamily: variant === "footer" ? "var(--font-heading)" : "var(--font-body)" }}
      >
        You&apos;re on the list. We&apos;ll be in touch soon.
      </p>
    );
  }

  const isFooter = variant === "footer";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {!isFooter && (
        <p className="text-white" style={{ fontFamily: "var(--font-body)" }}>
          Subscribe to our newsletter
        </p>
      )}

      <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="newsletter-website">Website</label>
        <input
          id="newsletter-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div className={`flex flex-col gap-2 ${isFooter ? "" : "sm:flex-row"}`}>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          placeholder="Your email address"
          aria-label="Email address for newsletter"
          className={`min-w-0 flex-1 rounded-[100px] border border-white/20 bg-white/10 px-4 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none ${
            isFooter ? "h-10 text-[16px]" : "h-11 text-sm"
          }`}
          style={{ fontFamily: "var(--font-body)" }}
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className={`shrink-0 rounded-[100px] bg-rust font-medium text-white transition-colors duration-150 hover:bg-rust/90 disabled:opacity-60 ${
            isFooter ? "h-10 px-4 text-[16px]" : "h-11 px-5 text-sm"
          }`}
          style={{ fontFamily: "var(--font-body)" }}
        >
          {status === "submitting" ? "Joining..." : "Subscribe"}
        </button>
      </div>
      {error && (
        <p className="text-sm text-amber" style={{ fontFamily: "var(--font-body)" }}>
          {error}
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-amber" style={{ fontFamily: "var(--font-body)" }}>
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}

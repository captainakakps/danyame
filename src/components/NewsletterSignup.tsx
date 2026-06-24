"use client";

import { useState, type FormEvent } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
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
      await new Promise((resolve) => setTimeout(resolve, 600));
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p
        className="text-sm text-white/80"
        role="status"
        style={{ fontFamily: "var(--font-body)" }}
      >
        You&apos;re on the list. We&apos;ll be in touch soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <p className="text-white" style={{ fontFamily: "var(--font-body)" }}>
        Subscribe to our newsletter
      </p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          placeholder="Your email address"
          aria-label="Email address for newsletter"
          className="h-11 min-w-0 flex-1 rounded-[100px] border border-white/20 bg-white/10 px-4 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
          style={{ fontFamily: "var(--font-body)" }}
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="h-11 shrink-0 rounded-[100px] bg-rust px-5 text-sm font-medium text-white transition-colors duration-150 hover:bg-rust/90 disabled:opacity-60"
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

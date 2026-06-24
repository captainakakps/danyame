"use client";

import { useState, type FormEvent } from "react";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  eventType: string;
  preferredDate: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  eventType?: string;
  preferredDate?: string;
  message?: string;
}

const inputClassName =
  "h-12 w-full rounded-[100px] border border-[rgba(230,230,230,0.8)] bg-white px-5 text-base text-ink placeholder:text-ink/30 transition-colors duration-150 focus:border-teal focus:outline-none md:h-14";

const labelClassName = "text-sm text-ink";

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.fullName.trim()) {
    errors.fullName = "Please enter your full name.";
  }

  if (!data.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!data.phone.trim()) {
    errors.phone = "Please enter your phone number.";
  }

  if (!data.eventType) {
    errors.eventType = "Please select an event type.";
  }

  if (!data.preferredDate) {
    errors.preferredDate = "Please select a preferred date.";
  }

  if (!data.message.trim()) {
    errors.message = "Please tell us about your event or inquiry.";
  }

  return errors;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    eventType: "",
    preferredDate: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );

  function handleChange(
    field: keyof FormData,
    value: string
  ) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus("idle");
      return;
    }

    setStatus("submitting");

    try {
      // Placeholder until backend integration — simulates a successful send
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus("success");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        eventType: "",
        preferredDate: "",
        message: "",
      });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="mx-auto flex max-w-[600px] flex-col items-center gap-4 rounded-[20px] border border-teal/20 bg-teal/5 px-6 py-12 text-center"
        role="status"
      >
        <p
          className="text-xl font-medium text-ink"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Message sent!
        </p>
        <p
          className="text-sm text-subtext sm:text-base"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Thanks for reaching out. Our team will get back to you shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm font-medium text-rust hover:text-rust/80"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto flex max-w-[600px] flex-col gap-5 sm:gap-6 md:gap-7"
    >
      {status === "error" && (
        <p
          className="rounded-[12px] border border-rust/30 bg-rust/5 px-4 py-3 text-sm text-rust"
          role="alert"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Something went wrong. Please try again.
        </p>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="fullName" className={labelClassName} style={{ fontFamily: "var(--font-body)" }}>
          Full Name <span className="text-rust">*</span>
        </label>
        <input
          id="fullName"
          type="text"
          value={formData.fullName}
          onChange={(e) => handleChange("fullName", e.target.value)}
          placeholder="Enter your full name"
          className={`${inputClassName} ${errors.fullName ? "border-rust" : ""}`}
          style={{ fontFamily: "var(--font-body)" }}
          aria-invalid={!!errors.fullName}
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
        />
        {errors.fullName && (
          <p id="fullName-error" className="text-sm text-rust" style={{ fontFamily: "var(--font-body)" }}>
            {errors.fullName}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className={labelClassName} style={{ fontFamily: "var(--font-body)" }}>
          Email Address <span className="text-rust">*</span>
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="Enter your email address"
          className={`${inputClassName} ${errors.email ? "border-rust" : ""}`}
          style={{ fontFamily: "var(--font-body)" }}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="text-sm text-rust" style={{ fontFamily: "var(--font-body)" }}>
            {errors.email}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="phone" className={labelClassName} style={{ fontFamily: "var(--font-body)" }}>
          Phone Number <span className="text-rust">*</span>
        </label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="flex h-12 shrink-0 items-center gap-1.5 rounded-[100px] border border-[rgba(230,230,230,0.8)] bg-white px-4 md:h-14">
            <span className="text-sm text-subtext md:text-base" style={{ fontFamily: "var(--font-body)" }}>
              +233
            </span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 9l6 6 6-6" stroke="#575757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="Your phone number"
            className={`h-12 min-w-0 flex-1 rounded-[100px] border border-[rgba(230,230,230,0.8)] bg-white px-5 text-base text-ink placeholder:text-ink/30 transition-colors duration-150 focus:border-teal focus:outline-none md:h-14 ${errors.phone ? "border-rust" : ""}`}
            style={{ fontFamily: "var(--font-body)" }}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
        </div>
        {errors.phone && (
          <p id="phone-error" className="text-sm text-rust" style={{ fontFamily: "var(--font-body)" }}>
            {errors.phone}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="eventType" className={labelClassName} style={{ fontFamily: "var(--font-body)" }}>
          Event Type <span className="text-rust">*</span>
        </label>
        <div className="relative">
          <select
            id="eventType"
            value={formData.eventType}
            onChange={(e) => handleChange("eventType", e.target.value)}
            className={`h-12 w-full appearance-none rounded-[100px] border border-[rgba(230,230,230,0.8)] bg-white px-5 pr-12 text-base text-ink transition-colors duration-150 focus:border-teal focus:outline-none md:h-14 ${errors.eventType ? "border-rust" : ""}`}
            style={{ fontFamily: "var(--font-body)" }}
            aria-invalid={!!errors.eventType}
            aria-describedby={errors.eventType ? "eventType-error" : undefined}
          >
            <option value="" disabled>
              Select event type
            </option>
            <option>Corporate Event</option>
            <option>Birthday / Celebration</option>
            <option>Pool Party</option>
            <option>Food &amp; Nightlife</option>
            <option>Other</option>
          </select>
          <svg
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path d="M6 9l6 6 6-6" stroke="#575757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        {errors.eventType && (
          <p id="eventType-error" className="text-sm text-rust" style={{ fontFamily: "var(--font-body)" }}>
            {errors.eventType}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="preferredDate" className={labelClassName} style={{ fontFamily: "var(--font-body)" }}>
          Preferred Date <span className="text-rust">*</span>
        </label>
        <div className="relative">
          <input
            id="preferredDate"
            type="date"
            value={formData.preferredDate}
            onChange={(e) => handleChange("preferredDate", e.target.value)}
            className={`h-12 w-full appearance-none rounded-[100px] border border-[rgba(230,230,230,0.8)] bg-white px-5 pr-12 text-base text-ink transition-colors duration-150 focus:border-teal focus:outline-none md:h-14 ${errors.preferredDate ? "border-rust" : ""}`}
            style={{ fontFamily: "var(--font-body)" }}
            aria-invalid={!!errors.preferredDate}
            aria-describedby={errors.preferredDate ? "preferredDate-error" : undefined}
          />
          <svg
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="#575757" strokeWidth="1.5" />
            <path d="M3 9h18M8 2v4M16 2v4" stroke="#575757" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        {errors.preferredDate && (
          <p id="preferredDate-error" className="text-sm text-rust" style={{ fontFamily: "var(--font-body)" }}>
            {errors.preferredDate}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className={labelClassName} style={{ fontFamily: "var(--font-body)" }}>
          Message <span className="text-rust">*</span>
        </label>
        <textarea
          id="message"
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          placeholder="Tell us about your event or inquiry..."
          rows={5}
          className={`min-h-[140px] w-full resize-none rounded-[16px] border border-[rgba(230,230,230,0.8)] bg-white px-5 py-4 text-base text-ink placeholder:text-ink/30 transition-colors duration-150 focus:border-teal focus:outline-none md:min-h-[180px] md:rounded-[20px] ${errors.message ? "border-rust" : ""}`}
          style={{ fontFamily: "var(--font-body)" }}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="text-sm text-rust" style={{ fontFamily: "var(--font-body)" }}>
            {errors.message}
          </p>
        )}
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="flex h-[48px] w-full items-center justify-center rounded-[100px] bg-rust text-base font-medium text-white transition-colors duration-150 hover:bg-rust/90 disabled:cursor-not-allowed disabled:opacity-70 sm:w-[180px] md:h-[50px]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {status === "submitting" ? "Sending..." : "Submit Message"}
        </button>
      </div>
    </form>
  );
}

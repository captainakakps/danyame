const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const CONTACT_EVENT_TYPES = [
  "Corporate Event",
  "Birthday / Celebration",
  "Pool Party",
  "Food & Nightlife",
  "Other",
] as const;

export type ContactEventType = (typeof CONTACT_EVENT_TYPES)[number];

export interface ContactPayload {
  fullName: string;
  email: string;
  phone: string;
  eventType: string;
  preferredDate: string;
  message: string;
  website?: string;
}

export interface ContactValidationResult {
  ok: true;
  data: ContactPayload;
}

export interface ContactValidationError {
  ok: false;
  error: string;
}

export type ContactValidation = ContactValidationResult | ContactValidationError;

function isNonEmpty(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function isHoneypotFilled(body: unknown): boolean {
  if (!body || typeof body !== "object") return false;
  const website = (body as Record<string, unknown>).website;
  return typeof website === "string" && website.trim().length > 0;
}

export function validateContactPayload(body: unknown): ContactValidation {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body." };
  }

  const raw = body as Record<string, unknown>;

  if (!isNonEmpty(raw.fullName)) {
    return { ok: false, error: "Full name is required." };
  }

  if (!isNonEmpty(raw.email) || !EMAIL_REGEX.test(raw.email.trim())) {
    return { ok: false, error: "A valid email address is required." };
  }

  if (!isNonEmpty(raw.phone)) {
    return { ok: false, error: "Phone number is required." };
  }

  if (
    !isNonEmpty(raw.eventType) ||
    !CONTACT_EVENT_TYPES.includes(raw.eventType as ContactEventType)
  ) {
    return { ok: false, error: "Please select a valid event type." };
  }

  if (!isNonEmpty(raw.preferredDate)) {
    return { ok: false, error: "Preferred date is required." };
  }

  if (!isNonEmpty(raw.message)) {
    return { ok: false, error: "Message is required." };
  }

  if (raw.message.trim().length > 5000) {
    return { ok: false, error: "Message is too long." };
  }

  return {
    ok: true,
    data: {
      fullName: raw.fullName.trim(),
      email: raw.email.trim().toLowerCase(),
      phone: raw.phone.trim(),
      eventType: raw.eventType,
      preferredDate: raw.preferredDate,
      message: raw.message.trim(),
    },
  };
}

export function validateNewsletterEmail(body: unknown):
  | { ok: true; email: string }
  | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body." };
  }

  const raw = body as Record<string, unknown>;

  if (!isNonEmpty(raw.email) || !EMAIL_REGEX.test(raw.email.trim())) {
    return { ok: false, error: "A valid email address is required." };
  }

  return { ok: true, email: raw.email.trim().toLowerCase() };
}

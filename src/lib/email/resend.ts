import { Resend } from "resend";

let resendClient: Resend | null = null;

export function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }

  return resendClient;
}

export function getContactToEmail(): string {
  return process.env.CONTACT_TO_EMAIL ?? "danyamevillage@gmail.com";
}

export function getContactFromEmail(): string {
  return (
    process.env.CONTACT_FROM_EMAIL ??
    "Danyame Village <onboarding@resend.dev>"
  );
}

/** Escape user input for safe inclusion in HTML email bodies. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

import type { ContactPayload } from "@/lib/validation/contact";
import { site } from "@/lib/site";
import {
  formatDisplayDate,
  renderEmailLayout,
  renderFieldRow,
  renderMessageBlock,
  renderReplyButton,
} from "@/lib/email/templates/layout";

export function buildContactEmailHtml(payload: ContactPayload): string {
  const bodyHtml = [
    renderFieldRow("Full name", payload.fullName),
    renderFieldRow("Email", payload.email, true),
    renderFieldRow("Phone", payload.phone),
    renderFieldRow("Event type", payload.eventType),
    renderFieldRow("Preferred date", formatDisplayDate(payload.preferredDate)),
    renderMessageBlock(payload.message),
    renderReplyButton(payload.email),
  ].join("");

  return renderEmailLayout({
    preheader: `${payload.fullName} submitted a ${payload.eventType} inquiry for ${formatDisplayDate(payload.preferredDate)}.`,
    eyebrow: "New inquiry",
    title: "Someone wants to connect",
    badge: payload.eventType,
    bodyHtml,
    footerNote: `New contact form submission · ${site.name}`,
  });
}

export function buildContactEmailText(payload: ContactPayload): string {
  return [
    `New contact form submission for ${site.name}`,
    "",
    `Name: ${payload.fullName}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    `Event type: ${payload.eventType}`,
    `Preferred date: ${formatDisplayDate(payload.preferredDate)}`,
    "",
    "Message:",
    payload.message,
    "",
    `Reply to: ${payload.email}`,
  ].join("\n");
}

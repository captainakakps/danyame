import { buildGoogleCalendarUrl } from "@/lib/calendar";

type AddToCalendarLinkProps = {
  title: string;
  description?: string;
  location?: string;
  startISO?: string;
  className?: string;
};

/** "Add to Calendar" link (Google Calendar) — renders nothing if the event has no parsable date. */
export default function AddToCalendarLink({
  title,
  description,
  location,
  startISO,
  className = "",
}: AddToCalendarLinkProps) {
  if (!startISO) {
    return null;
  }

  const href = buildGoogleCalendarUrl({ title, description, location, startISO });
  if (!href) {
    return null;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-2 rounded-[100px] border border-white/30 bg-white/[0.01] px-4 py-2 text-white transition-colors duration-150 hover:bg-white/10 ${className}`}
      style={{ fontFamily: "var(--font-body)" }}
    >
      <span className="text-base font-bold">Add to Calendar</span>
      <svg
        className="h-5 w-5 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden
      >
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    </a>
  );
}

const DEFAULT_DURATION_MINUTES = 120;

function toGoogleCalendarDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

type GoogleCalendarEvent = {
  title: string;
  description?: string;
  location?: string;
  startISO: string;
  durationMinutes?: number;
};

/** Builds a "Add to Google Calendar" link. No end-time data exists per event, so this defaults to a 2-hour block. */
export function buildGoogleCalendarUrl({
  title,
  description,
  location,
  startISO,
  durationMinutes = DEFAULT_DURATION_MINUTES,
}: GoogleCalendarEvent): string | null {
  const start = new Date(startISO);
  if (Number.isNaN(start.getTime())) {
    return null;
  }

  const end = new Date(start.getTime() + durationMinutes * 60_000);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${toGoogleCalendarDate(start)}/${toGoogleCalendarDate(end)}`,
  });

  if (description) {
    params.set("details", description);
  }

  if (location) {
    params.set("location", location);
  }

  return `https://www.google.com/calendar/render?${params.toString()}`;
}

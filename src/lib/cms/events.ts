import {
  events as staticEvents,
  featuredEvent as staticFeaturedEvent,
  featuredEventSlug as staticFeaturedEventSlug,
  getEventBySlug as getStaticEventBySlug,
  getEventPath,
  type Event,
  type FeaturedEvent,
} from "@/lib/events";
import { getPayloadClient } from "@/lib/payload";
import type { Event as PayloadEvent, Media } from "@/payload-types";

export { getEventPath };
export type { Event, FeaturedEvent };

function getMediaUrl(posterImage: number | Media | null | undefined): string {
  if (!posterImage || typeof posterImage === "number") {
    return "";
  }

  return posterImage.url || "";
}

function formatMonthLabel(date: Date): string {
  const month = new Intl.DateTimeFormat("en-GB", { month: "long" }).format(date);
  return `${month}, ${date.getFullYear()}`;
}

function formatDisplayDate(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function formatDateCardMonth(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", { month: "short" })
    .format(date)
    .replace(".", "")
    .toUpperCase();
}

function formatDateCardTime(startTime: string): string {
  return startTime.replace(":00", "").replace(" ", "");
}

function mapPayloadEventToEvent(doc: PayloadEvent): Event {
  const eventDate = new Date(doc.eventDate);

  return {
    slug: doc.slug,
    title: doc.title,
    date: formatDisplayDate(eventDate),
    month: formatMonthLabel(eventDate),
    time: doc.startTime,
    location: doc.location,
    shortSummary: doc.shortSummary,
    description: doc.description,
    image: getMediaUrl(doc.posterImage),
    hasTickets: Boolean(doc.hasTickets),
    ticketLabel: doc.ticketLabel || undefined,
    ticketUrl: doc.ticketUrl || undefined,
    isFeatured: Boolean(doc.isFeatured),
    eventDateISO: doc.eventDate,
  };
}

function mapPayloadEventToFeaturedEvent(doc: PayloadEvent): FeaturedEvent {
  const eventDate = new Date(doc.eventDate);

  return {
    title: doc.title,
    slug: doc.slug,
    image: getMediaUrl(doc.posterImage),
    location: doc.location,
    description: doc.description,
    dateCard: {
      month: formatDateCardMonth(eventDate),
      day: String(eventDate.getDate()),
      time: formatDateCardTime(doc.startTime),
    },
    hasTickets: Boolean(doc.hasTickets),
    ticketUrl: doc.ticketUrl || undefined,
  };
}

function mapEventToFeaturedEvent(event: Event): FeaturedEvent {
  const eventDate = event.eventDateISO
    ? new Date(event.eventDateISO)
    : new Date(event.date);

  return {
    title: event.title,
    slug: event.slug,
    image: event.image,
    location: event.location,
    description: event.description,
    dateCard: {
      month: formatDateCardMonth(eventDate),
      day: String(eventDate.getDate()),
      time: formatDateCardTime(event.time),
    },
    hasTickets: event.hasTickets,
    ticketUrl: event.ticketUrl,
  };
}

async function getPublishedPayloadEvents(): Promise<Event[] | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "events",
      depth: 2,
      sort: "eventDate",
      limit: 100,
      where: {
        _status: {
          equals: "published",
        },
      },
    });

    if (result.totalDocs === 0) {
      return null;
    }

    return result.docs.map(mapPayloadEventToEvent);
  } catch {
    return null;
  }
}

export async function getPublishedEvents(): Promise<Event[]> {
  const cmsEvents = await getPublishedPayloadEvents();
  return cmsEvents ?? staticEvents;
}

export async function getFeaturedEventSlug(
  publishedEvents: Event[],
): Promise<string> {
  const featured = publishedEvents.find((event) => event.isFeatured);
  return featured?.slug ?? staticFeaturedEventSlug;
}

export async function getFeaturedEvent(): Promise<FeaturedEvent> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "events",
      depth: 2,
      limit: 1,
      where: {
        isFeatured: { equals: true },
        _status: { equals: "published" },
      },
    });

    const doc = result.docs[0];
    if (doc) {
      return mapPayloadEventToFeaturedEvent(doc);
    }
  } catch {
    // Use static or derived fallback below.
  }

  const publishedEvents = await getPublishedEvents();

  if (publishedEvents !== staticEvents) {
    const featuredFromList =
      publishedEvents.find((event) => event.isFeatured) ??
      publishedEvents.find((event) => event.slug === staticFeaturedEventSlug) ??
      publishedEvents[0];

    if (featuredFromList) {
      return mapEventToFeaturedEvent(featuredFromList);
    }
  }

  return staticFeaturedEvent;
}

export async function getEventBySlug(slug: string): Promise<Event | undefined> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "events",
      depth: 2,
      limit: 1,
      where: {
        slug: { equals: slug },
        _status: { equals: "published" },
      },
    });

    const doc = result.docs[0];
    if (doc) {
      return mapPayloadEventToEvent(doc);
    }
  } catch {
    // Use static fallback below.
  }

  return getStaticEventBySlug(slug);
}

export async function getEventsByMonth(): Promise<
  { month: string; events: Event[] }[]
> {
  const publishedEvents = await getPublishedEvents();
  const months = [...new Set(publishedEvents.map((event) => event.month))];

  return months.map((month) => ({
    month,
    events: publishedEvents.filter((event) => event.month === month),
  }));
}

export async function getLineupEvents(): Promise<{
  events: Event[];
  featuredEventSlug: string;
}> {
  const publishedEvents = await getPublishedEvents();
  const featuredEventSlug = await getFeaturedEventSlug(publishedEvents);

  return {
    events: publishedEvents,
    featuredEventSlug,
  };
}

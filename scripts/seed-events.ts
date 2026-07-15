import path from "path";

import {
  events as seedEvents,
  featuredEventSlug,
} from "@/lib/events";
import type { Payload } from "payload";

import {
  getOrCreateMedia,
  publicAssetToFilePath,
} from "./lib/seed-helpers";

function parseEventDate(dateLabel: string): string {
  const parsed = new Date(dateLabel);

  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Could not parse event date: ${dateLabel}`);
  }

  return parsed.toISOString();
}

async function getOrCreateEventMedia(
  payload: Payload,
  publicPath: string,
  alt: string,
): Promise<number> {
  const filePath = publicAssetToFilePath(publicPath);
  const fileName = path.basename(filePath);

  const existing = await payload.find({
    collection: "media",
    limit: 1,
    overrideAccess: true,
    where: {
      filename: {
        equals: fileName,
      },
    },
  });

  if (existing.docs[0]) {
    console.log(`  ↳ reusing media: ${fileName}`);
    return existing.docs[0].id;
  }

  const media = await payload.create({
    collection: "media",
    data: {
      alt,
    },
    filePath,
    overrideAccess: true,
  });

  console.log(`  ↳ created media: ${fileName}`);
  return media.id;
}

export async function seedEventsData(payload: Payload): Promise<void> {
  console.log(`Seeding ${seedEvents.length} events...\n`);

  for (const [index, event] of seedEvents.entries()) {
    const existing = await payload.find({
      collection: "events",
      limit: 1,
      overrideAccess: true,
      where: {
        slug: {
          equals: event.slug,
        },
      },
    });

    if (existing.docs[0]) {
      console.log(`• skipped (exists): ${event.title}`);
      continue;
    }

    console.log(`• creating: ${event.title}`);

    const posterImageId = await getOrCreateEventMedia(
      payload,
      event.image,
      `${event.title} poster`,
    );

    await payload.create({
      collection: "events",
      overrideAccess: true,
      data: {
        title: event.title,
        slug: event.slug,
        eventDate: parseEventDate(event.date),
        startTime: event.time,
        location: event.location,
        shortSummary: event.shortSummary,
        description: event.description,
        posterImage: posterImageId,
        hasTickets: event.hasTickets,
        ticketLabel:
          event.ticketLabel ?? (event.hasTickets ? "Tickets & Info" : "Info"),
        isFeatured: event.slug === featuredEventSlug,
        sortOrder: index,
        _status: "published",
      },
    });

    console.log(`  ✓ published: ${event.slug}`);
  }

  console.log("\nEvent seed complete.");
}

async function runStandalone(): Promise<void> {
  const config = (await import("@/payload.config")).default;
  const { getPayload } = await import("payload");
  const payload = await getPayload({ config });
  await seedEventsData(payload);
}

if (process.argv[1]?.includes("seed-events.ts")) {
  runStandalone()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Event seed failed:", error);
      process.exit(1);
    });
}

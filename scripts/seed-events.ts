import path from "path";
import { fileURLToPath } from "url";

import config from "@/payload.config";
import {
  events as seedEvents,
  featuredEventSlug,
} from "@/lib/events";
import { getPayload } from "payload";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const projectRoot = path.resolve(dirname, "..");

function parseEventDate(dateLabel: string): string {
  const parsed = new Date(dateLabel);

  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Could not parse event date: ${dateLabel}`);
  }

  return parsed.toISOString();
}

function publicAssetToFilePath(publicPath: string): string {
  const relativePath = publicPath.replace(/^\//, "");
  return path.join(projectRoot, "public", relativePath);
}

async function getOrCreateMedia(
  payload: Awaited<ReturnType<typeof getPayload>>,
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

async function seedEventsData() {
  const payload = await getPayload({ config });

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

    const posterImageId = await getOrCreateMedia(
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

try {
  await seedEventsData();
  process.exit(0);
} catch (error) {
  console.error("Event seed failed:", error);
  process.exit(1);
}

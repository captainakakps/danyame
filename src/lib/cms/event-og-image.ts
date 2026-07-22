import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { getEventBySlug } from "@/lib/cms/events";
import { DEFAULT_OG_IMAGE, toAbsoluteUrl } from "@/lib/seo";

export const eventOgImageSize = {
  width: 1200,
  height: 630,
} as const;

export const eventOgImageContentType = "image/jpeg";

async function loadFallbackPoster(): Promise<Buffer> {
  return readFile(
    path.join(process.cwd(), "public", DEFAULT_OG_IMAGE.replace(/^\//, "")),
  );
}

async function loadEventPosterBuffer(slug: string): Promise<Buffer> {
  const event = await getEventBySlug(slug);
  const imageUrl = toAbsoluteUrl(event?.image);

  if (!imageUrl) {
    return loadFallbackPoster();
  }

  try {
    const response = await fetch(imageUrl, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return loadFallbackPoster();
    }

    return Buffer.from(await response.arrayBuffer());
  } catch {
    return loadFallbackPoster();
  }
}

/** Build a crawlable OG image from the event's current CMS poster. */
export async function createEventOgImageResponse(
  slug: string,
): Promise<Response> {
  const source = await loadEventPosterBuffer(slug);
  const body = await sharp(source)
    .resize(eventOgImageSize.width, eventOgImageSize.height, {
      fit: "cover",
      position: "centre",
    })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();

  return new Response(new Uint8Array(body), {
    headers: {
      "Content-Type": eventOgImageContentType,
      "Cache-Control":
        "public, max-age=60, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

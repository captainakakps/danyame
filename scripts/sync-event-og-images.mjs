/**
 * Sync event share-preview JPEGs into public/assets/events/{slug}.jpg
 * so WhatsApp/Facebook can fetch static files (same approach as menu cards).
 *
 * Usage: npm run sync:event-og
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const WIDTH = 1200;
const HEIGHT = 630;
const OUT_DIR = path.join(process.cwd(), "public", "assets", "events");

function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_SERVER_URL ||
    "https://visitdanyame.com";
  return raw.replace(/\/$/, "");
}

function toAbsoluteUrl(url: string, baseUrl: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `${baseUrl}${url.startsWith("/") ? url : `/${url}`}`;
}

async function main() {
  const site = getSiteUrl();
  const query = new URLSearchParams({
    limit: "100",
    depth: "1",
    "where[_status][equals]": "published",
  });

  const response = await fetch(`${site}/api/events?${query}`);
  if (!response.ok) {
    throw new Error(`Failed to load events: ${response.status}`);
  }

  const data = (await response.json()) as {
    docs?: Array<{
      slug?: string;
      posterImage?: { url?: string | null } | number | null;
    }>;
  };

  await mkdir(OUT_DIR, { recursive: true });

  let written = 0;
  for (const doc of data.docs ?? []) {
    if (!doc.slug) continue;
    const poster = doc.posterImage;
    if (!poster || typeof poster !== "object" || !poster.url) {
      console.warn(`skip ${doc.slug}: no poster`);
      continue;
    }

    const posterResponse = await fetch(toAbsoluteUrl(poster.url, site));
    if (!posterResponse.ok) {
      console.warn(`skip ${doc.slug}: poster fetch ${posterResponse.status}`);
      continue;
    }

    const source = Buffer.from(await posterResponse.arrayBuffer());
    const jpeg = await sharp(source)
      .rotate()
      .resize(WIDTH, HEIGHT, { fit: "cover", position: "centre" })
      .jpeg({ quality: 70, mozjpeg: true })
      .toBuffer();

    const outPath = path.join(OUT_DIR, `${doc.slug}.jpg`);
    await writeFile(outPath, jpeg);
    written += 1;
    console.log(`wrote ${outPath} (${jpeg.byteLength} bytes)`);
  }

  console.log(`synced ${written} event OG image(s)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

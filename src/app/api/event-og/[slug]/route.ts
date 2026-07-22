import sharp from "sharp";
import { DEFAULT_OG_IMAGE, getSiteUrl } from "@/lib/seo";

export const runtime = "nodejs";
export const revalidate = 60;

const WIDTH = 1200;
const HEIGHT = 630;

type RouteContext = {
  params: Promise<{ slug: string }>;
};

function toAbsoluteUrl(url: string, baseUrl: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `${baseUrl}${url.startsWith("/") ? url : `/${url}`}`;
}

async function loadPosterBuffer(slug: string): Promise<Buffer> {
  const site = getSiteUrl();
  const query = new URLSearchParams({
    "where[slug][equals]": slug,
    limit: "1",
    depth: "1",
  });

  const eventResponse = await fetch(`${site}/api/events?${query}`, {
    next: { revalidate: 60 },
  });

  if (eventResponse.ok) {
    const data = (await eventResponse.json()) as {
      docs?: Array<{
        posterImage?: { url?: string | null } | number | null;
      }>;
    };
    const poster = data.docs?.[0]?.posterImage;
    if (poster && typeof poster === "object" && poster.url) {
      const posterResponse = await fetch(toAbsoluteUrl(poster.url, site), {
        next: { revalidate: 60 },
      });

      if (posterResponse.ok) {
        return Buffer.from(await posterResponse.arrayBuffer());
      }
    }
  }

  const fallbackResponse = await fetch(toAbsoluteUrl(DEFAULT_OG_IMAGE, site), {
    next: { revalidate: 60 },
  });

  if (!fallbackResponse.ok) {
    throw new Error("Unable to load event poster or fallback image");
  }

  return Buffer.from(await fallbackResponse.arrayBuffer());
}

async function buildSocialJpeg(slug: string): Promise<Buffer> {
  const source = await loadPosterBuffer(slug);

  return sharp(source)
    .rotate()
    .resize(WIDTH, HEIGHT, {
      fit: "cover",
      position: "centre",
    })
    .jpeg({
      quality: 70,
      mozjpeg: true,
    })
    .toBuffer();
}

const cacheHeaders = {
  "Content-Type": "image/jpeg",
  "Cache-Control":
    "public, max-age=60, s-maxage=3600, stale-while-revalidate=86400",
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;

  try {
    const jpeg = await buildSocialJpeg(slug);
    return new Response(new Uint8Array(jpeg), { headers: cacheHeaders });
  } catch {
    return new Response("Event preview image unavailable", { status: 404 });
  }
}

/** WhatsApp probes with HEAD first; Payload media HEAD returns 404. */
export async function HEAD() {
  return new Response(null, { status: 200, headers: cacheHeaders });
}

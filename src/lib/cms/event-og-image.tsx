import { ImageResponse } from "next/og";
import { DEFAULT_OG_IMAGE, getSiteUrl } from "@/lib/seo";

export const eventOgImageSize = {
  width: 1200,
  height: 630,
} as const;

export const eventOgImageContentType = "image/png";

function getFetchBaseUrl(): string {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return getSiteUrl();
}

function toAbsoluteMediaUrl(url: string, baseUrl: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `${baseUrl}${url.startsWith("/") ? url : `/${url}`}`;
}

async function resolveEventPosterUrl(slug: string): Promise<string> {
  const baseUrl = getFetchBaseUrl();
  const query = new URLSearchParams({
    "where[slug][equals]": slug,
    "where[_status][equals]": "published",
    limit: "1",
    depth: "1",
  });

  try {
    const response = await fetch(`${baseUrl}/api/events?${query}`, {
      next: { revalidate: 60 },
    });

    if (response.ok) {
      const data = (await response.json()) as {
        docs?: Array<{
          posterImage?: { url?: string | null } | number | null;
        }>;
      };
      const poster = data.docs?.[0]?.posterImage;
      if (poster && typeof poster === "object" && poster.url) {
        return toAbsoluteMediaUrl(poster.url, baseUrl);
      }
    }
  } catch {
    // Fall through to the default site image.
  }

  return toAbsoluteMediaUrl(DEFAULT_OG_IMAGE, getSiteUrl());
}

/** Lightweight OG image — no Payload client or sharp in the bundle. */
export async function createEventOgImageResponse(
  slug: string,
): Promise<ImageResponse> {
  const posterUrl = await resolveEventPosterUrl(slug);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundColor: "#111111",
        }}
      >
        {/* OG renderer fetches this URL server-side; not a Next Image. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={posterUrl}
          alt=""
          width={eventOgImageSize.width}
          height={eventOgImageSize.height}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    ),
    {
      ...eventOgImageSize,
    },
  );
}

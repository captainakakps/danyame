import type { Metadata } from "next";

const FALLBACK_SITE_URL = "https://visitdanyame.com";
const DEFAULT_OG_IMAGE = "/assets/home/hero-bg.jpg";

export function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_SERVER_URL ||
    FALLBACK_SITE_URL;

  return raw.replace(/\/$/, "");
}

export function getMetadataBase(): URL {
  return new URL(getSiteUrl());
}

/** Make a path or URL absolute for Open Graph crawlers. */
export function toAbsoluteUrl(pathOrUrl: string | null | undefined): string | undefined {
  if (!pathOrUrl) {
    return undefined;
  }

  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }

  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${getSiteUrl()}${path}`;
}

type SocialMetadataInput = {
  title: string;
  description: string;
  /** Pass `false` when a route file (`opengraph-image`) supplies the preview. */
  image?: string | null | false;
  imageAlt?: string;
  path?: string;
  type?: "website" | "article";
};

/** Shared Open Graph + Twitter card fields for link previews. */
export function buildSocialMetadata({
  title,
  description,
  image,
  imageAlt,
  path,
  type = "website",
}: SocialMetadataInput): Pick<Metadata, "openGraph" | "twitter"> {
  const alt = imageAlt || title;
  const url = path ? toAbsoluteUrl(path) : undefined;
  const imageUrl =
    image === false
      ? undefined
      : (toAbsoluteUrl(image) ?? toAbsoluteUrl(DEFAULT_OG_IMAGE)!);

  return {
    openGraph: {
      type,
      title,
      description,
      siteName: "Danyame Recreational Village",
      locale: "en_GH",
      ...(url ? { url } : {}),
      ...(imageUrl
        ? {
            images: [
              {
                url: imageUrl,
                alt,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
  };
}

export { DEFAULT_OG_IMAGE };

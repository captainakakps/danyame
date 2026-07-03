import type { Media } from "@/payload-types";

export function getMediaUrl(
  media: number | Media | null | undefined,
): string | undefined {
  if (!media || typeof media === "number") {
    return undefined;
  }

  return media.url || undefined;
}

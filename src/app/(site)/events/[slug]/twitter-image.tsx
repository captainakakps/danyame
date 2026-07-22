import {
  createEventOgImageResponse,
  eventOgImageContentType,
  eventOgImageSize,
} from "@/lib/cms/event-og-image";

export const alt = "Event at Danyame Recreational Village";
export const size = eventOgImageSize;
export const contentType = eventOgImageContentType;
export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: Props) {
  const { slug } = await params;
  return createEventOgImageResponse(slug);
}

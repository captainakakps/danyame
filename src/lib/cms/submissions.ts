import { getPayloadClient } from "@/lib/payload";
import type {
  ContactEventType,
  ContactPayload,
} from "@/lib/validation/contact";

export async function saveContactInquiry(payload: ContactPayload): Promise<void> {
  const client = await getPayloadClient();

  await client.create({
    collection: "contact-inquiries",
    overrideAccess: true,
    data: {
      name: payload.fullName,
      email: payload.email,
      phone: payload.phone,
      eventType: payload.eventType as ContactEventType,
      eventDate: payload.preferredDate,
      message: payload.message,
      status: "new",
    },
  });
}

export type NewsletterSubscribeResult =
  | { created: true }
  | { created: false; reason: "already-subscribed" };

export async function saveNewsletterSubscriber(
  email: string,
  source = "website",
): Promise<NewsletterSubscribeResult> {
  const client = await getPayloadClient();

  const existing = await client.find({
    collection: "newsletter-subscribers",
    limit: 1,
    overrideAccess: true,
    where: {
      email: {
        equals: email,
      },
    },
  });

  const subscriber = existing.docs[0];

  if (subscriber?.status === "subscribed") {
    return { created: false, reason: "already-subscribed" };
  }

  if (subscriber) {
    await client.update({
      collection: "newsletter-subscribers",
      id: subscriber.id,
      overrideAccess: true,
      data: {
        status: "subscribed",
        source,
      },
    });

    return { created: true };
  }

  await client.create({
    collection: "newsletter-subscribers",
    overrideAccess: true,
    data: {
      email,
      source,
      status: "subscribed",
    },
  });

  return { created: true };
}

import {
  flattenGallerySet,
  staticGalleryCategories,
} from "@/lib/gallery";
import { site as staticSite } from "@/lib/site";
import type { Payload } from "payload";

import { getOrCreateMedia } from "./lib/seed-helpers";

async function resetGalleryImages(payload: Payload): Promise<void> {
  const existing = await payload.find({
    collection: "gallery-images",
    limit: 500,
    overrideAccess: true,
  });

  for (const doc of existing.docs) {
    await payload.delete({
      collection: "gallery-images",
      id: doc.id,
      overrideAccess: true,
    });
  }
}

async function getOrCreateCategory(
  payload: Payload,
  name: string,
  slug: string,
  sortOrder: number,
): Promise<number> {
  const existing = await payload.find({
    collection: "gallery-categories",
    limit: 1,
    overrideAccess: true,
    where: {
      slug: { equals: slug },
    },
  });

  if (existing.docs[0]) {
    console.log(`• skipped category (exists): ${name}`);
    return existing.docs[0].id;
  }

  const created = await payload.create({
    collection: "gallery-categories",
    overrideAccess: true,
    data: {
      name,
      slug,
      sortOrder,
      isActive: true,
    },
  });

  console.log(`  ✓ category: ${name}`);
  return created.id;
}

async function seedGalleryImage(
  payload: Payload,
  categoryId: number,
  title: string,
  publicPath: string,
  alt: string,
  sortOrder: number,
): Promise<void> {
  const existing = await payload.find({
    collection: "gallery-images",
    limit: 1,
    overrideAccess: true,
    where: {
      and: [
        { category: { equals: categoryId } },
        { title: { equals: title } },
      ],
    },
  });

  if (existing.docs[0]) {
    console.log(`• skipped image (exists): ${title}`);
    return;
  }

  const imageId = await getOrCreateMedia(payload, publicPath, alt);

  await payload.create({
    collection: "gallery-images",
    overrideAccess: true,
    data: {
      title,
      category: categoryId,
      image: imageId,
      alt,
      sortOrder,
      isPublished: true,
    },
  });

  console.log(`  ✓ image: ${title}`);
}

async function seedSiteSettings(payload: Payload): Promise<void> {
  await payload.updateGlobal({
    slug: "site-settings",
    overrideAccess: true,
    data: {
      siteName: staticSite.name,
      shortName: staticSite.shortName,
      location: staticSite.location,
      phone: staticSite.contact.phone,
      phoneHref: staticSite.contact.phoneHref,
      secondaryPhone: staticSite.contact.secondaryPhone,
      secondaryPhoneHref: staticSite.contact.secondaryPhoneHref,
      whatsappHref: staticSite.contact.whatsappHref,
      whatsappLabel: staticSite.contact.whatsappLabel,
      email: staticSite.contact.email,
      openingHoursRows: staticSite.openingHours.map((row) => ({
        label: row.label,
        hours: row.hours,
      })),
      socialLinks: staticSite.social.map((link) => ({
        label: link.label,
        href: link.href,
      })),
      footerLinks: staticSite.exploreLinks.map((link) => ({
        label: link.label,
        href: link.href,
      })),
      copyrightYear: staticSite.copyrightYear,
    },
  });

  console.log("  ✓ site settings updated");
}

export async function seedGalleryData(payload: Payload): Promise<void> {
  const galleryImages = await payload.find({
    collection: "gallery-images",
    depth: 0,
    limit: 500,
    overrideAccess: true,
  });

  const mediaIds = new Set<number>();
  for (const doc of galleryImages.docs) {
    if (typeof doc.image === "number") {
      mediaIds.add(doc.image);
    }
  }

  await resetGalleryImages(payload);

  for (const mediaId of mediaIds) {
    await payload.delete({
      collection: "media",
      id: mediaId,
      overrideAccess: true,
    });
  }

  console.log(`Seeding ${staticGalleryCategories.length} gallery categories...\n`);

  for (const category of staticGalleryCategories) {
    const categoryId = await getOrCreateCategory(
      payload,
      category.name,
      category.slug,
      category.sortOrder,
    );

    if (!category.set) {
      continue;
    }

    const images = flattenGallerySet(category.set);

    for (const [index, image] of images.entries()) {
      await seedGalleryImage(
        payload,
        categoryId,
        `${category.name} ${index + 1}`,
        image.src,
        image.alt,
        index,
      );
    }
  }

  console.log("");
  await seedSiteSettings(payload);
  console.log("\nGallery seed complete.");
}

async function runStandalone(): Promise<void> {
  const config = (await import("@/payload.config")).default;
  const { getPayload } = await import("payload");
  const payload = await getPayload({ config });
  await seedGalleryData(payload);
}

try {
  await runStandalone();
  process.exit(0);
} catch (error) {
  console.error("Gallery seed failed:", error);
  process.exit(1);
}

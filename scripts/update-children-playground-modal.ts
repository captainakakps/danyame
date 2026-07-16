import type { Payload } from "payload";

async function updateChildrenPlaygroundModal(payload: Payload): Promise<void> {
  const doc = await payload.findGlobal({
    slug: "experiences-page",
    depth: 0,
    overrideAccess: true,
  });

  const items = doc.exploreMoreItems ?? [];
  const index = items.findIndex(
    (item) =>
      item.name?.toLowerCase().includes("children") ||
      item.name?.toLowerCase().includes("playground"),
  );

  if (index === -1) {
    throw new Error("Children's Playground facility not found in exploreMoreItems.");
  }

  const existing = items[index];
  items[index] = {
    ...existing,
    description:
      "A safe and colorful play area where children can explore, climb, and have fun in a supervised environment designed for families visiting Danyame.",
    detailRows: [
      { label: "Access", value: "Daily" },
      { label: "Starting From", value: "Contact Us" },
    ],
    includes: [
      { text: "Play Structures" },
      { text: "Soft Play Flooring" },
      { text: "Supervised Environment" },
      { text: "Age-Appropriate Equipment" },
      { text: "Parent Seating Area" },
    ],
    primaryCtaLabel: "Contact Us",
    primaryCtaHref: "/contact",
    secondaryCtaLabel: "Contact Us",
    secondaryCtaHref: "/contact",
  };

  await payload.updateGlobal({
    slug: "experiences-page",
    overrideAccess: true,
    data: { exploreMoreItems: items },
  });

  console.log(`  ✓ updated modal content for "${existing.name}"`);
}

async function run(): Promise<void> {
  const config = (await import("@/payload.config")).default;
  const { getPayload } = await import("payload");
  const payload = await getPayload({ config });
  await updateChildrenPlaygroundModal(payload);
}

try {
  await run();
  process.exit(0);
} catch (error) {
  console.error("Update failed:", error);
  process.exit(1);
}

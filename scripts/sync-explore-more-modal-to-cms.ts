import {
  exploreMoreModalContentByName,
  type ExploreMoreModalContent,
} from "@/lib/pages/explore-more-modal-content";
import type { Payload } from "payload";

function hasModalContentInCms(item: {
  description?: string | null;
  detailRows?: { label?: string | null; value?: string | null }[] | null;
  includes?: { text?: string | null }[] | null;
}): boolean {
  if (item.description?.trim()) {
    return true;
  }

  if (item.detailRows?.some((row) => row.label && row.value)) {
    return true;
  }

  if (item.includes?.some((entry) => entry.text?.trim())) {
    return true;
  }

  return false;
}

function modalContentToCmsFields(modal: ExploreMoreModalContent) {
  return {
    description: modal.description,
    detailRows: modal.detailRows,
    includes: modal.includes.map((text) => ({ text })),
    primaryCtaLabel: modal.primaryCtaLabel,
    primaryCtaHref: modal.primaryCtaHref,
    secondaryCtaLabel: modal.secondaryCtaLabel,
    secondaryCtaHref: modal.secondaryCtaHref,
  };
}

async function syncExploreMoreModalToCms(payload: Payload): Promise<void> {
  const doc = await payload.findGlobal({
    slug: "experiences-page",
    depth: 0,
    overrideAccess: true,
  });

  const items = doc.exploreMoreItems ?? [];
  if (items.length === 0) {
    console.log("  No explore more items found.");
    return;
  }

  let updated = 0;
  let skipped = 0;

  const nextItems = items.map((item) => {
    if (!item.name) {
      return item;
    }

    if (hasModalContentInCms(item)) {
      skipped += 1;
      console.log(`  · ${item.name} — already has modal content, skipped`);
      return item;
    }

    const fallback = exploreMoreModalContentByName[item.name];
    if (!fallback) {
      skipped += 1;
      console.log(`  · ${item.name} — no fallback content, skipped`);
      return item;
    }

    updated += 1;
    console.log(`  ✓ ${item.name} — synced modal content to CMS`);
    return {
      ...item,
      ...modalContentToCmsFields(fallback),
    };
  });

  if (updated === 0) {
    console.log("\nNo items needed syncing.");
    return;
  }

  await payload.updateGlobal({
    slug: "experiences-page",
    overrideAccess: true,
    data: { exploreMoreItems: nextItems },
  });

  console.log(`\nSynced modal content for ${updated} item(s). Skipped ${skipped}.`);
}

async function run(): Promise<void> {
  const config = (await import("@/payload.config")).default;
  const { getPayload } = await import("payload");
  const payload = await getPayload({ config });
  console.log("Syncing explore more modal content to CMS...\n");
  await syncExploreMoreModalToCms(payload);
}

try {
  await run();
  process.exit(0);
} catch (error) {
  console.error("Sync failed:", error);
  process.exit(1);
}

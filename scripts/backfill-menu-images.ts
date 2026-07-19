import { syncMenuImages } from "./lib/menu-image-sync";

async function run(): Promise<void> {
  const config = (await import("@/payload.config")).default;
  const { getPayload } = await import("payload");
  const payload = await getPayload({ config });

  console.log("Backfilling menu images in CMS...\n");
  await syncMenuImages(payload);
}

try {
  await run();
  process.exit(0);
} catch (error) {
  console.error("Menu image backfill failed:", error);
  process.exit(1);
}

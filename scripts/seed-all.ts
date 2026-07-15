import { execSync } from "node:child_process";

import config from "@/payload.config";
import { getPayload } from "payload";

import { projectRoot } from "./lib/seed-helpers";
import { seedEventsData } from "./seed-events";
import { seedGalleryData } from "./seed-gallery";
import { seedHomeData } from "./seed-home";
import { seedMenuData } from "./seed-menu";
import { seedPagesData } from "./seed-pages";

const env = {
  ...process.env,
  NODE_OPTIONS: process.env.NODE_OPTIONS ?? "--no-deprecation",
};

function requireEnv(name: string): void {
  if (!process.env[name]?.trim()) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
}

function runMigrate(): void {
  console.log("\n==> Running database migrations...\n");

  try {
    execSync("npx payload migrate", {
      cwd: projectRoot,
      stdio: "inherit",
      env,
    });
  } catch {
    console.log("Migration needs confirmation — proceeding automatically...\n");
    execSync('printf "y\\n" | npx payload migrate', {
      cwd: projectRoot,
      stdio: "inherit",
      env,
      shell: "/bin/bash",
    });
  }
}

async function bootstrap(): Promise<void> {
  requireEnv("DATABASE_URI");
  requireEnv("PAYLOAD_SECRET");

  if (!process.env.BLOB_READ_WRITE_TOKEN?.trim()) {
    console.warn(
      "Warning: BLOB_READ_WRITE_TOKEN is not set. Media uploads will fail unless local storage is enabled.\n",
    );
  }

  runMigrate();

  const payload = await getPayload({ config });

  console.log("\n==> Seeding page globals...\n");
  await seedPagesData(payload);

  console.log("\n==> Seeding home page...\n");
  await seedHomeData(payload);

  console.log("\n==> Seeding events...\n");
  await seedEventsData(payload);

  console.log("\n==> Seeding gallery and site settings...\n");
  await seedGalleryData(payload);

  console.log("\n==> Seeding menu...\n");
  await seedMenuData(payload);

  console.log("\nBootstrap complete.");
}

try {
  await bootstrap();
  process.exit(0);
} catch (error) {
  console.error("\nBootstrap failed:", error);
  process.exit(1);
}

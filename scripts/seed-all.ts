import { execSync } from "node:child_process";

import config from "@/payload.config";
import { getPayload, type Payload } from "payload";

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

const INITIAL_MIGRATION = "20260715_140605_initial";

function requireEnv(...names: string[]): void {
  if (names.some((name) => process.env[name]?.trim())) {
    return;
  }

  throw new Error(
    `Missing required environment variable. Set one of: ${names.join(", ")}`,
  );
}

function getExecOutput(error: unknown): string {
  if (!error || typeof error !== "object") {
    return String(error);
  }

  const execError = error as { stdout?: string; stderr?: string; message?: string };
  return [execError.stdout, execError.stderr, execError.message]
    .filter(Boolean)
    .join("\n");
}

function migrationsAreApplied(statusOutput: string): boolean {
  return (
    statusOutput.includes(INITIAL_MIGRATION) &&
    /\│[^│]*20260715_140605_initial[^│]*│[^│]*│[^│]*Yes[^│]*│/m.test(
      statusOutput,
    )
  );
}

async function databaseSchemaExists(payload: Payload): Promise<boolean> {
  try {
    await payload.find({
      collection: "users",
      limit: 1,
      overrideAccess: true,
    });
    return true;
  } catch {
    return false;
  }
}

async function markInitialMigrationComplete(payload: Payload): Promise<void> {
  await payload.db.drizzle.execute(`
    INSERT INTO "payload_migrations" ("name", "batch", "updated_at", "created_at")
    SELECT '${INITIAL_MIGRATION}', 1, NOW(), NOW()
    WHERE NOT EXISTS (
      SELECT 1 FROM "payload_migrations" WHERE "name" = '${INITIAL_MIGRATION}'
    );
  `);

  console.log("Marked initial migration as complete.\n");
}

async function prepareLegacySchema(payload: Payload): Promise<void> {
  const fixes = [
    `ALTER TABLE "about_page" ALTER COLUMN "quote_text" DROP NOT NULL`,
  ];

  for (const sql of fixes) {
    try {
      await payload.db.drizzle.execute(sql);
    } catch {
      // Ignore if the legacy column is already gone or nullable.
    }
  }
}

async function ensureMigrations(payload: Payload): Promise<void> {
  console.log("\n==> Checking database migrations...\n");

  const status = execSync("npx payload migrate:status", {
    cwd: projectRoot,
    encoding: "utf8",
    env,
  });

  if (migrationsAreApplied(status)) {
    console.log("Migrations already applied.\n");
    return;
  }

  if (await databaseSchemaExists(payload)) {
    console.warn(
      "Database schema already exists. Skipping migration SQL and continuing to seed.\n",
    );
    await markInitialMigrationComplete(payload);
    return;
  }

  execSync('printf "y\\n" | npx payload migrate', {
    cwd: projectRoot,
    stdio: "inherit",
    env,
    shell: "/bin/bash",
  });

  console.log("Migrations applied.\n");
}

async function bootstrap(): Promise<void> {
  requireEnv("DATABASE_URL", "POSTGRES_URL", "DATABASE_URI");
  requireEnv("PAYLOAD_SECRET");

  if (!process.env.BLOB_READ_WRITE_TOKEN?.trim()) {
    console.warn(
      "Warning: BLOB_READ_WRITE_TOKEN is not set. Media uploads will fail unless local storage is enabled.\n",
    );
  }

  const payload = await getPayload({ config });
  await ensureMigrations(payload);
  await prepareLegacySchema(payload);

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

  const status = execSync("npx payload migrate:status", {
    cwd: projectRoot,
    encoding: "utf8",
    env,
  });

  if (!migrationsAreApplied(status)) {
    await markInitialMigrationComplete(payload);
  }

  console.log("\nBootstrap complete.");
}

try {
  await bootstrap();
  process.exit(0);
} catch (error) {
  console.error("\nBootstrap failed:", error);
  process.exit(1);
}

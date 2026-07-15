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

const INITIAL_MIGRATION = "20260715_140605_initial";

function requireEnv(name: string): void {
  if (!process.env[name]?.trim()) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
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

function schemaAlreadyExists(output: string): boolean {
  return /already exists/i.test(output);
}

async function markInitialMigrationComplete(): Promise<void> {
  const payload = await getPayload({ config });

  await payload.db.drizzle.execute(`
    INSERT INTO "payload_migrations" ("name", "batch", "updated_at", "created_at")
    SELECT '${INITIAL_MIGRATION}', 1, NOW(), NOW()
    WHERE NOT EXISTS (
      SELECT 1 FROM "payload_migrations" WHERE "name" = '${INITIAL_MIGRATION}'
    );
  `);

  console.log("Marked initial migration as complete.\n");
}

function runMigrate(): void {
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

  try {
    execSync("npx payload migrate", {
      cwd: projectRoot,
      stdio: "pipe",
      env,
      encoding: "utf8",
    });
    console.log("Migrations applied.\n");
  } catch (error) {
    const output = getExecOutput(error);

    if (schemaAlreadyExists(output)) {
      console.warn(
        "Database schema already exists (from a previous deploy or dev sync). Skipping migration SQL and continuing to seed.\n",
      );
      return;
    }

    try {
      execSync('printf "y\\n" | npx payload migrate', {
        cwd: projectRoot,
        stdio: "pipe",
        env,
        shell: "/bin/bash",
        encoding: "utf8",
      });
      console.log("Migrations applied.\n");
    } catch (confirmError) {
      const confirmOutput = getExecOutput(confirmError);

      if (schemaAlreadyExists(confirmOutput)) {
        console.warn(
          "Database schema already exists (from a previous deploy or dev sync). Skipping migration SQL and continuing to seed.\n",
        );
        return;
      }

      throw confirmError;
    }
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

  const status = execSync("npx payload migrate:status", {
    cwd: projectRoot,
    encoding: "utf8",
    env,
  });

  if (!migrationsAreApplied(status)) {
    await markInitialMigrationComplete();
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

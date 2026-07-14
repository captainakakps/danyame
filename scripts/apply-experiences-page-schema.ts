import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

import pg from "pg";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const projectRoot = path.resolve(dirname, "..");

const CATEGORY_SLUGS = ["events", "pool", "food", "games"];

function getDatabaseUri(): string {
  const envPath = path.join(projectRoot, ".env.local");
  const env = readFileSync(envPath, "utf8");

  for (const line of env.split("\n")) {
    if (line.startsWith("DATABASE_URI=")) {
      return line.slice("DATABASE_URI=".length).trim().replace(/^["']|["']$/g, "");
    }
  }

  throw new Error("DATABASE_URI not found in .env.local");
}

async function applyExperiencesPageSchema(): Promise<void> {
  const client = new pg.Client({ connectionString: getDatabaseUri() });
  await client.connect();

  const statements = [
    `ALTER TABLE "experiences_page" ADD COLUMN IF NOT EXISTS "explore_more_title" varchar`,
    `ALTER TABLE "experiences_page" ADD COLUMN IF NOT EXISTS "explore_more_intro" varchar`,
    `ALTER TABLE "experiences_page_categories" ADD COLUMN IF NOT EXISTS "slug" varchar`,
    `CREATE TABLE IF NOT EXISTS "experiences_page_explore_more_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "tagline" varchar NOT NULL,
      "href" varchar
    )`,
    `CREATE INDEX IF NOT EXISTS "experiences_page_explore_more_items_order_idx" ON "experiences_page_explore_more_items" ("_order")`,
    `CREATE INDEX IF NOT EXISTS "experiences_page_explore_more_items_parent_id_idx" ON "experiences_page_explore_more_items" ("_parent_id")`,
    `ALTER TABLE "experiences_page_explore_more_items" ADD COLUMN IF NOT EXISTS "image_id" integer`,
    `ALTER TABLE "experiences_page_explore_more_items" ADD COLUMN IF NOT EXISTS "image_alt" varchar`,
  ];

  for (const sql of statements) {
    await client.query(sql);
    console.log(`  ✓ ${sql.split("\n")[0]}`);
  }

  const categories = await client.query(
    `SELECT "id", "_order" FROM "experiences_page_categories" ORDER BY "_order" ASC`,
  );

  for (const [index, row] of categories.rows.entries()) {
    const slug = CATEGORY_SLUGS[index] ?? `category-${index + 1}`;
    await client.query(
      `UPDATE "experiences_page_categories" SET "slug" = $1 WHERE "id" = $2 AND ("slug" IS NULL OR "slug" = '')`,
      [slug, row.id],
    );
    console.log(`  ✓ category slug: ${slug}`);
  }

  await client.end();
  console.log("\nExperiences page schema applied.");
}

try {
  await applyExperiencesPageSchema();
} catch (error) {
  console.error("Schema apply failed:", error);
  process.exit(1);
}

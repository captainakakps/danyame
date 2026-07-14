import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

import pg from "pg";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const projectRoot = path.resolve(dirname, "..");

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

async function applyAboutPageSchema(): Promise<void> {
  const client = new pg.Client({ connectionString: getDatabaseUri() });
  await client.connect();

  const statements = [
    `ALTER TABLE "about_page" ADD COLUMN IF NOT EXISTS "intro_label" varchar`,
    `ALTER TABLE "about_page" ADD COLUMN IF NOT EXISTS "intro_welcome_heading" varchar`,
    `ALTER TABLE "about_page" ADD COLUMN IF NOT EXISTS "intro_primary_image_id" integer`,
    `ALTER TABLE "about_page" ADD COLUMN IF NOT EXISTS "intro_primary_image_alt" varchar`,
    `ALTER TABLE "about_page" ADD COLUMN IF NOT EXISTS "intro_since_card_image_id" integer`,
    `ALTER TABLE "about_page" ADD COLUMN IF NOT EXISTS "intro_since_card_label" varchar`,
    `ALTER TABLE "about_page" ADD COLUMN IF NOT EXISTS "intro_since_card_text" varchar`,
    `ALTER TABLE "about_page" ADD COLUMN IF NOT EXISTS "intro_paragraph" varchar`,
    `ALTER TABLE "about_page" ADD COLUMN IF NOT EXISTS "leadership_intro" varchar`,
    `ALTER TABLE "about_page" ADD COLUMN IF NOT EXISTS "leadership_image_id" integer`,
    `ALTER TABLE "about_page" ADD COLUMN IF NOT EXISTS "leadership_image_alt" varchar`,
    `ALTER TABLE "about_page" ADD COLUMN IF NOT EXISTS "mission_icon_id" integer`,
    `ALTER TABLE "about_page" ADD COLUMN IF NOT EXISTS "mission_title" varchar`,
    `ALTER TABLE "about_page" ADD COLUMN IF NOT EXISTS "mission_text" varchar`,
    `ALTER TABLE "about_page" ADD COLUMN IF NOT EXISTS "vision_icon_id" integer`,
    `ALTER TABLE "about_page" ADD COLUMN IF NOT EXISTS "vision_title" varchar`,
    `ALTER TABLE "about_page" ADD COLUMN IF NOT EXISTS "vision_text" varchar`,
    `ALTER TABLE "about_page" ADD COLUMN IF NOT EXISTS "location_background_image_id" integer`,
    `ALTER TABLE "about_page" ADD COLUMN IF NOT EXISTS "location_pin_icon_id" integer`,
    `ALTER TABLE "about_page" ADD COLUMN IF NOT EXISTS "location_text" varchar`,
    `ALTER TABLE "about_page" ADD COLUMN IF NOT EXISTS "map_title" varchar`,
    `ALTER TABLE "about_page" ADD COLUMN IF NOT EXISTS "map_image_id" integer`,
    `ALTER TABLE "about_page" ADD COLUMN IF NOT EXISTS "map_link" varchar`,
    `CREATE TABLE IF NOT EXISTS "about_page_leadership_paragraphs" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "text" varchar NOT NULL
    )`,
    `CREATE INDEX IF NOT EXISTS "about_page_leadership_paragraphs_order_idx" ON "about_page_leadership_paragraphs" ("_order")`,
    `CREATE INDEX IF NOT EXISTS "about_page_leadership_paragraphs_parent_id_idx" ON "about_page_leadership_paragraphs" ("_parent_id")`,
    `DROP TABLE IF EXISTS "about_page_body_paragraphs"`,
  ];

  for (const sql of statements) {
    await client.query(sql);
    console.log(`  ✓ ${sql.split("\n")[0]}`);
  }

  await client.end();
  console.log("\nAbout page schema applied.");
}

try {
  await applyAboutPageSchema();
} catch (error) {
  console.error("Schema apply failed:", error);
  process.exit(1);
}

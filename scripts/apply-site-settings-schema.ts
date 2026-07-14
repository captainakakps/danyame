import config from "@/payload.config";
import { getPayload } from "payload";

async function applySiteSettingsSchema(): Promise<void> {
  const payload = await getPayload({ config });
  const pool = payload.db.pool;

  if (!pool) {
    throw new Error("Database pool is not available.");
  }

  const statements = [
    `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "secondary_phone" varchar`,
    `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "secondary_phone_href" varchar`,
    `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "whatsapp_href" varchar`,
    `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "whatsapp_label" varchar`,
    `CREATE TABLE IF NOT EXISTS "site_settings_opening_hours_rows" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar NOT NULL,
      "hours" varchar NOT NULL
    )`,
    `CREATE INDEX IF NOT EXISTS "site_settings_opening_hours_rows_order_idx" ON "site_settings_opening_hours_rows" ("_order")`,
    `CREATE INDEX IF NOT EXISTS "site_settings_opening_hours_rows_parent_id_idx" ON "site_settings_opening_hours_rows" ("_parent_id")`,
  ];

  for (const sql of statements) {
    await pool.query(sql);
    console.log(`  ✓ ${sql.split("\n")[0]}`);
  }

  console.log("\nSite settings schema applied.");
  process.exit(0);
}

try {
  await applySiteSettingsSchema();
} catch (error) {
  console.error("Schema apply failed:", error);
  process.exit(1);
}

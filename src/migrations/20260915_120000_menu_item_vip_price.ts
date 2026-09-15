import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "menu_items" ADD COLUMN "vip_price" numeric;
    ALTER TABLE "_menu_items_v" ADD COLUMN "version_vip_price" numeric;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "menu_items" DROP COLUMN "vip_price";
    ALTER TABLE "_menu_items_v" DROP COLUMN "version_vip_price";
  `);
}

import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "menu_categories" ADD COLUMN "image_id" integer;
    ALTER TABLE "menu_categories" ADD CONSTRAINT "menu_categories_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    CREATE INDEX "menu_categories_image_idx" ON "menu_categories" USING btree ("image_id");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "menu_categories" DROP CONSTRAINT "menu_categories_image_id_media_id_fk";
    DROP INDEX "menu_categories_image_idx";
    ALTER TABLE "menu_categories" DROP COLUMN "image_id";
  `);
}

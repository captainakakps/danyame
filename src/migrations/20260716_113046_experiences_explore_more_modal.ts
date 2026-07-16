import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "experiences_page_explore_more_items_detail_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "experiences_page_explore_more_items_includes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  ALTER TABLE "home_page" ALTER COLUMN "gallery_use_cms_gallery" SET DEFAULT false;
  ALTER TABLE "experiences_page_explore_more_items" ADD COLUMN "description" varchar;
  ALTER TABLE "experiences_page_explore_more_items" ADD COLUMN "primary_cta_label" varchar DEFAULT 'Contact Us';
  ALTER TABLE "experiences_page_explore_more_items" ADD COLUMN "primary_cta_href" varchar DEFAULT '/contact';
  ALTER TABLE "experiences_page_explore_more_items" ADD COLUMN "secondary_cta_label" varchar DEFAULT 'Contact Us';
  ALTER TABLE "experiences_page_explore_more_items" ADD COLUMN "secondary_cta_href" varchar DEFAULT '/contact';
  ALTER TABLE "experiences_page_explore_more_items_detail_rows" ADD CONSTRAINT "experiences_page_explore_more_items_detail_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences_page_explore_more_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_page_explore_more_items_includes" ADD CONSTRAINT "experiences_page_explore_more_items_includes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences_page_explore_more_items"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "experiences_page_explore_more_items_detail_rows_order_idx" ON "experiences_page_explore_more_items_detail_rows" USING btree ("_order");
  CREATE INDEX "experiences_page_explore_more_items_detail_rows_parent_id_idx" ON "experiences_page_explore_more_items_detail_rows" USING btree ("_parent_id");
  CREATE INDEX "experiences_page_explore_more_items_includes_order_idx" ON "experiences_page_explore_more_items_includes" USING btree ("_order");
  CREATE INDEX "experiences_page_explore_more_items_includes_parent_id_idx" ON "experiences_page_explore_more_items_includes" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "experiences_page_explore_more_items_detail_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "experiences_page_explore_more_items_includes" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "experiences_page_explore_more_items_detail_rows" CASCADE;
  DROP TABLE "experiences_page_explore_more_items_includes" CASCADE;
  ALTER TABLE "home_page" ALTER COLUMN "gallery_use_cms_gallery" SET DEFAULT true;
  ALTER TABLE "experiences_page_explore_more_items" DROP COLUMN "description";
  ALTER TABLE "experiences_page_explore_more_items" DROP COLUMN "primary_cta_label";
  ALTER TABLE "experiences_page_explore_more_items" DROP COLUMN "primary_cta_href";
  ALTER TABLE "experiences_page_explore_more_items" DROP COLUMN "secondary_cta_label";
  ALTER TABLE "experiences_page_explore_more_items" DROP COLUMN "secondary_cta_href";`)
}

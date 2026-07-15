import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('admin');
  CREATE TYPE "public"."enum_events_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__events_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_menu_items_tags" AS ENUM('popular', 'new', 'spicy', 'vegetarian', 'alcoholic', 'non-alcoholic');
  CREATE TYPE "public"."enum_menu_items_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__menu_items_v_version_tags" AS ENUM('popular', 'new', 'spicy', 'vegetarian', 'alcoholic', 'non-alcoholic');
  CREATE TYPE "public"."enum__menu_items_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_contact_inquiries_event_type" AS ENUM('Corporate Event', 'Birthday / Celebration', 'Pool Party', 'Food & Nightlife', 'Other');
  CREATE TYPE "public"."enum_contact_inquiries_status" AS ENUM('new', 'contacted', 'closed');
  CREATE TYPE "public"."enum_newsletter_subscribers_status" AS ENUM('subscribed', 'unsubscribed');
  CREATE TYPE "public"."enum_home_page_testimonials_items_card_style" AS ENUM('light', 'dark');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" "enum_users_role" DEFAULT 'admin' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"event_date" timestamp(3) with time zone,
  	"start_time" varchar,
  	"location" varchar,
  	"short_summary" varchar,
  	"description" varchar,
  	"poster_image_id" integer,
  	"has_tickets" boolean DEFAULT false,
  	"ticket_label" varchar DEFAULT 'Tickets & Info',
  	"ticket_url" varchar,
  	"is_featured" boolean DEFAULT false,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_events_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_events_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_event_date" timestamp(3) with time zone,
  	"version_start_time" varchar,
  	"version_location" varchar,
  	"version_short_summary" varchar,
  	"version_description" varchar,
  	"version_poster_image_id" integer,
  	"version_has_tickets" boolean DEFAULT false,
  	"version_ticket_label" varchar DEFAULT 'Tickets & Info',
  	"version_ticket_url" varchar,
  	"version_is_featured" boolean DEFAULT false,
  	"version_sort_order" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__events_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "menu_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"sort_order" numeric DEFAULT 0,
  	"is_active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "menu_items_tags" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_menu_items_tags",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "menu_items" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"category_id" integer,
  	"description" varchar,
  	"price" numeric,
  	"image_id" integer,
  	"is_available" boolean DEFAULT true,
  	"is_featured" boolean DEFAULT false,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_menu_items_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_menu_items_v_version_tags" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__menu_items_v_version_tags",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_menu_items_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_category_id" integer,
  	"version_description" varchar,
  	"version_price" numeric,
  	"version_image_id" integer,
  	"version_is_available" boolean DEFAULT true,
  	"version_is_featured" boolean DEFAULT false,
  	"version_sort_order" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__menu_items_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "menu_qr" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "gallery_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"sort_order" numeric DEFAULT 0,
  	"is_active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "gallery_images" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"category_id" integer NOT NULL,
  	"image_id" integer NOT NULL,
  	"alt" varchar NOT NULL,
  	"sort_order" numeric DEFAULT 0,
  	"is_published" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "contact_inquiries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"event_type" "enum_contact_inquiries_event_type" NOT NULL,
  	"event_date" timestamp(3) with time zone NOT NULL,
  	"message" varchar NOT NULL,
  	"status" "enum_contact_inquiries_status" DEFAULT 'new' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "newsletter_subscribers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"source" varchar DEFAULT 'website',
  	"status" "enum_newsletter_subscribers_status" DEFAULT 'subscribed' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"events_id" integer,
  	"menu_categories_id" integer,
  	"menu_items_id" integer,
  	"menu_qr_id" integer,
  	"gallery_categories_id" integer,
  	"gallery_images_id" integer,
  	"contact_inquiries_id" integer,
  	"newsletter_subscribers_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "home_page_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"alt" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"quote" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"image_alt" varchar NOT NULL,
  	"card_style" "enum_home_page_testimonials_items_card_style" DEFAULT 'light' NOT NULL
  );
  
  CREATE TABLE "home_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"hero_headline1" varchar DEFAULT 'Relaxation' NOT NULL,
  	"hero_headline2" varchar DEFAULT 'Entertainment' NOT NULL,
  	"hero_headline3" varchar DEFAULT 'Unforgettable Experiences' NOT NULL,
  	"hero_tagline" varchar NOT NULL,
  	"hero_subtext" varchar NOT NULL,
  	"everything_title" varchar DEFAULT 'Everything You Need in One Place' NOT NULL,
  	"everything_body" varchar NOT NULL,
  	"everything_cta_label" varchar DEFAULT 'Learn More' NOT NULL,
  	"everything_cta_href" varchar DEFAULT '/experiences' NOT NULL,
  	"about_title" varchar DEFAULT 'A Place Built for People' NOT NULL,
  	"about_body" varchar NOT NULL,
  	"about_image_id" integer,
  	"about_image_alt" varchar DEFAULT 'Danyame building',
  	"about_cta_label" varchar DEFAULT 'Learn More About US' NOT NULL,
  	"about_cta_href" varchar DEFAULT '/about' NOT NULL,
  	"events_section_title" varchar DEFAULT 'Upcoming Events' NOT NULL,
  	"events_heading" varchar NOT NULL,
  	"events_body" varchar NOT NULL,
  	"events_meta_every_week" varchar DEFAULT 'Every Week' NOT NULL,
  	"events_meta_location" varchar DEFAULT 'Akwatia, Eastern Region' NOT NULL,
  	"events_meta_vibes" varchar DEFAULT 'Good People Great Vibes' NOT NULL,
  	"events_register_label" varchar DEFAULT 'Register' NOT NULL,
  	"events_register_href" varchar DEFAULT '/events' NOT NULL,
  	"events_countdown_label" varchar DEFAULT 'NEXT EVENT IN' NOT NULL,
  	"events_view_all_label" varchar DEFAULT 'View All Events' NOT NULL,
  	"events_view_all_href" varchar DEFAULT '/events' NOT NULL,
  	"events_use_cms_countdown" boolean DEFAULT true,
  	"planning_event_image_id" integer,
  	"planning_event_image_alt" varchar DEFAULT 'Planning an event',
  	"planning_event_title" varchar DEFAULT 'Planning an event?' NOT NULL,
  	"planning_event_body" varchar NOT NULL,
  	"planning_event_cta_label" varchar DEFAULT 'Book an Event' NOT NULL,
  	"planning_event_cta_href" varchar DEFAULT '/contact' NOT NULL,
  	"gallery_title" varchar DEFAULT 'Moments at Danyame' NOT NULL,
  	"gallery_intro" varchar NOT NULL,
  	"gallery_use_cms_gallery" boolean DEFAULT true,
  	"gallery_cta_label" varchar DEFAULT 'View Full Gallery' NOT NULL,
  	"gallery_cta_href" varchar DEFAULT '/gallery' NOT NULL,
  	"testimonials_title" varchar DEFAULT 'What People Are Saying' NOT NULL,
  	"testimonials_background_image_id" integer,
  	"final_cta_line1" varchar DEFAULT 'READY' NOT NULL,
  	"final_cta_line2" varchar DEFAULT 'FOR YOUR' NOT NULL,
  	"final_cta_line3" varchar DEFAULT 'NEXT' NOT NULL,
  	"final_cta_line4" varchar DEFAULT 'EXPERIENCE' NOT NULL,
  	"final_cta_body" varchar NOT NULL,
  	"final_cta_secondary_label" varchar DEFAULT 'Contact Us' NOT NULL,
  	"final_cta_secondary_href" varchar DEFAULT '/contact' NOT NULL,
  	"final_cta_primary_label" varchar DEFAULT 'Book an Event' NOT NULL,
  	"final_cta_primary_href" varchar DEFAULT '/contact' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "experiences_page_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "experiences_page_explore_more_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"tagline" varchar NOT NULL,
  	"image_id" integer,
  	"image_alt" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "experiences_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"hero_title" varchar NOT NULL,
  	"tagline_primary" varchar NOT NULL,
  	"tagline_secondary" varchar NOT NULL,
  	"explore_more_title" varchar DEFAULT 'Explore More at Danyame' NOT NULL,
  	"explore_more_intro" varchar DEFAULT 'Beyond our signature experiences, discover the facilities and services that make every visit more convenient, enjoyable, and memorable. Tap any service to learn more, view pricing, and make an enquiry.' NOT NULL,
  	"final_cta_line1" varchar DEFAULT 'READY' NOT NULL,
  	"final_cta_line2" varchar DEFAULT 'FOR YOUR' NOT NULL,
  	"final_cta_line3" varchar DEFAULT 'NEXT' NOT NULL,
  	"final_cta_line4" varchar DEFAULT 'EXPERIENCE' NOT NULL,
  	"final_cta_body" varchar NOT NULL,
  	"final_cta_secondary_label" varchar DEFAULT 'Contact Us' NOT NULL,
  	"final_cta_secondary_href" varchar DEFAULT '/contact' NOT NULL,
  	"final_cta_primary_label" varchar DEFAULT 'Book an Event' NOT NULL,
  	"final_cta_primary_href" varchar DEFAULT '/contact' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_page_leadership_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_strip_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"alt" varchar NOT NULL
  );
  
  CREATE TABLE "about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"hero_title" varchar NOT NULL,
  	"hero_description" varchar NOT NULL,
  	"intro_label" varchar NOT NULL,
  	"intro_welcome_heading" varchar NOT NULL,
  	"intro_primary_image_id" integer,
  	"intro_primary_image_alt" varchar,
  	"intro_since_card_image_id" integer,
  	"intro_since_card_label" varchar DEFAULT 'SINCE 2024',
  	"intro_since_card_text" varchar,
  	"intro_paragraph" varchar NOT NULL,
  	"leadership_intro" varchar NOT NULL,
  	"leadership_image_id" integer,
  	"leadership_image_alt" varchar,
  	"mission_icon_id" integer,
  	"mission_title" varchar NOT NULL,
  	"mission_text" varchar NOT NULL,
  	"vision_icon_id" integer,
  	"vision_title" varchar NOT NULL,
  	"vision_text" varchar NOT NULL,
  	"location_background_image_id" integer,
  	"location_pin_icon_id" integer,
  	"location_text" varchar NOT NULL,
  	"map_title" varchar NOT NULL,
  	"map_image_id" integer,
  	"map_link" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "gallery_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'The Danyame Experience' NOT NULL,
  	"hero_intro" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "events_hub_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"hero_image_alt" varchar DEFAULT 'Elegant event venue at Danyame',
  	"hero_title" varchar NOT NULL,
  	"hero_body" varchar NOT NULL,
  	"hero_host_cta_label" varchar DEFAULT 'Host an Event' NOT NULL,
  	"hero_host_cta_href" varchar DEFAULT '/host-event' NOT NULL,
  	"hero_attend_cta_label" varchar DEFAULT 'Attend an Event' NOT NULL,
  	"hero_attend_cta_href" varchar DEFAULT '/attend-event' NOT NULL,
  	"section_title" varchar DEFAULT 'Choose Your Experience' NOT NULL,
  	"section_intro" varchar NOT NULL,
  	"host_card_image_id" integer NOT NULL,
  	"host_card_image_alt" varchar NOT NULL,
  	"host_card_title" varchar NOT NULL,
  	"host_card_body" varchar NOT NULL,
  	"host_card_cta_label" varchar NOT NULL,
  	"host_card_cta_href" varchar NOT NULL,
  	"attend_card_image_id" integer NOT NULL,
  	"attend_card_image_alt" varchar NOT NULL,
  	"attend_card_title" varchar NOT NULL,
  	"attend_card_body" varchar NOT NULL,
  	"attend_card_cta_label" varchar NOT NULL,
  	"attend_card_cta_href" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "host_event_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Host an Event' NOT NULL,
  	"body" varchar NOT NULL,
  	"hero_image_id" integer,
  	"hero_image_alt" varchar NOT NULL,
  	"primary_cta_label" varchar DEFAULT 'Book an Event' NOT NULL,
  	"primary_cta_href" varchar DEFAULT '/contact' NOT NULL,
  	"secondary_cta_label" varchar DEFAULT 'View All Events' NOT NULL,
  	"secondary_cta_href" varchar DEFAULT '/events' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline_line1" varchar DEFAULT 'GET' NOT NULL,
  	"headline_line2" varchar DEFAULT 'IN TOUCH:' NOT NULL,
  	"intro" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "menu_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"page_title" varchar DEFAULT 'Danyame Menu' NOT NULL,
  	"intro_text" varchar,
  	"currency" varchar DEFAULT 'GH₵' NOT NULL,
  	"show_unavailable_items" boolean DEFAULT false,
  	"qr_target_url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_opening_hours_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"hours" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_footer_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar DEFAULT 'Danyame Recreational Village' NOT NULL,
  	"short_name" varchar DEFAULT 'Danyame' NOT NULL,
  	"location" varchar DEFAULT 'Akwatia, Eastern Region, Ghana' NOT NULL,
  	"phone" varchar DEFAULT '+233 55 364 7512' NOT NULL,
  	"phone_href" varchar DEFAULT 'tel:+233553647512' NOT NULL,
  	"secondary_phone" varchar DEFAULT '+233 55 383 7811',
  	"secondary_phone_href" varchar DEFAULT 'tel:+233553837811',
  	"whatsapp_href" varchar DEFAULT 'https://wa.me/233553837811',
  	"whatsapp_label" varchar DEFAULT '(click to chat on whatsapp)',
  	"email" varchar DEFAULT 'danyamerecreationalvillage@gmail.com' NOT NULL,
  	"opening_hours" varchar,
  	"copyright_year" numeric DEFAULT 2026 NOT NULL,
  	"logo_id" integer,
  	"logo_dark_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_poster_image_id_media_id_fk" FOREIGN KEY ("poster_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_parent_id_events_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_version_poster_image_id_media_id_fk" FOREIGN KEY ("version_poster_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "menu_items_tags" ADD CONSTRAINT "menu_items_tags_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."menu_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_category_id_menu_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."menu_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_menu_items_v_version_tags" ADD CONSTRAINT "_menu_items_v_version_tags_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_menu_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_menu_items_v" ADD CONSTRAINT "_menu_items_v_parent_id_menu_items_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."menu_items"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_menu_items_v" ADD CONSTRAINT "_menu_items_v_version_category_id_menu_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."menu_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_menu_items_v" ADD CONSTRAINT "_menu_items_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery_images" ADD CONSTRAINT "gallery_images_category_id_gallery_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."gallery_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery_images" ADD CONSTRAINT "gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_menu_categories_fk" FOREIGN KEY ("menu_categories_id") REFERENCES "public"."menu_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_menu_items_fk" FOREIGN KEY ("menu_items_id") REFERENCES "public"."menu_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_menu_qr_fk" FOREIGN KEY ("menu_qr_id") REFERENCES "public"."menu_qr"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gallery_categories_fk" FOREIGN KEY ("gallery_categories_id") REFERENCES "public"."gallery_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gallery_images_fk" FOREIGN KEY ("gallery_images_id") REFERENCES "public"."gallery_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_inquiries_fk" FOREIGN KEY ("contact_inquiries_id") REFERENCES "public"."contact_inquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_newsletter_subscribers_fk" FOREIGN KEY ("newsletter_subscribers_id") REFERENCES "public"."newsletter_subscribers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_categories" ADD CONSTRAINT "home_page_categories_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_categories" ADD CONSTRAINT "home_page_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_gallery_images" ADD CONSTRAINT "home_page_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_gallery_images" ADD CONSTRAINT "home_page_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_testimonials_items" ADD CONSTRAINT "home_page_testimonials_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_testimonials_items" ADD CONSTRAINT "home_page_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_about_image_id_media_id_fk" FOREIGN KEY ("about_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_planning_event_image_id_media_id_fk" FOREIGN KEY ("planning_event_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_testimonials_background_image_id_media_id_fk" FOREIGN KEY ("testimonials_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "experiences_page_categories" ADD CONSTRAINT "experiences_page_categories_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "experiences_page_categories" ADD CONSTRAINT "experiences_page_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_page_explore_more_items" ADD CONSTRAINT "experiences_page_explore_more_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "experiences_page_explore_more_items" ADD CONSTRAINT "experiences_page_explore_more_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_page" ADD CONSTRAINT "experiences_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_leadership_paragraphs" ADD CONSTRAINT "about_page_leadership_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_strip_images" ADD CONSTRAINT "about_page_strip_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_strip_images" ADD CONSTRAINT "about_page_strip_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_intro_primary_image_id_media_id_fk" FOREIGN KEY ("intro_primary_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_intro_since_card_image_id_media_id_fk" FOREIGN KEY ("intro_since_card_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_leadership_image_id_media_id_fk" FOREIGN KEY ("leadership_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_mission_icon_id_media_id_fk" FOREIGN KEY ("mission_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_vision_icon_id_media_id_fk" FOREIGN KEY ("vision_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_location_background_image_id_media_id_fk" FOREIGN KEY ("location_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_location_pin_icon_id_media_id_fk" FOREIGN KEY ("location_pin_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_map_image_id_media_id_fk" FOREIGN KEY ("map_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_hub_page" ADD CONSTRAINT "events_hub_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_hub_page" ADD CONSTRAINT "events_hub_page_host_card_image_id_media_id_fk" FOREIGN KEY ("host_card_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_hub_page" ADD CONSTRAINT "events_hub_page_attend_card_image_id_media_id_fk" FOREIGN KEY ("attend_card_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "host_event_page" ADD CONSTRAINT "host_event_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_opening_hours_rows" ADD CONSTRAINT "site_settings_opening_hours_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social_links" ADD CONSTRAINT "site_settings_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_links" ADD CONSTRAINT "site_settings_footer_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_dark_id_media_id_fk" FOREIGN KEY ("logo_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX "events_slug_idx" ON "events" USING btree ("slug");
  CREATE INDEX "events_poster_image_idx" ON "events" USING btree ("poster_image_id");
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE INDEX "events__status_idx" ON "events" USING btree ("_status");
  CREATE INDEX "_events_v_parent_idx" ON "_events_v" USING btree ("parent_id");
  CREATE INDEX "_events_v_version_version_slug_idx" ON "_events_v" USING btree ("version_slug");
  CREATE INDEX "_events_v_version_version_poster_image_idx" ON "_events_v" USING btree ("version_poster_image_id");
  CREATE INDEX "_events_v_version_version_updated_at_idx" ON "_events_v" USING btree ("version_updated_at");
  CREATE INDEX "_events_v_version_version_created_at_idx" ON "_events_v" USING btree ("version_created_at");
  CREATE INDEX "_events_v_version_version__status_idx" ON "_events_v" USING btree ("version__status");
  CREATE INDEX "_events_v_created_at_idx" ON "_events_v" USING btree ("created_at");
  CREATE INDEX "_events_v_updated_at_idx" ON "_events_v" USING btree ("updated_at");
  CREATE INDEX "_events_v_latest_idx" ON "_events_v" USING btree ("latest");
  CREATE UNIQUE INDEX "menu_categories_slug_idx" ON "menu_categories" USING btree ("slug");
  CREATE INDEX "menu_categories_updated_at_idx" ON "menu_categories" USING btree ("updated_at");
  CREATE INDEX "menu_categories_created_at_idx" ON "menu_categories" USING btree ("created_at");
  CREATE INDEX "menu_items_tags_order_idx" ON "menu_items_tags" USING btree ("order");
  CREATE INDEX "menu_items_tags_parent_idx" ON "menu_items_tags" USING btree ("parent_id");
  CREATE UNIQUE INDEX "menu_items_slug_idx" ON "menu_items" USING btree ("slug");
  CREATE INDEX "menu_items_category_idx" ON "menu_items" USING btree ("category_id");
  CREATE INDEX "menu_items_image_idx" ON "menu_items" USING btree ("image_id");
  CREATE INDEX "menu_items_updated_at_idx" ON "menu_items" USING btree ("updated_at");
  CREATE INDEX "menu_items_created_at_idx" ON "menu_items" USING btree ("created_at");
  CREATE INDEX "menu_items__status_idx" ON "menu_items" USING btree ("_status");
  CREATE INDEX "_menu_items_v_version_tags_order_idx" ON "_menu_items_v_version_tags" USING btree ("order");
  CREATE INDEX "_menu_items_v_version_tags_parent_idx" ON "_menu_items_v_version_tags" USING btree ("parent_id");
  CREATE INDEX "_menu_items_v_parent_idx" ON "_menu_items_v" USING btree ("parent_id");
  CREATE INDEX "_menu_items_v_version_version_slug_idx" ON "_menu_items_v" USING btree ("version_slug");
  CREATE INDEX "_menu_items_v_version_version_category_idx" ON "_menu_items_v" USING btree ("version_category_id");
  CREATE INDEX "_menu_items_v_version_version_image_idx" ON "_menu_items_v" USING btree ("version_image_id");
  CREATE INDEX "_menu_items_v_version_version_updated_at_idx" ON "_menu_items_v" USING btree ("version_updated_at");
  CREATE INDEX "_menu_items_v_version_version_created_at_idx" ON "_menu_items_v" USING btree ("version_created_at");
  CREATE INDEX "_menu_items_v_version_version__status_idx" ON "_menu_items_v" USING btree ("version__status");
  CREATE INDEX "_menu_items_v_created_at_idx" ON "_menu_items_v" USING btree ("created_at");
  CREATE INDEX "_menu_items_v_updated_at_idx" ON "_menu_items_v" USING btree ("updated_at");
  CREATE INDEX "_menu_items_v_latest_idx" ON "_menu_items_v" USING btree ("latest");
  CREATE INDEX "menu_qr_updated_at_idx" ON "menu_qr" USING btree ("updated_at");
  CREATE INDEX "menu_qr_created_at_idx" ON "menu_qr" USING btree ("created_at");
  CREATE UNIQUE INDEX "gallery_categories_slug_idx" ON "gallery_categories" USING btree ("slug");
  CREATE INDEX "gallery_categories_updated_at_idx" ON "gallery_categories" USING btree ("updated_at");
  CREATE INDEX "gallery_categories_created_at_idx" ON "gallery_categories" USING btree ("created_at");
  CREATE INDEX "gallery_images_category_idx" ON "gallery_images" USING btree ("category_id");
  CREATE INDEX "gallery_images_image_idx" ON "gallery_images" USING btree ("image_id");
  CREATE INDEX "gallery_images_updated_at_idx" ON "gallery_images" USING btree ("updated_at");
  CREATE INDEX "gallery_images_created_at_idx" ON "gallery_images" USING btree ("created_at");
  CREATE INDEX "contact_inquiries_updated_at_idx" ON "contact_inquiries" USING btree ("updated_at");
  CREATE INDEX "contact_inquiries_created_at_idx" ON "contact_inquiries" USING btree ("created_at");
  CREATE UNIQUE INDEX "newsletter_subscribers_email_idx" ON "newsletter_subscribers" USING btree ("email");
  CREATE INDEX "newsletter_subscribers_updated_at_idx" ON "newsletter_subscribers" USING btree ("updated_at");
  CREATE INDEX "newsletter_subscribers_created_at_idx" ON "newsletter_subscribers" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX "payload_locked_documents_rels_menu_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("menu_categories_id");
  CREATE INDEX "payload_locked_documents_rels_menu_items_id_idx" ON "payload_locked_documents_rels" USING btree ("menu_items_id");
  CREATE INDEX "payload_locked_documents_rels_menu_qr_id_idx" ON "payload_locked_documents_rels" USING btree ("menu_qr_id");
  CREATE INDEX "payload_locked_documents_rels_gallery_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("gallery_categories_id");
  CREATE INDEX "payload_locked_documents_rels_gallery_images_id_idx" ON "payload_locked_documents_rels" USING btree ("gallery_images_id");
  CREATE INDEX "payload_locked_documents_rels_contact_inquiries_id_idx" ON "payload_locked_documents_rels" USING btree ("contact_inquiries_id");
  CREATE INDEX "payload_locked_documents_rels_newsletter_subscribers_id_idx" ON "payload_locked_documents_rels" USING btree ("newsletter_subscribers_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "home_page_categories_order_idx" ON "home_page_categories" USING btree ("_order");
  CREATE INDEX "home_page_categories_parent_id_idx" ON "home_page_categories" USING btree ("_parent_id");
  CREATE INDEX "home_page_categories_image_idx" ON "home_page_categories" USING btree ("image_id");
  CREATE INDEX "home_page_gallery_images_order_idx" ON "home_page_gallery_images" USING btree ("_order");
  CREATE INDEX "home_page_gallery_images_parent_id_idx" ON "home_page_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "home_page_gallery_images_image_idx" ON "home_page_gallery_images" USING btree ("image_id");
  CREATE INDEX "home_page_testimonials_items_order_idx" ON "home_page_testimonials_items" USING btree ("_order");
  CREATE INDEX "home_page_testimonials_items_parent_id_idx" ON "home_page_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "home_page_testimonials_items_image_idx" ON "home_page_testimonials_items" USING btree ("image_id");
  CREATE INDEX "home_page_hero_image_idx" ON "home_page" USING btree ("hero_image_id");
  CREATE INDEX "home_page_about_image_idx" ON "home_page" USING btree ("about_image_id");
  CREATE INDEX "home_page_planning_event_image_idx" ON "home_page" USING btree ("planning_event_image_id");
  CREATE INDEX "home_page_testimonials_background_image_idx" ON "home_page" USING btree ("testimonials_background_image_id");
  CREATE INDEX "experiences_page_categories_order_idx" ON "experiences_page_categories" USING btree ("_order");
  CREATE INDEX "experiences_page_categories_parent_id_idx" ON "experiences_page_categories" USING btree ("_parent_id");
  CREATE INDEX "experiences_page_categories_image_idx" ON "experiences_page_categories" USING btree ("image_id");
  CREATE INDEX "experiences_page_explore_more_items_order_idx" ON "experiences_page_explore_more_items" USING btree ("_order");
  CREATE INDEX "experiences_page_explore_more_items_parent_id_idx" ON "experiences_page_explore_more_items" USING btree ("_parent_id");
  CREATE INDEX "experiences_page_explore_more_items_image_idx" ON "experiences_page_explore_more_items" USING btree ("image_id");
  CREATE INDEX "experiences_page_hero_image_idx" ON "experiences_page" USING btree ("hero_image_id");
  CREATE INDEX "about_page_leadership_paragraphs_order_idx" ON "about_page_leadership_paragraphs" USING btree ("_order");
  CREATE INDEX "about_page_leadership_paragraphs_parent_id_idx" ON "about_page_leadership_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "about_page_strip_images_order_idx" ON "about_page_strip_images" USING btree ("_order");
  CREATE INDEX "about_page_strip_images_parent_id_idx" ON "about_page_strip_images" USING btree ("_parent_id");
  CREATE INDEX "about_page_strip_images_image_idx" ON "about_page_strip_images" USING btree ("image_id");
  CREATE INDEX "about_page_hero_image_idx" ON "about_page" USING btree ("hero_image_id");
  CREATE INDEX "about_page_intro_primary_image_idx" ON "about_page" USING btree ("intro_primary_image_id");
  CREATE INDEX "about_page_intro_since_card_image_idx" ON "about_page" USING btree ("intro_since_card_image_id");
  CREATE INDEX "about_page_leadership_image_idx" ON "about_page" USING btree ("leadership_image_id");
  CREATE INDEX "about_page_mission_icon_idx" ON "about_page" USING btree ("mission_icon_id");
  CREATE INDEX "about_page_vision_icon_idx" ON "about_page" USING btree ("vision_icon_id");
  CREATE INDEX "about_page_location_background_image_idx" ON "about_page" USING btree ("location_background_image_id");
  CREATE INDEX "about_page_location_pin_icon_idx" ON "about_page" USING btree ("location_pin_icon_id");
  CREATE INDEX "about_page_map_image_idx" ON "about_page" USING btree ("map_image_id");
  CREATE INDEX "events_hub_page_hero_image_idx" ON "events_hub_page" USING btree ("hero_image_id");
  CREATE INDEX "events_hub_page_host_card_host_card_image_idx" ON "events_hub_page" USING btree ("host_card_image_id");
  CREATE INDEX "events_hub_page_attend_card_attend_card_image_idx" ON "events_hub_page" USING btree ("attend_card_image_id");
  CREATE INDEX "host_event_page_hero_image_idx" ON "host_event_page" USING btree ("hero_image_id");
  CREATE INDEX "site_settings_opening_hours_rows_order_idx" ON "site_settings_opening_hours_rows" USING btree ("_order");
  CREATE INDEX "site_settings_opening_hours_rows_parent_id_idx" ON "site_settings_opening_hours_rows" USING btree ("_parent_id");
  CREATE INDEX "site_settings_social_links_order_idx" ON "site_settings_social_links" USING btree ("_order");
  CREATE INDEX "site_settings_social_links_parent_id_idx" ON "site_settings_social_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_footer_links_order_idx" ON "site_settings_footer_links" USING btree ("_order");
  CREATE INDEX "site_settings_footer_links_parent_id_idx" ON "site_settings_footer_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "site_settings_logo_dark_idx" ON "site_settings" USING btree ("logo_dark_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "_events_v" CASCADE;
  DROP TABLE "menu_categories" CASCADE;
  DROP TABLE "menu_items_tags" CASCADE;
  DROP TABLE "menu_items" CASCADE;
  DROP TABLE "_menu_items_v_version_tags" CASCADE;
  DROP TABLE "_menu_items_v" CASCADE;
  DROP TABLE "menu_qr" CASCADE;
  DROP TABLE "gallery_categories" CASCADE;
  DROP TABLE "gallery_images" CASCADE;
  DROP TABLE "contact_inquiries" CASCADE;
  DROP TABLE "newsletter_subscribers" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "home_page_categories" CASCADE;
  DROP TABLE "home_page_gallery_images" CASCADE;
  DROP TABLE "home_page_testimonials_items" CASCADE;
  DROP TABLE "home_page" CASCADE;
  DROP TABLE "experiences_page_categories" CASCADE;
  DROP TABLE "experiences_page_explore_more_items" CASCADE;
  DROP TABLE "experiences_page" CASCADE;
  DROP TABLE "about_page_leadership_paragraphs" CASCADE;
  DROP TABLE "about_page_strip_images" CASCADE;
  DROP TABLE "about_page" CASCADE;
  DROP TABLE "gallery_page" CASCADE;
  DROP TABLE "events_hub_page" CASCADE;
  DROP TABLE "host_event_page" CASCADE;
  DROP TABLE "contact_page" CASCADE;
  DROP TABLE "menu_settings" CASCADE;
  DROP TABLE "site_settings_opening_hours_rows" CASCADE;
  DROP TABLE "site_settings_social_links" CASCADE;
  DROP TABLE "site_settings_footer_links" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_events_status";
  DROP TYPE "public"."enum__events_v_version_status";
  DROP TYPE "public"."enum_menu_items_tags";
  DROP TYPE "public"."enum_menu_items_status";
  DROP TYPE "public"."enum__menu_items_v_version_tags";
  DROP TYPE "public"."enum__menu_items_v_version_status";
  DROP TYPE "public"."enum_contact_inquiries_event_type";
  DROP TYPE "public"."enum_contact_inquiries_status";
  DROP TYPE "public"."enum_newsletter_subscribers_status";
  DROP TYPE "public"."enum_home_page_testimonials_items_card_style";`)
}

import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Media } from "./collections/Media";
import { Users } from "./collections/Users";
import { Events } from "./collections/Events";
import { ContactInquiries } from "./collections/ContactInquiries";
import { NewsletterSubscribers } from "./collections/NewsletterSubscribers";
import { GalleryCategories } from "./collections/GalleryCategories";
import { GalleryImages } from "./collections/GalleryImages";
import { MenuCategories } from "./collections/MenuCategories";
import { MenuItems } from "./collections/MenuItems";
import { MenuQr } from "./collections/MenuQr";
import { AboutPage } from "./globals/AboutPage";
import { ContactPage } from "./globals/ContactPage";
import { EventsHubPage } from "./globals/EventsHubPage";
import { ExperiencesPage } from "./globals/ExperiencesPage";
import { GalleryPage } from "./globals/GalleryPage";
import { HomePage } from "./globals/HomePage";
import { HostEventPage } from "./globals/HostEventPage";
import { MenuSettings } from "./globals/MenuSettings";
import { SiteSettings } from "./globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    theme: "light",
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: " - Danyame Admin",
    },
    components: {
      beforeLogin: ["/components/admin/BeforeLogin#BeforeLogin"],
      graphics: {
        Logo: "/components/admin/AdminLogo#AdminLogo",
        Icon: "/components/admin/AdminIcon#AdminIcon",
      },
    },
  },
  collections: [
    Users,
    Media,
    Events,
    MenuCategories,
    MenuItems,
    MenuQr,
    GalleryCategories,
    GalleryImages,
    ContactInquiries,
    NewsletterSubscribers,
  ],
  globals: [
    HomePage,
    ExperiencesPage,
    AboutPage,
    GalleryPage,
    EventsHubPage,
    HostEventPage,
    ContactPage,
    MenuSettings,
    SiteSettings,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
    // Avoid interactive Drizzle "create vs rename" prompts that hang `next dev`.
    push: false,
  }),
  sharp,
});

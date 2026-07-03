# Danyame Payload CMS Dashboard Implementation Guide

This guide is written for Cursor to help convert the current Danyame website from a mostly hardcoded Next.js site into an owner-managed website with a Payload CMS admin dashboard.

The main goal is to let the Danyame owner manage events, menu items, gallery images, site settings, inquiries, and newsletter subscribers without editing code.

## Current Project Summary

Project path:

```txt
/Users/brightakakpo/Documents/Projects/danyame
```

Current stack:

```txt
Next.js 16
React 19
TypeScript
Tailwind CSS 4
Resend for email
Static assets in public/assets
```

Current hardcoded content areas:

```txt
src/lib/events.ts
src/components/GalleryTabs.tsx
src/lib/site.ts
src/components/CategoryGrid.tsx
src/app/experiences/page.tsx
src/app/page.tsx
src/app/about/page.tsx
src/app/events/page.tsx
src/app/attend-event/page.tsx
src/app/calendar/page.tsx
src/app/events/[slug]/page.tsx
```

Important existing API routes:

```txt
src/app/api/contact/route.ts
src/app/api/newsletter/route.ts
```

These should continue to work, but later they should also save submissions into Payload collections.

## Target Architecture

Use Payload CMS inside the existing Next.js application.

Public website:

```txt
/
/about
/experiences
/gallery
/events
/attend-event
/calendar
/events/[slug]
/menu
```

Admin dashboard:

```txt
/admin
```

Payload API:

```txt
/api/payload
/api/graphql
```

Database:

```txt
Postgres
```

Media storage:

Start with local Payload uploads during development. Move to S3, Cloudflare R2, or another cloud storage provider before production if needed.

## Implementation Priorities

Do not convert the entire website at once. Build in phases.

### Phase 1: Payload Foundation

Set up:

```txt
Payload CMS
Admin dashboard at /admin
Postgres database connection
Users collection
Media collection
Basic access control
```

Success criteria:

```txt
npm run dev works
http://localhost:3000/admin loads
Admin user can be created
Media upload works locally
```

### Phase 2: Events Dashboard

Replace hardcoded events from:

```txt
src/lib/events.ts
```

with Payload-managed events.

Affected pages:

```txt
src/app/attend-event/page.tsx
src/app/calendar/page.tsx
src/app/events/[slug]/page.tsx
```

Success criteria:

```txt
Owner can create/edit/delete events from /admin
Owner can publish/unpublish events
Owner can mark one event as featured
Attend Event page shows featured event and event lineup from Payload
Calendar page groups events by month from Payload
Event detail pages load by slug from Payload
```

### Phase 3: Menu Dashboard And QR Code

Add menu management for the venue.

Public customer page:

```txt
/menu
```

Admin sections:

```txt
Menu Categories
Menu Items
Menu Settings
```

QR code behavior:

```txt
Admin can generate/download a QR code
QR code points to https://domain.com/menu
The QR code does not need to change when menu content changes
Owner updates menu in dashboard
Customers scan the same QR code and see the latest menu
```

Success criteria:

```txt
Owner can manage food and drinks from /admin
Customer-facing /menu page is responsive and easy to scan
Unavailable items can be hidden or visibly disabled
QR download works as PNG or SVG
```

### Phase 4: Gallery And Site Settings

Move gallery and site details into Payload.

Replace:

```txt
src/components/GalleryTabs.tsx
src/lib/site.ts
```

Success criteria:

```txt
Owner can upload gallery images
Owner can assign images to categories
Owner can reorder images
Owner can edit phone, email, social links, address, opening hours, and footer details
```

### Phase 5: Contact And Newsletter Storage

Keep Resend email notifications, but also save submissions.

Collections:

```txt
Contact Inquiries
Newsletter Subscribers
```

Success criteria:

```txt
Contact form still sends email
Contact form also saves inquiry in Payload
Newsletter form still sends notification
Newsletter form also saves subscriber in Payload
Admin can view submissions
```

## Dependencies To Install

Install Payload packages:

```bash
npm install payload @payloadcms/next @payloadcms/db-postgres @payloadcms/richtext-lexical
```

Install QR code dependency:

```bash
npm install qrcode
npm install -D @types/qrcode
```

The project already has `sharp`, but verify after install:

```bash
npm ls sharp
```

## Environment Variables

Update `.env.example` and `.env.local`.

Required:

```env
PAYLOAD_SECRET=replace-with-a-long-random-secret
DATABASE_URI=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

Existing email variables should remain:

```env
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
NEXT_PUBLIC_SITE_URL=
```

Production values:

```env
NEXT_PUBLIC_SERVER_URL=https://your-production-domain.com
NEXT_PUBLIC_SITE_URL=https://your-production-domain.com
```

## Suggested File Structure

Create these files and folders:

```txt
src/payload.config.ts
src/payload-types.ts
src/collections/Users.ts
src/collections/Media.ts
src/collections/Events.ts
src/collections/MenuCategories.ts
src/collections/MenuItems.ts
src/collections/GalleryCategories.ts
src/collections/GalleryImages.ts
src/collections/ContactInquiries.ts
src/collections/NewsletterSubscribers.ts
src/globals/SiteSettings.ts
src/globals/MenuSettings.ts
src/lib/payload.ts
src/lib/cms/events.ts
src/lib/cms/menu.ts
src/lib/cms/site-settings.ts
src/app/(payload)/admin/[[...segments]]/page.tsx
src/app/(payload)/api/[...slug]/route.ts
src/app/(payload)/api/graphql/route.ts
src/app/menu/page.tsx
src/app/menu/MenuPageClient.tsx
src/app/admin-tools/menu-qr/page.tsx
```

Note: Payload route paths can vary by version. If the exact route structure differs, generate a fresh reference app using `npx create-payload-app@latest`, choose Next.js + Postgres + TypeScript, and copy the current official route structure into this project.

## Next Config

Update `next.config.ts` to wrap the config with Payload.

Current file:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
```

Target:

```ts
import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default withPayload(nextConfig);
```

## Payload Config

Create `src/payload.config.ts`.

The exact imports may vary depending on the installed Payload version. Follow the installed version docs or generated reference app.

Recommended conceptual config:

```ts
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import path from "path";
import { fileURLToPath } from "url";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Events } from "./collections/Events";
import { MenuCategories } from "./collections/MenuCategories";
import { MenuItems } from "./collections/MenuItems";
import { GalleryCategories } from "./collections/GalleryCategories";
import { GalleryImages } from "./collections/GalleryImages";
import { ContactInquiries } from "./collections/ContactInquiries";
import { NewsletterSubscribers } from "./collections/NewsletterSubscribers";
import { SiteSettings } from "./globals/SiteSettings";
import { MenuSettings } from "./globals/MenuSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    Media,
    Events,
    MenuCategories,
    MenuItems,
    GalleryCategories,
    GalleryImages,
    ContactInquiries,
    NewsletterSubscribers,
  ],
  globals: [SiteSettings, MenuSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
```

## Access Control

Start simple:

```txt
Admins can create/update/delete
Public can read published events, menu items, gallery images, and site settings
Public cannot read users
Public cannot read contact inquiries
Public cannot read newsletter subscribers
```

Create access helpers later:

```txt
src/access/isAdmin.ts
src/access/isPublished.ts
src/access/publicOrPublished.ts
```

Basic pattern:

```ts
import type { Access } from "payload";

export const isAdmin: Access = ({ req }) => Boolean(req.user);
```

For public collections, use collection-level read filters so only published content is visible publicly.

## Collection: Users

Purpose:

```txt
Admin authentication
```

Fields:

```txt
name
role: admin
```

Config:

```ts
import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  fields: [
    {
      name: "name",
      type: "text",
    },
    {
      name: "role",
      type: "select",
      defaultValue: "admin",
      options: [{ label: "Admin", value: "admin" }],
      required: true,
    },
  ],
};
```

## Collection: Media

Purpose:

```txt
Image/file uploads for events, menu, gallery, and page content
```

Fields:

```txt
alt
caption
```

Config:

```ts
import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  upload: {
    staticDir: "public/media",
    mimeTypes: ["image/*"],
  },
  admin: {
    useAsTitle: "alt",
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
    {
      name: "caption",
      type: "text",
    },
  ],
};
```

## Collection: Events

Purpose:

```txt
Editable event dashboard
```

Fields:

```txt
title
slug
eventDate
startTime
location
shortSummary
description
posterImage
hasTickets
ticketLabel
ticketUrl
isFeatured
status
sortOrder
```

Important behavior:

```txt
Only one event should be featured if possible
Published events appear publicly
Draft events remain hidden from public pages
Events sort by eventDate ascending
```

Config:

```ts
import type { CollectionConfig } from "payload";

export const Events: CollectionConfig = {
  slug: "events",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "eventDate", "location", "isFeatured", "status"],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "eventDate",
      type: "date",
      required: true,
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "startTime",
      type: "text",
      required: true,
    },
    {
      name: "location",
      type: "text",
      required: true,
    },
    {
      name: "shortSummary",
      type: "textarea",
      required: true,
      maxLength: 180,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "posterImage",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "hasTickets",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "ticketLabel",
      type: "text",
      defaultValue: "Tickets & Info",
    },
    {
      name: "ticketUrl",
      type: "text",
    },
    {
      name: "isFeatured",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "sortOrder",
      type: "number",
      defaultValue: 0,
    },
  ],
};
```

## Collection: Menu Categories

Purpose:

```txt
Organize menu items into sections
```

Examples:

```txt
Local Dishes
Grills
Snacks
Cocktails
Soft Drinks
Beers
Weekend Specials
```

Fields:

```txt
name
slug
description
sortOrder
isActive
```

Config:

```ts
import type { CollectionConfig } from "payload";

export const MenuCategories: CollectionConfig = {
  slug: "menu-categories",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "sortOrder", "isActive"],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "sortOrder",
      type: "number",
      defaultValue: 0,
    },
    {
      name: "isActive",
      type: "checkbox",
      defaultValue: true,
    },
  ],
};
```

## Collection: Menu Items

Purpose:

```txt
Food and drink items visible on /menu
```

Fields:

```txt
name
slug
category
description
price
image
isAvailable
isFeatured
tags
sortOrder
status/draft publishing
```

Config:

```ts
import type { CollectionConfig } from "payload";

export const MenuItems: CollectionConfig = {
  slug: "menu-items",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "category", "price", "isAvailable", "isFeatured"],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "menu-categories",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "price",
      type: "number",
      required: true,
      min: 0,
      admin: {
        description: "Enter price in Ghana cedis.",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "isAvailable",
      type: "checkbox",
      defaultValue: true,
    },
    {
      name: "isFeatured",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "tags",
      type: "select",
      hasMany: true,
      options: [
        { label: "Popular", value: "popular" },
        { label: "New", value: "new" },
        { label: "Spicy", value: "spicy" },
        { label: "Vegetarian", value: "vegetarian" },
        { label: "Alcoholic", value: "alcoholic" },
        { label: "Non-alcoholic", value: "non-alcoholic" },
      ],
    },
    {
      name: "sortOrder",
      type: "number",
      defaultValue: 0,
    },
  ],
};
```

## Global: Menu Settings

Purpose:

```txt
Control public menu page copy and QR target
```

Fields:

```txt
pageTitle
introText
currency
showUnavailableItems
qrTargetUrl
```

Config:

```ts
import type { GlobalConfig } from "payload";

export const MenuSettings: GlobalConfig = {
  slug: "menu-settings",
  fields: [
    {
      name: "pageTitle",
      type: "text",
      defaultValue: "Danyame Menu",
      required: true,
    },
    {
      name: "introText",
      type: "textarea",
    },
    {
      name: "currency",
      type: "text",
      defaultValue: "GH₵",
      required: true,
    },
    {
      name: "showUnavailableItems",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "qrTargetUrl",
      type: "text",
      admin: {
        description: "Usually https://yourdomain.com/menu",
      },
    },
  ],
};
```

## Public Menu Page

Create:

```txt
src/app/menu/page.tsx
```

Requirements:

```txt
Server-render menu categories and items
Group items by category
Show item name, price, description, tags, and image
Hide unavailable items unless Menu Settings says to show them
Use Danyame visual language from the existing site
Mobile-first because most users will scan QR on phones
No login required
```

Design guidance:

```txt
Do not make a marketing landing page
Make the menu itself the first screen
Use clear category tabs or horizontal category navigation
Keep item cards compact
Prices must be easy to scan
Unavailable items should be visibly disabled if shown
```

Suggested page structure:

```txt
Header with logo/name
Category navigation
Featured items section if any
Menu groups by category
Footer/contact strip
```

## QR Code Generation

Install:

```bash
npm install qrcode
npm install -D @types/qrcode
```

Create a utility:

```txt
src/lib/qr/menu-qr.ts
```

Example:

```ts
import QRCode from "qrcode";

export async function generateMenuQrDataUrl(url: string) {
  return QRCode.toDataURL(url, {
    errorCorrectionLevel: "H",
    margin: 2,
    width: 1200,
    color: {
      dark: "#111111",
      light: "#ffffff",
    },
  });
}
```

Create an admin utility page:

```txt
src/app/admin-tools/menu-qr/page.tsx
```

This page can:

```txt
Read Menu Settings
Generate QR for NEXT_PUBLIC_SITE_URL/menu or qrTargetUrl
Show QR preview
Provide download link
```

If possible, expose the QR tool inside Payload admin as a custom view later. For the first version, an authenticated utility page is acceptable if access is protected.

Important:

```txt
The QR code should point to /menu, not to individual menu data.
That way the printed QR code remains valid forever.
```

## Site Settings Global

Purpose:

```txt
Replace src/lib/site.ts over time
```

Fields:

```txt
siteName
shortName
location
phone
phoneHref
email
openingHours
socialLinks
footerLinks
copyrightYear
logo
logoDark
```

Start with current values from:

```txt
src/lib/site.ts
```

## Gallery Collections

Create:

```txt
Gallery Categories
Gallery Images
```

Gallery Categories fields:

```txt
name
slug
sortOrder
isActive
```

Gallery Images fields:

```txt
title
category
image
alt
sortOrder
isPublished
```

Replace hardcoded data from:

```txt
src/components/GalleryTabs.tsx
```

Keep the existing visual layout if possible, but make the image data dynamic.

## Contact Inquiries Collection

Purpose:

```txt
Store contact form submissions in admin
```

Fields should match current form payload:

```txt
name
email
phone
eventType
eventDate
guestCount
message
status: new / contacted / closed
createdAt
```

Update:

```txt
src/app/api/contact/route.ts
```

So it:

```txt
validates payload
rate-limits request
sends email through Resend
saves inquiry in Payload
returns success
```

Do not break existing email functionality.

## Newsletter Subscribers Collection

Purpose:

```txt
Store newsletter signups in admin
```

Fields:

```txt
email
source
status: subscribed / unsubscribed
createdAt
```

Update:

```txt
src/app/api/newsletter/route.ts
```

So it:

```txt
validates email
rate-limits request
saves subscriber in Payload
sends email notification
prevents duplicate active subscribers if possible
```

## CMS Data Helpers

Create:

```txt
src/lib/payload.ts
src/lib/cms/events.ts
src/lib/cms/menu.ts
src/lib/cms/site-settings.ts
```

Purpose:

```txt
Keep Payload querying out of page components
Normalize Payload documents into frontend-friendly shapes
Centralize error handling and fallback behavior
```

Example event helper:

```ts
import config from "@/payload.config";
import { getPayload } from "payload";

export async function getPublishedEvents() {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "events",
    depth: 2,
    sort: "eventDate",
    where: {
      _status: {
        equals: "published",
      },
    },
  });

  return result.docs;
}
```

Note: If the installed Payload version uses a different draft status field, follow the generated types and docs.

## Migrating Existing Events

Current source:

```txt
src/lib/events.ts
```

Current events:

```txt
The Social Table
Afro Vibes Live
Sunset Sessions
Game Night
Summer Splash
Danyame Live
Friday Vibez
```

Create a seed script later:

```txt
scripts/seed-events.ts
```

Seed script should:

```txt
connect to Payload
create media records for existing images if needed
create event records
set The Social Table as featured
publish all current events
```

Current image mappings:

```txt
/assets/attend-event/featured.jpg
/assets/attend-event/event-1.jpg
/assets/attend-event/event-2.jpg
/assets/attend-event/event-3.jpg
/assets/attend-event/event-4.jpg
/assets/attend-event/event-5.jpg
/assets/attend-event/event-6.jpg
```

## Slug Generation

For better admin usability, add slug generation from title.

Either:

```txt
Use a Payload hook
Use a custom field component later
Keep manual slug entry in first version
```

First version can keep manual slug input to reduce complexity.

## Fallback Strategy

During migration, avoid breaking the live-looking pages.

Recommended temporary approach:

```txt
Keep src/lib/events.ts until Payload events are fully working
Add CMS helpers
Update one page at a time
If Payload has no events, optionally fall back to existing static events
Remove fallback only after seed/admin content is ready
```

## Testing Checklist

Run:

```bash
npm run lint
npm run build
```

Manual checks:

```txt
/admin loads
admin user can log in
media upload works
event can be created
published event appears on /attend-event
draft event does not appear publicly
featured event appears in featured section
/calendar groups events correctly
/events/[slug] works
/menu loads on mobile width
menu categories and items display correctly
QR code scans and opens /menu
contact form still sends email
newsletter form still works
```

## Cursor Implementation Prompts

Use these prompts in order.

### Prompt 1: Install And Configure Payload

```txt
Set up Payload CMS in this existing Next.js project. Use Postgres, TypeScript, Payload admin at /admin, and keep the existing site routes working. Add Users and Media collections first. Update next.config.ts with withPayload. Add src/payload.config.ts and the required Payload app routes based on the installed Payload version. Do not remove existing pages. After implementation, run lint/build and fix issues.
```

### Prompt 2: Add Events Collection

```txt
Add an Events collection to Payload for Danyame. Fields: title, slug, eventDate, startTime, location, shortSummary, description, posterImage, hasTickets, ticketLabel, ticketUrl, isFeatured, sortOrder, draft/published status. Add CMS helper functions in src/lib/cms/events.ts. Update attend-event, calendar, and event detail pages to read published events from Payload. Keep a safe fallback to src/lib/events.ts until seeded CMS content exists.
```

### Prompt 3: Add Menu Dashboard And Public Menu Page

```txt
Add Payload collections for Menu Categories and Menu Items, plus a Menu Settings global. Build a public /menu page that is mobile-first and displays categories and menu items from Payload. Add QR code generation using the qrcode package so the owner can download a QR code that points to /menu. The QR code should remain stable when menu items change.
```

### Prompt 4: Add Gallery Dashboard

```txt
Move the current hardcoded GalleryTabs data into Payload-managed Gallery Categories and Gallery Images collections. Keep the existing visual style as much as possible, but load image data dynamically. Add sorting and publish controls.
```

### Prompt 5: Add Site Settings

```txt
Create a Site Settings global in Payload to manage site name, short name, email, phone, location, social links, footer links, logos, and opening hours. Replace src/lib/site.ts usage gradually with CMS-loaded settings while preserving current fallback values.
```

### Prompt 6: Store Contact And Newsletter Submissions

```txt
Add Contact Inquiries and Newsletter Subscribers collections. Update the existing contact and newsletter API routes so they continue sending Resend emails but also save submissions into Payload. Preserve validation and rate limiting.
```

## Production Notes

Before production:

```txt
Use real hosted Postgres
Use strong PAYLOAD_SECRET
Configure production NEXT_PUBLIC_SERVER_URL
Configure image storage if local uploads are not suitable
Set up database backups
Protect admin access
Test build on the target hosting platform
Verify Resend domain
Verify QR code after production domain is live
```

## Key Product Decision

The QR code should point to a stable public URL:

```txt
https://yourdomain.com/menu
```

Do not generate a new QR code for each menu update. The owner should update menu content in the dashboard, and customers should keep using the same printed QR code.

## Definition Of Done

The implementation is successful when the Danyame owner can:

```txt
Log into /admin
Create and publish events
Feature an event
Upload event images
Manage food and drinks
Download a QR code for the public menu
Update the public menu without code changes
Manage gallery images
Update phone, email, social links, and opening hours
View contact inquiries
View newsletter subscribers
```


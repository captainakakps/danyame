import type { GlobalConfig } from "payload";

import { isAdmin } from "@/access/isAdmin";
import { publicRead } from "@/access/publicRead";

export const HostEventPage: GlobalConfig = {
  slug: "host-event-page",
  label: "Host Event Page",
  admin: { group: "Pages" },
  access: { read: publicRead, update: isAdmin },
  fields: [
    { name: "title", type: "text", defaultValue: "Host an Event", required: true },
    { name: "body", type: "textarea", required: true },
    { name: "heroImage", type: "upload", relationTo: "media" },
    { name: "heroImageAlt", type: "text", required: true },
    { name: "primaryCtaLabel", type: "text", defaultValue: "Book an Event", required: true },
    { name: "primaryCtaHref", type: "text", defaultValue: "/contact", required: true },
    { name: "secondaryCtaLabel", type: "text", defaultValue: "View All Events", required: true },
    { name: "secondaryCtaHref", type: "text", defaultValue: "/events", required: true },
  ],
};

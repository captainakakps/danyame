import type { GlobalConfig } from "payload";

import { isAdmin } from "@/access/isAdmin";
import { publicRead } from "@/access/publicRead";

const experienceCardFields = [
  { name: "image", type: "upload" as const, relationTo: "media" as const, required: true },
  { name: "imageAlt", type: "text" as const, required: true },
  { name: "title", type: "text" as const, required: true },
  { name: "body", type: "textarea" as const, required: true },
  { name: "ctaLabel", type: "text" as const, required: true },
  { name: "ctaHref", type: "text" as const, required: true },
];

export const EventsHubPage: GlobalConfig = {
  slug: "events-hub-page",
  label: "Events Hub Page",
  admin: { group: "Pages" },
  access: { read: publicRead, update: isAdmin },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [
            { name: "heroImage", type: "upload", relationTo: "media" },
            { name: "heroImageAlt", type: "text", defaultValue: "Elegant event venue at Danyame" },
            { name: "heroTitle", type: "text", required: true },
            { name: "heroBody", type: "textarea", required: true },
            { name: "heroHostCtaLabel", type: "text", defaultValue: "Host an Event", required: true },
            { name: "heroHostCtaHref", type: "text", defaultValue: "/host-event", required: true },
            { name: "heroAttendCtaLabel", type: "text", defaultValue: "Attend an Event", required: true },
            { name: "heroAttendCtaHref", type: "text", defaultValue: "/attend-event", required: true },
          ],
        },
        {
          label: "Experience Cards",
          fields: [
            { name: "sectionTitle", type: "text", defaultValue: "Choose Your Experience", required: true },
            { name: "sectionIntro", type: "textarea", required: true },
            { name: "hostCard", type: "group", fields: experienceCardFields },
            { name: "attendCard", type: "group", fields: experienceCardFields },
          ],
        },
      ],
    },
  ],
};

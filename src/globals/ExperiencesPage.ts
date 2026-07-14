import type { GlobalConfig } from "payload";

import { isAdmin } from "@/access/isAdmin";
import { publicRead } from "@/access/publicRead";

const categoryFields = [
  {
    name: "slug",
    type: "text" as const,
    required: true,
    admin: {
      description: "URL anchor for this section, e.g. events, pool, food, games.",
    },
  },
  { name: "label", type: "text" as const, required: true },
  { name: "title", type: "text" as const, required: true },
  { name: "description", type: "textarea" as const, required: true },
  {
    name: "image",
    type: "upload" as const,
    relationTo: "media" as const,
    required: true,
  },
];

const finalCtaFields = [
  { name: "finalCtaLine1", type: "text" as const, defaultValue: "READY", required: true },
  { name: "finalCtaLine2", type: "text" as const, defaultValue: "FOR YOUR", required: true },
  { name: "finalCtaLine3", type: "text" as const, defaultValue: "NEXT", required: true },
  { name: "finalCtaLine4", type: "text" as const, defaultValue: "EXPERIENCE", required: true },
  { name: "finalCtaBody", type: "textarea" as const, required: true },
  { name: "finalCtaSecondaryLabel", type: "text" as const, defaultValue: "Contact Us", required: true },
  { name: "finalCtaSecondaryHref", type: "text" as const, defaultValue: "/contact", required: true },
  { name: "finalCtaPrimaryLabel", type: "text" as const, defaultValue: "Book an Event", required: true },
  { name: "finalCtaPrimaryHref", type: "text" as const, defaultValue: "/contact", required: true },
];

export const ExperiencesPage: GlobalConfig = {
  slug: "experiences-page",
  label: "Experiences Page",
  admin: { group: "Pages" },
  access: { read: publicRead, update: isAdmin },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero & Tagline",
          fields: [
            { name: "heroImage", type: "upload", relationTo: "media" },
            { name: "heroTitle", type: "text", required: true },
            { name: "taglinePrimary", type: "text", required: true },
            { name: "taglineSecondary", type: "textarea", required: true },
          ],
        },
        {
          label: "Categories",
          fields: [
            {
              name: "categories",
              type: "array",
              minRows: 1,
              maxRows: 6,
              fields: categoryFields,
            },
          ],
        },
        {
          label: "Explore More",
          fields: [
            {
              name: "exploreMoreTitle",
              type: "text",
              defaultValue: "Explore More at Danyame",
              required: true,
            },
            {
              name: "exploreMoreIntro",
              type: "textarea",
              defaultValue:
                "Beyond our signature experiences, discover the facilities and services that make every visit more convenient, enjoyable, and memorable. Tap any service to learn more, view pricing, and make an enquiry.",
              required: true,
            },
            {
              name: "exploreMoreItems",
              type: "array",
              labels: { singular: "Facility", plural: "Facilities" },
              fields: [
                { name: "name", type: "text", required: true },
                { name: "tagline", type: "text", required: true },
                {
                  name: "image",
                  type: "upload",
                  relationTo: "media",
                  admin: {
                    description: "Preview image shown on hover (desktop).",
                  },
                },
                { name: "imageAlt", type: "text" },
                { name: "href", type: "text" },
              ],
            },
          ],
        },
        {
          label: "Final CTA",
          fields: finalCtaFields,
        },
      ],
    },
  ],
};

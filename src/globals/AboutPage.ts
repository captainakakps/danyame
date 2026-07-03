import type { GlobalConfig } from "payload";

import { isAdmin } from "@/access/isAdmin";
import { publicRead } from "@/access/publicRead";

export const AboutPage: GlobalConfig = {
  slug: "about-page",
  label: "About Page",
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
            { name: "heroTitle", type: "text", required: true },
            { name: "heroDescription", type: "textarea", required: true },
          ],
        },
        {
          label: "Story",
          fields: [
            {
              name: "bodyParagraphs",
              type: "array",
              minRows: 1,
              maxRows: 6,
              fields: [{ name: "text", type: "textarea", required: true }],
            },
            {
              name: "stripImages",
              type: "array",
              label: "Image strip",
              minRows: 1,
              maxRows: 8,
              fields: [
                { name: "image", type: "upload", relationTo: "media", required: true },
                { name: "alt", type: "text", required: true },
              ],
            },
          ],
        },
        {
          label: "Quote",
          fields: [
            { name: "quoteBackgroundImage", type: "upload", relationTo: "media" },
            { name: "quoteText", type: "textarea", required: true },
          ],
        },
      ],
    },
  ],
};

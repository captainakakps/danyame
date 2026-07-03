import type { GlobalConfig } from "payload";

import { isAdmin } from "@/access/isAdmin";
import { publicRead } from "@/access/publicRead";

export const GalleryPage: GlobalConfig = {
  slug: "gallery-page",
  label: "Gallery Page",
  admin: { group: "Pages" },
  access: { read: publicRead, update: isAdmin },
  fields: [
    {
      name: "heroTitle",
      type: "text",
      defaultValue: "The Danyame Experience",
      required: true,
    },
    {
      name: "heroIntro",
      type: "textarea",
      required: true,
    },
  ],
};

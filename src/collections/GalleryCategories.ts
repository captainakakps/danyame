import type { CollectionConfig } from "payload";
import { slugField } from "payload";

import { isAdmin } from "@/access/isAdmin";
import { publicReadActive } from "@/access/publicReadActive";

export const GalleryCategories: CollectionConfig = {
  slug: "gallery-categories",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "sortOrder", "isActive"],
    group: "Gallery",
  },
  access: {
    create: isAdmin,
    read: publicReadActive,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    slugField({ useAsSlug: "name" }),
    {
      name: "sortOrder",
      type: "number",
      defaultValue: 0,
      admin: {
        description: "Lower numbers appear first in the gallery tabs.",
      },
    },
    {
      name: "isActive",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description: "Inactive categories are hidden from the public gallery.",
      },
    },
  ],
};

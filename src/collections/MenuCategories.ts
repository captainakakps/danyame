import type { CollectionConfig } from "payload";
import { slugField } from "payload";

import { isAdmin } from "@/access/isAdmin";
import { publicReadActive } from "@/access/publicReadActive";

export const MenuCategories: CollectionConfig = {
  slug: "menu-categories",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "sortOrder", "isActive"],
    group: "Menu",
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
      name: "description",
      type: "textarea",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Category image shown on the menu landing page and as a fallback for items without their own photo.",
      },
    },
    {
      name: "sortOrder",
      type: "number",
      defaultValue: 0,
      admin: {
        description: "Lower numbers appear first on the menu.",
      },
    },
    {
      name: "isActive",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description: "Inactive categories are hidden from the public menu.",
      },
    },
  ],
};

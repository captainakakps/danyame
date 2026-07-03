import type { CollectionConfig } from "payload";
import { slugField } from "payload";

import { isAdmin } from "@/access/isAdmin";
import { publicOrPublished } from "@/access/publicOrPublished";

export const MenuItems: CollectionConfig = {
  slug: "menu-items",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "category", "price", "isAvailable", "isFeatured"],
    group: "Menu",
  },
  versions: {
    drafts: true,
  },
  access: {
    create: isAdmin,
    read: publicOrPublished,
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
      admin: {
        description: "Unavailable items can be hidden on the public menu.",
      },
    },
    {
      name: "isFeatured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description: "Featured items appear in a highlight section on /menu.",
      },
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
      admin: {
        description: "Lower numbers appear first within a category.",
      },
    },
  ],
};

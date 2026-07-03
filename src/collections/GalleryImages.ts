import type { Access, CollectionConfig } from "payload";

import { isAdmin } from "@/access/isAdmin";

const publicReadPublished: Access = ({ req }) => {
  if (req.user) {
    return true;
  }

  return {
    isPublished: {
      equals: true,
    },
  };
};

export const GalleryImages: CollectionConfig = {
  slug: "gallery-images",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "sortOrder", "isPublished"],
    group: "Gallery",
  },
  access: {
    create: isAdmin,
    read: publicReadPublished,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "gallery-categories",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "alt",
      type: "text",
      required: true,
      admin: {
        description: "Describe the image for accessibility.",
      },
    },
    {
      name: "sortOrder",
      type: "number",
      defaultValue: 0,
      admin: {
        description:
          "Lower numbers appear first. The gallery layout uses the first 7 images per category.",
      },
    },
    {
      name: "isPublished",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description: "Unpublished images are hidden from the public gallery.",
      },
    },
  ],
};

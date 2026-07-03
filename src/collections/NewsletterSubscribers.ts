import type { CollectionConfig } from "payload";

import { isAdmin } from "@/access/isAdmin";

export const NewsletterSubscribers: CollectionConfig = {
  slug: "newsletter-subscribers",
  labels: {
    singular: "Newsletter Subscriber",
    plural: "Newsletter Subscribers",
  },
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "source", "status", "createdAt"],
    group: "Submissions",
    description: "Newsletter signups from the public site.",
  },
  access: {
    create: isAdmin,
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: "email",
      type: "email",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "source",
      type: "text",
      defaultValue: "website",
      admin: {
        description: "Where the signup came from, e.g. footer or homepage.",
      },
    },
    {
      name: "status",
      type: "select",
      defaultValue: "subscribed",
      required: true,
      options: [
        { label: "Subscribed", value: "subscribed" },
        { label: "Unsubscribed", value: "unsubscribed" },
      ],
    },
  ],
};

import type { CollectionConfig } from "payload";

import { isAdmin } from "@/access/isAdmin";
import { CONTACT_EVENT_TYPES } from "@/lib/validation/contact";

export const ContactInquiries: CollectionConfig = {
  slug: "contact-inquiries",
  labels: {
    singular: "Contact Inquiry",
    plural: "Contact Inquiries",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "eventType", "status", "createdAt"],
    group: "Submissions",
    description: "Contact form submissions from the public site.",
  },
  access: {
    create: isAdmin,
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Full name",
    },
    {
      name: "email",
      type: "email",
      required: true,
    },
    {
      name: "phone",
      type: "text",
      required: true,
    },
    {
      name: "eventType",
      type: "select",
      required: true,
      options: CONTACT_EVENT_TYPES.map((value) => ({
        label: value,
        value,
      })),
    },
    {
      name: "eventDate",
      type: "date",
      required: true,
      label: "Preferred date",
      admin: {
        date: {
          pickerAppearance: "dayOnly",
        },
      },
    },
    {
      name: "message",
      type: "textarea",
      required: true,
    },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      required: true,
      options: [
        { label: "New", value: "new" },
        { label: "Contacted", value: "contacted" },
        { label: "Closed", value: "closed" },
      ],
      admin: {
        description: "Track follow-up progress for this inquiry.",
      },
    },
  ],
};

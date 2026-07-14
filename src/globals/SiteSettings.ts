import type { GlobalConfig } from "payload";

import { isAdmin } from "@/access/isAdmin";
import { publicRead } from "@/access/publicRead";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  admin: {
    group: "Settings",
  },
  access: {
    read: publicRead,
    update: isAdmin,
  },
  fields: [
    {
      name: "siteName",
      type: "text",
      defaultValue: "Danyame Recreational Village",
      required: true,
    },
    {
      name: "shortName",
      type: "text",
      defaultValue: "Danyame",
      required: true,
    },
    {
      name: "location",
      type: "text",
      defaultValue: "Akwatia, Eastern Region, Ghana",
      required: true,
    },
    {
      name: "phone",
      type: "text",
      defaultValue: "+233 55 364 7512",
      required: true,
    },
    {
      name: "phoneHref",
      type: "text",
      defaultValue: "tel:+233553647512",
      required: true,
    },
    {
      name: "secondaryPhone",
      type: "text",
      defaultValue: "+233 55 383 7811",
      admin: {
        description: "Second phone number shown in the footer.",
      },
    },
    {
      name: "secondaryPhoneHref",
      type: "text",
      defaultValue: "tel:+233553837811",
    },
    {
      name: "whatsappHref",
      type: "text",
      defaultValue: "https://wa.me/233553837811",
      admin: {
        description: "WhatsApp link for the secondary phone number.",
      },
    },
    {
      name: "whatsappLabel",
      type: "text",
      defaultValue: "(click to chat on whatsapp)",
    },
    {
      name: "email",
      type: "email",
      defaultValue: "danyamerecreationalvillage@gmail.com",
      required: true,
    },
    {
      name: "openingHoursRows",
      type: "array",
      labels: {
        singular: "Opening Hours Row",
        plural: "Opening Hours",
      },
      admin: {
        description: "Opening hours shown in the footer.",
      },
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "hours",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "openingHours",
      type: "textarea",
      admin: {
        hidden: true,
        readOnly: true,
        description: "Deprecated. Use Opening Hours rows instead.",
      },
    },
    {
      name: "socialLinks",
      type: "array",
      labels: {
        singular: "Social Link",
        plural: "Social Links",
      },
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "href",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "footerLinks",
      type: "array",
      labels: {
        singular: "Footer Link",
        plural: "Footer Links",
      },
      admin: {
        description: "Links shown under Explore Danyame in the footer.",
      },
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "href",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "copyrightYear",
      type: "number",
      defaultValue: 2026,
      required: true,
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Primary logo used on the site.",
      },
    },
    {
      name: "logoDark",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Optional logo for dark backgrounds.",
      },
    },
  ],
};

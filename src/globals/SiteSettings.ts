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
      defaultValue: "+233 24 894 9895",
      required: true,
    },
    {
      name: "phoneHref",
      type: "text",
      defaultValue: "tel:+233248949895",
      required: true,
    },
    {
      name: "email",
      type: "email",
      defaultValue: "danyamevillage@gmail.com",
      required: true,
    },
    {
      name: "openingHours",
      type: "textarea",
      admin: {
        description: "Optional opening hours shown on the site.",
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

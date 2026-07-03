import type { GlobalConfig } from "payload";

import { isAdmin } from "@/access/isAdmin";
import { publicRead } from "@/access/publicRead";

export const MenuSettings: GlobalConfig = {
  slug: "menu-settings",
  label: "Menu Settings",
  admin: {
    group: "Menu",
  },
  access: {
    read: publicRead,
    update: isAdmin,
  },
  fields: [
    {
      name: "pageTitle",
      type: "text",
      defaultValue: "Danyame Menu",
      required: true,
    },
    {
      name: "introText",
      type: "textarea",
      admin: {
        description: "Optional short line shown below the menu title.",
      },
    },
    {
      name: "currency",
      type: "text",
      defaultValue: "GH₵",
      required: true,
    },
    {
      name: "showUnavailableItems",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description:
          "When enabled, sold-out items still appear but are visibly disabled.",
      },
    },
    {
      name: "qrTargetUrl",
      type: "text",
      admin: {
        description:
          "URL encoded in the menu QR code. Usually https://yourdomain.com/menu",
      },
    },
  ],
};

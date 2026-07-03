import type { GlobalConfig } from "payload";

import { isAdmin } from "@/access/isAdmin";
import { publicRead } from "@/access/publicRead";

export const ContactPage: GlobalConfig = {
  slug: "contact-page",
  label: "Contact Page",
  admin: { group: "Pages" },
  access: { read: publicRead, update: isAdmin },
  fields: [
    { name: "headlineLine1", type: "text", defaultValue: "GET", required: true },
    { name: "headlineLine2", type: "text", defaultValue: "IN TOUCH:", required: true },
    { name: "intro", type: "textarea", required: true },
  ],
};

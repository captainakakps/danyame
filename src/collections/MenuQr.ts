import type { CollectionConfig } from "payload";

import { isAdmin } from "@/access/isAdmin";

export const MenuQr: CollectionConfig = {
  slug: "menu-qr",
  labels: {
    singular: "Menu QR Code",
    plural: "Menu QR Code",
  },
  admin: {
    group: "Menu",
    useAsTitle: "id",
    description:
      "Generate and download a QR code that links to your public menu.",
    components: {
      views: {
        list: {
          Component: "/components/admin/MenuQrListView#MenuQrListView",
        },
      },
    },
  },
  access: {
    create: () => false,
    read: isAdmin,
    update: () => false,
    delete: () => false,
  },
  fields: [],
};

import type { CollectionConfig } from "payload";
import { slugField } from "payload";

import { isAdmin } from "@/access/isAdmin";
import { publicOrPublished } from "@/access/publicOrPublished";

export const Events: CollectionConfig = {
  slug: "events",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "eventDate", "location", "isFeatured", "_status"],
    group: "Content",
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
  hooks: {
    beforeChange: [
      async ({ data, req, originalDoc }) => {
        if (!data?.isFeatured) {
          return data;
        }

        const featuredEvents = await req.payload.find({
          collection: "events",
          limit: 100,
          overrideAccess: true,
          where: {
            isFeatured: { equals: true },
            ...(originalDoc?.id
              ? { id: { not_equals: originalDoc.id } }
              : {}),
          },
        });

        for (const event of featuredEvents.docs) {
          await req.payload.update({
            collection: "events",
            id: event.id,
            data: { isFeatured: false },
            overrideAccess: true,
          });
        }

        return data;
      },
    ],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    slugField({ useAsSlug: "title" }),
    {
      name: "eventDate",
      type: "date",
      required: true,
      admin: {
        date: {
          pickerAppearance: "dayOnly",
        },
        description: "The calendar date of the event.",
      },
    },
    {
      name: "startTime",
      type: "text",
      required: true,
      admin: {
        description: 'Display time, e.g. "2:00 PM".',
      },
    },
    {
      name: "location",
      type: "text",
      required: true,
    },
    {
      name: "shortSummary",
      type: "textarea",
      required: true,
      maxLength: 180,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "posterImage",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "hasTickets",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "ticketLabel",
      type: "text",
      defaultValue: "Tickets & Info",
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.hasTickets),
      },
    },
    {
      name: "ticketUrl",
      type: "text",
      admin: {
        description: "Optional external ticket link.",
        condition: (_, siblingData) => Boolean(siblingData?.hasTickets),
      },
    },
    {
      name: "isFeatured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description: "Only one event can be featured at a time.",
      },
    },
    {
      name: "sortOrder",
      type: "number",
      defaultValue: 0,
      admin: {
        description: "Lower numbers appear first within the same date.",
      },
    },
  ],
};

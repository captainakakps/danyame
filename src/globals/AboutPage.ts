import type { GlobalConfig } from "payload";

import { isAdmin } from "@/access/isAdmin";
import { publicRead } from "@/access/publicRead";

export const AboutPage: GlobalConfig = {
  slug: "about-page",
  label: "About Page",
  admin: { group: "Pages" },
  access: { read: publicRead, update: isAdmin },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [
            { name: "heroImage", type: "upload", relationTo: "media" },
            { name: "heroTitle", type: "text", required: true },
            { name: "heroDescription", type: "textarea", required: true },
          ],
        },
        {
          label: "Intro",
          fields: [
            { name: "introLabel", type: "text", required: true },
            { name: "introWelcomeHeading", type: "textarea", required: true },
            {
              name: "introPrimaryImage",
              type: "upload",
              relationTo: "media",
            },
            { name: "introPrimaryImageAlt", type: "text" },
            {
              name: "introSinceCardImage",
              type: "upload",
              relationTo: "media",
              label: "Since card image",
            },
            {
              name: "introSinceCardLabel",
              type: "text",
              defaultValue: "SINCE 2024",
            },
            {
              name: "introSinceCardText",
              type: "textarea",
            },
            { name: "introParagraph", type: "textarea", required: true },
          ],
        },
        {
          label: "Leadership",
          fields: [
            { name: "leadershipIntro", type: "textarea", required: true },
            {
              name: "leadershipImage",
              type: "upload",
              relationTo: "media",
            },
            { name: "leadershipImageAlt", type: "text" },
            {
              name: "leadershipParagraphs",
              type: "array",
              minRows: 1,
              maxRows: 4,
              fields: [{ name: "text", type: "textarea", required: true }],
            },
          ],
        },
        {
          label: "Gallery",
          fields: [
            {
              name: "stripImages",
              type: "array",
              label: "Image strip",
              minRows: 1,
              maxRows: 8,
              fields: [
                { name: "image", type: "upload", relationTo: "media", required: true },
                { name: "alt", type: "text", required: true },
              ],
            },
          ],
        },
        {
          label: "Mission & Vision",
          fields: [
            {
              name: "missionIcon",
              type: "upload",
              relationTo: "media",
              label: "Mission icon",
            },
            { name: "missionTitle", type: "text", required: true },
            { name: "missionText", type: "textarea", required: true },
            {
              name: "visionIcon",
              type: "upload",
              relationTo: "media",
              label: "Vision icon",
            },
            { name: "visionTitle", type: "text", required: true },
            { name: "visionText", type: "textarea", required: true },
          ],
        },
        {
          label: "Location",
          fields: [
            {
              name: "locationBackgroundImage",
              type: "upload",
              relationTo: "media",
            },
            {
              name: "locationPinIcon",
              type: "upload",
              relationTo: "media",
              label: "Pin icon",
            },
            { name: "locationText", type: "textarea", required: true },
          ],
        },
        {
          label: "Map",
          fields: [
            { name: "mapTitle", type: "text", required: true },
            { name: "mapImage", type: "upload", relationTo: "media" },
            { name: "mapLink", type: "text", required: true },
          ],
        },
      ],
    },
  ],
};

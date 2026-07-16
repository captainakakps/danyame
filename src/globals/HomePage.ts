import type { GlobalConfig } from "payload";

import { isAdmin } from "@/access/isAdmin";
import { publicRead } from "@/access/publicRead";

const categoryFields = [
  {
    name: "title",
    type: "text" as const,
    required: true,
  },
  {
    name: "image",
    type: "upload" as const,
    relationTo: "media" as const,
    required: true,
  },
  {
    name: "href",
    type: "text" as const,
    required: true,
  },
];

const testimonialFields = [
  { name: "name", type: "text" as const, required: true },
  { name: "role", type: "text" as const, required: true },
  { name: "quote", type: "textarea" as const, required: true },
  {
    name: "image",
    type: "upload" as const,
    relationTo: "media" as const,
    required: true,
  },
  { name: "imageAlt", type: "text" as const, required: true },
  {
    name: "cardStyle",
    type: "select" as const,
    defaultValue: "light",
    options: [
      { label: "Light", value: "light" },
      { label: "Dark", value: "dark" },
    ],
    required: true,
  },
];

const galleryImageFields = [
  {
    name: "image",
    type: "upload" as const,
    relationTo: "media" as const,
    required: true,
  },
  {
    name: "alt",
    type: "text" as const,
    required: true,
  },
];

export const HomePage: GlobalConfig = {
  slug: "home-page",
  label: "Home Page",
  admin: {
    group: "Pages",
  },
  access: {
    read: publicRead,
    update: isAdmin,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [
            {
              name: "heroImage",
              type: "upload",
              relationTo: "media",
              label: "Hero background",
            },
            {
              name: "heroHeadline1",
              type: "text",
              defaultValue: "Relaxation",
              required: true,
            },
            {
              name: "heroHeadline2",
              type: "text",
              defaultValue: "Entertainment",
              required: true,
            },
            {
              name: "heroHeadline3",
              type: "text",
              defaultValue: "Unforgettable Experiences",
              required: true,
            },
            {
              name: "heroTagline",
              type: "text",
              required: true,
            },
            {
              name: "heroSubtext",
              type: "textarea",
              required: true,
            },
          ],
        },
        {
          label: "Intro & About",
          fields: [
            {
              name: "everythingTitle",
              type: "text",
              defaultValue: "Everything You Need in One Place",
              required: true,
            },
            {
              name: "everythingBody",
              type: "textarea",
              required: true,
            },
            {
              name: "everythingCtaLabel",
              type: "text",
              defaultValue: "Learn More",
              required: true,
            },
            {
              name: "everythingCtaHref",
              type: "text",
              defaultValue: "/experiences",
              required: true,
            },
            {
              name: "categories",
              type: "array",
              label: "Experience categories",
              minRows: 1,
              maxRows: 6,
              fields: categoryFields,
            },
            {
              name: "aboutTitle",
              type: "text",
              defaultValue: "A Place Built for People",
              required: true,
            },
            {
              name: "aboutBody",
              type: "textarea",
              required: true,
            },
            {
              name: "aboutImage",
              type: "upload",
              relationTo: "media",
            },
            {
              name: "aboutImageAlt",
              type: "text",
              defaultValue: "Danyame building",
            },
            {
              name: "aboutCtaLabel",
              type: "text",
              defaultValue: "Learn More About US",
              required: true,
            },
            {
              name: "aboutCtaHref",
              type: "text",
              defaultValue: "/about",
              required: true,
            },
          ],
        },
        {
          label: "Events",
          fields: [
            {
              name: "eventsSectionTitle",
              type: "text",
              defaultValue: "Upcoming Events",
              required: true,
            },
            {
              name: "eventsHeading",
              type: "textarea",
              admin: {
                description: "Use a new line for the line break in the heading.",
              },
              required: true,
            },
            {
              name: "eventsBody",
              type: "textarea",
              required: true,
            },
            {
              name: "eventsMetaEveryWeek",
              type: "text",
              defaultValue: "Every Week",
              required: true,
            },
            {
              name: "eventsMetaLocation",
              type: "text",
              defaultValue: "Akwatia, Eastern Region",
              required: true,
            },
            {
              name: "eventsMetaVibes",
              type: "text",
              defaultValue: "Good People Great Vibes",
              required: true,
            },
            {
              name: "eventsRegisterLabel",
              type: "text",
              defaultValue: "Register",
              required: true,
            },
            {
              name: "eventsRegisterHref",
              type: "text",
              defaultValue: "/events",
              required: true,
            },
            {
              name: "eventsCountdownLabel",
              type: "text",
              defaultValue: "NEXT EVENT IN",
              required: true,
            },
            {
              name: "eventsViewAllLabel",
              type: "text",
              defaultValue: "View All Events",
              required: true,
            },
            {
              name: "eventsViewAllHref",
              type: "text",
              defaultValue: "/events",
              required: true,
            },
            {
              name: "eventsUseCmsCountdown",
              type: "checkbox",
              defaultValue: true,
              admin: {
                description:
                  "When enabled, the countdown uses the featured event date from Events.",
              },
            },
            {
              name: "planningEventImage",
              type: "upload",
              relationTo: "media",
            },
            {
              name: "planningEventImageAlt",
              type: "text",
              defaultValue: "Planning an event",
            },
            {
              name: "planningEventTitle",
              type: "text",
              defaultValue: "Planning an event?",
              required: true,
            },
            {
              name: "planningEventBody",
              type: "textarea",
              required: true,
            },
            {
              name: "planningEventCtaLabel",
              type: "text",
              defaultValue: "Book an Event",
              required: true,
            },
            {
              name: "planningEventCtaHref",
              type: "text",
              defaultValue: "/contact",
              required: true,
            },
          ],
        },
        {
          label: "Gallery",
          fields: [
            {
              name: "galleryTitle",
              type: "text",
              defaultValue: "Moments at Danyame",
              required: true,
            },
            {
              name: "galleryIntro",
              type: "textarea",
              required: true,
            },
            {
              name: "galleryUseCmsGallery",
              type: "checkbox",
              defaultValue: false,
              admin: {
                description:
                  "When enabled, the first 7 published gallery images are used instead of the manual picks below.",
              },
            },
            {
              name: "galleryImages",
              type: "array",
              label: "Manual gallery images",
              admin: {
                description:
                  "Used when CMS gallery is off. Provide 7 images for the home layout.",
              },
              fields: galleryImageFields,
            },
            {
              name: "galleryCtaLabel",
              type: "text",
              defaultValue: "View Full Gallery",
              required: true,
            },
            {
              name: "galleryCtaHref",
              type: "text",
              defaultValue: "/gallery",
              required: true,
            },
          ],
        },
        {
          label: "Testimonials",
          fields: [
            {
              name: "testimonialsTitle",
              type: "text",
              defaultValue: "What People Are Saying",
              required: true,
            },
            {
              name: "testimonialsBackgroundImage",
              type: "upload",
              relationTo: "media",
              label: "Section background",
            },
            {
              name: "testimonialsItems",
              type: "array",
              label: "Testimonials",
              minRows: 1,
              maxRows: 12,
              fields: testimonialFields,
            },
          ],
        },
        {
          label: "Final CTA",
          fields: [
            {
              name: "finalCtaLine1",
              type: "text",
              defaultValue: "READY",
              required: true,
            },
            {
              name: "finalCtaLine2",
              type: "text",
              defaultValue: "FOR YOUR",
              required: true,
            },
            {
              name: "finalCtaLine3",
              type: "text",
              defaultValue: "NEXT",
              required: true,
            },
            {
              name: "finalCtaLine4",
              type: "text",
              defaultValue: "EXPERIENCE",
              required: true,
            },
            {
              name: "finalCtaBody",
              type: "textarea",
              required: true,
            },
            {
              name: "finalCtaSecondaryLabel",
              type: "text",
              defaultValue: "Contact Us",
              required: true,
            },
            {
              name: "finalCtaSecondaryHref",
              type: "text",
              defaultValue: "/contact",
              required: true,
            },
            {
              name: "finalCtaPrimaryLabel",
              type: "text",
              defaultValue: "Book an Event",
              required: true,
            },
            {
              name: "finalCtaPrimaryHref",
              type: "text",
              defaultValue: "/contact",
              required: true,
            },
          ],
        },
      ],
    },
  ],
};

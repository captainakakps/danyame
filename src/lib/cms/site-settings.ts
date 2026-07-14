import { site as staticSite, type SiteConfig } from "@/lib/site";
import { getPayloadClient } from "@/lib/payload";
import type { Media, SiteSetting } from "@/payload-types";

export type { SiteConfig };

function getMediaUrl(media: number | Media | null | undefined): string | undefined {
  if (!media || typeof media === "number") {
    return undefined;
  }

  return media.url || undefined;
}

function getStaticSiteConfig(): SiteConfig {
  return {
    name: staticSite.name,
    shortName: staticSite.shortName,
    location: staticSite.location,
    contact: { ...staticSite.contact },
    social: staticSite.social.map((link) => ({ ...link })),
    exploreLinks: staticSite.exploreLinks.map((link) => ({ ...link })),
    copyrightYear: staticSite.copyrightYear,
    openingHours: staticSite.openingHours.map((row) => ({ ...row })),
  };
}

function mapSiteSettings(doc: SiteSetting | null): SiteConfig {
  if (!doc) {
    return getStaticSiteConfig();
  }

  const fallback = getStaticSiteConfig();

  const cmsSocial =
    doc.socialLinks?.map((link) => ({
      label: link.label,
      href: link.href,
    })) ?? [];

  const social =
    cmsSocial.length > 0
      ? [
          ...cmsSocial,
          ...fallback.social.filter(
            (link) => !cmsSocial.some((item) => item.label === link.label),
          ),
        ]
      : fallback.social;

  return {
    name: doc.siteName,
    shortName: doc.shortName,
    location: doc.location,
    contact: {
      email: doc.email || fallback.contact.email,
      phone: doc.phone || fallback.contact.phone,
      phoneHref: doc.phoneHref || fallback.contact.phoneHref,
      secondaryPhone: doc.secondaryPhone || fallback.contact.secondaryPhone,
      secondaryPhoneHref:
        doc.secondaryPhoneHref || fallback.contact.secondaryPhoneHref,
      whatsappHref: doc.whatsappHref || fallback.contact.whatsappHref,
      whatsappLabel: doc.whatsappLabel || fallback.contact.whatsappLabel,
    },
    social,
    exploreLinks:
      doc.footerLinks?.map((link) => ({
        label: link.label,
        href: link.href,
      })) ?? fallback.exploreLinks,
    copyrightYear: doc.copyrightYear,
    openingHours:
      doc.openingHoursRows?.length
        ? doc.openingHoursRows.map((row) => ({
            label: row.label,
            hours: row.hours,
          }))
        : fallback.openingHours,
    logoUrl: getMediaUrl(doc.logo),
    logoDarkUrl: getMediaUrl(doc.logoDark),
  };
}

export async function getSiteSettings(): Promise<SiteConfig> {
  try {
    const payload = await getPayloadClient();
    const doc = await payload.findGlobal({
      slug: "site-settings",
      depth: 2,
    });

    return mapSiteSettings(doc);
  } catch {
    return getStaticSiteConfig();
  }
}

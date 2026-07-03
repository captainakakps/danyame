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
  };
}

function mapSiteSettings(doc: SiteSetting | null): SiteConfig {
  if (!doc) {
    return getStaticSiteConfig();
  }

  const social =
    doc.socialLinks?.map((link) => ({
      label: link.label,
      href: link.href,
    })) ?? getStaticSiteConfig().social;

  const exploreLinks =
    doc.footerLinks?.map((link) => ({
      label: link.label,
      href: link.href,
    })) ?? getStaticSiteConfig().exploreLinks;

  return {
    name: doc.siteName,
    shortName: doc.shortName,
    location: doc.location,
    contact: {
      email: doc.email,
      phone: doc.phone,
      phoneHref: doc.phoneHref,
    },
    social,
    exploreLinks,
    copyrightYear: doc.copyrightYear,
    openingHours: doc.openingHours || undefined,
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

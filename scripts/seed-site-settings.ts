import config from "@/payload.config";
import { site as staticSite } from "@/lib/site";
import { getPayload } from "payload";

async function seedSiteSettingsFooter(): Promise<void> {
  const payload = await getPayload({ config });

  await payload.updateGlobal({
    slug: "site-settings",
    overrideAccess: true,
    data: {
      phone: staticSite.contact.phone,
      phoneHref: staticSite.contact.phoneHref,
      secondaryPhone: staticSite.contact.secondaryPhone,
      secondaryPhoneHref: staticSite.contact.secondaryPhoneHref,
      whatsappHref: staticSite.contact.whatsappHref,
      whatsappLabel: staticSite.contact.whatsappLabel,
      email: staticSite.contact.email,
      openingHoursRows: staticSite.openingHours.map((row) => ({
        label: row.label,
        hours: row.hours,
      })),
      socialLinks: staticSite.social.map((link) => ({
        label: link.label,
        href: link.href,
      })),
    },
  });

  console.log("Site settings footer data updated.");
  process.exit(0);
}

try {
  await seedSiteSettingsFooter();
} catch (error) {
  console.error("Site settings seed failed:", error);
  process.exit(1);
}

import Link from "next/link";

import NewsletterSignup from "@/components/NewsletterSignup";
import { getSiteSettings } from "@/lib/cms/site-settings";
import { pages } from "@/lib/tokens";

export default async function Footer() {
  const site = await getSiteSettings();

  return (
    <footer className="bg-teal overflow-hidden">
      <div className="px-6 py-12 md:px-10 md:py-16 lg:px-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          <div>
            <p
              className="mb-4 text-xs uppercase tracking-widest text-white/40"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Follow Us
            </p>
            <ul className="space-y-2">
              {site.social.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white transition-colors duration-150 hover:text-amber"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p
              className="mb-4 text-xs uppercase tracking-widest text-white/40"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Explore Danyame
            </p>
            <ul className="mb-8 space-y-2">
              {site.exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white transition-colors duration-150 hover:text-amber"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p
              className="mb-2 text-xs uppercase tracking-widest text-white/40"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Contact
            </p>
            <a
              href={`mailto:${site.contact.email}`}
              className="mb-2 block text-white transition-colors duration-150 hover:text-amber"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {site.contact.email}
            </a>
            <a
              href={site.contact.phoneHref}
              className="block text-white transition-colors duration-150 hover:text-amber"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {site.contact.phone}
            </a>
          </div>

          <div>
            <p
              className="mb-4 text-xs uppercase tracking-widest text-white/40"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Get Insights That Matter
            </p>
            <div className="mb-8">
              <NewsletterSignup />
            </div>

            <p
              className="mb-2 text-xs uppercase tracking-widest text-white/40"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Legal
            </p>
            <Link
              href={pages.privacy}
              className="text-white transition-colors duration-150 hover:text-amber"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>

      <div
        className="overflow-hidden whitespace-nowrap border-b border-white/10 py-8 md:py-10"
        aria-hidden
      >
        <p
          className="inline-block animate-[marquee_20s_linear_infinite] text-[clamp(6rem,18vw,16rem)] font-semibold tracking-wide text-white/10"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {site.name.toUpperCase()} &nbsp;&nbsp; {site.name.toUpperCase()}
          &nbsp;&nbsp;
        </p>
      </div>

      <div
        className="px-6 py-6 text-xs text-white/30 md:px-10 lg:px-14"
        style={{ fontFamily: "var(--font-body)" }}
      >
        © {site.copyrightYear} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}

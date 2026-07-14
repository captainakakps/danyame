import Link from "next/link";
import type { ReactNode } from "react";

import NewsletterSignup from "@/components/NewsletterSignup";
import { getSiteSettings } from "@/lib/cms/site-settings";
import { pages } from "@/lib/tokens";

function FooterLabel({ children }: { children: ReactNode }) {
  return (
    <p
      className="text-xs uppercase tracking-[0.04em] text-white/80"
      style={{ fontFamily: "var(--font-body)" }}
    >
      {children}
    </p>
  );
}

function FooterText({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-[20px] leading-[1.2] tracking-[-0.4px] ${className}`}
      style={{ fontFamily: "var(--font-heading)" }}
    >
      {children}
    </p>
  );
}

function FooterLink({
  href,
  children,
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  const classes = `text-[20px] leading-[1.2] tracking-[-0.4px] text-white transition-colors duration-150 hover:text-amber ${className}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} style={{ fontFamily: "var(--font-heading)" }}>
      {children}
    </Link>
  );
}

export default async function Footer() {
  const site = await getSiteSettings();
  const marqueeText = site.name.toUpperCase();

  return (
    <footer className="flex min-h-[720px] flex-col overflow-hidden bg-teal text-white lg:min-h-[854px]">
      <div className="mx-auto w-full max-w-[1440px] flex-1 px-6 pt-12 md:px-10 lg:px-14 lg:pt-[84px]">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1fr_326px_225px] lg:gap-x-[72px] xl:gap-x-[276px]">
          <div className="flex flex-col gap-4">
            <FooterLabel>Follow Us</FooterLabel>
            <ul className="flex flex-col gap-3">
              {site.social.map((social) => (
                <li key={social.label}>
                  <FooterLink href={social.href} external>
                    {social.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-10 lg:gap-20">
            <div className="flex flex-col gap-2">
              <FooterLabel>Explore Danyame</FooterLabel>
              <FooterLink href={`mailto:${site.contact.email}`}>
                {site.contact.email}
              </FooterLink>
            </div>

            <div className="flex flex-col gap-2">
              <FooterLabel>Contact</FooterLabel>
              <FooterLink href={site.contact.phoneHref}>{site.contact.phone}</FooterLink>
              {(site.contact.secondaryPhone || site.contact.whatsappHref) && (
                <div className="flex flex-wrap items-start gap-2">
                  {site.contact.secondaryPhone && (
                    <FooterLink
                      href={site.contact.secondaryPhoneHref || site.contact.phoneHref}
                    >
                      {site.contact.secondaryPhone}
                    </FooterLink>
                  )}
                  {site.contact.whatsappHref && (
                    <FooterLink
                      href={site.contact.whatsappHref}
                      external
                      className="underline decoration-solid underline-offset-2"
                    >
                      {site.contact.whatsappLabel || "(click to chat on whatsapp)"}
                    </FooterLink>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-8 sm:col-span-2 lg:col-span-1">
            <div className="flex flex-col gap-2">
              <FooterLabel>Get Insights That Matter</FooterLabel>
              <FooterText>subscribe to our newsletter</FooterText>
              <div className="pt-2">
                <NewsletterSignup variant="footer" />
              </div>
            </div>

            {site.openingHours.length > 0 && (
              <div className="flex flex-col gap-2">
                <FooterLabel>Opening hours</FooterLabel>
                <div className="flex flex-col gap-2">
                  {site.openingHours.map((row) => (
                    <div key={row.label} className="flex flex-wrap gap-2">
                      <FooterText>{row.label}</FooterText>
                      <FooterText>{row.hours}</FooterText>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <FooterLabel>Legal</FooterLabel>
              <FooterLink href={pages.privacy}>Privacy Policy</FooterLink>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-10 overflow-hidden lg:mt-auto" aria-hidden>
        <div className="flex w-max animate-[marquee_24s_linear_infinite]">
          {[0, 1].map((index) => (
            <span
              key={index}
              className="shrink-0 px-4 text-[clamp(5rem,18vw,260px)] font-semibold leading-none text-white sm:px-6 lg:px-8"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {marqueeText}&nbsp;&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}

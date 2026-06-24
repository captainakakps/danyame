import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${site.name}.`,
};

export default function PrivacyPage() {
  return (
    <div className="bg-white overflow-x-hidden">
      <div className="bg-white pb-6 md:pb-10">
        <Navbar variant="dark" />
      </div>

      <section className="px-6 pb-16 pt-8 sm:px-10 md:px-14 lg:pb-24">
        <div className="mx-auto max-w-[720px]">
          <h1
            className="mb-8 text-[40px] font-semibold leading-none text-ink sm:text-[56px]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Privacy Policy
          </h1>

          <div
            className="flex flex-col gap-6 text-sm leading-[1.7] text-subtext sm:text-base"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <p>
              {site.name} (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) respects your
              privacy. This policy explains how we collect, use, and protect your
              information when you visit our website or contact us about events and
              bookings.
            </p>

            <div>
              <h2
                className="mb-2 text-lg font-medium text-ink"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Information we collect
              </h2>
              <p>
                When you submit our contact or newsletter forms, we may collect your
                name, email address, phone number, event preferences, and any message
                you provide.
              </p>
            </div>

            <div>
              <h2
                className="mb-2 text-lg font-medium text-ink"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                How we use your information
              </h2>
              <p>
                We use this information to respond to inquiries, process event
                bookings, send updates you have subscribed to, and improve our services.
              </p>
            </div>

            <div>
              <h2
                className="mb-2 text-lg font-medium text-ink"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Contact
              </h2>
              <p>
                For privacy-related questions, email us at{" "}
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-rust hover:text-rust/80"
                >
                  {site.contact.email}
                </a>
                .
              </p>
            </div>

            <p className="text-xs text-subtext/80">
              Last updated: June 2026
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

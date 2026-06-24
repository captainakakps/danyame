import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Danyame Recreational Village — booking, inquiries, or planning a visit.",
};

export default function ContactPage() {
  return (
    <div className="bg-white overflow-x-hidden">
      <div className="bg-white pb-6 md:pb-10 lg:pb-16">
        <Navbar variant="dark" />
      </div>

      <section className="bg-teal px-6 py-4 sm:px-10 sm:py-6 md:px-14 md:py-8 lg:py-12">
        <div className="mx-auto max-w-[800px]">
          <h1
            className="text-[56px] font-bold leading-none text-white sm:text-[80px] md:text-[120px] lg:text-[150px]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            GET
          </h1>
        </div>
      </section>

      <section className="bg-white px-6 sm:px-10 md:px-14">
        <div className="mx-auto max-w-[800px]">
          <p
            className="text-[56px] font-bold leading-none text-ink sm:text-[80px] md:text-[120px] lg:text-[150px]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            IN TOUCH:
          </p>
        </div>
      </section>

      <section className="bg-white px-6 pb-6 pt-4 sm:px-10 sm:pb-8 sm:pt-6 md:px-14 md:pb-10 md:pt-8">
        <div className="mx-auto max-w-[800px]">
          <p
            className="text-sm leading-[1.5] text-subtext sm:text-base md:text-lg lg:text-[20px]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Whether you&apos;re booking an event, making an inquiry, or planning a
            visit — we&apos;re here to help you make it happen.
          </p>
          <div
            className="mt-6 flex flex-col gap-2 text-sm text-ink sm:flex-row sm:gap-8 sm:text-base"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <a
              href={`mailto:${site.contact.email}`}
              className="transition-colors duration-150 hover:text-rust"
            >
              {site.contact.email}
            </a>
            <a
              href={site.contact.phoneHref}
              className="transition-colors duration-150 hover:text-rust"
            >
              {site.contact.phone}
            </a>
            <span className="text-subtext">{site.location}</span>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 pb-12 sm:px-10 sm:pb-16 md:px-14 md:pb-24 lg:pb-32">
        <ContactForm />
      </section>

      <Footer />
    </div>
  );
}

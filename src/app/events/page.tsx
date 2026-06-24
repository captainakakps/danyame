import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { pages } from "@/lib/tokens";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming events at Danyame Recreational Village — Akwatia, Eastern Region.",
};

export default function EventsPage() {
  return (
    <div className="bg-white overflow-x-hidden">
      {/* ── Hero Section ── */}
      <section className="relative min-h-[600px] w-full text-white md:min-h-[700px] lg:h-[1014px]">
        {/* Background image */}
        <Image
          src="/assets/events/hero.jpg"
          alt="Elegant event venue at Danyame"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Navbar */}
        <div className="relative z-10">
          <Navbar />
        </div>

        {/* Hero content */}
        <div className="relative flex h-full flex-col justify-end px-6 pb-12 sm:px-10 sm:pb-16 md:px-14 md:pb-20 lg:absolute lg:bottom-[100px] lg:left-14 lg:w-[917px] lg:pb-0">
          <div className="flex flex-col gap-4 lg:gap-4">
            <h1
              className="text-[36px] font-semibold uppercase leading-[1] sm:text-[48px] md:text-[60px] lg:text-[80px]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              What Brings You To Danyame?
            </h1>

            <div className="flex flex-col gap-6 lg:gap-6">
              <p
                className="max-w-[600px] text-sm leading-[1.7] sm:text-base md:max-w-[800px]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Are you here to host a celebration or join an unforgettable
                experience? From private events and corporate gatherings to
                concerts, parties, and special occasions, there&apos;s always
                something worth showing up for.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Link
                  href={pages.hostEvent}
                  className="flex h-[50px] w-full items-center justify-center rounded-[100px] bg-rust text-base font-medium text-white transition-colors duration-150 hover:bg-rust/90 sm:w-[182px]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Host an Event
                </Link>
                <Link
                  href={pages.attendEvent}
                  className="flex h-[50px] w-full items-center justify-center rounded-[100px] bg-white text-base font-medium text-ink transition-colors duration-150 hover:bg-white/90 sm:w-[182px]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Attend an Event
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Choose Your Experience Section ── */}
      <section className="bg-white px-6 py-16 sm:px-10 sm:py-20 md:px-14 lg:px-14 lg:py-[130px]">
        <div className="mx-auto max-w-[1328px]">
          {/* Section header */}
          <div className="mb-10 flex flex-col gap-4 lg:mb-14">
            <h2
              className="text-[32px] font-medium leading-none text-ink sm:text-[40px] md:text-[48px] lg:text-[56px]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Choose Your Experience
            </h2>
            <p
              className="max-w-[715px] text-sm leading-[1.5] text-subtext sm:text-base"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Whether you&apos;re planning an unforgettable event or looking
              forward to an exciting experience, Danyame is the perfect place
              for it.
            </p>
          </div>

          {/* Two cards */}
          <div className="flex flex-col gap-10 md:flex-row md:justify-between md:gap-6 lg:gap-8">
            {/* Host an Event Card */}
            <div className="flex flex-1 flex-col gap-6 md:max-w-[600px] lg:gap-8">
              <div className="flex flex-col gap-5 lg:gap-6">
                <div className="relative h-[200px] w-full overflow-hidden rounded-[20px] sm:h-[250px] md:h-[300px]">
                  <Image
                    src="/assets/events/host-event.jpg"
                    alt="Event hosting venue with elegant table settings"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-col gap-3 lg:gap-4">
                  <h3
                    className="text-[28px] leading-none text-ink sm:text-[32px] md:text-[36px] lg:text-[40px]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Host an Event
                  </h3>
                  <p
                    className="text-sm leading-[1.7] text-subtext sm:text-base"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Looking for the perfect venue for your wedding, birthday,
                    corporate gathering, or private celebration? Find available
                    dates and reserve your space.
                  </p>
                </div>
              </div>
              <Link
                href={pages.hostEvent}
                className="flex h-[50px] w-full items-center justify-center rounded-[100px] bg-rust text-base font-medium text-white transition-colors duration-150 hover:bg-rust/90 sm:w-[182px]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Book an Event
              </Link>
            </div>

            {/* Attend an Event Card */}
            <div
              id="attend"
              className="flex flex-1 flex-col gap-6 md:max-w-[600px] lg:gap-8"
            >
              <div className="flex flex-col gap-5 lg:gap-6">
                <div className="relative h-[200px] w-full overflow-hidden rounded-[20px] sm:h-[250px] md:h-[300px]">
                  <Image
                    src="/assets/events/attend-event.jpg"
                    alt="Exciting event performance"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-col gap-3 lg:gap-4">
                  <h3
                    className="text-[28px] leading-none text-ink sm:text-[32px] md:text-[36px] lg:text-[40px]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Attend an Event
                  </h3>
                  <p
                    className="text-sm leading-[1.7] text-subtext sm:text-base"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Discover upcoming concerts, parties, special performances,
                    and exclusive experiences happening at Danyame. We create
                    wonderful moments here.
                  </p>
                </div>
              </div>
              <Link
                href={pages.attendEvent}
                className="flex h-[50px] w-full items-center justify-center rounded-[100px] bg-rust text-base font-medium text-white transition-colors duration-150 hover:bg-rust/90 sm:w-[182px]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Attend an Event
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
}

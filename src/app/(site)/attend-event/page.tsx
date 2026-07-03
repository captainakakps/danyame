import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import {
  getFeaturedEvent,
  getLineupEvents,
  getEventPath,
} from "@/lib/cms/events";
import { pages } from "@/lib/tokens";

export const metadata: Metadata = {
  title: "Attend an Event",
  description:
    "Experience Danyame live — discover upcoming concerts, parties, and exclusive events.",
};

export default async function AttendEventPage() {
  const [featuredEvent, { events, featuredEventSlug }] = await Promise.all([
    getFeaturedEvent(),
    getLineupEvents(),
  ]);

  const ticketHref = featuredEvent.ticketUrl || pages.contact;

  return (
    <div className="bg-white overflow-x-hidden">
      {/* ── Hero Section 1 - Experience Danyame Live ── */}
      <section className="relative min-h-[500px] w-full text-white sm:min-h-[600px] md:min-h-[700px] lg:h-[900px]">
        {/* Background image */}
        <Image
          src="/assets/attend-event/hero.jpg"
          alt="Concert crowd at Danyame"
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

        {/* Hero content - centered title */}
        <div className="relative flex h-full min-h-[300px] flex-col items-center justify-center px-6 sm:min-h-[400px] md:px-14">
          <h1
            className="text-center text-[40px] font-semibold uppercase leading-[1] sm:text-[60px] md:text-[100px] lg:text-[150px]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Experience
            <br />
            Danyame Live
          </h1>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 lg:bottom-16">
            <svg
              className="h-6 w-6 animate-bounce"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </div>
      </section>

      {/* ── Featured Event Section ── */}
      <section className="relative min-h-[500px] w-full text-white sm:min-h-[600px] md:min-h-[700px] lg:h-[900px]">
        {/* Background image */}
        <Image
          src={featuredEvent.image}
          alt={featuredEvent.title}
          fill
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Content */}
        <div className="relative flex h-full flex-col px-6 py-12 sm:px-10 md:px-14 lg:py-20">
          {/* Featured event label */}
          <p
            className="text-[28px] uppercase sm:text-[36px] md:text-[48px]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Featured Event
          </p>

          {/* Date card - positioned top right on desktop */}
          <div className="mt-6 flex w-fit flex-col items-center gap-4 rounded-[20px] border border-white/30 px-6 py-6 sm:gap-6 sm:px-8 sm:py-8 lg:absolute lg:right-14 lg:top-20 lg:mt-0">
            <div className="flex flex-col items-center gap-2 text-center sm:gap-4">
              <span
                className="text-[20px] sm:text-[24px] md:text-[32px]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {featuredEvent.dateCard.month}
              </span>
              <span
                className="text-[24px] font-bold sm:text-[28px] md:text-[32px]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {featuredEvent.dateCard.day}
              </span>
            </div>
            <div className="h-px w-full bg-white/30" />
            <span
              className="text-[24px] font-bold sm:text-[28px] md:text-[32px]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {featuredEvent.dateCard.time}
            </span>
          </div>

          {/* Event title and buttons - positioned at bottom */}
          <div className="mt-auto flex flex-col gap-6 sm:gap-8 lg:gap-10">
            <h2
              className="text-[40px] font-semibold uppercase leading-[1] sm:text-[60px] md:text-[80px] lg:text-[100px]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {featuredEvent.title}
            </h2>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link
                href={ticketHref}
                className="flex h-[50px] w-full items-center justify-center rounded-[100px] bg-rust text-base font-medium uppercase text-white transition-colors duration-150 hover:bg-rust/90 sm:w-[182px]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Buy Ticket
              </Link>
              <Link
                href={featuredEvent.slug ? getEventPath(featuredEvent.slug) : pages.contact}
                className="flex h-[50px] w-full items-center justify-center rounded-[100px] bg-white text-base font-medium text-ink transition-colors duration-150 hover:bg-white/90 sm:w-[182px]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Event Lineup Section ── */}
      <section className="bg-ink px-6 py-16 sm:px-10 sm:py-20 md:px-14 lg:px-14 lg:py-[130px]">
        <div className="mx-auto max-w-[1328px]">
          {/* Section header */}
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:mb-14">
            <h2
              className="text-[32px] font-medium leading-none text-white sm:text-[40px] md:text-[48px] lg:text-[56px]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Event Lineup
            </h2>
            <Link
              href={pages.calendar}
              className="flex h-[50px] w-full items-center justify-center gap-2 rounded-[100px] bg-white text-base font-medium text-ink transition-colors duration-150 hover:bg-white/90 sm:w-[182px]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              Calendar
            </Link>
          </div>

          {/* Event grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {events
              .filter((event) => event.slug !== featuredEventSlug)
              .map((event) => (
              <Link
                key={event.slug}
                href={getEventPath(event.slug)}
                className="group flex flex-col gap-5 lg:gap-6"
              >
                <div className="relative h-[250px] w-full overflow-hidden rounded-[20px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                <div className="flex flex-col gap-3 lg:gap-4">
                  <div className="flex items-center justify-between">
                    <h3
                      className="text-[18px] font-medium text-white sm:text-[20px]"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {event.title}
                    </h3>
                    {event.hasTickets && (
                      <span className="text-xl" title="Tickets available">
                        🎟️
                      </span>
                    )}
                  </div>

                  <p
                    className="text-[14px] text-[#e6c571] sm:text-[16px]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {event.date}
                  </p>

                  <p
                    className="text-[14px] text-white/80 sm:text-[16px] line-clamp-2"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {event.shortSummary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
}

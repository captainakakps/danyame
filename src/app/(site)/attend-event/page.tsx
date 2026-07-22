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
  const lineupEvents = [
    ...events.filter((event) => event.slug === featuredEventSlug),
    ...events.filter((event) => event.slug !== featuredEventSlug),
  ];

  return (
    <div className="bg-white overflow-x-hidden">
      {/* ── Hero — Featured Event ── */}
      <section className="relative flex h-svh min-h-[560px] w-full flex-col overflow-hidden bg-ink text-white">
        {/* Full poster visible (no crop); letterboxes on dark bg on wide screens */}
        <Image
          src={featuredEvent.image}
          alt={featuredEvent.title}
          fill
          className="object-contain object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/55 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[55%] bg-linear-to-t from-black/90 via-black/45 to-transparent" />

        <div className="relative z-10 shrink-0">
          <Navbar />
        </div>

        <div className="relative z-10 flex min-h-0 flex-1 flex-col px-6 pb-10 pt-4 sm:px-10 sm:pb-12 md:px-14 lg:pb-14">
          <p
            className="text-[16px] uppercase tracking-[0.25em] text-white/80 sm:text-[18px] md:text-[20px]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Featured Event
          </p>

          <div className="mt-5 flex w-fit flex-col items-center gap-3 rounded-[20px] border border-white/25 bg-white/10 px-6 py-5 backdrop-blur-md sm:gap-4 sm:px-8 sm:py-6 lg:absolute lg:right-14 lg:top-4 lg:mt-0">
            <div className="flex flex-col items-center gap-1 text-center sm:gap-2">
              <span
                className="text-[16px] uppercase tracking-[0.15em] text-white/80 sm:text-[18px] md:text-[20px]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {featuredEvent.dateCard.month}
              </span>
              <span
                className="text-[32px] font-bold leading-none sm:text-[36px] md:text-[44px]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {featuredEvent.dateCard.day}
              </span>
            </div>
            <div className="h-px w-full bg-white/30" />
            <span
              className="text-[18px] font-bold sm:text-[20px] md:text-[24px]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {featuredEvent.dateCard.time}
            </span>
          </div>

          <div className="mt-auto flex flex-col gap-5 sm:gap-6 lg:gap-8">
            <h1
              className="max-w-[16ch] text-[40px] font-semibold uppercase leading-[0.95] drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)] sm:text-[56px] md:text-[72px] lg:text-[88px]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {featuredEvent.title}
            </h1>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link
                href={ticketHref}
                className="flex h-[54px] w-full items-center justify-center rounded-[100px] bg-rust text-base font-medium uppercase text-white shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all duration-150 hover:-translate-y-0.5 hover:bg-rust/90 sm:w-[182px]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Buy Ticket
              </Link>
              <Link
                href={featuredEvent.slug ? getEventPath(featuredEvent.slug) : pages.contact}
                className="flex h-[54px] w-full items-center justify-center rounded-[100px] border border-white/40 bg-white/10 text-base font-medium text-white backdrop-blur-md transition-all duration-150 hover:-translate-y-0.5 hover:bg-white hover:text-ink sm:w-[182px]"
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
            {lineupEvents.map((event) => (
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

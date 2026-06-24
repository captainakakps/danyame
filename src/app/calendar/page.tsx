import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventMeta from "@/components/ui/EventMeta";
import Link from "next/link";
import Image from "next/image";
import { getEventsByMonth, getEventPath } from "@/lib/events";

export const metadata: Metadata = {
  title: "Event Calendar",
  description:
    "Browse upcoming events at Danyame Recreational Village — concerts, parties, and exclusive experiences.",
};

export default function CalendarPage() {
  const eventsByMonth = getEventsByMonth();

  return (
    <div className="bg-white overflow-x-hidden">
      {/* ── Navbar on dark background ── */}
      <div className="bg-ink">
        <Navbar />
      </div>

      {/* ── Event Lineup Section ── */}
      <section className="bg-ink px-6 pb-16 pt-10 sm:px-10 sm:pb-20 sm:pt-14 md:px-14 lg:px-14 lg:pb-[130px] lg:pt-20">
        <div className="mx-auto max-w-[1328px]">
          <h1
            className="mb-12 text-[40px] font-medium leading-none text-white sm:mb-16 sm:text-[60px] md:mb-20 md:text-[80px] lg:text-[100px]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Event Lineup
          </h1>

          <div className="flex flex-col gap-16 sm:gap-20 lg:gap-[130px]">
            {eventsByMonth.map((monthGroup) => (
              <div key={monthGroup.month} className="flex flex-col gap-8 sm:gap-10 lg:gap-12">
                <h2
                  className="text-[24px] font-medium text-white sm:text-[32px] lg:text-[40px]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {monthGroup.month}
                </h2>

                <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12">
                  {monthGroup.events.map((event) => (
                    <div
                      key={event.slug}
                      className="flex flex-col gap-5 rounded-[20px] border border-white/30 bg-white/[0.01] p-4 sm:flex-row sm:gap-6 sm:p-6"
                    >
                      <div className="relative h-[180px] w-full shrink-0 overflow-hidden rounded-[16px] sm:h-[160px] sm:w-[180px] md:h-[200px] md:w-[240px]">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, 240px"
                        />
                      </div>

                      <div className="flex flex-1 flex-col gap-3 sm:gap-4">
                        <h3
                          className="text-[22px] font-medium text-white sm:text-[26px] md:text-[32px]"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          {event.title}
                        </h3>

                        <EventMeta
                          date={event.date}
                          location={event.location}
                          time={event.time}
                        />

                        <p
                          className="hidden text-[14px] leading-[1.5] text-white/80 sm:line-clamp-3 sm:block md:text-[16px] lg:max-w-[560px]"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {event.shortSummary}
                        </p>
                      </div>

                      <Link
                        href={getEventPath(event.slug)}
                        className="flex shrink-0 items-center gap-2 self-start text-[14px] font-medium text-white sm:self-center sm:text-[16px] md:text-[20px]"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {event.hasTickets && (
                          <span className="text-lg" aria-hidden>
                            🎟️
                          </span>
                        )}
                        <span className="hidden sm:inline">
                          {event.ticketLabel ??
                            (event.hasTickets ? "TICKETS & INFO" : "INFO")}
                        </span>
                        <span className="sm:hidden">
                          {event.hasTickets ? "GET TICKETS" : "INFO"}
                        </span>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

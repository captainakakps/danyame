import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShareLinkButton from "@/components/ShareLinkButton";
import Button from "@/components/ui/Button";
import EventMeta from "@/components/ui/EventMeta";
import EventSingleAnimation from "@/components/events/EventSingleAnimation";
import Image from "next/image";
import {
  getEventBySlug,
  getPublishedEvents,
} from "@/lib/cms/events";
import { getEventOgImagePath } from "@/lib/cms/event-og";
import { buildSocialMetadata } from "@/lib/seo";
import { pages } from "@/lib/tokens";

interface EventPageProps {
  readonly params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const events = await getPublishedEvents();
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return { title: "Event Not Found" };
  }

  return {
    title: event.title,
    description: event.shortSummary,
    ...buildSocialMetadata({
      title: event.title,
      description: event.shortSummary,
      // Static /assets file — same WhatsApp-friendly pattern as menu cards.
      image: getEventOgImagePath(event.slug),
      imageAlt: event.title,
      imageWidth: 1200,
      imageHeight: 630,
      path: `/events/${event.slug}`,
      type: "article",
    }),
  };
}

export default async function EventSinglePage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const ticketHref = event.ticketUrl || pages.contact;

  return (
    <div className="bg-white overflow-x-hidden">
      {/* ── Navbar on dark background ── */}
      <div className="bg-ink">
        <Navbar />
      </div>

      {/* ── Event Detail Section ── */}
      <EventSingleAnimation>
      <section className="bg-ink px-6 pb-16 pt-10 sm:px-10 sm:pb-20 sm:pt-14 md:px-14 lg:px-14 lg:pb-[130px] lg:pt-20">
        <div className="mx-auto max-w-[1328px]">
          <div className="flex flex-col gap-8 rounded-[20px] bg-ink p-4 sm:gap-6 sm:p-6 lg:flex-row lg:items-start lg:justify-center lg:gap-6">
            {/* Event poster */}
            <div
              className="group relative mx-auto aspect-square w-full max-w-[400px] shrink-0 overflow-hidden rounded-[20px] sm:max-w-none sm:w-[320px] md:w-[360px] lg:w-[400px]"
              data-event-poster
            >
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                priority
                sizes="(max-width: 640px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/20" />
              <div className="absolute left-4 top-4 z-10">
                <ShareLinkButton title={event.title} />
              </div>
            </div>

            {/* Event info */}
            <div
              className="flex flex-1 flex-col justify-center gap-6 sm:gap-8 lg:max-w-[560px]"
              data-event-content
            >
              <div className="flex flex-col gap-4">
                <h1
                  className="text-[28px] font-medium leading-none text-white sm:text-[36px] md:text-[42px] lg:text-[48px]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {event.title}
                </h1>

                <EventMeta
                  date={event.date}
                  location={event.location}
                  time={event.time}
                />

                <p
                  className="whitespace-pre-wrap text-[14px] leading-[1.5] text-white sm:text-[16px]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {event.description}
                </p>
              </div>

              {event.hasTickets ? (
                <div data-event-cta>
                  <Button href={ticketHref} className="w-full uppercase sm:w-[182px]">
                    Buy Ticket
                  </Button>
                </div>
              ) : (
                <div data-event-cta>
                  <Button
                    href={pages.contact}
                    variant="outline"
                    className="w-full sm:w-[182px]"
                  >
                    Get Info
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      </EventSingleAnimation>

      <Footer />
    </div>
  );
}

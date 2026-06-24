import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { pages } from "@/lib/tokens";

export const metadata: Metadata = {
  title: "Host an Event",
  description:
    "Book your wedding, birthday, corporate gathering, or private celebration at Danyame Recreational Village.",
};

export default function HostEventPage() {
  return (
    <div className="bg-white overflow-x-hidden">
      <div className="bg-ink">
        <Navbar />
      </div>

      <section className="bg-ink px-6 pb-16 pt-10 sm:px-10 sm:pb-20 sm:pt-14 md:px-14 lg:px-14 lg:pb-[130px] lg:pt-20">
        <div className="mx-auto max-w-[1328px]">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
            <div className="flex flex-1 flex-col gap-6 lg:max-w-[560px]">
              <h1
                className="text-[36px] font-medium leading-none text-white sm:text-[48px] md:text-[56px] lg:text-[64px]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Host an Event
              </h1>
              <p
                className="text-sm leading-[1.7] text-white/80 sm:text-base md:text-lg"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Looking for the perfect venue for your wedding, birthday,
                corporate gathering, or private celebration? Find available dates
                and reserve your space at Danyame Recreational Village.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Button href={pages.contact} className="w-full sm:w-[182px]">
                  Book an Event
                </Button>
                <Button
                  href={pages.events}
                  variant="outline"
                  className="w-full sm:w-[182px]"
                >
                  View All Events
                </Button>
              </div>
            </div>

            <div className="relative h-[250px] w-full overflow-hidden rounded-[20px] sm:h-[300px] md:h-[400px] lg:h-[450px] lg:max-w-[600px]">
              <Image
                src="/assets/events/host-event.jpg"
                alt="Event hosting venue with elegant table settings"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 600px"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

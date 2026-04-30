import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Building2, CalendarDays, MapPin } from "lucide-react";

import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { EventDetailsContent } from "@/components/events/event-details-content";
import { events } from "@/lib/mock-data";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const event = events.find((item) => item.id === id);

  if (!event) {
    return {
      title: "Event Not Found | Eventra",
      description: "The event you are looking for could not be found.",
    };
  }

  const title = `${event.title} | Eventra`;
  const description = `${event.date} at ${event.time} · ${event.venue}, ${event.location}. Book your spot and view full event details.`;

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      type: "article",
      url: `/events/${event.id}`,
      siteName: "Eventra",
      images: [
        {
          url: event.image,
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [event.image],
    },
  };
}

export default async function EventDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const event = events.find((item) => item.id === id);

  if (!event) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0d141d] text-white">
      <Navbar />

      <section className="relative h-[560px] overflow-hidden pt-20">
        <Image
          src={event.image}
          alt={event.title}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0d141d] via-[#0d141d]/60 to-black/20" />

        <div className="absolute bottom-0 left-0 w-full px-6 pb-12 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-5 flex flex-wrap gap-3">
              <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-violet-300">
                {event.category}
              </span>

              <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-300">
                Hybrid Event
              </span>
            </div>

            <h1 className="max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
              {event.title}
            </h1>

            <div className="mt-6 flex flex-wrap gap-6 text-sm text-slate-300">
              <span className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-violet-300" />
                {event.date} · {event.time}
              </span>

              <span className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-violet-300" />
                {event.venue}, {event.location}
              </span>

              <span className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-violet-300" />
                TechNext Labs
              </span>
            </div>
          </div>
        </div>
      </section>

      <EventDetailsContent event={event} />

      <Footer />
    </main>
  );
}
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { events } from "@/lib/mock-data";
import { EventCard } from "@/components/events/event-card";
import { Button } from "@/components/ui/button";

export function FeaturedEventsSection() {
  const featuredPreview = events
    .filter((event) => event.featured)
    .slice(0, 3);

  const eventsToShow =
    featuredPreview.length >= 3 ? featuredPreview : events.slice(0, 3);

  return (
    <section id="featured-events" className="px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-violet-300">
              Featured Experiences
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Events worth your attention
            </h2>

            <p className="mt-3 max-w-2xl text-slate-400">
              A quick preview of selected events. Browse the full events page to
              discover more conferences, workshops, festivals, and experiences.
            </p>
          </div>

          <Button
            asChild
            variant="ghost"
            className="w-fit text-violet-300 hover:bg-violet-500/10 hover:text-violet-200"
          >
            <Link href="/events">
              View All Events
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {eventsToShow.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        <div className="mt-10 flex justify-center md:hidden">
          <Button asChild className="bg-violet-500 hover:bg-violet-400">
            <Link href="/events">Browse More Events</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
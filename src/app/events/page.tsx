import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EventsBrowser } from "@/components/events/events-browser";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-[#0d141d] text-white">
      <Navbar />

      <section className="px-6 pb-20 pt-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <Badge className="mb-4 border border-violet-400/20 bg-violet-500/10 text-violet-300 hover:bg-violet-500/10">
              Browse Events
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Find events worth showing up for.
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-400">
              Search through curated conferences, workshops, festivals, sports
              events, and professional experiences happening near you.
            </p>
          </div>

          <EventsBrowser />

          <div className="mt-16 rounded-[2rem] border border-white/10 bg-gradient-to-r from-violet-500/10 to-emerald-500/10 p-8 text-center">
            <h2 className="text-2xl font-bold">Hosting an event?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-400">
              Eventra gives organizers the tools to publish events, sell
              tickets, monitor attendance, and track revenue from one place.
            </p>

            <Button asChild className="mt-6 bg-violet-500 hover:bg-violet-400">
              <Link href="/organizers">See Organizer Benefits</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
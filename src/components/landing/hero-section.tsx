"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { events } from "@/lib/mock-data";

export function HeroSection() {
  const featuredEvents = useMemo(() => {
    const markedFeatured = events.filter((event) => event.featured);
    return markedFeatured.length >= 3 ? markedFeatured : events.slice(0, 4);
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const featuredEvent = featuredEvents[activeIndex];

  function goNext() {
    setActiveIndex((current) =>
      current === featuredEvents.length - 1 ? 0 : current + 1,
    );
  }

  function goPrevious() {
    setActiveIndex((current) =>
      current === 0 ? featuredEvents.length - 1 : current - 1,
    );
  }

  useEffect(() => {
    const interval = setInterval(goNext, 6500);
    return () => clearInterval(interval);
  }, [featuredEvents.length]);

  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-32 lg:px-8">
      <div className="absolute inset-0 z-0">
        {featuredEvents.map((event, index) => (
          <Image
            key={event.id}
            src={event.image}
            alt={event.title}
            fill
            priority={index === 0}
            className={`object-cover transition-all duration-1000 ease-in-out ${
              index === activeIndex
                ? "scale-100 opacity-100"
                : "scale-105 opacity-0"
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-[#0d141d]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d141d] via-[#0d141d]/80 to-[#0d141d]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_15%,rgba(139,92,246,0.25),transparent_45%)]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 z-10">
        <div className="relative">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-violet-300">
            Event discovery platform
          </p>

          <h1 className="max-w-3xl text-5xl font-bold tracking-tight text-white md:text-6xl">
            Discover, book, and manage{" "}
            <span className="text-violet-300">unforgettable</span> events.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
            Eventra helps attendees find premium experiences while giving
            organizers the tools to manage tickets, sales, and audience
            engagement.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="h-11 bg-violet-500 px-8 hover:bg-violet-400 rounded-sm"
            >
              <Link href="/events">Explore Events</Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-11 border-white/10 bg-white/5 px-8 text-white hover:bg-white/10 hover:text-white rounded-sm"
            >
              <Link href="/organizers">Become an Organizer</Link>
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-[1rem] border border-white/10 bg-white/[0.05] shadow-2xl backdrop-blur-xl">
            <div className="relative h-80">
              {featuredEvents.map((event, index) => (
                <Image
                  key={event.id}
                  src={event.image}
                  alt={event.title}
                  fill
                  className={`object-cover transition-all duration-1000 ease-in-out ${
                    index === activeIndex
                      ? "scale-100 opacity-100"
                      : "scale-105 opacity-0"
                  }`}
                />
              ))}

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              <div className="absolute right-4 top-4 rounded-full bg-violet-400 px-4 py-2 text-xs font-bold uppercase text-violet-950">
                Featured
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-emerald-300">
                    {featuredEvent.category}
                  </p>
                  <h2 className="mt-1 text-2xl font-semibold text-white">
                    {featuredEvent.title}
                  </h2>
                </div>

                <div className="hidden text-right md:block">
                  <p className="font-bold text-violet-300">
                    {featuredEvent.price}
                  </p>
                  <p className="text-xs text-slate-400">Starting from</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <p className="line-clamp-2 text-sm leading-6 text-slate-300">
                {featuredEvent.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-violet-300" />
                  {featuredEvent.date}
                </span>

                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-violet-300" />
                  {featuredEvent.location}
                </span>
              </div>

              <Button
                asChild
                className="mt-6 h-11 w-full bg-white/10 text-white hover:bg-white/20"
              >
                <Link href={`/events/${featuredEvent.id}`}>
                  View Ticket Options
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-center gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={goPrevious}
              className="mr-6 h-11 w-11 border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {featuredEvents.map((event, index) => (
              <button
                key={event.id}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  activeIndex === index
                    ? "w-8 bg-violet-400"
                    : "w-2 bg-white/25 hover:bg-white/40"
                }`}
                aria-label={`Show ${event.title}`}
              />
            ))}

            <Button
              size="icon"
              variant="outline"
              onClick={goNext}
              className="ml-6 h-11 w-11 border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

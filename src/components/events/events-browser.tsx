"use client";

import { useMemo, useState } from "react";
import { CalendarDays, MapPin, Search, SlidersHorizontal } from "lucide-react";

import { EventCard } from "@/components/events/event-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories, events, type EventCategory } from "@/lib/mock-data";

export function EventsBrowser() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<EventCategory | "All">(
    "All"
  );

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        activeCategory === "All" || event.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <>
      <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
        <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr_auto]">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <Input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search events, venues, or organizers..."
              className="h-12 border-white/10 bg-[#0d141d] pl-11 text-white placeholder:text-slate-600"
            />
          </div>

          <FilterBox icon={<CalendarDays className="h-4 w-4" />} text="Any Date" />
          <FilterBox icon={<MapPin className="h-4 w-4" />} text="Any Location" />

          <Button className="h-12 bg-violet-500 hover:bg-violet-400">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <div className="mb-10 flex flex-wrap gap-3">
        <Button
          onClick={() => setActiveCategory("All")}
          className={
            activeCategory === "All"
              ? "rounded-full bg-violet-500 text-white hover:bg-violet-400"
              : "rounded-full border border-white/10 bg-white/[0.03] text-slate-300 hover:border-violet-400/50 hover:bg-violet-500/10 hover:text-white"
          }
        >
          All Events
        </Button>

        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={
              activeCategory === category
                ? "rounded-full bg-violet-500 text-white hover:bg-violet-400"
                : "rounded-full border border-white/10 bg-white/[0.03] text-slate-300 hover:border-violet-400/50 hover:bg-violet-500/10 hover:text-white"
            }
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="mb-8 flex items-center justify-between">
        <p className="text-sm text-slate-400">
          Showing{" "}
          <span className="font-semibold text-white">
            {filteredEvents.length}
          </span>{" "}
          curated events
        </p>

        <Button
          variant="outline"
          className="border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/[0.06] hover:text-white"
        >
          Sort: Recommended
        </Button>
      </div>

      {filteredEvents.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
          <h3 className="text-xl font-semibold">No events found</h3>
          <p className="mt-2 text-slate-400">
            Try changing your search term or category filter.
          </p>
        </div>
      )}
    </>
  );
}

function FilterBox({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <button className="flex h-12 items-center gap-3 rounded-md border border-white/10 bg-[#0d141d] px-4 text-left text-sm text-slate-400 transition hover:border-violet-400/40 hover:text-white">
      <span className="text-violet-300">{icon}</span>
      {text}
    </button>
  );
}
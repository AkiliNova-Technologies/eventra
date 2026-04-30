import Image from "next/image";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type UpcomingEvent = {
  title: string;
  date: string;
  venue: string;
  sold: number;
  capacity: number;
  image: string;
  status?: "Selling Fast" | "On Track" | "Needs Push";
};

export function UpcomingEventsCard({ events }: { events: UpcomingEvent[] }) {
  return (
    <Card className="overflow-hidden border-white/10 bg-white/[0.04] text-white backdrop-blur-xl">
      <CardHeader className="flex flex-row items-center justify-between border-b border-white/10">
        <div>
          <CardTitle>Upcoming Events</CardTitle>
          <p className="mt-1 text-sm text-slate-500">
            Track ticket progress for active events.
          </p>
        </div>

        <Button
          variant="ghost"
          className="text-violet-300 hover:bg-violet-500/10 hover:text-violet-200"
        >
          View All
        </Button>
      </CardHeader>

      <CardContent className="space-y-4 p-5">
        {events.map((event) => {
          const progress = Math.round((event.sold / event.capacity) * 100);
          const status =
            event.status ??
            (progress >= 75
              ? "Selling Fast"
              : progress >= 45
              ? "On Track"
              : "Needs Push");

          return (
            <div
              key={event.title}
              className="rounded-xl border border-white/10 bg-[#0d141d]/70 p-4 transition hover:border-violet-400/30 hover:bg-white/[0.04]"
            >
              <div className="flex gap-4">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="line-clamp-1 font-semibold text-white">
                      {event.title}
                    </h3>

                    <span className="shrink-0 rounded-full border border-violet-400/20 bg-violet-500/10 px-2.5 py-1 text-[10px] font-bold text-violet-300">
                      {status}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      {event.venue}
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="mb-1 flex justify-between text-[10px] text-slate-500">
                      <span>
                        {event.sold}/{event.capacity} tickets sold
                      </span>
                      <span className="font-bold text-violet-300">
                        {progress}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-violet-500 shadow-[0_0_12px_rgba(139,92,246,0.55)]"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
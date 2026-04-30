import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { EventItem } from "@/lib/mock-data";

export function EventCard({ event }: { event: EventItem }) {
  return (
    <Card className="overflow-hidden p-0 border-white/10 bg-white/[0.03] text-white backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-violet-400/40">
      <div className="relative h-48">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
        />
      </div>

      <CardContent className="flex min-h-[260px] flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-violet-300">
          {event.category}
        </p>

        <h3 className="mt-2 text-xl font-semibold tracking-tight">
          {event.title}
        </h3>

        <div className="mt-4 space-y-2 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-violet-300" />
            {event.date} · {event.time}
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-violet-300" />
            {event.venue}, {event.location}
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between pt-6">
          <span className="font-bold text-white">{event.price}</span>

          <Button
            asChild
            variant="secondary"
            className="bg-violet-500/10 text-violet-200 hover:bg-violet-500/20"
          >
            <Link href={`/events/${event.id}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
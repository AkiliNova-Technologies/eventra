"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CalendarDaysIcon,
  EyeIcon,
  MoreHorizontalIcon,
  PlusIcon,
  TicketIcon,
  UsersIcon,
} from "lucide-react";

import { events } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DataTableCard,
  type DataTableColumn,
} from "@/components/organizer/data-table-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type OrganizerEvent = {
  id: string;
  title: string;
  category: string;
  date: string;
  venue: string;
  image: string;
  ticketsSold: number;
  capacity: number;
  revenue: string;
  status: "Published" | "Draft" | "Sold Out";
};

const organizerEvents: OrganizerEvent[] = events.map((event, index) => ({
  id: event.id,
  title: event.title,
  category: event.category,
  date: event.date,
  venue: event.venue,
  image: event.image,
  ticketsSold: [850, 420, 210, 640, 180, 95][index] ?? 120,
  capacity: [1000, 900, 500, 700, 300, 250][index] ?? 400,
  revenue:
    ["UGX 127.5M", "UGX 33.6M", "UGX 25.2M", "UGX 38.4M"][index] ?? "UGX 12.8M",
  status: index === 1 ? "Sold Out" : index === 3 ? "Draft" : "Published",
}));

const columns: DataTableColumn<OrganizerEvent>[] = [
  {
    key: "title",
    header: "Event",
    render: (event) => (
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <p className="font-medium text-white">{event.title}</p>
          <p className="mt-1 text-xs text-slate-500">{event.category}</p>
        </div>
      </div>
    ),
  },
  {
    key: "date",
    header: "Date",
    render: (event) => (
      <div className="flex items-center gap-2 text-slate-400">
        <CalendarDaysIcon className="h-4 w-4 text-violet-300" />
        {event.date}
      </div>
    ),
  },
  {
    key: "venue",
    header: "Venue",
  },
  {
    key: "ticketsSold",
    header: "Tickets",
    render: (event) => {
      const progress = Math.round((event.ticketsSold / event.capacity) * 100);

      return (
        <div className="min-w-[150px]">
          <div className="flex justify-between text-xs">
            <span className="text-white">
              {event.ticketsSold}/{event.capacity}
            </span>
            <span className="text-violet-300">{progress}%</span>
          </div>

          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full bg-violet-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      );
    },
  },
  {
    key: "revenue",
    header: "Revenue",
    className: "text-white",
  },
  {
    key: "status",
    header: "Status",
    render: (event) => (
      <Badge
        variant="outline"
        className={
          event.status === "Published"
            ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-300"
            : event.status === "Sold Out"
              ? "border-violet-400/20 bg-violet-500/10 text-violet-300"
              : "border-amber-400/20 bg-amber-500/10 text-amber-300"
        }
      >
        {event.status}
      </Badge>
    ),
  },
  {
    key: "actions",
    header: "",
    className: "text-right",
    render: (event) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-slate-400 hover:bg-white/5 hover:text-white"
          >
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="min-w-40 border-white/10 bg-[#111827] p-2 text-white"
        >
          <DropdownMenuItem asChild className="h-10 rounded-sm">
            <Link href={`/events/${event.id}`}>View Public Page</Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild className="h-10 rounded-sm">
            <Link href={`/organizer/events/${event.id}/edit`}>Edit Event</Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="h-10 rounded-sm">
            Duplicate
          </DropdownMenuItem>

          <DropdownMenuItem className="h-10 rounded-sm text-rose-300 focus:bg-rose-500/10 focus:text-rose-300">
            Archive Event
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export default function OrganizerEventsPage() {
  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-violet-300">
            Event Management
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white">
            Events
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Create, monitor, and manage all organizer events from one place.
          </p>
        </div>

        <Button className="bg-violet-500 h-11 px-6 hover:bg-violet-400 text-white rounded-sm">
          <Link href="/organizer/events/create" className="flex items-center">
            <PlusIcon className="mr-2 h-4 w-4" />
            Create Event
          </Link>
        </Button>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <MiniStat
          icon={CalendarDaysIcon}
          label="Total Events"
          value={String(organizerEvents.length)}
        />
        <MiniStat
          icon={TicketIcon}
          label="Tickets Sold"
          value={organizerEvents
            .reduce((sum, event) => sum + event.ticketsSold, 0)
            .toLocaleString()}
        />
        <MiniStat icon={UsersIcon} label="Avg. Capacity" value="74%" />
      </section>

      <DataTableCard
        title="All Events"
        description="Manage event status, sales progress, revenue, and visibility."
        data={organizerEvents}
        columns={columns}
        pageSize={5}
        showPagination
        bordered
      />
    </div>
  );
}

function MiniStat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5 text-white backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
          {label}
        </p>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <p className="mt-4 text-3xl font-bold">{value}</p>
    </div>
  );
}

"use client";

import Image from "next/image";
import {
  CalendarDaysIcon,
  TicketIcon,
  WalletIcon,
  UsersIcon,
  TrendingUpIcon,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { events } from "@/lib/mock-data";
import { SectionCards } from "@/components/section-cards";
import { SalesPerformanceChart } from "@/components/organizer/sales-performance-chart";
import { UpcomingEventsCard } from "@/components/organizer/upcoming-events-card";
import {
  DataTableCard,
  type DataTableColumn,
} from "@/components/organizer/data-table-card";

const kpis = [
  {
    label: "Total Events",
    value: "12",
    helper: "Active events running",
    trend: "+3",
    trendDirection: "up" as const,
    icon: CalendarDaysIcon,
    tone: "text-primary bg-primary/10",
  },
  {
    label: "Tickets Sold",
    value: "1,450",
    helper: "Goal: 2,000 tickets",
    trend: "+18.2%",
    trendDirection: "up" as const,
    icon: TicketIcon,
    tone: "text-primary bg-primary/10",
  },
  {
    label: "Revenue",
    value: "UGX 45.2M",
    helper: "Trending up this month",
    trend: "+12.5%",
    trendDirection: "up" as const,
    icon: WalletIcon,
    tone: "text-secondary bg-secondary/10",
  },
  {
    label: "Attendance Rate",
    value: "92%",
    helper: "Across active events",
    trend: "-2.1%",
    trendDirection: "down" as const,
    icon: UsersIcon,
    tone: "text-amber-300 bg-amber-500/10",
  },
];

const salesChartData = [
  { date: "2026-10-01", revenue: 320000, tickets: 6 },
  { date: "2026-10-02", revenue: 410000, tickets: 8 },
  { date: "2026-10-03", revenue: 580000, tickets: 11 },
  { date: "2026-10-04", revenue: 720000, tickets: 14 },
  { date: "2026-10-05", revenue: 850000, tickets: 17 },

  // early traction
  { date: "2026-10-06", revenue: 980000, tickets: 20 },
  { date: "2026-10-07", revenue: 1150000, tickets: 24 },
  { date: "2026-10-08", revenue: 1320000, tickets: 28 },
  { date: "2026-10-09", revenue: 1500000, tickets: 32 },
  { date: "2026-10-10", revenue: 1780000, tickets: 38 },

  // marketing push spike
  { date: "2026-10-11", revenue: 2100000, tickets: 45 },
  { date: "2026-10-12", revenue: 2600000, tickets: 56 },
  { date: "2026-10-13", revenue: 3000000, tickets: 65 },

  // steady growth
  { date: "2026-10-14", revenue: 3400000, tickets: 72 },
  { date: "2026-10-15", revenue: 3800000, tickets: 80 },
  { date: "2026-10-16", revenue: 4200000, tickets: 88 },
  { date: "2026-10-17", revenue: 4600000, tickets: 96 },

  // peak phase
  { date: "2026-10-18", revenue: 5200000, tickets: 108 },
  { date: "2026-10-19", revenue: 5800000, tickets: 120 },
  { date: "2026-10-20", revenue: 6300000, tickets: 132 },
  { date: "2026-10-21", revenue: 6800000, tickets: 145 },

  // max peak
  { date: "2026-10-22", revenue: 7200000, tickets: 155 },
  { date: "2026-10-23", revenue: 7600000, tickets: 162 },

  // saturation
  { date: "2026-10-24", revenue: 7400000, tickets: 158 },
  { date: "2026-10-25", revenue: 7100000, tickets: 150 },
  { date: "2026-10-26", revenue: 6800000, tickets: 143 },

  // decline phase
  { date: "2026-10-27", revenue: 6400000, tickets: 135 },
  { date: "2026-10-28", revenue: 5900000, tickets: 125 },
  { date: "2026-10-29", revenue: 5400000, tickets: 115 },
  { date: "2026-10-30", revenue: 4900000, tickets: 105 },
  { date: "2026-10-31", revenue: 4300000, tickets: 92 },
];

const upcomingEvents = [
  {
    title: "Africa Tech Innovation Summit",
    date: "Oct 12, 2026",
    venue: "Speke Resort Munyonyo",
    sold: 850,
    capacity: 1000,
    image: events[0]?.image,
  },
  {
    title: "Neon Echoes Festival",
    date: "Aug 24, 2026",
    venue: "Lugogo Cricket Oval",
    sold: 420,
    capacity: 900,
    image: events[2]?.image,
  },
  {
    title: "Future of SaaS Summit",
    date: "Sep 5, 2026",
    venue: "Innovation Village",
    sold: 210,
    capacity: 500,
    image: events[1]?.image,
  },
];

type RecentSale = {
  attendee: string;
  initials: string;
  event: string;
  amount: string;
  time: string;
};

const recentSalesColumns: DataTableColumn<RecentSale>[] = [
  {
    key: "attendee",
    header: "Attendee",
    render: (sale) => (
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-violet-500/10 text-xs font-bold text-violet-300">
          {sale.initials}
        </div>
        <span className="font-medium text-white">{sale.attendee}</span>
      </div>
    ),
  },
  {
    key: "event",
    header: "Event",
  },
  {
    key: "amount",
    header: "Price",
    className: "text-white",
  },
  {
    key: "time",
    header: "Time",
    className: "text-right",
    render: (sale) => <span className="text-slate-500">{sale.time}</span>,
  },
];

const recentSales = [
  {
    attendee: "Jane Doe",
    initials: "JD",
    event: "Africa Tech Innovation Summit",
    amount: "UGX 150,000",
    time: "2 mins ago",
  },
  {
    attendee: "Samuel Miller",
    initials: "SM",
    event: "Neon Echoes Festival",
    amount: "UGX 80,000",
    time: "6 mins ago",
  },
  {
    attendee: "Avery Lee",
    initials: "AL",
    event: "Future of SaaS Summit",
    amount: "UGX 120,000",
    time: "14 mins ago",
  },
  {
    attendee: "Robert King",
    initials: "RK",
    event: "Africa Tech Innovation Summit",
    amount: "UGX 50,000",
    time: "21 mins ago",
  },
  {
    attendee: "Daniel Okello",
    initials: "DO",
    event: "Kampala Business Expo",
    amount: "UGX 60,000",
    time: "35 mins ago",
  },
  {
    attendee: "Grace Nanyonga",
    initials: "GN",
    event: "Startup Pitch Night",
    amount: "UGX 30,000",
    time: "48 mins ago",
  },
  {
    attendee: "Brian Kato",
    initials: "BK",
    event: "Neon Echoes Festival",
    amount: "UGX 80,000",
    time: "1 hr ago",
  },
  {
    attendee: "Emily Chen",
    initials: "EC",
    event: "Future of SaaS Summit",
    amount: "UGX 120,000",
    time: "1 hr 20 mins ago",
  },
  {
    attendee: "Ivan Ssekajja",
    initials: "IS",
    event: "Africa Tech Innovation Summit",
    amount: "UGX 150,000",
    time: "2 hrs ago",
  },
  {
    attendee: "Linda Atwine",
    initials: "LA",
    event: "Kampala Business Expo",
    amount: "UGX 60,000",
    time: "3 hrs ago",
  },
];

export default function OrganizerDashboardPage() {
  return (
    <div className="space-y-6">
      <section>
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-violet-300">
          Organizer Overview
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-white">
          Dashboard
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Track event performance, ticket sales, revenue, and attendee activity.
        </p>
      </section>

      <SectionCards items={kpis} />

      <SalesPerformanceChart
        data={salesChartData}
        title="Sales Performance"
        description="Revenue and ticket trends across active events."
        showMetricSelect
      />

      <section className="grid gap-6 lg:grid-cols-2">
        <UpcomingEventsCard events={upcomingEvents} />

        <DataTableCard
          title="Recent Sales"
          description="Latest ticket purchases across your active events."
          data={recentSales}
          columns={recentSalesColumns}
          actionLabel="Download Report"
          pageSize={4}
          showPagination
          bordered
        />
      </section>
    </div>
  );
}

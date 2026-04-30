"use client";

import Link from "next/link";
import {
  CheckCircle2Icon,
  ClockIcon,
  MoreHorizontalIcon,
  TicketIcon,
  UsersIcon,
  UserIcon,
  WalletIcon,
  XCircleIcon,
  CalendarDaysIcon,
  CreditCardIcon,
  DownloadIcon,
  QrCodeIcon,
  SendIcon,
  ShieldCheckIcon,
} from "lucide-react";

import { events } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DataTableCard,
  type DataTableColumn,
} from "@/components/organizer/data-table-card";
import { SectionCards, type CardItem } from "@/components/section-cards";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

type OrganizerTicket = {
  id: string;
  attendee: string;
  initials: string;
  event: string;
  ticketType: string;
  amount: string;
  paymentMethod: "Mobile Money" | "Card" | "Bank Transfer";
  status: "Confirmed" | "Pending" | "Cancelled";
  purchasedAt: string;
};

const tickets: OrganizerTicket[] = [
  {
    id: "TCK-1001",
    attendee: "Jane Doe",
    initials: "JD",
    event: "Africa Tech Innovation Summit 2026",
    ticketType: "VIP Pass",
    amount: "UGX 150,000",
    paymentMethod: "Mobile Money",
    status: "Confirmed",
    purchasedAt: "2 mins ago",
  },
  {
    id: "TCK-1002",
    attendee: "Samuel Miller",
    initials: "SM",
    event: "Neon Echoes Festival",
    ticketType: "General Entry",
    amount: "UGX 80,000",
    paymentMethod: "Card",
    status: "Confirmed",
    purchasedAt: "8 mins ago",
  },
  {
    id: "TCK-1003",
    attendee: "Avery Lee",
    initials: "AL",
    event: "Future of SaaS Summit",
    ticketType: "Founder Pass",
    amount: "UGX 120,000",
    paymentMethod: "Mobile Money",
    status: "Pending",
    purchasedAt: "18 mins ago",
  },
  {
    id: "TCK-1004",
    attendee: "Daniel Okello",
    initials: "DO",
    event: "Startup Pitch Night Kampala",
    ticketType: "Audience Pass",
    amount: "UGX 20,000",
    paymentMethod: "Mobile Money",
    status: "Confirmed",
    purchasedAt: "32 mins ago",
  },
  {
    id: "TCK-1005",
    attendee: "Grace Nanyonga",
    initials: "GN",
    event: "Fitness & Wellness Expo",
    ticketType: "Expo Pass",
    amount: "UGX 25,000",
    paymentMethod: "Bank Transfer",
    status: "Pending",
    purchasedAt: "45 mins ago",
  },
  {
    id: "TCK-1006",
    attendee: "Brian Kato",
    initials: "BK",
    event: "Electronic Night Sessions",
    ticketType: "Entry Pass",
    amount: "UGX 35,000",
    paymentMethod: "Card",
    status: "Confirmed",
    purchasedAt: "1 hr ago",
  },
  {
    id: "TCK-1007",
    attendee: "Linda Atwine",
    initials: "LA",
    event: "City Football Cup Finals",
    ticketType: "Standard Seat",
    amount: "UGX 45,000",
    paymentMethod: "Mobile Money",
    status: "Cancelled",
    purchasedAt: "2 hrs ago",
  },
];

const ticketStats: CardItem[] = [
  {
    label: "Tickets Sold",
    value: "1,450",
    helper: "Across active events",
    trend: "+18.2%",
    trendDirection: "up",
    icon: TicketIcon,
    tone: "bg-violet-500/10 text-violet-300",
  },
  {
    label: "Checked In",
    value: "934",
    helper: "64% check-in rate",
    trend: "+9.4%",
    trendDirection: "up",
    icon: CheckCircle2Icon,
    tone: "bg-emerald-500/10 text-emerald-300",
  },
  {
    label: "Pending Payments",
    value: "86",
    helper: "Awaiting confirmation",
    trend: "-3.1%",
    trendDirection: "down",
    icon: ClockIcon,
    tone: "bg-amber-500/10 text-amber-300",
  },
  {
    label: "Ticket Revenue",
    value: "UGX 45.2M",
    helper: "Ticket sales total",
    trend: "+12.5%",
    trendDirection: "up",
    icon: WalletIcon,
    tone: "bg-violet-500/10 text-violet-300",
  },
];

export default function OrganizerTicketsPage() {
  const [selectedTicket, setSelectedTicket] = useState<OrganizerTicket | null>(
    null,
  );

  const totalTicketTypes = events.reduce(
    (sum, event) => sum + event.tickets.length,
    0,
  );

  const columns: DataTableColumn<OrganizerTicket>[] = [
    {
      key: "id",
      header: "Ticket ID",
      render: (ticket) => (
        <span className="font-mono text-xs font-semibold text-violet-300">
          {ticket.id}
        </span>
      ),
    },
    {
      key: "attendee",
      header: "Attendee",
      render: (ticket) => (
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-violet-500/10 text-xs font-bold text-violet-300">
            {ticket.initials}
          </div>
          <span className="font-medium text-white">{ticket.attendee}</span>
        </div>
      ),
    },
    {
      key: "event",
      header: "Event",
      render: (ticket) => (
        <span className="line-clamp-1 max-w-[220px] text-slate-400">
          {ticket.event}
        </span>
      ),
    },
    {
      key: "ticketType",
      header: "Type",
      render: (ticket) => (
        <Badge
          variant="outline"
          className="border-violet-400/20 bg-violet-500/10 text-violet-300"
        >
          {ticket.ticketType}
        </Badge>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      className: "text-white",
    },
    {
      key: "paymentMethod",
      header: "Payment",
    },
    {
      key: "status",
      header: "Status",
      render: (ticket) => (
        <Badge
          variant="outline"
          className={
            ticket.status === "Confirmed"
              ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-300"
              : ticket.status === "Pending"
                ? "border-amber-400/20 bg-amber-500/10 text-amber-300"
                : "border-rose-400/20 bg-rose-500/10 text-rose-300"
          }
        >
          {ticket.status === "Confirmed" && (
            <CheckCircle2Icon className="mr-1 h-3.5 w-3.5" />
          )}
          {ticket.status === "Pending" && (
            <ClockIcon className="mr-1 h-3.5 w-3.5" />
          )}
          {ticket.status === "Cancelled" && (
            <XCircleIcon className="mr-1 h-3.5 w-3.5" />
          )}
          {ticket.status}
        </Badge>
      ),
    },
    {
      key: "purchasedAt",
      header: "Purchased",
      className: "text-slate-500",
    },
    {
      key: "actions",
      header: "",
      className: "text-right",
      render: (ticket) => (
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
            <DropdownMenuItem
              className="h-10 rounded-sm"
              onClick={() => setSelectedTicket(ticket)}
            >
              View Ticket
            </DropdownMenuItem>

            <DropdownMenuItem className="h-10 rounded-sm">
              Resend Ticket
            </DropdownMenuItem>

            <DropdownMenuItem className="h-10 rounded-sm">
              Mark Checked In
            </DropdownMenuItem>

            <DropdownMenuItem className="h-10 rounded-sm text-rose-300 focus:bg-rose-500/10 focus:text-rose-300">
              Cancel Ticket
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-violet-300">
            Ticket Management
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white">
            Tickets
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Track ticket sales, payment status, attendee access, and check-ins.
          </p>
        </div>
      </section>

      <SectionCards items={ticketStats} />

      <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5 text-white backdrop-blur-xl">
        <div className="grid gap-4 md:grid-cols-3">
          <MiniMetric label="Ticket Types" value={String(totalTicketTypes)} />
          <MiniMetric label="Active Events" value={String(events.length)} />
          <MiniMetric label="Avg. Ticket Price" value="UGX 84,000" />
        </div>
      </div>

      <DataTableCard
        title="Issued Tickets"
        description="Latest ticket purchases, payment states, and attendee access records."
        data={tickets}
        columns={columns}
        pageSize={5}
        showPagination
        bordered
        actionLabel="Export Tickets"
      />

      <TicketDetailsDialog
        ticket={selectedTicket}
        open={Boolean(selectedTicket)}
        onOpenChange={(open) => {
          if (!open) setSelectedTicket(null);
        }}
      />
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-[#0d141d]/70 p-4">
      <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

function TicketDetailsDialog({
  ticket,
  open,
  onOpenChange,
}: {
  ticket: OrganizerTicket | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!ticket) return null;

  const statusClass =
    ticket.status === "Confirmed"
      ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-300"
      : ticket.status === "Pending"
        ? "border-amber-400/20 bg-amber-500/10 text-amber-300"
        : "border-rose-400/20 bg-rose-500/10 text-rose-300";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] lg:min-w-2xl xl:min-w-3xl w-[calc(100vw-2rem)] max-w-4xl overflow-y-auto border-white/10 bg-[#0d141d] p-0 text-white shadow-2xl shadow-violet-950/30 sm:w-full">
        <div className="relative overflow-hidden border-b border-white/10 bg-white/[0.04] p-6">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />

          <DialogHeader className="relative">

            <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <DialogTitle className="text-2xl">Ticket Details</DialogTitle>
                <p className="mt-2 text-sm text-slate-400">
                  Purchase details, attendee access code, and check-in controls.
                </p>
              </div>

              <Badge variant="outline" className={statusClass}>
                <ShieldCheckIcon className="mr-1 h-3.5 w-3.5" />
                {ticket.status}
              </Badge>
            </div>
          </DialogHeader>
        </div>

        <div className="grid gap-5 p-6 sm:grid-cols-1 lg:grid-cols-[1fr_260px] overflow-y-auto">
          <div className="space-y-5">
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-violet-300">
                {ticket.id}
              </p>

              <div className="mt-4 flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-violet-500/10 text-sm font-bold text-violet-300 ring-1 ring-violet-400/20">
                  {ticket.initials}
                </div>

                <div>
                  <h3 className="text-2xl font-bold">{ticket.attendee}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    {ticket.event}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid min-w-0 gap-3 sm:grid-cols-2">
              <DetailItem
                icon={<TicketIcon className="h-4 w-4" />}
                label="Ticket Type"
                value={ticket.ticketType}
              />
              <DetailItem
                icon={<CreditCardIcon className="h-4 w-4" />}
                label="Amount Paid"
                value={ticket.amount}
              />
              <DetailItem
                icon={<CheckCircle2Icon className="h-4 w-4" />}
                label="Payment Method"
                value={ticket.paymentMethod}
              />
              <DetailItem
                icon={<CalendarDaysIcon className="h-4 w-4" />}
                label="Purchased"
                value={ticket.purchasedAt}
              />
            </div>

            <div className="rounded-xl border border-white/10 bg-[#111827] p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300">
                  <UserIcon className="h-5 w-5" />
                </div>

                <div>
                  <p className="font-semibold text-white">Attendee Access</p>
                  <p className="text-sm text-slate-500">
                    Use this code to validate entry at the event gate.
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-dashed border-violet-400/25 bg-violet-500/5 p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Access Code
                </p>
                <p className="mt-2 break-all font-mono text-lg font-bold text-white">
                  {ticket.id}-ACCESS
                </p>
              </div>
            </div>
          </div>

          <aside className="rounded-xl border border-white/10 bg-gradient-to-b from-violet-500/10 to-white/[0.03] p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-300">
                Scan Pass
              </p>
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.85)]" />
            </div>

            <div className="mt-6 rounded-xl border border-white/10 bg-white p-5 text-slate-950">
              <div className="flex aspect-square items-center justify-center rounded-lg bg-slate-950">
                <QrCodeIcon className="h-28 w-28 text-white" />
              </div>

              <p className="mt-4 text-center font-mono text-xs font-bold">
                {ticket.id}
              </p>
            </div>

            <div className="mt-5 space-y-2 text-sm">
              <div className="flex justify-between text-slate-400">
                <span>Status</span>
                <span className="font-medium text-emerald-300">
                  {ticket.status}
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Gate</span>
                <span className="font-medium text-white">Main Entry</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Seat</span>
                <span className="font-medium text-white">General</span>
              </div>
            </div>
          </aside>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 bg-white/[0.03] p-6 sm:flex-row sm:justify-end">
          <Button
            variant="outline"
            className="rounded-sm border-white/10 bg-white/5 text-white hover:bg-white/10"
          >
            <SendIcon className="mr-2 h-4 w-4" />
            Resend Ticket
          </Button>

          <Button
            variant="outline"
            className="rounded-sm border-white/10 bg-white/5 text-white hover:bg-white/10"
          >
            <DownloadIcon className="mr-2 h-4 w-4" />
            Download Pass
          </Button>

          <Button className="rounded-sm bg-violet-500 text-white hover:bg-violet-400">
            <CheckCircle2Icon className="mr-2 h-4 w-4" />
            Mark Checked In
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0 rounded-lg border border-white/10 bg-[#0d141d]/80 p-4">
      <div className="flex min-w-0 items-center gap-2 text-violet-300">
        <span className="shrink-0">{icon}</span>
        <p className="truncate text-[10px] font-bold uppercase tracking-widest text-slate-500">
          {label}
        </p>
      </div>

      <p className="mt-3 break-words text-sm font-semibold leading-6 text-white">
        {value}
      </p>
    </div>
  );
}


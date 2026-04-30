"use client";

import Link from "next/link";
import {
  CheckCircle2Icon,
  ClockIcon,
  MailIcon,
  MoreHorizontalIcon,
  PhoneIcon,
  TicketIcon,
  UserCheckIcon,
  UsersIcon,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { SendIcon, UserIcon } from "lucide-react";

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
import { useState } from "react";
import { Input } from "@/components/ui/input";

type Attendee = {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  event: string;
  ticketType: string;
  status: "Checked In" | "Not Checked In" | "Pending";
  registeredAt: string;
};

const attendees: Attendee[] = [
  {
    id: "ATD-1001",
    name: "Jane Doe",
    initials: "JD",
    email: "jane.doe@email.com",
    phone: "+256 700 123 456",
    event: "Africa Tech Innovation Summit 2026",
    ticketType: "VIP Pass",
    status: "Checked In",
    registeredAt: "2 mins ago",
  },
  {
    id: "ATD-1002",
    name: "Samuel Miller",
    initials: "SM",
    email: "samuel.miller@email.com",
    phone: "+256 701 456 900",
    event: "Neon Echoes Festival",
    ticketType: "General Entry",
    status: "Not Checked In",
    registeredAt: "12 mins ago",
  },
  {
    id: "ATD-1003",
    name: "Avery Lee",
    initials: "AL",
    email: "avery.lee@email.com",
    phone: "+256 702 991 120",
    event: "Future of SaaS Summit",
    ticketType: "Founder Pass",
    status: "Pending",
    registeredAt: "28 mins ago",
  },
  {
    id: "ATD-1004",
    name: "Daniel Okello",
    initials: "DO",
    email: "daniel.okello@email.com",
    phone: "+256 772 401 220",
    event: "Startup Pitch Night Kampala",
    ticketType: "Audience Pass",
    status: "Checked In",
    registeredAt: "45 mins ago",
  },
  {
    id: "ATD-1005",
    name: "Grace Nanyonga",
    initials: "GN",
    email: "grace.nanyonga@email.com",
    phone: "+256 754 330 119",
    event: "Fitness & Wellness Expo",
    ticketType: "Expo Pass",
    status: "Not Checked In",
    registeredAt: "1 hr ago",
  },
  {
    id: "ATD-1006",
    name: "Brian Kato",
    initials: "BK",
    email: "brian.kato@email.com",
    phone: "+256 705 940 221",
    event: "Electronic Night Sessions",
    ticketType: "Entry Pass",
    status: "Checked In",
    registeredAt: "2 hrs ago",
  },
];

const attendeeStats: CardItem[] = [
  {
    label: "Total Attendees",
    value: "1,824",
    helper: "Across all events",
    trend: "+15.2%",
    trendDirection: "up",
    icon: UsersIcon,
    tone: "bg-violet-500/10 text-violet-300",
  },
  {
    label: "Checked In",
    value: "934",
    helper: "Live attendance count",
    trend: "+9.4%",
    trendDirection: "up",
    icon: UserCheckIcon,
    tone: "bg-emerald-500/10 text-emerald-300",
  },
  {
    label: "Pending Entry",
    value: "276",
    helper: "Awaiting verification",
    trend: "-4.1%",
    trendDirection: "down",
    icon: ClockIcon,
    tone: "bg-amber-500/10 text-amber-300",
  },
  {
    label: "Tickets Linked",
    value: "1,450",
    helper: "Confirmed ticket holders",
    trend: "+18.2%",
    trendDirection: "up",
    icon: TicketIcon,
    tone: "bg-violet-500/10 text-violet-300",
  },
];

export default function OrganizerAttendeesPage() {
  const [selectedProfile, setSelectedProfile] = useState<Attendee | null>(null);
  const [emailTarget, setEmailTarget] = useState<Attendee | null>(null);

  const columns: DataTableColumn<Attendee>[] = [
    {
      key: "name",
      header: "Attendee",
      render: (attendee) => (
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-violet-500/10 text-xs font-bold text-violet-300">
            {attendee.initials}
          </div>

          <div>
            <p className="font-medium text-white">{attendee.name}</p>
            <p className="mt-1 font-mono text-xs text-violet-300">
              {attendee.id}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "email",
      header: "Contact",
      render: (attendee) => (
        <div className="space-y-1">
          <p className="flex items-center gap-2 text-sm text-slate-400">
            <MailIcon className="h-3.5 w-3.5 text-violet-300" />
            {attendee.email}
          </p>
          <p className="flex items-center gap-2 text-xs text-slate-500">
            <PhoneIcon className="h-3.5 w-3.5" />
            {attendee.phone}
          </p>
        </div>
      ),
    },
    {
      key: "event",
      header: "Event",
      render: (attendee) => (
        <span className="line-clamp-1 max-w-[240px] text-slate-400">
          {attendee.event}
        </span>
      ),
    },
    {
      key: "ticketType",
      header: "Ticket",
      render: (attendee) => (
        <Badge
          variant="outline"
          className="border-violet-400/20 bg-violet-500/10 text-violet-300"
        >
          {attendee.ticketType}
        </Badge>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (attendee) => (
        <Badge
          variant="outline"
          className={
            attendee.status === "Checked In"
              ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-300"
              : attendee.status === "Pending"
                ? "border-amber-400/20 bg-amber-500/10 text-amber-300"
                : "border-slate-400/20 bg-slate-500/10 text-slate-300"
          }
        >
          {attendee.status === "Checked In" && (
            <CheckCircle2Icon className="mr-1 h-3.5 w-3.5" />
          )}
          {attendee.status === "Pending" && (
            <ClockIcon className="mr-1 h-3.5 w-3.5" />
          )}
          {attendee.status}
        </Badge>
      ),
    },
    {
      key: "registeredAt",
      header: "Registered",
      className: "text-slate-500",
    },
    {
      key: "actions",
      header: "",
      className: "text-right",
      render: (attendee) => (
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
            className="min-w-44 border-white/10 bg-[#111827] p-2 text-white"
          >
            <DropdownMenuItem
              className="h-10 rounded-sm"
              onClick={() => setSelectedProfile(attendee)}
            >
              View Profile
            </DropdownMenuItem>

            <DropdownMenuItem
              className="h-10 rounded-sm"
              onClick={() => setEmailTarget(attendee)}
            >
              Send Email
            </DropdownMenuItem>

            <DropdownMenuItem className="h-10 rounded-sm">
              Mark Checked In
            </DropdownMenuItem>

            <DropdownMenuItem className="h-10 rounded-sm text-rose-300 focus:bg-rose-500/10 focus:text-rose-300">
              Remove Attendee
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
            Attendee Management
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white">
            Attendees
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            View attendee profiles, check-in status, contact details, and linked
            ticket information.
          </p>
        </div>
      </section>

      <SectionCards items={attendeeStats} />

      <DataTableCard
        title="Attendee Directory"
        description="Monitor attendee access, communication, and check-in progress."
        data={attendees}
        columns={columns}
        pageSize={5}
        showPagination
        bordered
        actionLabel="Export Attendees"
      />

      <AttendeeProfileDialog
        attendee={selectedProfile}
        open={Boolean(selectedProfile)}
        onOpenChange={(open) => {
          if (!open) setSelectedProfile(null);
        }}
      />

      <SendEmailDialog
        attendee={emailTarget}
        open={Boolean(emailTarget)}
        onOpenChange={(open) => {
          if (!open) setEmailTarget(null);
        }}
      />
    </div>
  );
}

function AttendeeProfileDialog({
  attendee,
  open,
  onOpenChange,
}: {
  attendee: Attendee | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!attendee) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="lg:min-w-2xl w-[calc(100vw-2rem)] max-w-2xl border-white/10 bg-[#0d141d] p-0 text-white overflow-y-auto">
        <div className="relative overflow-hidden border-b border-white/10 bg-white/[0.04] p-6">
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-violet-500/20 blur-3xl" />

          <DialogHeader className="relative">
            <DialogTitle className="mt-4 text-2xl">
              Attendee Profile
            </DialogTitle>
            <p className="text-sm text-slate-400">
              Contact details, ticket access, and registration information.
            </p>
          </DialogHeader>
        </div>

        <div className="p-6">
          <div className="flex items-start gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-violet-500/10 text-sm font-bold text-violet-300">
              {attendee.initials}
            </div>

            <div className="min-w-0">
              <h3 className="text-2xl font-bold">{attendee.name}</h3>
              <p className="mt-1 font-mono text-xs text-violet-300">
                {attendee.id}
              </p>
              <p className="mt-2 text-sm text-slate-400">{attendee.event}</p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <ProfileItem label="Email" value={attendee.email} />
            <ProfileItem label="Phone" value={attendee.phone} />
            <ProfileItem label="Ticket Type" value={attendee.ticketType} />
            <ProfileItem label="Registered" value={attendee.registeredAt} />
          </div>

          <div className="mt-5 rounded-lg border border-white/10 bg-[#111827] p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Check-in Status
            </p>
            <Badge
              variant="outline"
              className={
                attendee.status === "Checked In"
                  ? "mt-3 border-emerald-400/20 bg-emerald-500/10 text-emerald-300"
                  : attendee.status === "Pending"
                    ? "mt-3 border-amber-400/20 bg-amber-500/10 text-amber-300"
                    : "mt-3 border-slate-400/20 bg-slate-500/10 text-slate-300"
              }
            >
              {attendee.status}
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SendEmailDialog({
  attendee,
  open,
  onOpenChange,
}: {
  attendee: Attendee | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  if (!attendee) return null;

  function handleSend() {
    console.log({
      to: attendee?.email,
      subject,
      message,
    });

    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="lg:min-w-xl w-[calc(100vw-2rem)] max-w-xl border-white/10 p-0 bg-[#0d141d] text-white overflow-y-auto">
        <div className="relative overflow-hidden border-b border-white/10 bg-white/[0.04] p-6">
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-violet-500/20 blur-3xl" />
          <DialogHeader>
            <DialogTitle>Send Email</DialogTitle>
            <p className="text-sm text-slate-500">
              Send a demo message to {attendee.name}.
            </p>
          </DialogHeader>
        </div>

        <div className="mt-4 space-y-4 px-8 pb-6">
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Recipient
            </p>
            <p className="mt-2 font-medium text-white">{attendee.email}</p>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Subject
            </label>
            <Input
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              placeholder="Event update or ticket notice"
              className="mt-2 h-11 border-white/10 bg-[#111827] text-white rounded-sm"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Message
            </label>
            <Textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Write your message..."
              className="mt-2 min-h-32 border-white/10 bg-[#111827] text-white"
            />
          </div>

        </div>
          <div className="flex flex-col gap-3 border-t border-white/10 bg-white/[0.03] p-6 sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white rounded-sm"
            >
              Cancel
            </Button>

            <Button
              onClick={handleSend}
              className="bg-violet-500 text-white hover:bg-violet-400 rounded-sm"
            >
              <SendIcon className="mr-2 h-4 w-4" />
              Send Email
            </Button>
          </div>
      </DialogContent>
    </Dialog>
  );
}

function ProfileItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-lg border border-white/10 bg-[#0d141d]/80 p-4">
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
        {label}
      </p>
      <p className="mt-2 break-words text-sm font-semibold text-white">
        {value}
      </p>
    </div>
  );
}

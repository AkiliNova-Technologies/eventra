import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CalendarPlus,
  CheckCircle2,
  LineChart,
  QrCode,
  ShieldCheck,
  TicketCheck,
  Users,
} from "lucide-react";

import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const benefits = [
  {
    icon: CalendarPlus,
    title: "Publish events faster",
    description:
      "Create event pages with ticket options, venue details, schedules, and attendee information.",
  },
  {
    icon: TicketCheck,
    title: "Sell tickets online",
    description:
      "Let attendees book tickets through a clean checkout flow with instant confirmation.",
  },
  {
    icon: Users,
    title: "Manage attendees",
    description:
      "Track registrations, ticket types, check-ins, and audience data in one place.",
  },
  {
    icon: BarChart3,
    title: "Track revenue",
    description:
      "Monitor ticket sales, booking fees, attendance rate, and event performance.",
  },
];

const dashboardStats = [
  { label: "Tickets Sold", value: "1,284" },
  { label: "Revenue", value: "UGX 84.5M" },
  { label: "Check-ins", value: "76%" },
];

const features = [
  "Event publishing tools",
  "Ticket tier management",
  "Secure checkout experience",
  "QR ticket confirmation",
  "Attendee tracking",
  "Revenue dashboard",
];

export default function OrganizersPage() {
  return (
    <main className="min-h-screen bg-[#0d141d] text-white">
      <Navbar />

      <section className="relative overflow-hidden px-6 pb-20 pt-32 lg:px-8">
        <div className="absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.24),transparent_60%)]" />

        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <div>
            <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-violet-300">
              For Organizers
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-6xl">
              Host smarter events with Eventra.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
              Eventra gives organizers the tools to publish events, sell
              tickets, manage attendees, and understand performance from one
              clean platform.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild className="h-11 px-8 bg-violet-500 hover:bg-violet-400! rounded-sm">
                <Link href="/organizer/dashboard">
                  View Dashboard Demo
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="h-11 px-8 border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white rounded-sm"
              >
                <Link href="/events">Explore Events</Link>
              </Button>
            </div>
          </div>

          <Card className="border-white/10 bg-white/[0.04] text-white shadow-2xl backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-violet-300">
                    Organizer Dashboard
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">
                    Africa Tech Summit
                  </h2>
                </div>

                <div className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                  Live
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {dashboardStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-white/10 bg-[#0d141d] p-4"
                  >
                    <p className="text-xs text-slate-500">{stat.label}</p>
                    <p className="mt-2 text-xl font-bold">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-white/10 bg-[#0d141d] p-5">
                <div className="mb-4 flex items-center justify-between">
                  <p className="font-semibold">Ticket Sales</p>
                  <LineChart className="h-5 w-5 text-violet-300" />
                </div>

                <div className="flex h-40 items-end gap-3">
                  {[45, 68, 52, 80, 72, 95, 88,45, 68, 52, 80, 72].map((height, index) => (
                    <div
                      key={index}
                      className="flex-1 rounded-lg bg-violet-400/70"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {["VIP Pass", "Regular Pass", "Team Pass"].map((ticket, i) => (
                  <div
                    key={ticket}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <div>
                      <p className="font-medium">{ticket}</p>
                      <p className="text-xs text-slate-500">
                        {["420 sold", "736 sold", "128 sold"][i]}
                      </p>
                    </div>
                    <p className="font-semibold text-violet-300">
                      {["UGX 63M", "UGX 36.8M", "UGX 51.2M"][i]}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mx-auto mt-24 max-w-7xl">
          <div className="mb-12 max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Everything organizers need to run better events.
            </h2>
            <p className="mt-4 text-slate-400">
              From ticket setup to revenue tracking, Eventra helps event teams
              reduce manual work and focus on delivering better experiences.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <Card
                  key={benefit.title}
                  className="border-white/10 bg-white/[0.04] text-white backdrop-blur-xl"
                >
                  <CardContent className="p-6">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="text-lg font-semibold">{benefit.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-24 grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Turn event operations into a measurable system.
            </h2>

            <p className="mt-5 leading-7 text-slate-400">
              Many organizers still rely on manual lists, scattered payments,
              and WhatsApp confirmations. Eventra brings the flow into one
              professional system that can scale from small workshops to major
              conferences.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                  <span className="text-sm text-slate-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <Card className="border-white/10 bg-white/[0.04] text-white backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="rounded-xl border border-white/10 bg-[#0d141d] p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
                    <ShieldCheck className="h-6 w-6 text-emerald-300" />
                  </div>

                  <div>
                    <p className="font-semibold">Verified organizer flow</p>
                    <p className="text-sm text-slate-500">
                      Built for professional event teams.
                    </p>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <MiniStep
                    icon={<CalendarPlus className="h-4 w-4" />}
                    title="Create event"
                    description="Add venue, schedule, event image, and ticket tiers."
                  />
                  <MiniStep
                    icon={<TicketCheck className="h-4 w-4" />}
                    title="Sell tickets"
                    description="Accept bookings and issue digital confirmations."
                  />
                  <MiniStep
                    icon={<QrCode className="h-4 w-4" />}
                    title="Check in attendees"
                    description="Use QR tickets to verify guests at the venue."
                  />
                  <MiniStep
                    icon={<BarChart3 className="h-4 w-4" />}
                    title="Review performance"
                    description="Understand sales, attendance, and event revenue."
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mx-auto mt-24 max-w-7xl rounded-[2rem] border border-white/10 bg-gradient-to-r from-violet-500/10 to-emerald-500/10 p-10 text-center">
          <h2 className="text-3xl font-bold">Ready to organize smarter?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Explore the organizer dashboard demo and see how Eventra can manage
            tickets, revenue, attendees, and event performance.
          </p>

          <Button asChild className="mt-8 h-11 px-8 bg-violet-500 hover:bg-violet-400! rounded-sm">
            <Link href="/organizer/dashboard">
              Open Dashboard Demo
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function MiniStep({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-300">
        {icon}
      </div>

      <div>
        <p className="font-medium">{title}</p>
        <p className="mt-1 text-sm leading-6 text-slate-400">{description}</p>
      </div>
    </div>
  );
}
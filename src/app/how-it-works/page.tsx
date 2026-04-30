import Link from "next/link";
import {
  CalendarCheck,
  CheckCircle2,
  CreditCard,
  QrCode,
  Search,
  Ticket,
} from "lucide-react";

import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    icon: Search,
    title: "Discover events",
    description:
      "Browse curated events by category, location, date, or interest.",
  },
  {
    icon: Ticket,
    title: "Choose your ticket",
    description:
      "Compare ticket options and select the pass that fits your experience.",
  },
  {
    icon: CreditCard,
    title: "Pay securely",
    description:
      "Complete payment using mobile money, card, or bank transfer.",
  },
  {
    icon: QrCode,
    title: "Receive QR ticket",
    description:
      "Get a digital ticket instantly after payment confirmation.",
  },
  {
    icon: CalendarCheck,
    title: "Attend with ease",
    description:
      "Check in faster at the venue using your verified digital ticket.",
  },
];

const benefits = [
  "Simple event discovery",
  "Secure checkout flow",
  "Digital ticket confirmation",
  "Fast venue check-in",
];

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-[#0d141d] text-white">
      <Navbar />

      <section className="relative overflow-hidden px-6 pb-20 pt-32 lg:px-8">
        <div className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.22),transparent_60%)]" />

        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-violet-300">
              How It Works
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-6xl">
              From discovery to check-in, Eventra keeps it simple.
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-400">
              Eventra gives attendees a clean way to find events, book tickets,
              pay securely, and receive instant digital access.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button asChild className="h-11 px-8 bg-violet-500 hover:bg-violet-400!">
                <Link href="/events">Explore Events</Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="h-11 px-8 border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/organizers">For Organizers</Link>
              </Button>
            </div>
          </div>

          <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <Card
                  key={step.title}
                  className="relative border-white/10 bg-white/[0.04] text-white backdrop-blur-xl"
                >
                  <CardContent className="p-6">
                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                        <Icon className="h-5 w-5" />
                      </div>

                      <span className="text-sm font-bold text-slate-600">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-20 grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Designed for smooth event access.
              </h2>
              <p className="mt-5 text-slate-400 leading-7">
                The experience is built around clarity. Attendees know what they
                are booking, how much they are paying, and how they will access
                the event.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                    <span className="text-sm text-slate-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <Card className="border-white/10 bg-white/[0.04] text-white backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="rounded-2xl border border-white/10 bg-[#0d141d] p-5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-violet-300">
                        Digital Ticket
                      </p>
                      <h3 className="mt-1 text-xl font-semibold">
                        Africa Tech Innovation Summit
                      </h3>
                    </div>

                    <QrCode className="h-10 w-10 text-slate-500" />
                  </div>

                  <div className="mt-5 space-y-3 text-sm text-slate-400">
                    <div className="flex justify-between">
                      <span>Ticket ID</span>
                      <span className="font-mono text-white">EVT-9823-XQZ</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pass</span>
                      <span className="text-white">VIP Pass</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status</span>
                      <span className="text-emerald-300">Confirmed</span>
                    </div>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-6 text-slate-500">
                  This mock ticket preview helps visitors understand the full
                  product journey without needing backend integration.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
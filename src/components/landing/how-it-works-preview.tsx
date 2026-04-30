import Link from "next/link";
import { ArrowRight, CreditCard, QrCode, Search, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: Search,
    title: "Discover",
    description: "Browse curated events by category, location, and interest.",
  },
  {
    icon: Ticket,
    title: "Book",
    description: "Select your ticket tier and confirm your attendee details.",
  },
  {
    icon: CreditCard,
    title: "Pay",
    description: "Use mobile money, card, or bank transfer securely.",
  },
  {
    icon: QrCode,
    title: "Attend",
    description: "Receive a QR ticket and check in smoothly at the venue.",
  },
];

export function HowItWorksPreview() {
  return (
    <section className="px-6 pt-20 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl md:p-10">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-violet-300">
              Simple Flow
            </p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              From discovery to check-in
            </h2>
            <p className="mt-3 max-w-2xl text-slate-400">
              Eventra keeps the attendee journey clean, fast, and easy to
              understand.
            </p>
          </div>

          <Button
            asChild
            variant="ghost"
            className="w-fit text-violet-300 hover:bg-violet-500/10 hover:text-violet-200"
          >
            <Link href="/how-it-works">
              See Full Flow
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="rounded-2xl border border-white/10 bg-[#0d141d] p-5"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-600">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
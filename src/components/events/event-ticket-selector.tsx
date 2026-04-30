"use client";

import Link from "next/link";
import { CheckCircle2, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ticketTypes } from "@/lib/mock-data";
import { useState } from "react";

function moneyToNumber(value: string) {
  return Number(value.replace(/[^\d]/g, ""));
}

function formatUGX(value: number) {
  return `UGX ${value.toLocaleString()}`;
}

export function EventTicketSelector({ eventId }: { eventId: string }) {
  const [selectedTicket, setSelectedTicket] = useState(ticketTypes[1]);
  const [quantity, setQuantity] = useState(1);

  const ticketPrice = moneyToNumber(selectedTicket.price);
  const total = ticketPrice * quantity;

  const checkoutHref = `/checkout?event=${eventId}&ticket=${encodeURIComponent(
    selectedTicket.name
  )}&quantity=${quantity}&total=${total}`;

  return (
    <section id="pricing">
      <div className="mb-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-violet-300">
          Ticket Options
        </p>
        <h2 className="text-3xl font-bold">Choose your pass</h2>
        <p className="mt-3 max-w-2xl text-slate-400">
          Select the ticket type that matches the experience you want. Your
          selection will be carried into checkout.
        </p>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1fr_340px]">
        <div className="grid gap-5 md:grid-cols-2">
          {ticketTypes.map((ticket) => {
            const selected = selectedTicket.name === ticket.name;

            return (
              <button
                key={ticket.name}
                onClick={() => setSelectedTicket(ticket)}
                className={`relative rounded-2xl border p-5 text-left transition hover:-translate-y-1 ${
                  selected
                    ? "border-violet-400/70 bg-violet-500/10 shadow-[0_0_30px_rgba(139,92,246,0.15)]"
                    : "border-white/10 bg-white/[0.03] hover:border-violet-400/40"
                }`}
              >
                {ticket.popular && (
                  <span className="absolute right-4 top-4 rounded-full bg-violet-400 px-3 py-1 text-[10px] font-bold uppercase text-violet-950">
                    Popular
                  </span>
                )}

                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  {ticket.label}
                </p>

                <h3 className="mt-3 text-xl font-semibold text-white">
                  {ticket.name}
                </h3>

                <p className="mt-4 text-2xl font-bold text-violet-300">
                  {ticket.price}
                </p>

                <ul className="mt-5 space-y-3">
                  {ticket.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-slate-400"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div
                  className={`mt-6 rounded-xl border px-4 py-3 text-center text-sm font-semibold ${
                    selected
                      ? "border-violet-400/50 bg-violet-500/20 text-violet-200"
                      : "border-white/10 text-slate-400"
                  }`}
                >
                  {selected ? "Selected" : "Select Ticket"}
                </div>
              </button>
            );
          })}
        </div>

        <Card className="h-fit border-white/10 bg-white/[0.04] text-white backdrop-blur-xl">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold">Order Summary</h3>

            <div className="mt-6 rounded-xl border border-white/10 bg-[#0d141d] p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Selected Ticket
              </p>
              <p className="mt-2 font-semibold">{selectedTicket.name}</p>
              <p className="mt-1 text-sm text-slate-400">
                {selectedTicket.price} per ticket
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between rounded-xl border border-white/10 bg-[#0d141d] p-4">
              <span className="text-sm text-slate-400">Quantity</span>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 hover:bg-white/10"
                >
                  <Minus className="h-4 w-4" />
                </button>

                <span className="w-8 text-center font-semibold">
                  {quantity}
                </span>

                <button
                  onClick={() => setQuantity((value) => value + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/20 text-violet-200 hover:bg-violet-500/30"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-2xl font-bold text-violet-300">
                {formatUGX(total)}
              </span>
            </div>

            <Button
              asChild
              className="mt-6 h-12 w-full bg-violet-500 hover:bg-violet-400"
            >
              <Link href={checkoutHref}>Book Ticket</Link>
            </Button>

            <p className="mt-4 text-center text-xs text-slate-500">
              Secure checkout powered by Eventra Pay
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
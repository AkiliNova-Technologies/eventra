"use client";

import * as React from "react";
import Link from "next/link";
import { CheckCircle2, Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ticketTypes } from "@/lib/mock-data";

function moneyToNumber(value: string) {
  return Number(value.replace(/[^\d]/g, ""));
}

function formatUGX(value: number) {
  return `UGX ${value.toLocaleString()}`;
}

export function EventRegistrationSection({ eventId }: { eventId: string }) {
  const defaultTicket =
    ticketTypes.find((ticket) => ticket.popular) ?? ticketTypes[0];

  const [selectedTicket, setSelectedTicket] = React.useState(defaultTicket);
  const [quantity, setQuantity] = React.useState(1);

  const total = moneyToNumber(selectedTicket.price) * quantity;

  return (
    <>
      <section id="pricing">
        <h2 className="text-3xl font-bold">Registration</h2>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {ticketTypes.map((ticket) => {
            const selected = selectedTicket.name === ticket.name;

            return (
              <Card
                key={ticket.name}
                onClick={() => setSelectedTicket(ticket)}
                className={`relative cursor-pointer border-white/10 bg-white/[0.03] text-white transition hover:-translate-y-1 hover:border-violet-400/40 ${
                  selected ? "border-violet-400/60 bg-violet-500/10" : ""
                }`}
              >
                {ticket.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-violet-400 px-4 py-1 text-xs font-bold uppercase text-violet-950">
                    Most Popular
                  </span>
                )}

                <CardContent className="flex h-full flex-col p-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    {ticket.label}
                  </p>

                  <h3 className="mt-2 text-xl font-semibold">{ticket.name}</h3>

                  <p className="mt-5 text-2xl font-bold">{ticket.price}</p>

                  <ul className="mt-6 flex-1 space-y-3">
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

                  <Button
                    type="button"
                    className={
                      selected
                        ? "mt-8 bg-violet-500 hover:bg-violet-400"
                        : "mt-8 border border-violet-400/30 bg-transparent text-violet-300 hover:bg-violet-500/10"
                    }
                  >
                    {selected ? "Selected" : "Select"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <OrderSummary
        eventId={eventId}
        ticketName={selectedTicket.name}
        ticketPrice={selectedTicket.price}
        quantity={quantity}
        setQuantity={setQuantity}
        total={total}
      />
    </>
  );
}

function OrderSummary({
  eventId,
  ticketName,
  ticketPrice,
  quantity,
  setQuantity,
  total,
}: {
  eventId: string;
  ticketName: string;
  ticketPrice: string;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  total: number;
}) {
  const checkoutHref = `/checkout?event=${eventId}&ticket=${encodeURIComponent(
    ticketName
  )}&quantity=${quantity}&total=${total}`;

  return (
    <Card className="border-white/10 bg-white/[0.04] text-white backdrop-blur-xl">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold">Order Summary</h3>

        <div className="mt-6 space-y-4 text-sm">
          <div className="flex justify-between gap-4 text-slate-400">
            <span>Ticket Type</span>
            <span className="text-right font-medium text-white">
              {ticketName}
            </span>
          </div>

          <div className="flex justify-between gap-4 text-slate-400">
            <span>Price</span>
            <span className="font-medium text-white">{ticketPrice}</span>
          </div>

          <div className="flex items-center justify-between text-slate-400">
            <span>Quantity</span>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                className="flex h-7 w-7 items-center justify-center rounded-md bg-white/5 hover:bg-white/10"
              >
                <Minus className="h-3 w-3" />
              </button>

              <span className="w-5 text-center text-white">{quantity}</span>

              <button
                type="button"
                onClick={() => setQuantity((value) => value + 1)}
                className="flex h-7 w-7 items-center justify-center rounded-md bg-white/5 hover:bg-white/10"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
          </div>

          <div className="flex justify-between border-t border-white/10 pt-4 text-lg font-bold">
            <span>Total</span>
            <span className="text-violet-300">{formatUGX(total)}</span>
          </div>
        </div>

        <Button
          asChild
          variant="default"
          className="mt-6 w-full bg-violet-500 py-6 text-base hover:bg-violet-400!"
        >
          <Link href={checkoutHref}>Book Ticket</Link>
        </Button>

        <p className="mt-4 text-center text-xs text-slate-500">
          Secure checkout powered by Eventra Pay
        </p>
      </CardContent>
    </Card>
  );
}
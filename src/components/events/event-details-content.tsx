"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { EventItem } from "@/lib/mock-data";
import { EventLocationMap } from "./event-location-map";

function moneyToNumber(value: string) {
  if (value.toLowerCase() === "free") return 0;
  return Number(value.replace(/[^\d]/g, ""));
}

function formatUGX(value: number) {
  return value === 0 ? "Free" : `UGX ${value.toLocaleString()}`;
}

export function EventDetailsContent({ event }: { event: EventItem }) {
  const defaultTicket =
    event.tickets.find((ticket) => ticket.popular) ?? event.tickets[0];

  const [selectedTicket, setSelectedTicket] = React.useState(defaultTicket);
  const [quantity, setQuantity] = React.useState(1);

  const total = moneyToNumber(selectedTicket.price) * quantity;

  const checkoutHref = `/checkout?event=${event.id}&ticket=${encodeURIComponent(
    selectedTicket.name,
  )}&quantity=${quantity}`;

  const peopleLabel =
    event.category === "Music" ? "Performers" : "Keynote Speakers";

  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-3 lg:px-8">
      <div className="space-y-16 lg:col-span-2">
        <section>
          <h2 className="text-3xl font-bold">About the Event</h2>

          <p className="mt-5 text-lg leading-8 text-slate-400">
            {event.description}
          </p>

          <p className="mt-4 leading-7 text-slate-500">
            {event.longDescription}
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold">Event Agenda</h2>

          <div className="mt-8 space-y-6">
            {event.agenda.map((item) => (
              <div
                key={`${item.day}-${item.time}-${item.title}`}
                className="relative border-l border-violet-500/30 pl-8"
              >
                <div
                  className={`absolute -left-2 top-2 h-4 w-4 rounded-full ${
                    item.active
                      ? "bg-violet-400 shadow-[0_0_16px_rgba(167,139,250,0.8)]"
                      : "border border-violet-400 bg-[#0d141d]"
                  }`}
                />

                <p className="text-xs font-bold uppercase tracking-widest text-violet-300">
                  {item.day}
                </p>

                <Card className="mt-4 border-white/10 bg-white/[0.03] text-white">
                  <CardContent className="flex flex-col justify-between gap-4 p-5 sm:flex-row">
                    <div>
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      <p className="mt-1 text-sm text-slate-400">
                        {item.description}
                      </p>
                    </div>

                    <span className="h-fit w-fit rounded-md bg-white/5 px-3 py-1 text-xs font-semibold text-violet-300">
                      {item.time}
                    </span>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold">{peopleLabel}</h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {event.speakers.map((speaker) => (
              <Card
                key={`${speaker.name}-${speaker.role}`}
                className="border-white/10 bg-white/[0.03] text-white"
              >
                <CardContent className="flex items-center gap-5 p-5">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-violet-400/30">
                    <Image
                      src={speaker.image}
                      alt={speaker.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">{speaker.name}</h3>
                    <p className="mt-1 text-sm text-violet-300">
                      {speaker.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="pricing">
          <h2 className="text-3xl font-bold">Registration</h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {event.tickets.map((ticket) => {
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
                    <span className="absolute top-2 left-1/2 -translate-x-1/2 rounded-full bg-violet-400 px-6 py-1 text-xs font-bold uppercase text-violet-950">
                      Popular
                    </span>
                  )}

                  <CardContent className="mt-2 flex h-full flex-col p-6">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                      {ticket.label}
                    </p>

                    <h3 className="mt-2 text-xl font-semibold">
                      {ticket.name}
                    </h3>

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
      </div>

      <aside className="lg:col-span-1">
        <div className="sticky top-28 space-y-6">
          <Card className="border-white/10 bg-white/[0.04] text-white backdrop-blur-xl">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold">Order Summary</h3>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between gap-4 text-slate-400">
                  <span>Ticket Type</span>
                  <span className="text-right font-medium text-white">
                    {selectedTicket.name}
                  </span>
                </div>

                <div className="flex justify-between text-slate-400">
                  <span>Price</span>
                  <span className="font-medium text-white">
                    {selectedTicket.price}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-400">
                  <span>Quantity</span>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity((value) => Math.max(1, value - 1))
                      }
                      className="flex h-7 w-7 items-center justify-center rounded-md bg-white/5 hover:bg-white/10"
                    >
                      <Minus className="h-3 w-3" />
                    </button>

                    <span className="w-5 text-center text-white">
                      {quantity}
                    </span>

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
                className="mt-6 w-full bg-violet-500 py-6 text-base hover:bg-violet-400 text-white rounded-sm hover:text-white"
              >
                <Link href={checkoutHref}>Book Ticket</Link>
              </Button>

              <p className="mt-4 text-center text-xs text-slate-500">
                Secure checkout powered by Eventra Pay
              </p>
            </CardContent>
          </Card>

          <EventLocationMap
            venue={event.venue}
            location={event.location}
            center={[event.coordinates.longitude, event.coordinates.latitude]}
          />
        </div>
      </aside>
    </section>
  );
}

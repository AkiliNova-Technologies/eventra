"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  Banknote,
  CheckCircle2,
  CreditCard,
  Lock,
  Minus,
  Plus,
  QrCode,
  Smartphone,
  Ticket,
  User,
  Wallet,
} from "lucide-react";

import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { events } from "@/lib/mock-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const paymentMethods = [
  {
    id: "mobile_money",
    title: "Mobile Money",
    description: "MTN / Airtel",
    icon: Smartphone,
  },
  {
    id: "card",
    title: "Card",
    description: "Visa / Mastercard",
    icon: CreditCard,
  },
  {
    id: "bank_transfer",
    title: "Bank Transfer",
    description: "Direct bank payment",
    icon: Banknote,
  },
] as const;

type PaymentMethod = (typeof paymentMethods)[number]["id"];

function formatUGX(value: number) {
  return `UGX ${value.toLocaleString()}`;
}

export default function CheckoutPage() {
  const searchParams = useSearchParams();

  const eventId = searchParams.get("event");
  const ticketName = searchParams.get("ticket") ?? "VIP Pass";
  const initialQuantity = Number(searchParams.get("quantity") ?? 1);
  const initialTotal = Number(searchParams.get("total") ?? 150000);

  const event = events.find((item) => item.id === eventId) ?? events[0];

  const safeInitialQuantity =
    Number.isNaN(initialQuantity) || initialQuantity < 1 ? 1 : initialQuantity;

  const ticketUnitPrice = Math.round(initialTotal / safeInitialQuantity);

  const [quantity, setQuantity] = React.useState(safeInitialQuantity);
  const [paymentMethod, setPaymentMethod] =
    React.useState<PaymentMethod>("mobile_money");
  const [submitted, setSubmitted] = React.useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = React.useState(false);

  const [attendee, setAttendee] = React.useState({
    fullName: "",
    email: "",
    phone: "",
    jobTitle: "",
  });

  const [payment, setPayment] = React.useState({
    mobileProvider: "",
    mobileNumber: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    bankName: "",
    referenceName: "",
  });

  const subtotal = ticketUnitPrice * quantity;
  const bookingFee = 7500 * quantity;
  const vat = Math.round(subtotal * 0.15);
  const finalTotal = subtotal + bookingFee + vat;

  const attendeeValid =
    attendee.fullName.trim().length >= 3 &&
    /^\S+@\S+\.\S+$/.test(attendee.email) &&
    attendee.phone.trim().length >= 9;

  const paymentValid =
    paymentMethod === "mobile_money"
      ? payment.mobileNumber.trim().length >= 9
      : paymentMethod === "card"
        ? payment.cardName.trim().length >= 3 &&
          payment.cardNumber.replace(/\s/g, "").length >= 12 &&
          payment.expiry.trim().length >= 4 &&
          payment.cvc.trim().length >= 3
        : payment.bankName.trim().length >= 2 &&
          payment.referenceName.trim().length >= 3;

  const formValid = attendeeValid && paymentValid;

  function confirmPayment() {
    setAttemptedSubmit(true);

    if (!formValid) return;

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#0d141d] text-white">
        <section className="flex min-h-screen items-center justify-center px-6 py-20">
          <Card className="w-full max-w-xl border-emerald-400/20 bg-emerald-500/10 text-white">
            <CardContent className="p-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/20">
                <CheckCircle2 className="h-8 w-8 text-emerald-300" />
              </div>

              <h1 className="mt-6 text-3xl font-bold">
                Payment successful
              </h1>

              <p className="mt-3 text-slate-300">
                Your ticket has been generated for {event.title}.
              </p>

              <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.04] p-4 text-left">
                <SummaryRow label="Ticket ID" value="EVT-9823-XQZ" />
                <SummaryRow label="Attendee" value={attendee.fullName} />
                <SummaryRow
                  label="Ticket"
                  value={`${ticketName} x${quantity}`}
                />
                <SummaryRow label="Total Paid" value={formatUGX(finalTotal)} />
              </div>

              <Button
                asChild
                className="mt-8 bg-violet-500 hover:bg-violet-400"
              >
                <Link href="/events">Explore More Events</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0d141d] text-white">
      <header className="fixed top-0 z-50 flex h-20 w-full items-center justify-between border-b border-white/10 bg-slate-950/80 px-6 backdrop-blur-md lg:px-8">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          Eventra
        </Link>

        <p className="hidden text-sm text-slate-400 md:block">
          Secure Checkout
        </p>
      </header>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 pb-20 pt-32 lg:grid-cols-12 lg:px-8">
        <div className="space-y-6 lg:col-span-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-violet-300">
              Checkout
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight">
              Complete your booking
            </h1>
            <p className="mt-3 max-w-2xl text-slate-400">
              Review your ticket, enter attendee details, choose a payment
              method, and confirm your booking.
            </p>
          </div>

          <Card className="border-white/10 bg-white/[0.04] text-white backdrop-blur-xl">
            <CardContent className="p-6">
              <SectionHeader
                icon={<Ticket className="h-5 w-5" />}
                title="Ticket Selection"
                description="Adjust the number of tickets you want to book."
              />

              <div className="mt-6 flex flex-col gap-5 rounded-xl border border-white/10 bg-white/[0.03] p-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{ticketName}</h3>
                  <p className="mt-1 text-sm text-slate-400">
                    {formatUGX(ticketUnitPrice)} per ticket
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() =>
                      setQuantity((value) => Math.max(1, value - 1))
                    }
                    className="border-white/10 bg-transparent text-white hover:bg-white/10"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>

                  <span className="w-8 text-center text-xl font-semibold">
                    {quantity}
                  </span>

                  <Button
                    size="icon"
                    onClick={() => setQuantity((value) => value + 1)}
                    className="bg-violet-500/20 text-violet-200 hover:bg-violet-500/30"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/[0.04] text-white backdrop-blur-xl">
            <CardContent className="p-6">
              <SectionHeader
                icon={<User className="h-5 w-5" />}
                title="Attendee Information"
                description="These details will appear on the ticket confirmation."
              />

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <InputBox
                  label="Full Name"
                  value={attendee.fullName}
                  onChange={(value) =>
                    setAttendee({ ...attendee, fullName: value })
                  }
                  placeholder="Albert Watbin"
                  required
                />

                <InputBox
                  label="Email Address"
                  value={attendee.email}
                  onChange={(value) =>
                    setAttendee({ ...attendee, email: value })
                  }
                  placeholder="albert@company.com"
                  type="email"
                  required
                />

                <InputBox
                  label="Phone Number"
                  value={attendee.phone}
                  onChange={(value) =>
                    setAttendee({ ...attendee, phone: value })
                  }
                  placeholder="+256 700 000 000"
                  required
                />

                <InputBox
                  label="Job Title"
                  value={attendee.jobTitle}
                  onChange={(value) =>
                    setAttendee({ ...attendee, jobTitle: value })
                  }
                  placeholder="Software Engineer"
                />
              </div>

              {attemptedSubmit && !attendeeValid && (
                <p className="mt-4 text-sm text-amber-300">
                  Full name, valid email, and phone number are required.
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/[0.04] text-white backdrop-blur-xl">
            <CardContent className="p-6">
              <SectionHeader
                icon={<Wallet className="h-5 w-5" />}
                title="Payment Method"
                description="Choose a payment option and enter the required details."
              />

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;

                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      className={`rounded-xl border p-5 text-left transition hover:bg-white/[0.06] ${
                        paymentMethod === method.id
                          ? "border-violet-400/50 bg-violet-500/10"
                          : "border-white/10 bg-white/[0.03]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <Icon className="h-5 w-5 text-violet-300" />
                        <div
                          className={`h-4 w-4 rounded-full border ${
                            paymentMethod === method.id
                              ? "border-violet-300 bg-violet-400"
                              : "border-white/20"
                          }`}
                        />
                      </div>

                      <h3 className="mt-4 font-semibold text-white">
                        {method.title}
                      </h3>

                      <p className="mt-1 text-xs text-slate-400">
                        {method.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 rounded-xl border border-white/10 bg-[#0d141d] p-5">
                {paymentMethod === "mobile_money" && (
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        Provider <span className="text-violet-300">*</span>
                      </label>

                      <Select
                        value={payment.mobileProvider}
                        onValueChange={(value) =>
                          setPayment({ ...payment, mobileProvider: value })
                        }
                      >
                        <SelectTrigger className="mt-2 min-h-11 w-full border-white/10 bg-[#0d141d] text-white placeholder:text-slate-600">
                          <SelectValue placeholder="Select provider" />
                        </SelectTrigger>

                        <SelectContent className="border-white/10 bg-[#111827] text-white p-2">
                          <SelectItem value="MTN">MTN Mobile Money</SelectItem>
                          <SelectItem value="Airtel">Airtel Money</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <InputBox
                      label="Mobile Money Number"
                      value={payment.mobileNumber}
                      onChange={(value) =>
                        setPayment({ ...payment, mobileNumber: value })
                      }
                      placeholder="+256 700 000 000"
                      required
                    />
                  </div>
                )}

                {paymentMethod === "card" && (
                  <div className="grid gap-5 md:grid-cols-2">
                    <InputBox
                      label="Name on Card"
                      value={payment.cardName}
                      onChange={(value) =>
                        setPayment({ ...payment, cardName: value })
                      }
                      placeholder="Albert Watbin"
                      required
                    />

                    <InputBox
                      label="Card Number"
                      value={payment.cardNumber}
                      onChange={(value) =>
                        setPayment({ ...payment, cardNumber: value })
                      }
                      placeholder="4242 4242 4242 4242"
                      required
                    />

                    <InputBox
                      label="Expiry"
                      value={payment.expiry}
                      onChange={(value) =>
                        setPayment({ ...payment, expiry: value })
                      }
                      placeholder="12/28"
                      required
                    />

                    <InputBox
                      label="CVC"
                      value={payment.cvc}
                      onChange={(value) =>
                        setPayment({ ...payment, cvc: value })
                      }
                      placeholder="123"
                      required
                    />
                  </div>
                )}

                {paymentMethod === "bank_transfer" && (
                  <div className="grid gap-5 md:grid-cols-2">
                    <InputBox
                      label="Bank Name"
                      value={payment.bankName}
                      onChange={(value) =>
                        setPayment({ ...payment, bankName: value })
                      }
                      placeholder="Stanbic Bank"
                      required
                    />

                    <InputBox
                      label="Account / Reference Name"
                      value={payment.referenceName}
                      onChange={(value) =>
                        setPayment({ ...payment, referenceName: value })
                      }
                      placeholder="Albert Watbin"
                      required
                    />
                  </div>
                )}
              </div>

              {attemptedSubmit && !paymentValid && (
                <p className="mt-4 text-sm text-amber-300">
                  Complete the required payment details to confirm your booking.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-6 lg:col-span-4">
          <Card className="sticky py-0 top-28 border-white/10 bg-white/[0.04] text-white backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="relative mb-6 h-44 overflow-hidden rounded-xl">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                <div className="absolute bottom-4 left-4">
                  <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-300">
                    Selected Event
                  </span>

                  <h3 className="mt-2 text-lg font-semibold">{event.title}</h3>
                </div>
              </div>

              <h3 className="border-b border-white/10 pb-3 text-xs font-bold uppercase tracking-widest text-slate-400">
                Order Summary
              </h3>

              <div className="mt-4 space-y-3 text-sm">
                <SummaryRow
                  label={`${ticketName} (x${quantity})`}
                  value={formatUGX(subtotal)}
                />
                <SummaryRow label="Booking Fee" value={formatUGX(bookingFee)} />
                <SummaryRow label="VAT (15%)" value={formatUGX(vat)} />

                <div className="flex items-center justify-between border-t border-white/10 pt-5">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-2xl font-bold text-violet-300">
                    {formatUGX(finalTotal)}
                  </span>
                </div>
              </div>

              <Button
                onClick={confirmPayment}
                className="mt-8 w-full bg-violet-500 py-6 text-base font-bold hover:bg-violet-400"
              >
                Confirm & Pay Securely
              </Button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
                <Lock className="h-3 w-3" />
                SSL encrypted secure payment
              </div>
            </CardContent>
          </Card>

          <Card className="border-emerald-400/20 bg-emerald-500/10 text-white">
            <CardContent className="p-5">
              <div className="flex gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400/20">
                  <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                </div>

                <div>
                  <p className="font-semibold text-emerald-300">
                    Ticket Preview
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Your ticket will be issued immediately after successful
                    payment.
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-white/5">
                  <QrCode className="h-5 w-5 text-slate-400" />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    Ticket ID
                  </p>
                  <p className="font-mono text-sm text-white">EVT-9823-XQZ</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>
      </section>

      <Footer />
    </main>
  );
}

function SectionHeader({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
          {icon}
        </div>

        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>

      <p className="mt-2 text-sm text-slate-400">{description}</p>
    </div>
  );
}

function InputBox({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
        {label} {required && <span className="text-violet-300">*</span>}
      </label>

      <Input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 h-11 border-white/10 bg-[#0d141d] text-white placeholder:text-slate-600"
      />
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 text-slate-400">
      <span>{label}</span>
      <span className="text-right font-medium text-white">{value}</span>
    </div>
  );
}

"use client";

import {
  ArrowLeftIcon,
  CheckCircle2Icon,
  CreditCardIcon,
  CrownIcon,
  SaveIcon,
  WalletIcon,
  ZapIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BillingSettingsPage() {
  const router = useRouter();

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: "UGX 49,000/mo",
      description: "For small organizers testing Eventra.",
      icon: ZapIcon,
      features: ["Up to 3 events", "Basic ticketing", "Mobile money payouts"],
    },
    {
      id: "pro",
      name: "Pro",
      price: "UGX 149,000/mo",
      description: "For active organizers running multiple events.",
      icon: CrownIcon,
      popular: true,
      features: [
        "Unlimited events",
        "Advanced analytics",
        "Priority payouts",
        "Custom ticket tiers",
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Custom",
      description: "For agencies, venues, and large event teams.",
      icon: CreditCardIcon,
      features: [
        "Team management",
        "Dedicated support",
        "Custom integrations",
        "Advanced reporting",
      ],
    },
  ];

  const [selectedPlan, setSelectedPlan] = useState("pro");

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-violet-300">
            Billing & Payouts
          </p>

          <div className="mt-3 flex items-center gap-4">
            <Button
              variant="outline"
              className="text-slate-400 hover:text-white"
              onClick={() => router.back()}
            >
              <ArrowLeftIcon className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Billing
            </h1>
          </div>
          <p className="mt-2 text-sm text-slate-400">
            Manage payout accounts, settlement schedules, and billing details.
          </p>
        </div>

        <Button className="bg-violet-500 hover:bg-violet-400 text-white rounded-sm">
          <SaveIcon className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </section>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <SettingsCard
            icon={<CrownIcon className="h-5 w-5" />}
            title="Subscription Plan"
          >
            <div className="grid gap-4 lg:grid-cols-3">
              {plans.map((plan) => {
                const Icon = plan.icon;
                const selected = selectedPlan === plan.id;

                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`relative rounded-xl border p-5 text-left transition ${
                      selected
                        ? "border-violet-400/60 bg-violet-500/10 shadow-[0_0_24px_rgba(139,92,246,0.18)]"
                        : "border-white/10 bg-[#0d141d]/70 hover:border-violet-400/30 hover:bg-white/[0.04]"
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute right-4 top-4 rounded-full bg-violet-400 px-3 py-1 text-[10px] font-bold uppercase text-violet-950">
                        Popular
                      </span>
                    )}

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="mt-5 text-lg font-bold text-white">
                      {plan.name}
                    </h3>
                    <p className="mt-1 text-2xl font-bold text-violet-300">
                      {plan.price}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      {plan.description}
                    </p>

                    <ul className="mt-5 space-y-3">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-sm text-slate-400"
                        >
                          <CheckCircle2Icon className="h-4 w-4 text-emerald-300" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div
                      className={`mt-5 rounded-sm border px-3 py-2 text-center text-sm font-semibold ${
                        selected
                          ? "border-violet-400/40 bg-violet-500 text-white"
                          : "border-white/10 bg-white/5 text-slate-300"
                      }`}
                    >
                      {selected ? "Current Plan" : "Choose Plan"}
                    </div>
                  </button>
                );
              })}
            </div>
          </SettingsCard>

          <SettingsCard
            icon={<WalletIcon className="h-5 w-5" />}
            title="Payout Method"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Payout Method">
                <Select defaultValue="mobile_money">
                  <SelectTrigger className="min-h-11 w-full rounded-sm border-white/10 bg-[#0d141d] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-white/10 bg-[#111827] text-white p-2">
                    <SelectItem value="mobile_money">Mobile Money</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Provider">
                <Select defaultValue="mtn">
                  <SelectTrigger className="min-h-11 w-full rounded-sm border-white/10 bg-[#0d141d] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-white/10 bg-[#111827] text-white p-2">
                    <SelectItem value="mtn">MTN Mobile Money</SelectItem>
                    <SelectItem value="airtel">Airtel Money</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Account Number">
                <Input
                  defaultValue="+256 700 000 000"
                  className="h-11 rounded-sm border-white/10 bg-[#0d141d] text-white"
                />
              </Field>

              <Field label="Settlement Cycle">
                <Select defaultValue="weekly">
                  <SelectTrigger className="min-h-11 w-full rounded-sm border-white/10 bg-[#0d141d] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-white/10 bg-[#111827] text-white p-2">
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>
          </SettingsCard>

          <SettingsCard
            icon={<CreditCardIcon className="h-5 w-5" />}
            title="Billing Details"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Billing Name">
                <Input
                  defaultValue="Eventra Pro"
                  className="h-11 rounded-sm border-white/10 bg-[#0d141d] text-white"
                />
              </Field>

              <Field label="Billing Email">
                <Input
                  defaultValue="billing@eventra.com"
                  className="h-11 rounded-sm border-white/10 bg-[#0d141d] text-white"
                />
              </Field>

              <Field label="Tax ID / TIN">
                <Input
                  placeholder="Optional"
                  className="h-11 rounded-sm border-white/10 bg-[#0d141d] text-white"
                />
              </Field>

              <Field label="Country">
                <Input
                  defaultValue="Uganda"
                  className="h-11 rounded-sm border-white/10 bg-[#0d141d] text-white"
                />
              </Field>
            </div>
          </SettingsCard>
        </div>

        <aside>
          <SettingsCard
            icon={<WalletIcon className="h-5 w-5" />}
            title="Payout Summary"
          >
            <div className="space-y-3">
              <MiniInfo label="Current Plan" value="Pro" />
              <MiniInfo label="Next Billing" value="May 30, 2026" />
              <MiniInfo label="Available Balance" value="UGX 39.8M" />
              <MiniInfo label="Pending Payout" value="UGX 5.4M" />
              <MiniInfo label="Next Settlement" value="Friday" />
            </div>
          </SettingsCard>
        </aside>
      </div>
    </div>
  );
}

function SettingsCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="border-white/10 bg-white/[0.04] text-white backdrop-blur-xl">
      <CardHeader className="flex flex-row items-center gap-3 border-b border-white/10">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-5">{children}</CardContent>
    </Card>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-400">
        {label}
      </span>
      {children}
    </label>
  );
}

function MiniInfo({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-[#0d141d]/70 p-4">
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

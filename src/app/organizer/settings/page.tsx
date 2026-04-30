import Link from "next/link";
import {
  CreditCardIcon,
  ShieldCheckIcon,
  UserIcon,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const settingsItems = [
  {
    title: "Account Settings",
    description: "Manage profile, organization details, role, and login access.",
    href: "/organizer/settings/account",
    icon: UserIcon,
  },
  {
    title: "Billing & Payouts",
    description: "Manage payout method, settlement cycle, and billing details.",
    href: "/organizer/settings/billing",
    icon: CreditCardIcon,
  },
  {
    title: "Security",
    description: "Password, two-factor authentication, and active sessions.",
    href: "/organizer/settings/account",
    icon: ShieldCheckIcon,
  },
];

export default function OrganizerSettingsPage() {
  return (
    <div className="space-y-6">
      <section>
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-violet-300">
          Organizer Preferences
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-white">
          Settings
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Manage your organizer account, billing, payouts, and security.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {settingsItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link key={item.title} href={item.href}>
              <Card className="h-full border-white/10 bg-white/[0.04] text-white transition hover:border-violet-400/30 hover:bg-white/[0.06]">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h2 className="mt-6 text-xl font-semibold">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
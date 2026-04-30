"use client";

import {
  ArrowLeftIcon,
  LockIcon,
  SaveIcon,
  ShieldCheckIcon,
  UserIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function AccountSettingsPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-violet-300">
            Account Settings
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
              Account
            </h1>
          </div>

          <p className="mt-2 text-sm text-slate-400">
            Manage your organizer profile and account security.
          </p>
        </div>

        <Button className="bg-violet-500 hover:bg-violet-400 text-white rounded-sm">
          <SaveIcon className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </section>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <SettingsCard icon={<UserIcon className="h-5 w-5" />} title="Profile">
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Full Name">
                <Input
                  defaultValue="Marcus Chen"
                  className="h-11 rounded-sm border-white/10 bg-[#0d141d] text-white"
                />
              </Field>

              <Field label="Email Address">
                <Input
                  defaultValue="organizer@eventra.com"
                  className="h-11 rounded-sm border-white/10 bg-[#0d141d] text-white"
                />
              </Field>

              <Field label="Phone Number">
                <Input
                  defaultValue="+256 700 000 000"
                  className="h-11 rounded-sm border-white/10 bg-[#0d141d] text-white"
                />
              </Field>

              <Field label="Role">
                <Input
                  defaultValue="Senior Producer"
                  className="h-11 rounded-sm border-white/10 bg-[#0d141d] text-white"
                />
              </Field>
            </div>
          </SettingsCard>

          <SettingsCard
            icon={<LockIcon className="h-5 w-5" />}
            title="Password"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Current Password">
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="h-11 rounded-sm border-white/10 bg-[#0d141d] text-white"
                />
              </Field>

              <Field label="New Password">
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="h-11 rounded-sm border-white/10 bg-[#0d141d] text-white"
                />
              </Field>
            </div>
          </SettingsCard>
        </div>

        <aside>
          <SettingsCard
            icon={<ShieldCheckIcon className="h-5 w-5" />}
            title="Security Status"
          >
            <div className="space-y-3">
              <MiniInfo label="Account Status" value="Verified" />
              <MiniInfo label="Two-Factor Auth" value="Not Enabled" />
              <MiniInfo label="Active Sessions" value="3 Devices" />
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

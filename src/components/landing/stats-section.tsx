import { stats } from "@/lib/mock-data";
import { CalendarCheck, MapPin, Smile, TicketCheck } from "lucide-react";

const statIcons = [TicketCheck, CalendarCheck, MapPin, Smile];

export function StatsSection() {
  return (
    <section className="relative overflow-hidden border-white/10 bg-white/[0.025] py-16">
      <div className="absolute left-1/2 top-0 -z-10 h-40 w-[520px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = statIcons[index];

            return (
              <div
                key={stat.label}
                className="group rounded-2xl border border-white/10 bg-white/[0.035] p-6 text-center backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:bg-white/[0.06]"
              >
                <div className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300 ring-1 ring-violet-400/20 transition group-hover:bg-violet-500/20">
                  <Icon className="h-5 w-5" />
                </div>

                <div className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                  {stat.value}
                </div>

                <div className="mt-2 text-sm text-slate-400">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
import type { LucideIcon } from "lucide-react";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export type CardItem = {
  label: string;
  value: string;
  helper: string;
  trend?: string;
  trendDirection?: "up" | "down";
  icon: LucideIcon;
  tone?: string;
};

export function SectionCards({ items }: { items: CardItem[] }) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <Card
            key={item.label}
            className="border-white/10 bg-white/[0.04] text-white backdrop-blur-xl rounded-lg"
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  {item.label}
                </p>

                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-md ${
                    item.tone ?? "bg-violet-500/10 text-violet-300"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              <p className="mt-4 text-3xl font-bold">{item.value}</p>

              <div className="mt-2 flex items-center justify-between gap-3">
                <p className="flex items-center gap-1 text-xs text-slate-400">
                  {item.helper}
                </p>

                {item.trend && (
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
                      item.trendDirection === "down"
                        ? "border-rose-400/20 bg-rose-500/10 text-rose-300"
                        : "border-emerald-400/20 bg-emerald-500/10 text-emerald-300"
                    }`}
                  >
                    {item.trend}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}
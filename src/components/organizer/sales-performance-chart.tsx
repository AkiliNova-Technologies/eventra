"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export type SalesChartItem = {
  date: string;
  revenue: number;
  tickets: number;
};

type MetricKey = "revenue" | "tickets";
type TimeRange = "90d" | "30d" | "7d";

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--primary)",
  },
  tickets: {
    label: "Tickets",
    color: "var(--secondary)",
  },
} satisfies ChartConfig;

const timeRangeOptions: { label: string; value: TimeRange; days: number }[] = [
  { label: "Last 3 months", value: "90d", days: 90 },
  { label: "Last 30 days", value: "30d", days: 30 },
  { label: "Last 7 days", value: "7d", days: 7 },
];

export function SalesPerformanceChart({
  data,
  title = "Sales Performance",
  description = "Revenue and ticket trends for recent activity.",
  showMetricSelect = true,
  defaultMetric = "revenue",
}: {
  data: SalesChartItem[];
  title?: string;
  description?: string;
  showMetricSelect?: boolean;
  defaultMetric?: MetricKey;
}) {
  const [activeChart, setActiveChart] =
    React.useState<MetricKey>(defaultMetric);
  const [timeRange, setTimeRange] = React.useState<TimeRange>("30d");

  const filteredData = React.useMemo(() => {
    const selectedRange =
      timeRangeOptions.find((item) => item.value === timeRange) ??
      timeRangeOptions[1];

    const latestDate = data.reduce((latest, item) => {
      const current = new Date(item.date);
      return current > latest ? current : latest;
    }, new Date(data[0]?.date ?? Date.now()));

    const startDate = new Date(latestDate);
    startDate.setDate(startDate.getDate() - selectedRange.days);

    return data.filter((item) => new Date(item.date) >= startDate);
  }, [data, timeRange]);

  const total = React.useMemo(
    () => ({
      revenue: filteredData.reduce((acc, curr) => acc + curr.revenue, 0),
      tickets: filteredData.reduce((acc, curr) => acc + curr.tickets, 0),
    }),
    [filteredData]
  );

  const formattedTotal =
    activeChart === "revenue"
      ? `UGX ${total.revenue.toLocaleString()}`
      : total.tickets.toLocaleString();

  return (
    <Card className="overflow-hidden border-white/10 bg-white/[0.04] text-white backdrop-blur-xl">
      <CardHeader className="flex flex-col gap-4 border-b border-white/10 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-row items-center justify-center gap-8">
            <div className="">

          <CardTitle>{title}</CardTitle>
          <CardDescription className="mt-1 text-slate-500">
            {description}
          </CardDescription>
            </div>

            <div className="line-height-1 gap-1">

          <p className="text-xl font-bold text-white">
            {formattedTotal}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Total {chartConfig[activeChart].label.toLowerCase()} for selected
            period
          </p>

            </div>

        </div>

        <CardAction className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {showMetricSelect && (
            <Select
              value={activeChart}
              onValueChange={(value) => setActiveChart(value as MetricKey)}
            >
              <SelectTrigger className="min-h-11 w-full border-white/10 bg-[#0d141d] text-white sm:w-[150px] md:w-[180px] rounded-md">
                <SelectValue placeholder="Metric" />
              </SelectTrigger>

              <SelectContent className="border-white/10 bg-[#111827] text-white p-2">
                <SelectItem value="revenue">Revenue</SelectItem>
                <SelectItem value="tickets">Tickets</SelectItem>
              </SelectContent>
            </Select>
          )}

          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={(value) => {
              if (value) setTimeRange(value as TimeRange);
            }}
            variant="outline"
            className="hidden rounded-sm border border-white/10 bg-[#0d141d] p-1 *:data-[slot=toggle-group-item]:h-8 *:data-[slot=toggle-group-item]:border-0 *:data-[slot=toggle-group-item]:px-3 *:data-[slot=toggle-group-item]:text-slate-400 *:data-[slot=toggle-group-item]:hover:bg-white/5 *:data-[slot=toggle-group-item]:hover:text-white *:data-[slot=toggle-group-item]:data-[state=on]:bg-violet-500 *:data-[slot=toggle-group-item]:data-[state=on]:text-white md:flex"
          >
            <ToggleGroupItem value="90d">3M</ToggleGroupItem>
            <ToggleGroupItem value="30d">30D</ToggleGroupItem>
            <ToggleGroupItem value="7d">7D</ToggleGroupItem>
          </ToggleGroup>

          <Select
            value={timeRange}
            onValueChange={(value) => setTimeRange(value as TimeRange)}
          >
            <SelectTrigger className="h-10 w-full border-white/10 bg-[#0d141d] text-white md:hidden">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>

            <SelectContent className="border-white/10 bg-[#111827] text-white">
              {timeRangeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>

      <CardContent className="px-2 py-6 sm:px-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[280px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={filteredData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.08)" />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tick={{ fill: "rgba(148,163,184,0.9)", fontSize: 12 }}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />

            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[160px] border-white/10 bg-[#111827] text-white"
                  nameKey={activeChart}
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }
                />
              }
            />

            <Bar
              dataKey={activeChart}
              fill={`var(--color-${activeChart})`}
              radius={[8, 8, 8, 8]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
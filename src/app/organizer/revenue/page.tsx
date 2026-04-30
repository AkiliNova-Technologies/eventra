"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ArrowDownRightIcon,
  ArrowUpRightIcon,
  BanknoteIcon,
  CreditCardIcon,
  DownloadIcon,
  MoreHorizontalIcon,
  SmartphoneIcon,
  TicketIcon,
  WalletIcon,
  ReceiptTextIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DataTableCard,
  type DataTableColumn,
} from "@/components/organizer/data-table-card";
import { SectionCards, type CardItem } from "@/components/section-cards";
import { SalesPerformanceChart } from "@/components/organizer/sales-performance-chart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import {
  buildEventraInvoice,
  buildEventraRevenueStatement,
  downloadHtmlFile,
} from "@/lib/documents/revenue-documents";

type RevenueTransaction = {
  id: string;
  event: string;
  customer: string;
  paymentMethod: "Mobile Money" | "Card" | "Bank Transfer";
  amount: string;
  platformFee: string;
  netAmount: string;
  status: "Paid" | "Pending" | "Refunded";
  date: string;
};

const revenueStats: CardItem[] = [
  {
    label: "Gross Revenue",
    value: "UGX 45.2M",
    helper: "Total sales volume",
    trend: "+12.5%",
    trendDirection: "up",
    icon: WalletIcon,
    tone: "bg-violet-500/10 text-violet-300",
  },
  {
    label: "Net Earnings",
    value: "UGX 39.8M",
    helper: "After platform fees",
    trend: "+10.3%",
    trendDirection: "up",
    icon: BanknoteIcon,
    tone: "bg-emerald-500/10 text-emerald-300",
  },
  {
    label: "Pending Payouts",
    value: "UGX 5.4M",
    helper: "Awaiting settlement",
    trend: "-4.1%",
    trendDirection: "down",
    icon: CreditCardIcon,
    tone: "bg-amber-500/10 text-amber-300",
  },
  {
    label: "Tickets Sold",
    value: "1,450",
    helper: "Revenue-linked tickets",
    trend: "+18.2%",
    trendDirection: "up",
    icon: TicketIcon,
    tone: "bg-violet-500/10 text-violet-300",
  },
];

const revenueChartData = [
  { date: "2026-10-01", revenue: 320000, tickets: 6 },
  { date: "2026-10-02", revenue: 410000, tickets: 8 },
  { date: "2026-10-03", revenue: 580000, tickets: 11 },
  { date: "2026-10-04", revenue: 720000, tickets: 14 },
  { date: "2026-10-05", revenue: 850000, tickets: 17 },
  { date: "2026-10-06", revenue: 980000, tickets: 20 },
  { date: "2026-10-07", revenue: 1150000, tickets: 24 },
  { date: "2026-10-08", revenue: 1320000, tickets: 28 },
  { date: "2026-10-09", revenue: 1500000, tickets: 32 },
  { date: "2026-10-10", revenue: 1780000, tickets: 38 },
  { date: "2026-10-11", revenue: 2100000, tickets: 45 },
  { date: "2026-10-12", revenue: 2600000, tickets: 56 },
  { date: "2026-10-13", revenue: 3000000, tickets: 65 },
  { date: "2026-10-14", revenue: 3400000, tickets: 72 },
  { date: "2026-10-15", revenue: 3800000, tickets: 80 },
  { date: "2026-10-16", revenue: 4200000, tickets: 88 },
  { date: "2026-10-17", revenue: 4600000, tickets: 96 },
  { date: "2026-10-18", revenue: 5200000, tickets: 108 },
  { date: "2026-10-19", revenue: 5800000, tickets: 120 },
  { date: "2026-10-20", revenue: 6300000, tickets: 132 },
  { date: "2026-10-21", revenue: 6800000, tickets: 145 },
  { date: "2026-10-22", revenue: 7200000, tickets: 155 },
  { date: "2026-10-23", revenue: 7600000, tickets: 162 },
  { date: "2026-10-24", revenue: 7400000, tickets: 158 },
  { date: "2026-10-25", revenue: 7100000, tickets: 150 },
  { date: "2026-10-26", revenue: 6800000, tickets: 143 },
  { date: "2026-10-27", revenue: 6400000, tickets: 135 },
  { date: "2026-10-28", revenue: 5900000, tickets: 125 },
  { date: "2026-10-29", revenue: 5400000, tickets: 115 },
  { date: "2026-10-30", revenue: 4900000, tickets: 105 },
  { date: "2026-10-31", revenue: 4300000, tickets: 92 },
];

const transactions: RevenueTransaction[] = [
  {
    id: "PAY-9001",
    event: "Africa Tech Innovation Summit 2026",
    customer: "Jane Doe",
    paymentMethod: "Mobile Money",
    amount: "UGX 150,000",
    platformFee: "UGX 7,500",
    netAmount: "UGX 142,500",
    status: "Paid",
    date: "2 mins ago",
  },
  {
    id: "PAY-9002",
    event: "Neon Echoes Festival",
    customer: "Samuel Miller",
    paymentMethod: "Card",
    amount: "UGX 80,000",
    platformFee: "UGX 4,000",
    netAmount: "UGX 76,000",
    status: "Paid",
    date: "12 mins ago",
  },
  {
    id: "PAY-9003",
    event: "Future of SaaS Summit",
    customer: "Avery Lee",
    paymentMethod: "Mobile Money",
    amount: "UGX 120,000",
    platformFee: "UGX 6,000",
    netAmount: "UGX 114,000",
    status: "Pending",
    date: "31 mins ago",
  },
  {
    id: "PAY-9004",
    event: "City Football Cup Finals",
    customer: "Linda Atwine",
    paymentMethod: "Bank Transfer",
    amount: "UGX 45,000",
    platformFee: "UGX 2,250",
    netAmount: "UGX 42,750",
    status: "Refunded",
    date: "1 hr ago",
  },
  {
    id: "PAY-9005",
    event: "Startup Pitch Night Kampala",
    customer: "Daniel Okello",
    paymentMethod: "Mobile Money",
    amount: "UGX 20,000",
    platformFee: "UGX 1,000",
    netAmount: "UGX 19,000",
    status: "Paid",
    date: "2 hrs ago",
  },
  {
    id: "PAY-9006",
    event: "Fitness & Wellness Expo",
    customer: "Grace Nanyonga",
    paymentMethod: "Card",
    amount: "UGX 25,000",
    platformFee: "UGX 1,250",
    netAmount: "UGX 23,750",
    status: "Paid",
    date: "3 hrs ago",
  },
];

export default function OrganizerRevenuePage() {
  const [selectedReceipt, setSelectedReceipt] =
    useState<RevenueTransaction | null>(null);

  function handleDownloadInvoice(transaction: RevenueTransaction) {
    downloadHtmlFile(
      `eventra-invoice-${transaction.id}.html`,
      buildEventraInvoice(transaction),
    );
  }

  function handleExportStatement() {
    downloadHtmlFile(
      "eventra-revenue-statement.html",
      buildEventraRevenueStatement(),
    );
  }

  const columns: DataTableColumn<RevenueTransaction>[] = [
    {
      key: "id",
      header: "Payment ID",
      render: (transaction) => (
        <span className="font-mono text-xs font-semibold text-violet-300">
          {transaction.id}
        </span>
      ),
    },
    {
      key: "event",
      header: "Event",
      render: (transaction) => (
        <span className="line-clamp-1 max-w-[240px] text-white">
          {transaction.event}
        </span>
      ),
    },
    {
      key: "customer",
      header: "Customer",
    },
    {
      key: "paymentMethod",
      header: "Method",
      render: (transaction) => {
        const Icon =
          transaction.paymentMethod === "Mobile Money"
            ? SmartphoneIcon
            : transaction.paymentMethod === "Card"
              ? CreditCardIcon
              : BanknoteIcon;

        return (
          <div className="flex items-center gap-2 text-slate-400">
            <Icon className="h-4 w-4 text-violet-300" />
            {transaction.paymentMethod}
          </div>
        );
      },
    },
    {
      key: "amount",
      header: "Gross",
      className: "text-white",
    },
    {
      key: "platformFee",
      header: "Fee",
      className: "text-slate-500",
    },
    {
      key: "netAmount",
      header: "Net",
      className: "text-emerald-300",
    },
    {
      key: "status",
      header: "Status",
      render: (transaction) => (
        <Badge
          variant="outline"
          className={
            transaction.status === "Paid"
              ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-300"
              : transaction.status === "Pending"
                ? "border-amber-400/20 bg-amber-500/10 text-amber-300"
                : "border-rose-400/20 bg-rose-500/10 text-rose-300"
          }
        >
          {transaction.status}
        </Badge>
      ),
    },
    {
      key: "date",
      header: "Date",
      className: "text-slate-500",
    },
    {
      key: "actions",
      header: "",
      className: "text-right",
      render: (transaction) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-slate-400 hover:bg-white/5 hover:text-white"
            >
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="min-w-44 border-white/10 bg-[#111827] p-2 text-white"
          >
            <DropdownMenuItem
              className="h-10 rounded-sm"
              onClick={() => setSelectedReceipt(transaction)}
            >
              View Receipt
            </DropdownMenuItem>

            <DropdownMenuItem
              className="h-10 rounded-sm"
              onClick={() => handleDownloadInvoice(transaction)}
            >
              Download Invoice
            </DropdownMenuItem>

            <DropdownMenuItem className="h-10 rounded-sm">
              Mark Settled
            </DropdownMenuItem>

            <DropdownMenuItem className="h-10 rounded-sm text-rose-300 focus:bg-rose-500/10 focus:text-rose-300">
              Issue Refund
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-violet-300">
            Revenue Management
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white">
            Revenue
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Monitor ticket sales, fees, payouts, refunds, and payment activity.
          </p>
        </div>

        <Button
          onClick={handleExportStatement}
          className="bg-violet-500 hover:bg-violet-400 text-white rounded-sm"
        >
          <DownloadIcon className="mr-2 h-4 w-4" />
          Export Statement
        </Button>
      </section>

      <SectionCards items={revenueStats} />

      <section className="grid gap-4 md:grid-cols-3">
        <RevenueMiniCard
          label="Mobile Money"
          value="UGX 24.6M"
          helper="54% of total revenue"
          icon={SmartphoneIcon}
          direction="up"
        />
        <RevenueMiniCard
          label="Card Payments"
          value="UGX 13.8M"
          helper="31% of total revenue"
          icon={CreditCardIcon}
          direction="up"
        />
        <RevenueMiniCard
          label="Bank Transfers"
          value="UGX 6.8M"
          helper="15% of total revenue"
          icon={BanknoteIcon}
          direction="down"
        />
      </section>

      <SalesPerformanceChart
        data={revenueChartData}
        title="Revenue Performance"
        description="Track revenue and ticket movement across active events."
        showMetricSelect
      />

      <DataTableCard
        title="Payment Transactions"
        description="Recent payments, fees, payout status, and settlement activity."
        data={transactions}
        columns={columns}
        pageSize={5}
        showPagination
        bordered
        actionLabel="Download Report"
      />

      <ReceiptDialog
        transaction={selectedReceipt}
        open={Boolean(selectedReceipt)}
        onOpenChange={(open) => {
          if (!open) setSelectedReceipt(null);
        }}
        onDownloadInvoice={handleDownloadInvoice}
      />
    </div>
  );
}

function ReceiptDialog({
  transaction,
  open,
  onOpenChange,
  onDownloadInvoice,
}: {
  transaction: RevenueTransaction | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDownloadInvoice: (transaction: RevenueTransaction) => void;
}) {
  if (!transaction) return null;

  const statusClass =
    transaction.status === "Paid"
      ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-300"
      : transaction.status === "Pending"
        ? "border-amber-400/20 bg-amber-500/10 text-amber-300"
        : "border-rose-400/20 bg-rose-500/10 text-rose-300";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="lg:min-w-2xl xl:min-w-2xl w-[calc(100vw-2rem)] max-w-2xl overflow-hidden border-white/10 bg-[#0d141d] p-0 text-white">
        <div className="relative border-b border-white/10 bg-white/[0.04] p-6">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-violet-500/20 blur-3xl" />

          <DialogHeader className="relative">
            <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <DialogTitle className="text-2xl">Payment Receipt</DialogTitle>
                <p className="mt-2 text-sm text-slate-400">
                  Transaction summary, platform fee, and payout details.
                </p>
              </div>

              <Badge variant="outline" className={statusClass}>
                {transaction.status}
              </Badge>
            </div>
          </DialogHeader>
        </div>

        <div className="p-6">
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-violet-300">
              {transaction.id}
            </p>

            <h3 className="mt-3 text-2xl font-bold">{transaction.customer}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              {transaction.event}
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <ReceiptItem label="Gross Amount" value={transaction.amount} />
            <ReceiptItem label="Platform Fee" value={transaction.platformFee} />
            <ReceiptItem label="Net Amount" value={transaction.netAmount} />
            <ReceiptItem
              label="Payment Method"
              value={transaction.paymentMethod}
            />
            <ReceiptItem label="Date" value={transaction.date} />
            <ReceiptItem label="Invoice ID" value={`INV-${transaction.id}`} />
          </div>

          <div className="mt-5 rounded-lg border border-dashed border-violet-400/25 bg-violet-500/5 p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Settlement Note
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Net earnings are calculated after Eventra platform fees. Pending
              payments will reflect in payout totals once confirmed.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-white/10 h-11 bg-white/5 text-white hover:bg-white/10 hover:text-white rounded-sm"
            >
              Close
            </Button>

            <Button
              onClick={() => onDownloadInvoice(transaction)}
              className="bg-violet-500 h-11 text-white hover:bg-violet-400 rounded-sm"
            >
              <DownloadIcon className="mr-2 h-4 w-4" />
              Download Invoice
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ReceiptItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-lg border border-white/10 bg-[#111827] p-4">
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
        {label}
      </p>
      <p className="mt-2 break-words text-sm font-semibold text-white">
        {value}
      </p>
    </div>
  );
}

function RevenueMiniCard({
  label,
  value,
  helper,
  icon: Icon,
  direction,
}: {
  label: string;
  value: string;
  helper: string;
  icon: React.ElementType;
  direction: "up" | "down";
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5 text-white backdrop-blur-xl">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
            {label}
          </p>
          <p className="mt-3 text-2xl font-bold">{value}</p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <p className="mt-4 flex items-center gap-1 text-xs text-slate-400">
        {direction === "up" ? (
          <ArrowUpRightIcon className="h-3.5 w-3.5 text-emerald-300" />
        ) : (
          <ArrowDownRightIcon className="h-3.5 w-3.5 text-rose-300" />
        )}
        {helper}
      </p>
    </div>
  );
}
